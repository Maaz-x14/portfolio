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

    @Value("${huggingface.api-key:}")
    private String hfApiKey;

    private final WebClient webClient;
    private static final int EXPECTED_DIMENSION = 384;

    public EmbeddingService(WebClient.Builder builder) {
        // MANDATORY: The root for the new HF Inference Router
        this.webClient = builder
                .baseUrl("https://router.huggingface.co")
                .build();
    }

    public float[] embed(String text) {
        if (hfApiKey == null || hfApiKey.isBlank())
            throw new IllegalStateException("[ERROR] HF_API_KEY is not configured.");

        String sanitized = text.replace("\n", " ").trim();
        Map<String, Object> payload = Map.of("inputs", sanitized);

        try {
            // THE FIX: Explicitly target the feature-extraction pipeline
            List<Double> vec = webClient.post()
                    .uri("/hf-inference/models/sentence-transformers/all-MiniLM-L6-v2/pipeline/feature-extraction")
                    .header("Authorization", "Bearer " + hfApiKey.trim())
                    .contentType(MediaType.APPLICATION_JSON)
                    .bodyValue(payload)
                    .retrieve()
                    .onStatus(status -> status.isError(), res ->
                            res.bodyToMono(String.class).flatMap(error -> {
                                System.err.println("❌ HF ROUTER ERROR: " + error);
                                return Mono.error(new RuntimeException("Router API Failure"));
                            })
                    )
                    // Feature extraction returns a flat List<Double> [0.1, 0.2, ...]
                    .bodyToMono(new ParameterizedTypeReference<List<Double>>() {})
                    .timeout(Duration.ofSeconds(20))
                    .block();

            if (vec == null || vec.isEmpty()) throw new RuntimeException("Empty response");

            float[] out = new float[vec.size()];
            for (int i = 0; i < vec.size(); i++)
                out[i] = vec.get(i).floatValue();

            return out;

        } catch (Exception e) {
            throw new RuntimeException("Embedding failed: " + e.getMessage());
        }
    }
}