import { useState, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const DOCTRINE_STEPS = [
  {
    principle: "Scalable Foundations",
    human: "Full-Stack Orchestration",
    description: "I build end-to-end systems that handle heavy load, from robust backends to seamless user interfaces, bridging complex logic with real-world usability.",
    tags: ["Spring Boot", "React", "MERN Stack", "Java", "SQL", "Python"]
  },
  {
    principle: "Intelligence over Automation",
    human: "Agentic Systems & RAG",
    description: "I create intelligent workflows and RAG pipelines that reason, self-correct, and deliver actionable insights beyond mere automation.",
    tags: ["LLMs", "FastAPI", "FAISS", "LangChain", "RAG", "Transformers"]
  },
  {
    principle: "Reliability at Scale",
    human: "IoT & Cloud Infrastructure",
    description: "I connect physical sensors to cloud systems with real-time telemetry, CI/CD, and resilient infrastructure to ensure uninterrupted operation at scale.",
    tags: ["Kubernetes", "Docker", "MQTT", "ESP32", "Jenkins"]
  }
];

export default function Doctrine() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const containerRef = useRef(null);

  return (
    <section id="doctrine" ref={containerRef} className="py-32 px-6 bg-[#EEF4ED] relative overflow-hidden">
      {/* ARCHITECTURAL GRID BACKGROUND */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none" 
           style={{ 
             backgroundImage: `radial-gradient(#0B2545 1px, transparent 1px)`, 
             backgroundSize: '30px 30px' 
           }} 
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <header className="mb-20 space-y-2">
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="t-ext-sm font-mono tracking-[0.5em] text-[#134074]/60 uppercase"
          >
            How I Build Things
          </motion.h2>
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl font-black text-[#0B2545] tracking-tighter uppercase"
          >
            Core Architecture
          </motion.h1>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {DOCTRINE_STEPS.map((step, i) => (
            <motion.div
              key={i}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15, duration: 0.8 }}
              className="relative group h-[400px]"
            >
              {/* MUSEUM PLAQUE CARD */}
              <div className="h-full w-full bg-white/40 backdrop-blur-sm border border-black/5 p-8 flex flex-col justify-between transition-all duration-500 group-hover:bg-white group-hover:shadow-2xl group-hover:shadow-[#0B2545]/5">
                
                {/* Header: Human-Readable Side */}
                <div>
                  <h3 className="text-2xl font-bold text-[#0B2545] leading-tight mb-4">
                    {step.human}
                  </h3>
                  <p className="text-[#134074]/70 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Footer: Tech Side (Visible on Hover) */}
                <div className="overflow-hidden">
                  <motion.div
                    animate={{ y: hoveredIndex === i ? 0 : 100, opacity: hoveredIndex === i ? 1 : 0 }}
                    transition={{ type: "spring", stiffness: 100, damping: 20 }}
                    className="space-y-4"
                  >
                    <div className="h-[1px] w-full bg-[#0B2545]/10" />
                    <div className="text-[10px] font-mono text-[#0B2545] font-bold uppercase tracking-widest">
                      Execution Principle
                    </div>
                    <div className="text-lg font-display text-[#134074] italic">
                      "{step.principle}"
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {step.tags.map(tag => (
                        <span key={tag} className="text-[9px] font-mono bg-[#0B2545]/5 px-2 py-1 rounded text-[#0B2545]/60 uppercase">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </div>

                {/* The "Simple" static indicator if not hovered */}
                {hoveredIndex !== i && (
                    <motion.div layoutId="plus" className="text-xl text-[#0B2545]/20 font-light">+</motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}