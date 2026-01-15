package com.maaz.portfolio.service;

import org.springframework.stereotype.Component;
import java.util.List;

@Component
public class PromptBuilder {

    public String buildSystemPrompt(List<PineconeService.Match> matches) {
        StringBuilder sb = new StringBuilder();
        sb.append("You are Maaz Ahmad's AI Assistant. Use the provided context to answer the user.\n\n");
        sb.append("### MAAZ'S PORTFOLIO CONTEXT ###\n");

        for (PineconeService.Match m : matches) {
            // Using record accessor methods: m.refCode() and m.text()
            sb.append("SOURCE [").append(m.refCode()).append("]: ")
                    .append(m.text()).append("\n\n");
        }

        sb.append("### END OF CONTEXT ###\n\n");
        sb.append("If the information is in the context above, answer as Maaz's AI. ")
                .append("If it is absolutely not mentioned, say 'That isn’t in Maaz’s knowledge base yet.'");

        return sb.toString();
    }

    public String buildUserPrompt(String message, String mode) {
        return message.trim();
    }
}