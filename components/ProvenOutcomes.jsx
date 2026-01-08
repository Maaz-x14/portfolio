import { motion } from 'framer-motion'

const outcomes = [
  { id: 'deploy', title: 'Deployment Efficiency', text: 'Reduced manual deployment errors through automated build/test workflows and robust CI pipelines at Planet Beyond.' },
  { id: 'hazard', title: 'Urban Safety', text: 'Real-time AQI tracking and automated hazard alerts via edge sensor telemetry and cloud processing for environmental monitoring.' },
  { id: 'semantic', title: 'Clinical Accuracy', text: 'Context-grounded medical answers with retrieved-chunk citations using FAISS vector indexing and RAG workflows.' }
]

export default function ProvenOutcomes(){
  const item = { hidden:{opacity:0,y:12}, show:{opacity:1,y:0} }
  return (
    <section id="outcomes" data-aos="fade-left" data-aos-delay="200" className="max-content px-6 py-16">
      <motion.h2 className="text-2xl font-display text-center" initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} transition={{duration:0.5}}>Proven Outcomes</motion.h2>

      <motion.div className="mt-8 grid md:grid-cols-3 gap-6" initial="hidden" animate="show" variants={{show:{transition:{staggerChildren:0.12}}}}>
        {outcomes.map(o=> (
          <motion.div key={o.id} variants={item} className="p-6 card-sharp" style={{background:'transparent'}}>
            <h3 className="font-mono text-sm text-[var(--steel-blue)]">{o.title}</h3>
            <p className="mt-3 text-[var(--text-main)] leading-relaxed">{o.text}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
