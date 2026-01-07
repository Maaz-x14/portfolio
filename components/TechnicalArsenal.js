import React from 'react'

const columns = [
  {title:'Core Logic', items:['Java','Python','Spring Boot','FastAPI']},
  {title:'Intelligence Layer', items:['LangChain','FAISS','Llama-3.1','Ollama']},
  {title:'Infrastructure', items:['Docker','Kubernetes','Jenkins','AWS','MQTT']}
]

export default function TechnicalArsenal(){
  return (
    <section id="skills" className="max-w-5xl mx-auto px-6 py-12">
      <h2 className="text-2xl font-display">The Technical Arsenal</h2>
      <p className="mt-2 text-[var(--muted)]">A curated grid of tools and systems I wield — presented like framed specimens.</p>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        {columns.map(col=> (
          <div key={col.title} className="p-5" style={{border:`1px solid var(--border-main)`,borderRadius:12,background:'var(--bg-main)'}}>
            <h4 className="text-sm font-medium text-[var(--muted)]">{col.title}</h4>
            <div className="mt-4 flex flex-wrap gap-3">
              {col.items.map(s=> (
                <div key={s} className="pill-skill" style={{transition:'all .22s ease'}}>{s}</div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
