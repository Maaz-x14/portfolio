package com.maaz.portfolio.model;

import java.util.List;

public class ChatRequest {
    private String message;
    private String mode;
    private List<Message> history; // The missing symbol

    // Getters and Setters
    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
    public String getMode() { return mode; }
    public void setMode(String mode) { this.mode = mode; }
    public List<Message> getHistory() { return history; }
    public void setHistory(List<Message> history) { this.history = history; }

    // This defines the 'Message' symbol and the methods getRole() and getContent()
    public static class Message {
        private String role;    // "user" or "assistant"
        private String content; // The actual text

        public String getRole() { return role; }
        public void setRole(String role) { this.role = role; }
        public String getContent() { return content; }
        public void setContent(String content) { this.content = content; }
    }
}