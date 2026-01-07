import { motion } from 'framer-motion'
import Link from 'next/link'

export default function Hero(){
  return (
    <header id="purpose" className="max-content px-6 py-28 text-center">
      <motion.h1 initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.06,duration:0.6}} className="text-6xl md:text-7xl font-display tracking-widest text-[var(--text)]">MAAZ AHMAD</motion.h1>

      <motion.p initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.16,duration:0.6}} className="mt-4 max-w-2xl mx-auto text-xl font-sans text-[var(--text)]">
        Architecting Intelligent Systems with Human Purpose.
      </motion.p>

      <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.28,duration:0.6}} className="mt-6 flex justify-center gap-4 items-center">
        <div className="px-3 py-1 border" style={{borderColor:'var(--border-main)',borderRadius:8,background:'rgba(19,49,92,0.04)',color:'var(--text)'}}>NUST • B.S. SE • CGPA 3.5</div>
      </motion.div>

      <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.36,duration:0.6}} className="mt-8 flex justify-center gap-4">
        <Link href="#projects" className="btn-accent">View The Exhibits</Link>
        <Link href="#contact" className="border-1px px-4 py-2" style={{borderColor:'var(--border-main)',color:'var(--text)'}}>Contact</Link>
      </motion.div>
    </header>
  )
}