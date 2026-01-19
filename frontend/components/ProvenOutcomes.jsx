import { useState } from 'react';
import { motion } from 'framer-motion';

const BENCHMARKS = [
  { 
    id: 'agentic', 
    category: 'Agentic AI / Logic',
    title: 'Autonomous Multi-Agent Orchestration', 
    metric: 'ReAct',
    label: 'Execution Logic',
    text: 'Engineered self-correcting agent behaviors using Directed Acyclic Graphs (DAGs) and Llama 3.1, enabling autonomous recovery from task-level failures during tool use.',
    tags: ['FastAPI', 'Llama 3.1', 'React Flow']
  },
  { 
    id: 'cloud', 
    category: 'Full-Stack / DevOps',
    title: 'Automated Deployment Reliability', 
    metric: '0 Errors',
    label: 'Manual Deployment Fallacy',
    text: 'Architected CI/CD pipelines via Jenkins and Kubernetes for enterprise-scale Spring Boot services, eliminating deployment volatility while maintaining JWT-based session security.',
    tags: ['Spring Boot', 'Kubernetes', 'Jenkins']
  },
  { 
    id: 'rag', 
    category: 'RAG / Vector Engineering',
    title: 'Context-Grounded Synthesis', 
    metric: '100%',
    label: 'Citation Precision',
    text: 'Developed high-throughput RAG systems with FAISS vector indexing and Groq acceleration, mandating chunk-level citations to ensure zero-hallucination in technical datasets.',
    tags: ['FAISS', 'Groq API', 'Python']
  }
];

export default function OperationalBenchmarks() {
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <section id="benchmarks" className="py-32 px-6 bg-[#EEF4ED] relative overflow-hidden">
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
            Operational Benchmarks
          </motion.h1>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {BENCHMARKS.map((b, i) => (
            <motion.div
              key={b.id}
              onMouseEnter={() => setHoveredId(b.id)}
              onMouseLeave={() => setHoveredId(null)}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.8 }}
              className="relative group h-[450px]"
            >
              {/* MUSEUM PLAQUE CARD STYLE */}
              <div className="h-full w-full bg-white/40 backdrop-blur-sm border border-black/5 p-8 flex flex-col justify-between transition-all duration-500 group-hover:bg-white group-hover:shadow-2xl group-hover:shadow-[#0B2545]/5">
                
                <div>
                  <div className="flex justify-between items-start mb-10">
                    <span className="text-[10px] font-mono text-[#134074]/40 uppercase tracking-widest">
                        {b.category}
                    </span>
                    {/* STATUS INDICATOR */}
                    <div className={`h-1.5 w-1.5 rounded-full ${hoveredId === b.id ? 'bg-green-500' : 'bg-[#0B2545]/10'}`} />
                  </div>
                  
                  <div className="mb-8">
                    <div className="text-6xl font-black text-[#0B2545] tracking-tighter mb-1">
                        {b.metric}
                    </div>
                    <div className="text-[10px] font-mono text-[#0B2545] font-bold uppercase tracking-widest opacity-40">
                        {b.label}
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-[#0B2545] leading-tight mb-4">
                    {b.title}
                  </h3>
                  <p className="text-[#134074]/70 text-sm leading-relaxed italic">
                    "{b.text}"
                  </p>
                </div>

                {/* TAG FOOTER */}
                <div className="overflow-hidden">
                  <motion.div
                    animate={{ y: hoveredId === b.id ? 0 : 20, opacity: hoveredId === b.id ? 1 : 0.5 }}
                    className="flex flex-wrap gap-2 pt-6 border-t border-[#0B2545]/5"
                  >
                    {b.tags.map(tag => (
                      <span key={tag} className="text-[9px] font-mono bg-[#0B2545]/5 px-2 py-1 rounded text-[#0B2545]/60 uppercase">
                        {tag}
                      </span>
                    ))}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}