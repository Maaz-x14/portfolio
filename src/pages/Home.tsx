import React from 'react'
import Hero from '../components/Hero'
import SystemsGrid from '../components/SystemsGrid'
import ProjectsPreview from '../components/ProjectsPreview'
import ContactTerminal from '../components/ContactTerminal'
import AgentGraph from '../components/AgentGraph'

export default function Home() {
  return (
    <div className="space-y-12">
      <section className="pt-6">
        <Hero />
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">Systems I Build</h2>
        <SystemsGrid />
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">Signature: Interactive Agent Graph</h2>
        <div className="h-96 panel p-4 rounded">
          <AgentGraph />
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">Projects</h2>
        <ProjectsPreview />
      </section>

      <section>
        <ContactTerminal />
      </section>
    </div>
  )
}
