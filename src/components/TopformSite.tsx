import React, { useEffect, useRef, useState } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  Brain,
  Check,
  ChevronLeft,
  ChevronRight,
  Crosshair,
  Flame,
  Layers,
  Menu,
  MessageCircle,
  Play,
  Shield,
  Sparkles,
  Target,
  TrendingUp,
  X,
} from 'lucide-react';

const WHATSAPP_URL =
  "https://wa.me/447575203332?text=Hi%20Mark%2C%20I've%20been%20looking%20at%20TOPFORM%20and%20I'm%20interested%20in%20working%20with%20you.";

const BIM_VIMEO_URL = 'https://vimeo.com/1230904160';
const BIM_VIMEO_EMBED_URL =
  'https://player.vimeo.com/video/1230904160?h=26a94e858b&app_id=122963&dnt=1&title=0&byline=0&portrait=0&color=22c5fe';
const BIM_VIMEO_MODAL_URL =
  'https://player.vimeo.com/video/1230904160?h=26a94e858b&app_id=122963&dnt=1&autoplay=1&title=0&byline=0&portrait=0&color=22c5fe';

type BrainKey = 'red' | 'green' | 'blue';
type PositionKey = 'striker' | 'midfielder' | 'defender';

const BRAIN_ORDER: BrainKey[] = ['red', 'green', 'blue'];
const POSITION_ORDER: PositionKey[] = ['striker', 'midfielder', 'defender'];

interface BrainStage {
  key: BrainKey;
  step: string;
  shortLabel: string;
  title: string;
  subtitle: string;
  accentHex: string;
  badgeText: string;
  paragraphs: string[];
  takeaway: string;
}

const BRAIN_STAGES: Record<BrainKey, BrainStage> = {
  red: {
    key: 'red',
    step: '1 / 3',
    shortLabel: 'Red Brain',
    title: 'Red Brain',
    subtitle: 'Raw emotional & physiological fuel',
    accentHex: '#f43f5e',
    badgeText: 'RAW INGREDIENTS',
    paragraphs: [
      "Your Red Brain isn't something we're trying to get rid of.",
      "But we don't want it in control.",
      'Left in control, anger can become frustration. Nerves can become anxiety. Thinking can become overthinking. Pressure can make you rush, hesitate, force things or play safe.',
      "But those same raw ingredients can be incredibly useful when they're controlled in the right way.",
    ],
    takeaway: 'Keep the fire. Remove the interference.',
  },
  green: {
    key: 'green',
    step: '2 / 3',
    shortLabel: 'Green Brain',
    title: 'Green Brain',
    subtitle: 'Present-moment attention & control',
    accentHex: '#10b981',
    badgeText: 'PRESENT CONTROL',
    paragraphs: [
      'This is where your Green Brain comes in.',
      'Your Green Brain keeps you present and puts your attention onto the things you can control.',
      'And rather than allowing Red Brain to take over, Green Brain takes control of what Red Brain gives you.',
      'Anger can become aggression and intensity.',
      'Nerves and anxiety can become sharpness, awareness and energy.',
      "You're not trying to become emotionless or completely calm.",
      "You're using what you've got.",
    ],
    takeaway: 'Channel raw emotion into sharpness, awareness and intensity.',
  },
  blue: {
    key: 'blue',
    step: '3 / 3',
    shortLabel: 'Blue State',
    title: 'Blue Performance State',
    subtitle: 'Instinctive, automatic & effortless football',
    accentHex: '#22c5fe',
    badgeText: 'YOUR BEST FOOTBALL',
    paragraphs: [
      'When Green Brain is in control and those raw ingredients from Red Brain are working for you rather than against you, you create your Blue Performance State.',
      "Your mind is clear. You're present.",
      "You're seeing, reacting and deciding rather than consciously trying to control your football.",
      'Your football takes over.',
    ],
    takeaway: 'Play consistently at your best. Make your best even better.',
  },
};

interface PositionFocusItem {
  title: string;
  desc: string;
}

interface PositionScenario {
  key: PositionKey;
  shortTab: string;
  roleCode: string;
  label: string;
  headline: string;
  body: string;
  focusItems: PositionFocusItem[];
}

const POSITION_SCENARIOS: Record<PositionKey, PositionScenario> = {
  striker: {
    key: 'striker',
    shortTab: 'Striker',
    roleCode: 'ST / CF',
    label: 'If you’re a striker',
    headline: 'Finishing, separation & next-action response',
    body: "If you're a striker, we might rehearse the movement you're working on with your striker coach. Attacking a particular type of cross. Creating separation from a centre-back. A 1v1 with the goalkeeper. Or what you do immediately after missing a chance.",
    focusItems: [
      {
        title: 'Finishing & 1v1 Composure',
        desc: 'Clinical execution against the goalkeeper and staying controlled on big chances.',
      },
      {
        title: 'Box Movement & Separation',
        desc: 'Creating sharp separation from a centre-back and timing runs across the post.',
      },
      {
        title: 'Attacking Cross Profiles',
        desc: 'Rehearsing the exact movement patterns you are working on with your striker coach.',
      },
      {
        title: 'Immediate Next-Action Response',
        desc: 'What you do immediately after missing a chance so your head stays in the game.',
      },
    ],
  },
  midfielder: {
    key: 'midfielder',
    shortTab: 'Midfielder',
    roleCode: 'CM / CAM / DM',
    label: 'If you’re a midfielder',
    headline: 'Scanning, press recognition & receiving on the half-turn',
    body: "If you're a midfielder, it might be scanning before you receive, recognising where the pressure is coming from, receiving on the half-turn or seeing the next pass earlier.",
    focusItems: [
      {
        title: 'Scanning Before Receiving',
        desc: 'Building the picture early so you already know your next action before the ball arrives.',
      },
      {
        title: 'Receiving on the Half-Turn',
        desc: 'Opening your body shape to play forward with tempo and break midfield lines.',
      },
      {
        title: 'Press Recognition Under Pressure',
        desc: 'Recognising where the pressure is coming from and staying calm in tight spaces.',
      },
      {
        title: 'Seeing the Next Pass Earlier',
        desc: 'Instinctive decision-making and weight of pass in transition moments.',
      },
    ],
  },
  defender: {
    key: 'defender',
    shortTab: 'Defender',
    roleCode: 'CB / FB',
    label: 'If you’re a defender',
    headline: 'Breaking lines, 1v1 defending, leadership & composure',
    body: "If you're a defender, it might be decision-making, breaking lines, stepping in with the ball, playing more effective diagonal passes, 1v1 defending, leadership or composure.",
    focusItems: [
      {
        title: 'Stepping In & Breaking Lines',
        desc: 'Composure on the ball to step in with authority and play effective diagonal passes.',
      },
      {
        title: '1v1 Defending & Body Shape',
        desc: 'Sharpness, patience and instinct when defending isolated 1v1 situations.',
      },
      {
        title: 'Decision-Making Under High Press',
        desc: 'Clear, decisive choices when building out from the back under pressure.',
      },
      {
        title: 'Back-Line Leadership & Authority',
        desc: 'Commanding presence, communication and composure across the full 90 minutes.',
      },
    ],
  },
};

interface CaseStudy {
  number: string;
  stepLabel: string;
  headlineTop: string;
  headlineBottom: string;
  started: string[];
  wentIntro: string;
  wentBullets?: string[];
  summary: string;
}

const CASE_STUDIES: CaseStudy[] = [
  {
    number: '01',
    stepLabel: '1 / 4',
    headlineTop: 'Released by three Premier League academies.',
    headlineBottom: "Now playing at one of Europe's elite clubs.",
    started: [
      'He had been released by three Premier League academies and was rebuilding his career in the Championship.',
    ],
    wentIntro:
      "He established himself as one of the outstanding young players in the Championship before moving on to one of Europe's elite clubs.",
    summary:
      'From three academy releases to the highest levels of European football.',
  },
  {
    number: '02',
    stepLabel: '2 / 4',
    headlineTop: 'Zero game time in January.',
    headlineBottom: 'Player of the Year by May.',
    started: [
      "Halfway through the season, he was at a Championship club and hadn't played a single minute.",
      'His confidence was at rock bottom.',
      'We started working together in January.',
    ],
    wentIntro: 'By the end of that same season, he had won both:',
    wentBullets: ['Young Player of the Year.', 'Player of the Year.'],
    summary:
      'From zero game time to two end-of-season awards in a matter of months.',
  },
  {
    number: '03',
    stepLabel: '3 / 4',
    headlineTop: 'Considering quitting football.',
    headlineBottom: 'Two seasons later: Premier League & full international.',
    started: [
      "His career wasn't going where he'd hoped.",
      'He was facing the prospect of dropping into League Two and was seriously considering walking away from football altogether.',
    ],
    wentIntro: 'Two seasons later, he had become:',
    wentBullets: ['A Premier League player.', 'A full international.'],
    summary:
      'From considering whether he had a future in the game to playing at the highest level of English football and representing his country.',
  },
  {
    number: '04',
    stepLabel: '4 / 4',
    headlineTop: 'Six months without a game.',
    headlineBottom: 'Then a multi-million-pound Premier League move.',
    started: [
      "He had joined a League One club but couldn't get into the team.",
      "For the first six months, he didn't play a single game.",
    ],
    wentIntro:
      'By the end of the following season, his performances had earned him a move to the Premier League for a multi-million-pound fee.',
    summary:
      'From struggling to get on the pitch in League One to becoming a Premier League player.',
  },
];

const NAV_LINKS = [
  { href: '#core-idea', label: 'The core idea' },
  { href: '#performance', label: 'Blue Performance State' },
  { href: '#off-pitch-training', label: 'Off-Pitch Training' },
  { href: '#bim-proof', label: 'Player proof' },
  { href: '#career-journeys', label: 'Career journeys' },
  { href: '#why-topform', label: 'Why TOPFORM' },
];

/**
 * Step Progress Header Indicator (inspired by the Fearless Footballer top progress bar).
 */
const StepProgressHeader: React.FC<{
  stepIndex: number;
  totalSteps: number;
  label?: string;
}> = ({ stepIndex, totalSteps, label }) => {
  const pct = Math.min(100, Math.max(10, (stepIndex / totalSteps) * 100));
  return (
    <div className="flex items-center justify-between gap-4">
      {label && <span className="tf-overline">{label}</span>}
      <div className="flex items-center gap-3 flex-1 max-w-[220px] ml-auto">
        <div className="relative h-1 flex-1 bg-white/10 rounded-full overflow-hidden">
          <div
            className="absolute inset-y-0 left-0 bg-[#22c5fe] rounded-full transition-all duration-300"
            style={{ width: `${pct}%` }}
          />
        </div>
        <span className="text-[12px] font-semibold text-slate-400 tabular-nums shrink-0">
          {stepIndex} / {totalSteps}
        </span>
      </div>
    </div>
  );
};

/**
 * Primary WhatsApp CTA Button styled like the vibrant cyan "Continue ->" button in the reference.
 */
const WorkWithMarkButton: React.FC<{
  variant?: 'blue' | 'dark';
  size?: 'sm' | 'md';
  fullWidthOnMobile?: boolean;
  showSubcaption?: boolean;
  className?: string;
}> = ({
  variant = 'blue',
  size = 'md',
  fullWidthOnMobile = false,
  showSubcaption = false,
  className = '',
}) => {
  const styleMap = {
    blue: 'tf-btn-primary text-[#04080e]',
    dark: 'tf-btn-dark text-[#ffffff]',
  };

  const sizeClasses =
    size === 'sm'
      ? 'gap-2 px-4 py-2 sm:px-5 sm:py-2.5 text-[13px] sm:text-[14px] min-h-[40px]'
      : 'gap-3 px-7 py-4 text-[15px] sm:text-[16px] min-h-[52px]';

  return (
    <div
      className={`inline-flex flex-col items-start gap-2 ${
        fullWidthOnMobile ? 'w-full sm:w-auto' : ''
      } ${className}`}
    >
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={`tf-control inline-flex items-center justify-center font-bold tracking-[-0.01em] whitespace-nowrap transition-all duration-200 ease-out focus-visible:ring-2 focus-visible:ring-[#22c5fe]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#060a10] ${
          fullWidthOnMobile ? 'w-full sm:w-auto' : ''
        } ${sizeClasses} ${styleMap[variant]}`}
      >
        <span>Work with Mark</span>
        <ArrowRight className="w-4 h-4 shrink-0 stroke-[2.5]" />
      </a>
      {showSubcaption && (
        <span className="text-[13px] font-normal text-slate-400 leading-relaxed">
          Opens a private WhatsApp conversation with Mark.
        </span>
      )}
    </div>
  );
};

export const TopformSite: React.FC = () => {
  const [activeCoreSide, setActiveCoreSide] = useState<1 | 2>(1);
  const [activeBrain, setActiveBrain] = useState<BrainKey>('blue');
  const [activePosition, setActivePosition] = useState<PositionKey>('striker');
  const [selectedFocusIndices, setSelectedFocusIndices] = useState<number[]>([
    0, 1, 3,
  ]);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState<number>(0);
  const [activeCaseIndex, setActiveCaseIndex] = useState<number>(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [activeModalVideo, setActiveModalVideo] = useState<{
    title: string;
    subtitle: string;
    src?: string;
    vimeoEmbedUrl?: string;
    isVertical?: boolean;
  } | null>(null);

  const caseCarouselRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const previousTitle = document.title;
    document.title = 'Mark Bowden | TOPFORM — Play consistently at your best';
    return () => {
      document.title = previousTitle;
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveModalVideo(null);
        setIsMobileMenuOpen(false);
      }
    };
    if (activeModalVideo || isMobileMenuOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeModalVideo, isMobileMenuOpen]);

  const toggleFocusItem = (idx: number) => {
    setSelectedFocusIndices((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  const scrollToCaseSlide = (index: number) => {
    const clamped = Math.max(0, Math.min(CASE_STUDIES.length - 1, index));
    setActiveCaseIndex(clamped);
    const container = caseCarouselRef.current;
    if (!container) return;
    const child = container.children[clamped] as HTMLElement | undefined;
    if (child) {
      container.scrollTo({
        left: child.offsetLeft,
        behavior: 'smooth',
      });
    }
  };

  const handleCaseCarouselScroll = () => {
    const container = caseCarouselRef.current;
    if (!container || container.clientWidth === 0) return;
    const newIndex = Math.round(container.scrollLeft / container.clientWidth);
    if (
      newIndex !== activeCaseIndex &&
      newIndex >= 0 &&
      newIndex < CASE_STUDIES.length
    ) {
      setActiveCaseIndex(newIndex);
    }
  };

  const currentBrain = BRAIN_STAGES[activeBrain];
  const currentPosition = POSITION_SCENARIOS[activePosition];

  const ONGOING_QUESTIONS = [
    {
      question: "What's going well?",
      icon: Target,
    },
    {
      question: 'What could be better?',
      icon: TrendingUp,
    },
    {
      question: 'What are you working on with your coaches?',
      icon: Layers,
    },
    {
      question: 'What keeps appearing in training or matches?',
      icon: Brain,
    },
    {
      question: 'What do you want to improve?',
      icon: Sparkles,
    },
  ];

  return (
    <div className="min-h-dvh bg-[#060a10] text-[#ffffff] pb-24 md:pb-0 selection:bg-[#22c5fe] selection:text-[#04080e]">
      {/* =====================================================================
          TOP NAVIGATION BAR — Deep Obsidian Glass Bar
         ===================================================================== */}
      <header className="sticky top-0 z-40 tf-glass-bar border-b border-white/[0.08] pt-[env(safe-area-inset-top,0px)]">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-8 h-16 sm:h-20 flex items-center justify-between gap-4">
          <a
            href="#top"
            aria-label="Mark Bowden TOPFORM Home"
            className="tf-control flex items-center gap-3 shrink-0 focus-visible:ring-2 focus-visible:ring-[#22c5fe]/60"
          >
            <img
              src="/assets/topform-logo-2-white.png"
              alt="TOPFORM — Play at your best. Make your best better."
              className="h-8 sm:h-11 w-auto object-contain"
            />
          </a>

          {/* Desktop Navigation */}
          <nav
            aria-label="Primary navigation"
            className="hidden lg:flex items-center gap-8 text-[14px] font-medium text-slate-300"
          >
            {NAV_LINKS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="tf-control hover:text-[#22c5fe] transition-colors duration-200"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Right Controls: Desktop CTA + Phone Menu Trigger */}
          <div className="flex items-center gap-2.5">
            <div className="hidden sm:block">
              <WorkWithMarkButton variant="blue" size="sm" />
            </div>

            <button
              type="button"
              aria-label="Open navigation menu"
              aria-expanded={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(true)}
              className="tf-control tf-btn-ghost-dark lg:hidden inline-flex items-center justify-center gap-2 px-3.5 min-h-[44px] text-[#ffffff] text-[13px] font-semibold"
            >
              <Menu className="w-4 h-4 text-[#22c5fe]" />
              <span>Menu</span>
            </button>
          </div>
        </div>

        {/* Mobile Quick-Jump Strip (<1024px) */}
        <nav
          aria-label="Mobile section quick jump"
          className="lg:hidden border-t border-white/[0.06] px-4 py-2 flex items-center gap-6 overflow-x-auto touch-pan-y text-[12px] font-medium text-slate-400 whitespace-nowrap"
        >
          {NAV_LINKS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="tf-control py-1 hover:text-[#22c5fe] transition-colors duration-200"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </header>

      <main id="top">
        {/* ===================================================================
            01 | HERO — Floodlight Obsidian Spread + Blue Rim-Lit Players
           =================================================================== */}
        <section className="relative min-h-[calc(100svh-6.25rem)] lg:min-h-0 bg-[#060a10] tf-floodlight-hero text-[#ffffff] overflow-hidden border-b border-white/[0.08] flex items-center py-16 sm:py-24 lg:py-28">
          <div className="max-w-[1240px] w-full mx-auto px-4 sm:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Left Column: Official Hero Copy with Vibrant Cyan Accent */}
              <div className="lg:col-span-6 space-y-5 sm:space-y-6 z-10">
                <p className="tf-overline">
                  SEE &nbsp;|&nbsp; REHEARSE &nbsp;|&nbsp; BECOME
                </p>

                <h1 className="tf-heading-main uppercase text-[clamp(2.1rem,5.4vw,3.75rem)] text-[#ffffff]">
                  Play consistently at your best.
                  <span className="text-[#22c5fe] block mt-1.5">
                    Make your best even better.
                  </span>
                </h1>

                <p className="tf-copy-light text-[16px] sm:text-[18px] text-slate-300 leading-relaxed max-w-[50ch]">
                  Private 1-to-1 performance coaching and bespoke Off-Pitch
                  Training for professional footballers.
                </p>

                <div className="pt-2">
                  <WorkWithMarkButton
                    variant="blue"
                    fullWidthOnMobile
                    showSubcaption
                  />
                </div>
              </div>

              {/* Right Column: Floodlight Blue-Beam Players Card */}
              <div className="lg:col-span-6 relative">
                <div className="tf-card-selected overflow-hidden tf-photo-zoom">
                  <div className="relative">
                    <img
                      src="/assets/topform-players-ai-stylized.jpg"
                      alt="Professional footballers working with Mark Bowden: Gabe Osho, Fabio Carvalho, Bim Pepple and Reiss Nelson"
                      className="tf-photo-target w-full h-auto block"
                      fetchPriority="high"
                    />
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#09121e] to-transparent" />
                  </div>
                  <div className="bg-[#09121e] border-t border-white/[0.08] px-5 py-4 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="tf-check-active">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </span>
                      <span className="text-[13px] sm:text-[14px] font-medium text-slate-200">
                        Trusted privately by Premier League, EFL &amp; European
                        professionals
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================================
            02 | THE CORE IDEA — Interactive Dual-Pillar Selection Cards
           =================================================================== */}
        <section
          id="core-idea"
          className="relative bg-[#080d15] tf-floodlight-section text-[#ffffff] py-20 sm:py-24 lg:py-28 border-b border-white/[0.08]"
        >
          <div className="max-w-[1240px] mx-auto px-4 sm:px-8 space-y-10 sm:space-y-12">
            <div className="space-y-3 max-w-[780px]">
              <p className="tf-overline">THE CORE IDEA</p>
              <h2 className="tf-heading-main uppercase text-[clamp(1.8rem,4.3vw,3rem)] text-[#ffffff]">
                There are two sides to becoming the{' '}
                <span className="text-[#22c5fe]">
                  best footballer you can be.
                </span>
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Side 01 */}
              <div
                onClick={() => setActiveCoreSide(1)}
                className={`lg:col-span-5 cursor-pointer p-6 sm:p-8 transition-all duration-200 flex flex-col justify-between ${
                  activeCoreSide === 1 ? 'tf-card-selected' : 'tf-card'
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <p className="tf-overline">SIDE 01 · CONSISTENCY</p>
                      <h3 className="tf-subheading text-[21px] sm:text-[24px] text-[#ffffff]">
                        Bring out the football you already have.
                      </h3>
                    </div>
                    <span
                      className={
                        activeCoreSide === 1
                          ? 'tf-check-active'
                          : 'tf-check-idle'
                      }
                    >
                      {activeCoreSide === 1 && (
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      )}
                    </span>
                  </div>

                  <div className="tf-keyline-blue" />

                  <p className="tf-copy-light text-[15px] sm:text-[16px] text-slate-300 leading-relaxed">
                    You&apos;ve spent years developing your game. But having
                    ability and consistently showing that ability when it
                    matters aren&apos;t always the same thing.
                  </p>
                  <p className="tf-copy-light text-[15px] sm:text-[16px] font-semibold text-[#ffffff] leading-relaxed">
                    TOPFORM helps you understand what allows your best football
                    to come out — and conditions you to get there more
                    consistently.
                  </p>
                </div>
              </div>

              {/* Side 02 */}
              <div
                onClick={() => setActiveCoreSide(2)}
                className={`lg:col-span-7 cursor-pointer p-6 sm:p-8 transition-all duration-200 flex flex-col justify-between ${
                  activeCoreSide === 2 ? 'tf-card-selected' : 'tf-card'
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <p className="tf-overline">
                        SIDE 02 · DELIBERATE REHEARSAL
                      </p>
                      <h3 className="tf-subheading text-[21px] sm:text-[24px] text-[#ffffff]">
                        Keep developing the football you have.
                      </h3>
                    </div>
                    <span
                      className={
                        activeCoreSide === 2
                          ? 'tf-check-active'
                          : 'tf-check-idle'
                      }
                    >
                      {activeCoreSide === 2 && (
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      )}
                    </span>
                  </div>

                  <div className="tf-keyline-blue" />

                  <p className="tf-copy-light text-[15px] sm:text-[16px] text-slate-300 leading-relaxed">
                    There&apos;s always something you can get better at.
                  </p>
                  <p className="tf-copy-light text-[15px] sm:text-[16px] text-[#ffffff] font-semibold leading-relaxed">
                    Your movement. Finishing. Positioning. Decision-making.
                    Composure. Confidence. How you respond to mistakes. Whatever
                    matters most to your game.
                  </p>
                  <p className="tf-copy-light text-[15px] sm:text-[16px] text-slate-300 leading-relaxed">
                    Through bespoke Off-Pitch Training, we identify what you
                    want to improve and deliberately rehearse it.
                  </p>
                </div>
              </div>
            </div>

            <div className="tf-card-selected p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#22c5fe]/15 border border-[#22c5fe]/40 flex items-center justify-center text-[#22c5fe] shrink-0">
                  <Flame className="w-6 h-6" />
                </div>
                <p className="tf-heading-main text-[19px] sm:text-[24px] text-[#ffffff]">
                  Play at your best.{' '}
                  <span className="text-[#22c5fe]">Make your best better.</span>{' '}
                  Keep doing both.
                </p>
              </div>
              <WorkWithMarkButton variant="blue" fullWidthOnMobile />
            </div>
          </div>
        </section>

        {/* ===================================================================
            03 | YOUR BEST FOOTBALL — Blue-Lit Portrait & Flow State
           =================================================================== */}
        <section className="relative bg-[#060a10] tf-floodlight-section text-[#ffffff] py-20 sm:py-24 lg:py-28 border-b border-white/[0.08] overflow-hidden">
          <div className="max-w-[1240px] mx-auto px-4 sm:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              <div className="lg:col-span-7 space-y-6">
                <p className="tf-overline">YOUR BEST FOOTBALL</p>
                <h2 className="tf-heading-main uppercase text-[clamp(1.85rem,4.4vw,3.1rem)] text-[#ffffff]">
                  You know what it feels like when you&apos;re{' '}
                  <span className="text-[#22c5fe]">at your best.</span>
                </h2>
                <div className="tf-keyline-blue" />

                <div className="space-y-4 pt-1 max-w-2xl">
                  <p className="tf-subheading text-[19px] sm:text-[21px] text-[#ffffff]">
                    You&apos;re in the game.
                  </p>
                  <p className="tf-copy-light text-[15px] sm:text-[17px] text-slate-300 leading-relaxed">
                    Your mind is clear. You&apos;re present. You&apos;re not
                    overthinking anything.
                  </p>
                  <p className="tf-copy-light text-[15px] sm:text-[17px] text-slate-300 leading-relaxed">
                    You see things quickly. Decisions come naturally. You trust
                    yourself. Your game feels instinctive, automatic and
                    effortless.
                  </p>
                  <p className="tf-copy-light text-[15px] sm:text-[17px] text-slate-300 leading-relaxed">
                    Some players call it being in the zone. Others call it flow.
                  </p>
                  <p className="tf-heading-main text-[22px] sm:text-[28px] text-[#22c5fe] py-1">
                    I call it your Blue Performance State.
                  </p>
                  <p className="tf-copy-light text-[15px] sm:text-[17px] text-slate-300 leading-relaxed">
                    One of the first things we&apos;ll work on in TOPFORM is
                    understanding what takes you away from that state — and
                    conditioning you to get there more consistently.
                  </p>
                  <p className="tf-copy-light text-[15px] sm:text-[17px] text-slate-300 leading-relaxed">
                    Because having the ability is one thing. Being able to
                    consistently bring it onto the pitch is another.
                  </p>
                </div>

                <div className="mt-6 pt-6 sm:mt-8 sm:pt-8 border-t border-white/[0.08] space-y-4 max-w-2xl">
                  <h3 className="tf-subheading text-[19px] sm:text-[23px] text-[#ffffff]">
                    But playing at your best is only half of it.
                  </h3>
                  <p className="tf-subheading text-[18px] sm:text-[21px] text-[#22c5fe]">
                    Because what if we can make your best even better?
                  </p>
                  <p className="tf-copy-light text-[15px] sm:text-[17px] text-slate-300 leading-relaxed">
                    No matter how well you&apos;re playing, there&apos;s always
                    something you can get better at.
                  </p>
                  <p className="tf-copy-light text-[15px] sm:text-[17px] text-[#ffffff] font-semibold leading-relaxed">
                    Your movement. Finishing. First touch. Positioning.
                    Scanning. Decision-making. Composure. Confidence. How you
                    respond to mistakes. Whatever matters most to your game.
                  </p>
                  <p className="tf-copy-light text-[15px] sm:text-[17px] text-slate-300 leading-relaxed">
                    Through bespoke Off-Pitch Training, we take what you want to
                    improve and deliberately rehearse it.
                  </p>
                  <p className="tf-heading-main text-[19px] sm:text-[22px] text-[#ffffff] pt-1">
                    Play at your best.{' '}
                    <span className="text-[#22c5fe]">
                      Make your best better.
                    </span>{' '}
                    Keep doing both.
                  </p>
                </div>
              </div>

              {/* Right Column: Blue-Lit Player Card (Matches Screen 1 & Screen 5 of Reference) */}
              <div className="lg:col-span-5 lg:sticky lg:top-28">
                <div className="relative max-w-[460px] mx-auto lg:max-w-none tf-card-selected overflow-hidden tf-photo-zoom">
                  <div className="relative">
                    <img
                      src="/assets/topform-blue-state.jpg"
                      alt="Focused professional footballer in Blue Performance State"
                      className="tf-photo-target w-full h-auto block"
                      loading="lazy"
                    />
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#091524] via-[#091524]/60 to-transparent" />
                  </div>

                  <div className="p-6 sm:p-7 bg-[#091524] border-t border-white/[0.08] space-y-2.5">
                    <div className="flex items-center justify-between gap-3">
                      <span className="tf-overline">
                        BLUE PERFORMANCE STATE
                      </span>
                      <span className="tf-check-active">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </span>
                    </div>
                    <p className="tf-subheading text-[18px] sm:text-[20px] text-[#ffffff]">
                      Instinctive, automatic &amp; effortless
                    </p>
                    <p className="text-[14px] text-slate-300 leading-relaxed">
                      Clear mind. Present attention. Decisions come naturally
                      and your best football takes over when it matters.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================================
            04 | PERFORMANCE — Interactive Brain State Selector Cards
           =================================================================== */}
        <section
          id="performance"
          className="bg-[#080d15] tf-floodlight-section text-[#ffffff] py-20 sm:py-24 lg:py-28 border-b border-white/[0.08]"
        >
          <div className="max-w-[1240px] mx-auto px-4 sm:px-8 space-y-10 sm:space-y-12">
            <StepProgressHeader
              stepIndex={BRAIN_ORDER.indexOf(activeBrain) + 1}
              totalSteps={3}
              label="MINDSET & STATE CONTROL"
            />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 items-start">
              <div className="lg:col-span-5 space-y-3">
                <h2 className="tf-heading-main uppercase text-[clamp(1.85rem,4.4vw,2.9rem)] text-[#ffffff]">
                  What stops your{' '}
                  <span className="text-[#22c5fe]">
                    best football coming out?
                  </span>
                </h2>
                <div className="tf-keyline-blue" />
              </div>

              <div className="lg:col-span-7 space-y-4 max-w-2xl">
                <p className="tf-subheading text-[18px] sm:text-[20px] text-[#ffffff]">
                  Sometimes it&apos;s pressure.
                </p>
                <p className="tf-copy-light text-[15px] sm:text-[17px] text-slate-300 leading-relaxed">
                  Sometimes it&apos;s a mistake, a missed chance, a bad decision
                  or something the referee has done.
                </p>
                <p className="tf-copy-light text-[15px] sm:text-[17px] text-slate-300 leading-relaxed">
                  Sometimes your mind has gone to what happens if you lose the
                  ball, whether you&apos;re going to start next week, or
                  you&apos;re trying too hard to make something happen.
                </p>
                <p className="tf-copy-light text-[15px] sm:text-[17px] font-semibold text-[#ffffff] leading-relaxed">
                  And sometimes you&apos;re simply trying to consciously control
                  parts of your game that you&apos;ve spent years learning to do
                  automatically.
                </p>
              </div>
            </div>

            {/* PHONE / TABLET ADAPTIVE VIEW (<1024px): Segmented Tab Switcher + Focused Card */}
            <div className="lg:hidden space-y-4">
              <div
                role="tablist"
                aria-label="Brain performance states"
                className="grid grid-cols-3 gap-2 p-1.5 bg-[#0b121c] border border-white/[0.08] rounded-2xl"
              >
                {BRAIN_ORDER.map((key) => {
                  const stage = BRAIN_STAGES[key];
                  const isSelected = activeBrain === key;
                  return (
                    <button
                      key={key}
                      role="tab"
                      type="button"
                      aria-selected={isSelected}
                      onClick={() => setActiveBrain(key)}
                      className={`tf-control px-2.5 py-3 rounded-xl text-center text-[13px] font-bold transition-all duration-200 ${
                        isSelected
                          ? 'tf-btn-dark text-[#ffffff]'
                          : 'bg-transparent text-slate-400 hover:text-white'
                      }`}
                    >
                      {stage.shortLabel}
                    </button>
                  );
                })}
              </div>

              {/* Active Brain Card on Phone */}
              <div className="tf-card-selected p-6 sm:p-8 space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <span
                      className="text-[11px] font-bold uppercase tracking-[0.14em] block"
                      style={{ color: currentBrain.accentHex }}
                    >
                      {currentBrain.badgeText}
                    </span>
                    <h3 className="tf-heading-main text-[23px] sm:text-[26px] text-[#ffffff]">
                      {currentBrain.title}
                    </h3>
                    <p className="text-[13px] font-medium text-slate-400">
                      {currentBrain.subtitle}
                    </p>
                  </div>
                  <span className="tf-check-active">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </span>
                </div>

                <div
                  className="w-11 h-0.5 rounded-full"
                  style={{ backgroundColor: currentBrain.accentHex }}
                />

                <div className="space-y-3 pt-1">
                  {currentBrain.paragraphs.map((paragraph, idx) => (
                    <p
                      key={idx}
                      className="text-[15px] leading-relaxed text-slate-300"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>

                <div className="mt-6 pt-4 border-t border-white/[0.08] flex items-center justify-between gap-3">
                  <p className="text-[14px] font-bold text-[#22c5fe]">
                    {currentBrain.takeaway}
                  </p>
                  <div className="flex items-center gap-1.5 shrink-0">
                    {BRAIN_ORDER.map((k) => (
                      <button
                        key={k}
                        type="button"
                        aria-label={`Select ${BRAIN_STAGES[k].title}`}
                        onClick={() => setActiveBrain(k)}
                        className={`h-2 rounded-full transition-all duration-200 ${
                          activeBrain === k
                            ? 'w-6 bg-[#22c5fe]'
                            : 'w-2 bg-white/20'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* DESKTOP VIEW (>=1024px): Asymmetric 4-Column Hierarchy with Cyan Checkmark Selection */}
            <div className="hidden lg:grid lg:grid-cols-4 gap-6 items-stretch">
              {BRAIN_ORDER.map((key) => {
                const stage = BRAIN_STAGES[key];
                const isSelected = activeBrain === key;
                const isBlue = key === 'blue';

                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setActiveBrain(key)}
                    aria-pressed={isSelected}
                    className={`tf-control text-left p-7 xl:p-8 transition-all duration-200 flex flex-col justify-between ${
                      isBlue ? 'lg:col-span-2' : 'lg:col-span-1'
                    } ${
                      isSelected
                        ? 'tf-card-selected'
                        : 'tf-card hover:border-white/20'
                    }`}
                  >
                    <div className="space-y-4">
                      <div className="flex items-start justify-between gap-3">
                        <div className="space-y-1">
                          <span
                            className="text-[11px] font-bold uppercase tracking-[0.14em] block"
                            style={{ color: stage.accentHex }}
                          >
                            {stage.badgeText}
                          </span>
                          <h3
                            className={`tf-heading-main ${
                              isBlue
                                ? 'text-[26px] text-[#ffffff]'
                                : 'text-[22px] text-[#ffffff]'
                            }`}
                          >
                            {stage.title}
                          </h3>
                          <p className="text-[13px] font-medium text-slate-400">
                            {stage.subtitle}
                          </p>
                        </div>

                        <span
                          className={
                            isSelected ? 'tf-check-active' : 'tf-check-idle'
                          }
                        >
                          {isSelected && (
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          )}
                        </span>
                      </div>

                      <div
                        className="w-10 h-0.5 rounded-full"
                        style={{ backgroundColor: stage.accentHex }}
                      />

                      <div className="space-y-3 pt-1">
                        {stage.paragraphs.map((paragraph, idx) => (
                          <p
                            key={idx}
                            className="text-[14px] xl:text-[15px] leading-relaxed text-slate-300"
                          >
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-white/[0.08] text-[13px] font-bold text-[#22c5fe]">
                      {stage.takeaway}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* ===================================================================
            PLAYER PROOF: FABIO CARVALHO — Centered Portrait & Quote
           =================================================================== */}
        <section className="relative bg-[#060a10] tf-floodlight-section text-[#ffffff] py-20 sm:py-24 lg:py-28 border-b border-white/[0.08] overflow-hidden">
          <div className="max-w-[1240px] mx-auto px-4 sm:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              <div className="lg:col-span-5">
                <div className="relative max-w-[460px] mx-auto lg:max-w-none tf-card-selected overflow-hidden tf-photo-zoom">
                  <img
                    src="/assets/topform-fabio-editorial-bw.jpg?v=2"
                    alt="Fabio Carvalho — Professional Footballer"
                    className="tf-photo-target w-full h-auto block"
                    loading="lazy"
                  />
                </div>
              </div>

              <div className="lg:col-span-7 space-y-6">
                <p className="tf-overline">PLAYER PROOF · PREMIER LEAGUE</p>
                <blockquote className="tf-heading-main text-[clamp(1.45rem,3.3vw,2.35rem)] text-[#ffffff] leading-[1.22]">
                  &ldquo;Working with Mark has helped me understand my{' '}
                  <span className="text-[#22c5fe]">
                    Blue Performance State
                  </span>{' '}
                  and how to get into that state consistently on the pitch —
                  playing with freedom, clarity and instinct when it
                  matters.&rdquo;
                </blockquote>

                <div className="tf-keyline-blue" />

                <div className="pt-1 flex items-center gap-3">
                  <span className="tf-check-active">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </span>
                  <div>
                    <p className="tf-subheading text-[17px] sm:text-[18px] text-[#ffffff]">
                      Fabio Carvalho
                    </p>
                    <p className="text-[13px] text-slate-400">
                      Professional Footballer
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================================
            05 | BESPOKE OFF-PITCH TRAINING — Position & Focus Selector
            (Modeled directly on Screens 1 & 2 of Fearless Footballer UI)
           =================================================================== */}
        <section
          id="off-pitch-training"
          className="bg-[#080d15] tf-floodlight-section text-[#ffffff] py-20 sm:py-24 lg:py-28 border-b border-white/[0.08]"
        >
          <div className="max-w-[1240px] mx-auto px-4 sm:px-8 space-y-12 sm:space-y-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center">
              <div className="lg:col-span-6 space-y-4 sm:space-y-5 max-w-2xl">
                <p className="tf-overline">BESPOKE OFF-PITCH TRAINING</p>
                <h2 className="tf-heading-main uppercase text-[clamp(1.85rem,4.4vw,2.9rem)] text-[#ffffff]">
                  Work on your game —{' '}
                  <span className="text-[#22c5fe]">
                    even when you&apos;re not on the pitch.
                  </span>
                </h2>
                <div className="tf-keyline-blue" />

                <p className="tf-copy-light text-[15px] sm:text-[17px] font-semibold text-[#ffffff] leading-relaxed">
                  There&apos;s only so much physical training you can do.
                </p>
                <p className="tf-copy-light text-[15px] sm:text-[17px] text-slate-300 leading-relaxed">
                  Your club controls your training load. You have matches to
                  play, recovery to manage and a body that needs to be ready to
                  perform.
                </p>
                <p className="tf-copy-light text-[15px] sm:text-[17px] text-slate-300 leading-relaxed">
                  But that doesn&apos;t mean you have to stop working on your
                  game.
                </p>
                <p className="tf-copy-light text-[15px] sm:text-[17px] font-semibold text-[#22c5fe] leading-relaxed">
                  Through bespoke Off-Pitch Training, we take the situations
                  that matter to your football and deliberately rehearse them.
                </p>
              </div>

              <div className="lg:col-span-6">
                <div className="tf-card-selected overflow-hidden tf-photo-zoom">
                  <img
                    src="/assets/topform-offpitch-rehearsal.jpg?v=2"
                    alt="Bespoke Off-Pitch Training mental rehearsal"
                    className="tf-photo-target w-full h-auto block"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>

            {/* Interactive Position & Focus Builder (Matches Screen 1 & Screen 2 of Reference) */}
            <div className="tf-card p-6 sm:p-8 lg:p-10 space-y-8">
              <StepProgressHeader
                stepIndex={POSITION_ORDER.indexOf(activePosition) + 1}
                totalSteps={3}
                label="PERSONALISED OFF-PITCH TRAINING"
              />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left 5 Columns: Position Selector ("WHAT POSITION DO YOU PLAY?") */}
                <div className="lg:col-span-5 space-y-5">
                  <div className="space-y-2">
                    <h3 className="tf-heading-main uppercase text-[24px] sm:text-[30px] text-[#ffffff]">
                      Your position. Your game.{' '}
                      <span className="text-[#22c5fe]">Your situations.</span>
                    </h3>
                    <p className="text-[14px] sm:text-[15px] text-slate-400 leading-relaxed">
                      Select a position to see the situations we deliberately
                      rehearse off the pitch.
                    </p>
                  </div>

                  <div
                    role="tablist"
                    aria-label="Select football position"
                    className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-3"
                  >
                    {POSITION_ORDER.map((posKey) => {
                      const pos = POSITION_SCENARIOS[posKey];
                      const active = activePosition === posKey;
                      return (
                        <button
                          key={posKey}
                          role="tab"
                          type="button"
                          aria-selected={active}
                          onClick={() => setActivePosition(posKey)}
                          className={`tf-control p-4 sm:p-5 text-left flex items-center justify-between gap-3 ${
                            active
                              ? 'tf-card-selected'
                              : 'tf-card hover:border-white/20'
                          }`}
                        >
                          <div>
                            <p className="tf-heading-main uppercase text-[17px] sm:text-[18px] text-[#ffffff]">
                              {pos.shortTab}
                            </p>
                            <p className="text-[12px] font-semibold text-slate-400 mt-0.5">
                              {pos.roleCode}
                            </p>
                          </div>
                          <span
                            className={
                              active ? 'tf-check-active' : 'tf-check-idle'
                            }
                          >
                            {active && (
                              <Check className="w-3.5 h-3.5 stroke-[3]" />
                            )}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  <div className="p-5 rounded-2xl bg-[#060a10]/80 border border-white/[0.08] space-y-2">
                    <p className="tf-overline">{currentPosition.label}</p>
                    <p className="text-[14px] sm:text-[15px] text-slate-300 leading-relaxed">
                      {currentPosition.body}
                    </p>
                  </div>
                </div>

                {/* Right 7 Columns: Selectable Training Focus Cards ("WHAT DO YOU WANT TO WORK ON?") */}
                <div className="lg:col-span-7 space-y-4">
                  <div className="flex items-center justify-between gap-2">
                    <div>
                      <p className="tf-overline">{currentPosition.shortTab}</p>
                      <h4 className="tf-heading-main uppercase text-[20px] sm:text-[24px] text-[#ffffff] mt-1">
                        What do you want to{' '}
                        <span className="text-[#22c5fe]">work on?</span>
                      </h4>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {currentPosition.focusItems.map((item, idx) => {
                      const isChecked = selectedFocusIndices.includes(idx);
                      return (
                        <button
                          key={item.title}
                          type="button"
                          onClick={() => toggleFocusItem(idx)}
                          className={`tf-control w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 ${
                            isChecked
                              ? 'tf-card-selected'
                              : 'tf-card hover:border-white/20'
                          }`}
                        >
                          <div className="space-y-1 pr-2">
                            <p className="tf-subheading text-[16px] sm:text-[17px] text-[#ffffff]">
                              {item.title}
                            </p>
                            <p className="text-[13px] sm:text-[14px] text-slate-400 leading-relaxed">
                              {item.desc}
                            </p>
                          </div>
                          <span
                            className={
                              isChecked ? 'tf-check-active' : 'tf-check-idle'
                            }
                          >
                            {isChecked && (
                              <Check className="w-3.5 h-3.5 stroke-[3]" />
                            )}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  <div className="pt-4 border-t border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-0.5">
                      <p className="tf-subheading text-[16px] sm:text-[17px] text-[#ffffff]">
                        And next week it could be something completely
                        different.
                      </p>
                      <p className="text-[14px] sm:text-[15px] font-semibold text-[#22c5fe]">
                        Because the work changes as your football changes.
                      </p>
                    </div>
                    <WorkWithMarkButton variant="blue" size="sm" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================================
            06 | PLAYER PROOF — BIM PEPPLE (Vimeo 1230904160 9:16 Video)
           =================================================================== */}
        <section
          id="bim-proof"
          className="bg-[#060a10] tf-floodlight-section text-[#ffffff] py-20 sm:py-24 lg:py-28 border-b border-white/[0.08]"
        >
          <div className="max-w-[1240px] mx-auto px-4 sm:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              <div className="lg:col-span-7 space-y-6">
                <p className="tf-overline">PLAYER PROOF · VISUALISATION</p>
                <h2 className="tf-heading-main uppercase text-[clamp(1.9rem,4.4vw,3.3rem)] text-[#ffffff]">
                  &ldquo;It&apos;s just like{' '}
                  <span className="text-[#22c5fe]">practising.</span>&rdquo;
                </h2>

                <div className="tf-keyline-blue" />

                <blockquote className="tf-subheading text-[21px] sm:text-[26px] text-slate-200 leading-[1.3] max-w-2xl">
                  &ldquo;When you are in that position on the pitch, it feels
                  like you&apos;ve been there before.&rdquo;
                </blockquote>

                <div className="flex items-center gap-3">
                  <span className="tf-check-active">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </span>
                  <div>
                    <p className="tf-subheading text-[17px] text-[#ffffff]">
                      Bim Pepple
                    </p>
                    <p className="text-[13px] text-slate-400">
                      Professional Footballer
                    </p>
                  </div>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <button
                    type="button"
                    onClick={() =>
                      setActiveModalVideo({
                        title: 'Bim Pepple | Press Conference',
                        subtitle:
                          '“When you are in that position on the pitch, it feels like you’ve been there before.”',
                        vimeoEmbedUrl: BIM_VIMEO_MODAL_URL,
                        isVertical: true,
                      })
                    }
                    className="tf-control tf-btn-primary inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-[#04080e] text-[14px] sm:text-[15px] font-bold"
                  >
                    <Play className="w-4 h-4 fill-current" />
                    <span>Watch in theatre mode</span>
                  </button>

                  <a
                    href={BIM_VIMEO_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="tf-control tf-btn-ghost-dark inline-flex items-center justify-center gap-2 px-5 py-3.5 text-slate-200 hover:text-[#ffffff] text-[14px] font-semibold"
                  >
                    <span>Open on Vimeo</span>
                    <ArrowUpRight className="w-4 h-4 text-[#22c5fe]" />
                  </a>
                </div>
              </div>

              {/* Right 5 Columns: Prominent 9:16 Vertical Press-Conference Video */}
              <div className="lg:col-span-5 flex justify-center lg:justify-end">
                <div className="w-full max-w-[330px] sm:max-w-[370px] tf-card-selected overflow-hidden">
                  <div
                    className="relative w-full aspect-[9/16] bg-[#060a10] bg-cover bg-center"
                    style={{
                      backgroundImage:
                        "url('/assets/bim-pepple-vimeo-thumb.jpg')",
                    }}
                  >
                    <iframe
                      src={BIM_VIMEO_EMBED_URL}
                      title="Bim Pepple Press Conference"
                      className="absolute inset-0 w-full h-full border-0"
                      allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================================
            07 | THE ONGOING WORK — Interactive Goal/Focus Rows
            (Modeled on Screen 3 "WHAT'S YOUR BIGGEST GOAL RIGHT NOW?")
           =================================================================== */}
        <section className="bg-[#080d15] tf-floodlight-section text-[#ffffff] py-20 sm:py-24 lg:py-28 border-b border-white/[0.08]">
          <div className="max-w-[1240px] mx-auto px-4 sm:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              <div className="lg:col-span-7 space-y-6">
                <div className="space-y-3">
                  <p className="tf-overline">THE ONGOING WORK</p>
                  <h2 className="tf-heading-main uppercase text-[clamp(1.85rem,4.4vw,2.9rem)] text-[#ffffff]">
                    Your football decides{' '}
                    <span className="text-[#22c5fe]">what we work on.</span>
                  </h2>
                  <div className="tf-keyline-blue" />
                </div>

                <p className="tf-copy-light text-[15px] sm:text-[17px] font-semibold text-[#ffffff] leading-relaxed">
                  Every time we work together, we look at what&apos;s actually
                  happening in your football.
                </p>

                {/* Interactive Rows Styled Like Screen 3 of Fearless Footballer */}
                <div className="space-y-3 py-1">
                  {ONGOING_QUESTIONS.map((item, idx) => {
                    const IconComponent = item.icon;
                    const isSelected = activeQuestionIndex === idx;
                    return (
                      <button
                        key={item.question}
                        type="button"
                        onClick={() => setActiveQuestionIndex(idx)}
                        className={`tf-control w-full p-4 sm:px-5 sm:py-4 text-left flex items-center justify-between gap-4 ${
                          isSelected
                            ? 'tf-card-selected'
                            : 'tf-card hover:border-white/20'
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-xl bg-[#22c5fe]/10 border border-[#22c5fe]/30 flex items-center justify-center text-[#22c5fe] shrink-0">
                            <IconComponent className="w-5 h-5" />
                          </div>
                          <span className="text-[15px] sm:text-[17px] font-bold text-[#ffffff]">
                            {item.question}
                          </span>
                        </div>
                        <span
                          className={
                            isSelected ? 'tf-check-active' : 'tf-check-idle'
                          }
                        >
                          {isSelected && (
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          )}
                        </span>
                      </button>
                    );
                  })}
                </div>

                <p className="tf-copy-light text-[15px] sm:text-[17px] font-semibold text-[#ffffff] leading-relaxed">
                  Then we decide what will make the biggest difference to your
                  game — and we work on it.
                </p>
                <p className="tf-copy-light text-[15px] sm:text-[17px] text-slate-300 leading-relaxed">
                  It might be something that happened in your last match.
                  Something you&apos;re working on in training. Something your
                  coach wants from you. A situation that keeps appearing. Or
                  simply something you want to add to your game.
                </p>
              </div>

              <div className="lg:col-span-5 lg:sticky lg:top-28">
                <div className="tf-card-selected p-6 sm:p-8 space-y-5">
                  <div className="w-12 h-12 rounded-2xl bg-[#22c5fe]/15 border border-[#22c5fe]/35 flex items-center justify-center text-[#22c5fe]">
                    <Crosshair className="w-6 h-6" />
                  </div>
                  <p className="tf-overline">WE&apos;LL BUILD YOUR WEEK</p>
                  <p className="tf-subheading text-[19px] sm:text-[22px] text-[#ffffff]">
                    We can then turn that into bespoke Off-Pitch Training —
                    deliberately rehearsing the situations that matter to you.
                  </p>
                  <div className="tf-keyline-blue" />
                  <p className="tf-copy-light text-[15px] sm:text-[16px] text-[#22c5fe] font-semibold leading-relaxed">
                    And as your football changes, the work changes with it.
                  </p>
                  <p className="tf-copy-light text-[15px] sm:text-[16px] text-slate-300 leading-relaxed">
                    The better I understand you, your game, your position and
                    the situations you face, the more specific the work becomes.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================================
            08 | WORKING WITH YOUR COACHING — Floodlight Dark Card
           =================================================================== */}
        <section className="bg-[#060a10] tf-floodlight-section text-[#ffffff] py-20 sm:py-24 lg:py-28 border-b border-white/[0.08]">
          <div className="max-w-[1240px] mx-auto px-4 sm:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              <div className="lg:col-span-5 space-y-4">
                <p className="tf-overline">ON &amp; OFF THE PITCH</p>
                <h2 className="tf-heading-main uppercase text-[clamp(1.85rem,4.4vw,2.9rem)] text-[#ffffff]">
                  Your coaches are working on your game.
                  <span className="text-[#22c5fe] block mt-1">So are we.</span>
                </h2>
                <div className="tf-keyline-blue" />
              </div>

              <div className="lg:col-span-7 tf-card-selected p-6 sm:p-8 space-y-5">
                <div className="flex items-start gap-4">
                  <span className="tf-check-active mt-0.5">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </span>
                  <p className="tf-copy-light text-[15px] sm:text-[17px] text-slate-200 leading-relaxed">
                    If your striker coach is working with you on making a
                    particular movement, we can rehearse it.
                  </p>
                </div>
                <div className="flex items-start gap-4">
                  <span className="tf-check-active mt-0.5">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </span>
                  <p className="tf-copy-light text-[15px] sm:text-[17px] text-slate-200 leading-relaxed">
                    If your manager wants something different from you
                    tactically, we can work on recognising those situations.
                  </p>
                </div>
                <div className="flex items-start gap-4">
                  <span className="tf-check-active mt-0.5">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </span>
                  <p className="tf-copy-light text-[15px] sm:text-[17px] text-slate-200 leading-relaxed">
                    If you&apos;ve been doing something on the training pitch
                    that isn&apos;t quite appearing naturally in matches yet, we
                    can work on that too.
                  </p>
                </div>

                <div className="pt-4 border-t border-white/[0.08]">
                  <p className="tf-subheading text-[17px] sm:text-[19px] text-[#22c5fe]">
                    You work on it with your coaches on the pitch. We can
                    deliberately rehearse it off the pitch.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================================
            09 | PLAYER PROOF — EMILIANO MARCONDES (Blue-Tinted Full Portrait)
           =================================================================== */}
        <section className="relative bg-[#080d15] tf-floodlight-section text-[#ffffff] py-20 sm:py-24 lg:py-28 border-b border-white/[0.08] overflow-hidden">
          <div className="max-w-[1240px] mx-auto px-4 sm:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              <div className="lg:col-span-7 space-y-6">
                <p className="tf-overline">PLAYER PROOF · HABITS &amp; FOCUS</p>
                <h2 className="tf-heading-main uppercase text-[clamp(1.85rem,4.4vw,2.95rem)] text-[#ffffff]">
                  &ldquo;It has definitely{' '}
                  <span className="text-[#22c5fe]">
                    improved me as a player.
                  </span>
                  &rdquo;
                </h2>

                <div className="tf-keyline-blue" />

                <blockquote className="tf-copy-light text-[16px] sm:text-[20px] text-slate-300 leading-relaxed max-w-2xl">
                  &ldquo;Mark and I have been working together for a few years,
                  working on the psychological part of my game and building good
                  habits and focus points for each game. It has definitely
                  improved me as a player.&rdquo;
                </blockquote>

                <div className="flex items-center gap-3">
                  <span className="tf-check-active">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </span>
                  <div>
                    <p className="tf-subheading text-[17px] text-[#ffffff]">
                      Emiliano Marcondes
                    </p>
                    <p className="text-[13px] text-slate-400">
                      Professional Footballer
                    </p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="relative max-w-[460px] mx-auto lg:max-w-none tf-card-selected overflow-hidden tf-photo-zoom">
                  <img
                    src="/assets/topform-portrait-blue-tint.jpg?v=2"
                    alt="Emiliano Marcondes — Professional Footballer"
                    className="tf-photo-target w-full h-auto block"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================================
            10 | CAREER JOURNEYS — Floodlight Dark Cards & Progress Indicator
           =================================================================== */}
        <section
          id="career-journeys"
          className="bg-[#060a10] tf-floodlight-section text-[#ffffff] py-20 sm:py-24 lg:py-28 border-b border-white/[0.08]"
        >
          <div className="max-w-[1240px] mx-auto px-4 sm:px-8 space-y-10 sm:space-y-12">
            <StepProgressHeader
              stepIndex={activeCaseIndex + 1}
              totalSteps={CASE_STUDIES.length}
              label="CAREER JOURNEYS"
            />

            <div className="max-w-2xl space-y-4">
              <h2 className="tf-heading-main uppercase text-[clamp(1.85rem,4.4vw,3rem)] text-[#ffffff]">
                Where they started.{' '}
                <span className="text-[#22c5fe]">
                  Where their football took them.
                </span>
              </h2>
              <div className="tf-keyline-blue" />
              <p className="tf-copy-light text-[15px] sm:text-[17px] font-semibold text-[#ffffff] leading-relaxed pt-1">
                Every player&apos;s journey is different.
              </p>
              <p className="tf-copy-light text-[15px] sm:text-[17px] text-slate-300 leading-relaxed">
                The following players came to me at very different points in
                their careers, with very different challenges.
              </p>
              <p className="tf-copy-light text-[15px] sm:text-[17px] text-slate-300 leading-relaxed">
                This is where they were when we started working together — and
                where their careers went next.
              </p>
            </div>

            {/* PHONE ADAPTATION (<768px): Touch-Snap Horizontal Carousel */}
            <div className="md:hidden space-y-4">
              <div className="flex items-center justify-between gap-2">
                <div className="inline-flex items-center gap-1.5">
                  {CASE_STUDIES.map((study, idx) => {
                    const active = activeCaseIndex === idx;
                    return (
                      <button
                        key={study.number}
                        type="button"
                        onClick={() => scrollToCaseSlide(idx)}
                        className={`tf-control text-[12px] font-bold px-3.5 py-2 rounded-xl transition-all duration-200 ${
                          active
                            ? 'tf-btn-dark text-[#ffffff]'
                            : 'tf-btn-ghost-dark text-slate-400'
                        }`}
                      >
                        {study.number}
                      </button>
                    );
                  })}
                </div>

                <div className="inline-flex items-center gap-1.5">
                  <button
                    type="button"
                    aria-label="Previous career journey"
                    onClick={() => scrollToCaseSlide(activeCaseIndex - 1)}
                    disabled={activeCaseIndex === 0}
                    className="tf-control tf-btn-ghost-dark p-2.5 text-[#ffffff] disabled:opacity-35"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    aria-label="Next career journey"
                    onClick={() => scrollToCaseSlide(activeCaseIndex + 1)}
                    disabled={activeCaseIndex === CASE_STUDIES.length - 1}
                    className="tf-control tf-btn-ghost-dark p-2.5 text-[#ffffff] disabled:opacity-35"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div
                ref={caseCarouselRef}
                onScroll={handleCaseCarouselScroll}
                className="tf-snap-carousel gap-4"
              >
                {CASE_STUDIES.map((study) => (
                  <article
                    key={study.number}
                    className="tf-snap-slide w-full shrink-0 tf-card-selected flex flex-col justify-between overflow-hidden"
                  >
                    <div className="p-6 border-b border-white/[0.08] flex items-start justify-between gap-3">
                      <h3 className="tf-heading-main text-[19px] text-[#ffffff]">
                        {study.headlineTop}
                        <span className="block text-[20px] text-[#22c5fe] mt-1">
                          {study.headlineBottom}
                        </span>
                      </h3>
                      <span className="tf-check-active">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </span>
                    </div>

                    <div className="p-6 space-y-5 flex-1 flex flex-col justify-between">
                      <div className="space-y-5">
                        <div className="space-y-2">
                          <p className="tf-overline">
                            WHEN WE STARTED WORKING TOGETHER
                          </p>
                          <div className="space-y-2 pt-1">
                            {study.started.map((line, idx) => (
                              <p
                                key={idx}
                                className="text-[15px] text-slate-300 leading-relaxed"
                              >
                                {line}
                              </p>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-2 pt-4 border-t border-white/[0.08]">
                          <p className="tf-overline">WHERE HIS CAREER WENT</p>
                          <p className="text-[15px] text-slate-200 leading-relaxed pt-1">
                            {study.wentIntro}
                          </p>
                          {study.wentBullets && (
                            <ul className="space-y-2 pt-1">
                              {study.wentBullets.map((item) => (
                                <li
                                  key={item}
                                  className="flex items-center gap-3 text-[15px] font-bold text-[#ffffff]"
                                >
                                  <span className="tf-check-active">
                                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                                  </span>
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </div>

                      <div className="mt-5 pt-4 border-t border-white/[0.08]">
                        <p className="text-[14px] font-bold text-[#22c5fe] leading-relaxed">
                          {study.summary}
                        </p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            {/* TABLET & DESKTOP (>=768px): 2x2 Interactive Dark Slate Grid */}
            <div className="hidden md:grid md:grid-cols-2 gap-6">
              {CASE_STUDIES.map((study, idx) => {
                const isSelected = activeCaseIndex === idx;
                return (
                  <article
                    key={study.number}
                    onClick={() => setActiveCaseIndex(idx)}
                    className={`cursor-pointer flex flex-col justify-between overflow-hidden transition-all duration-200 ${
                      isSelected
                        ? 'tf-card-selected'
                        : 'tf-card hover:border-white/20'
                    }`}
                  >
                    <div className="p-6 sm:p-8 border-b border-white/[0.08] flex items-start justify-between gap-4">
                      <h3 className="tf-heading-main text-[21px] sm:text-[23px] text-[#ffffff]">
                        {study.headlineTop}
                        <span className="block text-[21px] sm:text-[23px] text-[#22c5fe] mt-1">
                          {study.headlineBottom}
                        </span>
                      </h3>
                      <span
                        className={
                          isSelected ? 'tf-check-active' : 'tf-check-idle'
                        }
                      >
                        {isSelected && (
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        )}
                      </span>
                    </div>

                    <div className="p-6 sm:p-8 space-y-6 flex-1 flex flex-col justify-between">
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <p className="tf-overline">
                            WHEN WE STARTED WORKING TOGETHER
                          </p>
                          <div className="space-y-2 pt-1">
                            {study.started.map((line, i) => (
                              <p
                                key={i}
                                className="text-[15px] text-slate-300 leading-relaxed"
                              >
                                {line}
                              </p>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-2.5 pt-4 border-t border-white/[0.08]">
                          <p className="tf-overline">WHERE HIS CAREER WENT</p>
                          <p className="text-[15px] text-slate-200 leading-relaxed pt-1">
                            {study.wentIntro}
                          </p>
                          {study.wentBullets && (
                            <ul className="space-y-2 pt-1">
                              {study.wentBullets.map((item) => (
                                <li
                                  key={item}
                                  className="flex items-center gap-3 text-[15px] font-bold text-[#ffffff]"
                                >
                                  <span className="tf-check-active">
                                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                                  </span>
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </div>

                      <div className="mt-6 pt-4 border-t border-white/[0.08]">
                        <p className="text-[14px] font-bold text-[#22c5fe] leading-relaxed">
                          {study.summary}
                        </p>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* ===================================================================
            11 | WHY TOPFORM — Founder Spread
           =================================================================== */}
        <section
          id="why-topform"
          className="relative bg-[#080d15] tf-floodlight-section text-[#ffffff] py-20 sm:py-24 lg:py-28 border-b border-white/[0.08] overflow-hidden"
        >
          <div className="max-w-[1240px] mx-auto px-4 sm:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              <div className="lg:col-span-7 space-y-6 max-w-2xl">
                <p className="tf-overline">THE EVOLUTION</p>
                <h2 className="tf-heading-main uppercase text-[clamp(1.85rem,4.4vw,3rem)] text-[#ffffff]">
                  Why I built <span className="text-[#22c5fe]">TOPFORM.</span>
                </h2>
                <div className="tf-keyline-blue" />

                <p className="tf-copy-light text-[15px] sm:text-[17px] text-slate-300 leading-relaxed">
                  I&apos;ve spent years working with professional footballers
                  and trying to understand one thing:
                </p>

                <p className="tf-heading-main text-[21px] sm:text-[26px] text-[#22c5fe]">
                  What allows a player&apos;s best football to come out
                  consistently?
                </p>

                <p className="tf-copy-light text-[15px] sm:text-[17px] text-slate-300 leading-relaxed">
                  That question led to the ideas I first explored in{' '}
                  <span className="text-[#ffffff] font-semibold">
                    Use Your Brain, Raise Your Game
                  </span>{' '}
                  — Red Brain, Green Brain and eventually the Blue Performance
                  State.
                </p>

                <p className="tf-copy-light text-[15px] sm:text-[17px] text-slate-300 leading-relaxed">
                  But the longer I&apos;ve worked with players, the more the
                  work has evolved.
                </p>

                <p className="tf-copy-light text-[15px] sm:text-[17px] text-slate-300 leading-relaxed">
                  It isn&apos;t only about helping a player bring out the
                  football they already have.
                </p>

                <p className="tf-copy-light text-[15px] sm:text-[17px] font-semibold text-[#ffffff] leading-relaxed">
                  It&apos;s also about helping them develop the football they
                  have.
                </p>

                <p className="tf-subheading text-[18px] sm:text-[20px] text-[#22c5fe]">
                  That&apos;s what TOPFORM has become.
                </p>

                <p className="tf-copy-light text-[15px] sm:text-[17px] text-[#ffffff] font-semibold leading-relaxed">
                  Helping you play consistently at your best — while continually
                  working to make your best even better.
                </p>
              </div>

              <div className="lg:col-span-5">
                <div className="tf-card-selected p-6 sm:p-8 space-y-6">
                  <div className="pb-4 border-b border-white/[0.08] flex items-center justify-between">
                    <img
                      src="/assets/topform-logo-2-white.png"
                      alt="TOPFORM — Play at your best. Make your best better."
                      className="h-9 sm:h-11 w-auto object-contain"
                      loading="lazy"
                    />
                    <span className="tf-check-active">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </span>
                  </div>

                  <div className="space-y-5">
                    <div className="p-4 rounded-xl bg-[#060a10]/80 border border-white/[0.08] space-y-1.5">
                      <p className="tf-overline">FOUNDATION</p>
                      <p className="tf-subheading text-[17px] sm:text-[18px] text-[#ffffff]">
                        Use Your Brain, Raise Your Game
                      </p>
                      <p className="text-[14px] text-slate-300 leading-relaxed">
                        Red Brain, Green Brain and conditioning your Blue
                        Performance State so your best football comes out
                        consistently.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-[#060a10]/80 border border-[#22c5fe]/40 space-y-1.5">
                      <p className="tf-overline">COMPLETE PROGRAMME</p>
                      <p className="tf-subheading text-[17px] sm:text-[18px] text-[#ffffff]">
                        Mark Bowden · TOPFORM
                      </p>
                      <p className="text-[14px] text-slate-300 leading-relaxed">
                        Bringing out the football you already have — while
                        deliberately rehearsing and developing the football you
                        have.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================================
            12 | WHO IT'S FOR — Floodlight Dark Spread
           =================================================================== */}
        <section className="bg-[#060a10] tf-floodlight-section text-[#ffffff] py-20 sm:py-24 lg:py-28 border-b border-white/[0.08]">
          <div className="max-w-[1240px] mx-auto px-4 sm:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              <div className="lg:col-span-7 space-y-6 max-w-2xl">
                <p className="tf-overline">WHO IT&apos;S FOR</p>
                <h2 className="tf-heading-main uppercase text-[clamp(1.85rem,4.4vw,2.9rem)] text-[#ffffff]">
                  You don&apos;t need to be struggling{' '}
                  <span className="text-[#22c5fe]">to get better.</span>
                </h2>
                <div className="tf-keyline-blue" />

                <p className="tf-copy-light text-[15px] sm:text-[17px] font-semibold text-[#ffffff] leading-relaxed">
                  TOPFORM is for professional footballers who are serious about
                  getting everything they can from their ability — and
                  continuing to improve it.
                </p>

                <ul className="space-y-3 py-1">
                  {[
                    "You don't need to be struggling.",
                    "You don't need to have lost confidence.",
                    "You don't need to be out of form.",
                  ].map((line) => (
                    <li
                      key={line}
                      className="tf-card p-4 flex items-center gap-3.5 text-[15px] sm:text-[17px] font-bold text-[#ffffff]"
                    >
                      <span className="tf-check-active">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </span>
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>

                <p className="tf-copy-light text-[15px] sm:text-[17px] text-slate-300 leading-relaxed">
                  You can be playing some of the best football of your career
                  and still want more.
                </p>
              </div>

              <div className="lg:col-span-5 tf-card-selected p-6 sm:p-8 space-y-4">
                <div className="w-11 h-11 rounded-xl bg-[#22c5fe]/15 border border-[#22c5fe]/35 flex items-center justify-center text-[#22c5fe]">
                  <Shield className="w-5 h-5" />
                </div>
                <p className="tf-heading-main text-[22px] sm:text-[26px] text-[#ffffff]">
                  How do I keep this coming out?
                </p>
                <p className="tf-heading-main text-[22px] sm:text-[26px] text-[#22c5fe]">
                  And how do I get even better?
                </p>
                <p className="tf-subheading text-[16px] sm:text-[17px] text-slate-300 pt-3 border-t border-white/[0.08]">
                  That&apos;s what TOPFORM is built around.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================================
            13 | WORKING TOGETHER — Private 1-to-1 Coaching Card
           =================================================================== */}
        <section className="bg-[#080d15] tf-floodlight-section text-[#ffffff] py-20 sm:py-24 lg:py-28 border-b border-white/[0.08]">
          <div className="max-w-[1240px] mx-auto px-4 sm:px-8">
            <div className="tf-card p-6 sm:p-10 lg:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              <div className="lg:col-span-7 space-y-4 sm:space-y-5 max-w-2xl">
                <p className="tf-overline">1-TO-1 COACHING</p>
                <h2 className="tf-heading-main uppercase text-[clamp(1.85rem,4.4vw,2.85rem)] text-[#ffffff]">
                  Private. Bespoke.
                  <span className="text-[#22c5fe] block mt-1">
                    Built around your football.
                  </span>
                </h2>
                <div className="tf-keyline-blue" />

                <p className="tf-copy-light text-[15px] sm:text-[17px] font-semibold text-[#ffffff] leading-relaxed">
                  I work personally with a limited number of professional
                  footballers at any one time.
                </p>
                <p className="tf-copy-light text-[15px] sm:text-[17px] text-slate-300 leading-relaxed">
                  Our work is ongoing and built around you, your football and
                  what you want to achieve.
                </p>
                <p className="tf-copy-light text-[15px] sm:text-[17px] text-slate-300 leading-relaxed">
                  We&apos;ll work together privately through regular 1-to-1
                  sessions, with prescribed training and bespoke Off-Pitch
                  Training to continue the work between our sessions.
                </p>
                <p className="tf-copy-light text-[15px] sm:text-[17px] font-semibold text-[#ffffff] leading-relaxed">
                  The better I understand your game, the more specific our work
                  can become.
                </p>
              </div>

              <div className="lg:col-span-5 tf-card-selected p-6 sm:p-8 space-y-5">
                <img
                  src="/assets/topform-logo-2-white.png"
                  alt="TOPFORM"
                  className="h-10 sm:h-11 w-auto object-contain"
                  loading="lazy"
                />
                <div className="tf-keyline-blue" />
                <p className="text-[14px] sm:text-[15px] text-slate-300 leading-relaxed">
                  Direct, confidential 1-to-1 enquiries via WhatsApp with Mark
                  Bowden.
                </p>
                <WorkWithMarkButton
                  variant="blue"
                  fullWidthOnMobile
                  showSubcaption
                />
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================================
            14 | FINAL CLOSE — Floodlight Monumental Close
           =================================================================== */}
        <section className="relative bg-[#060a10] tf-floodlight-hero text-[#ffffff] py-20 sm:py-28 lg:py-32 overflow-hidden">
          <div className="max-w-[1240px] mx-auto px-4 sm:px-8">
            <div className="max-w-2xl space-y-6 sm:space-y-8">
              <p className="tf-overline">
                SEE &nbsp;|&nbsp; REHEARSE &nbsp;|&nbsp; BECOME
              </p>
              <h2 className="tf-heading-main uppercase text-[clamp(2.1rem,5vw,3.85rem)] text-[#ffffff]">
                How good can you <span className="text-[#22c5fe]">become?</span>
              </h2>

              <div className="tf-keyline-blue" />

              <div className="space-y-3 pt-1">
                <p className="tf-copy-light text-[17px] sm:text-[19px] text-[#ffffff] leading-relaxed">
                  You&apos;ve spent years building your game.
                </p>
                <p className="tf-copy-light text-[17px] sm:text-[19px] text-slate-300 leading-relaxed">
                  There&apos;s the player you are today.
                </p>
                <p className="tf-copy-light text-[17px] sm:text-[19px] text-slate-300 leading-relaxed">
                  And there&apos;s the player you can still become.
                </p>
                <p className="tf-subheading text-[19px] sm:text-[21px] text-[#ffffff] pt-1">
                  TOPFORM is built to help you get the best from both.
                </p>
              </div>

              <div className="pt-6 border-t border-white/[0.08] space-y-6">
                <p className="tf-heading-main uppercase text-[clamp(1.45rem,3.6vw,2.4rem)] text-[#ffffff]">
                  Play consistently at your best.
                  <span className="text-[#22c5fe] block mt-1">
                    Make your best even better.
                  </span>
                </p>

                <WorkWithMarkButton
                  variant="blue"
                  fullWidthOnMobile
                  showSubcaption
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* =====================================================================
          FOOTER — Official Stationary & Brand Guidelines Details
         ===================================================================== */}
      <footer className="bg-[#060a10] text-[#ffffff] border-t border-white/[0.08] pt-12 pb-[calc(3rem+env(safe-area-inset-bottom,0px))]">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <img
              src="/assets/topform-logo-2-white.png"
              alt="TOPFORM — Play at your best. Make your best better."
              className="h-9 sm:h-10 w-auto object-contain"
              loading="lazy"
            />
            <div className="h-6 w-px bg-white/[0.12]" />
            <div className="text-[13px] text-slate-400">
              <p className="text-[#ffffff] font-semibold">Mark Bowden</p>
              <p className="text-[12px] text-slate-400">
                Performance Coach · TOPFORM
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-[13px] font-medium text-slate-400">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="tf-control hover:text-[#22c5fe] transition-colors duration-200"
            >
              WhatsApp: 07575 203332
            </a>
            <a
              href="mailto:mark@topform.uk"
              className="tf-control hover:text-[#22c5fe] transition-colors duration-200"
            >
              mark@topform.uk
            </a>
          </div>
        </div>
      </footer>

      {/* =====================================================================
          THUMBS-FIRST STICKY BOTTOM ACTION BAR FOR PHONE (<768px)
          (Matches the vibrant cyan bottom CTA bar in Fearless Footballer UI)
         ===================================================================== */}
      <div className="md:hidden fixed bottom-0 inset-x-0 z-40 tf-glass-bar border-t border-white/[0.08] px-4 pt-2.5 pb-[calc(0.65rem+env(safe-area-inset-bottom,0px))]">
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="tf-control tf-btn-primary w-full min-h-[50px] text-[#04080e] flex items-center justify-center gap-2.5 px-5 py-3 text-[15px] font-bold"
        >
          <MessageCircle className="w-4 h-4 shrink-0" />
          <span>Work with Mark</span>
          <ArrowRight className="w-4 h-4 shrink-0 stroke-[2.5]" />
        </a>
      </div>

      {/* =====================================================================
          MOBILE BOTTOM-SHEET NAVIGATION DRAWER (<1024px)
         ===================================================================== */}
      {isMobileMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          onClick={() => setIsMobileMenuOpen(false)}
          className="tf-modal-backdrop lg:hidden fixed inset-0 z-50 bg-[#060a10]/85 backdrop-blur-sm overscroll-contain flex flex-col justify-end"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="tf-drawer-sheet w-full bg-[#0b131e] border-t border-[#22c5fe]/40 rounded-t-2xl pt-3 pb-[calc(1.5rem+env(safe-area-inset-bottom,0px))] px-5 space-y-5"
          >
            <div className="w-10 h-1 bg-white/20 rounded-full mx-auto" />

            <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
              <img
                src="/assets/topform-logo-2-white.png"
                alt="TOPFORM"
                className="h-9 w-auto object-contain"
              />
              <button
                type="button"
                aria-label="Close navigation menu"
                onClick={() => setIsMobileMenuOpen(false)}
                className="tf-control tf-btn-ghost-dark p-2.5 text-slate-300 hover:text-[#ffffff]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <nav className="flex flex-col divide-y divide-white/[0.08]">
              {NAV_LINKS.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="tf-control py-3.5 text-[16px] font-semibold text-slate-200 hover:text-[#22c5fe] flex items-center justify-between"
                >
                  <span>{item.label}</span>
                  <ChevronRight className="w-4 h-4 text-[#22c5fe]" />
                </a>
              ))}
            </nav>

            <div className="pt-2">
              <WorkWithMarkButton
                variant="blue"
                fullWidthOnMobile
                showSubcaption
              />
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          VIDEO MODAL — @starting-style Entrance + Escape/Backdrop Dismissal
         ===================================================================== */}
      {activeModalVideo && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activeModalVideo.title}
          onClick={() => setActiveModalVideo(null)}
          className="tf-modal-backdrop fixed inset-0 z-50 bg-[#060a10]/85 backdrop-blur-md overscroll-contain flex items-center justify-center p-4 sm:p-6 pb-[calc(1rem+env(safe-area-inset-bottom,0px))]"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={`tf-modal-card w-full ${
              activeModalVideo.isVertical ? 'max-w-[420px]' : 'max-w-3xl'
            } tf-card-selected overflow-hidden`}
          >
            <div className="px-5 py-4 flex items-center justify-between gap-4 border-b border-white/[0.08]">
              <div>
                <p className="tf-subheading text-[16px] text-[#ffffff]">
                  {activeModalVideo.title}
                </p>
                <p className="text-[13px] text-slate-400">
                  {activeModalVideo.subtitle}
                </p>
              </div>
              <button
                type="button"
                aria-label="Close video modal"
                onClick={() => setActiveModalVideo(null)}
                className="tf-control tf-btn-ghost-dark p-2 text-slate-300 hover:text-[#ffffff]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            {activeModalVideo.vimeoEmbedUrl ? (
              <div
                className={`relative w-full ${
                  activeModalVideo.isVertical ? 'aspect-[9/16]' : 'aspect-video'
                } bg-[#060a10]`}
              >
                <iframe
                  src={activeModalVideo.vimeoEmbedUrl}
                  title={activeModalVideo.title}
                  className="absolute inset-0 w-full h-full border-0"
                  allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>
            ) : (
              <video
                src={activeModalVideo.src}
                controls
                autoPlay
                playsInline
                className="w-full max-h-[75dvh] bg-[#060a10] block"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TopformSite;
