package com.maaz.portfolio.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.maaz.portfolio.model.ChatRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import java.time.Duration;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class LLMClient {

    @Value("${GROQ_API_KEY}")
    private String groqApiKey;

    @Value("${GROQ_MODEL:llama-3.3-70b-versatile}")
    private String groqModel;

    private final WebClient client;
    private final ObjectMapper mapper = new ObjectMapper();

    public LLMClient() {
        this.client = WebClient.builder()
                .baseUrl("https://api.groq.com")
                .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .build();
    }

    /**
     * Resolves pronouns and context to create a standalone search query.
     *
     */
    public String rewriteQuery(String currentMessage, List<ChatRequest.Message> history) {
        // Only rewrite if pronouns or vague references are detected
        if (!currentMessage.toLowerCase().matches(".*\\b(he|his|him|she|her|they|them|it|that|those|this|there)\\b.*")) {
            return currentMessage;
        }

        String historyText = history.stream()
                .map(m -> m.getRole() + ": " + m.getContent())
                .collect(Collectors.joining("\n"));

        String prompt = String.format("""
        Convert the 'Follow-up' into a standalone search query about Maaz Ahmad.
        Standalone query must be a single sentence. 
        If the follow-up is already clear, return it as is.

        History:
        %s
        
        Follow-up: %s
        Standalone Query:""", historyText, currentMessage);

        // Use a dedicated call for rewriting to avoid the ChatService refusal logic
        return chatCompletion("You are a search query optimizer for a Maaz Ahmad portfolio.", prompt);
    }

    public String chatCompletion(String systemPrompt, String userPrompt) {
        var payload = Map.of(
                "model", groqModel,
                "messages", List.of(
                        Map.of("role", "system", "content", systemPrompt),
                        Map.of("role", "user", "content", userPrompt)
                )
        );

        try {
            String raw = client.post()
                    .uri("/openai/v1/chat/completions")
                    .header(HttpHeaders.AUTHORIZATION, "Bearer " + groqApiKey)
                    .bodyValue(payload)
                    .retrieve()
                    .bodyToMono(String.class)
                    .timeout(Duration.ofSeconds(30))
                    .block();

            JsonNode root = mapper.readTree(raw);
            return root.path("choices").get(0).path("message").path("content").asText("");
        } catch (Exception e) {
            return "That isn’t in Maaz’s knowledge base yet.";
        }
    }
}