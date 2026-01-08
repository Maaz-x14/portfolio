import React, { Suspense, useMemo, useRef, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial, ContactShadows } from '@react-three/drei'
import * as THREE from 'three'

function Sphere({ position, color, speed, distort }) {
  const mesh = useRef()
  const initialPos = useMemo(() => new THREE.Vector3(...position), [position])
  
  useFrame((state) => {
    if (!mesh.current) return
    const { mouse, clock } = state
    
    // 1. Return to Center Force
    mesh.current.position.lerp(initialPos, 0.05)
    
    // 2. Mouse Flee Force
    const mouseVec = new THREE.Vector3(mouse.x * 10, mouse.y * 10, 0)
    const dist = mesh.current.position.distanceTo(mouseVec)
    if (dist < 3) {
      const dir = mesh.current.position.clone().sub(mouseVec).normalize().multiplyScalar(0.4)
      mesh.current.position.add(dir)
    }
    
    // 3. Organic Pulse
    mesh.current.scale.setScalar(1 + Math.sin(clock.elapsedTime * speed) * 0.05)
  })

  return (
    <mesh ref={mesh} position={position}>
      <sphereGeometry args={[1, 64, 64]} />
      <MeshDistortMaterial color={color} speed={speed} distort={distort} roughness={0.2} metalness={0.1} />
    </mesh>
  )
}

const titles = ["FULL-STACK DEVELOPER", "ML ENTHUSIAST", "AGENTIC AI ARCHITECT", "NUST ENGINEER"]

export default function Hero() {
  const [index, setIndex] = useState(0)

  // Dynamic Title Loop
  useEffect(() => {
    const interval = setInterval(() => setIndex((i) => (i + 1) % titles.length), 3000)
    return () => clearInterval(interval)
  }, [])

  const spheres = useMemo(() => Array.from({ length: 25 }).map(() => ({
    position: [(Math.random() - 0.5) * 6, (Math.random() - 0.5) * 6, (Math.random() - 0.5) * 2],
    color: Math.random() > 0.5 ? '#134074' : '#0B2545',
    speed: 1 + Math.random(),
    distort: 0.2 + Math.random() * 0.2
  })), [])

  return (
    <section className="relative w-full h-screen bg-[#EEF4ED] overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 15], fov: 40 }}>
          <ambientLight intensity={1.5} />
          <pointLight position={[10, 10, 10]} intensity={2} />
          <Suspense fallback={null}>
            {spheres.map((s, i) => <Sphere key={i} {...s} />)}
            <ContactShadows position={[0, -8, 0]} opacity={0.4} scale={20} blur={2} />
          </Suspense>
        </Canvas>
      </div>

      <div className="relative z-10 text-center pointer-events-none select-none">
        <h1 className="text-8xl md:text-[13rem] font-bold tracking-tighter text-[#0B2545] leading-none mb-4 mix-blend-multiply" style={{ fontFamily: 'Playfair Display, serif' }}>
          MAAZ AHMAD
        </h1>
        <div className="h-8 overflow-hidden">
          <p className="text-sm md:text-xl font-sans tracking-[0.8em] text-[#134074] uppercase font-bold animate-pulse">
            {titles[index]}
          </p>
        </div>  
        <div className="mt-6 text-[#134074]/60 font-mono text-xs tracking-widest">NUST // CGPA 3.5</div>
      </div>
    </section>
  )
}