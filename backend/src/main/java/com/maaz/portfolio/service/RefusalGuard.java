package com.maaz.portfolio.service;

import org.springframework.stereotype.Component;
import java.util.Locale;
import java.util.regex.Pattern;

@Component
public class RefusalGuard {

    private static final Pattern BANNED = Pattern.compile(
            "\\b(math|weather|news|politics|medical|religion|family|address|phone|ssn|salary|bank|account|password|calculate)\\b",
            Pattern.CASE_INSENSITIVE
    );

    public boolean isInScope(String message) {
        if (message == null || message.isBlank()) return false;

        String normalized = message.toLowerCase(Locale.ROOT);

        // Fail-fast on banned topics
        if (BANNED.matcher(normalized).find()) return false;

        // Ensure query is related to the professional archive
        return normalized.contains("maaz") ||
                normalized.contains("project") ||
                normalized.contains("portfolio") ||
                normalized.contains("agentic") ||
                normalized.contains("skills") ||
                normalized.contains("experience") ||
                normalized.contains("work") ||
                normalized.contains("cv") ||
                normalized.contains("resume") ||
                normalized.contains("credentials") ||
                normalized.contains("education") ||
                normalized.contains("certificate");
    }
}