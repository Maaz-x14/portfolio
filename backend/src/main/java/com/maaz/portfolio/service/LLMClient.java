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

    // Updated model ID from your Groq documentation
    @Value("${GROQ_MODEL:llama-3.3-70b-versatile}")
    private String groqModel;

    private final WebClient client;
    private final ObjectMapper mapper = new ObjectMapper();

    public LLMClient() {
        // THE FIX: Move the path into the uri() call or ensure no leading slash
        this.client = WebClient.builder()
                .baseUrl("https://api.groq.com")
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
            // THE FIX: Full path relative to the base domain
            String raw = client.post()
                    .uri("/openai/v1/chat/completions")
                    .header(HttpHeaders.AUTHORIZATION, "Bearer " + groqApiKey)
                    .bodyValue(payload)
                    .retrieve()
                    .bodyToMono(String.class)
                    .timeout(Duration.ofSeconds(30))
                    .block();

            JsonNode root = mapper.readTree(raw);
            JsonNode choices = root.path("choices");

            if (!choices.isArray() || choices.isEmpty()) {
                return "That isn’t in Maaz’s knowledge base yet.";
            }

            return choices.get(0).path("message").path("content").asText("");

        } catch (Exception e) {
            // Keep this for final verification
            System.err.println("❌ GROQ API ERROR: " + e.getMessage());
            return "That isn’t in Maaz’s knowledge base yet.";
        }
    }
}