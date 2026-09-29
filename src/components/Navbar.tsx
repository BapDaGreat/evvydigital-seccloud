import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X, ShieldCheck, Layers, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  onOpenDemo: (prefillEmail?: string) => void;
  onOpenSpec: () => void;
}

const NAV_LINKS = [
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#work' },
  { label: 'Process', href: '#process' },
  { label: 'Studio', href: '#studio' },
  { label: 'Insights', href: '#insights' },
  { label: 'Contact', href: '#contact' },
];

export const Navbar: React.FC<NavbarProps> = ({ onOpenDemo, onOpenSpec }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 flex justify-center pointer-events-none">
        <motion.nav
          aria-label="Primary Navigation"
          initial={{ y: -24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.2, 0.65, 0.3, 0.9] }}
          className={`pointer-events-auto transition-all duration-500 flex items-center justify-between ${
            isScrolled
              ? 'mt-6 w-[95%] md:w-[88%] max-w-6xl rounded-full liquid-glass py-3 px-6 md:px-8 text-black shadow-xl'
              : 'mt-0 w-full px-6 md:px-12 py-6 bg-transparent text-white'
          }`}
        >
          {/* Brand Identity */}
          <a
            href="#top"
            className={`flex items-center gap-2.5 text-2xl font-bold tracking-tighter transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded-lg ${
              isScrolled ? 'text-black' : 'text-white'
            }`}
          >
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#0b4ea8] text-white shadow-sm">
              <ShieldCheck className="h-4 w-4" />
            </span>
            <span>EvvyDigital</span>
            <span
              className={`hidden sm:inline-block text-[10px] font-extrabold uppercase tracking-widest px-2 py-0.5 rounded-full border ${
                isScrolled
                  ? 'bg-black/10 text-black border-black/15'
                  : 'bg-white/15 text-white border-white/25'
              }`}
            >
              SecCloud
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-7">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`text-sm font-semibold tracking-tight transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded px-1 ${
                  isScrolled
                    ? 'text-gray-800 hover:text-[#0b4ea8]'
                    : 'text-white/90 hover:text-white'
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Conversion CTA + Senior Designer IA Blueprint Trigger */}
          <div className="hidden md:flex items-center gap-3">
            <button
              type="button"
              onClick={onOpenSpec}
              className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-bold tracking-tight transition-all cursor-pointer ${
                isScrolled
                  ? 'bg-black/10 text-gray-900 hover:bg-black/15 border border-black/15'
                  : 'bg-white/15 text-white hover:bg-white/25 border border-white/25 backdrop-blur-md'
              }`}
              title="Inspect Senior UX/UI Designer Information Architecture & Rationale"
            >
              <Layers className="h-3.5 w-3.5" />
              <span>IA & UX Spec</span>
            </button>

            <button
              type="button"
              onClick={() => onOpenDemo()}
              className={`inline-flex items-center gap-1.5 rounded-full px-5 py-2.5 text-xs md:text-sm font-bold tracking-tight transition-all cursor-pointer shadow-md ${
                isScrolled
                  ? 'bg-black text-white hover:bg-[#0b4ea8]'
                  : 'bg-white text-black hover:bg-gray-100'
              }`}
            >
              <span>Request Demo</span>
              <ArrowUpRight className="h-4 w-4" />
            </button>
          </div>

          {/* Mobile Hamburger Trigger */}
          <button
            type="button"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen(true)}
            className={`lg:hidden p-2 rounded-full transition-colors cursor-pointer ${
              isScrolled
                ? 'text-black hover:bg-black/10'
                : 'text-white hover:bg-white/15'
            }`}
          >
            <Menu className="h-6 w-6" />
          </button>
        </motion.nav>
      </header>

      {/* Mobile Full-Screen Slide-In Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 240 }}
            className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-xl text-white flex flex-col justify-between p-8"
          >
            <div className="flex items-center justify-between">
              <a
                href="#top"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2.5 text-2xl font-bold tracking-tighter text-white"
              >
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#1676d1] text-white">
                  <ShieldCheck className="h-4 w-4" />
                </span>
                <span>EvvyDigital</span>
              </a>
              <button
                type="button"
                aria-label="Close navigation menu"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors cursor-pointer"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <nav className="flex flex-col gap-6 my-auto">
              {NAV_LINKS.map((link, idx) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.06, duration: 0.4 }}
                  className="text-4xl font-black tracking-tight text-white hover:text-[#5fb9ff] transition-colors"
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>

            <div className="flex flex-col gap-3 pt-6 border-t border-white/15">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenSpec();
                }}
                className="w-full py-3.5 px-6 rounded-full border border-white/25 text-white font-bold text-sm flex items-center justify-center gap-2 hover:bg-white/10 transition-colors cursor-pointer"
              >
                <Layers className="h-4 w-4" />
                <span>View Senior UX/UI IA & Rationale</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenDemo();
                }}
                className="w-full py-4 px-6 rounded-full bg-[#1676d1] hover:bg-[#0b4ea8] text-white font-black text-base flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <span>Request Enterprise Demo</span>
                <ArrowUpRight className="h-5 w-5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
