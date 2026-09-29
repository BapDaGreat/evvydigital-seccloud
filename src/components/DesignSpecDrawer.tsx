import React, { useEffect, useRef, useState } from 'react';
import {
  X,
  Layers,
  Target,
  LayoutGrid,
  Palette,
  Lightbulb,
  CheckCircle2,
} from 'lucide-react';

interface DesignSpecDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

type SpecTab = 'framing' | 'ia' | 'specs' | 'rationale';

export const DesignSpecDrawer: React.FC<DesignSpecDrawerProps> = ({
  isOpen,
  onClose,
}) => {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const [activeTab, setActiveTab] = useState<SpecTab>('framing');

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (isOpen) {
      if (!dialog.open) dialog.showModal();
    } else if (dialog.open) {
      dialog.close();
    }
  }, [isOpen]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleNativeClose = () => onClose();
    const handleBackdropClick = (event: MouseEvent) => {
      if (event.target !== dialog) return;
      const rect = dialog.getBoundingClientRect();
      const inside =
        rect.top <= event.clientY &&
        event.clientY <= rect.top + rect.height &&
        rect.left <= event.clientX &&
        event.clientX <= rect.left + rect.width;
      if (!inside) dialog.close();
    };

    dialog.addEventListener('close', handleNativeClose);
    if (!('closedBy' in HTMLDialogElement.prototype)) {
      dialog.addEventListener('click', handleBackdropClick);
    }
    return () => {
      dialog.removeEventListener('close', handleNativeClose);
      dialog.removeEventListener('click', handleBackdropClick);
    };
  }, [onClose]);

  return (
    <dialog
      ref={dialogRef}
      closedby="any"
      aria-labelledby="spec-dialog-title"
      className="m-auto w-[95%] max-w-5xl max-h-[88vh] rounded-3xl bg-gray-950 text-white border border-white/20 p-0 shadow-2xl overflow-hidden flex flex-col"
    >
      {/* Header */}
      <div className="p-6 sm:p-8 border-b border-white/10 flex items-start justify-between gap-4 bg-black/60">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-[#5fb9ff] mb-1.5">
            <Layers className="h-4 w-4" />
            <span>SENIOR DIGITAL PRODUCT &amp; WEB UI/UX DESIGNER DELIVERABLE</span>
          </div>
          <h2
            id="spec-dialog-title"
            className="text-2xl sm:text-3xl font-black tracking-tight text-white"
          >
            B2B Cybersecurity SaaS Homepage Redesign — IA &amp; UX Specification
          </h2>
        </div>

        <button
          type="button"
          onClick={onClose}
          aria-label="Close UX Specification"
          className="p-2 rounded-full bg-white/10 text-gray-300 hover:text-white hover:bg-white/20 transition-colors cursor-pointer"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Tab Navigation */}
      <div className="px-6 sm:px-8 py-3 bg-white/[0.03] border-b border-white/10 flex flex-wrap gap-2">
        {[
          { id: 'framing', label: '1. Strategic Framing', icon: Target },
          { id: 'ia', label: '2. IA & Page Structure', icon: LayoutGrid },
          { id: 'specs', label: '3. Visual & Component Specs', icon: Palette },
          { id: 'rationale', label: '4. Design Rationale', icon: Lightbulb },
        ].map((t) => {
          const IconComp = t.icon;
          const active = activeTab === t.id;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => setActiveTab(t.id as SpecTab)}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                active
                  ? 'bg-[#1676d1] text-white shadow-md'
                  : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
              }`}
            >
              <IconComp className="h-4 w-4" />
              <span>{t.label}</span>
            </button>
          );
        })}
      </div>

      {/* Body Content */}
      <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-sm sm:text-base leading-relaxed text-gray-300">
        {activeTab === 'framing' && (
          <div className="space-y-6">
            <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6">
              <h3 className="text-xl font-black text-white mb-2">
                Primary Business Objective &amp; Conversion North Star
              </h3>
              <p>
                Increase qualified enterprise <strong>Demo Request Conversions (+35–50% target lift)</strong> while reinforcing CISO/CIO institutional trust. Traditional B2B cybersecurity sites suffer from dark red/black fear-mongering and 10-field gated forms that cause a 68%+ drop-off among senior evaluators.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  role: 'Economic Buyer (CISO / CIO)',
                  need: 'Board-level risk reduction, SOC2/ISO/FedRAMP compliance, vendor consolidation.',
                  solution:
                    'Above-the-fold Compliance Strip + Verified $4.2T Protected Telemetry & Bento Case Studies.',
                },
                {
                  role: 'Technical Evaluator (VP SecOps / Architect)',
                  need: 'Sub-second detection fidelity, eBPF kernel safety, zero-friction rollout.',
                  solution:
                    'Interactive Zero-Trust Telemetry Sandbox + 4-Stage 14-Day Deployment Pipeline.',
                },
                {
                  role: 'Hands-On Practitioner (Lead Security Engineer)',
                  need: 'Immediate product visibility without SDR gatekeeping.',
                  solution:
                    '1-Step Inline Work-Email Hero Capture + Instant Sandbox Provisioning Modal.',
                },
              ].map((persona) => (
                <div
                  key={persona.role}
                  className="rounded-2xl bg-black/60 border border-white/15 p-5 space-y-2"
                >
                  <div className="text-xs font-extrabold uppercase tracking-wider text-[#5fb9ff]">
                    TARGET PERSONA
                  </div>
                  <div className="text-base font-black text-white">
                    {persona.role}
                  </div>
                  <p className="text-xs text-gray-400">
                    <strong>Priorities:</strong> {persona.need}
                  </p>
                  <p className="text-xs text-emerald-300">
                    <strong>UX Solution:</strong> {persona.solution}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'ia' && (
          <div className="space-y-4">
            <p className="text-gray-300">
              The homepage follows a progressive 8-stage narrative arc that pairs
              high-contrast daylight clarity with dark editorial authority:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {[
                {
                  sec: 'Global Navbar & Left Scroll Rail',
                  desc: 'Full-bleed transparent header shrinks into a .liquid-glass pill on scroll (scrollY > 50) keeping "Request Demo" persistently reachable alongside a 2px vertical progress bar.',
                },
                {
                  sec: '01. Atmospheric Parallax Hero (Hero.tsx)',
                  desc: 'Multi-layered spring parallax (#0b4ea8 -> #5fb9ff) + kinetic H1 cycling ["INNOVATE", "REIMAGINE", "ELEVATE", "TRANSFORM"] + inline Work Email Demo Request bar & SOC2/ISO trust strip.',
                },
                {
                  sec: '02. Executive Authority & Live Sandbox (AboutSection.tsx)',
                  desc: 'Pure black surface presenting the "WHO WE ARE" thesis, 4 verified telemetry cards ($4.2T+ protected, <14ms isolation), and an interactive 3-node Zero-Trust Telemetry Sandbox.',
                },
                {
                  sec: '03. Core Capabilities (ContentSection.tsx)',
                  desc: 'Light gray-50 surface with alternating lg:flex-row / lg:flex-row-reverse deep dives into Digital Strategy, SecOps UI/UX Design, and Cloud-Native Web Development.',
                },
                {
                  sec: '04. Enterprise Case Studies (PortfolioSection.tsx)',
                  desc: 'Asymmetric Bento Grid (with 2-column flagship span) highlighting verified security & conversion outcomes across Fintech, SOC Analytics, and Global E-Commerce.',
                },
                {
                  sec: '05. 4-Stage Deployment Pipeline (ProcessSection.tsx)',
                  desc: '4-column desktop grid connected by a 2px horizontal conduit (01 Discovery -> 02 Prototyping -> 03 Engineering -> 04 QA & Launch) to eliminate implementation anxiety.',
                },
                {
                  sec: '06. The Studio Collective (StudioSection.tsx)',
                  desc: 'Humanizes the enterprise platform with 24+ Creatives, 15 Awards, SOC 2 Type II certification, and dual stacked grayscale-to-color hover photography.',
                },
                {
                  sec: '07 & 08. Threat Insights & Scroll-Scaled Footer',
                  desc: '3-column aspect-[4/3] research grid leading into the scroll-linked (scale 0.8 -> 1.0) "LET\'S TALK" super-display CTA.',
                },
              ].map((item) => (
                <div
                  key={item.sec}
                  className="rounded-2xl bg-white/[0.04] border border-white/10 p-4"
                >
                  <div className="font-black text-white text-sm mb-1">
                    {item.sec}
                  </div>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'specs' && (
          <div className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
                <h3 className="text-base font-black text-white mb-3">
                  Color &amp; Atmospheric Glass Tokens
                </h3>
                <ul className="space-y-2 text-xs text-gray-300">
                  <li>
                    • <strong>Hero Gradient:</strong>{' '}
                    <code>linear-gradient(180deg, #0b4ea8 0%, #1676d1 45%, #5fb9ff 100%)</code>
                  </li>
                  <li>
                    • <strong>Contrast Surfaces:</strong> Pure Black (<code>#000000</code>), Alabaster (<code>#f9fafb</code>), Pure White (<code>#ffffff</code>)
                  </li>
                  <li>
                    • <strong>Liquid Glass:</strong> <code>backdrop-filter: blur(24px)</code> with <code>rgba(255,255,255,0.3)</code> 1px specular border
                  </li>
                </ul>
              </div>

              <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
                <h3 className="text-base font-black text-white mb-3">
                  Typography &amp; Responsive Breakpoints
                </h3>
                <ul className="space-y-2 text-xs text-gray-300">
                  <li>
                    • <strong>Hero Display (H1):</strong> <code>clamp(4rem, 10vw, 10rem)</code>, weight 900, tracking <code>-0.04em</code>
                  </li>
                  <li>
                    • <strong>Footer Callout:</strong> <code>text-[12vw] md:text-[10vw] font-black</code> gradient clip
                  </li>
                  <li>
                    • <strong>Viewports:</strong> Desktop (<code>1440px/1280px max-w-7xl</code>), Tablet (<code>768px md:</code>), Mobile (<code>375px/390px</code>)
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'rationale' && (
          <div className="space-y-4">
            {[
              {
                title: '1. Daylight Architectural Clarity vs. Fear-Based Cyber Clichés',
                text: 'Opening with an expansive high-altitude sky-and-summit parallax (#0b4ea8 to #5fb9ff) establishes visual authority, openness, and perimeter visibility—immediately differentiating the brand from dated green/red hacker tropes.',
              },
              {
                title: '2. Dual-Path Micro-Commitment Demo Funnel',
                text: 'High-intent buyers convert immediately in the Hero’s 1-field Work Email capture pod, while methodical technical evaluators convert via contextual section walkthrough CTAs or the persistent .liquid-glass navbar pill.',
              },
              {
                title: '3. WCAG 2.1 AA Accessibility & Core Web Vitals Optimization',
                text: 'Uses semantic landmarks (<header>, <nav>, <main>, <section>, <footer>, <dialog closedby="any">), fetchpriority="high" on the primary Hero mountain LCP asset, loading="lazy" below the fold, and prefers-reduced-motion safeguards.',
              },
            ].map((r) => (
              <div
                key={r.title}
                className="rounded-2xl bg-white/[0.04] border border-white/10 p-5 flex items-start gap-3.5"
              >
                <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-black text-white text-base mb-1">
                    {r.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                    {r.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </dialog>
  );
};
