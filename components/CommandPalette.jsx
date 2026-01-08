import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-[100] bg-[#EEF4ED]/80 backdrop-blur-sm"
          />
          <div className="fixed inset-0 z-[101] flex items-start justify-center pt-[15vh] pointer-events-none">
            <motion.div 
              initial={{ opacity: 0, y: -20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              className="w-full max-w-xl bg-white border border-black/5 shadow-2xl overflow-hidden pointer-events-auto rounded-2xl"
            >
              <div className="flex items-center border-b border-black/5 px-6">
                <span className="text-[#134074] font-mono text-sm mr-4">❯</span>
                <input 
                  autoFocus
                  placeholder="Navigate system..." 
                  className="w-full bg-transparent py-6 text-lg outline-none text-[#0B2545] font-sans placeholder:text-zinc-300"
                />
              </div>
              <div className="px-6 py-3 bg-[#EEF4ED]/50 flex justify-between">
                 <span className="text-[10px] font-mono text-[#134074]/40 uppercase tracking-widest">Agent Mode: Active</span>
                 <kbd className="text-[10px] font-mono text-zinc-400">ESC to close</kbd>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}