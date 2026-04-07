'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, Star, Tag } from 'lucide-react';
import SectionWrapper from '@/components/ui/SectionWrapper';
import SectionHeader from '@/components/ui/SectionHeader';
import { staggerContainer, fadeUp, cardHoverProps } from '@/lib/animations';
import { cn } from '@/lib/utils';
import { PROJECTS } from '@/data';
import type { ProjectCategory } from '@/types';

const ALL_CATEGORIES: (ProjectCategory | 'All')[] = [
  'All',
  'Full Stack',
  'Backend',
  'Cloud / DevOps',
  'AI / ML',
  'Frontend',
];

const CATEGORY_COLORS: Record<ProjectCategory, string> = {
  'Full Stack': 'rgba(99,102,241,0.12)',
  Backend: 'rgba(16,185,129,0.12)',
  'Cloud / DevOps': 'rgba(251,146,60,0.12)',
  'AI / ML': 'rgba(236,72,153,0.12)',
  Frontend: 'rgba(59,130,246,0.12)',
};

const CATEGORY_TEXT: Record<ProjectCategory, string> = {
  'Full Stack': '#818cf8',
  Backend: '#34d399',
  'Cloud / DevOps': '#fb923c',
  'AI / ML': '#f472b6',
  Frontend: '#60a5fa',
};

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState<ProjectCategory | 'All'>('All');

  const filtered =
    activeFilter === 'All' ? PROJECTS : PROJECTS.filter((p) => p.category === activeFilter);

  return (
    <div className="section-padding border-b border-[var(--border)] bg-[var(--bg-primary)]">
      <div className="section-container">
        <SectionWrapper>
          <SectionHeader
            label="Work"
            title="Featured Projects"
            subtitle="Open-source projects showcasing full-stack, cloud, and AI engineering. More AI/ML and full-stack projects coming soon!"
          />

          {/* Filter tabs */}
          <div className="mb-8 flex flex-wrap gap-2">
            {ALL_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat as ProjectCategory | 'All')}
                className={cn(
                  'rounded-full px-3 py-1.5 text-xs font-medium transition-all duration-200',
                  activeFilter === cat
                    ? 'bg-[var(--accent)] text-white shadow-[0_0_12px_rgba(99,102,241,0.4)]'
                    : 'border border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--border-strong)] hover:text-[var(--text-primary)]'
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Project cards grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 gap-5 sm:grid-cols-2"
            >
              {filtered.map((project) => {
                const catColor = CATEGORY_COLORS[project.category];
                const catText = CATEGORY_TEXT[project.category];

                return (
                  <motion.div
                    key={project.id}
                    variants={fadeUp}
                    {...cardHoverProps}
                    className={cn(
                      'group flex flex-col rounded-xl border border-[var(--border)]',
                      'bg-[var(--bg-card)] transition-colors hover:border-[var(--border-strong)]',
                      'overflow-hidden'
                    )}
                  >
                    {/* Project image / placeholder */}
                    <div className="relative h-40 w-full overflow-hidden bg-gradient-to-br from-[rgba(99,102,241,0.06)] to-transparent">
                      {project.image ? (
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center">
                          <div className="text-center">
                            <div
                              className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-xl text-lg"
                              style={{ background: catColor, color: catText }}
                            >
                              {project.category === 'AI / ML'
                                ? '🤖'
                                : project.category === 'Cloud / DevOps'
                                  ? '☁️'
                                  : project.category === 'Backend'
                                    ? '⚙️'
                                    : project.category === 'Full Stack'
                                      ? '🚀'
                                      : '💻'}
                            </div>
                            <p className="text-xs text-[var(--text-muted)]">
                              Add screenshot to /public/projects/
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Category badge overlay */}
                      <div
                        className="absolute left-3 top-3 rounded-full px-2.5 py-1 text-[10px] font-semibold"
                        style={{ background: catColor, color: catText }}
                      >
                        {project.category}
                      </div>

                      {/* Year badge */}
                      <div className="bg-[var(--bg-primary)]/80 absolute right-3 top-3 rounded-full px-2.5 py-1 text-[10px] text-[var(--text-muted)] backdrop-blur-sm">
                        {project.year}
                      </div>
                    </div>

                    {/* Card body */}
                    <div className="flex flex-1 flex-col p-4">
                      <div className="mb-2 flex items-start justify-between gap-2">
                        <h3 className="font-display text-base font-bold leading-snug text-[var(--text-primary)]">
                          {project.title}
                        </h3>
                        {/* Links */}
                        <div className="flex flex-shrink-0 gap-1.5">
                          {project.githubUrl && (
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label="GitHub"
                              className="flex h-7 w-7 items-center justify-center rounded-lg border border-[var(--border)] text-[var(--text-muted)] transition-all hover:border-[var(--border-strong)] hover:text-[var(--text-primary)]"
                            >
                              <Github size={13} />
                            </a>
                          )}
                          {project.liveUrl && (
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label="Live demo"
                              className="flex h-7 w-7 items-center justify-center rounded-lg border border-[var(--border)] text-[var(--text-muted)] transition-all hover:border-[var(--accent)] hover:text-[var(--accent)]"
                            >
                              <ExternalLink size={13} />
                            </a>
                          )}
                        </div>
                      </div>

                      <p className="mb-4 flex-1 text-xs leading-relaxed text-[var(--text-secondary)]">
                        {project.description}
                      </p>

                      {/* Tech stack */}
                      <div className="flex flex-wrap gap-1.5">
                        {project.techStack.map((tech) => (
                          <span
                            key={tech}
                            className="inline-flex items-center gap-1 rounded-full border border-[var(--border)] bg-[var(--bg-secondary)] px-2 py-0.5 text-[11px] text-[var(--text-muted)]"
                          >
                            <Tag size={9} />
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>

          {/* Coming Soon Message */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-10 rounded-xl border border-dashed border-[var(--border)] bg-[var(--bg-secondary)] p-8 text-center"
          >
            <p className="text-sm font-semibold text-[var(--text-primary)]">
              🚀 More Projects Coming Soon
            </p>
            <p className="mt-2 text-xs text-[var(--text-secondary)]">
              I'm actively building new AI/ML and full-stack projects. Check back soon or follow my
              GitHub for latest updates!
            </p>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-10 flex justify-center"
          >
            <a
              href="https://github.com/ChinmayR07"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                'inline-flex items-center gap-2 rounded-lg border px-5 py-2.5 text-sm font-medium',
                'border-[var(--border)] text-[var(--text-secondary)] transition-all',
                'hover:border-[var(--accent)] hover:text-[var(--accent)]'
              )}
            >
              <Github size={15} />
              View All Projects on GitHub
            </a>
          </motion.div>
        </SectionWrapper>
      </div>
    </div>
  );
}
