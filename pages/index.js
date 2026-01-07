import Hero from '../components/Hero';
import Principles from '../components/Principles';
import TheArsenal from '../components/TheArsenal';
import ProvenOutcomes from '../components/ProvenOutcomes';
import Journey from '../components/Journey';
import ProjectsSection from '../components/ProjectsSection';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] selection:bg-[var(--accent)]/20">
      <main>
        <Hero />
        <Principles />
        <TheArsenal />
        <ProvenOutcomes />
        <Journey />
        <ProjectsSection />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}