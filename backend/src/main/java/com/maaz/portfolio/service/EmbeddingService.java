package com.maaz.portfolio.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;
import reactor.util.retry.Retry;

import java.time.Duration;
import java.util.List;
import java.util.Map;

@Service
public class EmbeddingService {

    @Value("${huggingface.api-key}")
    private String hfApiKey;

    private final WebClient webClient;
    private static final int EXPECTED_DIMENSION = 384;

    public EmbeddingService(WebClient.Builder builder) {
        this.webClient = builder
                .baseUrl("https://router.huggingface.co")
                .build();
    }

    public float[] embed(String text) {

        if (hfApiKey == null || hfApiKey.isBlank())
            throw new IllegalStateException("HF_API_KEY missing");

        String sanitized = text.replaceAll("\\s+", " ").trim();

        Object response = webClient.post()
                .uri("/hf-inference/models/sentence-transformers/all-MiniLM-L6-v2/pipeline/feature-extraction")
                .header("Authorization", "Bearer " + hfApiKey)
                .contentType(MediaType.APPLICATION_JSON)
                .bodyValue(Map.of("inputs", sanitized))
                .retrieve()
                .bodyToMono(Object.class)
                .block(Duration.ofSeconds(20));

        List<Double> vec;

        // 🔥 Handle both shapes
        if (response instanceof List<?> list && !list.isEmpty()) {
            if (list.get(0) instanceof List<?>) {
                vec = ((List<List<Double>>) list).get(0);
            } else {
                vec = (List<Double>) list;
            }
        } else {
            throw new RuntimeException("Invalid embedding response");
        }

        if (vec.size() != EXPECTED_DIMENSION)
            throw new RuntimeException("Embedding dimension mismatch: " + vec.size());

        float[] out = new float[vec.size()];
        for (int i = 0; i < vec.size(); i++)
            out[i] = vec.get(i).floatValue();

        return out;
    }
}
