import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function ProjectCard({project}){
  const [open, setOpen] = useState(false)
  const [hasMounted, setHasMounted] = useState(false)
  const ref = useRef(null)

  useEffect(()=>{ setHasMounted(true) }, [])

  function onMove(e){
    const el = ref.current
    if(!el) return
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    el.style.setProperty('--mx', `${x}px`)
    el.style.setProperty('--my', `${y}px`)
  }

  const Content = (
    <article onMouseMove={onMove} ref={ref} className="exhibit p-6 relative">
      <div className="spotlight-bg" style={{backgroundImage:`radial-gradient(500px circle at var(--mx,50%) var(--my,50%), rgba(141,169,196,0.06), transparent 30%)`}} />
      <div className="flex flex-col gap-4 relative">
        <div className="frame-img overflow-hidden relative">
          {/* image placeholder uses gradient background */}
          <div className="absolute inset-0 transition-transform duration-300" style={{background:'linear-gradient(135deg, rgba(19,64,116,0.04), rgba(19,49,92,0.02))'}} />
        </div>

        <div className="text-center">
          <h3 className="text-lg font-display uppercase tracking-widest text-[var(--text)]">{project.title}</h3>
          <p className="mt-2 text-[var(--muted)] text-sm">{project.tagline}</p>

          <div className="mt-4 text-[var(--text)] leading-relaxed text-sm">{project.overview.student}</div>

          <div className="mt-4">
            <button aria-expanded={open} onClick={()=>setOpen(s=>!s)} className="dossier-toggle">
              <span style={{width:20,height:20,display:'inline-block',border:`1px solid var(--borderrgba)`,borderRadius:0,alignItems:'center',justifyContent:'center',display:'inline-flex'}}>{open ? '−' : '+'}</span>
              <span className="text-sm">Technical Dossier</span>
            </button>
          </div>

          {open && (
            <div className="dossier-content text-sm mono-pre text-[var(--muted)]" style={{background:'linear-gradient(180deg, rgba(255,255,255,0.02), transparent)',padding:'0.75rem',borderRadius:0}}>
              <div><strong>Stack:</strong> Spring Boot · MQTT · FAISS · FastAPI</div>
              <div className="mt-2"><strong>Hardware:</strong> ESP32 · Sensors · Low-power design · Edge gateways</div>
              <div className="mt-1"><strong>ML:</strong> Llama-3.1, RAG, FAISS indexing; ReAct execution loops for orchestration</div>
              <div className="mt-1"><strong>Infra:</strong> Docker · Kubernetes · Jenkins · CI/CD pipelines · JWT security</div>
            </div>
          )}
        </div>
      </div>

      {/* hover overlay */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="bg-[rgba(11,37,69,0.6)] text-[var(--mist-white)] px-4 py-2" style={{borderRadius:0}}>View Details</div>
      </div>

      {/* live sensor dot for Smart AQI */}
      {project.id === 'aqi' && (
        <div style={{position:'absolute',top:12,right:12,display:'flex',alignItems:'center',gap:8}}>
          <span style={{width:10,height:10,background:'#E44',borderRadius:0,boxShadow:'0 0 8px rgba(228,68,68,0.6)',animation:'pulse-slow 1.4s infinite'}} />
          <span className="text-xs text-[var(--muted)]">Live Sensor</span>
        </div>
      )}
    </article>
  )

  return hasMounted ? (
    <motion.div initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} transition={{duration:0.45}}>
      {Content}
    </motion.div>
  ) : Content
}
