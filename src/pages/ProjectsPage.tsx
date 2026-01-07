import React from 'react'
import { Project } from '../types'
import ProjectCase from '../components/ProjectCase'

const sample: Project[] = [
  {
    id: 'agent-workflow',
    title: 'Agentic Workflow Platform',
    short: 'Coordinated agents for task automation',
    problemStatement: 'Coordinate multi-step agentic tasks across microservices.',
    tech: ['React', 'FastAPI', 'Kubernetes', 'Redis'],
    architectureDiagramUrl: '',
    role: 'Lead Engineer',
    impact: 'Reduced manual orchestration by 78%.',
    whatBroke: 'Race conditions in job scheduling',
    whatIFixed: 'Introduced lease-based locks + circuit breaker'
  }
]

export default function ProjectsPage() {
  return (
    <div className="space-y-6">
      {sample.map((p) => (
        <ProjectCase key={p.id} project={p} />
      ))}
    </div>
  )
}
