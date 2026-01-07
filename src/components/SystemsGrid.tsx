import React from 'react'
import { motion } from 'framer-motion'

const systems = [
  { title: 'Agentic AI Workflows', tech: ['LangChain', 'Redis', 'K8s'] },
  { title: 'Retrieval-Augmented Gen (RAG)', tech: ['FAISS', 'Postgres', 'FastAPI'] },
  { title: 'Full-Stack Web Platforms', tech: ['React', 'Spring', 'Node'] },
  { title: 'IoT & Real-Time Monitoring', tech: ['MQTT', 'WebSockets', 'TimescaleDB'] },
  { title: 'DevOps / CI-CD Pipelines', tech: ['ArgoCD', 'Terraform', 'GitHub Actions'] }
]

function TiltCard({ children }: { children: React.ReactNode }){
  const ref = React.useRef<HTMLDivElement | null>(null)

  function onMove(e: React.MouseEvent){
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const x = e.clientX - r.left
    const y = e.clientY - r.top
    const px = (x / r.width - 0.5) * 10
    const py = (y / r.height - 0.5) * -10
    el.style.transform = `rotateX(${py}deg) rotateY(${px}deg) translateZ(0)`
  }
  function onLeave(){
    const el = ref.current
    if (!el) return
    el.style.transform = ''
  }

  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} className="panel p-4 rounded transition-transform will-change-transform"
      style={{transformStyle:'preserve-3d'}}>
      {children}
    </div>
  )
}

export default function SystemsGrid(){
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {systems.map(s => (
        <TiltCard key={s.title}>
          <motion.div whileHover={{scale:1.02}} className="space-y-2">
            <div className="text-lg font-semibold">{s.title}</div>
            <div className="flex gap-2 flex-wrap">
              {s.tech.map(t => (
                <span key={t} className="mono text-xs px-2 py-1 rounded bg-white/3">{t}</span>
              ))}
            </div>
          </motion.div>
        </TiltCard>
      ))}
    </div>
  )
}
