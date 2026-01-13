package com.maaz.portfolio.service;

import org.springframework.stereotype.Component;

import java.time.Instant;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class RateLimiter {
    private final Map<String, UserWindow> clients = new ConcurrentHashMap<>();

    private static class UserWindow {
        Instant windowStart;
        int count;
    }

    // simple rate limit: 20 requests per minute per IP/key
    public boolean allow(String key) {
        String k = key == null ? "anon" : key;
        UserWindow w = clients.computeIfAbsent(k, k2 -> new UserWindow());
        Instant now = Instant.now();
        if (w.windowStart == null || now.isAfter(w.windowStart.plusSeconds(60))) {
            w.windowStart = now;
            w.count = 1;
            return true;
        }
        if (w.count < 20) {
            w.count++;
            return true;
        }
        return false;
    }
}
