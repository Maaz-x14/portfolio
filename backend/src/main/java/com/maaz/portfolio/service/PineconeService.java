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

    private static final String NAMESPACE = "portfolio";
    private final WebClient client;

    public PineconeService(
            WebClient.Builder builder,
            @Value("${PINECONE_HOST}") String host,
            @Value("${PINECONE_API_KEY}") String apiKey
    ) {
        this.client = builder
                .baseUrl(host)
                .defaultHeader("Api-Key", apiKey)
                .build();
    }

    public void upsert(List<IndexItem> items) {
        List<Map<String, Object>> vectors = items.stream().map(item -> Map.of(
                "id", item.getId(),
                "values", item.getVector(),
                "metadata", Map.of(
                        "text", item.getContent(),
                        "refCode", item.getRefCode(),
                        "title", item.getTitle()
                )
        )).toList();

        // THE FIX: Explicitly sending to the "portfolio" namespace
        client.post()
                .uri("/vectors/upsert")
                .contentType(MediaType.APPLICATION_JSON)
                .bodyValue(Map.of(
                        "vectors", vectors,
                        "namespace", NAMESPACE
                ))
                .retrieve()
                .toBodilessEntity()
                .block();
    }

    @SuppressWarnings("unchecked")
    public List<Match> query(float[] vector, int topK) {
        Map<String, Object> body = Map.of(
                "vector", vector,
                "topK", topK,
                "includeMetadata", true,
                "namespace", NAMESPACE // Querying the SAME namespace
        );

        Map<String, Object> res = client.post()
                .uri("/query")
                .contentType(MediaType.APPLICATION_JSON)
                .bodyValue(body)
                .retrieve()
                .bodyToMono(Map.class)
                .block();

        List<Map<String, Object>> matches = (List<Map<String, Object>>) res.get("matches");
        if (matches == null) return List.of();

        return matches.stream().map(m -> {
            Map<String, Object> meta = (Map<String, Object>) m.get("metadata");
            return new Match(
                    (String) m.get("id"),
                    (String) meta.get("text"),
                    (String) meta.get("refCode")
            );
        }).toList();
    }

    public record Match(String id, String text, String refCode) {
        // Explicit getters to fix the "cannot find symbol" compilation errors
        public String getRefCode() { return refCode; }
        public String getText() { return text; }
        public String getId() { return id; }
    }
}