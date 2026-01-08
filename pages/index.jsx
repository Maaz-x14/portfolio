import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// Force client-side only for 3D/Interactive components
const Hero = dynamic(() => import('../components/Hero'), { ssr: false });
const Certificates = dynamic(() => import('../components/Certificates'), { ssr: false });

import Navbar from '../components/Navbar';
import Doctrine from '../components/Doctrine';
import TheArsenal from '../components/TheArsenal';
import ProjectsSection from '../components/ProjectsSection';
import Journey from '../components/Journey';
import ProvenOutcomes from '../components/ProvenOutcomes';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import ScrollTop from '../components/ScrollTop';
// import { TechnicalProvider } from '../components/TechnicalContext';

export default function Home() {
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => { setHasMounted(true); }, []);

  if (!hasMounted) return null;

  return (
    // <TechnicalProvider>
      <div className="min-h-screen bg-[#EEF4ED]">
        <Navbar />
        <main>
          <Hero />
          <div className="space-y-32 py-20">
            <Doctrine />
            <ProvenOutcomes />
            <TheArsenal />
            <ProjectsSection />
            <Certificates />
            <Journey />
            <Contact />
          </div>
        </main>
        <Footer />
        <ScrollTop />
      </div>
    // </TechnicalProvider>
  );
}