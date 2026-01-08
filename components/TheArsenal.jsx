import React, { useState, useRef } from "react";
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from "framer-motion";

// =====================
// DATA LAYER (Sourced Logos)
// =====================
const techStack = [
  {
    id: "java",
    name: "Java",
    group: "Languages",
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
    color: "#ed8b00",
    featured: true,
    projects: 7,
    years: 4,
    related: ["spring-boot", "aws"],
    specs: { status: "OPTIMIZED", loadout: "Enterprise Systems, Concurrency" },
  },
  {
    id: "python",
    name: "Python",
    group: "Languages",
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    color: "#3776ab",
    featured: false,
    projects: 6,
    years: 3,
    related: ["fastapi", "docker"],
    specs: { status: "OPERATIONAL", loadout: "AI Automation, Scripting" },
  },
  {
    id: "spring-boot",
    name: "Spring Boot",
    group: "Backend",
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg",
    color: "#6db33f",
    featured: true,
    projects: 5,
    years: 3,
    related: ["java", "docker", "aws"],
    specs: { status: "OPERATIONAL", loadout: "Microservices, REST APIs" },
  },
  {
    id: "docker",
    name: "Docker",
    group: "DevOps",
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
    color: "#2496ed",
    featured: true,
    projects: 8,
    years: 2,
    related: ["kubernetes", "spring-boot"],
    specs: { status: "STABLE", loadout: "Containerization, CI/CD" },
  },
  {
    id: "kubernetes",
    name: "Kubernetes",
    group: "DevOps",
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg",
    color: "#326ce5",
    featured: false,
    projects: 3,
    years: 1,
    related: ["docker", "aws"],
    specs: { status: "ACTIVE", loadout: "Orchestration, Scaling" },
  },
  {
    id: "aws",
    name: "AWS",
    group: "Cloud",
    src: "https://raw.githubusercontent.com/tandpfun/skill-icons/main/icons/AWS-Light.svg",
    color: "#ff9900",
    featured: true,
    projects: 6,
    years: 2,
    related: ["docker", "spring-boot"],
    specs: { status: "OPERATIONAL", loadout: "EC2, S3, Lambda" },
  },
  {
    id: "mqtt",
    name: "MQTT",
    group: "IoT",
    src: "https://imgs.search.brave.com/OahXNxwPIGPSDPkAKkZzBbrsFl9GYRVIdPF3bYM7sTU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tcXR0/Lm9yZy9hc3NldHMv/aW1nL21xdHQtbG9n/by12ZXIuanBn",
    color: "#660066",
    featured: false,
    projects: 4,
    years: 2,
    related: ["esp32"],
    specs: { status: "ACTIVE", loadout: "Pub/Sub, Low Bandwidth" },
  },
  {
    id: "esp32",
    name: "ESP32",
    group: "IoT",
    src: "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/espressif.svg",
    color: "#e7352c",
    featured: true,
    projects: 5,
    years: 2,
    related: ["mqtt"],
    specs: { status: "DEPLOYED", loadout: "Embedded Systems, Sensors" },
  },
];

const categories = ["All", ...new Set(techStack.map((t) => t.group))];

// =======================
// MAIN COMPONENT
// =======================
export default function TechnicalArsenal() {
  const [hoveredId, setHoveredId] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [tooltip, setTooltip] = useState(null);

  const filtered = activeCategory === "All"
      ? techStack
      : techStack.filter((t) => t.group === activeCategory);

  return (
    <section className="relative py-24 px-6 max-w-7xl mx-auto">
      <h2 className="text-4xl font-display tracking-tight mb-6">Technical Arsenal</h2>

      {/* CATEGORY FILTERS */}
      <div className="flex flex-wrap gap-3 mb-12">
        {categories.map((cat) => (
          <motion.button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            whileTap={{ scale: 0.92 }}
            animate={{
              backgroundColor: activeCategory === cat ? "rgba(19, 64, 116, 0.15)" : "rgba(255,255,255,0.4)",
              borderColor: activeCategory === cat ? "var(--royal-blue)" : "var(--steel-blue)"
            }}
            className="px-4 py-2 border backdrop-blur-xl text-sm font-medium transition-colors"
          >
            {cat}
          </motion.button>
        ))}
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filtered.map((tech, i) => (
          <TechCard
            key={tech.id}
            tech={tech}
            index={i}
            hoveredId={hoveredId}
            setHoveredId={setHoveredId}
            setTooltip={setTooltip}
          />
        ))}
      </div>

      {/* SMART TOOLTIP (Style-based positioning) */}
      <AnimatePresence mode="wait">
        {tooltip && (
          <motion.div
            key="tech-tooltip"
            initial={{ opacity: 0, x: tooltip.side === "left" ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: tooltip.side === "left" ? -10 : 10 }}
            className={`fixed z-[100] max-w-xs p-4 border border-[var(--steel-blue)] bg-white/95 backdrop-blur-xl shadow-2xl pointer-events-none ${
              tooltip.side === "left" ? "right-[40px]" : "left-[40px]"
            }`}
            style={{ top: `${tooltip.y}px` }}
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="w-1 h-3" style={{ backgroundColor: "var(--royal-blue)" }} />
              <p className="font-bold text-sm tracking-tight">{tooltip.name.toUpperCase()}</p>
            </div>
            <p className="text-[11px] leading-relaxed opacity-80 font-medium">
              {tooltip.specs.loadout}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

// =======================
// CARD COMPONENT
// =======================
function TechCard({ tech, index, hoveredId, setHoveredId, setTooltip }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const xSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const ySpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(ySpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(xSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  // Mobile long press logic
  let pressTimer;
  const handleTouchStart = () => {
    pressTimer = setTimeout(() => {
      setTooltip({
        name: tech.name,
        specs: tech.specs,
        y: window.innerHeight * 0.5,
        side: "right",
      });
    }, 500);
  };

  const handleMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);

    setTooltip({
      name: tech.name,
      specs: tech.specs,
      y: rect.top,
      side: e.clientX < window.innerWidth / 2 ? "right" : "left",
    });
  };

  const isRelated = hoveredId && (tech.related.includes(hoveredId) || tech.id === hoveredId);
  const isDim = hoveredId && !isRelated;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMove}
      onMouseEnter={() => setHoveredId(tech.id)}
      onMouseLeave={() => {
        setHoveredId(null);
        setTooltip(null);
        x.set(0); y.set(0);
      }}
      onTouchStart={handleTouchStart}
      onTouchEnd={() => clearTimeout(pressTimer)}
      className={`relative p-6 border cursor-pointer backdrop-blur-xl transition-all duration-500
        ${isDim ? "opacity-25 grayscale scale-[0.98]" : "opacity-100 scale-100"}
      `}
      style={{
        background: "rgba(255,255,255,0.7)",
        borderColor: isRelated ? tech.color : "rgba(141,169,196,0.3)",
        boxShadow: tech.featured 
          ? `0 0 20px ${tech.color}15` 
          : "0 10px 30px -10px rgba(0,0,0,0.05)"
      }}
    >
      {/* Featured Background Glow */}
      {tech.featured && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{ boxShadow: [`inset 0 0 0px ${tech.color}00`, `inset 0 0 40px ${tech.color}10`, `inset 0 0 0px ${tech.color}00`] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      )}

      {/* Card Content */}
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-6">
          <div className="p-2 bg-white shadow-sm border border-gray-100">
            <img src={tech.src} className="h-8 w-8 object-contain" alt={tech.name} />
          </div>
          <span className="text-[10px] font-mono font-bold px-2 py-1 border opacity-50 uppercase tracking-tighter" style={{ borderColor: tech.color, color: tech.color }}>
            {tech.group}
          </span>
        </div>

        <h3 className="text-xl font-bold tracking-tight mb-4">{tech.name}</h3>

        {/* Experience Meter */}
        <div className="space-y-2">
          <div className="flex justify-between text-[10px] font-mono opacity-60 uppercase">
            <span>Proficiency</span>
            <span>{tech.years * 2}+ Years</span>
          </div>
          <div className="h-1 w-full bg-gray-100">
            <motion.div
              className="h-full"
              style={{ backgroundColor: tech.color }}
              initial={{ width: 0 }}
              whileInView={{ width: `${Math.min(tech.years * 25, 100)}%` }}
              transition={{ duration: 1, ease: "circOut" }}
            />
          </div>
        </div>

        <div className="mt-4 flex justify-between items-center text-[10px] font-mono opacity-50 uppercase tracking-widest">
           <span>{tech.projects} Projects</span>
           {tech.featured && <span className="text-xs">★</span>}
        </div>
      </div>
    </motion.div>
  );
}