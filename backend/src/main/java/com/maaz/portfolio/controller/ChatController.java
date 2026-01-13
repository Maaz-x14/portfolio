package com.maaz.portfolio.controller;

import com.maaz.portfolio.model.ChatRequest;
import com.maaz.portfolio.model.ChatResponse;
import com.maaz.portfolio.service.ChatService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/chat")
@Validated
public class ChatController {

    private final ChatService chatService;
    private final com.maaz.portfolio.service.RateLimiter rateLimiter;

    public ChatController(ChatService chatService, com.maaz.portfolio.service.RateLimiter rateLimiter) {
        this.chatService = chatService;
        this.rateLimiter = rateLimiter;
    }

    @PostMapping
    public ResponseEntity<ChatResponse> chat(@RequestHeader(value = "x-forwarded-for", required = false) String forwarded,
                                             @Valid @RequestBody ChatRequest request) {
        String clientKey = forwarded == null ? "anon" : forwarded;
        if (!rateLimiter.allow(clientKey)) {
            return ResponseEntity.status(429).body(new ChatResponse("Rate limit exceeded", java.util.List.of()));
        }
        ChatResponse resp = chatService.handleChat(request.getMessage(), request.getMode());
        return ResponseEntity.ok(resp);
    }
}
