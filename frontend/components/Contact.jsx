'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Github, 
  Linkedin, 
  FileText, 
  Copy, 
  Check, 
  ExternalLink,
  ArrowUpRight
} from 'lucide-react';

const CONTACT_METHODS = [
  {
    name: "Email",
    value: "maaz.ahmad.work@gmail.com", // Replace with your actual email
    label: "Preferred Contact",
    description: "For serious opportunities, collaboration, and technical inquiries.",
    icon: Mail,
    action: "mailto:maaz.ahmad.work@gmail.com?subject=Portfolio%20Inquiry",
    isCopyable: true,
  },
  {
    name: "LinkedIn",
    value: "linkedin.com/in/maaz-ahmad14",
    label: "Professional Profile",
    description: "Career history, endorsements, and professional networking.",
    icon: Linkedin,
    action: "https://www.linkedin.com/in/maaz-ahmad14", // Update with your link
    isExternal: true,
  },
  {
    name: "GitHub",
    value: "github.com/Maaz-x14",
    label: "Code & Open Source",
    description: "Source code for RAG pipelines, Spring Boot services, and AI research.",
    icon: Github,
    action: "https://github.com/Maaz-x14", // Update with your link
    isExternal: true,
  },
  {
    name: "Resume",
    value: "Download PDF",
    label: "Technical Dossier",
    description: "A comprehensive breakdown of my skills, education, and milestones.",
    icon: FileText,
    action: "/Maaz_CV_latex.pdf", // Next.js will look in /public automatically
    isExternal: true,
  }
];

export default function ContactSection() {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="relative py-32 px-6 bg-[#EEF4ED] overflow-hidden">
      {/* ARCHITECTURAL GRID BACKGROUND */}
      <div 
        className="absolute inset-0 opacity-[0.05] pointer-events-none" 
        style={{ 
          backgroundImage: `radial-gradient(#0B2545 1px, transparent 1px)`, 
          backgroundSize: '30px 30px' 
        }} 
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* HEADER BLOCK */}
        <header className="mb-20 space-y-2">
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-sm font-mono tracking-[0.5em] text-[#134074]/60 uppercase"
          >
            Contact Me
          </motion.h2>
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-6xl font-black text-[#0B2545] tracking-tighter uppercase"
          >
            Let's Collaborate.
          </motion.h1>
          <p className="max-w-xl text-[#134074]/70 text-lg leading-relaxed pt-4">
            Currently open to software engineering internships, research roles, and mission-critical backend projects. Reach out via your preferred channel.
          </p>
        </header>

        {/* CONTACT GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {CONTACT_METHODS.map((method, i) => (
            <motion.div
              key={method.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative bg-white/40 backdrop-blur-sm border border-[#0B2545]/10 p-8 flex flex-col justify-between hover:bg-white hover:shadow-2xl hover:shadow-[#0B2545]/5 transition-all duration-500"
            >
              <div className="flex justify-between items-start mb-12">
                <div className="p-3 bg-[#0B2545]/5 text-[#0B2545] group-hover:bg-[#0B2545] group-hover:text-white transition-colors duration-500">
                  <method.icon size={24} strokeWidth={1.5} />
                </div>
                <div className="flex items-center gap-3">
                    <span className="text-[10px] font-mono text-[#134074]/40 uppercase tracking-widest">
                        {method.label}
                    </span>
                    {method.isExternal && (
                        <ArrowUpRight size={14} className="text-[#0B2545]/20 group-hover:text-[#0B2545] transition-colors" />
                    )}
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-[#0B2545] mb-2">{method.name}</h3>
                <p className="text-[#134074]/60 text-sm leading-relaxed mb-6 max-w-[280px]">
                  {method.description}
                </p>
                
                <div className="flex items-center gap-4">
                  <a 
                    href={method.action}
                    target={method.isExternal ? "_blank" : "_self"}
                    rel={method.isExternal ? "noopener noreferrer" : ""}
                    className="text-sm font-mono font-bold text-[#0B2545] hover:underline underline-offset-4"
                  >
                    {method.value}
                  </a>
                  
                  {method.isCopyable && (
                    <button 
                      onClick={() => copyToClipboard(method.value)}
                      className="p-2 text-[#0B2545]/30 hover:text-[#0B2545] transition-colors"
                      title="Copy to clipboard"
                    >
                      {copied ? <Check size={14} className="text-green-600" /> : <Copy size={14} />}
                    </button>
                  )}
                </div>
              </div>

              {/* MUSEUM STYLE STATIC INDICATOR */}
              <div className="absolute top-8 right-8 text-[#0B2545]/10 font-mono text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                // ACTIVE_PROTOCOL
              </div>
            </motion.div>
          ))}
        </div>

        {/* FOOTER SUBTEXT */}
        <footer className="mt-20 pt-8 border-t border-[#0B2545]/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-[10px] font-mono text-[#0B2545]/30 uppercase tracking-[0.4em]">
            Timezone: GMT+5 (Islamabad) // Response Latency: &lt; 24h
          </div>
          <div className="text-[10px] font-mono text-[#0B2545]/30 uppercase tracking-[0.4em]">
            Designed & Engineered by Maaz Ahmad
          </div>
        </footer>
      </div>
    </section>
  );
}