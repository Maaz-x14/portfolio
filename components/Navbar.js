import Link from 'next/link'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function Navbar(){
  const [hidden, setHidden] = useState(false)
  useEffect(()=>{
    let lastY = 0
    const onScroll = () => {
      const y = window.scrollY
      setHidden(y > lastY && y > 80)
      lastY = y
    }
    window.addEventListener('scroll', onScroll)
    return ()=>window.removeEventListener('scroll', onScroll)
  },[])

  return (
    <motion.nav initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6 }} className={`fixed left-0 right-0 z-50 transition-transform duration-300 ${hidden ? '-translate-y-full' : 'translate-y-0'}`}>
      <div className="max-w-4xl mx-auto px-6 py-4">
        <div style={{backdropFilter:'blur(8px)',background:'rgba(255,255,255,0.6)',border:`1px solid var(--border-main)`,borderRadius:12}} className="mx-auto px-6 py-3 flex items-center justify-between">
          <div className="text-sm font-display text-[var(--text)] tracking-wide">MAAZ AHMAD</div>
          <ul className="flex justify-center gap-8 text-sm font-medium text-[var(--text)]">
            <li><Link href="#projects" className="hover:text-[var(--accent)] transition-colors">Work</Link></li>
            <li><Link href="#purpose" className="hover:text-[var(--accent)] transition-colors">Purpose</Link></li>
            <li><Link href="#about" className="hover:text-[var(--accent)] transition-colors">About</Link></li>
            <li><Link href="#contact" className="hover:text-[var(--accent)] transition-colors">Contact</Link></li>
          </ul>
        </div>
      </div>
    </motion.nav>
  )
}