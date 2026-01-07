export interface Project {
  id: string
  title: string
  short: string
  problemStatement?: string
  tech: string[]
  architectureDiagramUrl?: string
  role?: string
  impact?: string
  whatBroke?: string
  whatIFixed?: string
}

export interface AgentNode {
  id: string
  label: string
  type: 'agent' | 'tool' | 'data'
  description?: string
  x?: number
  y?: number
}
