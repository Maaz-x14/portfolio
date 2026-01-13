package com.maaz.portfolio.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.time.Duration;

@Service
public class LLMClient {

    @Value("${GROQ_API_KEY:}")
    private String groqApiKey;

    @Value("${GROQ_MODEL:llama-3.1-8b-instruct}")
    private String groqModel;

    private final WebClient client;
    private final ObjectMapper mapper = new ObjectMapper();

    public LLMClient() {
        this.client = WebClient.builder()
                .baseUrl("https://api.groq.com/v1")
                .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .build();
    }

    public String chatCompletion(String systemPrompt, String userPrompt) {

        if (groqApiKey == null || groqApiKey.isBlank()) {
            return "(local dev) No Groq key configured.";
        }

        var payload = java.util.Map.of(
                "model", groqModel,
                "messages", java.util.List.of(
                        java.util.Map.of("role", "system", "content", systemPrompt),
                        java.util.Map.of("role", "user", "content", userPrompt)
                )
        );

        try {
            String raw = client.post()
                    .uri("/chat/completions")
                    .header(HttpHeaders.AUTHORIZATION, "Bearer " + groqApiKey)
                    .bodyValue(payload)
                    .retrieve()
                    .bodyToMono(String.class)
                    .timeout(Duration.ofSeconds(30))
                    .onErrorResume(e -> Mono.just("{}"))
                    .block();

            JsonNode root = mapper.readTree(raw);

            JsonNode choices = root.path("choices");
            if (!choices.isArray() || choices.isEmpty()) {
                return "That isn’t in Maaz’s knowledge base yet.";
            }

            return choices.get(0).path("message").path("content").asText("");
        } catch (Exception e) {
            return "That isn’t in Maaz’s knowledge base yet.";
        }
    }
}
