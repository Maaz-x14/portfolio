import React from 'react'
import { motion } from 'framer-motion'
import { AgentNode } from '../types'

const nodes: AgentNode[] = [
  { id: 'n1', label: 'User Intent', type: 'data', x: 80, y: 40 },
  { id: 'n2', label: 'Orchestrator', type: 'agent', x: 260, y: 120 },
  { id: 'n3', label: 'Retriever', type: 'tool', x: 80, y: 200 },
  { id: 'n4', label: 'Executor', type: 'agent', x: 420, y: 200 }
]

const edges = [
  ['n1','n2'],
  ['n2','n3'],
  ['n2','n4'],
  ['n3','n2']
]

export default function AgentGraph(){
  const [hover, setHover] = React.useState<string | null>(null)

  return (
    <svg viewBox="0 0 520 280" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* edges */}
      <g stroke="#2ce7df" strokeOpacity={0.25} strokeWidth={2} fill="none">
        {edges.map(([a,b]) => {
          const na = nodes.find(n => n.id === a)!
          const nb = nodes.find(n => n.id === b)!
          return <line key={`${a}-${b}`} x1={na.x} y1={na.y} x2={nb.x} y2={nb.y} />
        })}
      </g>

      {/* nodes */}
      {nodes.map((n) => {
        const isHover = hover === n.id
        const color = n.type === 'agent' ? '#7ef9ff' : n.type === 'tool' ? '#9be96b' : '#9ad0ff'
        return (
          <g key={n.id} transform={`translate(${n.x},${n.y})`}>
            <motion.circle
              r={isHover ? 18 : 12}
              fill={color}
              stroke="#0b0f14"
              strokeWidth={2}
              filter={isHover ? 'url(#glow)' : undefined}
              onMouseEnter={() => setHover(n.id)}
              onMouseLeave={() => setHover(null)}
            />
            <text x={24} y={6} fontSize={12} fill="#cfeffb" className="mono">{n.label}</text>
            {isHover && (
              <foreignObject x={24} y={12} width={220} height={80}>
                <div className="bg-[#061014] p-2 rounded border border-white/5 text-xs text-slate-200 panel">
                  <div className="font-semibold">{n.label}</div>
                  <div className="text-slate-300 text-[12px] mt-1">{n.description || 'Details about this node — purpose, inputs, outputs.'}</div>
                </div>
              </foreignObject>
            )}
          </g>
        )
      })}

    </svg>
  )
}
