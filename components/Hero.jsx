import React, { Suspense, useMemo, useRef, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial, ContactShadows } from '@react-three/drei'
import * as THREE from 'three'
import CommandPalette from './CommandPalette' // Ensure you import the new component

function Sphere({ position, color, speed, distort }) {
  const mesh = useRef()
  const initialPos = useMemo(() => new THREE.Vector3(...position), [position])
  const mouseRef = useRef(new THREE.Vector2(0, 0))
  const prevMouse = useRef(new THREE.Vector2(0, 0))
  
  useFrame((state) => {
    if (!mesh.current) return
    const { mouse, clock } = state
    
    // Calculate Mouse Velocity
    const velocity = mouse.distanceTo(prevMouse.current)
    prevMouse.current.copy(mouse)

    // ELASTIC HOMING: Always pull back to origin
    mesh.current.position.lerp(initialPos, 0.04)
    
    const mouseVec = new THREE.Vector3(mouse.x * 12, mouse.y * 12, 0)
    const dist = mesh.current.position.distanceTo(mouseVec)

    // REPEL LOGIC: Only trigger if mouse is moving enough to avoid jitter
    if (dist < 4 && velocity > 0.001) {
      const repelPower = (4 - dist) * 0.15
      const dir = mesh.current.position.clone().sub(mouseVec).normalize().multiplyScalar(repelPower)
      mesh.current.position.add(dir)
    }

    mesh.current.scale.setScalar(1 + Math.sin(clock.elapsedTime * speed) * 0.05)
  })

  return (
    <mesh ref={mesh} position={position}>
      <sphereGeometry args={[1, 64, 64]} />
      <MeshDistortMaterial 
        color={color} 
        speed={speed} 
        distort={distort} 
        roughness={0.4} 
        metalness={0.1} 
        transparent 
        opacity={0.8}
      />
    </mesh>
  )
}

const titles = ["Software Engineer.", "Full Stack Developer.", "Agentic AI Architect.", "ML Engineer."]

export default function Hero() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => setIndex((i) => (i + 1) % titles.length), 3000)
    return () => clearInterval(interval)
  }, [])

  const spheres = useMemo(() => Array.from({ length: 25 }).map(() => ({
    position: [(Math.random() - 0.5) * 12, (Math.random() - 0.5) * 8, (Math.random() - 0.5) * 5],
    color: Math.random() > 0.5 ? '#8DA9C4' : '#ADC1D6',
    speed: 0.5 + Math.random(),
    distort: 0.1 + Math.random() * 0.2
  })), [])

  return (
    <section className="relative w-full h-screen bg-[#EEF4ED] overflow-hidden flex items-center justify-center">
      <CommandPalette />
      
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 15], fov: 40 }}>
          <ambientLight intensity={1.5} />
          <pointLight position={[10, 10, 10]} intensity={2} />
          <Suspense fallback={null}>
            {spheres.map((s, i) => <Sphere key={i} {...s} />)}
            <ContactShadows position={[0, -8, 0]} opacity={0.15} scale={40} blur={3} />
          </Suspense>
        </Canvas>
      </div>

      <div className="relative z-10 text-center pointer-events-none select-none">
        <h1 className="text-7xl md:text-[12rem] font-black tracking-tighter text-[#0B2545] leading-none mb-4 mix-blend-darken font-sans">
          MAAZ AHMAD
        </h1>
        <div className="h-10 overflow-hidden">
          <p className="text-lg md:text-2xl font-sans tracking-[0.4em] text-[#134074] uppercase font-bold">
            {titles[index]}
          </p>
        </div>
      </div>
    </section>
  )
}