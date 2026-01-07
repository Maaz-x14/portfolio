import ProjectCard from './ProjectCard'
import { motion } from 'framer-motion'

const PROJECTS = [
  {
    id: 'aqi',
    title: 'Smart Air Quality Monitor',
    tagline: 'Environmental Intelligence — bridging sensors to insight.',
    overview: {
      student: 'A framed environmental monitor that helps communities understand air quality in real time.',
    }
  },
  {
    id: 'agentic',
    title: 'Agentic Workflow Platform',
    tagline: 'Autonomous Logic — visual design for AI agents.',
    overview: {
      student: 'A visual canvas for building and watching autonomous agents solve tasks.'
    }
  },
  {
    id: 'pharma',
    title: 'Pharma RAG',
    tagline: 'Semantic Discovery — helping doctors find medical truths.',
    overview: {
      student: 'A search-first assistant that surfaces precise, cited answers from medical literature.'
    }
  }
]

export default function ProjectsSection(){
  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.12 } }
  }

  return (
    <section id="projects" className="max-content px-6 py-20">
      <h2 className="text-3xl font-display text-center">Featured Work</h2>
      <p className="text-center mt-3 text-[var(--muted)]">Curated exhibits — each project is presented as a framed study.</p>

      <motion.div className="mt-12 grid md:grid-cols-3 gap-8" variants={container} initial="hidden" animate="show">
        {PROJECTS.map(p=> <ProjectCard key={p.id} project={p} />)}
      </motion.div>
    </section>
  )
}
