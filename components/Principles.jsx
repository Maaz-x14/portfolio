import { motion } from 'framer-motion'

export default function Principles(){
  const item = { hidden:{opacity:0,y:12}, show:{opacity:1,y:0} }
  return (
    <section id="philosophy" data-aos="fade-up" data-aos-delay="100" className="max-content px-6 py-16">
      <motion.h2 className="text-2xl font-display text-center" initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} transition={{duration:0.5}}>Engineering Values</motion.h2>
      <motion.div className="mt-8 grid md:grid-cols-3 gap-6 text-[var(--muted)]" initial="hidden" animate="show" variants={{show:{transition:{staggerChildren:0.12}}}}>
        <motion.div variants={item} className="p-6 card-sharp" style={{background:'transparent'}}>
          <h3 className="font-semibold text-[var(--text-main)]">Pillar 1: Robust Infrastructure</h3>
          <p className="mt-2">Engineering CI/CD pipelines (Jenkins / Docker / Kubernetes) at Planet Beyond to harden production-ready services and reduce manual failure modes.</p>
        </motion.div>

        <motion.div variants={item} className="p-6 card-sharp" style={{background:'transparent'}}>
          <h3 className="font-semibold text-[var(--text-main)]">Pillar 2: Autonomous Intelligence</h3>
          <p className="mt-2">Architecting self-correcting, agentic workflows using custom ReAct execution loops and Llama 3.1 for resilient automation.</p>
        </motion.div>

        <motion.div variants={item} className="p-6 card-sharp" style={{background:'transparent'}}>
          <h3 className="font-semibold text-[var(--text-main)]">Pillar 3: Physical–Digital Synergy</h3>
          <p className="mt-2">Bridging physical sensor fleets (ESP32) with cloud backends via real-time MQTT telemetry to unlock actionable operations data.</p>
        </motion.div>
      </motion.div>
    </section>
  )
}
