package com.maaz.portfolio.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

// Simple wrapper for embeddings; calls external embedding provider (Pinecone/other)
@Service
public class EmbeddingService {

    @Value("${EMBEDDING_MODEL_NAME:sentence-transformers/all-MiniLM-L6-v2}")
    private String embeddingModelName;

    public float[] embed(String text) {
        // In production, call an embeddings provider. Here we provide a deterministic placeholder
        // so the pipeline can be run locally without secrets. Replace with a real embedder.
        int dim = 384;
        float[] v = new float[dim];
        int sum = text.codePoints().sum();
        for (int i = 0; i < dim; i++) {
            v[i] = (float) ((sum % (i + 1)) * 0.0001);
        }
        return v;
    }
}
