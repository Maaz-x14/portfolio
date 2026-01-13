package com.maaz.portfolio.service;

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

    public ChatResponse handleChat(String message, String mode) {
        // 1. validate length
        if (message.length() > 3000) {
            return new ChatResponse("Input too long", Collections.emptyList());
        }

        // 2. refusal guard
        if (!refusalGuard.isInScope(message)) {
            return new ChatResponse("I only answer questions related to Maaz and his work.", Collections.emptyList());
        }

        // 3. embed
        float[] vec = embeddingService.embed(message);

        // 4. query pinecone
        List<PineconeService.Match> matches = pineconeService.query(vec, 5);

        if (matches.isEmpty()) {
            return new ChatResponse("That isn’t in Maaz’s knowledge base yet.", Collections.emptyList());
        }

        // 5. build prompt
        String sys = promptBuilder.buildSystemPrompt(matches);
        String userPrompt = promptBuilder.buildUserPrompt(message, mode);

        // 6. call LLM
        String answer = llmClient.chatCompletion(sys, userPrompt);

        // 7. collect ref codes
        List<String> refs = matches.stream().map(PineconeService.Match::getRefCode).toList();

        return new ChatResponse(answer, refs);
    }
}
