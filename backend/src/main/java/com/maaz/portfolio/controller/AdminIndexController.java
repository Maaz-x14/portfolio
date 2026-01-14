package com.maaz.portfolio.controller;

import com.maaz.portfolio.model.IndexItem;
import com.maaz.portfolio.service.EmbeddingService;
import com.maaz.portfolio.service.PineconeService;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin/index")
public class AdminIndexController {

    private static final Logger logger = LoggerFactory.getLogger(AdminIndexController.class);

    private final PineconeService pineconeService;
    private final EmbeddingService embeddingService;

    @Value("${ADMIN_API_KEY}")
    private String adminApiKey;

    // Autowire both services via constructor
    public AdminIndexController(PineconeService pineconeService, EmbeddingService embeddingService) {
        this.pineconeService = pineconeService;
        this.embeddingService = embeddingService;
    }

    @PostMapping
    public ResponseEntity<?> index(@RequestHeader(value = "x-admin-key", required = false) String key,
                                   @Valid @RequestBody List<IndexItem> items) {

        // 1. Security Guard
        if (adminApiKey == null || adminApiKey.isBlank() || !adminApiKey.equals(key)) {
            logger.warn("[SECURITY_ALERT] Unauthorized attempt to modify the archive.");
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Access Denied: Invalid Admin Key");
        }

        logger.info("[ADMIN_ACTION] Initiating ingestion for {} items.", items.size());

        try {
            // 2. Vectorization Loop (Server-Side Embedding)
            for (IndexItem item : items) {
                logger.info("[PROCESS] Vectorizing item: {}", item.getTitle());

                // Call HuggingFace via EmbeddingService
                float[] vector = embeddingService.embed(item.getContent());

                // Inject the generated vector into the item
                item.setVector(vector);
            }

            // 3. Upsert to Pinecone
            pineconeService.upsert(items);

            logger.info("[SUCCESS] Archive synchronized with Pinecone.");
            return ResponseEntity.ok("Archive successfully updated with " + items.size() + " vectorized records.");

        } catch (IllegalStateException e) {
            logger.error("[CONFIG_ERROR] Secret keys missing: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Server Configuration Error: Check API Keys");
        } catch (Exception e) {
            logger.error("[INDEX_ERROR] Critical failure during indexing: ", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Indexing Failed: " + e.getMessage());
        }
    }
}