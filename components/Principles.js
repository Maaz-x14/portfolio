import { motion } from 'framer-motion'

export default function Principles(){
  const item = { hidden:{opacity:0,y:12}, show:{opacity:1,y:0} }
  return (
    <section id="philosophy" className="max-content px-6 py-16">
      <motion.h2 className="text-2xl font-display text-center" initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} transition={{duration:0.5}}>Engineering Values</motion.h2>

      <motion.div className="mt-8 grid md:grid-cols-3 gap-6 text-[var(--muted)]" initial="hidden" animate="show" variants={{show:{transition:{staggerChildren:0.08}}}}>
        <motion.div variants={item} className="p-6 border-1px" style={{border:'1px solid var(--steel-blue)',borderRadius:0}} whileHover={{background:'linear-gradient(180deg, rgba(19,64,116,0.02), rgba(19,64,116,0.01))'}}>
          <h3 className="font-semibold text-[var(--text-main)]">Robust Infrastructure</h3>
          <p className="mt-2">Hardening production environments through automated CI/CD pipelines (Jenkins/Docker/K8s) to eliminate manual error.</p>
        </motion.div>

        <motion.div variants={item} className="p-6 border-1px" style={{border:'1px solid var(--steel-blue)',borderRadius:0}} whileHover={{background:'linear-gradient(180deg, rgba(19,64,116,0.02), rgba(19,64,116,0.01))'}}>
          <h3 className="font-semibold text-[var(--text-main)]">Intelligent Automation</h3>
          <p className="mt-2">Architecting self-correcting agentic workflows with custom ReAct loops for predictable AI execution.</p>
        </motion.div>

        <motion.div variants={item} className="p-6 border-1px" style={{border:'1px solid var(--steel-blue)',borderRadius:0}} whileHover={{background:'linear-gradient(180deg, rgba(19,64,116,0.02), rgba(19,64,116,0.01))'}}>
          <h3 className="font-semibold text-[var(--text-main)]">Edge Intelligence</h3>
          <p className="mt-2">Bridging physical sensors with cloud backends using real-time MQTT telemetry for actionable insights.</p>
        </motion.div>
      </motion.div>
    </section>
  )
}
