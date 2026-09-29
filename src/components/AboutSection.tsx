import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Cpu, Zap, Lock, ArrowUpRight, Terminal } from 'lucide-react';

interface AboutSectionProps {
  onOpenDemo: (prefillEmail?: string, tier?: string) => void;
}

const TELEMETRY_NODES = [
  {
    id: 'ebpf',
    label: 'eBPF Kernel Telemetry',
    latency: '1.8ms',
    status: 'VERIFIED // ZERO OVERHEAD',
    detail:
      'Continuous syscall & network socket introspection across Kubernetes clusters without kernel module risk.',
  },
  {
    id: 'iam',
    label: 'Zero-Trust Identity Graph',
    latency: '4.2ms',
    status: 'ACTIVE // LEAST PRIVILEGE',
    detail:
      'Automated ephemeral privilege revocation across AWS IAM, Okta, and GitHub Enterprise tokens.',
  },
  {
    id: 'edge',
    label: 'Autonomous Edge WAF & DDoS',
    latency: '0.9ms',
    status: 'MITIGATING // 1.4M REQ/S',
    detail:
      'Behavioral bot fingerprinting and L7 cryptographic challenge enforcement with zero UX friction.',
  },
];

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenDemo }) => {
  const [activeNode, setActiveNode] = useState(TELEMETRY_NODES[0]);

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="bg-black text-white py-32 px-6 md:px-12 relative z-10 border-t border-white/10"
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 1, ease: [0.2, 0.65, 0.3, 0.9] }}
        className="max-w-7xl mx-auto"
      >
        {/* Subtitle */}
        <div className="flex items-center gap-3 mb-8">
          <span className="h-2.5 w-2.5 rounded-full bg-[#1676d1]" />
          <span
            id="about-heading"
            className="text-xs md:text-sm font-black tracking-[0.25em] uppercase text-[#5fb9ff]"
          >
            WHO WE ARE
          </span>
        </div>

        {/* Core Editorial Statement */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-3xl sm:text-4xl md:text-6xl font-black tracking-tight leading-[1.12] text-white max-w-5xl"
        >
          EvvyDigital is a premier digital agency specializing in cutting-edge
          web development, intuitive UX/UI design, and data-driven digital
          strategy.{' '}
          <span className="bg-gradient-to-r from-[#5fb9ff] via-white to-gray-400 bg-clip-text text-transparent">
            We don&apos;t just build websites; we build platforms that scale.
          </span>
        </motion.p>

        {/* B2B Cybersecurity SaaS Trust & Live Architecture Proof Grid */}
        <div className="mt-20 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* 4 Key Executive Metrics */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {[
              {
                icon: Shield,
                metric: '$4.2T+',
                label: 'Enterprise Assets Protected',
                desc: 'Trusted by global financial institutions, cloud-native unicorns, and critical infrastructure leaders.',
              },
              {
                icon: Zap,
                metric: '<14ms',
                label: 'Autonomous Threat Isolation',
                desc: 'Sub-second anomaly detection and automated blast-radius containment across multi-cloud workloads.',
              },
              {
                icon: Cpu,
                metric: '89%',
                label: 'SOC Alert Fatigue Reduction',
                desc: 'Human-centered SecOps UX consolidates millions of raw signals into actionable attack narratives.',
              },
              {
                icon: Lock,
                metric: '99.998%',
                label: 'Zero-Trust Uptime SLA',
                desc: 'SOC 2 Type II, ISO 27001, and FedRAMP High ready architecture with 15-minute agentless onboarding.',
              },
            ].map((item, idx) => {
              const IconComponent = item.icon;
              return (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.7,
                    delay: idx * 0.15,
                    ease: [0.2, 0.65, 0.3, 0.9],
                  }}
                  className="rounded-3xl bg-white/[0.04] border border-white/10 p-7 hover:border-[#5fb9ff]/50 transition-all group"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-flex p-3 rounded-2xl bg-[#0b4ea8]/30 text-[#5fb9ff] border border-[#5fb9ff]/20">
                      <IconComponent className="h-5 w-5" />
                    </span>
                    <span className="text-[11px] font-bold uppercase tracking-widest text-gray-500 group-hover:text-[#5fb9ff] transition-colors">
                      VERIFIED TELEMETRY
                    </span>
                  </div>
                  <div className="text-4xl md:text-5xl font-black tracking-tight text-white mb-2">
                    {item.metric}
                  </div>
                  <div className="text-base font-bold text-white/90 mb-1.5">
                    {item.label}
                  </div>
                  <p className="text-sm text-gray-400 font-medium leading-relaxed">
                    {item.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>

          {/* Interactive Live SecOps Architecture Inspector */}
          <div className="lg:col-span-5 rounded-3xl bg-gradient-to-b from-[#0b4ea8]/25 via-white/[0.03] to-white/[0.02] border border-white/15 p-7 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 mb-5 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <Terminal className="h-4 w-4 text-[#5fb9ff]" />
                  <span className="text-xs font-extrabold uppercase tracking-widest text-white">
                    LIVE ZERO-TRUST TELEMETRY SANDBOX
                  </span>
                </div>
                <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-400">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  ONLINE
                </span>
              </div>

              <p className="text-xs text-gray-400 font-medium mb-4">
                Select a defense layer below to inspect how our B2B SaaS engine
                verifies and isolates enterprise traffic:
              </p>

              <div className="flex flex-col gap-2.5 mb-6">
                {TELEMETRY_NODES.map((node) => {
                  const isSelected = activeNode.id === node.id;
                  return (
                    <button
                      key={node.id}
                      type="button"
                      onClick={() => setActiveNode(node)}
                      className={`w-full text-left rounded-2xl p-3.5 transition-all border cursor-pointer flex items-center justify-between ${
                        isSelected
                          ? 'bg-[#1676d1]/25 border-[#5fb9ff] text-white'
                          : 'bg-black/40 border-white/10 text-gray-400 hover:text-white hover:border-white/25'
                      }`}
                    >
                      <span className="text-sm font-bold">{node.label}</span>
                      <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-black/60 text-[#5fb9ff] border border-white/10">
                        {node.latency}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="rounded-2xl bg-black/70 border border-white/10 p-4 font-mono text-xs">
                <div className="text-emerald-400 font-bold mb-1">
                  &gt; STATUS: {activeNode.status}
                </div>
                <p className="text-gray-300 font-sans text-sm leading-relaxed">
                  {activeNode.detail}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onOpenDemo('', activeNode.label)}
              className="mt-6 w-full py-4 px-5 rounded-2xl bg-white text-black hover:bg-[#5fb9ff] hover:text-black font-black text-sm tracking-tight flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <span>Deploy {activeNode.label} in Live Demo</span>
              <ArrowUpRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
