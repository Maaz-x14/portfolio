import '../styles/globals.css'
import Navbar from '../components/Navbar'
import { AnimatePresence, motion } from 'framer-motion'

export default function App({ Component, pageProps }){
  return (
    <>
      <Navbar />
      <AnimatePresence mode="wait">
        <motion.div initial={{ clipPath: 'circle(0% at 50% 50%)' }} animate={{ clipPath: 'circle(150% at 50% 50%)' }} transition={{ duration: 0.9, ease: 'easeInOut' }} className="fixed inset-0 z-40 pointer-events-none bg-[var(--bg)]" />

        <motion.main key="app-root" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.32 }} className="min-h-screen pt-24">
          <Component {...pageProps} />
        </motion.main>
      </AnimatePresence>
    </>
  )
}
