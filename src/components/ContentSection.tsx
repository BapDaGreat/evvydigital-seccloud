import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowUpRight, ShieldAlert, Layers, Code2 } from 'lucide-react';

interface ContentSectionProps {
  onOpenDemo: (prefillEmail?: string, tier?: string) => void;
}

const SERVICES_DATA = [
  {
    id: '01',
    title: 'Digital Strategy',
    subtitle: 'Enterprise Threat Intelligence & Conversion Architecture',
    description:
      'We align CISO-level security posture with high-velocity revenue growth. By combining deep market research, attack-surface analytics, and authoritative brand positioning, we eliminate buyer friction across complex enterprise sales cycles.',
    features: [
      'Market Research & Attack Surface Mapping',
      'Data Analytics & Breach Risk Quantification',
      'Brand Positioning & CISO Trust Architecture',
    ],
    metricBadge: '+48% Enterprise Demo Conversion Lift',
    image: `${import.meta.env.BASE_URL}service1.png`,
    alt: 'Digital Strategy and Enterprise Threat Intelligence telemetry dashboard',
    icon: ShieldAlert,
  },
  {
    id: '02',
    title: 'UI/UX Design',
    subtitle: 'Human-Centered SecOps Command & Design Systems',
    description:
      'Complex security data shouldn’t overwhelm analysts or executives. We design spatial, WCAG 2.1 AA compliant interfaces, interactive threat graphs, and modular design systems that turn millions of telemetry events into instant clarity.',
    features: [
      'Wireframing & Zero-Trust User Journeys',
      'Interactive SOC & Executive Dashboard Prototyping',
      'User Testing & Cognitive Load Optimization',
    ],
    metricBadge: '3.4x Faster Analyst Incident Triage',
    image: `${import.meta.env.BASE_URL}service2.png`,
    alt: 'UI/UX Design wireframing and SecOps command interface prototype',
    icon: Layers,
  },
  {
    id: '03',
    title: 'Web Development',
    subtitle: 'Hardened Cloud-Native Platforms & Edge Performance',
    description:
      'Engineered with React, Next.js, TypeScript, and distributed edge security. Our platforms deliver sub-second Core Web Vitals, headless CMS agility, and cryptographic zero-trust resilience at global enterprise scale.',
    features: [
      'React & Next.js Enterprise Web Applications',
      'Headless CMS & Hardened API Gateways',
      'Performance Optimization & Edge DDoS Mitigation',
    ],
    metricBadge: '99.998% Global Edge Uptime SLA',
    image: `${import.meta.env.BASE_URL}service3.png`,
    alt: 'Web Development with React, Next.js, and cloud-native security mesh',
    icon: Code2,
  },
];

export const ContentSection: React.FC<ContentSectionProps> = ({ onOpenDemo }) => {
  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="bg-gray-50 text-black py-32 px-6 md:px-12 relative z-10"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.2, 0.65, 0.3, 0.9] }}
          className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-gray-200"
        >
          <div>
            <span className="text-xs font-black uppercase tracking-[0.25em] text-[#0b4ea8] block mb-3">
              CORE CAPABILITIES // 02
            </span>
            <h2
              id="services-heading"
              className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-black"
            >
              Engineered for Trust &amp; Velocity.
            </h2>
          </div>
          <p className="text-gray-600 font-medium leading-relaxed max-w-md text-base md:text-lg">
            Every layer of our platform and agency practice is built to convert
            skeptical enterprise evaluators into long-term partners.
          </p>
        </motion.div>

        {/* Alternating Flex Rows */}
        <div className="flex flex-col gap-28">
          {SERVICES_DATA.map((service, idx) => {
            const isReversed = idx % 2 === 1;
            const IconComponent = service.icon;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.8, ease: [0.2, 0.65, 0.3, 0.9] }}
                className={`flex flex-col ${
                  isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row'
                } items-center gap-12 lg:gap-16`}
              >
                {/* Text Column (animates x: -50 or 50 to 0) */}
                <motion.div
                  initial={{ opacity: 0, x: isReversed ? 50 : -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.8, ease: [0.2, 0.65, 0.3, 0.9] }}
                  className="w-full lg:w-1/2"
                >
                  <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-[#0b4ea8] text-xs font-extrabold tracking-widest uppercase mb-5">
                    <IconComponent className="h-3.5 w-3.5" />
                    <span>
                      {service.id} // {service.subtitle}
                    </span>
                  </div>

                  <h3 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-gray-900 mb-5">
                    {service.title}
                  </h3>

                  <p className="text-gray-600 font-medium leading-relaxed text-base md:text-lg mb-8">
                    {service.description}
                  </p>

                  {/* Feature List */}
                  <ul className="space-y-3.5 mb-8">
                    {service.features.map((feat) => (
                      <li
                        key={feat}
                        className="flex items-center gap-3 text-gray-900 font-semibold text-base"
                      >
                        <CheckCircle2 className="h-5 w-5 text-[#1676d1] shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap items-center gap-4 pt-2">
                    <button
                      type="button"
                      onClick={() => onOpenDemo('', service.title)}
                      className="inline-flex items-center gap-2 rounded-full bg-black hover:bg-[#0b4ea8] text-white font-bold text-sm px-6 py-3.5 transition-colors cursor-pointer shadow-sm"
                    >
                      <span>Request {service.title} Walkthrough</span>
                      <ArrowUpRight className="h-4 w-4" />
                    </button>
                    <span className="text-xs font-extrabold uppercase tracking-wider text-gray-500 bg-gray-200/80 px-3.5 py-2 rounded-full">
                      {service.metricBadge}
                    </span>
                  </div>
                </motion.div>

                {/* Image Column (hover:scale-105) */}
                <div className="w-full lg:w-1/2">
                  <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-gray-200 bg-black group">
                    <img
                      src={service.image}
                      alt={service.alt}
                      loading="lazy"
                      className="w-full h-auto aspect-[4/3] object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
