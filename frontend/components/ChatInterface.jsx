'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { SendHorizontal, Bot, User, Loader2, Download, Plus } from 'lucide-react';

const ChatInterface = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef(null);

  // FIX: Isolated scroll. Only the message list moves, not the whole screen.
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async (textOverride = input) => {
    if (!textOverride.trim()) return;

    // Build history to send to backend
    const history = messages.map(m => ({ role: m.role, content: m.content }));
    const userMessage = { role: 'user', content: textOverride };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:8080/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-forwarded-for': 'SIRIUS_AURA_NUST_ISLAMABAD_2026' },
        body: JSON.stringify({ message: textOverride, mode: 'rag', history: history }),
      });

      const data = await response.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.answer, sources: data.sources }]);
    } catch (e) {
      setMessages(prev => [...prev, { role: 'assistant', content: "Connection to Archive failed.", sources: [] }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#EEF4ED] p-4 sm:p-8">
      {/* FIXED HEIGHT CONTAINER: Prevents page jumping */}
      <div className="w-full max-w-5xl h-[75vh] flex flex-col bg-white border border-[#0B2545]/10 shadow-2xl relative overflow-hidden">
        
        {/* Editorial Header */}
        <div className="p-6 border-b border-[#0B2545]/5 flex justify-between items-center bg-white z-10">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-[#0B2545] flex items-center justify-center"><Bot className="text-white w-5 h-5" /></div>
            <div>
              <h3 className="text-[#0B2545] font-black text-sm uppercase tracking-tighter">Maaz Intelligence Layer</h3>
              <p className="text-[9px] font-mono text-[#134074]/40 uppercase tracking-widest flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" /> Grounded Context: Active
              </p>
            </div>
          </div>
        </div>

        {/* Scrollable Message Feed */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-8 space-y-10 scrollbar-hide bg-[#F9FAFB]/30">
          {messages.map((msg, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] space-y-2 ${msg.role === 'user' ? 'text-right' : ''}`}>
                <div className={`p-6 border ${msg.role === 'user' ? 'bg-[#0B2545] text-white border-transparent' : 'bg-white text-[#0B2545] border-[#0B2545]/10 shadow-sm'}`}>
                  <div className="prose prose-sm prose-slate max-w-none"><ReactMarkdown>{msg.content}</ReactMarkdown></div>
                </div>
                {msg.sources && (
                  <div className="flex flex-wrap gap-2 justify-start mt-2">
                    {msg.sources.map(s => <span key={s} className="text-[8px] font-mono bg-[#0B2545]/5 px-2 py-1 text-[#0B2545]/40 border border-[#0B2545]/10 uppercase">REF//{s}</span>)}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
          {isLoading && <div className="text-[10px] font-mono text-[#134074]/30 uppercase animate-pulse">Syncing with Vector Archive...</div>}
        </div>

        {/* Input Footer: Locked to Bottom */}
        <div className="p-6 bg-white border-t border-[#0B2545]/5">
          <div className="flex items-center gap-3 bg-[#F9FAFB] p-2 border border-[#0B2545]/10 focus-within:border-[#0B2545] transition-all">
            <input
              className="flex-1 bg-transparent px-4 py-2 text-[#0B2545] font-mono text-xs focus:outline-none uppercase"
              value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Input parameters for archive search..."
            />
            <button onClick={() => handleSend()} className="bg-[#0B2545] p-2 text-white hover:bg-[#134074] transition-all">
              <SendHorizontal className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface; 