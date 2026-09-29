import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, BookOpen } from 'lucide-react';

interface InsightsSectionProps {
  onOpenDemo: (prefillEmail?: string, tier?: string) => void;
}

const INSIGHTS_DATA = [
  {
    id: 'beyond-glassmorphism',
    title: 'The Future of UI: Beyond Glassmorphism',
    category: 'Design',
    readTime: '6 min read',
    excerpt:
      'How spatial depth, liquid-glass translucency, and WCAG 2.1 AA high-contrast tokens reduce SecOps analyst fatigue in mission-critical enterprise dashboards.',
    image: '/insight1.png',
    alt: 'Abstract glowing UI illustrating The Future of UI: Beyond Glassmorphism',
  },
  {
    id: 'ai-web-development',
    title: 'Leveraging AI in Web Development',
    category: 'Technology',
    readTime: '8 min read',
    excerpt:
      'Integrating autonomous anomaly scoring, predictive edge caching, and LLM-assisted threat hunting into cloud-native React and Next.js platforms.',
    image: '/insight2.png',
    alt: 'Abstract AI neural network representing Leveraging AI in Web Development',
  },
  {
    id: 'minimalism-vs-maximalism',
    title: 'Minimalism vs. Maximalism in Branding',
    category: 'Strategy',
    readTime: '5 min read',
    excerpt:
      'Why daylight architectural clarity and precision editorial typography outperform fear-based dark cyber clichés in CISO conversion funnels.',
    image: '/insight3.png',
    alt: 'Abstract graphic design exploring Minimalism vs. Maximalism in Branding',
  },
];

export const InsightsSection: React.FC<InsightsSectionProps> = ({
  onOpenDemo,
}) => {
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(
    null
  );

  return (
    <section
      id="insights"
      aria-labelledby="insights-heading"
      className="bg-white text-black py-32 px-6 md:px-12 relative z-10"
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8, ease: [0.2, 0.65, 0.3, 0.9] }}
        className="max-w-7xl mx-auto"
      >
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-8 border-b border-gray-200">
          <div>
            <span className="text-xs font-black uppercase tracking-[0.25em] text-[#0b4ea8] block mb-3">
              THREAT &amp; UX RESEARCH // 06
            </span>
            <h2
              id="insights-heading"
              className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-black"
            >
              Latest Insights
            </h2>
          </div>
          <p className="text-gray-600 font-medium leading-relaxed max-w-md text-base md:text-lg">
            Research notes from our principal security architects, product
            designers, and conversion strategists.
          </p>
        </div>

        {/* 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {INSIGHTS_DATA.map((article, idx) => {
            const isExpanded = selectedArticleId === article.id;
            return (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{
                  duration: 0.8,
                  delay: idx * 0.2,
                  ease: 'easeOut',
                }}
                onClick={() =>
                  setSelectedArticleId(isExpanded ? null : article.id)
                }
                className="group cursor-pointer flex flex-col justify-between rounded-3xl border border-gray-200 p-5 hover:border-blue-600/40 hover:shadow-xl transition-all duration-300"
              >
                <div>
                  <div className="overflow-hidden rounded-2xl mb-6 bg-gray-900">
                    <img
                      src={article.image}
                      alt={article.alt}
                      loading="lazy"
                      className="w-full aspect-[4/3] object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  </div>

                  <div className="flex items-center justify-between text-xs font-extrabold uppercase tracking-wider text-gray-500 mb-3">
                    <span className="text-[#0b4ea8] bg-blue-50 px-3 py-1 rounded-full">
                      {article.category}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <BookOpen className="h-3.5 w-3.5" />
                      {article.readTime}
                    </span>
                  </div>

                  <h3 className="text-2xl font-black tracking-tight text-gray-900 group-hover:text-blue-600 hover:text-blue-600 transition-colors mb-3">
                    {article.title}
                  </h3>

                  <p className="text-gray-600 font-medium leading-relaxed text-sm md:text-base mb-5">
                    {article.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenDemo('', `Briefing: ${article.title}`);
                    }}
                    className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-gray-900 group-hover:text-blue-600 transition-colors cursor-pointer"
                  >
                    <span>Request Executive Briefing</span>
                    <ArrowUpRight className="h-4 w-4" />
                  </button>
                </div>
              </motion.article>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
};
