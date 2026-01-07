// components/Hero.js
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Hero(){
  const [hasMounted, setHasMounted] = useState(false)
  useEffect(()=> setHasMounted(true), [])

  // If not mounted, render static content to avoid hydration mismatch
  if(!hasMounted){
    return (
      <header id="purpose" className="max-content px-6 py-28 text-center">
        <h1 className="text-6xl md:text-7xl font-display tracking-widest text-[var(--text-main)]">MAAZ AHMAD</h1>
        <p className="mt-4 max-w-2xl mx-auto text-xl font-sans text-[var(--text-main)]">Software Engineer at NUST (CGPA: 3.5). Architecting intelligent systems with human-centric purpose.</p>
        <div className="mt-6 flex justify-center gap-4 items-center">
          <div className="px-3 py-1 border border-[var(--border-main)] bg-transparent text-[var(--text-main)]" style={{borderRadius:0}}>NUST // Software Engineering // Expected 2027</div>
        </div>
        <div className="mt-8 flex justify-center gap-4">
          <a href="#projects" className="btn-accent">View The Exhibits</a>
          <a href="#contact" className="border border-[var(--border-main)] px-4 py-2 text-[var(--text-main)] hover:bg-white/50 transition-all">Contact</a>
        </div>
      </header>
    )
  }

  return (
    <header id="purpose" className="max-content px-6 py-28 text-center">
      <motion.h1 
        initial={{opacity:0,y:20}} 
        animate={{opacity:1,y:0}} 
        transition={{delay:0.06,duration:0.6}} 
        className="text-6xl md:text-7xl font-display tracking-widest text-[var(--text-main)]"
      >
        MAAZ AHMAD
      </motion.h1>

      <motion.p 
        initial={{opacity:0,y:20}} 
        animate={{opacity:1,y:0}} 
        transition={{delay:0.16,duration:0.6}} 
        className="mt-4 max-w-2xl mx-auto text-xl font-sans text-[var(--text-main)]"
      >
        Software Engineer at NUST (CGPA: 3.5). Architecting intelligent systems with human-centric purpose.
      </motion.p>

      <motion.div 
        initial={{opacity:0,y:20}} 
        animate={{opacity:1,y:0}} 
        transition={{delay:0.28,duration:0.6}} 
        className="mt-6 flex justify-center gap-4 items-center"
      >
        <div className="px-3 py-1 border border-[var(--border-main)] bg-transparent text-[var(--text-main)]" style={{borderRadius:0}}>
          NUST // Software Engineering // Expected 2027
        </div>
      </motion.div>

      <motion.div 
        initial={{opacity:0,y:20}} 
        animate={{opacity:1,y:0}} 
        transition={{delay:0.36,duration:0.6}} 
        className="mt-8 flex justify-center gap-4"
      >
        <Link href="#projects" className="btn-accent">View The Exhibits</Link>
        <Link href="#contact" className="border border-[var(--border-main)] px-4 py-2 text-[var(--text-main)] hover:bg-white/50 transition-all">
          Contact
        </Link>
      </motion.div>
    </header>
  )
}