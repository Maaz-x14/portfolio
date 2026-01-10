import { useState, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";

const aqi_img = "/imgs/aqi_img.png";

const PROJECTS = [
  {
    id: "REF_AQI_01",
    title: "Smart Air Quality Monitor",
    humanStory:
      "Air pollution is an invisible hazard. I engineered a system that translates raw sensor telemetry into conversational health diagnostics, telling you exactly what you are breathing and how to react.",
    impact: [
      "Real-time AQI tracking with low-latency hardware synchronization",
      "Deployed on-edge using ESP32 & high-precision gas sensors",
      "Integrated Llama-3.1 RAG for contextual health reasoning",
    ],
    techDossier:
      "On-edge ESP32 devices stream telemetry via MQTT protocols. Spring Boot manages secure ingestion and JWT-based authentication. The RAG pipeline utilizes FAISS vector indexing to ground Llama-3.1 responses.",
    stats: { hardware: "ESP32", protocol: "MQTT", runtime: "Java/Spring" },
    image: aqi_img,
  },
  {
    id: "REF_AGT_02",
    title: "Agentic Workflow Platform",
    humanStory:
      "Standard automation is fragile. I built a platform where agents observe their own failures, reason through errors using ReAct loops, and self-correct to ensure mission-critical task completion.",
    impact: [
      "Visual agent orchestration using Directed Acyclic Graphs (DAG)",
      "Autonomous ReAct reasoning loops with tool-augmented execution",
      "High-throughput event streaming via FastAPI backends",
    ],
    techDossier:
      "Orchestration is handled via DAG state management to ensure deterministic recovery. The agent logic utilizes ReAct patterns over Llama-3.1, providing transparent logs via NDJSON streams.",
    stats: { core: "Python", logic: "ReAct", orchestrator: "DAG" },
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2000&auto=format&fit=crop",
  },
  {
    id: "REF_PHR_03",
    title: "Pharma Document RAG",
    humanStory:
      "Medical compliance is a high-stakes environment. This system enables domain experts to query vast PDF libraries with zero-hallucination guarantees, ensuring every answer is cited directly from source material.",
    impact: [
      "Strictly grounded answers with chunk-level source citations",
      "Semantic retrieval across multi-thousand page datasets",
      "Groq-accelerated inference for sub-second responses",
    ],
    techDossier:
      "Utilizes Sentence-Transformers for document embedding. FAISS handles vector search, which feeds a Groq-accelerated LLM to synthesize answers while maintaining a strict citation chain.",
    stats: { index: "FAISS", infer: "Groq API", security: "Encrypted" },
    image:
      "https://images.unsplash.com/photo-1576086213369-97a306d36557?q=80&w=2000&auto=format&fit=crop",
  },
];

export default function ProjectsSection() {
  return (
    <section
      id="projects"
      className="relative py-24 px-6 max-w-7xl mx-auto"
    >
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
            Project Milestones
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

            <h4 className="text-[10px] font-mono uppercase tracking-[0.4em] text-white/40 mb-10">
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
