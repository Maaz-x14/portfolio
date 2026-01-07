import { motion } from 'framer-motion'
import { Code, Server, Database, Cpu, Cloud, Box, GitBranch, Wifi, ShieldCheck } from 'lucide-react'
import { useEffect, useState } from 'react'

const skillGroups = [
  { category: "Backend", skills: ["Spring Boot","FastAPI","Node.js"] },
  { category: "Intelligence", skills: ["LangChain","FAISS","Llama 3.1"] },
  { category: "Infrastructure", skills: ["Docker","Kubernetes","Jenkins","AWS"] },
  { category: "Edge", skills: ["ESP32","MQTT","MQ-Series Sensors"] }
]

function iconFor(skill){
  if(/spring/i.test(skill)) return <Code size={18} />
  if(/fastapi/i.test(skill)) return <Server size={18} />
  if(/node/i.test(skill)) return <Code size={18} />
  if(/langchain/i.test(skill)) return <Cpu size={18} />
  if(/faiss/i.test(skill)) return <Database size={18} />
  if(/llama/i.test(skill)) return <Cloud size={18} />
  if(/docker/i.test(skill)) return <Box size={18} />
  if(/kubernetes/i.test(skill)) return <Box size={18} />
  if(/jenkins/i.test(skill)) return <GitBranch size={18} />
  if(/aws/i.test(skill)) return <Cloud size={18} />
  if(/esp32/i.test(skill)) return <Cpu size={18} />
  if(/mqtt/i.test(skill)) return <Wifi size={18} />
  return <ShieldCheck size={18} />
}

export default function TheArsenal(){
  const [hasMounted, setHasMounted] = useState(false)
  useEffect(()=> setHasMounted(true), [])

  return (
    <section id="expertise" className="py-20 max-w-6xl mx-auto px-6">
      <h2 className="text-3xl font-display mb-6" style={{borderBottom:`1px solid var(--steel-blue)`,paddingBottom:12}}>Technical Expertise</h2>

      <div className="grid md:grid-cols-4 gap-6">
        {skillGroups.map((group, i) => (
          <motion.div key={i} className="glass-card p-5" initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} transition={{delay:0.06*i}}>
            <h3 className="text-xs font-sans text-[var(--steel-blue)] uppercase mb-4 tracking-widest">{group.category}</h3>
            <div className="flex flex-col gap-2">
              {group.skills.map(skill => (
                <div key={skill} className="p-2 flex items-center justify-start gap-3" style={{fontWeight:700,color:'var(--text-main)'}}>
                  <span className="icon-wrap" style={{width:22,height:22}}>
                    {iconFor(skill)}
                    <span className="tooltip">Health: Stable</span>
                  </span>
                  <div>{skill}</div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
