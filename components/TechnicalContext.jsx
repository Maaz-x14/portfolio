import { createContext, useContext, useEffect, useState } from 'react';

const TechnicalContext = createContext();

export function TechnicalProvider({ children }) {
  const [isTechnicalMode, setIsTechnicalMode] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true); // Anchor the app to the client
    const saved = localStorage.getItem('showTechnical');
    if (saved === '1') setIsTechnicalMode(true);
  }, []);

  const toggleTechnicalMode = () => {
    setIsTechnicalMode(prev => {
      const next = !prev;
      localStorage.setItem('showTechnical', next ? '1' : '0');
      return next;
    });
  };

  if (!hasMounted) return null;

  return (
    <TechnicalContext.Provider value={{ isTechnicalMode, toggleTechnicalMode }}>
      <div className={isTechnicalMode ? 'tech-active' : ''}>
        {children}
      </div>
    </TechnicalContext.Provider>
  );
}

export const useTechnical = () => useContext(TechnicalContext);
