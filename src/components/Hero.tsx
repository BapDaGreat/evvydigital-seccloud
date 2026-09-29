import React, { useEffect, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import {
  ShieldCheck,
  ArrowRight,
  Lock,
  Activity,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';

interface HeroProps {
  onOpenDemo: (prefillEmail?: string, tier?: string) => void;
  onOpenSpec: () => void;
}

const HERO_WORDS = ['INNOVATE', 'REIMAGINE', 'ELEVATE', 'TRANSFORM'] as const;

const wordContainerVariants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
  exit: {
    transition: {
      staggerChildren: 0.05,
      staggerDirection: 1,
    },
  },
};

const letterVariants = {
  initial: { opacity: 0, y: 50 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.2, 0.65, 0.3, 0.9] as const },
  },
  exit: {
    opacity: 0,
    y: -50,
    transition: { duration: 0.3, ease: 'easeIn' as const },
  },
};

export const Hero: React.FC<HeroProps> = ({ onOpenDemo, onOpenSpec }) => {
  const [wordIndex, setWordIndex] = useState(0);
  const [workEmail, setWorkEmail] = useState('');
  const [selectedTier, setSelectedTier] = useState('Cloud-Native Enterprise');

  // Cycle words every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % HERO_WORDS.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Scroll & Spring Parallax Engine
  const { scrollY } = useScroll();
  const smoothScrollY = useSpring(scrollY, {
    damping: 25,
    stiffness: 100,
    mass: 0.5,
  });

  // Mouse Parallax Values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { damping: 30, stiffness: 90 });
  const smoothMouseY = useSpring(mouseY, { damping: 30, stiffness: 90 });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const { innerWidth, innerHeight } = window;
    const xPct = (e.clientX / innerWidth - 0.5) * 2;
    const yPct = (e.clientY / innerHeight - 0.5) * 2;
    mouseX.set(xPct * 18);
    mouseY.set(yPct * 12);
  };

  // Layer Scroll Transforms
  const floatingCloudOpacity = useTransform(smoothScrollY, [0, 500], [0.9, 0]);
  const mountainY = useTransform(smoothScrollY, (v) => v * 0.6);
  const nearRocksY = useTransform(smoothScrollY, (v) => v * 1.2);
  const foregroundCloudsY = useTransform(smoothScrollY, (v) => v * -0.15);
  const heroTextY = useTransform(smoothScrollY, (v) => v * 0.35);

  const handleInlineSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onOpenDemo(workEmail.trim(), selectedTier);
  };

  const currentWord = HERO_WORDS[wordIndex];

  return (
    <section
      id="top"
      onMouseMove={handleMouseMove}
      aria-label="Hero — Enterprise Cybersecurity & Digital Transformation"
      className="relative min-h-[100vh] w-full bg-[#0b4ea8] overflow-hidden flex flex-col justify-between select-none"
      style={{
        background:
          'linear-gradient(180deg, #0b4ea8 0%, #1676d1 45%, #5fb9ff 100%)',
      }}
    >
      {/* LAYER 1: Subtle Atmospheric Telemetry Grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-15"
        style={{
          backgroundImage:
            'radial-gradient(circle at 50% 25%, rgba(255,255,255,0.45) 1px, transparent 1px)',
          backgroundSize: '36px 36px',
        }}
      />

      {/* LAYER 2: Floating Clouds (Infinitely drifting + scroll fade 0->500px) */}
      <motion.div
        style={{
          opacity: floatingCloudOpacity,
          x: smoothMouseX,
          y: smoothMouseY,
        }}
        className="pointer-events-none absolute inset-0 z-[5] flex items-start justify-center pt-12"
      >
        <motion.img
          src="https://strvid.nyc3.cdn.digitaloceanspaces.com/motionsite/hero_one_cloud.png"
          alt="Atmospheric high-altitude clouds"
          animate={{
            x: ['-2%', '2%', '-2%'],
            y: ['-2%', '2%', '-2%'],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="w-[115%] max-w-none object-cover opacity-85"
        />
      </motion.div>

      {/* LAYER 3: Main Mountain (Moves down at 0.6 speed; initial entry y:150->0) */}
      <motion.div
        initial={{ y: 150, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.2, ease: [0.2, 0.65, 0.3, 0.9] }}
        style={{ y: mountainY }}
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[10] flex justify-center"
      >
        <img
          src="https://strvid.nyc3.cdn.digitaloceanspaces.com/motionsite/hero_mountain.png"
          alt="Majestic mountain peak symbolizing resilient enterprise perimeter defense"
          fetchPriority="high"
          className="w-full min-w-[1100px] max-w-none object-cover object-bottom"
        />
      </motion.div>

      {/* LAYER 4: Staggered Kinetic H1 Typography */}
      <motion.div
        style={{ y: heroTextY }}
        className="relative z-[15] flex flex-col items-center justify-center text-center pt-28 md:pt-36 px-4 pointer-events-none"
      >
        {/* Top Enterprise Category Pill */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="pointer-events-auto inline-flex items-center gap-2 rounded-full liquid-glass px-4 py-1.5 mb-5 text-xs md:text-sm font-bold tracking-wide text-white shadow-lg"
        >
          <span className="h-2 w-2 rounded-full bg-emerald-300 animate-ping" />
          <span>AUTONOMOUS B2B CYBERSECURITY SaaS &amp; DIGITAL ARCHITECTURE</span>
        </motion.div>

        {/* Single Semantic H1 with Staggered Letter Cycling */}
        <h1
          aria-live="polite"
          className="font-black tracking-tighter text-white drop-shadow-[0_12px_36px_rgba(11,78,168,0.55)] leading-none flex items-center justify-center overflow-hidden py-2"
          style={{ fontSize: 'clamp(4rem, 10vw, 10rem)' }}
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={currentWord}
              variants={wordContainerVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="inline-flex"
            >
              {currentWord.split('').map((char, idx) => (
                <motion.span
                  key={`${currentWord}-${idx}`}
                  variants={letterVariants}
                  className="inline-block"
                >
                  {char}
                </motion.span>
              ))}
            </motion.span>
          </AnimatePresence>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="max-w-2xl text-white/95 text-base md:text-xl font-medium leading-relaxed mt-3 drop-shadow-md px-2"
        >
          Uniting zero-trust cloud security, sub-second threat telemetry, and
          high-converting digital product design for Fortune 500 enterprises.
        </motion.p>
      </motion.div>

      {/* LAYER 5: Near Rocks (Moves down at 1.2 speed) */}
      <motion.div
        style={{ y: nearRocksY }}
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[20] flex justify-center"
      >
        <img
          src="https://strvid.nyc3.cdn.digitaloceanspaces.com/motionsite/hero_near_rocks.png"
          alt="Foreground rocky cliffside layer"
          className="w-full min-w-[1050px] max-w-none object-cover object-bottom"
        />
      </motion.div>

      {/* LAYER 6: Foreground White Clouds (Moves up at -0.15 speed) */}
      <motion.div
        style={{ y: foregroundCloudsY }}
        className="pointer-events-none absolute inset-x-0 -bottom-10 z-[25] flex justify-center"
      >
        <img
          src="https://strvid.nyc3.cdn.digitaloceanspaces.com/motionsite/hero_white_clouds.png"
          alt="Foreground mist and cloud bank"
          className="w-full min-w-[1100px] max-w-none object-cover object-bottom"
        />
      </motion.div>

      {/* FOREGROUND CONVERSION POD (B2B SaaS Demo Capture + Enterprise Trust Strip) */}
      <div className="relative z-[30] w-full max-w-5xl mx-auto px-6 pb-12 pt-8 select-text">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.45, ease: [0.2, 0.65, 0.3, 0.9] }}
          className="liquid-glass-dark rounded-3xl p-5 md:p-7 text-white shadow-2xl border border-white/30"
        >
          <form
            onSubmit={handleInlineSubmit}
            className="flex flex-col lg:flex-row items-stretch lg:items-center gap-3.5"
          >
            <div className="flex-1 relative">
              <label htmlFor="hero-work-email" className="sr-only">
                Work Email Address
              </label>
              <input
                id="hero-work-email"
                type="email"
                value={workEmail}
                onChange={(e) => setWorkEmail(e.target.value)}
                placeholder="Enter your work email (e.g., ciso@enterprise.com)"
                className="w-full rounded-2xl bg-white/95 text-black placeholder-gray-500 px-5 py-4 text-sm md:text-base font-medium focus:outline-none focus:ring-2 focus:ring-[#5fb9ff] shadow-inner"
              />
            </div>

            <div className="sm:w-56">
              <label htmlFor="hero-tier-select" className="sr-only">
                Infrastructure Scope
              </label>
              <select
                id="hero-tier-select"
                value={selectedTier}
                onChange={(e) => setSelectedTier(e.target.value)}
                className="w-full rounded-2xl bg-black/60 text-white border border-white/25 px-4 py-4 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#5fb9ff] cursor-pointer"
              >
                <option value="Cloud-Native Enterprise">Cloud-Native (AWS/GCP)</option>
                <option value="Hybrid Zero-Trust">Hybrid Zero-Trust Mesh</option>
                <option value="FinTech / Regulated">FinTech / SOC2 / FedRAMP</option>
                <option value="Full Digital Transformation">Full UX &amp; SecOps Platform</option>
              </select>
            </div>

            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-black hover:bg-[#0b4ea8] text-white font-black px-7 py-4 text-sm md:text-base tracking-tight transition-all shadow-lg hover:shadow-xl cursor-pointer group"
            >
              <span>Request Live Demo</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </form>

          {/* Trust & Compliance Proof Bar */}
          <div className="mt-5 pt-4 border-t border-white/15 flex flex-wrap items-center justify-between gap-4 text-xs font-semibold text-white/90">
            <div className="flex flex-wrap items-center gap-4 md:gap-6">
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-emerald-300" />
                <span>SOC 2 Type II Audited</span>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Lock className="h-4 w-4 text-sky-300" />
                <span>ISO/IEC 27001 &amp; FedRAMP Ready</span>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Activity className="h-4 w-4 text-amber-300" />
                <span>&lt;14ms Threat Isolation SLA</span>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-300" />
                <span>Agentless 15-Min Setup</span>
              </span>
            </div>

            <button
              type="button"
              onClick={onOpenSpec}
              className="inline-flex items-center gap-1.5 text-sky-200 hover:text-white underline underline-offset-4 font-bold cursor-pointer"
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>Read Senior Designer IA &amp; Conversion Rationale</span>
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
