package com.maaz.portfolio.service;

import org.springframework.stereotype.Component;

import java.util.Locale;
import java.util.regex.Pattern;

@Component
public class RefusalGuard {

    // Patterns to detect disallowed topics
    private static final Pattern BANNED = Pattern.compile("\\b(math|weather|news|politics|medical|religion|family|address|phone|ssn|salary|bank|account|password)\\b", Pattern.CASE_INSENSITIVE);

    public boolean isInScope(String message) {
        String normalized = message == null ? "" : message.toLowerCase(Locale.ROOT);
        // Reject generic CS theory unrelated to Maaz's work by simple heuristic: if message mentions "explain algorithm" or broad theory
        if (normalized.matches(".*\\b(explain|how does|what is|prove|derive)\\b.*(algorithm|theorem|proof|complexity).*")) {
            return false;
        }
        if (BANNED.matcher(normalized).find()) return false;

        // Allow questions that reference Maaz or portfolio keywords
        return normalized.contains("maaz") || normalized.contains("project") || normalized.contains("skill") || normalized.contains("portfolio") || normalized.contains("certificate") || normalized.contains("education") || normalized.contains("testimonial") || normalized.contains("repository") || normalized.contains("repo") || normalized.contains("goal") || normalized.contains("agentic");
    }
}
