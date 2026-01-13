package com.maaz.portfolio.controller;

import com.maaz.portfolio.model.IndexItem;
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

    @Value("${ADMIN_API_KEY}")
    private String adminApiKey;

    public AdminIndexController(PineconeService pineconeService) {
        this.pineconeService = pineconeService;
    }

    @PostMapping
    public ResponseEntity<?> index(@RequestHeader(value = "x-admin-key", required = false) String key,
                                   @Valid @RequestBody List<IndexItem> items) {

        if (adminApiKey == null || adminApiKey.isBlank() || !adminApiKey.equals(key)) {
            logger.warn("[SECURITY] Unauthorized attempt to access admin indexing endpoint.");
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Access Denied");
        }

        logger.info("[ADMIN] Indexing request received for {} items.", items.size());
        try {
            pineconeService.upsert(items);
            return ResponseEntity.ok("Successfully indexed " + items.size() + " records.");
        } catch (Exception e) {
            logger.error("[ERROR] Failed to upsert vectors to Pinecone: ", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Indexing failed.");
        }
    }
}