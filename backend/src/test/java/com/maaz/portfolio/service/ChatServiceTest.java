package com.maaz.portfolio.service;

import com.maaz.portfolio.model.ChatResponse;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import java.util.List;

public class ChatServiceTest {

    @Test
    public void testNoContextFound() {
        RefusalGuard guard = Mockito.mock(RefusalGuard.class);
        EmbeddingService emb = Mockito.mock(EmbeddingService.class);
        PineconeService pine = Mockito.mock(PineconeService.class);
        PromptBuilder pb = Mockito.mock(PromptBuilder.class);
        LLMClient llm = Mockito.mock(LLMClient.class);

        Mockito.when(guard.isInScope(Mockito.anyString())).thenReturn(true);
        Mockito.when(emb.embed(Mockito.anyString())).thenReturn(new float[10]);
        Mockito.when(pine.query(Mockito.any(), Mockito.anyInt())).thenReturn(List.of());

        ChatService svc = new ChatService(guard, emb, pine, pb, llm);
        ChatResponse r = svc.handleChat("Tell me about Maaz's project", "short");
        Assertions.assertEquals("That isn’t in Maaz’s knowledge base yet.", r.getAnswer());
    }

    @Test
    public void testValidChatResponse() {
        RefusalGuard guard = Mockito.mock(RefusalGuard.class);
        EmbeddingService emb = Mockito.mock(EmbeddingService.class);
        PineconeService pine = Mockito.mock(PineconeService.class);
        PromptBuilder pb = Mockito.mock(PromptBuilder.class);
        LLMClient llm = Mockito.mock(LLMClient.class);

        Mockito.when(guard.isInScope(Mockito.anyString())).thenReturn(true);
        Mockito.when(emb.embed(Mockito.anyString())).thenReturn(new float[10]);
        PineconeService.Match m = new PineconeService.Match("1","Maaz built X","REF_AQI_01");
        Mockito.when(pine.query(Mockito.any(), Mockito.anyInt())).thenReturn(List.of(m));
        Mockito.when(pb.buildSystemPrompt(Mockito.anyList())).thenReturn("SYS");
        Mockito.when(pb.buildUserPrompt(Mockito.anyString(), Mockito.anyString())).thenReturn("USER");
        Mockito.when(llm.chatCompletion(Mockito.anyString(), Mockito.anyString())).thenReturn("Answer about Maaz");

        ChatService svc = new ChatService(guard, emb, pine, pb, llm);
        ChatResponse r = svc.handleChat("Tell me about Maaz's project", "short");
        Assertions.assertEquals("Answer about Maaz", r.getAnswer());
        Assertions.assertEquals(List.of("REF_AQI_01"), r.getSources());
    }
}
