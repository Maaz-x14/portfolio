import React from 'react'

export default function Journey(){
  const items = [
    {date: 'July - Aug 2025', title: 'Impact Ledger — Planet Beyond', text: 'Stabilized the Green Tourism platform by implementing Jenkins-driven CI/CD pipelines, Docker containerization, Kubernetes orchestration, and JWT-based authentication. Delivered reliable deployments, secure token flows, and production monitoring.'},
    {date: 'Sept 2025', title: 'Edge Intelligence Prototype', text: 'Built an Edge <-> Cloud bridge for smart air-quality sensors: ESP32 telemetry, lightweight gateways, FAISS-based indexing for edge retrieval, and RAG-enabled agent loops for automated remediation.'}
  ]

  return (
    <section id="about" className="max-w-5xl mx-auto px-6 py-12">
      <h2 className="text-3xl font-display">Impact Ledger</h2>
      <p className="mt-2 text-[var(--muted)]">Selected milestones and engineering outcomes. <strong>NUST — B.S. Software Engineering</strong> · <strong>CGPA 3.5</strong></p>

      <div className="mt-8 timeline">
        {items.map((it, idx)=> (
          <div key={idx} className="timeline-item">
            <div className="text-sm text-[var(--muted)]">{it.date}</div>
            <h3 className="text-lg font-medium text-[var(--text)] mt-1">{it.title}</h3>
            <p className="mt-2 text-[var(--muted)]">{it.text}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
