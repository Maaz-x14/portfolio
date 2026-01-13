package com.maaz.portfolio.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.util.retry.Retry;

import java.time.Duration;
import java.util.List;
import java.util.Map;

@Service
public class EmbeddingService {

    @Value("${HF_API_KEY:}")
    private String hfApiKey;

    private final WebClient webClient;
    private static final int EXPECTED_DIMENSION = 384; // all-MiniLM-L6-v2

    public EmbeddingService(WebClient.Builder builder) {
        this.webClient = builder
                .baseUrl("https://router.huggingface.co/api")
                .build();
    }

    public float[] embed(String text) {
        if (hfApiKey == null || hfApiKey.isBlank())
            throw new IllegalStateException("[ERROR] HF_API_KEY not configured.");

        // normalize text
        String sanitized = text.replace("\n", " ").trim();
        if (sanitized.length() == 0)
            throw new IllegalArgumentException("Cannot embed empty text.");

        // HF Router API expects model + input
        Map<String, Object> payload = Map.of(
                "model", "sentence-transformers/all-MiniLM-L6-v2",
                "input", sanitized
        );

        // call HF
        List<List<Double>> output = webClient.post()
                .header("Authorization", "Bearer " + hfApiKey)
                .contentType(MediaType.APPLICATION_JSON)
                .bodyValue(payload)
                .retrieve()
                .bodyToMono(new ParameterizedTypeReference<List<List<Double>>>() {})
                .timeout(Duration.ofSeconds(15))
                .retryWhen(Retry.fixedDelay(2, Duration.ofSeconds(2)))
                .block();

        if (output == null || output.isEmpty())
            throw new RuntimeException("Empty embedding response from HuggingFace.");

        List<Double> vec = output.get(0);
        if (vec.size() != EXPECTED_DIMENSION) {
            throw new RuntimeException("Embedding dimension mismatch: expected "
                    + EXPECTED_DIMENSION + " got " + vec.size());
        }

        float[] floats = new float[vec.size()];
        for (int i = 0; i < vec.size(); i++)
            floats[i] = vec.get(i).floatValue();

        return floats;
    }
}
