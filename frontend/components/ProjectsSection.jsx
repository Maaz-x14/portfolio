import { useState, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";

const PROJECTS = [
  {
    id: "REF_AQI_01",
    title: "Intelligent AQI Monitor",
    humanStory:
      "Air pollution in urban Pakistan is a systemic crisis. I engineered a centralized intelligence layer that monitors 20+ cities in real-time, transforming raw API telemetry into life-saving health diagnostics and automated alerts.",
    impact: [
      "Monitors real-time AQI levels for 20+ cities in Pakistan using external API integration ",
      "Automated hazard propagation via Spring Scheduler and Gmail SMTP notifications ",
      "Integrated a RAG-driven Llama 3.1 chatbot to provide context-aware health advisories ",
    ],
    techDossier:
      "Built on a containerized PostgreSQL foundation (Docker), the Spring Boot backend manages high-frequency polling through scheduled tasks. It implements a secure JWT-based authentication layer and RBAC for administrative oversight. The frontend utilizes Leaflet.js for geospatial visualization of pollution hotspots.",
    stats: {
      backend: "Spring Boot",
      database: "PostgreSQL",
      security: "JWT/OAuth2",
    },
    image: "/imgs/aqi_img.png",
  },
  {
    id: "REF_AGT_02",
    title: "Agentic Workflow Platform",
    humanStory:
      "Standard automation is fragile and hallucinates. I engineered a local first orchestration engine where agents don't just execute, they observe their own failures, reason through errors using ReAct loops, and self-correct to ensure mission critical task completion without human intervention.",
    impact: [
      "Visual orchestration using Directed Acyclic Graphs (DAGs) for execution flow",
      "Custom 'ReAct' (Reason + Act) loop implementation with self-correcting 'Safety Nets' to catch and fix agent hallucinations ",
      "Real-time execution telemetry utilizing NDJSON streaming and asynchronous FastAPI event processing ",
      "Local execution stack: file_writer (storage), tavily‑python (search), duckduckgo‑search (privacy), wikipedia (reference).",
    ],
    techDossier:
      "A full-stack 'Client-Server-AI' architecture designed for zero-latency local inference. The backend utilizes FastAPI with Pydantic V2 for strict schema enforcement and topological graph processing for context propagation[cite: 49, 51]. The brain runs on Ollama (Llama 3.2), featuring a fault-tolerant tool-handler that accepts ambiguous payloads and kicks the agent back into the reasoning loop if tool calls are missed.",
    stats: {
      core: "Python / FastAPI",
      logic: "ReAct / DAG",
      ai: "Ollama / Llama 3.2",
      ui: "React Flow",
    },
    image: "/imgs/agentic.avif",
  },
  {
    id: "REF_PHR_03",
    title: "Pharma Intelligence RAG",
    humanStory:
      "Pharmaceutical compliance is a zero-margin-for-error environment. I engineered a RAG system that transforms dense PDF libraries into a searchable intelligence layer, mandating that every insight is cited directly from source leaflets with 100% grounding—eliminating the risk of LLM hallucinations in clinical context.",
    impact: [
      "Implemented semantic chunking to preserve logical context across drug contraindications and dosage guides",
      "Developed a domain-specific refusal guard that rejects out-of-scope medical queries to maintain safety",
      "Utilized Groq LPU acceleration for sub-second, context-grounded synthesis across multi-document datasets",
    ],
    techDossier:
      "The system utilizes a modular ingestion pipeline where pharmaceutical PDFs are processed via Sentence-Transformers into high-dimensional vectors. These are indexed in FAISS (FlatIP) for exact semantic similarity. The Groq-accelerated Llama 3.1 model acts as a retrieval agent, strictly synthesising answers using retrieved-chunk citations to maintain a verifiable audit trail.",
    stats: {
      index: "FAISS (FlatIP)",
      infer: "Groq / Llama 3.1",
      logic: "Zero-Hallucination",
    },
    image: "/imgs/pharma.avif",
  },
];

export default function ProjectsSection() {
  return (
    <section id="projects" className="relative py-24 px-6 max-w-7xl mx-auto">
      {/* ARCHITECTURAL GRID BACKGROUND */}
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#0B2545 1px, transparent 1px)`,
          backgroundSize: "30px 30px",
        }}
      />

      <header className="mb-20 space-y-2">
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="text-sm font-mono tracking-[0.5em] text-[#134074]/60 uppercase"
        >
          Operational Records
        </motion.h2>
        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="text-6xl font-black text-[#0B2545] tracking-tighter uppercase"
        >
          Projects
        </motion.h1>
      </header>

      {/* REDUCED VERTICAL SPACING (From space-y-80 to space-y-48) */}
      <div className="space-y-48">
        {PROJECTS.map((project, index) => (
          <ProjectExhibit key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}

function ProjectExhibit({ project }) {
  const ref = useRef(null);
  const [isDossierOpen, setIsDossierOpen] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const yParallax = useTransform(scrollYProgress, [0, 1], [-100, 100]);

  return (
    <div ref={ref} className="relative w-full">
      {/* CINEMATIC HERO (Simplified motion) */}
      <div className="relative w-full h-[60vh] overflow-hidden group border border-[#0B2545]/10">
        <motion.img
          style={{ y: yParallax }}
          src={project.image}
          className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-1000"
        />
        <div className="absolute inset-0 bg-[#0B2545]/10 mix-blend-multiply opacity-20" />

        {/* EXHIBIT NAMEPLATE */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="bg-white/80 backdrop-blur-md border border-white/40 p-10 px-16 text-center shadow-2xl"
          >
            <h3 className="text-4xl font-black text-[#0B2545] uppercase tracking-tighter">
              {project.title}
            </h3>
          </motion.div>
        </div>
      </div>

      {/* STRUCTURED CONTENT FLOW */}
      <div className="py-16 grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* Narrative Block */}
        <div className="lg:col-span-7 space-y-10">
          <div>
            <span className="text-[10px] font-mono uppercase text-[#134074]/60 tracking-widest border-l-2 border-[#134074] pl-4">
              Mission Objective
            </span>
            <p className="mt-6 text-3xl font-bold text-[#0B2545] leading-tight">
              {project.humanStory}
            </p>
          </div>

          <div className="space-y-4">
            {project.impact.map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-4 text-lg text-[#0B2545]/75"
              >
                <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-[#134074]" />
                <p>{item}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Technical Dossier (Styled like Doctrine cards) */}
        <div className="lg:col-span-5">
          <div className="bg-[#0B2545] text-white p-10 relative overflow-hidden shadow-2xl">
            <div
              className="absolute inset-0 opacity-[0.05]"
              style={{
                backgroundImage: `radial-gradient(white 1px, transparent 1px)`,
                backgroundSize: "20px 20px",
              }}
            />

            <h4 className="text-[12px] font-mono uppercase tracking-[0.3em] text-white mb-10">
              Technical Dossier
            </h4>

            <div className="space-y-6 relative z-10 font-mono">
              {Object.entries(project.stats).map(([k, v]) => (
                <div key={k} className="border-b border-white/10 pb-3">
                  <p className="text-[9px] uppercase text-white/30 mb-1">{k}</p>
                  <p className="text-lg font-bold uppercase tracking-tight">
                    {v}
                  </p>
                </div>
              ))}

              <button
                onClick={() => setIsDossierOpen(!isDossierOpen)}
                className="group flex items-center gap-3 text-[10px] uppercase tracking-widest text-[#EEF4ED]/60 hover:text-white transition-colors mt-6"
              >
                <span>{isDossierOpen ? "[-]" : "[+]"}</span>
                {isDossierOpen ? "Close Spec" : "Engineering Breakdown"}
              </button>

              <AnimatePresence>
                {isDossierOpen && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="text-sm leading-relaxed text-[#EEF4ED]/60 font-sans pt-4 border-t border-white/10"
                  >
                    {project.techDossier}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* HALL TRANSITION LABEL */}
      <div className="w-full">
        <div className="h-[1px] w-full bg-[#0B2545]/10" />
        <div className="py-6 flex justify-between items-center text-[9px] font-mono text-[#0B2545]/30 uppercase tracking-[0.6em]">
          <span>REF_RECORD // {project.id}</span>
          <span>End Exhibit</span>
        </div>
      </div>
    </div>
  );
}
