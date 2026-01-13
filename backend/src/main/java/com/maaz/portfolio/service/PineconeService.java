package com.maaz.portfolio.service;

import com.maaz.portfolio.model.IndexItem;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
public class PineconeService {

    public static class Match {
        private final String id;
        private final String text;
        private final String refCode;

        public Match(String id, String text, String refCode) {
            this.id = id;
            this.text = text;
            this.refCode = refCode;
        }

        public String getId() { return id; }
        public String getText() { return text; }
        public String getRefCode() { return refCode; }
    }

    @Value("${PINECONE_API_KEY:}")
    private String pineconeApiKey;

    @Value("${PINECONE_ENVIRONMENT:}")
    private String pineconeEnv;

    @Value("${PINECONE_INDEX:}")
    private String pineconeIndex;

    private final RestTemplate rest = new RestTemplate();

    public void upsert(List<IndexItem> items) {
        // In production, call Pinecone upsert API. Here we log minimal metadata.
        // Implementation placeholder: do nothing but validate input.
        if (items == null || items.isEmpty()) return;
    }

    public List<Match> query(float[] vector, int topK) {
        // In production, call Pinecone query to retrieve topK vector matches.
        // Placeholder: return empty to trigger "no context" behavior unless upserted locally.
        return Collections.emptyList();
    }

    // For tests or local mode, a simple in-memory store could be added later.
}
