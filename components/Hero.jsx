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
    mesh.current.position.lerp(initialPos, 0.05)
    
    const mouseVec = new THREE.Vector3(mouse.x * 12, mouse.y * 12, 0)
    const dist = mesh.current.position.distanceTo(mouseVec)
    if (dist < 4) {
      const dir = mesh.current.position.clone().sub(mouseVec).normalize().multiplyScalar(0.6)
      mesh.current.position.add(dir)
    }
    mesh.current.scale.setScalar(1 + Math.sin(clock.elapsedTime * speed) * 0.05)
  })

  return (
    <mesh ref={mesh} position={position}>
      <sphereGeometry args={[1, 128, 128]} /> {/* Increased segments for "no edges" */}
      <MeshDistortMaterial 
        color={color} 
        speed={speed} 
        distort={distort} 
        roughness={0.4} 
        metalness={0.05} 
        transparent 
        opacity={0.9}
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

  const spheres = useMemo(() => Array.from({ length: 30 }).map(() => ({
    position: [(Math.random() - 0.5) * 8, (Math.random() - 0.5) * 8, (Math.random() - 0.5) * 3],
    color: Math.random() > 0.5 ? '#8DA9C4' : '#ADC1D6', // Lighter Steel Blue palette
    speed: 0.8 + Math.random(),
    distort: 0.1 + Math.random() * 0.1
  })), [])

  return (
    <section className="relative w-full h-screen bg-[#EEF4ED] overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 15], fov: 40 }}>
          <ambientLight intensity={1} />
          <pointLight position={[10, 10, 10]} intensity={1.5} />
          <Suspense fallback={null}>
            {spheres.map((s, i) => <Sphere key={i} {...s} />)}
            <ContactShadows position={[0, -10, 0]} opacity={0.2} scale={30} blur={2.5} />
          </Suspense>
        </Canvas>
      </div>

      <div className="relative z-10 text-center pointer-events-none select-none">
        <h1 className="text-8xl md:text-[14rem] font-black tracking-tighter text-[#0B2545] leading-none mb-4 mix-blend-darken font-sans">
          MAAZ AHMAD
        </h1>
        <div className="h-10 overflow-hidden">
          <p className="text-lg md:text-2xl font-sans tracking-[0.5em] text-[#134074] uppercase font-bold transition-all duration-700">
            {titles[index]}
          </p>
        </div>
      </div>
    </section>
  )
}