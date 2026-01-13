import React, { useState, useRef } from 'react';
import { motion, useSpring, useTransform, useMotionValue } from 'framer-motion';

const ENDORSEMENTS = [
  {
    id: 'VER_PB_01',
    name: 'Ammad Ullah Rameez',
    role: 'Sr Software Engineer @ PlanetBeyond',
    email: 'ammad.rameez@planetbeyond.co.uk',
    quote: "Maaz is an extremely brilliant and quick learner. His ability to stabilize our CI/CD pipelines and handle Kubernetes orchestration during his tenure was exceptional.",
    tag: 'Production Stability'
  },
  {
    id: 'VER_NT_02',
    name: 'Ayesha Naseer',
    role: 'Assoc HOD @ MCS, NUST',
    email: 'ayeshanaseer@mcs.edu.pk',
    quote: "A standout engineering talent. Maaz possesses a rare combination of technical agility and disciplined learning that makes him an asset to any high-stakes project.",
    tag: 'Academic Excellence'
  },
  {
    id: 'VER_NT_03',
    name: 'Dr. Usman Mahmood',
    role: 'HOD CSE @ MCS, NUST',
    email: 'hod-cs@mcs.edu.pk',
    quote: "Extremely dedicated and technically gifted. Maaz consistently demonstrated an advanced understanding of complex software architectures during his time at NUST.",
    tag: 'Leadership Potential'
  }
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="bg-[#EEF4ED] py-32 px-6 relative overflow-hidden border-t border-[#0B2545]/10">
      {/* ARCHITECTURAL GRID BACKGROUND */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none" 
           style={{ backgroundImage: `radial-gradient(#0B2545 1px, transparent 1px)`, backgroundSize: '30px 30px' }} 
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* UNIFIED HEADER PATTERN */}
        <header className="mb-24 space-y-2">
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="text-sm font-mono tracking-[0.5em] text-[#134074]/60 uppercase"
          >
            Testimonials
          </motion.h2>
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl font-black text-[#0B2545] tracking-tighter uppercase"
          >
            Peer Endorsements
          </motion.h1>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {ENDORSEMENTS.map((endorser, i) => (
            <EndorsementCard key={endorser.id} endorser={endorser} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function EndorsementCard({ endorser, index }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // MAGNETIC TILT LOGIC
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], ["10deg", "-10deg"]), { stiffness: 100, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], ["-10deg", "10deg"]), { stiffness: 100, damping: 20 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.8 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="relative group h-full"
    >
      {/* DOSSIER CARD STYLE */}
      <div className="h-full bg-white/40 backdrop-blur-sm border border-black/5 p-10 flex flex-col justify-between transition-all duration-500 group-hover:bg-white group-hover:shadow-2xl">

        <div>
          <div className="flex justify-between items-start mb-10">
            {/* <span className="text-[9px] font-mono text-[#134074]/40 uppercase tracking-[0.3em]">
              Validation_ID // {endorser.id}
            </span> */}
            <div className="h-1 w-8 bg-[#134074] group-hover:w-12 transition-all" />
          </div>

          {/* THE QUOTE */}
          <div className="mb-12 relative">
             <span className="absolute -top-6 -left-4 text-6xl text-[#134074]/5 font-serif select-none">“</span>
             <p className="text-[#0B2545] text-lg font-display italic leading-relaxed relative z-10">
               {endorser.quote}
             </p>
          </div>
        </div>

        {/* AUTHOR METADATA */}
        <div className="pt-8 border-t border-[#0B2545]/10 space-y-4">
          <div>
            <h3 className="text-xl font-bold text-[#0B2545] uppercase tracking-tight">
              {endorser.name}
            </h3>
            <p className="text-[10px] font-mono text-[#134074]/60 uppercase tracking-widest mt-1">
              {endorser.role}
            </p>
          </div>
          
          <div className="flex flex-col gap-1">
            <p className="text-[9px] font-mono text-[#134074]/40 uppercase">Email:</p>
            <p className="text-[10px] font-mono text-[#134074] opacity-80 break-all">
              {endorser.email}
            </p>
          </div>
        </div>

      </div>
    </motion.div>
  );
}