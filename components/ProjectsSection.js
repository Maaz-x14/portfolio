import ProjectCard from './ProjectCard'
import { motion } from 'framer-motion'

const PROJECTS = [
  {
    id: 'aqi',
    title: 'Smart Air Quality Monitor',
    tagline: 'Full-stack IoT — hardware-to-cloud telemetry and RAG assistant.',
    overview: {
      student: 'ESP32 sensors → MQTT Broker → Spring Boot ingestion; includes RAG-based chatbot (Llama-3.1) for contextual insights.',
    }
  },
  {
    id: 'agentic',
    title: 'Agentic Workflow Platform',
    tagline: 'Autonomous Logic — ReAct loops and DAG orchestration.',
    overview: {
      student: 'Custom ReAct execution loop, DAG-based orchestration, and agent monitoring for dependable automation.'
    }
  },
  {
    id: 'pharma',
    title: 'Pharma RAG',
    tagline: 'Semantic Discovery — FAISS-powered vector search and indexed retrieval.',
    overview: {
      student: 'FAISS vector indexing with secure data pipelines; Groq API integration for efficient inference.'
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
      <h2 className="text-3xl font-display text-center">Project Milestones</h2>
      <p className="text-center mt-3 text-[var(--muted)]">High-fidelity exhibits framed by outcomes and impact.</p>

      <motion.div className="mt-12 grid md:grid-cols-3 gap-8" variants={container} initial="hidden" animate="show">
        {PROJECTS.map(p=> <ProjectCard key={p.id} project={p} />)}
      </motion.div>
    </section>
  )
}
