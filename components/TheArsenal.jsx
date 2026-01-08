import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const logos = [
  { name: 'Java', src: '/icons/java.svg', group: 'Languages' },
  { name: 'Python', src: '/icons/python.svg', group: 'Languages' },
  { name: 'C++', src: '/icons/cpp.svg', group: 'Languages' },
  { name: 'JavaScript', src: '/icons/js.svg', group: 'Languages' },
  { name: 'Spring Boot', src: '/icons/java.svg', group: 'Backend' }, // Use Spring logo if available
  { name: 'Docker', src: '/icons/docker.svg', group: 'DevOps' },
  { name: 'Kubernetes', src: '/icons/k8s.svg', group: 'DevOps' },
  { name: 'AWS', src: '/icons/aws.svg', group: 'Cloud' },
  { name: 'MQTT', src: '/icons/mqtt.svg', group: 'IoT' },
  { name: 'ESP32', src: '/icons/esp32.svg', group: 'IoT' },
];

export default function TheArsenal(){
  const [hasMounted, setHasMounted] = useState(false)
  useEffect(()=> setHasMounted(true), [])

  return (
    <section id="expertise" data-aos="zoom-in" data-aos-delay="100" className="py-20 max-w-6xl mx-auto px-6">
      <h2 className="text-3xl font-display mb-6" style={{borderBottom:`1px solid var(--steel-blue)`,paddingBottom:12}}>Technical Expertise</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {logos.map((l, i) => {
          return (
            <motion.div key={l.name} initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} transition={{delay:0.03*i}} className="logo-card">
              <div className="logo-icon">
                <img src={l.src} alt={l.name} width={56} height={56} className="logo-img" />
              </div>
              <div style={{fontWeight:700,color:'var(--text-main)'}}>{l.name}</div>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
