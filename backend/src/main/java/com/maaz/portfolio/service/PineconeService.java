package com.maaz.portfolio.service;

import com.maaz.portfolio.model.IndexItem;
import io.netty.channel.ChannelOption;
import io.netty.handler.timeout.ReadTimeoutHandler;
import io.netty.handler.timeout.WriteTimeoutHandler;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.http.client.reactive.ReactorClientHttpConnector;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.netty.http.client.HttpClient;
import reactor.util.retry.Retry;

import java.time.Duration;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;

@Service
public class PineconeService {

    @Value("${PINECONE_API_KEY}")
    private String apiKey;

    private final WebClient client;

    public PineconeService(WebClient.Builder builder, @Value("${PINECONE_HOST}") String host) {
        // THE FIX: Massive timeouts for unstable networks
        HttpClient httpClient = HttpClient.create()
                .option(ChannelOption.CONNECT_TIMEOUT_MILLIS, 60000) // 60s connection timeout
                .responseTimeout(Duration.ofSeconds(60))            // 60s response timeout
                .doOnConnected(conn -> conn
                        .addHandlerLast(new ReadTimeoutHandler(60, TimeUnit.SECONDS))
                        .addHandlerLast(new WriteTimeoutHandler(60, TimeUnit.SECONDS)));

        this.client = builder
                .baseUrl(host)
                .clientConnector(new ReactorClientHttpConnector(httpClient))
                .build();
    }

    public void upsert(List<IndexItem> items) {
        List<Map<String, Object>> vectors = items.stream().map(item -> {
            Map<String, Object> entry = new HashMap<>();
            entry.put("id", item.getId());
            entry.put("values", item.getVector());
            entry.put("metadata", Map.of(
                    "text", item.getContent(),
                    "refCode", item.getRefCode(),
                    "title", item.getTitle()
            ));
            return entry;
        }).collect(Collectors.toList());

        client.post()
                .uri("/vectors/upsert")
                .header("Api-Key", apiKey)
                .contentType(MediaType.APPLICATION_JSON)
                .bodyValue(Map.of("vectors", vectors))
                .retrieve()
                .toBodilessEntity()
                .retryWhen(Retry.fixedDelay(3, Duration.ofSeconds(2))) // Auto-retry on glitch
                .block(Duration.ofSeconds(60));
    }

    @SuppressWarnings("unchecked")
    public List<Match> query(float[] vector, int topK) {
        Map<String, Object> body = Map.of(
                "vector", vector,
                "topK", topK,
                "includeMetadata", true
        );

        try {
            Map<String, Object> response = client.post()
                    .uri("/query")
                    .header("Api-Key", apiKey)
                    .contentType(MediaType.APPLICATION_JSON)
                    .bodyValue(body)
                    .retrieve()
                    .bodyToMono(Map.class)
                    .retryWhen(Retry.fixedDelay(3, Duration.ofSeconds(2))) // Retry if SSL hangs
                    .block(Duration.ofSeconds(60));

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
        } catch (Exception e) {
            System.err.println("❌ PINECONE FAILURE: " + e.getMessage());
            throw new RuntimeException("Vector DB timeout. Check your local firewall/ISP connection.");
        }
    }

    public record Match(String id, String text, String refCode) {
        // Explicit getters to fix compilation in ChatService and PromptBuilder
        public String getRefCode() { return refCode; }
        public String getText() { return text; }
        public String getId() { return id; }
    }
}