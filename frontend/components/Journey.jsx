import React, { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

const LEDGER_ENTRIES = [
  {
    id: 'DEP_01',
    date: 'July - Aug 2025',
    title: 'Impact Ledger — Planet Beyond',
    role: 'DevOps & Backend Engineer',
    text: 'Stabilized the Green Tourism platform by implementing Jenkins-driven CI/CD pipelines, Docker containerization, Kubernetes orchestration, and JWT-based authentication.',
    payload: ['Jenkins', 'Kubernetes', 'Docker', 'JWT', 'Production Monitoring']
  },
  {
    id: 'PRO_02',
    date: 'Sept 2025',
    title: 'Edge Intelligence Prototype',
    role: 'RAG & IoT Architect',
    text: 'Engineered an Edge-to-Cloud bridge for autonomous environmental monitoring. Integrated ESP32 telemetry with FAISS-based indexing and RAG-enabled agent loops for self-correcting remediation.',
    payload: ['ESP32', 'FAISS', 'RAG', 'Agentic Loops', 'MQTT']
  }
];

export default function Journey() {
  const containerRef = useRef(null);
  
  // Progress Spine Logic
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });
  
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section id="ledger" ref={containerRef} className="bg-[#EEF4ED] py-32 relative overflow-hidden border-t border-[#0B2545]/10">
      {/* ARCHITECTURAL GRID BACKGROUND */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none" 
           style={{ backgroundImage: `radial-gradient(#0B2545 1px, transparent 1px)`, backgroundSize: '30px 30px' }} 
      />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* UNIFIED HEADER PATTERN */}
        <header className="mb-24 space-y-2">
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="text-sm font-mono tracking-[0.5em] text-[#134074]/60 uppercase"
          >
            Metrics & Validation
          </motion.h2>
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl font-black text-[#0B2545] tracking-tighter uppercase"
          >
            Impact Ledger
          </motion.h1>
          <div className="flex items-center gap-4 pt-4">
             <span className="text-[10px] font-mono bg-[#0B2545] text-white px-2 py-1 uppercase tracking-widest">NUST // B.S. Software Engineering</span>
             <span className="text-[10px] font-mono border border-[#0B2545]/20 px-2 py-1 uppercase text-[#0B2545]/60 tracking-widest">CGPA 3.5</span>
          </div>
        </header>

        <div className="relative">
          {/* THE OPERATIONAL SPINE */}
          <motion.div 
            style={{ scaleY, originY: 0 }}
            className="absolute left-0 md:left-1/2 top-0 bottom-0 w-[1px] bg-[#0B2545] hidden md:block"
          />

          <div className="space-y-32">
            {LEDGER_ENTRIES.map((entry, i) => (
              <LedgerEntry key={entry.id} entry={entry} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function LedgerEntry({ entry, index }) {
  const isEven = index % 2 === 0;

  return (
    <div className={`relative flex flex-col md:flex-row items-center justify-between w-full ${isEven ? 'md:flex-row-reverse' : ''}`}>
      {/* DOT INDICATOR */}
      <div className="absolute left-0 md:left-1/2 top-0 md:top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
        <div className="w-3 h-3 bg-[#0B2545] border-4 border-[#EEF4ED] rounded-none group-hover:scale-150 transition-transform" />
      </div>

      {/* CONTENT BOX (MUSEUM PLAQUE STYLE) */}
      <motion.div 
        initial={{ opacity: 0, x: isEven ? 50 : -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full md:w-[45%] bg-white/40 backdrop-blur-sm border border-black/5 p-10 hover:bg-white hover:shadow-2xl transition-all duration-500 group"
      >
        <div className="flex justify-between items-start mb-6">
          <span className="text-[9px] font-mono text-[#134074]/40 uppercase tracking-[0.3em]">
            Log_Entry // {entry.id}
          </span>
          <span className="text-[10px] font-mono text-[#0B2545]/60 uppercase">
            {entry.date}
          </span>
        </div>

        <h3 className="text-2xl font-bold text-[#0B2545] leading-tight mb-2 uppercase tracking-tight">
          {entry.title}
        </h3>
        <p className="text-[11px] font-mono text-[#134074] uppercase tracking-widest mb-6 opacity-60">
          Role: {entry.role}
        </p>

        <p className="text-[#134074]/80 text-sm leading-relaxed mb-8">
          {entry.text}
        </p>

        {/* TECH PAYLOAD */}
        <div className="pt-6 border-t border-[#0B2545]/10 space-y-3">
          <p className="text-[9px] font-mono uppercase text-[#0B2545]/40 tracking-widest">Technical Payload</p>
          <div className="flex flex-wrap gap-2">
            {entry.payload.map(tag => (
              <span key={tag} className="text-[9px] font-mono bg-[#0B2545]/5 px-2 py-1 text-[#0B2545]/60 uppercase border border-[#0B2545]/5">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* EMPTY SPACE FOR ALTERNATING LAYOUT */}
      <div className="hidden md:block w-[45%]" />
    </div>
  );
}