import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, ShieldCheck, Layers, Mail } from 'lucide-react';

interface FooterProps {
  onOpenDemo: (prefillEmail?: string, tier?: string) => void;
  onOpenSpec: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenDemo, onOpenSpec }) => {
  const footerRef = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ['start end', 'end end'],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <footer
      ref={footerRef}
      id="contact"
      aria-label="Footer and Enterprise Demo Call to Action"
      className="bg-black text-white min-h-[60vh] flex flex-col justify-between py-24 px-6 md:px-12 relative z-10 border-t border-white/15 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full flex flex-col justify-between flex-1 gap-16">
        {/* Top Conversion Banner */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 pb-12 border-b border-white/10">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#0b4ea8]/30 border border-[#5fb9ff]/30 px-3.5 py-1.5 text-xs font-extrabold uppercase tracking-widest text-[#5fb9ff] mb-4">
              <ShieldCheck className="h-4 w-4" />
              <span>READY FOR ZERO-TRUST DEPLOYMENT</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-white mb-3">
              See EvvyDigital SecCloud on Your Own Architecture in 15 Minutes.
            </h2>
            <p className="text-gray-400 font-medium leading-relaxed text-sm md:text-base">
              Schedule a live, engineer-led walkthrough tailored to your cloud
              topology, compliance roadmap, and conversion goals.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={onOpenSpec}
              className="inline-flex items-center gap-2 rounded-full border border-white/25 hover:border-white px-6 py-4 text-sm font-bold text-white transition-all cursor-pointer"
            >
              <Layers className="h-4 w-4 text-[#5fb9ff]" />
              <span>Inspect UX/IA Specification</span>
            </button>

            <button
              type="button"
              onClick={() => onOpenDemo()}
              className="inline-flex items-center gap-2 rounded-full bg-[#1676d1] hover:bg-[#5fb9ff] hover:text-black text-white font-black px-8 py-4 text-sm md:text-base tracking-tight transition-all shadow-lg cursor-pointer"
            >
              <span>Book Enterprise Demo</span>
              <ArrowUpRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Scroll-Linked Massive Callout Headline */}
        <motion.div
          style={{ scale, opacity }}
          className="my-auto text-center py-6 select-none"
        >
          <button
            type="button"
            onClick={() => onOpenDemo()}
            aria-label="Let's Talk — Open Enterprise Demo Scheduler"
            className="group inline-block focus:outline-none cursor-pointer"
          >
            <span className="block text-[12vw] md:text-[10vw] font-black leading-none tracking-tighter bg-gradient-to-br from-white via-white to-gray-500 bg-clip-text text-transparent group-hover:from-[#5fb9ff] group-hover:via-white group-hover:to-[#1676d1] transition-all duration-500">
              LET&apos;S TALK
            </span>
          </button>
        </motion.div>

        {/* Bottom Legal & Social Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6 text-sm text-gray-400 font-medium">
          <div className="flex items-center gap-3">
            <span className="font-bold text-white tracking-tight">
              EvvyDigital
            </span>
            <span>•</span>
            <span>© {new Date().getFullYear()} All Rights Reserved.</span>
            <span className="hidden md:inline text-xs text-emerald-400 font-mono bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full">
              SOC 2 Type II // ISO 27001
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <a
              href="#privacy"
              onClick={(e) => {
                e.preventDefault();
                onOpenSpec();
              }}
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#terms"
              onClick={(e) => {
                e.preventDefault();
                onOpenSpec();
              }}
              className="hover:text-white transition-colors"
            >
              Terms of Service
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors"
            >
              Instagram
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors"
            >
              Twitter
            </a>
            <a
              href="mailto:security@evvydigital.com"
              className="inline-flex items-center gap-1.5 text-white hover:text-[#5fb9ff] transition-colors"
            >
              <Mail className="h-4 w-4" />
              <span>security@evvydigital.com</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
