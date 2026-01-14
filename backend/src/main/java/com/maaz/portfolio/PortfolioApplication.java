package com.maaz.portfolio;

import io.github.cdimascio.dotenv.Dotenv;
import io.github.cdimascio.dotenv.DotenvEntry;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class PortfolioApplication {

    public static void main(String[] args) {
        Dotenv dotenv = Dotenv.configure().ignoreIfMissing().load();

        // --- SYSTEM DIAGNOSTIC ---
        System.out.println("🔍 [DEBUG] Checking .env load status...");
        String hfKey = dotenv.get("HF_API_KEY");
        System.out.println("🔍 [DEBUG] HF_API_KEY found: " + (hfKey != null && !hfKey.isBlank()));
        if (hfKey != null) System.out.println("🔍 [DEBUG] HF_API_KEY starts with: " + hfKey.substring(0, 5) + "...");
        // -------------------------

        for (DotenvEntry entry : dotenv.entries()) {
            System.setProperty(entry.getKey(), entry.getValue());
        }

        SpringApplication.run(PortfolioApplication.class, args);
    }
}