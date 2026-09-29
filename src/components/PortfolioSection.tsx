import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ShieldCheck } from 'lucide-react';

interface PortfolioSectionProps {
  onOpenDemo: (prefillEmail?: string, tier?: string) => void;
}

const PORTFOLIO_ITEMS = [
  {
    id: 'fintech-vault',
    title: 'Fintech Mobile App',
    category: 'UI/UX Design',
    securityOutcome: 'Biometric Zero-Trust & +64% Qualified Demo Lift',
    description:
      'Redesigned the institutional onboarding and cryptographic key-signing experience for a Tier-1 digital asset custodian.',
    image: '/portfolio1.png',
    alt: 'Fintech Mobile App UI/UX Design with Zero-Trust biometric verification',
    colSpan: 'md:col-span-1',
  },
  {
    id: 'soc-analytics',
    title: 'Analytics Dashboard',
    category: 'Product Design',
    securityOutcome: '89% Faster Incident Triage & MITRE ATT&CK Graph',
    description:
      'Consolidated 14 disparate cloud telemetry streams into a unified, sub-second autonomous SecOps command surface.',
    image: '/portfolio2.png',
    alt: 'Autonomous SOC Analytics Dashboard Product Design',
    colSpan: 'md:col-span-1',
  },
  {
    id: 'luxury-ecommerce',
    title: 'Luxury E-commerce',
    category: 'Web Development',
    securityOutcome: '1.4M Req/s Bot Mitigation & 99.998% Global Edge SLA',
    description:
      'Engineered a high-concurrency headless commerce flagship protected by invisible edge behavioral WAF and zero-latency checkout.',
    image: '/portfolio3.png',
    alt: 'Luxury E-commerce Web Development and Global Edge Perimeter Shield',
    colSpan: 'md:col-span-2',
  },
];

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({
  onOpenDemo,
}) => {
  return (
    <section
      id="work"
      aria-labelledby="work-heading"
      className="bg-black text-white py-32 px-6 md:px-12 relative z-10"
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8, ease: [0.2, 0.65, 0.3, 0.9] }}
        className="max-w-7xl mx-auto"
      >
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <span className="text-xs font-black uppercase tracking-[0.25em] text-[#5fb9ff] block mb-3">
              PROVEN ENTERPRISE IMPACT // 03
            </span>
            <h2
              id="work-heading"
              className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white"
            >
              Selected Work &amp; Case Studies
            </h2>
          </div>

          <button
            type="button"
            onClick={() => onOpenDemo('', 'Custom Architecture Review')}
            className="self-start md:self-auto inline-flex items-center gap-2 rounded-full border border-white/25 hover:border-[#5fb9ff] px-5 py-3 text-xs md:text-sm font-bold text-white hover:text-[#5fb9ff] transition-colors cursor-pointer"
          >
            <span>Request Full Case Study Deck</span>
            <ArrowUpRight className="h-4 w-4" />
          </button>
        </div>

        {/* Asymmetric Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {PORTFOLIO_ITEMS.map((item, idx) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{
                duration: 0.8,
                delay: idx * 0.2,
                ease: 'easeOut',
              }}
              onClick={() => onOpenDemo('', item.title)}
              className={`${item.colSpan} group relative rounded-3xl overflow-hidden border border-white/15 bg-gray-900 cursor-pointer`}
            >
              <img
                src={item.image}
                alt={item.alt}
                loading="lazy"
                className={`w-full ${
                  item.colSpan === 'md:col-span-2'
                    ? 'h-[380px] md:h-[460px]'
                    : 'h-[360px] md:h-[420px]'
                } object-cover transition-transform duration-700 ease-out group-hover:scale-105`}
              />

              {/* Dark Overlay that fades on hover while sliding text up */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/55 to-black/20 group-hover:via-black/35 transition-opacity duration-500 flex flex-col justify-between p-8 md:p-10">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-black/65 backdrop-blur-md border border-white/20 px-3.5 py-1.5 text-xs font-bold text-[#5fb9ff]">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    <span>{item.securityOutcome}</span>
                  </span>

                  <span className="h-10 w-10 rounded-full bg-white/15 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-[#1676d1] transition-colors">
                    <ArrowUpRight className="h-5 w-5" />
                  </span>
                </div>

                <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                  <span className="text-xs font-extrabold uppercase tracking-widest text-sky-300 block mb-2">
                    {item.category}
                  </span>
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm md:text-base text-gray-300 font-medium max-w-2xl leading-relaxed opacity-90 group-hover:opacity-100 transition-opacity">
                    {item.description}
                  </p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </motion.div>
    </section>
  );
};
