import { useEffect, useState } from 'react';
import { TopformSite } from './components/TopformSite';
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

function resolveActiveSite(): 'topform' | 'seccloud' {
  if (typeof window !== 'undefined') {
    const params = new URLSearchParams(window.location.search);
    const querySite = params.get('site')?.toLowerCase();
    if (querySite === 'topform') return 'topform';
    if (querySite === 'seccloud' || querySite === 'evvy') return 'seccloud';

    // Port 5174 (or VITE_SITE=seccloud) serves EvvyDigital // SecCloud
    // Port 5173 serves TOPFORM
    if (window.location.port === '5174') return 'seccloud';
    if (window.location.port === '5173') return 'topform';
  }

  const envSite = import.meta.env.VITE_SITE;
  if (envSite === 'seccloud') return 'seccloud';
  return 'topform';
}

export function EvvySecSite() {
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const [demoPrefillEmail, setDemoPrefillEmail] = useState('');
  const [demoPrefillTier, setDemoPrefillTier] = useState(
    'Cloud-Native Enterprise'
  );
  const [specDrawerOpen, setSpecDrawerOpen] = useState(false);

  const handleOpenDemo = (prefillEmail?: string, tier?: string) => {
    if (prefillEmail !== undefined) setDemoPrefillEmail(prefillEmail);
    if (tier !== undefined) setDemoPrefillTier(tier);
    setDemoModalOpen(true);
  };

  return (
    <div
      className="relative min-h-screen bg-black text-white selection:bg-[#1676d1] selection:text-white"
      style={{
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      }}
    >
      <Navbar
        onOpenDemo={handleOpenDemo}
        onOpenSpec={() => setSpecDrawerOpen(true)}
      />

      <ScrollIndicator
        onOpenDemo={() => handleOpenDemo()}
        onOpenSpec={() => setSpecDrawerOpen(true)}
      />

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

      <Footer
        onOpenDemo={handleOpenDemo}
        onOpenSpec={() => setSpecDrawerOpen(true)}
      />

      <DemoModal
        isOpen={demoModalOpen}
        onClose={() => setDemoModalOpen(false)}
        initialEmail={demoPrefillEmail}
        initialTier={demoPrefillTier}
      />

      <DesignSpecDrawer
        isOpen={specDrawerOpen}
        onClose={() => setSpecDrawerOpen(false)}
      />
    </div>
  );
}

export function App() {
  const activeSite = resolveActiveSite();

  useEffect(() => {
    if (activeSite === 'seccloud') {
      document.title =
        'EvvyDigital // SecCloud | Enterprise Cybersecurity SaaS & Digital Platform Architecture';
    } else {
      document.title =
        'TOPFORM | Play Consistently At Your Best. Make Your Best Even Better.';
    }
  }, [activeSite]);

  if (activeSite === 'seccloud') {
    return <EvvySecSite />;
  }

  return <TopformSite />;
}

export default App;
