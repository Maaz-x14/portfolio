'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, ExternalLink, Terminal } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#EEF4ED] pt-20 pb-12 border-t border-[#0B2545]/10 relative overflow-hidden">
      {/* ARCHITECTURAL GRID OVERLAY */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{ 
          backgroundImage: `radial-gradient(#0B2545 1px, transparent 1px)`, 
          backgroundSize: '30px 30px' 
        }} 
      />

      <div className="max-w-7xl mx-auto px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-20">
          
          {/* SYSTEM IDENTITY */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="font-black text-[#0B2545] uppercase tracking-tighter text-sm">
                Maaz Ahmad Portfolio
              </span>
            </div>
          </div>

          {/* OPERATIONAL STATUS [cite: 77, 101] */}
          <div className="space-y-4">
            
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-[11px] font-mono text-[#0B2545] font-bold">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                STATUS: BUILDING IN ISLAMABAD
              </div>
              <p className="text-[10px] font-mono text-[#134074]/40 uppercase">
                LATENCY: GMT+5 | NUST SE 2027
              </p>
            </div>
          </div>

          {/* SOURCE REPOSITORIES [cite: 68] */}
          <div className="space-y-4 md:text-right">
            <h4 className="text-[10px] font-mono font-bold text-[#0B2545]/40 uppercase tracking-[0.3em]">
              External Links
            </h4>
            <div className="flex md:justify-end gap-6">
              <a 
                href="https://github.com/Maaz-x14" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#0B2545]/60 hover:text-[#0B2545] transition-colors"
              >
                <Github size={20} strokeWidth={1.5} />
              </a>
              <a 
                href="https://linkedin.com/in/maaz-ahmad14" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#0B2545]/60 hover:text-[#0B2545] transition-colors"
              >
                <Linkedin size={20} strokeWidth={1.5} />
              </a>
            </div>
          </div>
        </div>

        {/* BOTTOM METADATA BAR */}
        <div className="pt-8 border-t border-[#0B2545]/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-[9px] font-mono text-[#134074]/30 uppercase tracking-[0.4em]">
            © {currentYear} MAAZ_AHMAD | ALL Rights Reserved
          </div>
          
          <div className="flex items-center gap-8">
            <div className="text-[9px] font-mono text-[#134074]/30 uppercase tracking-[0.4em]">
              Tech: Next.js + Framer + Spring
            </div>
            
          </div>
        </div>
      </div>
    </footer>
  );
}