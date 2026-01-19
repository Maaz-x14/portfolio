import React, { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

const LEDGER_ENTRIES = [
  {
    id: 'EXP_PB_01',
    date: 'JUL — AUG 2025',
    title: 'Green Tourism Architecture',
    role: 'Software Engineering Intern',
    text: 'Engineered a sustainability-focused platform using Spring Boot and React. Developed administrative monitoring modules for complaint tracking and implemented advanced search functionality for localized environmental records. Successfully bridged platform accessibility by delivering production-ready React Native features.',
    payload: ['Spring Boot', 'React', 'React Native', 'JWT', 'RBAC', 'OAuth2']
  },
  {
    id: 'EXP_PB_02',
    date: 'JUL — AUG 2025',
    title: 'Cloud & Pipeline Infrastructure',
    role: 'DevOps Engineer Intern',
    text: 'Architected automated CI/CD pipelines to modernize internal deployment workflows. Leveraged Jenkins, Docker, and Kubernetes to orchestrate containerized services, which effectively eliminated manual deployment errors and established consistent stability across production environments.',
    payload: ['Jenkins', 'Docker', 'Kubernetes', 'CI/CD', 'Linux']
  }
];

export default function Journey() {
  const containerRef = useRef(null);
  
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
    <section id="experience" ref={containerRef} className="bg-[#EEF4ED] py-32 relative overflow-hidden border-t border-[#0B2545]/10">
      {/* ARCHITECTURAL GRID BACKGROUND */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none" 
           style={{ backgroundImage: `radial-gradient(#0B2545 1px, transparent 1px)`, backgroundSize: '30px 30px' }} 
      />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <header className="mb-24 space-y-2">
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="text-sm font-mono tracking-[0.5em] text-[#134074]/60 uppercase"
          >
            Verified Career Milestones
          </motion.h2>
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl font-black text-[#0B2545] tracking-tighter uppercase"
          >
            Experience
          </motion.h1>
          <div className="flex items-center gap-4 pt-4">
             <span className="text-[10px] font-mono bg-[#0B2545] text-white px-3 py-1 uppercase tracking-[0.2em]">NUST | B.E. Software Engineering</span>
          </div>
        </header>

        <div className="relative">
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
      <div className="absolute left-0 md:left-1/2 top-0 md:top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
        <div className="w-3 h-3 bg-[#0B2545] border-4 border-[#EEF4ED] rounded-none" />
      </div>

      <motion.div 
        initial={{ opacity: 0, x: isEven ? 50 : -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full md:w-[45%] bg-white/40 backdrop-blur-sm border border-black/5 p-10 hover:bg-white hover:shadow-2xl transition-all duration-500 group"
      >
        <div className="flex justify-between items-start mb-6">
          <span className="text-[9px] font-mono text-[#134074]/40 uppercase tracking-[0.3em]">
            Record | {entry.id}
          </span>
          <span className="text-[10px] font-mono text-[#0B2545]/60 uppercase font-bold">
            {entry.date}
          </span>
        </div>

        <h3 className="text-2xl font-black text-[#0B2545] leading-tight mb-2 uppercase tracking-tighter">
          {entry.title}
        </h3>
        <p className="text-[10px] font-mono text-[#134074] uppercase tracking-widest mb-6 font-bold opacity-60">
          ROLE: {entry.role}
        </p>

        <p className="text-[#134074]/80 text-sm leading-relaxed mb-8 italic">
          "{entry.text}"
        </p>

        <div className="pt-6 border-t border-[#0B2545]/10 space-y-3">
          <p className="text-[9px] font-mono uppercase text-[#0B2545]/40 tracking-widest font-bold">Systems Output</p>
          <div className="flex flex-wrap gap-2">
            {entry.payload.map(tag => (
              <span key={tag} className="text-[9px] font-mono bg-[#0B2545]/5 px-2 py-1 text-[#0B2545]/60 uppercase border border-[#0B2545]/5">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      <div className="hidden md:block w-[45%]" />
    </div>
  );
}