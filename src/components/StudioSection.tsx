import React from 'react';
import { motion } from 'framer-motion';
import { Award, Users, Shield, Globe2 } from 'lucide-react';

export const StudioSection: React.FC = () => {
  return (
    <section
      id="studio"
      aria-labelledby="studio-heading"
      className="bg-black text-white py-32 px-6 md:px-12 relative z-10 border-t border-white/10"
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8, ease: [0.2, 0.65, 0.3, 0.9] }}
        className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center"
      >
        {/* Left Column: Narrative & Metrics */}
        <div className="lg:col-span-6">
          <span className="text-xs font-black uppercase tracking-[0.25em] text-[#5fb9ff] block mb-3">
            GLOBAL COMMAND COLLECTIVE // 05
          </span>
          <h2
            id="studio-heading"
            className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white mb-6"
          >
            The Studio
          </h2>
          <p className="text-gray-300 font-medium leading-relaxed text-lg md:text-xl mb-6">
            We are a collective of thinkers, designers, and engineers operating
            from a state-of-the-art studio. By pairing principal cybersecurity
            architects with award-winning product designers, we transform
            complex zero-trust infrastructure into effortless human experiences.
          </p>
          <p className="text-gray-400 font-medium leading-relaxed text-base mb-12">
            Every engagement is backed by 24/7 SecOps telemetry engineering,
            WCAG 2.1 AA accessibility compliance, and empirical conversion rate
            optimization.
          </p>

          {/* Studio Metrics Grid */}
          <div className="grid grid-cols-2 gap-6 pt-8 border-t border-white/15">
            <div className="p-6 rounded-3xl bg-white/[0.04] border border-white/10">
              <Users className="h-5 w-5 text-[#5fb9ff] mb-3" />
              <div className="text-3xl sm:text-4xl font-black tracking-tight text-white mb-1">
                24+ Creatives
              </div>
              <div className="text-xs font-bold uppercase tracking-wider text-gray-400">
                Principal Designers &amp; SecOps Engineers
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-white/[0.04] border border-white/10">
              <Award className="h-5 w-5 text-[#5fb9ff] mb-3" />
              <div className="text-3xl sm:text-4xl font-black tracking-tight text-white mb-1">
                15 Awards
              </div>
              <div className="text-xs font-bold uppercase tracking-wider text-gray-400">
                Digital Product &amp; Cyber UX Honors
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-white/[0.04] border border-white/10">
              <Shield className="h-5 w-5 text-emerald-400 mb-3" />
              <div className="text-2xl sm:text-3xl font-black tracking-tight text-white mb-1">
                SOC 2 Type II
              </div>
              <div className="text-xs font-bold uppercase tracking-wider text-gray-400">
                ISO 27001 &amp; Zero-Trust Certified
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-white/[0.04] border border-white/10">
              <Globe2 className="h-5 w-5 text-sky-400 mb-3" />
              <div className="text-2xl sm:text-3xl font-black tracking-tight text-white mb-1">
                38 Regions
              </div>
              <div className="text-xs font-bold uppercase tracking-wider text-gray-400">
                Global Anycast Edge Presence
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: 2 Images Stacked Vertically (grayscale -> hover:grayscale-0) */}
        <div className="lg:col-span-6 flex flex-col gap-8">
          <div className="rounded-3xl overflow-hidden border border-white/15 bg-gray-900">
            <img
              src={`${import.meta.env.BASE_URL}studio1.png`}
              alt="EvvyDigital state-of-the-art studio office interior"
              loading="lazy"
              className="w-full h-72 sm:h-80 object-cover grayscale hover:grayscale-0 transition-all duration-700 ease-out hover:scale-105"
            />
          </div>
          <div className="rounded-3xl overflow-hidden border border-white/15 bg-gray-900">
            <img
              src={`${import.meta.env.BASE_URL}studio2.png`}
              alt="EvvyDigital collective of designers and security engineers collaborating"
              loading="lazy"
              className="w-full h-72 sm:h-80 object-cover grayscale hover:grayscale-0 transition-all duration-700 ease-out hover:scale-105"
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
};
