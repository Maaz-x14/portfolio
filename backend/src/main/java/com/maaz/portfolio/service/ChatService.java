package com.maaz.portfolio.service;

import com.maaz.portfolio.model.ChatRequest;
import com.maaz.portfolio.model.ChatResponse;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@Service
public class ChatService {

    private final RefusalGuard refusalGuard;
    private final EmbeddingService embeddingService;
    private final PineconeService pineconeService;
    private final PromptBuilder promptBuilder;
    private final LLMClient llmClient;

    public ChatService(RefusalGuard refusalGuard,
                       EmbeddingService embeddingService,
                       PineconeService pineconeService,
                       PromptBuilder promptBuilder,
                       LLMClient llmClient) {
        this.refusalGuard = refusalGuard;
        this.embeddingService = embeddingService;
        this.pineconeService = pineconeService;
        this.promptBuilder = promptBuilder;
        this.llmClient = llmClient;
    }

    /**
     * Handles chat requests by first rewriting the query to be standalone if history exists.
     *
     */
    public ChatResponse handleChat(String message, String mode, List<ChatRequest.Message> history) {
        // 1. Length Validation
        if (message.length() > 3000) {
            return new ChatResponse("Input too long", Collections.emptyList());
        }

        // 2. Query Rewriting: De-reference pronouns based on conversation history.
        //
        String standaloneQuery = message;
        if (history != null && !history.isEmpty()) {
            standaloneQuery = llmClient.rewriteQuery(message, history);
        }

        // 3. Refusal Guard: Validate if the query is within Maaz's professional scope.
        //
        if (!refusalGuard.isInScope(standaloneQuery)) {
            return new ChatResponse("I only answer questions related to Maaz and his work.", Collections.emptyList());
        }

        // 4. Vector Generation & Pinecone Retrieval (Namespace: portfolio).
        //
        float[] vec = embeddingService.embed(standaloneQuery);
        List<PineconeService.Match> matches = pineconeService.query(vec, 5);

        if (matches.isEmpty()) {
            return new ChatResponse("That isn’t in Maaz’s knowledge base yet.", Collections.emptyList());
        }

        // 5. Prompt Construction & LLM Execution (llama-3.3-70b-versatile).
        //
        String sys = promptBuilder.buildSystemPrompt(matches);
        String userPrompt = promptBuilder.buildUserPrompt(message, mode, history);
        String answer = llmClient.chatCompletion(sys, userPrompt);

        // 6. Source Collection for UI badging.
        //
        List<String> refs = matches.stream().map(PineconeService.Match::getRefCode).toList();

        return new ChatResponse(answer, refs);
    }
}