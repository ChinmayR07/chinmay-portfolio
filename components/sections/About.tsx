'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { MapPin, GraduationCap, Briefcase, Award } from 'lucide-react';
import SectionWrapper from '@/components/ui/SectionWrapper';
import SectionHeader from '@/components/ui/SectionHeader';
import { staggerContainer, fadeUp, slideInLeft, slideInRight } from '@/lib/animations';
import { cn } from '@/lib/utils';

const HIGHLIGHTS = [
  {
    icon: Briefcase,
    label: '4.5+ Years',
    detail: 'Building production systems at scale',
  },
  {
    icon: GraduationCap,
    label: 'MS — GPA 3.9 / 4.0',
    detail: 'Computer Engineering, Stony Brook University',
  },
  {
    icon: Award,
    label: 'Duke Marvels Award',
    detail: 'Recognized for Agile excellence at Accenture',
  },
  {
    icon: MapPin,
    label: 'Chicago, IL',
    detail: 'Open to relocate or work remotely',
  },
];

export default function About() {
  return (
    <div className="section-padding border-b border-[var(--border)] bg-[var(--bg-secondary)]">
      <div className="section-container">
        <SectionWrapper>
          <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
            {/* Left: Photo */}
            <motion.div
              variants={slideInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="flex justify-center lg:justify-start"
            >
              <div className="relative">
                <div className="absolute -left-3 -top-3 h-full w-full rounded-2xl border-2 border-[var(--accent)] opacity-30" />

                <div
                  className={cn(
                    'relative h-[340px] w-[280px] overflow-hidden rounded-2xl',
                    'border border-[var(--border-strong)] bg-[var(--bg-card)]'
                  )}
                >
                  <Image
                    src="/profile.jpg"
                    alt="Chinmay Raichur"
                    fill
                    className="object-cover object-top"
                    priority
                  />
                </div>

                {/* Floating badge */}
                <div
                  className={cn(
                    'absolute -bottom-4 -right-4 rounded-xl px-4 py-2.5',
                    'border border-[var(--border-strong)] bg-[var(--bg-card)] shadow-lg'
                  )}
                >
                  <p className="text-xs text-[var(--text-muted)]">Currently at</p>
                  <p className="text-sm font-semibold text-[var(--text-primary)]">
                    Trading Technologies
                  </p>
                  <div className="mt-0.5 flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--success)]" />
                    <span className="text-xs text-[var(--success)]">Full-time · Chicago</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right: Bio + Highlights */}
            <motion.div
              variants={slideInRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <SectionHeader label="About Me" title="Who I Am" />

              <div className="space-y-4 text-sm leading-relaxed text-[var(--text-secondary)]">
                <p>
                  I&apos;m a full stack software engineer with{' '}
                  <span className="font-medium text-[var(--text-primary)]">4.5+ years</span> of
                  experience building scalable, production-grade systems that serve hundreds of
                  thousands of users. I thrive at the intersection of clean backend architecture and
                  polished frontend experience.
                </p>

                <p>
                  I started my career at{' '}
                  <span className="font-medium text-[var(--text-primary)]">Accenture</span> in
                  Mumbai, where I built enterprise Java systems and shipped one of the
                  company&apos;s first conversational AI chatbots — later adopted as
                  Accenture&apos;s internal support automation foundation. That early bet on AI has
                  shaped how I approach engineering ever since.
                </p>

                <p>
                  After earning my{' '}
                  <span className="font-medium text-[var(--text-primary)]">
                    MS in Computer Engineering from Stony Brook University (GPA 3.9/4.0)
                  </span>
                  , I joined{' '}
                  <span className="font-medium text-[var(--text-primary)]">
                    Trading Technologies
                  </span>{' '}
                  in Chicago, leading cloud infrastructure on AWS, building systems for 100K+ users,
                  and mentoring junior engineers.
                </p>

                <p>
                  I&apos;m a strong believer in TDD, thorough code review, and writing code that the
                  next engineer will thank you for. Outside work, I geek out about distributed
                  systems, GenAI tooling, and creative applications of ML.
                </p>
              </div>

              {/* Highlight cards */}
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2"
              >
                {HIGHLIGHTS.map((item) => (
                  <motion.div
                    key={item.label}
                    variants={fadeUp}
                    className={cn(
                      'flex items-start gap-3 rounded-xl p-3.5',
                      'border border-[var(--border)] bg-[var(--bg-card)]',
                      'transition-colors hover:border-[var(--border-strong)]'
                    )}
                  >
                    <div className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-[rgba(99,102,241,0.1)]">
                      <item.icon size={15} className="text-[var(--accent)]" />
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-[var(--text-primary)]">
                        {item.label}
                      </p>
                      <p className="mt-0.5 text-xs text-[var(--text-muted)]">{item.detail}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </SectionWrapper>
      </div>
    </div>
  );
}
