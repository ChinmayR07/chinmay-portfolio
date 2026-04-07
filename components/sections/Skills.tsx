'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiNodedotjs,
  SiExpress,
  SiSpring,
  SiGraphql,
  SiApachekafka,
  SiDocker,
  SiKubernetes,
  SiGithubactions,
  SiJenkins,
  SiMysql,
  SiRedis,
  SiMongodb,
  SiLinux,
  SiGit,
  SiPostman,
  SiPhp,
} from 'react-icons/si';
import { Code2, Cloud, Database, Wrench, Brain, Coffee, Cloud as AzureIcon } from 'lucide-react';
import SectionWrapper from '@/components/ui/SectionWrapper';
import SectionHeader from '@/components/ui/SectionHeader';
import { staggerContainer, scaleIn } from '@/lib/animations';
import { cn } from '@/lib/utils';
import { SKILL_GROUPS } from '@/data';
import type { SkillCategory } from '@/types';

// Map skill names to react-icons components
const SKILL_ICONS: Record<string, React.ReactNode> = {
  React: <SiReact />,
  'Next.js': <SiNextdotjs />,
  TypeScript: <SiTypescript />,
  JavaScript: <SiJavascript />,
  'Tailwind CSS': <SiTailwindcss />,
  'Node.js': <SiNodedotjs />,
  'Express.js': <SiExpress />,
  Java: <Coffee size={14} />,
  'Spring Boot': <SiSpring />,
  GraphQL: <SiGraphql />,
  'Apache Kafka': <SiApachekafka />,
  PHP: <SiPhp />,
  Docker: <SiDocker />,
  Kubernetes: <SiKubernetes />,
  'GitHub Actions': <SiGithubactions />,
  Jenkins: <SiJenkins />,
  MySQL: <SiMysql />,
  'Aurora RDS': <SiMysql />,
  Redis: <SiRedis />,
  MongoDB: <SiMongodb />,
  Linux: <SiLinux />,
  Git: <SiGit />,
  Postman: <SiPostman />,
};

// Category icon map
const CATEGORY_ICONS: Record<SkillCategory, React.ReactNode> = {
  Frontend: <Code2 size={14} />,
  Backend: <SiNodedotjs />,
  'Cloud — AWS': <Cloud size={14} />,
  'Cloud — Azure': <AzureIcon size={14} />,
  DevOps: <SiDocker />,
  Databases: <Database size={14} />,
  'AI / GenAI': <Brain size={14} />,
  Practices: <Wrench size={14} />,
};

// Accent colors per category
const CATEGORY_COLORS: Record<SkillCategory, string> = {
  Frontend: 'rgba(99,102,241,0.12)',
  Backend: 'rgba(16,185,129,0.12)',
  'Cloud — AWS': 'rgba(251,146,60,0.12)',
  'Cloud — Azure': 'rgba(59,130,246,0.12)',
  DevOps: 'rgba(139,92,246,0.12)',
  Databases: 'rgba(234,179,8,0.12)',
  'AI / GenAI': 'rgba(236,72,153,0.12)',
  Practices: 'rgba(20,184,166,0.12)',
};

const CATEGORY_TEXT_COLORS: Record<SkillCategory, string> = {
  Frontend: '#818cf8',
  Backend: '#34d399',
  'Cloud — AWS': '#fb923c',
  'Cloud — Azure': '#60a5fa',
  DevOps: '#a78bfa',
  Databases: '#facc15',
  'AI / GenAI': '#f472b6',
  Practices: '#2dd4bf',
};

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState<SkillCategory | 'All'>('All');

  const categories: (SkillCategory | 'All')[] = ['All', ...SKILL_GROUPS.map((g) => g.category)];

  const filteredGroups =
    activeCategory === 'All'
      ? SKILL_GROUPS
      : SKILL_GROUPS.filter((g) => g.category === activeCategory);

  return (
    <div className="section-padding border-b border-[var(--border)] bg-[var(--bg-primary)]">
      <div className="section-container">
        <SectionWrapper>
          <SectionHeader
            label="Expertise"
            title="Skills & Tech Stack"
            subtitle="Grouped by domain — built across 4.5 years of production engineering."
          />

          {/* Category filter tabs */}
          <div className="mb-8 flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  'rounded-full px-3 py-1.5 text-xs font-medium transition-all duration-200',
                  activeCategory === cat
                    ? 'bg-[var(--accent)] text-white shadow-[0_0_12px_rgba(99,102,241,0.4)]'
                    : 'border border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--border-strong)] hover:text-[var(--text-primary)]'
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Skill groups grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            >
              {filteredGroups.map((group) => {
                const color = CATEGORY_COLORS[group.category];
                const textColor = CATEGORY_TEXT_COLORS[group.category];
                const icon = CATEGORY_ICONS[group.category];

                return (
                  <div
                    key={group.category}
                    className="rounded-xl border border-[var(--border)] bg-[var(--bg-card)] p-4 transition-colors hover:border-[var(--border-strong)]"
                  >
                    {/* Category header */}
                    <div className="mb-3 flex items-center gap-2">
                      <div
                        className="flex h-7 w-7 items-center justify-center rounded-lg text-xs"
                        style={{ background: color, color: textColor }}
                      >
                        {icon}
                      </div>
                      <h3 className="text-xs font-semibold uppercase tracking-wide text-[var(--text-secondary)]">
                        {group.category}
                      </h3>
                    </div>

                    {/* Skills badges */}
                    <motion.div
                      variants={staggerContainer}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      className="flex flex-wrap gap-1.5"
                    >
                      {group.skills.map((skill) => (
                        <motion.span
                          key={skill}
                          variants={scaleIn}
                          className={cn(
                            'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1',
                            'border border-[var(--border)] bg-[var(--bg-secondary)]',
                            'text-xs text-[var(--text-secondary)]',
                            'transition-all hover:border-[var(--border-strong)] hover:text-[var(--text-primary)]'
                          )}
                          title={skill}
                        >
                          {SKILL_ICONS[skill] && (
                            <span className="text-[11px]" style={{ color: textColor }}>
                              {SKILL_ICONS[skill]}
                            </span>
                          )}
                          {skill}
                        </motion.span>
                      ))}
                    </motion.div>
                  </div>
                );
              })}
            </motion.div>
          </AnimatePresence>

          {/* Summary stats */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-6 border-t border-[var(--border)] pt-8">
            {[
              { value: '25+', label: 'Technologies' },
              { value: '8', label: 'Skill Domains' },
              { value: '3', label: 'Cloud Platforms' },
              { value: '4.5+', label: 'Years Hands-on' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-display text-2xl font-bold text-[var(--accent)]">{stat.value}</p>
                <p className="mt-0.5 text-xs text-[var(--text-muted)]">{stat.label}</p>
              </div>
            ))}
          </div>
        </SectionWrapper>
      </div>
    </div>
  );
}
