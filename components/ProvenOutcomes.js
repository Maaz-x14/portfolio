import { motion } from 'framer-motion'

const outcomes = [
  { id: 'deploy', title: 'Deployment Error Reduction', text: 'Automated build/test workflows at Planet Beyond using Jenkins and K8s.' },
  { id: 'hazard', title: 'Real-Time Hazard Mitigation', text: 'Integrated ESP32 sensor fleets to provide live AQI tracking and hazard alerts for major cities.' },
  { id: 'semantic', title: 'Semantic Precision', text: 'Engineered RAG systems with FAISS vector indexing to deliver sub-second, cited medical answers.' }
]

export default function ProvenOutcomes(){
  const item = { hidden:{opacity:0,y:12}, show:{opacity:1,y:0} }
  return (
    <section id="outcomes" className="max-content px-6 py-16">
      <motion.h2 className="text-2xl font-display text-center" initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} transition={{duration:0.5}}>Proven Outcomes</motion.h2>

      <motion.div className="mt-8 grid md:grid-cols-3 gap-6" initial="hidden" animate="show" variants={{show:{transition:{staggerChildren:0.08}}}}>
        {outcomes.map(o=> (
          <motion.div key={o.id} variants={item} className="p-6 border-1px" style={{border:'1px solid var(--steel-blue)',borderRadius:0}} whileHover={{boxShadow:'0 12px 36px rgba(11,37,69,0.06)',transform:'translateY(-4px)'}}>
            <h3 className="font-mono text-sm text-[var(--steel-blue)]">{o.title}</h3>
            <p className="mt-3 text-[var(--text-main)] leading-relaxed">{o.text}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
