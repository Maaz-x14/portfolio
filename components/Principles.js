export default function Principles(){
  return (
    <section id="principles" className="max-content px-6 py-16">
      <h2 className="text-2xl font-display text-center">The Architect's Principles</h2>
      <div className="mt-8 grid md:grid-cols-3 gap-6 text-[var(--muted)]">
        <div className="p-6 border-1px">
          <h3 className="font-semibold text-[var(--text)]">System Stability</h3>
          <p className="mt-2">Built CI/CD pipelines and hardened production services at Planet Beyond to ensure reliable, observable systems.</p>
        </div>
        <div className="p-6 border-1px">
          <h3 className="font-semibold text-[var(--text)]">Autonomous Intelligence</h3>
          <p className="mt-2">Designing agentic workflows and ReAct-oriented systems that let models act safely and predictably.</p>
        </div>
        <div className="p-6 border-1px">
          <h3 className="font-semibold text-[var(--text)]">Physical–Digital Synergy</h3>
          <p className="mt-2">Bridging ESP32 sensor fleets with cloud backends to deliver reliable, actionable telemetry.</p>
        </div>
      </div>
    </section>
  )
}
