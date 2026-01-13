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

    @Value("${HF_API_KEY}")
    private String hfApiKey;

    private final WebClient webClient;
    private static final int EXPECTED_DIMENSION = 384; // Dimension for all-MiniLM-L6-v2

    public EmbeddingService(WebClient.Builder builder) {
        this.webClient = builder
                .baseUrl("https://api-inference.huggingface.co")
                .build();
    }

    public float[] embed(String text) {
        if (hfApiKey == null || hfApiKey.isBlank())
            throw new IllegalStateException("[ERROR] HF_API_KEY not configured in environment.");

        // Clean text to prevent processing errors
        String sanitizedText = text.replace("\n", " ").trim();

        // The Inference API expects {"inputs": "your text"}
        List<List<Double>> response = webClient.post()
                .uri("/models/sentence-transformers/all-MiniLM-L6-v2")
                .header("Authorization", "Bearer " + hfApiKey)
                .contentType(MediaType.APPLICATION_JSON)
                .bodyValue(Map.of("inputs", sanitizedText))
                .retrieve()
                .bodyToMono(new ParameterizedTypeReference<List<List<Double>>>() {})
                .timeout(Duration.ofSeconds(15)) // Timeout safety
                .retryWhen(Retry.fixedDelay(2, Duration.ofSeconds(2))) // Resilience
                .block();

        if (response == null || response.isEmpty())
            throw new RuntimeException("Empty embedding response from Hugging Face.");

        // Feature extraction returns a list of embeddings (one per input)
        // We take the first one (index 0)
        List<Double> vec = response.get(0);

        if (vec.size() != EXPECTED_DIMENSION) {
            throw new RuntimeException("Dimensionality mismatch. Expected " + EXPECTED_DIMENSION + " but got " + vec.size());
        }

        float[] out = new float[vec.size()];
        for (int i = 0; i < vec.size(); i++) {
            out[i] = vec.get(i).floatValue();
        }

        return out;
    }
}