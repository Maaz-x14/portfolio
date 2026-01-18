package com.maaz.portfolio.service;

import com.maaz.portfolio.model.ChatRequest;
import org.springframework.stereotype.Component;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class PromptBuilder {

    private static final String SYSTEM_HEADER = """
        You are the Intelligence Layer for Maaz Ahmad's portfolio. 
        Your goal is to answer questions strictly about Maaz's work, projects, and skills.
        
        CRITICAL RULES:
        1. Pronouns like 'he', 'him', or 'his' always refer to Maaz Ahmad.
        2. Answer in the third person.
        3. Use ONLY the provided archive records to answer.
        4. If the info is not in the records, say "That isn’t in Maaz’s knowledge base yet."
        """;

    public String buildSystemPrompt(List<PineconeService.Match> matches) {
        StringBuilder sb = new StringBuilder(SYSTEM_HEADER);
        sb.append("\n### ARCHIVE RECORDS ###\n");

        for (PineconeService.Match m : matches) {
            // Using record accessor methods for reliability.
            sb.append("REF [").append(m.refCode()).append("]: ")
                    .append(m.text()).append("\n\n");
        }

        return sb.append("### END OF RECORDS ###").toString();
    }

    public String buildUserPrompt(String message, String mode, List<ChatRequest.Message> history) {
        String historyContext = "";
        if (history != null && !history.isEmpty()) {
            historyContext = "Previous Context:\n" +
                    history.stream()
                            .limit(3)
                            .map(m -> m.getRole() + ": " + m.getContent())
                            .collect(Collectors.joining("\n")) + "\n\n";
        }

        String lengthPref = "medium".equalsIgnoreCase(mode) ? "Provide a detailed answer." : "Short and punchy.";
        return String.format("%s%s\nQuery: %s", historyContext, lengthPref, message.trim());
    }
}