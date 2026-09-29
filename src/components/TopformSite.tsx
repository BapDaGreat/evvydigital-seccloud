import React, { useState } from 'react';
import {
  TactileSurface,
  TactileButton,
  AnalogNoiseOverlay,
} from './TactileSurface';

const WHATSAPP_NUMBER = '447575203332'; // 07575 203332
const DEFAULT_WA_MESSAGE =
  "Hi Mark, I've been looking at TOPFORM and I'm interested in working with you.";

// Official Bim Pepple Press Conference Vimeo Embed (https://vimeo.com/1230904160)
const BIM_PEPPLE_VIMEO_EMBED =
  'https://player.vimeo.com/video/1230904160?h=26a94e858b&title=0&byline=0&portrait=0&autoplay=1';

export const getWhatsAppUrl = (customMessage?: string) => {
  const text = encodeURIComponent(customMessage || DEFAULT_WA_MESSAGE);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
};

interface CareerStory {
  id: string;
  index: string;
  headlineLine1: string;
  headlineLine2: string;
  whenWeStarted: string[];
  whereItWentIntro?: string;
  whereItWentBullets?: string[];
  whereItWentBody?: string;
  summaryLine: string;
}

const CAREER_STORIES: CareerStory[] = [
  {
    id: 'story-01',
    index: '01',
    headlineLine1: 'RELEASED BY THREE PREMIER LEAGUE ACADEMIES.',
    headlineLine2: "NOW PLAYING AT ONE OF EUROPE'S ELITE CLUBS.",
    whenWeStarted: [
      'He had been released by three Premier League academies and was rebuilding his career in the Championship.',
    ],
    whereItWentBody:
      "He established himself as one of the outstanding young players in the Championship before moving on to one of Europe's elite clubs.",
    summaryLine: 'From three academy releases to the highest levels of European football.',
  },
  {
    id: 'story-02',
    index: '02',
    headlineLine1: 'ZERO GAME TIME IN JANUARY.',
    headlineLine2: 'PLAYER OF THE YEAR BY MAY.',
    whenWeStarted: [
      "Halfway through the season, he was at a Championship club and hadn't played a single minute.",
      'His confidence was at rock bottom.',
      'We started working together in January.',
    ],
    whereItWentIntro: 'By the end of that same season, he had won both:',
    whereItWentBullets: ['Young Player of the Year.', 'Player of the Year.'],
    summaryLine: 'From zero game time to two end-of-season awards in a matter of months.',
  },
  {
    id: 'story-03',
    index: '03',
    headlineLine1: 'CONSIDERING QUITTING FOOTBALL.',
    headlineLine2: 'TWO SEASONS LATER: PREMIER LEAGUE & FULL INTERNATIONAL.',
    whenWeStarted: [
      "His career wasn't going where he'd hoped.",
      'He was facing the prospect of dropping into League Two and was seriously considering walking away from football altogether.',
    ],
    whereItWentIntro: 'Two seasons later, he had become:',
    whereItWentBullets: ['A Premier League player.', 'A full international.'],
    summaryLine:
      'From considering whether he had a future in the game to playing at the highest level of English football and representing his country.',
  },
  {
    id: 'story-04',
    index: '04',
    headlineLine1: 'SIX MONTHS WITHOUT A GAME.',
    headlineLine2: 'THEN A MULTI-MILLION-POUND PREMIER LEAGUE MOVE.',
    whenWeStarted: [
      "He had joined a League One club but couldn't get into the team.",
      "For the first six months, he didn't play a single game.",
    ],
    whereItWentBody:
      'By the end of the following season, his performances had earned him a move to the Premier League for a multi-million-pound fee.',
    summaryLine:
      'From struggling to get on the pitch in League One to becoming a Premier League player.',
  },
];

export const TopformSite: React.FC = () => {
  const [bimVideoOpen, setBimVideoOpen] = useState(false);

  return (
    <div
      className="relative min-h-screen bg-[#0c0d0e] text-[#f4f4f5] selection:bg-[#f4f4f5] selection:text-[#0c0d0e]"
      style={{ fontFamily: "'Montserrat', sans-serif" }}
    >
      {/* Fine Analog SVG Grain Overlay */}
      <AnalogNoiseOverlay />

      {/* =====================================================================
          MASTHEAD
          Pure black #000000 to match the Hero canvas seamlessly, with a 2px
          TOPFORM Blue top keyline and 1px hairline bottom divider.
      ===================================================================== */}
      <header className="relative z-30 bg-[#000000] text-[#f4f4f5] border-t-[2px] border-[#008BCE] border-b border-white/[0.07]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-12 lg:px-16 h-20 sm:h-22 flex items-center justify-between">
          <a href="#top" className="flex items-center gap-4 group" aria-label="TOPFORM">
            <img
              src="/assets/topform-roundel-white.png"
              alt="TOPFORM"
              className="w-9 h-9 sm:w-10 sm:h-10 object-contain"
            />
            <div>
              <span className="text-base sm:text-lg font-bold tracking-[0.06em] text-[#ffffff] block leading-none">
                TOPFORM
              </span>
              <span className="text-[9px] text-zinc-400 tracking-[0.04em] block mt-1 font-normal">
                PLAY AT YOUR BEST.{' '}
                <strong className="font-bold text-[#ffffff]">MAKE YOUR BEST BETTER.</strong>
              </span>
            </div>
          </a>

          <a
            href={getWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold tracking-[0.14em] uppercase text-[#ffffff] pb-1 border-b border-white/25 hover:border-[#008BCE] transition-colors"
          >
            WORK WITH MARK
          </a>
        </div>
      </header>

      <main id="top" className="relative z-10">
        {/* ===================================================================
            01 | HERO SECTION
            Pure #000000 background so the monochrome player photography melts
            seamlessly with zero horizontal seam or 3D background clutter.
        =================================================================== */}
        <section className="relative bg-[#000000] text-[#f4f4f5] pb-20 sm:pb-28 border-b border-white/[0.07]">
          {/* Framed Monochrome Player Lineup with seamless edge feathering */}
          <div className="relative max-w-[1280px] mx-auto pt-4 sm:pt-6 px-4 sm:px-8">
            <div className="relative overflow-hidden">
              <img
                src="/assets/topform-hero-editorial-bw.jpg"
                alt="Gabe Osho, Fabio Carvalho, Bim Pepple and Reiss Nelson"
                fetchPriority="high"
                width={1983}
                height={793}
                className="w-full max-h-[54vh] object-contain object-top block mx-auto"
              />
              {/* Seamless bottom gradient into #000000 so there is never a hard cut */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 bottom-0 h-20 sm:h-28 bg-gradient-to-t from-[#000000] via-[#000000]/70 to-transparent"
              />
            </div>
          </div>

          {/* Balanced 12-Column Editorial Hero Grid */}
          <div className="relative z-10 max-w-[1320px] mx-auto px-6 sm:px-12 lg:px-16 pt-4 sm:pt-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
              <div className="lg:col-span-7">
                <h1
                  className="font-bold text-[#ffffff] leading-[1.06] tracking-tight"
                  style={{ fontSize: 'clamp(2.15rem, 4.1vw, 3.65rem)' }}
                >
                  Play consistently at your best.
                  <span className="block mt-1.5 text-[#d4d4d8]">Make your best even better.</span>
                </h1>
              </div>

              <div className="lg:col-span-5 lg:pb-1">
                <p className="text-base sm:text-lg text-zinc-400 font-normal leading-[1.65] mb-8">
                  Private 1-to-1 performance coaching and bespoke Off-Pitch Training for
                  professional footballers.
                </p>

                <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
                  <TactileButton
                    href={getWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="alabaster"
                    className="w-fit"
                  >
                    WORK WITH MARK
                  </TactileButton>
                  <span className="text-xs text-zinc-500">
                    Opens a private WhatsApp conversation with Mark.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================================
            02 | THE CORE IDEA
            Strict 12-column architectural grid on deep charcoal (#0c0d0e).
            Left 5 columns: Thesis & closing principle.
            Right 7 columns: The two sides of TOPFORM aligned cleanly.
        =================================================================== */}
        <section className="bg-[#0c0d0e] text-[#f4f4f5] py-24 sm:py-36 border-b border-white/[0.07]">
          <div className="max-w-[1320px] mx-auto px-6 sm:px-12 lg:px-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
              {/* Left Architectural Column */}
              <div className="lg:col-span-5 flex flex-col justify-between">
                <h2
                  className="font-bold text-[#f4f4f5] leading-[1.12] tracking-tight"
                  style={{ fontSize: 'clamp(1.9rem, 3.2vw, 2.75rem)' }}
                >
                  There are two sides to becoming the best footballer you can be.
                </h2>

                <div className="hidden lg:block mt-16 pt-8 border-t border-white/[0.08]">
                  <p className="text-lg text-zinc-400 tracking-tight">
                    Play at your best.{' '}
                    <strong className="font-bold text-[#f4f4f5] block mt-1">
                      Make your best better. Keep doing both.
                    </strong>
                  </p>
                </div>
              </div>

              {/* Right Architectural Column — Two Aligned Tactile Plates */}
              <div className="lg:col-span-7 grid grid-cols-1 gap-6">
                <TactileSurface className="p-8 sm:p-10">
                  <span className="text-xs font-semibold tracking-[0.16em] text-zinc-500 block mb-3">
                    01
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#f4f4f5] tracking-tight leading-[1.2] mb-4">
                    Bring out the football you already have.
                  </h3>
                  <div className="space-y-4 text-[16px] text-zinc-400 leading-[1.75]">
                    <p>
                      You&apos;ve spent years developing your game. But having ability and
                      consistently showing that ability when it matters aren&apos;t always the same
                      thing.
                    </p>
                    <p className="text-[#d4d4d8]">
                      TOPFORM helps you understand what allows your best football to come out — and
                      conditions you to get there more consistently.
                    </p>
                  </div>
                </TactileSurface>

                <TactileSurface className="p-8 sm:p-10">
                  <span className="text-xs font-semibold tracking-[0.16em] text-zinc-500 block mb-3">
                    02
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#f4f4f5] tracking-tight leading-[1.2] mb-4">
                    Keep developing the football you have.
                  </h3>
                  <div className="space-y-4 text-[16px] text-zinc-400 leading-[1.75]">
                    <p>There&apos;s always something you can get better at.</p>
                    <p className="text-[#f4f4f5] font-medium">
                      Your movement. Finishing. Positioning. Decision-making. Composure. Confidence.
                      How you respond to mistakes. Whatever matters most to your game.
                    </p>
                    <p className="text-[#d4d4d8]">
                      Through bespoke Off-Pitch Training, we identify what you want to improve and
                      deliberately rehearse it.
                    </p>
                  </div>
                </TactileSurface>

                {/* Mobile Closing Line */}
                <div className="lg:hidden pt-6 border-t border-white/[0.08]">
                  <p className="text-lg text-zinc-400 tracking-tight">
                    Play at your best.{' '}
                    <strong className="font-bold text-[#f4f4f5]">
                      Make your best better. Keep doing both.
                    </strong>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================================
            03 | YOUR BEST FOOTBALL
            Balanced 12-column editorial spread on #111316:
            Left 5 columns: Framed 4:5 monochrome portrait (never over-stretched).
            Right 7 columns: Two-part editorial essay.
        =================================================================== */}
        <section className="bg-[#111316] text-[#f4f4f5] py-24 sm:py-36 border-b border-white/[0.07]">
          <div className="max-w-[1320px] mx-auto px-6 sm:px-12 lg:px-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
              {/* Framed Studio Portrait */}
              <div className="lg:col-span-5">
                <div className="bg-[#000000] border border-white/[0.08] overflow-hidden">
                  <img
                    src="/assets/topform-portrait-cover.jpg"
                    alt="TOPFORM Studio Portrait"
                    loading="lazy"
                    className="w-full aspect-[4/5] object-cover object-center block"
                  />
                </div>
              </div>

              {/* Editorial Essay Column */}
              <div className="lg:col-span-7">
                <h2
                  className="font-bold text-[#f4f4f5] leading-[1.12] tracking-tight mb-8"
                  style={{ fontSize: 'clamp(1.9rem, 3.2vw, 2.7rem)' }}
                >
                  You know what it feels like when you&apos;re at your best.
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pt-6 border-t border-white/[0.08]">
                  {/* Part 1: Blue Performance State */}
                  <div className="space-y-4 text-[16px] text-zinc-400 leading-[1.75]">
                    <p className="text-lg font-semibold text-[#f4f4f5]">You&apos;re in the game.</p>
                    <p>
                      Your mind is clear. You&apos;re present. You&apos;re not overthinking
                      anything.
                    </p>
                    <p>
                      You see things quickly. Decisions come naturally. You trust yourself. Your
                      game feels instinctive, automatic and effortless.
                    </p>
                    <p>Some players call it being in the zone. Others call it flow.</p>

                    <p className="text-xl font-bold text-[#69E0FA] py-1 leading-[1.3] tracking-tight">
                      I call it your Blue Performance State.
                    </p>

                    <p>
                      One of the first things we&apos;ll work on in TOPFORM is understanding what
                      takes you away from that state — and conditioning you to get there more
                      consistently.
                    </p>
                    <p className="font-semibold text-[#f4f4f5]">
                      Because having the ability is one thing. Being able to consistently bring it
                      onto the pitch is another.
                    </p>
                  </div>

                  {/* Part 2: Making Your Best Better */}
                  <div className="space-y-4 text-[16px] text-zinc-400 leading-[1.75]">
                    <p className="text-lg font-semibold text-[#f4f4f5]">
                      But playing at your best is only half of it.
                      <span className="block mt-1">
                        Because what if we can make your best even better?
                      </span>
                    </p>
                    <p>
                      No matter how well you&apos;re playing, there&apos;s always something you can
                      get better at.
                    </p>
                    <p className="text-[#d4d4d8] font-medium">
                      Your movement. Finishing. First touch. Positioning. Scanning. Decision-making.
                      Composure. Confidence. How you respond to mistakes. Whatever matters most to
                      your game.
                    </p>
                    <p>
                      Through bespoke Off-Pitch Training, we take what you want to improve and
                      deliberately rehearse it.
                    </p>
                    <p className="pt-2 font-bold text-[#f4f4f5]">
                      Play at your best. Make your best better. Keep doing both.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================================
            04 | PERFORMANCE (Red Brain → Green Brain → Blue Performance State)
            Clean 12-column introduction + aligned 3-column architectural row.
        =================================================================== */}
        <section className="bg-[#0c0d0e] text-[#f4f4f5] py-24 sm:py-36 border-b border-white/[0.07]">
          <div className="max-w-[1320px] mx-auto px-6 sm:px-12 lg:px-16">
            {/* Section Header & Lead */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start mb-16 sm:mb-20">
              <div className="lg:col-span-5">
                <h2
                  className="font-bold text-[#f4f4f5] leading-[1.12] tracking-tight"
                  style={{ fontSize: 'clamp(1.9rem, 3.2vw, 2.75rem)' }}
                >
                  What stops your best football coming out?
                </h2>
              </div>

              <div className="lg:col-span-7 space-y-4 text-[16.5px] text-zinc-400 leading-[1.75]">
                <p className="text-lg font-semibold text-[#f4f4f5]">Sometimes it&apos;s pressure.</p>
                <p>
                  Sometimes it&apos;s a mistake, a missed chance, a bad decision or something the
                  referee has done.
                </p>
                <p>
                  Sometimes your mind has gone to what happens if you lose the ball, whether
                  you&apos;re going to start next week, or you&apos;re trying too hard to make
                  something happen.
                </p>
                <p>
                  And sometimes you&apos;re simply trying to consciously control parts of your game
                  that you&apos;ve spent years learning to do automatically.
                </p>
              </div>
            </div>

            {/* Aligned 3-Column Progression */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
              {/* Act I: Red Brain */}
              <TactileSurface className="p-8 sm:p-10 h-full flex flex-col">
                <div className="flex items-center justify-between mb-5 pb-4 border-b border-white/[0.07]">
                  <h3 className="text-xl font-bold text-[#f4f4f5] tracking-tight">Red Brain</h3>
                  <span className="text-xs font-semibold tracking-[0.14em] text-zinc-500">01</span>
                </div>
                <div className="space-y-4 text-[15.5px] text-zinc-400 leading-[1.75]">
                  <p className="text-[#d4d4d8] font-medium">
                    Your Red Brain isn&apos;t something we&apos;re trying to get rid of.
                  </p>
                  <p className="text-[#f4f4f5] font-semibold">
                    But we don&apos;t want it in control.
                  </p>
                  <p>
                    Left in control, anger can become frustration. Nerves can become anxiety.
                    Thinking can become overthinking. Pressure can make you rush, hesitate, force
                    things or play safe.
                  </p>
                  <p>
                    But those same raw ingredients can be incredibly useful when they&apos;re
                    controlled in the right way.
                  </p>
                </div>
              </TactileSurface>

              {/* Act II: Green Brain */}
              <TactileSurface className="p-8 sm:p-10 h-full flex flex-col">
                <div className="flex items-center justify-between mb-5 pb-4 border-b border-white/[0.07]">
                  <h3 className="text-xl font-bold text-[#f4f4f5] tracking-tight">Green Brain</h3>
                  <span className="text-xs font-semibold tracking-[0.14em] text-zinc-500">02</span>
                </div>
                <div className="space-y-4 text-[15.5px] text-zinc-400 leading-[1.75]">
                  <p className="text-[#f4f4f5] font-medium">
                    This is where your Green Brain comes in.
                  </p>
                  <p>
                    Your Green Brain keeps you present and puts your attention onto the things you
                    can control.
                  </p>
                  <p>
                    And rather than allowing Red Brain to take over, Green Brain takes control of
                    what Red Brain gives you.
                  </p>
                  <p className="text-[#d4d4d8] font-medium">
                    Anger can become aggression and intensity. Nerves and anxiety can become
                    sharpness, awareness and energy.
                  </p>
                  <p>
                    You&apos;re not trying to become emotionless or completely calm. You&apos;re
                    using what you&apos;ve got.
                  </p>
                </div>
              </TactileSurface>

              {/* Act III: Blue Performance State */}
              <TactileSurface
                sheenTone="blue"
                className="p-8 sm:p-10 h-full flex flex-col border-[#008BCE]/35"
              >
                <div className="flex items-center justify-between mb-5 pb-4 border-b border-[#008BCE]/25">
                  <h3 className="text-xl font-bold text-[#69E0FA] tracking-tight">
                    Blue Performance State
                  </h3>
                  <span className="text-xs font-semibold tracking-[0.14em] text-[#69E0FA]">03</span>
                </div>
                <div className="space-y-4 text-[15.5px] text-zinc-400 leading-[1.75] flex-1 flex flex-col justify-between">
                  <div className="space-y-4">
                    <p>
                      When Green Brain is in control and those raw ingredients from Red Brain are
                      working for you rather than against you, you create your{' '}
                      <strong className="text-[#f4f4f5] font-semibold">
                        Blue Performance State
                      </strong>
                      .
                    </p>
                    <p className="text-[#f4f4f5] font-semibold">
                      Your mind is clear. You&apos;re present.
                    </p>
                    <p>
                      You&apos;re seeing, reacting and deciding rather than consciously trying to
                      control your football.
                    </p>
                  </div>
                  <p className="text-xl font-bold text-[#69E0FA] pt-4 border-t border-white/[0.07] tracking-tight">
                    Your football takes over.
                  </p>
                </div>
              </TactileSurface>
            </div>
          </div>
        </section>

        {/* ===================================================================
            EDITORIAL MOMENT | FABIO CARVALHO
            Pure #000000 background matching the monochrome portrait.
        =================================================================== */}
        <section className="relative bg-[#000000] text-[#f4f4f5] border-b border-white/[0.07] overflow-hidden">
          <div className="max-w-[1320px] mx-auto px-6 sm:px-12 lg:px-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-8">
              <div className="lg:col-span-6">
                <img
                  src="/assets/topform-fabio-editorial-bw.jpg"
                  alt="Fabio Carvalho"
                  loading="lazy"
                  className="w-full h-auto object-cover block"
                />
              </div>

              <div className="lg:col-span-6 py-12 lg:py-20">
                <blockquote
                  className="font-medium text-[#f4f4f5] leading-[1.5] tracking-tight"
                  style={{ fontSize: 'clamp(1.25rem, 2vw, 1.65rem)' }}
                >
                  &ldquo;Working with Mark on the mental side of my game and understanding how to
                  get into my Blue Performance State has allowed me to play with a clear mind and
                  let my best football come out consistently on the pitch.&rdquo;
                </blockquote>
                <p className="text-sm text-zinc-400 mt-6 tracking-[0.02em]">Fabio Carvalho</p>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================================
            05 | BESPOKE OFF-PITCH TRAINING
            Clean 12-column header + aligned 3-column positional triptych.
        =================================================================== */}
        <section className="bg-[#0c0d0e] text-[#f4f4f5] py-24 sm:py-36 border-b border-white/[0.07]">
          <div className="max-w-[1320px] mx-auto px-6 sm:px-12 lg:px-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start mb-16 sm:mb-20">
              <div className="lg:col-span-5">
                <h2
                  className="font-bold text-[#f4f4f5] leading-[1.12] tracking-tight"
                  style={{ fontSize: 'clamp(1.9rem, 3.2vw, 2.75rem)' }}
                >
                  Work on your game — even when you&apos;re not on the pitch.
                </h2>
              </div>

              <div className="lg:col-span-7 space-y-4 text-[16.5px] text-zinc-400 leading-[1.75]">
                <p className="text-lg font-semibold text-[#f4f4f5]">
                  There&apos;s only so much physical training you can do.
                </p>
                <p>
                  Your club controls your training load. You have matches to play, recovery to
                  manage and a body that needs to be ready to perform.
                </p>
                <p>But that doesn&apos;t mean you have to stop working on your game.</p>
                <p className="font-semibold text-[#d4d4d8]">
                  Through bespoke Off-Pitch Training, we take the situations that matter to your
                  football and deliberately rehearse them.
                </p>
              </div>
            </div>

            {/* Positional Triptych */}
            <div className="pt-12 border-t border-white/[0.07]">
              <h3 className="text-xl sm:text-2xl font-bold text-[#f4f4f5] tracking-tight mb-10">
                Your position. Your game. Your situations.
              </h3>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
                <TactileSurface className="p-8 sm:p-10 h-full">
                  <span className="text-xs font-semibold tracking-[0.14em] text-zinc-500 block mb-4">
                    01
                  </span>
                  <p className="text-[16px] text-zinc-400 leading-[1.75]">
                    <strong className="font-semibold text-[#f4f4f5]">
                      If you&apos;re a striker,
                    </strong>{' '}
                    we might rehearse the movement you&apos;re working on with your striker coach.
                    Attacking a particular type of cross. Creating separation from a centre-back. A
                    1v1 with the goalkeeper. Or what you do immediately after missing a chance.
                  </p>
                </TactileSurface>

                <TactileSurface className="p-8 sm:p-10 h-full">
                  <span className="text-xs font-semibold tracking-[0.14em] text-zinc-500 block mb-4">
                    02
                  </span>
                  <p className="text-[16px] text-zinc-400 leading-[1.75]">
                    <strong className="font-semibold text-[#f4f4f5]">
                      If you&apos;re a midfielder,
                    </strong>{' '}
                    it might be scanning before you receive, recognising where the pressure is
                    coming from, receiving on the half-turn or seeing the next pass earlier.
                  </p>
                </TactileSurface>

                <TactileSurface className="p-8 sm:p-10 h-full">
                  <span className="text-xs font-semibold tracking-[0.14em] text-zinc-500 block mb-4">
                    03
                  </span>
                  <p className="text-[16px] text-zinc-400 leading-[1.75]">
                    <strong className="font-semibold text-[#f4f4f5]">
                      If you&apos;re a defender,
                    </strong>{' '}
                    it might be decision-making, breaking lines, stepping in with the ball, playing
                    more effective diagonal passes, 1v1 defending, leadership or composure.
                  </p>
                </TactileSurface>
              </div>

              <p className="mt-12 text-lg text-zinc-400 leading-[1.7]">
                And next week it could be something completely different.{' '}
                <strong className="font-semibold text-[#f4f4f5]">
                  Because the work changes as your football changes.
                </strong>
              </p>
            </div>
          </div>
        </section>

        {/* ===================================================================
            06 | PLAYER PROOF — BIM PEPPLE
            Full-width monochrome stadium tunnel photograph with:
            “IT'S JUST LIKE PRACTISING.” and Bim's name.
        =================================================================== */}
        <section
          onClick={() => setBimVideoOpen(true)}
          className="relative w-full min-h-[78vh] bg-[#000000] text-[#f4f4f5] flex items-center overflow-hidden cursor-pointer group border-b border-white/[0.07]"
          title="Click to watch Bim Pepple's press conference"
        >
          <img
            src="/assets/topform-monochrome-tunnel.jpg"
            alt="Bim Pepple — It's just like practising"
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-1000 group-hover:scale-[1.015]"
          />

          <div className="relative z-10 max-w-[1320px] w-full mx-auto px-6 sm:px-12 lg:px-16 py-24">
            <div className="max-w-[540px]">
              <h2
                className="font-bold text-[#ffffff] leading-[1.05] tracking-tight"
                style={{ fontSize: 'clamp(2.2rem, 4.4vw, 3.75rem)' }}
              >
                &ldquo;IT&apos;S JUST LIKE PRACTISING.&rdquo;
              </h2>

              <p className="mt-6 text-base sm:text-lg text-zinc-300 font-normal leading-[1.6] max-w-[420px]">
                &ldquo;When you are in that position on the pitch, it feels like you&apos;ve been
                there before.&rdquo;
              </p>

              <p className="mt-5 text-sm text-[#ffffff]/85 font-medium tracking-[0.02em]">
                Bim Pepple
              </p>

              <span className="inline-block mt-8 text-[11px] uppercase tracking-[0.14em] text-zinc-400 group-hover:text-[#ffffff] border-b border-white/25 group-hover:border-[#008BCE] pb-1 transition-colors">
                Watch press conference
              </span>
            </div>
          </div>
        </section>

        {/* ===================================================================
            07 | THE ONGOING WORK & 08 | WORKING WITH YOUR COACHING
            Balanced 12-column two-part architectural spread.
        =================================================================== */}
        <section className="bg-[#0c0d0e] text-[#f4f4f5] py-24 sm:py-36 border-b border-white/[0.07]">
          <div className="max-w-[1320px] mx-auto px-6 sm:px-12 lg:px-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
              {/* 07 | Your football decides what we work on */}
              <div className="lg:col-span-6">
                <h2
                  className="font-bold text-[#f4f4f5] leading-[1.12] tracking-tight mb-8"
                  style={{ fontSize: 'clamp(1.85rem, 3vw, 2.55rem)' }}
                >
                  Your football decides what we work on.
                </h2>

                <div className="space-y-4 text-[16px] text-zinc-400 leading-[1.75]">
                  <p>
                    Every time we work together, we look at what&apos;s actually happening in your
                    football.
                  </p>

                  <ul className="space-y-2.5 py-3">
                    {[
                      "What's going well?",
                      'What could be better?',
                      'What are you working on with your coaches?',
                      'What keeps appearing in training or matches?',
                      'What do you want to improve?',
                    ].map((q) => (
                      <li
                        key={q}
                        className="flex items-center gap-3.5 text-[#f4f4f5] font-semibold"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#008BCE] shrink-0" />
                        <span>{q}</span>
                      </li>
                    ))}
                  </ul>

                  <p className="font-semibold text-[#f4f4f5]">
                    Then we decide what will make the biggest difference to your game — and we work
                    on it.
                  </p>
                  <p>
                    It might be something that happened in your last match. Something you&apos;re
                    working on in training. Something your coach wants from you. A situation that
                    keeps appearing. Or simply something you want to add to your game.
                  </p>
                  <p>
                    We can then turn that into bespoke Off-Pitch Training — deliberately rehearsing
                    the situations that matter to you.
                  </p>
                  <p>And as your football changes, the work changes with it.</p>
                  <p className="font-medium text-[#d4d4d8]">
                    The better I understand you, your game, your position and the situations you
                    face, the more specific the work becomes.
                  </p>
                </div>
              </div>

              {/* 08 | Your coaches are working on your game. So are we. */}
              <div className="lg:col-span-6">
                <TactileSurface className="p-8 sm:p-12">
                  <h2
                    className="font-bold text-[#f4f4f5] leading-[1.12] tracking-tight mb-8"
                    style={{ fontSize: 'clamp(1.75rem, 2.8vw, 2.35rem)' }}
                  >
                    Your coaches are working on your game.
                    <span className="block mt-1 text-[#d4d4d8]">So are we.</span>
                  </h2>

                  <div className="space-y-4 text-[16px] text-zinc-400 leading-[1.75]">
                    <p>
                      If your striker coach is working with you on making a particular movement, we
                      can rehearse it.
                    </p>
                    <p>
                      If your manager wants something different from you tactically, we can work on
                      recognising those situations.
                    </p>
                    <p>
                      If you&apos;ve been doing something on the training pitch that isn&apos;t
                      quite appearing naturally in matches yet, we can work on that too.
                    </p>
                    <p className="pt-4 border-t border-white/[0.07] text-lg font-semibold text-[#f4f4f5]">
                      You work on it with your coaches on the pitch. We can deliberately rehearse it
                      off the pitch.
                    </p>
                  </div>
                </TactileSurface>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================================
            09 | PLAYER PROOF — EMILIANO MARCONDES
            12-column editorial spread with a properly proportioned 4:5 portrait.
        =================================================================== */}
        <section className="bg-[#111316] text-[#f4f4f5] py-24 sm:py-32 border-b border-white/[0.07]">
          <div className="max-w-[1320px] mx-auto px-6 sm:px-12 lg:px-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              <div className="lg:col-span-7">
                <h2
                  className="font-bold text-[#f4f4f5] leading-[1.08] tracking-tight mb-8"
                  style={{ fontSize: 'clamp(1.85rem, 3.2vw, 2.65rem)' }}
                >
                  &ldquo;IT HAS DEFINITELY IMPROVED ME AS A PLAYER.&rdquo;
                </h2>

                <blockquote className="text-lg sm:text-xl text-zinc-300 font-normal leading-[1.65] mb-6 max-w-[580px]">
                  &ldquo;Mark and I have been working together for a few years, working on the
                  psychological part of my game and building good habits and focus points for each
                  game. It has definitely improved me as a player.&rdquo;
                </blockquote>

                <p className="text-sm text-zinc-400 tracking-[0.02em]">Emiliano Marcondes</p>
              </div>

              <div className="lg:col-span-5">
                <div className="bg-[#000000] border border-white/[0.08] overflow-hidden">
                  <img
                    src="/assets/topform-portrait-intense.jpg"
                    alt="TOPFORM Monochrome Portrait"
                    loading="lazy"
                    className="w-full aspect-[4/5] object-cover object-center block"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================================
            10 | CAREER JOURNEYS ("THE STORY IS THE DESIGN")
            Architectural editorial chapters separated by crisp 1px hairlines.
            Left 5 cols: Two-line career transformation headline.
            Right 7 cols: Starting point & career trajectory side-by-side.
        =================================================================== */}
        <section className="bg-[#0c0d0e] text-[#f4f4f5] py-24 sm:py-36 border-b border-white/[0.07]">
          <div className="max-w-[1320px] mx-auto px-6 sm:px-12 lg:px-16">
            {/* Section Introduction */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start mb-20">
              <div className="lg:col-span-5">
                <h2
                  className="font-bold text-[#f4f4f5] leading-[1.12] tracking-tight"
                  style={{ fontSize: 'clamp(1.95rem, 3.4vw, 2.85rem)' }}
                >
                  Where they started.
                  <span className="block mt-1 text-[#d4d4d8]">Where their football took them.</span>
                </h2>
              </div>

              <div className="lg:col-span-7 space-y-3 text-[16.5px] text-zinc-400 leading-[1.75]">
                <p className="font-semibold text-[#f4f4f5]">
                  Every player&apos;s journey is different.
                </p>
                <p>
                  The following players came to me at very different points in their careers, with
                  very different challenges.
                </p>
                <p>
                  This is where they were when we started working together — and where their careers
                  went next.
                </p>
              </div>
            </div>

            {/* Four Architectural Story Chapters */}
            <div className="divide-y divide-white/[0.08] border-t border-b border-white/[0.08]">
              {CAREER_STORIES.map((story) => (
                <article
                  key={story.id}
                  className="py-12 sm:py-16 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start"
                >
                  {/* Left: Story Headline */}
                  <div className="lg:col-span-5">
                    <span className="text-xs font-semibold tracking-[0.16em] text-zinc-500 block mb-3">
                      {story.index}
                    </span>
                    <h3
                      className="font-bold text-[#f4f4f5] leading-[1.1] tracking-tight"
                      style={{ fontSize: 'clamp(1.45rem, 2.3vw, 2rem)' }}
                    >
                      <span className="block">{story.headlineLine1}</span>
                      <span className="block mt-1.5 text-[#d4d4d8]">{story.headlineLine2}</span>
                    </h3>
                  </div>

                  {/* Right: Starting Point & Career Trajectory */}
                  <div className="lg:col-span-7">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-[15.5px] text-zinc-400 leading-[1.75]">
                      <div className="space-y-2.5">
                        <p className="text-[11px] font-semibold tracking-[0.12em] uppercase text-zinc-500">
                          When we started working together
                        </p>
                        {story.whenWeStarted.map((line) => (
                          <p key={line}>{line}</p>
                        ))}
                      </div>

                      <div className="space-y-2.5">
                        <p className="text-[11px] font-semibold tracking-[0.12em] uppercase text-zinc-500">
                          Where his career went
                        </p>
                        {story.whereItWentIntro && <p>{story.whereItWentIntro}</p>}
                        {story.whereItWentBullets && (
                          <ul className="space-y-2 py-1">
                            {story.whereItWentBullets.map((b) => (
                              <li
                                key={b}
                                className="flex items-center gap-3 font-semibold text-[#f4f4f5]"
                              >
                                <span className="w-1.5 h-1.5 rounded-full bg-[#008BCE] shrink-0" />
                                <span>{b}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                        {story.whereItWentBody && <p>{story.whereItWentBody}</p>}
                      </div>
                    </div>

                    <p className="mt-6 pt-5 border-t border-white/[0.06] text-[15.5px] font-semibold text-[#f4f4f5]">
                      {story.summaryLine}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ===================================================================
            11 | WHY TOPFORM & 12 | WHO IT'S FOR
            12-column editorial layout pairing Mark Bowden's portrait & essay
            with "You don't need to be struggling to get better."
        =================================================================== */}
        <section className="bg-[#111316] text-[#f4f4f5] py-24 sm:py-36 border-b border-white/[0.07]">
          <div className="max-w-[1320px] mx-auto px-6 sm:px-12 lg:px-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
              {/* 11 | Why I built TOPFORM */}
              <div className="lg:col-span-6">
                <h2
                  className="font-bold text-[#f4f4f5] leading-[1.12] tracking-tight mb-8"
                  style={{ fontSize: 'clamp(1.85rem, 3vw, 2.55rem)' }}
                >
                  Why I built TOPFORM.
                </h2>

                <div className="space-y-4 text-[16px] text-zinc-400 leading-[1.75]">
                  <p>
                    I&apos;ve spent years working with professional footballers and trying to
                    understand one thing:
                  </p>
                  <p className="text-lg font-semibold text-[#f4f4f5] py-1 tracking-tight">
                    What allows a player&apos;s best football to come out consistently?
                  </p>
                  <p>
                    That question led to the ideas I first explored in{' '}
                    <em className="font-medium text-[#d4d4d8]">Use Your Brain, Raise Your Game</em>{' '}
                    — Red Brain, Green Brain and eventually the Blue Performance State.
                  </p>
                  <p>
                    But the longer I&apos;ve worked with players, the more the work has evolved.
                  </p>
                  <p>
                    It isn&apos;t only about helping a player bring out the football they already
                    have.
                  </p>
                  <p className="font-semibold text-[#f4f4f5]">
                    It&apos;s also about helping them develop the football they have.
                  </p>
                  <p>That&apos;s what TOPFORM has become.</p>
                  <p className="font-medium text-[#d4d4d8]">
                    Helping you play consistently at your best — while continually working to make
                    your best even better.
                  </p>
                </div>

                <div className="mt-8 flex items-center gap-4 pt-6 border-t border-white/[0.08]">
                  <img
                    src="/assets/topform-mark-bowden.jpg"
                    alt="Mark Bowden"
                    loading="lazy"
                    className="w-14 h-14 object-cover grayscale border border-white/10"
                  />
                  <div>
                    <div className="text-sm font-bold text-[#f4f4f5]">Mark Bowden</div>
                    <div className="text-xs text-zinc-400">Founder, TOPFORM</div>
                  </div>
                </div>
              </div>

              {/* 12 | You don't need to be struggling to get better */}
              <div className="lg:col-span-6">
                <TactileSurface className="p-8 sm:p-12">
                  <h2
                    className="font-bold text-[#f4f4f5] leading-[1.12] tracking-tight mb-6"
                    style={{ fontSize: 'clamp(1.75rem, 2.8vw, 2.35rem)' }}
                  >
                    You don&apos;t need to be struggling to get better.
                  </h2>

                  <div className="space-y-4 text-[16px] text-zinc-400 leading-[1.75]">
                    <p>
                      TOPFORM is for professional footballers who are serious about getting
                      everything they can from their ability — and continuing to improve it.
                    </p>

                    <ul className="space-y-2.5 py-2">
                      {[
                        "You don't need to be struggling.",
                        "You don't need to have lost confidence.",
                        "You don't need to be out of form.",
                      ].map((item) => (
                        <li
                          key={item}
                          className="flex items-center gap-3.5 text-[#f4f4f5] font-semibold"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-[#008BCE] shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>

                    <p>
                      You can be playing some of the best football of your career and still want
                      more.
                    </p>
                    <p className="text-lg font-semibold text-[#f4f4f5] py-1 tracking-tight">
                      How do I keep this coming out?
                      <span className="block mt-1">And how do I get even better?</span>
                    </p>
                    <p className="font-semibold text-[#d4d4d8]">
                      That&apos;s what TOPFORM is built around.
                    </p>
                  </div>
                </TactileSurface>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================================
            13 | WORKING TOGETHER & 14 | FINAL CLOSE
            Balanced 12-column closing spread.
        =================================================================== */}
        <section className="bg-[#0c0d0e] text-[#f4f4f5] py-24 sm:py-36">
          <div className="max-w-[1320px] mx-auto px-6 sm:px-12 lg:px-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-stretch">
              {/* 13 | Private. Bespoke. Built around your football. */}
              <div className="lg:col-span-6">
                <TactileSurface className="p-8 sm:p-12 h-full flex flex-col justify-between">
                  <div>
                    <h2
                      className="font-bold text-[#f4f4f5] leading-[1.12] tracking-tight mb-6"
                      style={{ fontSize: 'clamp(1.8rem, 2.8vw, 2.4rem)' }}
                    >
                      Private. Bespoke.
                      <span className="block mt-1 text-[#d4d4d8]">Built around your football.</span>
                    </h2>

                    <div className="space-y-4 text-[16px] text-zinc-400 leading-[1.75]">
                      <p className="font-semibold text-[#f4f4f5]">
                        I work personally with a limited number of professional footballers at any
                        one time.
                      </p>
                      <p>
                        Our work is ongoing and built around you, your football and what you want to
                        achieve.
                      </p>
                      <p>
                        We&apos;ll work together privately through regular 1-to-1 sessions, with
                        prescribed training and bespoke Off-Pitch Training to continue the work
                        between our sessions.
                      </p>
                      <p className="font-medium text-[#d4d4d8]">
                        The better I understand your game, the more specific our work can become.
                      </p>
                    </div>
                  </div>

                  <div className="pt-8 mt-8 border-t border-white/[0.07]">
                    <TactileButton
                      href={getWhatsAppUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="alabaster"
                    >
                      WORK WITH MARK
                    </TactileButton>
                    <p className="text-xs text-zinc-500 mt-3">
                      Opens a private WhatsApp conversation with Mark.
                    </p>
                  </div>
                </TactileSurface>
              </div>

              {/* 14 | Final Close */}
              <div className="lg:col-span-6">
                <TactileSurface className="p-8 sm:p-12 h-full flex flex-col justify-between">
                  <div>
                    <img
                      src="/assets/topform-logo-white-clean.png"
                      alt="TOPFORM — Play at your best. Make your best better."
                      loading="lazy"
                      className="w-36 h-auto mb-8 opacity-95"
                    />

                    <h2
                      className="font-bold text-[#f4f4f5] leading-[1.12] tracking-tight mb-6"
                      style={{ fontSize: 'clamp(1.8rem, 2.8vw, 2.4rem)' }}
                    >
                      How good can you become?
                    </h2>

                    <div className="space-y-3 text-[16.5px] text-zinc-400 leading-[1.75]">
                      <p>You&apos;ve spent years building your game.</p>
                      <p className="font-semibold text-[#f4f4f5]">
                        There&apos;s the player you are today.
                      </p>
                      <p className="font-semibold text-[#f4f4f5]">
                        And there&apos;s the player you can still become.
                      </p>
                      <p>TOPFORM is built to help you get the best from both.</p>
                    </div>

                    <p className="text-base sm:text-lg text-zinc-300 mt-6 tracking-tight">
                      Play consistently at your best.{' '}
                      <strong className="font-bold text-[#f4f4f5]">
                        Make your best even better.
                      </strong>
                    </p>
                  </div>

                  <div className="pt-8 mt-8 border-t border-white/[0.07]">
                    <TactileButton
                      href={getWhatsAppUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="alabaster"
                    >
                      WORK WITH MARK
                    </TactileButton>
                    <p className="text-xs text-zinc-500 mt-3">
                      Opens a private WhatsApp conversation with Mark.
                    </p>
                  </div>
                </TactileSurface>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* =====================================================================
          COLOPHON / FOOTER
      ===================================================================== */}
      <footer className="relative z-10 bg-[#000000] text-[#f4f4f5] border-t-[2px] border-[#008BCE] py-12">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-12 lg:px-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
          <div className="flex items-center gap-4">
            <img
              src="/assets/topform-roundel-white.png"
              alt="TOPFORM"
              loading="lazy"
              className="w-9 h-9 object-contain"
            />
            <div>
              <span className="text-base font-bold tracking-[0.06em] text-[#f4f4f5] block leading-none">
                TOPFORM
              </span>
              <span className="text-[9px] text-zinc-400 tracking-[0.04em] block mt-1">
                PLAY AT YOUR BEST.{' '}
                <strong className="font-bold text-[#f4f4f5]">MAKE YOUR BEST BETTER.</strong>
              </span>
            </div>
          </div>

          <div className="text-xs text-zinc-400 sm:text-right space-y-1">
            <div className="text-[#f4f4f5] font-medium">Mark Bowden</div>
            <div>07575 203332 &nbsp;·&nbsp; mark@topform.global &nbsp;·&nbsp; www.topform.global</div>
          </div>
        </div>
      </footer>

      {/* =====================================================================
          BIM PEPPLE PRESS CONFERENCE VIDEO OVERLAY
      ===================================================================== */}
      {bimVideoOpen && (
        <div
          className="fixed inset-0 z-50 bg-[#000000]/95 backdrop-blur-md flex items-center justify-center p-6"
          onClick={() => setBimVideoOpen(false)}
        >
          <div className="w-full max-w-[340px]" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between pb-3 text-xs text-zinc-400">
              <span>Bim Pepple</span>
              <button
                type="button"
                onClick={() => setBimVideoOpen(false)}
                className="text-[#f4f4f5] hover:underline cursor-pointer"
              >
                Close
              </button>
            </div>
            <div className="relative w-full aspect-[9/16] bg-[#000000] border border-white/10">
              <iframe
                src={BIM_PEPPLE_VIMEO_EMBED}
                className="absolute inset-0 w-full h-full"
                frameBorder="0"
                allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                title="Bim Pepple Press Conference"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TopformSite;
