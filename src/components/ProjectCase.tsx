import React from 'react'
import { Project } from '../types'

export default function ProjectCase({ project }: { project: Project }){
  return (
    <article className="panel p-6 rounded">
      <header className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">{project.title}</h2>
          <p className="text-sm text-slate-300">{project.short}</p>
        </div>
        <div className="mono text-xs text-slate-400">/{project.id}</div>
      </header>

      <section className="mt-4 grid md:grid-cols-2 gap-4">
        <div>
          <h3 className="font-semibold">Problem Statement</h3>
          <p className="text-sm text-slate-300">{project.problemStatement || 'Describe the specific problem and constraints here.'}</p>

          <h3 className="mt-3 font-semibold">My Role</h3>
          <p className="text-sm text-slate-300">{project.role || 'Role description'}</p>

          <h3 className="mt-3 font-semibold">Impact / Results</h3>
          <p className="text-sm text-slate-300">{project.impact || 'Quantified impact and outcomes'}</p>
        </div>

        <div>
          <h3 className="font-semibold">Architecture</h3>
          <div className="mt-2 panel rounded h-40 flex items-center justify-center">[architecture diagram placeholder]</div>

          <h3 className="mt-3 font-semibold">Tech Stack</h3>
          <div className="flex gap-2 flex-wrap mt-2">
            {project.tech.map(t => <span key={t} className="mono text-xs px-2 py-1 rounded bg-white/3">{t}</span>)}
          </div>

          <h3 className="mt-3 font-semibold">What broke + what I fixed</h3>
          <div className="text-sm text-slate-300">
            <strong>Issue:</strong> {project.whatBroke || 'Explain a real failure mode'}<br />
            <strong>Fix:</strong> {project.whatIFixed || 'Explain your fix and why it addressed the root cause'}
          </div>
        </div>
      </section>
    </article>
  )
}
