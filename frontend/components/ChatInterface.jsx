'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { Send, Bot, Sparkles, Loader2, Plus } from 'lucide-react';

const SUGGESTED_QUESTIONS = [
  "Who is Maaz?",
  "Technical strengths?",
  "Tell me about the Smart AQI project.",
  "What is Maaz's engineering philosophy?"
];

const ChatInterface = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSend = async (query = input) => {
    const textToSend = typeof query === 'string' ? query : input;
    if (!textToSend.trim()) return;

    const userMessage = { role: 'user', content: textToSend };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:8080/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-forwarded-for': 'SIRIUS_AURA_NUST_ISLAMABAD_2026'
        },
        body: JSON.stringify({ message: textToSend, mode: 'rag' }),
      });

      const data = await response.json();
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: data.answer,
        sources: data.sources || []
      }]);
    } catch (error) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "Archive connection lost. Ensure backend service is operational.",
        sources: []
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-20 px-6 bg-[#EEF4ED] relative min-h-screen overflow-hidden font-sans">
      {/* ARCHITECTURAL GRID BACKGROUND */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none" 
           style={{ backgroundImage: `radial-gradient(#0B2545 1px, transparent 1px)`, backgroundSize: '30px 30px' }} 
      />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* HEADER BLOCK */}
        <header className="mb-12 space-y-2">
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-sm font-mono tracking-[0.5em] text-[#134074]/60 uppercase"
          >
            Archive Intelligence
          </motion.h2>
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl font-black text-[#0B2545] tracking-tighter uppercase"
          >
            Maaz-x14 Vault
          </motion.h1>
        </header>

        {/* CHAT CONTAINER */}
        <div className="bg-white/40 backdrop-blur-md border border-black/5 shadow-2xl shadow-[#0B2545]/5 flex flex-col h-[700px]">
          
          {/* MESSAGES AREA */}
          <div className="flex-1 overflow-y-auto p-8 space-y-8 scrollbar-hide">
            <AnimatePresence initial={false}>
              {messages.length === 0 && (
                <motion.div 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="h-full flex flex-col items-center justify-center text-center space-y-6"
                >
                  <Bot size={48} className="text-[#0B2545]/10" />
                  <p className="text-[#134074]/40 font-mono text-sm uppercase tracking-widest">
                    Awaiting query for record retrieval...
                  </p>
                </motion.div>
              )}
              
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[90%] ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                    {msg.role === 'assistant' && (
                      <div className="text-[10px] font-mono text-[#134074]/40 mb-2 uppercase tracking-widest">
                        Intelligence Response
                      </div>
                    )}
                    <div className={`p-6 ${
                      msg.role === 'user' 
                        ? 'bg-[#0B2545] text-white rounded-l-lg' 
                        : 'bg-white border border-[#0B2545]/5 text-[#0B2545] rounded-r-lg shadow-sm'
                    }`}>
                      <div className="prose prose-sm max-w-none prose-slate">
                        <ReactMarkdown>{msg.content}</ReactMarkdown>
                      </div>
                    </div>

                    {/* CITATION PILLS */}
                    {msg.sources && msg.sources.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-2 justify-start">
                        {msg.sources.map(src => (
                          <span key={src} className="text-[9px] font-mono bg-[#0B2545]/5 px-2 py-1 rounded text-[#0B2545]/60 uppercase border border-[#0B2545]/10">
                            Ref: {src}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {isLoading && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                <div className="space-y-2">
                  <div className="text-[10px] font-mono text-[#134074]/40 uppercase tracking-widest">Querying Vector Index...</div>
                  <div className="flex gap-1">
                    {[0, 1, 2].map(d => (
                      <motion.div key={d} animate={{ opacity: [0.2, 1, 0.2] }} transition={{ repeat: Infinity, duration: 1, delay: d * 0.2 }} className="w-2 h-2 bg-[#0B2545]/20 rounded-full" />
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
            <div ref={scrollRef} />
          </div>

          {/* SUGGESTIONS & INPUT */}
          <div className="p-8 border-t border-[#0B2545]/5 bg-white/60">
            {messages.length === 0 && (
              <div className="mb-6 flex flex-wrap gap-3">
                {SUGGESTED_QUESTIONS.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(q)}
                    className="text-[11px] font-mono border border-[#0B2545]/10 px-4 py-2 text-[#134074]/60 hover:bg-[#0B2545] hover:text-white transition-all duration-300 uppercase tracking-tighter"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            <div className="relative group">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="INPUT PARAMETERS FOR ARCHIVE SEARCH..."
                className="w-full bg-transparent border-b-2 border-[#0B2545]/10 py-4 pr-12 text-[#0B2545] font-mono text-sm focus:outline-none focus:border-[#0B2545] transition-all placeholder:text-[#134074]/20"
              />
              <button 
                onClick={() => handleSend()}
                disabled={isLoading || !input.trim()}
                className="absolute right-0 top-1/2 -translate-y-1/2 text-[#0B2545]/40 hover:text-[#0B2545] transition-colors"
              >
                <Plus size={24} strokeWidth={1} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChatInterface;