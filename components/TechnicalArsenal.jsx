import React from 'react'

const groups = [
  {title: 'Languages', items: ['Java','Python','C++','JavaScript (ES6)','SQL']},
  {title: 'Frameworks', items: ['Spring Boot','React','Node.js','LangChain']},
  {title: 'Cloud & DevOps', items: ['Docker','Kubernetes','Jenkins','AWS','OAuth2']},
  {title: 'Hardware / IoT', items: ['ESP32','MQTT Broker','MQ-Series Sensors']}
]

export default function TechnicalArsenal(){
  return (
    <section id="arsenal" className="max-w-6xl mx-auto px-6 py-12">
      <h2 className="text-2xl font-display">The Arsenal</h2>
      <p className="mt-2 text-[var(--muted)]">A museum-style display of the tools and systems I operate in production and research.</p>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {groups.map(g => (
          <div key={g.title} className="p-5" style={{border:`1px solid var(--border-main)`,borderRadius:0,background:'var(--bg-main)'}}>
            <h4 className="text-sm font-medium text-[var(--muted)]">{g.title}</h4>
            <div className="mt-4 flex flex-wrap gap-3">
              {g.items.map(s => (
                <div key={s} className="pill-skill" style={{transition:'all .22s ease'}}>{s}</div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
