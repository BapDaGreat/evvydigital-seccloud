import React from 'react';
import { motion } from 'framer-motion';

const PROCESS_STEPS = [
  {
    number: '01',
    title: 'Discovery & Strategy',
    duration: 'Days 1–3',
    description:
      'We start by immersing ourselves in your brand, mapping attack surfaces, compliance perimeters, and conversion objectives to architect a high-trust roadmap.',
  },
  {
    number: '02',
    title: 'Design & Prototyping',
    duration: 'Days 4–7',
    description:
      'Our design team creates beautiful, intuitive interfaces and interactive SecOps command prototypes tested directly with technical buyers and CISOs.',
  },
  {
    number: '03',
    title: 'Engineering & Build',
    duration: 'Days 8–11',
    description:
      'Using the latest technology stacks—React, TypeScript, and hardened zero-trust edge infrastructure—we build scalable platforms engineered for speed.',
  },
  {
    number: '04',
    title: 'Testing & Launch',
    duration: 'Days 12–14',
    description:
      'Rigorous QA, automated penetration testing, and Core Web Vitals verification ensure everything works perfectly from day one of enterprise launch.',
  },
];

export const ProcessSection: React.FC = () => {
  return (
    <section
      id="process"
      aria-labelledby="process-heading"
      className="bg-gray-50 text-black py-32 px-6 md:px-12 relative z-10 border-t border-gray-200"
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8, ease: [0.2, 0.65, 0.3, 0.9] }}
        className="max-w-7xl mx-auto"
      >
        {/* Header */}
        <div className="mb-20 max-w-3xl">
          <span className="text-xs font-black uppercase tracking-[0.25em] text-[#0b4ea8] block mb-3">
            ZERO-FRICTION DEPLOYMENT // 04
          </span>
          <h2
            id="process-heading"
            className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-black mb-4"
          >
            Our 4-Stage Process
          </h2>
          <p className="text-gray-600 font-medium leading-relaxed text-base md:text-lg">
            Enterprise buyers fear multi-month implementation delays. Our
            streamlined methodology takes you from initial threat discovery to
            production launch in 14 days.
          </p>
        </div>

        {/* 4-Column Grid with Connecting Horizontal Line on Desktop */}
        <div className="relative">
          {/* Connecting horizontal gray line behind the steps on desktop */}
          <div
            aria-hidden="true"
            className="hidden lg:block absolute top-10 left-0 right-0 h-[2px] bg-gray-200 z-0"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 relative z-10">
            {PROCESS_STEPS.map((step, idx) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{
                  duration: 0.8,
                  delay: idx * 0.2,
                  ease: 'easeOut',
                }}
                className="group bg-white rounded-3xl p-8 border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="h-16 w-16 rounded-2xl bg-gray-50 border-2 border-gray-200 group-hover:border-black group-hover:bg-black group-hover:text-white flex items-center justify-center text-xl font-black tracking-tight transition-all duration-300">
                    {step.number}
                  </div>
                  <span className="text-xs font-extrabold uppercase tracking-wider text-[#0b4ea8] bg-blue-50 px-3 py-1 rounded-full">
                    {step.duration}
                  </span>
                </div>

                <h3 className="text-2xl font-black tracking-tight text-gray-900 mb-3">
                  {step.title}
                </h3>

                <p className="text-gray-600 font-medium leading-relaxed text-sm md:text-base">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};
