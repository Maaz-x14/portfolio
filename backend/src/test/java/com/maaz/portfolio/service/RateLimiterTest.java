package com.maaz.portfolio.service;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

public class RateLimiterTest {

    @Test
    public void testRateLimitAllowsAndBlocks() {
        RateLimiter rl = new RateLimiter();
        String k = "test-client";
        for (int i = 0; i < 20; i++) {
            Assertions.assertTrue(rl.allow(k));
        }
        Assertions.assertFalse(rl.allow(k));
    }
}
