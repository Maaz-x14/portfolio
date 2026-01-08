import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { href: '/', label: 'HOME' },
    { href: '#projects', label: 'GALLERY' },
    { href: '#philosophy', label: 'DOCTRINE' },
    { href: '#contact', label: 'CONTACT' }
  ]

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 border-b ${
        scrolled 
        ? 'bg-[#0B2545] py-4 border-[#8DA9C4]/20 shadow-2xl' 
        : 'bg-transparent py-8 border-transparent'
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-10 flex justify-between items-center">
        {/* Anchor Branding */}
        <Link href="/" className="group flex flex-col pointer-events-auto">
          <span className="text-[#EEF4ED] font-bold tracking-[0.3em] text-sm font-serif">
            MAAZ_AHMAD
          </span>
          <span className="text-[#8DA9C4] text-[10px] tracking-[0.4em] font-sans transition-opacity group-hover:opacity-50">
            ENGINEER // NUST
          </span>
        </Link>
        
        {/* NewsFlix Style Links */}
        <ul className="flex gap-12 items-center pointer-events-auto">
          {links.map((link) => (
            <li key={link.label} className="group relative">
              <Link 
                href={link.href} 
                className="text-[#EEF4ED] text-[10px] font-sans uppercase tracking-[0.3em] font-bold transition-opacity hover:opacity-70"
              >
                {link.label}
              </Link>
              {/* The Sliding Underline */}
              <span className="absolute -bottom-2 left-0 w-full h-[1px] bg-[#EEF4ED] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}