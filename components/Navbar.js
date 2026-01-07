// components/Navbar.js
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function Navbar(){
  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(()=>{
    let lastY = 0
    const onScroll = () => {
      const y = window.scrollY
      setHidden(y > lastY && y > 80)
      setScrolled(y > 8)
      lastY = y
    }
    window.addEventListener('scroll', onScroll)
    return ()=>window.removeEventListener('scroll', onScroll)
  },[])

  return (
    <motion.nav initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.52 }} className={`fixed top-0 left-0 right-0 z-50 ${hidden ? '-translate-y-full' : 'translate-y-0'}`}>
      <div style={{background:'var(--surface-main)', borderBottom: '1px solid var(--steel-blue)', color:'var(--mist-white)', backdropFilter: scrolled ? 'blur(6px)' : 'none', height:72}} className="w-full px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between h-full">
          <div className="text-sm font-display tracking-wide" style={{color:'var(--mist-white)'}}>MAAZ AHMAD</div>
          <ul className="flex justify-center gap-8 text-sm font-medium" style={{color:'var(--mist-white)'}}>
            <li><Link href="#projects" className="hover:text-[var(--steel-blue)] transition-colors">Work</Link></li>
            <li><Link href="#philosophy" className="hover:text-[var(--steel-blue)] transition-colors">Philosophy</Link></li>
            <li><Link href="#expertise" className="hover:text-[var(--steel-blue)] transition-colors">Expertise</Link></li>
            <li><Link href="#contact" className="hover:text-[var(--steel-blue)] transition-colors">Contact</Link></li>
          </ul>
        </div>
      </div>
    </motion.nav>
  )
}