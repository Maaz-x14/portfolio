package com.maaz.portfolio.model;

public class IndexItem {
    private String id;
    private String title;
    private String content;
    private String category;
    private String refCode;
    private float[] vector;

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    public String getRefCode() { return refCode; }
    public void setRefCode(String refCode) { this.refCode = refCode; }
    public float[] getVector() { return vector; }
    public void setVector(float[] vector) { this.vector = vector; }
}
