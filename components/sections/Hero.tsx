'use client';

import { TypeAnimation } from 'react-type-animation';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Download, ArrowDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { heroContainer, fadeUp } from '@/lib/animations';
import { SOCIAL_LINKS } from '@/data';
import ViewCounter from '@/components/ui/ViewCounter';

const STATS = [
  { value: '4.5+', label: 'Years Experience' },
  { value: '8.2M+', label: 'Users Served' },
  { value: '3.9', label: 'MS GPA / 4.0' },
  { value: '90%+', label: 'Test Coverage' },
];

export default function Hero() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[var(--bg-primary)]">
      {/* ── Background Effects ──────────────────────────────────── */}
      {/* Subtle grid */}
      <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-100" />

      {/* Accent radial glow — top right */}
      <div className="pointer-events-none absolute -right-40 -top-40 h-[600px] w-[600px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.08)_0%,transparent_70%)]" />

      {/* Accent radial glow — bottom left */}
      <div className="pointer-events-none absolute -bottom-20 -left-20 h-[400px] w-[400px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.05)_0%,transparent_70%)]" />

      {/* ── Content ─────────────────────────────────────────────── */}
      <div className="section-container relative flex min-h-screen flex-col justify-center pt-[72px]">
        <motion.div
          variants={heroContainer}
          initial="hidden"
          animate="visible"
          className="max-w-3xl py-20"
        >
          {/* Status badge */}
          <motion.div variants={fadeUp} className="mb-6">
            <span
              className={cn(
                'inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium',
                'border border-[rgba(99,102,241,0.3)] bg-[rgba(99,102,241,0.08)] text-[#a5b4fc]'
              )}
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--success)] opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--success)]" />
              </span>
              Open to{' '}
              <TypeAnimation
                sequence={['Software Engineer', 2000, 'Senior Software Engineer', 2000]}
                wrapper="span"
                speed={50}
                deletionSpeed={65}
                repeat={Infinity}
              />{' '}
              Roles · USA
            </span>
          </motion.div>

          {/* Name */}
          <motion.h1
            variants={fadeUp}
            className="font-display text-5xl font-bold tracking-tight text-[var(--text-primary)] sm:text-6xl lg:text-7xl"
          >
            Chinmay <span className="gradient-text">Raichur</span>
          </motion.h1>

          {/* Typewriter role */}
          <motion.div variants={fadeUp} className="mt-4 flex items-center gap-2">
            <span className="font-mono text-sm text-[var(--text-muted)]"></span>
            <TypeAnimation
              sequence={[
                'Full Stack Software Engineer',
                2000,
                'AWS Cloud Engineer',
                2000,
                'AI / ML Engineer',
                2000,
                'Node.js Backend Engineer',
                2000,
              ]}
              wrapper="span"
              speed={50}
              deletionSpeed={65}
              repeat={Infinity}
              className="font-display text-xl font-semibold text-[var(--accent)] sm:text-2xl"
            />
          </motion.div>

          {/* Bio */}
          <motion.p
            variants={fadeUp}
            className="mt-5 max-w-xl text-base leading-relaxed text-[var(--text-secondary)]"
          >
            Building scalable, production-grade systems that serve 8.2M users.
            <br />
            Software Engineer @{' '}
            <a
              href="https://www.tradingtechnologies.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--text-primary)] underline decoration-[var(--border-strong)] underline-offset-2 transition-colors hover:decoration-[var(--accent)]"
            >
              Trading Technologies
            </a>
            , Chicago.
            <br />
            MS Computer Engineering,{' '}
            <span className="text-[var(--text-primary)]">Stony Brook University</span> (GPA
            3.9/4.0).
          </motion.p>

          {/* CTA Buttons */}
          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-3">
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className={cn(
                'inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold',
                'bg-[var(--accent)] text-white transition-all duration-200',
                'hover:bg-[#4f46e5] hover:shadow-[0_0_20px_rgba(99,102,241,0.4)]'
              )}
            >
              View My Work
              <ArrowDown size={14} className="animate-bounce" />
            </a>

            <a
              href="/resume.pdf"
              download="Chinmay_Raichur_Resume.pdf"
              className={cn(
                'inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold',
                'border border-[var(--border-strong)] bg-[var(--bg-secondary)] text-[var(--text-primary)]',
                'transition-all duration-200 hover:border-[var(--accent)] hover:text-[var(--accent)]'
              )}
            >
              <Download size={14} />
              Download Resume
            </a>
          </motion.div>

          {/* Social links */}
          <motion.div variants={fadeUp} className="mt-6 flex items-center gap-3">
            <a
              href={SOCIAL_LINKS.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className={cn(
                'inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-xs font-medium',
                'border-[var(--border)] text-[var(--text-secondary)] transition-all',
                'hover:border-[var(--border-strong)] hover:text-[var(--text-primary)]'
              )}
            >
              <Github size={13} /> GitHub
            </a>
            <a
              href={SOCIAL_LINKS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className={cn(
                'inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-xs font-medium',
                'border-[var(--border)] text-[var(--text-secondary)] transition-all',
                'hover:border-[var(--border-strong)] hover:text-[var(--text-primary)]'
              )}
            >
              <Linkedin size={13} /> LinkedIn
            </a>
            <a
              href={`mailto:${SOCIAL_LINKS.email}`}
              aria-label="Email"
              className={cn(
                'inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-xs font-medium',
                'border-[var(--border)] text-[var(--text-secondary)] transition-all',
                'hover:border-[var(--border-strong)] hover:text-[var(--text-primary)]'
              )}
            >
              <Mail size={13} /> Email
            </a>
          </motion.div>

          {/* Stats row */}
          <motion.div variants={fadeUp} className="mt-12 border-t border-[var(--border)] pt-8">
            <div className="grid grid-cols-2 gap-x-8 gap-y-5 sm:grid-cols-5">
              {STATS.map((stat) => (
                <div key={stat.label}>
                  <p className="font-display text-2xl font-bold text-[var(--text-primary)] sm:text-3xl">
                    {stat.value.replace(/(\d+\.?\d*|\d+)/, (m) => m)}
                    <span className="text-[var(--accent)]">
                      {/* The accent color on + or / etc is handled inline */}
                    </span>
                  </p>
                  <p className="mt-0.5 text-xs text-[var(--text-muted)]">{stat.label}</p>
                </div>
              ))}
              <ViewCounter variant="hero" />
            </div>
          </motion.div>
        </motion.div>

      </div>
    </div>
  );
}
