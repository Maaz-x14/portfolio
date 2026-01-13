import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function ScrollTop(){
  const [show, setShow] = useState(false)
  useEffect(()=>{
    const onScroll = () => setShow(window.scrollY > 400)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return ()=> window.removeEventListener('scroll', onScroll)
  },[])

  const onClick = () => window.scrollTo({top:0,behavior:'smooth'})

  return (
    <motion.button aria-label="Scroll to top" onClick={onClick} className={`scroll-fab ${show? 'show': ''}`} initial={{opacity:0}} animate={{opacity: show?1:0}} transition={{duration:0.28}}>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <path d="M6 15L12 9l6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </motion.button>
  )
}
