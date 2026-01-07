import React from 'react'
import { motion } from 'framer-motion'

const lines = [
  'building agentic AI systems',
  'full-stack engineering',
  'Spring Boot • FastAPI • React • Kubernetes'
]

function useTyping(text: string, speed = 40) {
  const [display, setDisplay] = React.useState('')

  React.useEffect(() => {
    let i = 0
    setDisplay('')
    const id = setInterval(() => {
      setDisplay((d) => d + text[i])
      i++
      if (i >= text.length) clearInterval(id)
    }, speed)
    return () => clearInterval(id)
  }, [text, speed])

  return display
}

export default function Hero(){
  const [idx, setIdx] = React.useState(0)
  const typed = useTyping(lines[idx])

  React.useEffect(() => {
    const t = setInterval(() => setIdx((s) => (s + 1) % lines.length), 3000)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="grid md:grid-cols-2 gap-6 items-start">
      <motion.div initial={{opacity:0, y:8}} animate={{opacity:1, y:0}} transition={{duration:0.6}} className="space-y-4">
        <div className="text-slate-400 mono text-sm">// console: operator</div>
        <h1 className="text-4xl font-semibold">Engineering agentic systems</h1>
        <div className="panel p-4 rounded mono bg-opacity-5">
          <div className="text-accent">&gt; {typed}<span className="animate-pulse">█</span></div>
        </div>

        <div className="flex gap-3">
          <a href="#projects" className="panel px-4 py-2 rounded">View Projects</a>
          <a href="#contact" className="panel px-4 py-2 rounded">Contact Me</a>
        </div>
      </motion.div>

      <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.15}} className="panel p-4 rounded h-64">
        <div className="h-full flex items-center justify-center text-sm text-slate-300">
          {/* Placeholder for subtle network mesh or particle field - replace with R3F or canvas as desired */}
          <div className="text-center">
            <div className="font-mono text-xs text-slate-400">[Network mesh animation placeholder]</div>
            <div className="mt-3 text-slate-300">Subtle particle / mesh background goes here.</div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
