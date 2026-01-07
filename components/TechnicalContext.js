// /components/TechnicalContext.js
import { createContext, useContext, useEffect, useState, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const TechnicalContext = createContext()

export function TechnicalProvider({ children }){
  const [isTechnicalMode, setIsTechnicalMode] = useState(false);
  const [showScan, setShowScan] = useState(false)
  const [bootFlick, setBootFlick] = useState(false)
  const audioRef = useRef()

  const toggleTechnicalMode = () => setIsTechnicalMode(prev => !prev);

  useEffect(()=>{
    try {
      const v = localStorage.getItem('showTechnical')
      if(v) setIsTechnicalMode(v === '1')
    } catch(e){}
  },[])

  useEffect(()=>{
    try { localStorage.setItem('showTechnical', isTechnicalMode ? '1' : '0') } catch(e){}

    // Subtle audio feedback for mode switch
    try {
      if(!audioRef.current) audioRef.current = new (window.AudioContext || window.webkitAudioContext)()
      const ctx = audioRef.current
      const o = ctx.createOscillator()
      const g = ctx.createGain()
      o.type = 'sawtooth'
      o.frequency.value = isTechnicalMode ? 180 : 120
      g.gain.value = 0.0015
      o.connect(g); g.connect(ctx.destination)
      o.start()
      g.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + 0.12)
      setTimeout(()=> { try{o.stop()}catch(e){} }, 160)
    } catch(e){}

    if(isTechnicalMode){
      setShowScan(true)
      setBootFlick(true)
      setTimeout(()=>setBootFlick(false), 700)
      setTimeout(()=>setShowScan(false), 1200)
    }
  }, [isTechnicalMode])

  return (
    <TechnicalContext.Provider value={{ isTechnicalMode, toggleTechnicalMode }}>
      <div className={`${isTechnicalMode ? 'technical-mode grid-1px-bg' : ''} ${bootFlick ? 'boot-flicker' : ''}`}>
        {children}
        <AnimatePresence>
          {showScan && (
            <motion.div 
              className="scan-line fixed top-0 left-0 w-full h-1 bg-blue-500/30 z-50 pointer-events-none" 
              initial={{ y: -10, opacity: 0 }} 
              animate={{ y: '100vh', opacity: 1 }} 
              exit={{ opacity: 0 }} 
              transition={{ duration: 0.9, ease: 'easeInOut' }} 
            />
          )}
        </AnimatePresence>
      </div>
    </TechnicalContext.Provider>
  )
}

export function useTechnical(){ return useContext(TechnicalContext) }