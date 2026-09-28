import React, { useState } from 'react';
import {
  ArrowUpRight,
  ArrowRight,
  Lock,
  Play,
  CheckCircle2,
  MessageSquare,
  ChevronRight,
  TrendingUp,
  Crosshair,
  Zap,
  X,
} from 'lucide-react';

type PageId = 'home' | 'about' | 'results';

interface TimelinePoint {
  month: string;
  label: string;
  minutes: string;
  rating: string;
  status: string;
  narrative: string;
  barPct: number;
}

const JAN_TO_MAY_DATA: TimelinePoint[] = [
  {
    month: 'JAN',
    label: 'FROZEN OUT // MATCHDAY SQUAD OMISSION',
    minutes: '0 MIN',
    rating: 'N/A',
    status: 'BENCH / UNUSED SUB',
    narrative:
      'Dropped from the starting XI following a managerial change. Pressing hesitancy and second-guessing in the final third led to four consecutive unused substitute appearances.',
    barPct: 6,
  },
  {
    month: 'FEB',
    label: 'NEURAL RESET // PRIVATE INTAKE INITIATED',
    minutes: '142 MIN',
    rating: '7.14',
    status: 'IMPACT SUBSTITUTE',
    narrative:
      'Stripped away over-analysis before kickoff. Installed a 3-second in-game error reset protocol and pre-match autonomic state calibration. Scored decisive equalizer in 84th minute.',
    barPct: 38,
  },
  {
    month: 'MAR',
    label: 'FIRST-XI LOCK // CHAMPIONS LEAGUE KNOCKOUTS',
    minutes: '450 MIN',
    rating: '7.82',
    status: 'UNDISPUTED STARTER',
    narrative:
      'Started every fixture across domestic and European competition. Completed 91% of progressive carries into the penalty box; named Man of the Match twice.',
    barPct: 74,
  },
  {
    month: 'APR',
    label: 'PEAK FLOW STATE // RUN-IN DOMINANCE',
    minutes: '540 MIN',
    rating: '8.35',
    status: 'TALISMAN / CAPTAIN ARMBAND',
    narrative:
      '6 goal contributions in 6 matches during the high-pressure season run-in. Zero drop-off in decision speed between minute 1 and minute 90+5.',
    barPct: 92,
  },
  {
    month: 'MAY',
    label: 'VOTED CLUB PLAYER OF THE YEAR',
    minutes: '900+ MIN',
    rating: '8.64',
    status: 'PLAYER OF THE YEAR',
    narrative:
      'Completed a historic 16-week career reversal. Voted Player of the Season by both teammates and supporters, securing a new marquee contract tier.',
    barPct: 100,
  },
];

interface CaseStudy {
  id: string;
  code: string;
  competition: string;
  position: string;
  headline: string;
  subheadline: string;
  beforeMetric: string;
  afterMetric: string;
  deltaLabel: string;
  quote: string;
  pillarsUsed: string[];
  image: string;
}

const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'cs-01',
    code: 'DOSSIER // 01',
    competition: 'PREMIER LEAGUE',
    position: 'ATTACKING MIDFIELDER (TOP-6 CLUB)',
    headline: 'ZERO GAME TIME IN JANUARY. PLAYER OF THE YEAR BY MAY.',
    subheadline:
      'From transfer-listed squad player in the winter window to the club’s most decisive performer across the final 18 fixtures.',
    beforeMetric: '0 STARTS (JAN)',
    afterMetric: '14 G/A · POTY (MAY)',
    deltaLabel: '+340% PROGRESSIVE IMPACT',
    quote:
      '“Every coach tells you to be confident. Mark actually rewired what happens in my head in the 1.5 seconds before the ball arrives at my feet.”',
    pillarsUsed: ['Matchday State Control', '3-Second Pitch Reset', '90+ Min Composure'],
    image:
      'https://images.unsplash.com/photo-1518091043644-c1d4457512c6?auto=format&fit=crop&w=1400&q=85',
  },
  {
    id: 'cs-02',
    code: 'DOSSIER // 02',
    competition: 'UEFA CHAMPIONS LEAGUE',
    position: 'CENTER FORWARD (#9)',
    headline: '8-MATCH GOAL DROUGHT TO 11 GOALS IN 9 EUROPEAN & LEAGUE STARTS.',
    subheadline:
      'Eliminating penalty-box cortical tension and restoring instinctive first-time finishing under extreme media scrutiny.',
    beforeMetric: '0.11 GOALS / 90',
    afterMetric: '0.89 GOALS / 90',
    deltaLabel: '+68% SHOT CONVERSION',
    quote:
      '“When the stadium is loud and you miss an early chance, the old me would hide for 20 minutes. Now I’m more dangerous on the very next phase.”',
    pillarsUsed: ['Striker Instinct Protocol', 'Media Noise Isolation', 'High-xG Execution'],
    image:
      'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1400&q=85',
  },
  {
    id: 'cs-03',
    code: 'DOSSIER // 03',
    competition: 'LA LIGA & INTERNATIONAL',
    position: 'CENTRAL DEFENDER / VICE-CAPTAIN',
    headline: 'POST-ACL RETURN TO TOP-1% DUEL WIN RATE IN EUROPE’S TOP FIVE LEAGUES.',
    subheadline:
      'Erasing subconscious physical hesitation after a 7-month layoff to command the high defensive line against elite transitions.',
    beforeMetric: '54% AERIAL / DUELS',
    afterMetric: '79.4% DUELS WON',
    deltaLabel: 'TOP 0.5% IN EUROPE',
    quote:
      '“The physios cleared my knee in October, but Mark cleared my instinct in 14 days. I stopped protecting the leg and started dominating my zone again.”',
    pillarsUsed: ['Post-Injury Fear Erasure', 'Command Presence', 'High-Line Scanning'],
    image:
      'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1400&q=85',
  },
];

export const TopformSite: React.FC = () => {
  const [activePage, setActivePage] = useState<PageId>('home');
  const [selectedMonthIdx, setSelectedMonthIdx] = useState<number>(4); // Default to MAY highlight
  const [competitionFilter, setCompetitionFilter] = useState<string>('ALL');
  const [intakeModalOpen, setIntakeModalOpen] = useState<boolean>(false);
  const [intakeRole, setIntakeRole] = useState<'player' | 'agent'>('player');
  const [intakeSubmitted, setIntakeSubmitted] = useState<boolean>(false);

  const navigatePage = (page: PageId) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const activeTimeline = JAN_TO_MAY_DATA[selectedMonthIdx];

  const filteredCases =
    competitionFilter === 'ALL'
      ? CASE_STUDIES
      : CASE_STUDIES.filter((c) => c.competition.includes(competitionFilter));

  return (
    <div
      className="min-h-screen bg-[#07080A] text-[#F4F5F7] relative overflow-x-hidden pb-24 sm:pb-0"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {/* Subtle Film Grain Overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-50"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.06'/%3E%3C/svg%3E")`,
          opacity: 0.45,
        }}
      />

      {/* Architectural Top Navigation */}
      <header className="sticky top-0 z-40 bg-[#07080A]/85 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 h-16 sm:h-20 flex items-center justify-between">
          {/* Brand Wordmark */}
          <button
            type="button"
            onClick={() => navigatePage('home')}
            className="flex items-center gap-3 text-left group cursor-pointer"
          >
            <div className="w-2.5 h-6 bg-[#D4FF00] transition-transform duration-200 group-hover:scale-y-110" />
            <div>
              <span
                className="text-xl sm:text-2xl tracking-tight text-white block leading-none"
                style={{ fontFamily: "'Anton', sans-serif", letterSpacing: '0.03em' }}
              >
                TOPFORM<span className="text-[#D4FF00]">®</span>
              </span>
              <span
                className="text-[9px] text-[#8A909E] uppercase block mt-0.5"
                style={{ fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.18em' }}
              >
                ELITE FOOTBALL PERFORMANCE
              </span>
            </div>
          </button>

          {/* Center Page Switcher */}
          <nav className="hidden md:flex items-center gap-1 bg-white/[0.03] border border-white/10 p-1">
            {(
              [
                { id: 'home', label: '01 // TOPFORM' },
                { id: 'about', label: '02 // ABOUT MARK' },
                { id: 'results', label: '03 // PLAYERS & RESULTS' },
              ] as const
            ).map((tab) => {
              const active = activePage === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => navigatePage(tab.id)}
                  className={`px-4 py-2 text-xs uppercase transition-all cursor-pointer ${
                    active
                      ? 'bg-[#D4FF00] text-[#07080A] font-semibold'
                      : 'text-[#8A909E] hover:text-white'
                  }`}
                  style={{ fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.1em' }}
                >
                  {tab.label}
                </button>
              );
            })}
          </nav>

          {/* Right Status + Private Intake Trigger */}
          <div className="flex items-center gap-4">
            <div
              className="hidden lg:flex items-center gap-2 text-[11px] text-[#8A909E] uppercase"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              <span className="w-2 h-2 rounded-full bg-[#D4FF00] animate-pulse" />
              <span>ROSTER INTAKE: 2 PRIVATE SLOTS</span>
            </div>

            <button
              type="button"
              onClick={() => {
                setIntakeSubmitted(false);
                setIntakeModalOpen(true);
              }}
              className="bg-white text-[#07080A] hover:bg-[#D4FF00] transition-colors duration-200 px-4 sm:px-5 py-2.5 text-xs font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              <span>PRIVATE CONSULTATION</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Mobile Sub-Navigation Strip */}
        <div className="flex md:hidden border-t border-white/10 bg-[#0A0C10]">
          {(
            [
              { id: 'home', label: 'TOPFORM' },
              { id: 'about', label: 'ABOUT MARK' },
              { id: 'results', label: 'PLAYERS & RESULTS' },
            ] as const
          ).map((tab) => {
            const active = activePage === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => navigatePage(tab.id)}
                className={`flex-1 py-2.5 text-[11px] uppercase tracking-wider border-b-2 transition-colors ${
                  active
                    ? 'border-[#D4FF00] text-[#D4FF00] font-semibold bg-white/[0.03]'
                    : 'border-transparent text-[#8A909E]'
                }`}
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </header>

      {/* =====================================================================
          PAGE 1: TOPFORM (HOME / MAIN LONG-FORM PAGE)
      ===================================================================== */}
      {activePage === 'home' && (
        <main>
          {/* [01 // HERO SECTION] */}
          <section className="relative min-h-[90vh] flex flex-col justify-between border-b border-white/10 overflow-hidden">
            {/* Floodlit Atmospheric Stadium Backdrop */}
            <div className="absolute inset-0 z-0">
              <img
                src="https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=2000&q=85"
                alt="Stadium Floodlights Atmosphere"
                fetchPriority="high"
                className="w-full h-full object-cover object-center grayscale contrast-125 opacity-35 scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#07080A] via-[#07080A]/65 to-[#07080A]/80" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(212,255,0,0.09),transparent_55%)]" />
            </div>

            {/* Exposed Architectural Grid Overlay */}
            <div className="max-w-[1440px] w-full mx-auto px-4 sm:px-8 pt-8 sm:pt-12 pb-12 sm:pb-16 relative z-10 flex-1 flex flex-col justify-between">
              {/* Top Telemetry Meta Row */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5">
                <div
                  className="flex items-center gap-3 text-xs text-[#8A909E] uppercase"
                  style={{ fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.14em' }}
                >
                  <span className="px-2 py-0.5 bg-[#D4FF00]/15 text-[#D4FF00] border border-[#D4FF00]/30">
                    CHAMPS LEAGUE // PREMIER LEAGUE
                  </span>
                  <span>1-ON-1 COGNITIVE & COMPETITIVE ARCHITECTURE</span>
                </div>
                <div
                  className="text-xs text-[#8A909E] uppercase hidden sm:block"
                  style={{ fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.14em' }}
                >
                  [STRICT NDA · DIRECT PLAYER & AGENT ACCESS]
                </div>
              </div>

              {/* Primary Graphic Anchor Copy */}
              <div className="my-auto py-10 sm:py-16">
                <p
                  className="text-xs sm:text-sm uppercase text-[#D4FF00] mb-4 tracking-widest"
                  style={{ fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.2em' }}
                >
                  // 01 — THE STANDARD OF ELITE EXECUTION
                </p>

                <h1
                  className="uppercase leading-[0.88] tracking-[-0.02em] text-white select-none"
                  style={{
                    fontFamily: "'Anton', sans-serif",
                    fontSize: 'clamp(3.1rem, 8.2vw, 7.75rem)',
                  }}
                >
                  <span className="block">PLAY CONSISTENTLY</span>
                  <span className="block text-white/95">AT YOUR BEST.</span>
                  <span className="block sm:pl-[8%] mt-1 sm:mt-2 text-[#D4FF00]">
                    MAKE YOUR BEST EVEN BETTER.
                  </span>
                </h1>

                {/* Editorial Sub-Grid */}
                <div className="mt-8 sm:mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
                  <div className="lg:col-span-6">
                    <p className="text-base sm:text-xl text-[#C4C9D4] leading-relaxed font-normal max-w-2xl">
                      At the highest level of professional football, physical conditioning is table
                      stakes. <strong className="text-white font-semibold">TOPFORM</strong>{' '}
                      engineers the cognitive speed, matchday composure, and ruthless 90-minute
                      consistency that separate squad players from generational performers.
                    </p>
                  </div>

                  <div className="lg:col-span-6 flex flex-col sm:flex-row items-stretch sm:items-center lg:justify-end gap-4">
                    <button
                      type="button"
                      onClick={() => {
                        setIntakeSubmitted(false);
                        setIntakeModalOpen(true);
                      }}
                      className="bg-[#D4FF00] text-[#07080A] hover:bg-white transition-all duration-200 px-7 py-4 font-bold uppercase text-xs sm:text-sm tracking-wider flex items-center justify-center gap-3 cursor-pointer"
                      style={{ fontFamily: "'JetBrains Mono', monospace" }}
                    >
                      <span>INITIATE PRIVATE CONSULTATION</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => navigatePage('results')}
                      className="border border-white/25 bg-white/[0.03] hover:bg-white/10 text-white transition-all duration-200 px-7 py-4 font-semibold uppercase text-xs sm:text-sm tracking-wider flex items-center justify-center gap-3 cursor-pointer"
                      style={{ fontFamily: "'JetBrains Mono', monospace" }}
                    >
                      <Play className="w-3.5 h-3.5 fill-current text-[#D4FF00]" />
                      <span>INSPECT PLAYER DOSSIERS</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Bottom Hero Telemetry Bar */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-6 border-t border-white/10">
                {[
                  { label: 'CLIENT TIER', value: 'TOP-5 EUROPEAN LEAGUES' },
                  { label: 'AVG RATING DELTA', value: '+1.18 MATCH RATING (12 WKS)' },
                  { label: 'CONFIDENTIALITY', value: '100% PRIVATE // OFF-CLUB RECORD' },
                  { label: 'DIRECT ACCESS', value: 'WHATSAPP & MATCHDAY VOICE NOTE' },
                ].map((stat) => (
                  <div key={stat.label} className="border-l border-white/15 pl-3">
                    <span
                      className="text-[10px] text-[#8A909E] uppercase block"
                      style={{ fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.12em' }}
                    >
                      {stat.label}
                    </span>
                    <span className="text-xs sm:text-sm font-semibold text-white mt-0.5 block">
                      {stat.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* [02 // THE PERFORMANCE GAP — EDITORIAL MANIFESTO] */}
          <section className="border-b border-white/10 py-20 sm:py-28 bg-[#07080A]">
            <div className="max-w-[1440px] mx-auto px-4 sm:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                <div className="lg:col-span-4 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-white/10 pb-8 lg:pb-0 lg:pr-8">
                  <div>
                    <span
                      className="text-xs text-[#D4FF00] uppercase block mb-3"
                      style={{ fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.16em' }}
                    >
                      // 02 — THE UNSEEN MARGIN
                    </span>
                    <h2
                      className="uppercase text-3xl sm:text-5xl leading-[0.95] text-white"
                      style={{ fontFamily: "'Anton', sans-serif" }}
                    >
                      WHY ELITE TALENT STALLS UNDER FLOODLIGHTS.
                    </h2>
                  </div>

                  <div className="mt-8 pt-6 border-t border-white/10">
                    <p
                      className="text-xs text-[#8A909E] uppercase leading-relaxed"
                      style={{ fontFamily: "'JetBrains Mono', monospace" }}
                    >
                      NOT CLINICAL PSYCHOLOGY. NOT GENERIC MOTIVATION. PURE COMPETITIVE EXECUTION
                      BUILT FOR THE 90 MINUTES THAT DEFINE YOUR MARKET VALUE.
                    </p>
                  </div>
                </div>

                <div className="lg:col-span-8 lg:pl-6 space-y-10">
                  <p className="text-xl sm:text-3xl text-white font-light leading-snug">
                    You already train like an elite athlete. Your VO2 max, sprint recovery, and
                    tactical literacy are in the top 0.01% on earth. Yet on Saturday at 15:00 — or
                    Tuesday night under Champions League floodlights —{' '}
                    <span className="text-[#D4FF00] font-medium">
                      a half-second of cognitive hesitation costs you the starting shirt.
                    </span>
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4">
                    {[
                      {
                        idx: '01',
                        title: 'THE SELECTION TRAP',
                        desc: 'When dropped or rotated, most players force passes and over-try in 15-minute cameos—confirming the manager’s doubts.',
                      },
                      {
                        idx: '02',
                        title: 'CORTICAL INTERFERENCE',
                        desc: 'Playing to avoid mistakes rather than playing on instinct adds 0.3s to your first touch and scanning speed.',
                      },
                      {
                        idx: '03',
                        title: 'CLUB POLITICS & NOISE',
                        desc: 'You cannot tell a club psychologist you doubt the manager’s system. TOPFORM operates 100% privately in your corner.',
                      },
                    ].map((card) => (
                      <div
                        key={card.idx}
                        className="bg-[#0E1014] border border-white/10 p-6 flex flex-col justify-between hover:border-white/30 transition-colors"
                      >
                        <span
                          className="text-xs text-[#D4FF00] mb-6 block"
                          style={{ fontFamily: "'JetBrains Mono', monospace" }}
                        >
                          [{card.idx}]
                        </span>
                        <div>
                          <h3
                            className="text-xl uppercase text-white mb-2"
                            style={{ fontFamily: "'Anton', sans-serif", letterSpacing: '0.02em' }}
                          >
                            {card.title}
                          </h3>
                          <p className="text-sm text-[#8A909E] leading-relaxed">{card.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* [03 // TRANSFORMATIONAL PROOF POINT / INTERACTIVE CASE STUDY ANCHOR] */}
          <section className="border-b border-white/10 py-20 sm:py-32 bg-[#0B0D11] relative overflow-hidden">
            <div className="max-w-[1440px] mx-auto px-4 sm:px-8 relative z-10">
              {/* Section Eyebrow */}
              <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
                <span
                  className="text-xs text-[#D4FF00] uppercase"
                  style={{ fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.16em' }}
                >
                  // 03 — VERIFIED CAREER TRAJECTORY SHIFT [PREMIER LEAGUE CASE STUDY]
                </span>
                <span
                  className="text-xs text-[#8A909E] uppercase"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  DURATION: 16 WEEKS (JAN → MAY)
                </span>
              </div>

              {/* CORE ANCHOR COPY #2 — Kinetic Split Typography */}
              <div className="border-y border-white/15 py-10 sm:py-14 mb-12">
                <h2
                  className="uppercase leading-[0.9] tracking-[-0.02em]"
                  style={{
                    fontFamily: "'Anton', sans-serif",
                    fontSize: 'clamp(2.6rem, 7vw, 6.75rem)',
                  }}
                >
                  <span
                    className="block transition-opacity duration-300"
                    style={{
                      WebkitTextStroke: '1.5px rgba(244, 245, 247, 0.45)',
                      color: selectedMonthIdx === 0 ? '#F4F5F7' : 'transparent',
                    }}
                  >
                    ZERO GAME TIME IN JANUARY.
                  </span>
                  <span className="block text-[#D4FF00] mt-2">
                    PLAYER OF THE YEAR BY MAY.
                  </span>
                </h2>
              </div>

              {/* Interactive Month-by-Month Telemetry Scrubber */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                {/* Left Column: Interactive Timeline Selector */}
                <div className="lg:col-span-5 flex flex-col justify-between bg-[#07080A] border border-white/10 p-6 sm:p-8">
                  <div>
                    <span
                      className="text-[11px] text-[#8A909E] uppercase block mb-4"
                      style={{ fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.14em' }}
                    >
                      SELECT MONTH TO INSPECT TELEMETRY:
                    </span>

                    <div className="grid grid-cols-5 gap-2 mb-8">
                      {JAN_TO_MAY_DATA.map((item, idx) => {
                        const isSelected = idx === selectedMonthIdx;
                        return (
                          <button
                            key={item.month}
                            type="button"
                            onClick={() => setSelectedMonthIdx(idx)}
                            className={`py-3 text-xs font-bold uppercase border transition-all cursor-pointer ${
                              isSelected
                                ? 'bg-[#D4FF00] text-[#07080A] border-[#D4FF00]'
                                : 'bg-[#0E1014] text-white/70 border-white/10 hover:border-white/30'
                            }`}
                            style={{ fontFamily: "'JetBrains Mono', monospace" }}
                          >
                            {item.month}
                          </button>
                        );
                      })}
                    </div>

                    <div className="space-y-4">
                      <div
                        className="text-xs text-[#D4FF00] uppercase"
                        style={{ fontFamily: "'JetBrains Mono', monospace" }}
                      >
                        {activeTimeline.label}
                      </div>
                      <p className="text-base sm:text-lg text-[#E2E6EE] leading-relaxed">
                        {activeTimeline.narrative}
                      </p>
                    </div>
                  </div>

                  {/* Trajectory Progress Bar */}
                  <div className="mt-8 pt-6 border-t border-white/10">
                    <div className="flex justify-between text-xs mb-2" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                      <span className="text-[#8A909E]">PERFORMANCE & TRUST INDEX</span>
                      <span className="text-[#D4FF00] font-bold">{activeTimeline.barPct}%</span>
                    </div>
                    <div className="w-full h-2 bg-white/10 overflow-hidden">
                      <div
                        className="h-full bg-[#D4FF00] transition-all duration-500"
                        style={{ width: `${activeTimeline.barPct}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Right Column: Live Telemetry Readout & Visual Dossier */}
                <div className="lg:col-span-7 bg-[#07080A] border border-white/10 p-6 sm:p-10 flex flex-col justify-between relative overflow-hidden">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 border-b border-white/10 pb-8">
                    <div>
                      <span
                        className="text-[11px] text-[#8A909E] uppercase block"
                        style={{ fontFamily: "'JetBrains Mono', monospace" }}
                      >
                        MONTHLY PITCH TIME
                      </span>
                      <span
                        className="text-3xl sm:text-5xl text-white block mt-1"
                        style={{ fontFamily: "'Anton', sans-serif" }}
                      >
                        {activeTimeline.minutes}
                      </span>
                    </div>
                    <div>
                      <span
                        className="text-[11px] text-[#8A909E] uppercase block"
                        style={{ fontFamily: "'JetBrains Mono', monospace" }}
                      >
                        AVG MATCH RATING
                      </span>
                      <span
                        className="text-3xl sm:text-5xl text-[#D4FF00] block mt-1"
                        style={{ fontFamily: "'Anton', sans-serif" }}
                      >
                        {activeTimeline.rating}
                      </span>
                    </div>
                    <div>
                      <span
                        className="text-[11px] text-[#8A909E] uppercase block"
                        style={{ fontFamily: "'JetBrains Mono', monospace" }}
                      >
                        SQUAD STATUS
                      </span>
                      <span
                        className="text-xl sm:text-2xl text-white block mt-2"
                        style={{ fontFamily: "'Anton', sans-serif" }}
                      >
                        {activeTimeline.status}
                      </span>
                    </div>
                  </div>

                  {/* Direct Player Quote inside Proof Block */}
                  <div className="my-8">
                    <blockquote className="text-lg sm:text-2xl font-light italic text-white/90 leading-relaxed">
                      “In January I had my agent looking for a loan exit because the manager
                      wouldn’t even look at me in training. By May, the entire stadium was singing
                      my name as I lifted the Player of the Year trophy. Mark didn’t change my
                      technique — he unlocked the version of me that plays without fear.”
                    </blockquote>
                    <div
                      className="mt-4 flex items-center gap-3 text-xs text-[#8A909E] uppercase"
                      style={{ fontFamily: "'JetBrains Mono', monospace" }}
                    >
                      <span className="w-2 h-2 bg-[#D4FF00]" />
                      <span>PREMIER LEAGUE FIRST-TEAM MIDFIELDER (IDENTITY PROTECTED UNDER NDA)</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-white/10">
                    <span
                      className="text-xs text-[#8A909E]"
                      style={{ fontFamily: "'JetBrains Mono', monospace" }}
                    >
                      VERIFIED OPTA / WYScout PERFORMANCE SHIFT
                    </span>
                    <button
                      type="button"
                      onClick={() => navigatePage('results')}
                      className="text-xs text-[#D4FF00] hover:underline uppercase flex items-center gap-1.5 cursor-pointer"
                      style={{ fontFamily: "'JetBrains Mono', monospace" }}
                    >
                      <span>VIEW ALL PLAYER CASE STUDIES</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* [04 // THE 3-PILLAR HIGH-PERFORMANCE ARCHITECTURE] */}
          <section className="border-b border-white/10 py-20 sm:py-28 bg-[#07080A]">
            <div className="max-w-[1440px] mx-auto px-4 sm:px-8">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
                <div>
                  <span
                    className="text-xs text-[#D4FF00] uppercase block mb-3"
                    style={{ fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.16em' }}
                  >
                    // 04 — THE TOPFORM SYSTEM
                  </span>
                  <h2
                    className="uppercase text-4xl sm:text-6xl leading-[0.92] text-white"
                    style={{ fontFamily: "'Anton', sans-serif" }}
                  >
                    ENGINEERED FOR MATCHDAY DOMINANCE.
                  </h2>
                </div>
                <p className="text-sm text-[#8A909E] max-w-md">
                  Zero classroom lectures. Zero generic worksheets. Every protocol is tailored to
                  your position, your manager’s tactical demands, and your upcoming fixture list.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 border border-white/10">
                {[
                  {
                    num: 'PILLAR // 01',
                    icon: Crosshair,
                    title: 'PRE-MATCH AUTONOMIC CALIBRATION',
                    subtitle: 'OWN THE TUNNEL BEFORE KICKOFF',
                    points: [
                      'Eliminate pre-match overthinking and nervous energy drain 24 hours prior to kickoff',
                      'Custom 90-second tunnel lock-in routine tailored to your nervous system profile',
                      'Enter minute 01:00 with the composure and visual scanning speed of minute 45:00',
                    ],
                  },
                  {
                    num: 'PILLAR // 02',
                    icon: Zap,
                    title: 'THE 3-SECOND IN-GAME RESET',
                    subtitle: 'IMMUNITY TO MISTAKES & CROWD NOISE',
                    points: [
                      'Neuro-mechanical trigger to flush a misplaced pass or missed chance in under 3 seconds',
                      'Prevent single errors from snowballing into a 20-minute invisible spell',
                      'Stay ruthlessly demanding of the ball in high-pressure phases',
                    ],
                  },
                  {
                    num: 'PILLAR // 03',
                    icon: TrendingUp,
                    title: '90-MINUTE EXECUTIVE DOMINANCE',
                    subtitle: 'CLUTCH DECISION-MAKING IN MINUTES 75–90+',
                    points: [
                      'Maintain cognitive sharpness when physical lactate thresholds peak late in the second half',
                      'Post-match tactical & mental debrief via direct WhatsApp voice notes within 12 hours',
                      'Mid-season contract, transfer window, and managerial transition armor',
                    ],
                  },
                ].map((pillar, i) => {
                  const IconComponent = pillar.icon;
                  return (
                    <div
                      key={pillar.num}
                      className={`p-8 sm:p-10 bg-[#0A0C10] flex flex-col justify-between ${
                        i < 2 ? 'border-b lg:border-b-0 lg:border-r border-white/10' : ''
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-8">
                          <span
                            className="text-xs text-[#D4FF00] uppercase"
                            style={{ fontFamily: "'JetBrains Mono', monospace" }}
                          >
                            {pillar.num}
                          </span>
                          <IconComponent className="w-5 h-5 text-[#D4FF00]" />
                        </div>

                        <h3
                          className="text-2xl sm:text-3xl uppercase text-white leading-tight mb-2"
                          style={{ fontFamily: "'Anton', sans-serif" }}
                        >
                          {pillar.title}
                        </h3>
                        <p
                          className="text-xs text-[#8A909E] uppercase mb-8"
                          style={{ fontFamily: "'JetBrains Mono', monospace" }}
                        >
                          {pillar.subtitle}
                        </p>

                        <ul className="space-y-4">
                          {pillar.points.map((pt) => (
                            <li key={pt} className="flex items-start gap-3 text-sm text-[#C4C9D4]">
                              <CheckCircle2 className="w-4 h-4 text-[#D4FF00] shrink-0 mt-0.5" />
                              <span>{pt}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="mt-10 pt-6 border-t border-white/10 flex items-center justify-between text-xs text-[#8A909E]">
                        <span style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                          DELIVERY: 1-ON-1 PRIVATE
                        </span>
                        <span className="text-white font-semibold">BESPOKE PROTOCOL</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* [05 // AUTHORITY BRIDGE TO MARK & DIRECT PRIVATE INTAKE] */}
          <section className="py-20 sm:py-28 bg-[#07080A]">
            <div className="max-w-[1440px] mx-auto px-4 sm:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 border border-white/15 bg-[#0E1014]">
                {/* Left: About Mark Teaser */}
                <div className="lg:col-span-6 p-8 sm:p-12 border-b lg:border-b-0 lg:border-r border-white/10 flex flex-col justify-between">
                  <div>
                    <span
                      className="text-xs text-[#D4FF00] uppercase block mb-3"
                      style={{ fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.16em' }}
                    >
                      // 05 — THE ARCHITECT BEHIND TOPFORM
                    </span>
                    <h3
                      className="uppercase text-3xl sm:text-5xl text-white leading-[0.94] mb-6"
                      style={{ fontFamily: "'Anton', sans-serif" }}
                    >
                      MARK: THE PRIVATE PERFORMANCE PARTNER TO FOOTBALL’S 1%.
                    </h3>
                    <p className="text-base text-[#C4C9D4] leading-relaxed mb-6">
                      Trusted behind closed doors by Champions League winners, Premier League
                      captains, and leading FIFA-licensed agencies. Mark operates outside club
                      structures so players have an uncompromised, confidential edge.
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 pt-6 border-t border-white/10">
                    <button
                      type="button"
                      onClick={() => navigatePage('about')}
                      className="text-xs uppercase font-bold text-[#D4FF00] flex items-center gap-2 hover:underline cursor-pointer"
                      style={{ fontFamily: "'JetBrains Mono', monospace" }}
                    >
                      <span>READ MARK’S FULL PEDIGREE & PHILOSOPHY</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Right: High-Conversion Private Intake Box */}
                <div className="lg:col-span-6 p-8 sm:p-12 bg-[#07080A] flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span
                        className="text-xs text-[#8A909E] uppercase"
                        style={{ fontFamily: "'JetBrains Mono', monospace" }}
                      >
                        DIRECT WHATSAPP / IMESSAGE CONCIERGE
                      </span>
                      <Lock className="w-4 h-4 text-[#D4FF00]" />
                    </div>
                    <h3
                      className="uppercase text-3xl sm:text-5xl text-white leading-[0.94] mb-4"
                      style={{ fontFamily: "'Anton', sans-serif" }}
                    >
                      SECURE YOUR PRIVATE CONSULTATION.
                    </h3>
                    <p className="text-sm text-[#8A909E] leading-relaxed mb-8">
                      To protect matchday availability for existing roster clients, Mark works with
                      a strictly capped number of professional players each season. Direct inquiries
                      from players, agents, and sporting directors are handled personally.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <button
                      type="button"
                      onClick={() => {
                        setIntakeRole('player');
                        setIntakeSubmitted(false);
                        setIntakeModalOpen(true);
                      }}
                      className="w-full py-4 px-6 bg-[#D4FF00] text-[#07080A] hover:bg-white font-bold text-xs sm:text-sm uppercase tracking-wider flex items-center justify-between transition-colors cursor-pointer"
                      style={{ fontFamily: "'JetBrains Mono', monospace" }}
                    >
                      <span>I AM A PROFESSIONAL PLAYER — REQUEST PRIVATE CALL</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setIntakeRole('agent');
                        setIntakeSubmitted(false);
                        setIntakeModalOpen(true);
                      }}
                      className="w-full py-4 px-6 bg-white/[0.04] hover:bg-white/10 text-white border border-white/15 font-semibold text-xs sm:text-sm uppercase tracking-wider flex items-center justify-between transition-colors cursor-pointer"
                      style={{ fontFamily: "'JetBrains Mono', monospace" }}
                    >
                      <span>I AM AN AGENT / CLUB REPRESENTATIVE — INQUIRE FOR CLIENT</span>
                      <ChevronRight className="w-4 h-4 text-[#D4FF00]" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      )}

      {/* =====================================================================
          PAGE 2: ABOUT MARK
      ===================================================================== */}
      {activePage === 'about' && (
        <main className="py-14 sm:py-24">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-8">
            {/* Header */}
            <div className="border-b border-white/10 pb-12 mb-14">
              <span
                className="text-xs text-[#D4FF00] uppercase block mb-3"
                style={{ fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.16em' }}
              >
                // PAGE 02 — AUTHORITY & PEDIGREE
              </span>
              <h1
                className="uppercase leading-[0.9] text-white"
                style={{
                  fontFamily: "'Anton', sans-serif",
                  fontSize: 'clamp(3rem, 7.5vw, 6.8rem)',
                }}
              >
                BUILT FOR THE LOCKER ROOM.
                <span className="block text-[#D4FF00]">TRUSTED IN THE TUNNEL.</span>
              </h1>
            </div>

            {/* Bio Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
              <div className="lg:col-span-5">
                <div className="relative border border-white/15 bg-[#0E1014] overflow-hidden aspect-[4/5]">
                  <img
                    src="https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=1200&q=85"
                    alt="Mark — Elite Football Performance Specialist"
                    className="w-full h-full object-cover grayscale contrast-125 opacity-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#07080A] via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 border-t border-white/20 pt-4">
                    <span
                      className="text-xs text-[#D4FF00] uppercase block"
                      style={{ fontFamily: "'JetBrains Mono', monospace" }}
                    >
                      MARK // FOUNDER, TOPFORM®
                    </span>
                    <span className="text-sm text-white/85 block mt-1">
                      Private Performance Advisor to Premier League, Champions League &
                      International Footballers
                    </span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7 flex flex-col justify-between space-y-8">
                <div className="space-y-6">
                  <h2
                    className="text-2xl sm:text-4xl uppercase text-white leading-tight"
                    style={{ fontFamily: "'Anton', sans-serif" }}
                  >
                    “PLAYERS DON’T NEED ANOTHER LECTURE ON MINDSET. THEY NEED A COMPETITIVE WEAPON
                    THAT WORKS AT 200 BPM UNDER 60,000 PEOPLE.”
                  </h2>
                  <p className="text-base sm:text-lg text-[#C4C9D4] leading-relaxed">
                    Modern professional footballers are surrounded by analysts, sports scientists,
                    and club staff — yet when form dips, transfer pressure mounts, or a new manager
                    arrives, the player is functionally alone. Inside a club, everything you say
                    can influence team selection.
                  </p>
                  <p className="text-base sm:text-lg text-[#C4C9D4] leading-relaxed">
                    Mark founded <strong className="text-white">TOPFORM</strong> to give elite
                    players an F1-grade performance engineer solely dedicated to their individual
                    career trajectory. Combining applied neuro-performance, high-pressure decision
                    architecture, and direct match-by-match calibration, Mark’s work is measured in
                    one currency only: <strong className="text-[#D4FF00]">what happens on the pitch.</strong>
                  </p>
                </div>

                {/* Key Credentials Matrix */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-white/10">
                  {[
                    {
                      k: '100% PLAYER-ALIGNED',
                      v: 'Retained privately by players and agencies — never reporting back to club coaching staff.',
                    },
                    {
                      k: 'MATCHWEEK RHYTHM',
                      v: 'Direct WhatsApp integration timed around MD-2, MD-1, Kickoff, and MD+1 recovery.',
                    },
                    {
                      k: 'PROVEN AT THE SUMMIT',
                      v: 'Track record across Premier League, UEFA Champions League, La Liga, and World Cup qualifiers.',
                    },
                    {
                      k: 'ZERO FLUFF MANDATE',
                      v: 'Every session is tactical, concrete, and immediately executable in your next 90 minutes.',
                    },
                  ].map((item) => (
                    <div key={item.k} className="bg-[#0E1014] border border-white/10 p-5">
                      <span
                        className="text-xs text-[#D4FF00] uppercase block mb-1.5"
                        style={{ fontFamily: "'JetBrains Mono', monospace" }}
                      >
                        {item.k}
                      </span>
                      <p className="text-xs sm:text-sm text-[#8A909E] leading-relaxed">{item.v}</p>
                    </div>
                  ))}
                </div>

                {/* Direct CTA */}
                <div className="pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setIntakeSubmitted(false);
                      setIntakeModalOpen(true);
                    }}
                    className="bg-[#D4FF00] text-[#07080A] hover:bg-white transition-colors px-8 py-4 text-xs sm:text-sm font-bold uppercase tracking-wider inline-flex items-center gap-3 cursor-pointer"
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    <span>WORK PRIVATELY WITH MARK</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      )}

      {/* =====================================================================
          PAGE 3: PLAYERS & RESULTS
      ===================================================================== */}
      {activePage === 'results' && (
        <main className="py-14 sm:py-24">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-8">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between border-b border-white/10 pb-12 mb-12 gap-8">
              <div>
                <span
                  className="text-xs text-[#D4FF00] uppercase block mb-3"
                  style={{ fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.16em' }}
                >
                  // PAGE 03 — VERIFIED TRAJECTORY SHIFTS
                </span>
                <h1
                  className="uppercase leading-[0.9] text-white"
                  style={{
                    fontFamily: "'Anton', sans-serif",
                    fontSize: 'clamp(2.8rem, 7vw, 6.5rem)',
                  }}
                >
                  PLAYERS & RESULTS.
                </h1>
              </div>

              {/* Competition Filter */}
              <div className="flex flex-wrap gap-2">
                {['ALL', 'PREMIER LEAGUE', 'CHAMPIONS LEAGUE', 'LA LIGA'].map((filter) => (
                  <button
                    key={filter}
                    type="button"
                    onClick={() => setCompetitionFilter(filter)}
                    className={`px-4 py-2 text-xs uppercase border transition-colors cursor-pointer ${
                      competitionFilter === filter
                        ? 'bg-[#D4FF00] text-[#07080A] border-[#D4FF00] font-bold'
                        : 'bg-[#0E1014] text-[#8A909E] border-white/10 hover:text-white'
                    }`}
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>

            {/* Deep-Dive Case Studies Stack */}
            <div className="space-y-12">
              {filteredCases.map((study) => (
                <article
                  key={study.id}
                  className="grid grid-cols-1 lg:grid-cols-12 border border-white/15 bg-[#0E1014] overflow-hidden"
                >
                  {/* Visual Column */}
                  <div className="lg:col-span-5 relative min-h-[300px] bg-[#07080A] overflow-hidden">
                    <img
                      src={study.image}
                      alt={study.headline}
                      className="w-full h-full object-cover grayscale contrast-125 opacity-65"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0E1014] via-transparent to-black/50" />
                    <div className="absolute top-5 left-5 flex items-center gap-2">
                      <span
                        className="px-3 py-1 bg-[#07080A]/90 border border-white/20 text-[11px] text-[#D4FF00] uppercase"
                        style={{ fontFamily: "'JetBrains Mono', monospace" }}
                      >
                        {study.code}
                      </span>
                      <span
                        className="px-3 py-1 bg-[#07080A]/90 border border-white/10 text-[11px] text-white uppercase"
                        style={{ fontFamily: "'JetBrains Mono', monospace" }}
                      >
                        {study.competition}
                      </span>
                    </div>
                  </div>

                  {/* Dossier Content Column */}
                  <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-between">
                    <div>
                      <span
                        className="text-xs text-[#8A909E] uppercase block mb-2"
                        style={{ fontFamily: "'JetBrains Mono', monospace" }}
                      >
                        ROLE: {study.position}
                      </span>
                      <h2
                        className="text-3xl sm:text-5xl uppercase text-white leading-[0.94] mb-4"
                        style={{ fontFamily: "'Anton', sans-serif" }}
                      >
                        {study.headline}
                      </h2>
                      <p className="text-sm sm:text-base text-[#C4C9D4] leading-relaxed mb-8">
                        {study.subheadline}
                      </p>

                      {/* Before / After Telemetry Strip */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 bg-[#07080A] border border-white/10 mb-8">
                        <div>
                          <span
                            className="text-[10px] text-[#8A909E] uppercase block"
                            style={{ fontFamily: "'JetBrains Mono', monospace" }}
                          >
                            BASELINE (PRE-INTAKE)
                          </span>
                          <span
                            className="text-xl text-white/70 uppercase block mt-1"
                            style={{ fontFamily: "'Anton', sans-serif" }}
                          >
                            {study.beforeMetric}
                          </span>
                        </div>
                        <div>
                          <span
                            className="text-[10px] text-[#8A909E] uppercase block"
                            style={{ fontFamily: "'JetBrains Mono', monospace" }}
                          >
                            POST-PROTOCOL OUTPUT
                          </span>
                          <span
                            className="text-xl text-[#D4FF00] uppercase block mt-1"
                            style={{ fontFamily: "'Anton', sans-serif" }}
                          >
                            {study.afterMetric}
                          </span>
                        </div>
                        <div>
                          <span
                            className="text-[10px] text-[#8A909E] uppercase block"
                            style={{ fontFamily: "'JetBrains Mono', monospace" }}
                          >
                            VERIFIED DELTA
                          </span>
                          <span
                            className="text-xl text-white uppercase block mt-1"
                            style={{ fontFamily: "'Anton', sans-serif" }}
                          >
                            {study.deltaLabel}
                          </span>
                        </div>
                      </div>

                      <blockquote className="border-l-2 border-[#D4FF00] pl-4 text-sm sm:text-base italic text-white/90 mb-6">
                        {study.quote}
                      </blockquote>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-white/10">
                      <div className="flex flex-wrap gap-2">
                        {study.pillarsUsed.map((tag) => (
                          <span
                            key={tag}
                            className="text-[10px] uppercase px-2.5 py-1 bg-white/[0.04] border border-white/10 text-[#C4C9D4]"
                            style={{ fontFamily: "'JetBrains Mono', monospace" }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          setIntakeSubmitted(false);
                          setIntakeModalOpen(true);
                        }}
                        className="text-xs text-[#D4FF00] uppercase font-bold flex items-center gap-1.5 hover:underline cursor-pointer"
                        style={{ fontFamily: "'JetBrains Mono', monospace" }}
                      >
                        <span>REQUEST SIMILAR PROTOCOL</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </main>
      )}

      {/* Footer */}
      <footer className="border-t border-white/10 bg-[#050608] py-12">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <span
              className="text-xl text-white tracking-wider"
              style={{ fontFamily: "'Anton', sans-serif" }}
            >
              TOPFORM<span className="text-[#D4FF00]">®</span>
            </span>
            <p
              className="text-[11px] text-[#8A909E] mt-1 uppercase"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              PRIVATE PERFORMANCE ARCHITECTURE FOR PROFESSIONAL FOOTBALLERS · LONDON / MADRID /
              MUNICH
            </p>
          </div>
          <div
            className="text-[11px] text-[#8A909E] uppercase"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            © {new Date().getFullYear()} TOPFORM PERFORMANCE LTD. ALL CLIENT RECORDS PROTECTED BY
            NDA.
          </div>
        </div>
      </footer>

      {/* Mobile-First Persistent WhatsApp / Private Consultation Floating Bar */}
      <div className="fixed bottom-0 inset-x-0 z-40 sm:hidden bg-[#07080A]/95 backdrop-blur-lg border-t border-white/15 p-3 flex items-center justify-between gap-3">
        <div className="pl-1">
          <span
            className="text-[10px] text-[#D4FF00] uppercase block"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            ● DIRECT PLAYER & AGENT LINE
          </span>
          <span className="text-xs text-white font-semibold block">
            Zero-Friction WhatsApp Intake
          </span>
        </div>
        <button
          type="button"
          onClick={() => {
            setIntakeSubmitted(false);
            setIntakeModalOpen(true);
          }}
          className="bg-[#D4FF00] text-[#07080A] px-4 py-2.5 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shrink-0"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span>CONNECT</span>
        </button>
      </div>

      {/* Private Client Consultation Modal (Zero-Friction WhatsApp / iMessage Handoff) */}
      {intakeModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0E1014] border border-white/20 max-w-lg w-full p-6 sm:p-8 relative">
            <button
              type="button"
              onClick={() => setIntakeModalOpen(false)}
              className="absolute top-5 right-5 text-[#8A909E] hover:text-white cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <span
              className="text-[11px] text-[#D4FF00] uppercase block mb-2"
              style={{ fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.14em' }}
            >
              // ENCRYPTED PRIVATE INTAKE
            </span>
            <h3
              className="text-3xl uppercase text-white mb-2"
              style={{ fontFamily: "'Anton', sans-serif" }}
            >
              REQUEST PRIVATE CONSULTATION
            </h3>
            <p className="text-xs text-[#8A909E] mb-6 leading-relaxed">
              Designed for direct WhatsApp / iMessage speed. No club emails required. All
              inquiries go directly to Mark’s private line under strict non-disclosure.
            </p>

            {/* Role Toggle */}
            <div className="grid grid-cols-2 gap-2 mb-6">
              <button
                type="button"
                onClick={() => setIntakeRole('player')}
                className={`py-2.5 text-xs uppercase border cursor-pointer ${
                  intakeRole === 'player'
                    ? 'bg-[#D4FF00] text-[#07080A] border-[#D4FF00] font-bold'
                    : 'bg-[#07080A] text-[#8A909E] border-white/10'
                }`}
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                I AM A PLAYER
              </button>
              <button
                type="button"
                onClick={() => setIntakeRole('agent')}
                className={`py-2.5 text-xs uppercase border cursor-pointer ${
                  intakeRole === 'agent'
                    ? 'bg-[#D4FF00] text-[#07080A] border-[#D4FF00] font-bold'
                    : 'bg-[#07080A] text-[#8A909E] border-white/10'
                }`}
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                I AM AN AGENT / DIRECTOR
              </button>
            </div>

            {!intakeSubmitted ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setIntakeSubmitted(true);
                }}
                className="space-y-4"
              >
                <div>
                  <label
                    className="block text-[10px] text-[#8A909E] uppercase mb-1"
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    {intakeRole === 'player' ? 'FIRST NAME OR INITIALS (NDA SAFE)' : 'YOUR NAME & AGENCY / CLUB'}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={
                      intakeRole === 'player'
                        ? 'e.g. M.S. — Premier League'
                        : 'e.g. Darren — FIFA Licensed Agent'
                    }
                    className="w-full bg-[#07080A] border border-white/15 px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#D4FF00]"
                  />
                </div>

                <div>
                  <label
                    className="block text-[10px] text-[#8A909E] uppercase mb-1"
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    DIRECT WHATSAPP / IMESSAGE NUMBER
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+44 7700 900000"
                    className="w-full bg-[#07080A] border border-white/15 px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#D4FF00]"
                  />
                </div>

                <div>
                  <label
                    className="block text-[10px] text-[#8A909E] uppercase mb-1"
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    CURRENT SITUATION / UPCOMING FIXTURE PRIORITY
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Briefly share current squad status, league, or target outcome..."
                    className="w-full bg-[#07080A] border border-white/15 px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#D4FF00]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#D4FF00] text-[#07080A] hover:bg-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  DISPATCH DIRECT WHATSAPP BRIEF →
                </button>
              </form>
            ) : (
              <div className="p-6 bg-[#07080A] border border-[#D4FF00]/40 text-center space-y-3">
                <CheckCircle2 className="w-8 h-8 text-[#D4FF00] mx-auto" />
                <h4
                  className="text-xl uppercase text-white"
                  style={{ fontFamily: "'Anton', sans-serif" }}
                >
                  PRIVATE TRANSMISSION LOGGED
                </h4>
                <p className="text-xs text-[#C4C9D4] leading-relaxed">
                  Mark’s private desk has received your encrypted brief. Expect a personal WhatsApp
                  message within 4 hours.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TopformSite;
