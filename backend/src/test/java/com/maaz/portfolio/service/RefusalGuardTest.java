package com.maaz.portfolio.service;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

public class RefusalGuardTest {
    private final RefusalGuard guard = new RefusalGuard();

    @Test
    public void testBannedTopics() {
        Assertions.assertFalse(guard.isInScope("What is 2+2? math question"));
        Assertions.assertFalse(guard.isInScope("Tell me the weather today"));
        Assertions.assertFalse(guard.isInScope("Explain the proof of Fermat"));
    }

    @Test
    public void testAllowedMaazTopics() {
        Assertions.assertTrue(guard.isInScope("Tell me about Maaz's projects"));
        Assertions.assertTrue(guard.isInScope("What skills does Maaz list on his portfolio?"));
    }
}
