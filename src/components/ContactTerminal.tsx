import React from 'react'

export default function ContactTerminal(){
  const [lines, setLines] = React.useState<string[]>(['> secure link endpoint ready'])
  const [input, setInput] = React.useState('')

  function submit(){
    if (!input) return
    setLines((l) => [...l, `> ${input}`])
    if (input.toLowerCase().includes('connect')){
      setLines((l) => [...l, 'status: LINK ESTABLISHED', 'endpoint: ssh://you@host (replace with your method)'])
    } else {
      setLines((l) => [...l, 'status: awaiting valid command (try "connect")'])
    }
    setInput('')
  }

  return (
    <section id="contact" className="panel p-4 rounded">
      <div className="mono text-sm">
        {lines.map((line, i) => <div key={i} className="text-slate-300">{line}</div>)}
      </div>

      <div className="mt-3 flex gap-2">
        <input aria-label="terminal-input" value={input} onChange={e => setInput(e.target.value)} onKeyDown={(e)=>{if(e.key==='Enter')submit()}} className="flex-1 panel p-2 rounded bg-transparent mono text-sm" placeholder='type "connect" to open link' />
        <button onClick={submit} className="panel px-3 py-2 rounded">Send</button>
      </div>

      <div className="mt-3 text-xs text-slate-400">Note: This terminal is a contact metaphor — replace with actual contact mechanism or instructions.</div>
    </section>
  )
}
