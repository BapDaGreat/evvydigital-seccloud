import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { ScrollIndicator } from './components/ScrollIndicator';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { ContentSection } from './components/ContentSection';
import { PortfolioSection } from './components/PortfolioSection';
import { ProcessSection } from './components/ProcessSection';
import { StudioSection } from './components/StudioSection';
import { InsightsSection } from './components/InsightsSection';
import { Footer } from './components/Footer';
import { DemoModal } from './components/DemoModal';
import { DesignSpecDrawer } from './components/DesignSpecDrawer';

export function App() {
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const [demoPrefillEmail, setDemoPrefillEmail] = useState('');
  const [demoPrefillTier, setDemoPrefillTier] = useState('Cloud-Native Enterprise');
  const [specDrawerOpen, setSpecDrawerOpen] = useState(false);

  const handleOpenDemo = (prefillEmail?: string, tier?: string) => {
    if (prefillEmail !== undefined) setDemoPrefillEmail(prefillEmail);
    if (tier !== undefined) setDemoPrefillTier(tier);
    setDemoModalOpen(true);
  };

  return (
    <div className="relative min-h-screen bg-black text-white selection:bg-[#1676d1] selection:text-white">
      {/* Global Adaptive Liquid-Glass Navbar */}
      <Navbar
        onOpenDemo={handleOpenDemo}
        onOpenSpec={() => setSpecDrawerOpen(true)}
      />

      {/* Fixed Left Scroll Progress & Quick-Action Rail */}
      <ScrollIndicator
        onOpenDemo={() => handleOpenDemo()}
        onOpenSpec={() => setSpecDrawerOpen(true)}
      />

      {/* Main Content Landmarks */}
      <main>
        <Hero
          onOpenDemo={handleOpenDemo}
          onOpenSpec={() => setSpecDrawerOpen(true)}
        />
        <AboutSection onOpenDemo={handleOpenDemo} />
        <ContentSection onOpenDemo={handleOpenDemo} />
        <PortfolioSection onOpenDemo={handleOpenDemo} />
        <ProcessSection />
        <StudioSection />
        <InsightsSection onOpenDemo={handleOpenDemo} />
      </main>

      {/* Scroll-Linked Scale Footer */}
      <Footer
        onOpenDemo={handleOpenDemo}
        onOpenSpec={() => setSpecDrawerOpen(true)}
      />

      {/* Interactive Enterprise Demo Booking Modal (<dialog closedby="any">) */}
      <DemoModal
        isOpen={demoModalOpen}
        onClose={() => setDemoModalOpen(false)}
        initialEmail={demoPrefillEmail}
        initialTier={demoPrefillTier}
      />

      {/* Senior UX/UI Designer IA & Rationale Blueprint Drawer */}
      <DesignSpecDrawer
        isOpen={specDrawerOpen}
        onClose={() => setSpecDrawerOpen(false)}
      />
    </div>
  );
}

export default App;
