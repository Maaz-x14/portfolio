import React from 'react'

const posts = [
  { id: '2026-01-observability', title: 'Observability Patterns for Agentic Systems', excerpt: 'Short notes about tracing flows across agents.' },
  { id: '2025-11-rag', title: 'Lightweight RAG at scale', excerpt: 'Engineering notes on chunking, vector stores, and freshness.' }
]

export default function Blog(){
  return (
    <div className="space-y-4">
      {posts.map(p => (
        <article key={p.id} className="panel p-4 rounded">
          <h3 className="font-semibold">{p.title}</h3>
          <p className="text-sm text-slate-300">{p.excerpt}</p>
        </article>
      ))}
    </div>
  )
}
