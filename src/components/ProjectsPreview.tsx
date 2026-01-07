import React from 'react'
import { Link } from 'react-router-dom'
import { Project } from '../types'

const sample: Project[] = [
  { id:'agent-workflow', title:'Agentic Workflow Platform', short:'Coordinated agents for complex tasks', tech:['FastAPI','React','Redis'] },
  { id:'rag-system', title:'Enterprise RAG', short:'High-throughput retrieval pipelines', tech:['Postgres','FAISS','LangChain'] }
]

export default function ProjectsPreview(){
  return (
    <div id="projects" className="grid md:grid-cols-2 gap-4">
      {sample.map(p => (
        <article key={p.id} className="panel p-4 rounded">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold">{p.title}</h3>
              <p className="text-sm text-slate-300">{p.short}</p>
            </div>
            <div className="mono text-xs text-slate-400">/{p.id}</div>
          </div>

          <div className="mt-3 flex gap-2 flex-wrap">
            {p.tech.map(t => <span key={t} className="mono text-xs px-2 py-1 rounded bg-white/3">{t}</span>)}
          </div>

          <div className="mt-4">
            <Link to={`/projects/${p.id}`} className="panel px-3 py-2 rounded text-sm">Open case study</Link>
          </div>
        </article>
      ))}
    </div>
  )
}
