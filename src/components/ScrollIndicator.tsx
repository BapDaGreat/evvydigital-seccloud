import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Globe, MessageCircle, Share2 } from 'lucide-react';

interface ScrollIndicatorProps {
  onOpenDemo: () => void;
  onOpenSpec: () => void;
}

export const ScrollIndicator: React.FC<ScrollIndicatorProps> = ({
  onOpenDemo,
  onOpenSpec,
}) => {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <aside
      aria-label="Page Scroll Progress and Quick Actions"
      className="fixed left-0 top-0 h-screen z-40 hidden md:flex flex-col items-center justify-between py-10 px-3 lg:px-4 pointer-events-none select-none"
    >
      {/* Top Telemetry Indicator */}
      <div className="flex flex-col items-center gap-2">
        <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
        <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/70 [writing-mode:vertical-rl] rotate-180">
          SOC2 // LIVE
        </span>
      </div>

      {/* 2px Vertical Scroll Progress Bar */}
      <div className="relative w-[2px] h-48 bg-white/20 rounded-full overflow-hidden my-4">
        <motion.div
          style={{ scaleY, transformOrigin: 'top' }}
          className="w-full h-full bg-gradient-to-b from-[#5fb9ff] via-white to-[#1676d1]"
        />
      </div>

      {/* Social & Quick-Action Icons */}
      <div className="flex flex-col items-center gap-4 pointer-events-auto">
        <button
          type="button"
          onClick={onOpenSpec}
          aria-label="Open UX Architecture Specification"
          title="Inspect UX/UI Architecture Specification"
          className="p-2 rounded-full bg-black/40 border border-white/20 text-white/80 hover:text-white hover:border-white/50 transition-all cursor-pointer backdrop-blur-md"
        >
          <Globe className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={onOpenDemo}
          aria-label="Request Live Security Demo"
          title="Book Live Security Demo"
          className="p-2 rounded-full bg-black/40 border border-white/20 text-white/80 hover:text-white hover:border-white/50 transition-all cursor-pointer backdrop-blur-md"
        >
          <MessageCircle className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={handleShare}
          aria-label="Copy Page Link"
          title="Copy Page URL"
          className="p-2 rounded-full bg-black/40 border border-white/20 text-white/80 hover:text-white hover:border-white/50 transition-all cursor-pointer backdrop-blur-md"
        >
          <Share2 className="h-4 w-4" />
        </button>
      </div>
    </aside>
  );
};
