import React, { useEffect, useState } from "react";
import Link from "next/link";

const NAVIGATION_MAP = [
  { label: "Home", href: "#hero" }, // Aligned with 'Home'
  { label: "Projects", href: "#projects" }, // Points to 'Project Milestones'
  { label: "DOCTRINE", href: "#doctrine" }, // Points to 'How I Build Things'
  { label: "Chatbot", href: "#chatbot" }, // Points to 'Intelligence Vault'
  { label: "Contact", href: "#contact" }, // Points to 'Contact'
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ${
        scrolled ? "bg-[#13315C] py-4 shadow-2xl" : "bg-transparent py-10"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-12 flex justify-between items-center">
        {/* Dynamic Text Color: Navy when transparent, White when scrolled */}
        {/* IMPROVED TITLE: ARCHITECTURAL LOGO */}
        <Link
          href="/"
          className="group flex items-center gap-4 focus:outline-none"
        >
          <div
            className={`w-10 h-10 border flex items-center justify-center transition-all duration-500 ${
              scrolled
                ? "border-white/20 bg-white/10"
                : "border-[#0B2545]/20 bg-[#0B2545]/5"
            }`}
          >
            <span
              className={`text-sm font-black transition-colors duration-500 ${
                scrolled ? "text-[#EEF4ED]" : "text-[#0B2545]"
              }`}
            >
              MZ
            </span>
          </div>
          <div className="flex flex-col">
            <span
              className={`font-black tracking-[0.2em] text-[12px] uppercase transition-colors duration-500 ${
                scrolled ? "text-[#EEF4ED]" : "text-[#0B2545]"
              }`}
            >
              Maaz Ahmad
            </span>
            <span
              className={`text-[8px] font-mono tracking-[0.4em] uppercase transition-colors duration-500 ${
                scrolled ? "text-[#EEF4ED]/40" : "text-[#134074]/40"
              }`}
            >
              Software Engineer
            </span>
          </div>
        </Link>

        <ul className="flex gap-14 items-center">
          {NAVIGATION_MAP.map((item) => (
            <li key={item.label} className="group relative list-none">
              <Link
                href={item.href}
                className={`text-[10px] font-sans uppercase tracking-[0.4em] font-bold transition-all duration-500 no-underline ${
                  scrolled ? "text-[#EEF4ED]" : "text-[#0B2545]"
                }`}
              >
                {item.label}
              </Link>
              
              <span
                className={`absolute -bottom-2 left-0 w-full h-[1px] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left ${
                  scrolled ? "bg-[#EEF4ED]" : "bg-[#0B2545]"
                }`}
              />
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
