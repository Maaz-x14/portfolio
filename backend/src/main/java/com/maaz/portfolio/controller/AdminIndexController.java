package com.maaz.portfolio.controller;

import com.maaz.portfolio.model.IndexItem;
import com.maaz.portfolio.service.PineconeService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin/index")
public class AdminIndexController {

    private final PineconeService pineconeService;

    @Value("${ADMIN_API_KEY:}")
    private String adminApiKey;

    public AdminIndexController(PineconeService pineconeService) {
        this.pineconeService = pineconeService;
    }

    @PostMapping
    public ResponseEntity<?> index(@RequestHeader(value = "x-admin-key", required = false) String key,
                                   @Valid @RequestBody List<IndexItem> items) {
        if (key == null || !key.equals(adminApiKey)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Forbidden");
        }
        pineconeService.upsert(items);
        return ResponseEntity.ok().build();
    }
}
