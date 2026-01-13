import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BENCHMARKS = [
  { 
    id: 'latency', 
    category: 'Full-Stack / Performance',
    title: 'System Latency Optimization', 
    metric: '-40%',
    label: 'API Response Time',
    text: 'Engineered high-concurrency Spring Boot microservices and optimized React state management to slash end-to-end latency for enterprise platforms.',
    tags: ['Spring Boot', 'Redis', 'React']
  },
  { 
    id: 'iot', 
    category: 'IoT / Real-Time',
    title: 'Urban Safety Monitoring', 
    metric: '< 1s',
    label: 'Alert Propagation',
    text: 'Architected a real-time AQI tracking system using edge sensor telemetry, achieving sub-second hazard notifications via MQTT and cloud processing.',
    tags: ['ESP32', 'MQTT', 'React']
  },
  { 
    id: 'ai', 
    category: 'Agentic AI / RAG',
    title: 'Clinical Retrieval Accuracy', 
    metric: '98%',
    label: 'Citation Precision',
    text: 'Developed RAG-driven medical workflows with FAISS vector indexing, ensuring context-grounded answers with verifiable source citations.',
    tags: ['Llama 3.1', 'FAISS', 'FastAPI']
  }
];

export default function OperationalBenchmarks() {
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <section id="benchmarks" className="py-32 px-6 bg-[#F8FAF9] relative overflow-hidden">
      {/* BACKGROUND GRID */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: `linear-gradient(#0B2545 1px, transparent 1px), linear-gradient(90deg, #0B2545 1px, transparent 1px)`, backgroundSize: '50px 50px' }} 
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
          <div>
            <h2 className="text-sm font-mono tracking-[0.4em] text-[#134074]/50 uppercase mb-2">Metrics & Validation</h2>
            <h1 className="text-5xl font-black text-[#0B2545] tracking-tighter uppercase">Operational Benchmarks</h1>
          </div>
          <div className="text-right font-mono text-[10px] text-[#134074]/40 uppercase tracking-widest leading-relaxed">
            Status: System Nominal<br />
            Last Sync: {new Date().toLocaleDateString()}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
          {BENCHMARKS.map((b) => (
            <motion.div
              key={b.id}
              onMouseEnter={() => setHoveredId(b.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="relative group p-8 bg-white border border-[#0B2545]/5 overflow-hidden transition-colors duration-300 hover:bg-[#0B2545]/[0.02]"
            >
              {/* SCANNING LINE EFFECT */}
              <AnimatePresence>
                {hoveredId === b.id && (
                  <motion.div 
                    initial={{ top: "-10%" }}
                    animate={{ top: "110%" }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    className="absolute left-0 right-0 h-[2px] bg-[#134074]/10 z-20 shadow-[0_0_15px_#134074]"
                  />
                )}
              </AnimatePresence>

              <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                  <div className="flex justify-between items-start mb-8">
                    <span className="text-[10px] font-mono text-[#134074]/40 uppercase tracking-widest">{b.category}</span>
                    <div className={`h-2 w-2 rounded-full ${hoveredId === b.id ? 'bg-green-500 animate-pulse' : 'bg-[#0B2545]/10'}`} />
                  </div>
                  
                  <div className="mb-6">
                    <div className="text-5xl font-black text-[#0B2545] tracking-tighter mb-1">{b.metric}</div>
                    <div className="text-[10px] font-mono text-[#134074] uppercase font-bold tracking-widest opacity-60">{b.label}</div>
                  </div>

                  <h3 className="text-xl font-bold text-[#0B2545] mb-3 leading-tight">{b.title}</h3>
                  <p className="text-[#134074]/70 text-sm leading-relaxed mb-6 italic">
                    {b.text}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 pt-6 border-t border-[#0B2545]/5">
                  {b.tags.map(tag => (
                    <span key={tag} className="text-[9px] font-mono border border-[#134074]/10 px-2 py-1 text-[#134074]/60 uppercase">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}