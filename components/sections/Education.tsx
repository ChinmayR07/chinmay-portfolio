'use client';

import { motion } from 'framer-motion';
import { GraduationCap, Trophy, BookOpen, MapPin, ExternalLink } from 'lucide-react';
import SectionWrapper from '@/components/ui/SectionWrapper';
import SectionHeader from '@/components/ui/SectionHeader';
import { staggerContainer, fadeUp } from '@/lib/animations';
import { cn } from '@/lib/utils';
import { EDUCATION, AWARDS, CERTIFICATIONS } from '@/data';

export default function Education() {
  return (
    <div className="section-padding border-b border-[var(--border)] bg-[var(--bg-primary)]">
      <div className="section-container">
        <SectionWrapper>
          <SectionHeader
            label="Academic"
            title="Education & Awards"
            subtitle="Strong academic foundation backed by real-world production experience."
          />

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* ── Education Cards (2/3 width) ──────────────────── */}
            <div className="space-y-4 lg:col-span-2">
              <h3 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[var(--text-muted)]">
                <GraduationCap size={13} />
                Degrees
              </h3>

              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className="space-y-4"
              >
                {EDUCATION.map((edu) => (
                  <motion.div
                    key={edu.id}
                    variants={fadeUp}
                    className={cn(
                      'relative overflow-hidden rounded-xl border border-[var(--border)]',
                      'bg-[var(--bg-card)] p-5 transition-colors hover:border-[var(--border-strong)]'
                    )}
                  >
                    {/* Accent left bar */}
                    <div className="absolute bottom-0 left-0 top-0 w-[3px] rounded-l-xl bg-[var(--accent)]" />

                    <div className="flex items-start justify-between gap-4 pl-2">
                      <div className="min-w-0 flex-1">
                        {/* Institution */}
                        <p className="text-xs font-semibold uppercase tracking-wide text-[var(--accent)]">
                          {edu.institutionShort}
                        </p>

                        {/* Degree */}
                        <h3 className="mt-1 font-display text-lg font-bold leading-tight text-[var(--text-primary)]">
                          {edu.degree} in {edu.major}
                        </h3>

                        {/* Meta row */}
                        <div className="mt-2 flex flex-wrap gap-3 text-xs text-[var(--text-muted)]">
                          <span className="flex items-center gap-1">
                            <MapPin size={11} />
                            {edu.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <BookOpen size={11} />
                            {edu.startYear} – {edu.endYear}
                          </span>
                        </div>

                        {/* Highlights */}
                        {edu.highlights && edu.highlights.length > 0 && (
                          <ul className="mt-3 space-y-1">
                            {edu.highlights.map((h, i) => (
                              <li
                                key={i}
                                className="flex items-start gap-2 text-xs text-[var(--text-secondary)]"
                              >
                                <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-[var(--accent)]" />
                                {h}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>

                      {/* GPA badge */}
                      {edu.gpa && (
                        <div
                          className={cn(
                            'flex flex-shrink-0 flex-col items-center justify-center rounded-xl px-4 py-3',
                            'border border-[rgba(16,185,129,0.2)] bg-[rgba(16,185,129,0.08)]'
                          )}
                        >
                          <span className="font-display text-xl font-bold text-[var(--success)]">
                            {edu.gpa}
                          </span>
                          <span className="text-[10px] text-[var(--text-muted)]">
                            / {edu.gpaScale} GPA
                          </span>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* ── Awards (1/3 width) ───────────────────────────── */}
            <div className="space-y-4">
              <h3 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[var(--text-muted)]">
                <Trophy size={13} />
                Awards
              </h3>

              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className="space-y-4"
              >
                {AWARDS.map((award) => (
                  <motion.div
                    key={award.id}
                    variants={fadeUp}
                    className={cn(
                      'rounded-xl border p-5',
                      'border-[rgba(99,102,241,0.25)] bg-[rgba(99,102,241,0.04)]',
                      'transition-colors hover:border-[rgba(99,102,241,0.4)]'
                    )}
                  >
                    <div className="mb-3 flex items-start gap-3">
                      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-[rgba(99,102,241,0.12)] text-xl">
                        {award.icon ?? '🏆'}
                      </div>
                      <div>
                        <p className="font-semibold text-[var(--text-primary)]">{award.title}</p>
                        <p className="text-xs text-[var(--accent)]">{award.issuer}</p>
                        <p className="text-xs text-[var(--text-muted)]">{award.year}</p>
                      </div>
                    </div>
                    <p className="text-xs leading-relaxed text-[var(--text-secondary)]">
                      {award.description}
                    </p>
                  </motion.div>
                ))}

                {/* Certifications */}
                {CERTIFICATIONS.map((cert) => (
                  <motion.div
                    key={cert.id}
                    variants={fadeUp}
                    className={cn(
                      'rounded-xl border p-5 transition-all',
                      'border-[rgba(16,185,129,0.25)] bg-[rgba(16,185,129,0.04)]',
                      'hover:border-[rgba(16,185,129,0.4)]'
                    )}
                  >
                    <div className="mb-3 flex items-start justify-between gap-3">
                      <div className="flex min-w-0 flex-1 items-start gap-3">
                        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-[rgba(16,185,129,0.12)] text-xl">
                          🎓
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-semibold text-[var(--text-primary)]">{cert.title}</p>
                          <p className="text-xs text-[var(--success)]">{cert.issuer}</p>
                          <p className="text-xs text-[var(--text-muted)]">{cert.year}</p>
                        </div>
                      </div>
                      {cert.certificateUrl && (
                        <a
                          href={cert.certificateUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg border border-[rgba(16,185,129,0.3)] text-[var(--success)] transition-colors hover:border-[rgba(16,185,129,0.5)] hover:bg-[rgba(16,185,129,0.08)]"
                          title="View certificate"
                        >
                          <ExternalLink size={14} />
                        </a>
                      )}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </SectionWrapper>
      </div>
    </div>
  );
}
