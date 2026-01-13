package com.maaz.portfolio.service;

import com.maaz.portfolio.model.IndexItem;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.HashMap;
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

    /**
     * Upserts vectors and structured metadata to Pinecone Archive.
     * Fixed the 'incompatible types' error by using explicit HashMap construction.
     */
    public void upsert(List<IndexItem> items) {
        List<Map<String, Object>> vectors = items.stream().map(item -> {
            Map<String, Object> vectorEntry = new HashMap<>();
            vectorEntry.put("id", item.getId());
            vectorEntry.put("values", item.getVector()); // Requires getVector() in IndexItem model

            Map<String, Object> metadata = new HashMap<>();
            metadata.put("text", item.getContent());
            metadata.put("refCode", item.getRefCode());
            metadata.put("category", item.getCategory());
            metadata.put("title", item.getTitle());

            vectorEntry.put("metadata", metadata);
            return vectorEntry;
        }).collect(Collectors.toList());

        client.post()
                .uri("/vectors/upsert")
                .header("Api-Key", apiKey)
                .contentType(MediaType.APPLICATION_JSON)
                .bodyValue(Map.of("vectors", vectors))
                .retrieve()
                .toBodilessEntity()
                .block();
    }

    /**
     * Queries the vector space for the topK semantic matches.
     * Returns a list of Match records containing text and reference codes.
     */
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

    /**
     * Match record supporting both standard record access and legacy getter patterns.
     */
    public record Match(String id, String text, String refCode) {
        public String getRefCode() { return refCode; }
        public String getText() { return text; }
    }
}