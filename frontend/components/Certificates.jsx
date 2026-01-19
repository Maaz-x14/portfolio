import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useSpring, useTransform, useMotionValue } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Autoplay, Pagination } from "swiper/modules";

// Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

// ------------------ DATA ------------------
const CERTS = [
  {
    id: "01",
    title: "Generative AI Developer",
    org: "HEC & ULEF",
    date: "Dec 2025",
    image: "/certs/generative-ai.png",
    link: "https://quiz.ideagist.com/ideagist-certificate?cert_hash=507f65349fc20d9d",
    usedIn: "Agentic Workflow Platform",
    skills: ["LLMs", "RAG", "Prompt Engineering"],
  },
  {
    id: "02",
    title: "Machine Learning Specialization",
    org: "DeepLearning.AI",
    date: "2025",
    image: "/certs/ml.png",
    link: "https://www.coursera.org/account/accomplishments/specialization/R9E4ZGZ60UZV",
    usedIn: "Smart Air Quality Monitor",
    skills: ["Neural Networks", "Optimization", "Supervised ML"],
  },
  {
    id: "03",
    title: "React Development",
    org: "IBM",
    date: "2024",
    image: "/certs/react.png",
    link: "https://www.coursera.org/account/accomplishments/verify/WRYX17CTDSBL",
    usedIn: "Portfolio Platform",
    skills: ["React", "Hooks", "SPA Architecture"],
  },
  {
    id: "04",
    title: "Linux Fundamentals",
    org: "LearnQuest",
    date: "2024",
    image: "/certs/linux.png",
    link: "https://www.coursera.org/account/accomplishments/verify/WWFZ4C6ERFWY",
    usedIn: "IoT Telemetry Stack",
    skills: ["Shell", "Processes", "Permissions"],
  }
];

// ------------------ MAGNETIC FRAME ------------------
function MagneticExhibit({ children, cert }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);
  const shineX = useTransform(mouseXSpring, [-0.5, 0.5], ["0%", "100%"]);

  function handleMove(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  return (
    <motion.div
      onMouseMove={handleMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="relative w-full h-full bg-[#0B2545] border border-white/10 shadow-2xl overflow-hidden group"
    >
      {/* Gloss Reflection Sweep */}
      <motion.div 
        style={{ left: shineX }}
        className="absolute top-0 bottom-0 w-32 bg-white/5 skew-x-[25deg] pointer-events-none blur-2xl z-20"
      />

      {/* Actual Certificate Image */}
      <img
        src={cert.image}
        alt={cert.title}
        className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
      />

      {/* Subtle HUD Label */}
      <div className="absolute top-4 left-4 z-30">
        <span className="text-[9px] font-mono text-white/40 uppercase tracking-[0.3em]">
          Exhibit // {cert.id}
        </span>
      </div>
      
      {children}
    </motion.div>
  );
}

// ------------------ MAIN SECTION ------------------
export default function Certificates() {
  const [viewMode, setViewMode] = useState("gallery");
  const [active, setActive] = useState(null);

  return (
    <section className="py-32 px-6 bg-[#EEF4ED] relative overflow-hidden" id="certificates">
      {/* ARCHITECTURAL GRID */}
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#0B2545 1px, transparent 1px)`,
          backgroundSize: "30px 30px",
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* UNIFIED HEADER */}
        <header className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-2">
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-sm font-mono tracking-[0.5em] text-[#134074]/60 uppercase"
            >
              Credential Archive
            </motion.h2>
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="text-6xl font-black text-[#0B2545] tracking-tighter uppercase"
            >
              Certificates
            </motion.h1>
          </div>

          {/* MODE TOGGLE */}
          <div className="flex bg-[#0B2545]/5 p-1 border border-[#0B2545]/10 self-start md:self-auto">
            {["gallery", "timeline"].map((mode) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={`px-6 py-2 text-[10px] font-mono uppercase tracking-widest transition-all ${
                  viewMode === mode 
                    ? "bg-[#0B2545] text-white shadow-lg" 
                    : "text-[#0B2545]/40 hover:text-[#0B2545]"
                }`}
              >
                {mode} Mode
              </button>
            ))}
          </div>
        </header>

        {/* ================== GALLERY MODE ================== */}
        <AnimatePresence mode="wait">
          {viewMode === "gallery" ? (
            <motion.div
              key="gallery-view"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="relative mt-5"
            >
              <Swiper
                modules={[EffectCoverflow, Autoplay, Pagination]}
                effect="coverflow"
                centeredSlides={true}
                loop={true}
                slidesPerView={"auto"}
                autoplay={{ delay: 4000, disableOnInteraction: false }}
                pagination={{ clickable: true, dynamicBullets: true }}
                coverflowEffect={{
                  rotate: 15,
                  stretch: 0,
                  depth: 300,
                  modifier: 1,
                  slideShadows: false,
                }}
                className="certificate-swiper py-20 !overflow-visible"
              >
                {CERTS.map((cert) => (
                  <SwiperSlide
                    key={cert.id}
                    style={{ width: "min(520px, 85vw)", height: "340px" }}
                    onClick={() => setActive(cert)}
                  >
                    <MagneticExhibit cert={cert}>
                      {/* Internal Card Content */}
                      <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-[#0B2545] via-[#0B2545]/80 to-transparent">
                        <h3 className="text-xl font-bold text-white uppercase tracking-tight mb-1">{cert.title}</h3>
                        <p className="text-[10px] font-mono text-white/40 uppercase tracking-widest">{cert.org}</p>
                      </div>
                    </MagneticExhibit>
                  </SwiperSlide>
                ))}
              </Swiper>
            </motion.div>
          ) : (
            /* ================== TIMELINE MODE ================== */
            <motion.div
              key="timeline-view"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="border-l border-[#0B2545]/10 pl-10 space-y-12"
            >
              {CERTS.map((c) => (
                <div key={c.id} className="relative group cursor-pointer" onClick={() => setActive(c)}>
                  <div className="absolute -left-[3.05rem] top-2 w-4 h-4 rounded-none bg-[#0B2545] scale-0 group-hover:scale-100 transition-transform" />
                  <p className="text-[10px] font-mono text-[#134074]/50 mb-1">{c.date}</p>
                  <h3 className="text-2xl font-black text-[#0B2545] uppercase tracking-tighter group-hover:text-[#134074] transition-colors">
                    {c.title}
                  </h3>
                  <p className="text-xs text-[#0B2545]/70 italic uppercase tracking-wider">Applied in_{c.usedIn}</p>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* ================== FULLSCREEN DOSSIER MODAL ================== */}
        <AnimatePresence>
          {active && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-[#EEF4ED]/95 backdrop-blur-xl flex items-center justify-center z-[100] p-6"
              onClick={() => setActive(null)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white border border-[#0B2545]/10 max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 shadow-2xl relative"
              >
                {/* Close Button */}
                <button 
                  onClick={() => setActive(null)}
                  className="absolute top-6 right-6 text-2xl font-light text-[#0B2545] hover:rotate-90 transition-transform z-50"
                >
                  ✕
                </button>

                <div className="p-1 lg:p-1 bg-[#0B2545]/5 flex items-center justify-center relative overflow-hidden">
                   {/* Background Verified Seal */}
                   <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 border-[20px] border-[#0B2545]/5 rounded-full flex items-center justify-center text-8xl font-black text-[#0B2545]/5 rotate-12 select-none pointer-events-none">
                     VALID
                   </div>
                   <img src={active.image} alt={active.title} className="max-h-[70vh] w-auto object-contain relative z-10 p-12 drop-shadow-2xl" />
                </div>

                <div className="p-12 lg:p-20 flex flex-col justify-center">
                  <span className="text-[10px] font-mono uppercase text-[#134074]/40 tracking-[0.5em] mb-4">Verification Dossier</span>
                  <h3 className="text-5xl font-black text-[#0B2545] tracking-tighter uppercase mb-6 leading-none">
                    {active.title}
                  </h3>
                  <div className="space-y-8">
                    <div>
                      <p className="text-[9px] font-mono uppercase text-[#134074]/40 mb-1">Issuing Organization</p>
                      <p className="text-xl font-bold text-[#0B2545]">{active.org}</p>
                    </div>
                    <div>
                      <p className="text-[9px] font-mono uppercase text-[#134074]/40 mb-1">Operational Application</p>
                      <p className="text-sm italic text-[#0B2545]/70">Credential leveraged for the architecture of the <span className="font-bold border-b border-[#0B2545]">{active.usedIn}</span> exhibit.</p>
                    </div>
                    <div className="flex flex-wrap gap-2 pt-4">
                      {active.skills.map(s => (
                        <span key={s} className="text-[10px] font-mono bg-[#0B2545] text-white px-3 py-1 uppercase">{s}</span>
                      ))}
                    </div>
                    <a
                      href={active.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-8 text-[11px] font-mono font-bold border border-[#0B2545] px-8 py-4 uppercase tracking-[0.2em] hover:bg-[#0B2545] hover:text-white transition-all"
                    >
                      Verify Credential // External_Link
                    </a>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}