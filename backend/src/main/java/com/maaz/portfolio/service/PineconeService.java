package com.maaz.portfolio.service;

import com.maaz.portfolio.model.IndexItem;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class PineconeService {

    @Value("${PINECONE_API_KEY}")
    private String apiKey;

    private final WebClient client;

    // host should be: https://your-index-name-project-id.svc.environment.pinecone.io
    public PineconeService(WebClient.Builder builder, @Value("${PINECONE_HOST}") String host) {
        this.client = builder.baseUrl(host).build();
    }

    public void upsert(List<IndexItem> items) {
        List<Map<String, Object>> vectors = items.stream().map(item -> Map.of(
                "id", item.getId(),
                "values", item.getVector(), // float[] or List<Float>
                "metadata", Map.of(
                        "text", item.getContent(),
                        "refCode", item.getRefCode(),
                        "category", item.getCategory(),
                        "title", item.getTitle()
                )
        )).collect(Collectors.toList());

        client.post()
                .uri("/vectors/upsert")
                .header("Api-Key", apiKey)
                .contentType(MediaType.APPLICATION_JSON)
                .bodyValue(Map.of("vectors", vectors))
                .retrieve()
                .toBodilessEntity()
                .block();
    }

    @SuppressWarnings("unchecked")
    public List<Match> query(float[] vector, int topK) {
        Map<String, Object> body = Map.of(
                "vector", vector,
                "topK", topK,
                "includeMetadata", true
        );

        Map<String, Object> response = client.post()
                .uri("/query")
                .header("Api-Key", apiKey)
                .contentType(MediaType.APPLICATION_JSON)
                .bodyValue(body)
                .retrieve()
                .bodyToMono(Map.class)
                .block();

        List<Map<String, Object>> matches = (List<Map<String, Object>>) response.get("matches");
        if (matches == null) return List.of();

        return matches.stream().map(m -> {
            Map<String, Object> meta = (Map<String, Object>) m.get("metadata");
            return new Match(
                    (String) m.get("id"),
                    (String) meta.get("text"),
                    (String) meta.get("refCode")
            );
        }).collect(Collectors.toList());
    }

    public record Match(String id, String text, String refCode) {}
}