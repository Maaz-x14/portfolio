import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function ProjectCard({ project }) {
  const [hovered, setHovered] = useState(false)
  const [hasMounted, setHasMounted] = useState(false)
  const ref = useRef(null)

  useEffect(() => { setHasMounted(true) }, [])

  // Dynamic logs based on project context
  const getLogs = () => [
    `Initializing [${project.title}]...`,
    `Agent: Routing to ${project.tagline}`,
    "Stack: React / Spring Boot / RAG",
    "Status: Deployment Optimal",
    `TraceID: ${Math.random().toString(36).substr(2, 9)}`
  ]

  function onMove(e) {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    el.style.setProperty('--mx', `${x}px`)
    el.style.setProperty('--my', `${y}px`)
  }

  const Content = (
    <article 
      onMouseMove={onMove} 
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      ref={ref} 
      className="exhibit p-8 relative overflow-hidden group cursor-crosshair border border-black/5 bg-white/50"
    >
      <div className="spotlight-bg" style={{ backgroundImage: `radial-gradient(400px circle at var(--mx,50%) var(--my,50%), rgba(19,64,116,0.05), transparent 40%)` }} />
      
      <div className="flex flex-col gap-6 relative z-10">
        <div className="text-left">
          <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#134074]/60">Project Reference</span>
          <h3 className="text-2xl font-display uppercase tracking-tight text-[#0B2545] mt-1">{project.title}</h3>
          <p className="mt-2 text-[#134074]/80 text-sm font-medium">{project.tagline}</p>

          <div className="mt-6 text-[#134074] leading-relaxed text-sm max-w-xs">
            {project.overview.student}
          </div>
        </div>
      </div>

      {/* BENTO-LOG OVERLAY */}
      <AnimatePresence>
        {hovered && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-[#0B2545]/95 backdrop-blur-xl p-6 font-mono text-[10px] flex flex-col pointer-events-none"
          >
            <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-2">
              <span className="text-white/40 tracking-widest uppercase">System.log</span>
              <span className="text-emerald-400 animate-pulse">ACTIVE</span>
            </div>
            <div className="space-y-2">
              {getLogs().map((log, i) => (
                <motion.p 
                  initial={{ opacity: 0, x: -5 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  key={i} 
                  className="text-white/70"
                >
                  <span className="text-white/20 mr-2">❯</span>{log}
                </motion.p>
              ))}
            </div>
            <div className="mt-auto pt-4 border-t border-white/10 text-white/30 italic">
              -- End of Trace --
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Live sensor dot */}
      {project.id === 'aqi' && (
        <div className="absolute top-6 right-6 flex items-center gap-2">
          <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
          <span className="text-[10px] font-mono uppercase text-[#0B2545]/40">Sensor</span>
        </div>
      )}
    </article>
  )

  return hasMounted ? (
    <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
      {Content}
    </motion.div>
  ) : Content
}