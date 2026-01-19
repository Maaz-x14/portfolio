# 🧠 Intelligence-Driven Portfolio

This repository contains the full-stack architecture for a **high‑signal professional portfolio** and an integrated **Neural Synthesis Engine**. It bridges resilient backend infrastructure with high‑level AI reasoning, with a sharp focus on **Retrieval‑Augmented Generation (RAG)** and **Agentic Workflows**.

---

## 🏛️ Project Philosophy — *“Intelligence over Automation”*

This system is engineered with a **Founding Engineer mindset**:

* Systems must **reason**, not just execute.
* Pipelines must be **grounded**, not hallucinated.
* Infrastructure must be **self‑healing, scalable, and fast**.

The goal: sub‑second intelligence, strict technical grounding, and production‑grade reliability.

---

## 🛠️ System Architecture Overview

The platform is a **decoupled intelligence system**:

* **Backend** → Heavy AI orchestration, vector processing, security, and persistence
* **Frontend** → High‑fidelity “Intelligence Layer” for reasoning, streaming, and visualization

---

## ⚙️ Backend — Neural Synthesis Engine (Spring Boot)

Enterprise‑grade Java backend designed for AI orchestration and semantic retrieval.

### Core Capabilities

* **Semantic Vectorization**
  Uses *Sentence‑Transformers* to convert raw text into high‑dimensional embeddings during ingestion.

* **Vector Search (RAG Core)**
  Implements **FAISS (FlatIP)** for sub‑second similarity search over embedded project knowledge.

* **AI Orchestration**
  Integrated with **Groq‑accelerated LLaMA‑3.1** to generate grounded responses using retrieved technical context.

* **Security Protocol**
  Dual‑layer authentication:

  * OAuth2 → Social login & integrations
  * Stateless JWT → Internal sessions + RBAC

* **Data Persistence**

  * PostgreSQL for project metadata
  * Telemetry & audit logging for system introspection

* **API Documentation**

  * Fully documented endpoints via **Swagger**
  * Chat APIs + Administrative indexing APIs

---

## 🎨 Frontend — Architectural Interface (Next.js)

A modern React‑based intelligence UI focused on performance, clarity, and "Museum Plaque" aesthetics.

### Interface Layer

* **Framework**
  Built on **Next.js** with optimized routing and server‑side rendering.

* **Intelligence Layer**
  Custom **Chat Interface** supporting:

  * Real‑time message streaming
  * Source citation rendering
  * Context‑aware responses

* **Motion & UX**

  * Smooth non‑linear transitions with **Framer Motion**
  * Chronological, scannable interaction flow

* **Dynamic UI**

  * Responsive dark dashboard with **Tailwind CSS**
  * Components: Impact Ledger, Technical Arsenal, Timeline Cards

* **Data Visualization**

  * **Leaflet.js** for geospatial mapping and environmental hotspot visualization

---

## 🌐 DevOps — Production‑Grade Reliability

Cloud‑native from day one.

* **Containerization**

  * Dockerized frontend and backend services

* **Orchestration**

  * Kubernetes (K8s) for:

    * Auto‑scaling
    * High availability
    * Fault tolerance

* **Automation (CI/CD)**

  * Jenkins + GitHub Actions
  * Automated build → test → deploy pipelines

---

## 📂 Repository Structure

```text
PORTFOLIO/
├── backend/                # Spring Boot Microservice (Java)
│   ├── src/main/java/      # Domain logic: config, controller, model, service
│   ├── src/main/resources/ # Application properties & static assets
│   ├── .env                # Environment Variables (AI Keys, DB Credentials)
│   ├── pom.xml             # Maven dependencies (Spring AI, FAISS, JWT)
│   └── ...
├── frontend/               # Next.js Application (React)
│   ├── components/         # Atomic UI: ChatInterface, Ledger, Timeline
│   ├── pages/              # Next.js routes and API proxies
│   ├── styles/             # Global Tailwind and Framer animations
│   ├── public/             # Institutional assets and icons
│   └── package.json        # Framework manifests & dependencies
└── README.md               # This architectural record
```

---

## ⚡ Setup & Operational Logic

### 🔹 Ingestion Protocol (Indexing the Intelligence Vault)

To ingest technical documents into the vector store:

```bash
curl -X POST \
  'http://localhost:8080/admin/index' \
  -H 'x-admin-key: SIRIUS_AURA_NUST_ISLAMABAD_2026' \
  -H 'Content-Type: application/json' \
  -d '[
    {
      "id": "proj_01",
      "content": "Technical detail for vectorization..."
    }
  ]'
```

This endpoint:

* Embeds incoming text
* Stores vectors in FAISS
* Persists metadata in PostgreSQL

---

### 🔹 Local Development

#### Backend

```bash
# Configure environment variables
cp .env.example .env

# Ensure PostgreSQL is running

# Launch Spring Boot
mvn spring-boot:run
```

#### Frontend

```bash
npm install
npm run dev
```

The UI will be available at:

```text
http://localhost:3000
```

Backend API:

```text
http://localhost:8080
```

---

## 🚀 Final Note

This project is not a demo.
It is a **production‑grade intelligence system** designed to showcase:

* AI systems engineering
* RAG pipelines done correctly
* Secure, scalable backend architecture
* High‑signal frontend design

If this runs smoothly, you’re already operating at **founding‑engineer level**.
