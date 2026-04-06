'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';
import SectionWrapper from '@/components/ui/SectionWrapper';
import SectionHeader from '@/components/ui/SectionHeader';
import { staggerContainer, fadeUp, lineDrawDown } from '@/lib/animations';
import { cn, getDuration } from '@/lib/utils';
import { EXPERIENCES } from '@/data';

export default function Experience() {
  const [expandedId, setExpandedId] = useState<string>(EXPERIENCES[0].id);

  return (
    <div className="section-padding border-b border-[var(--border)] bg-[var(--bg-secondary)]">
      <div className="section-container">
        <SectionWrapper>
          <SectionHeader
            label="Career"
            title="Work Experience"
            subtitle="4.5+ years across fintech, enterprise software, and academia."
          />

          <div className="relative">
            {/* Vertical timeline line */}
            <div className="absolute left-[19px] top-0 hidden h-full w-px bg-[var(--border)] sm:block">
              <motion.div
                variants={lineDrawDown}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                className="h-full w-full origin-top bg-gradient-to-b from-[var(--accent)] via-[var(--accent)] to-[var(--border)]"
              />
            </div>

            {/* Timeline items */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              className="space-y-4"
            >
              {EXPERIENCES.map((exp, idx) => {
                const isExpanded = expandedId === exp.id;
                const duration = getDuration(exp.startDate, exp.endDate);

                return (
                  <motion.div
                    key={exp.id}
                    variants={fadeUp}
                    className="relative sm:pl-12"
                  >
                    {/* Timeline dot */}
                    <div className={cn(
                      'absolute left-0 top-5 hidden h-[10px] w-[10px] -translate-y-1/2 rounded-full border-2 sm:block',
                      exp.highlight
                        ? 'border-[var(--accent)] bg-[var(--accent)] shadow-[0_0_8px_rgba(99,102,241,0.5)]'
                        : idx === 2
                          ? 'border-[var(--success)] bg-[var(--success)]'
                          : 'border-[var(--border-strong)] bg-[var(--bg-secondary)]',
                    )} />

                    {/* Card */}
                    <div className={cn(
                      'rounded-xl border bg-[var(--bg-card)] transition-all duration-200',
                      isExpanded
                        ? 'border-[rgba(99,102,241,0.3)] shadow-[0_0_0_1px_rgba(99,102,241,0.1)]'
                        : 'border-[var(--border)] hover:border-[var(--border-strong)]',
                    )}>
                      {/* Card header — always visible, click to expand */}
                      <button
                        onClick={() => setExpandedId(isExpanded ? '' : exp.id)}
                        className="w-full p-4 text-left sm:p-5"
                        aria-expanded={isExpanded}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1 min-w-0">
                            {/* Company + type badge */}
                            <div className="mb-1 flex flex-wrap items-center gap-2">
                              <a
                                href={exp.companyUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="flex items-center gap-1 text-sm font-semibold text-[var(--accent)] hover:underline"
                              >
                                {exp.company}
                                <ExternalLink size={11} className="opacity-60" />
                              </a>
                              <span className={cn(
                                'rounded-full px-2 py-0.5 text-[10px] font-medium',
                                exp.type === 'Full-time'
                                  ? 'bg-[rgba(16,185,129,0.1)] text-[var(--success)]'
                                  : exp.type === 'Internship'
                                    ? 'bg-[rgba(251,146,60,0.1)] text-[#fb923c]'
                                    : 'bg-[rgba(99,102,241,0.1)] text-[var(--accent)]',
                              )}>
                                {exp.type}
                              </span>
                              {exp.highlight && (
                                <span className="rounded-full bg-[rgba(99,102,241,0.1)] px-2 py-0.5 text-[10px] font-medium text-[var(--accent)]">
                                  Current
                                </span>
                              )}
                            </div>

                            {/* Title */}
                            <h3 className="font-display text-base font-bold text-[var(--text-primary)] sm:text-lg">
                              {exp.title}
                            </h3>

                            {/* Meta */}
                            <div className="mt-1.5 flex flex-wrap items-center gap-3 text-xs text-[var(--text-muted)]">
                              <span className="flex items-center gap-1">
                                <Calendar size={11} />
                                {exp.startDate} – {exp.endDate}
                              </span>
                              <span className="rounded bg-[var(--bg-secondary)] px-1.5 py-0.5 font-mono text-[10px]">
                                {duration}
                              </span>
                              <span className="flex items-center gap-1">
                                <MapPin size={11} />
                                {exp.location}
                              </span>
                            </div>
                          </div>

                          {/* Expand toggle */}
                          <div className={cn(
                            'flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg transition-colors',
                            isExpanded
                              ? 'bg-[rgba(99,102,241,0.1)] text-[var(--accent)]'
                              : 'text-[var(--text-muted)]',
                          )}>
                            {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                          </div>
                        </div>
                      </button>

                      {/* Expandable body */}
                      <motion.div
                        initial={false}
                        animate={{ height: isExpanded ? 'auto' : 0, opacity: isExpanded ? 1 : 0 }}
                        transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                        className="overflow-hidden"
                      >
                        <div className="border-t border-[var(--border)] px-4 pb-4 pt-4 sm:px-5 sm:pb-5">
                          {/* Bullet points */}
                          <ul className="space-y-2.5">
                            {exp.bullets.map((bullet, i) => (
                              <li key={i} className="flex items-start gap-2.5">
                                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[var(--accent)]" />
                                <span className="text-sm leading-relaxed text-[var(--text-secondary)]">
                                  {bullet}
                                </span>
                              </li>
                            ))}
                          </ul>

                          {/* Tech stack tags */}
                          <div className="mt-4 flex flex-wrap gap-1.5">
                            {exp.techStack.map((tech) => (
                              <span
                                key={tech}
                                className="rounded-full border border-[var(--border)] bg-[var(--bg-secondary)] px-2.5 py-1 text-[11px] text-[var(--text-muted)]"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </SectionWrapper>
      </div>
    </div>
  );
}
