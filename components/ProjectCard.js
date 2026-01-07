import { useState, useRef } from 'react'
import { motion } from 'framer-motion'

export default function ProjectCard({project}){
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  function onMove(e){
    const el = ref.current
    if(!el) return
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    el.style.setProperty('--mx', `${x}px`)
    el.style.setProperty('--my', `${y}px`)
  }

  return (
    <motion.article onMouseMove={onMove} whileHover={{ y: -6 }} ref={ref} className="exhibit p-6" initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} transition={{duration:0.45}}>
      <div className="spotlight-bg" style={{backgroundImage:`radial-gradient(500px circle at var(--mx,50%) var(--my,50%), rgba(141,169,196,0.06), transparent 30%)`}} />
      <div className="flex flex-col gap-4 relative">
        <div className="frame-img" aria-hidden="true" style={{background: 'linear-gradient(135deg, rgba(19,64,116,0.04), rgba(19,49,92,0.02))'}} />

        <div className="text-center">
          <h3 className="text-lg font-display uppercase tracking-widest text-[var(--text)]">{project.title}</h3>
          <p className="mt-2 text-[var(--muted)] text-sm">{project.tagline}</p>

          <div className="mt-4 text-[var(--text)] leading-relaxed text-sm">{project.overview.student}</div>

          <div className="mt-4">
            <button aria-expanded={open} onClick={()=>setOpen(s=>!s)} className="dossier-toggle">
              <span style={{width:20,height:20,display:'inline-block',border:`1px solid var(--borderrgba)`,borderRadius:4,alignItems:'center',justifyContent:'center',display:'inline-flex'}}>{open ? '−' : '+'}</span>
              <span className="text-sm">Technical Dossier</span>
            </button>
          </div>

          {open && (
            <div className="dossier-content text-sm mono-pre text-[var(--muted)]" style={{background:'linear-gradient(180deg, rgba(255,255,255,0.02), transparent)',padding:'0.75rem',borderRadius:8}}>
              <div><strong>Stack:</strong> Spring Boot · MQTT · FAISS · FastAPI</div>
              <div className="mt-2"><strong>Hardware:</strong> ESP32 · Sensors · Low-power design · Edge gateways</div>
              <div className="mt-1"><strong>ML:</strong> Llama-3.1, RAG, FAISS indexing; ReAct execution loops for orchestration</div>
              <div className="mt-1"><strong>Infra:</strong> Docker · Kubernetes · Jenkins · CI/CD pipelines · JWT security</div>
            </div>
          )}
        </div>
      </div>
    </motion.article>
  )
}
