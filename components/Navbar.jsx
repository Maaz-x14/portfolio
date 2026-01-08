import React, { useEffect, useState } from 'react'
import Link from 'next/link'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ${
      scrolled ? 'bg-[#13315C] py-4 shadow-2xl' : 'bg-transparent py-10'
    }`}>
      <div className="max-w-[1400px] mx-auto px-12 flex justify-between items-center">
        {/* Dynamic Text Color: Navy when transparent, White when scrolled */}
        <Link href="/" className={`font-bold tracking-[0.4em] text-[10px] font-sans transition-colors duration-500 ${
          scrolled ? 'text-[#EEF4ED]' : 'text-[#0B2545]'
        }`}>
          MAAZ_AHMAD // ENGINEER
        </Link>
        
        <ul className="flex gap-14 items-center">
          {['HOME', 'WORK', 'DOCTRINE', 'CONTACT'].map((label) => (
            <li key={label} className="group relative">
              <Link href={`#${label.toLowerCase()}`} className={`text-[10px] font-sans uppercase tracking-[0.4em] font-bold transition-all duration-500 ${
                scrolled ? 'text-[#EEF4ED] hover:opacity-50' : 'text-[#0B2545] hover:opacity-50'
              }`}>
                {label}
              </Link>
              <span className={`absolute -bottom-2 left-0 w-full h-[1px] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left ${
                scrolled ? 'bg-[#EEF4ED]' : 'bg-[#0B2545]'
              }`} />
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}