'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote, Linkedin } from 'lucide-react';
import SectionWrapper from '@/components/ui/SectionWrapper';
import SectionHeader from '@/components/ui/SectionHeader';
import { cn } from '@/lib/utils';
import { TESTIMONIALS } from '@/data';

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [autoplay, setAutoplay] = useState(true);

  // Auto-advance every 6 seconds
  useEffect(() => {
    if (!autoplay || TESTIMONIALS.length <= 1) return;
    const timer = setInterval(() => {
      setDirection(1);
      setCurrent((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [autoplay]);

  const prev = () => {
    setAutoplay(false);
    setDirection(-1);
    setCurrent((p) => (p - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const next = () => {
    setAutoplay(false);
    setDirection(1);
    setCurrent((p) => (p + 1) % TESTIMONIALS.length);
  };

  const variants = {
    enter:  (d: number) => ({ opacity: 0, x: d > 0 ? 40 : -40 }),
    center: { opacity: 1, x: 0, transition: { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] } },
    exit:   (d: number) => ({ opacity: 0, x: d > 0 ? -40 : 40, transition: { duration: 0.25 } }),
  };

  const active = TESTIMONIALS[current];

  return (
    <div className="section-padding border-b border-[var(--border)] bg-[var(--bg-primary)]">
      <div className="section-container">
        <SectionWrapper>
          <SectionHeader
            label="Social Proof"
            title="Recommendations"
            subtitle="What colleagues and managers say about working with me."
            align="center"
          />

          {/* Placeholder notice */}
          {TESTIMONIALS.some((t) => t.name.startsWith('Add')) && (
            <div className={cn(
              'mb-8 rounded-xl border border-dashed border-[var(--border)] bg-[var(--bg-secondary)] p-4',
              'text-center text-xs text-[var(--text-muted)]',
            )}>
              💡 Export your LinkedIn recommendations:{' '}
              <strong className="text-[var(--text-secondary)]">
                LinkedIn → Settings → Data Privacy → Get a copy of your data → Recommendations
              </strong>
              {' '}and replace the placeholder entries in{' '}
              <code className="font-mono text-[10px]">data/index.ts</code>.
            </div>
          )}

          <div className="relative mx-auto max-w-2xl">
            {/* Quote card */}
            <div className={cn(
              'relative overflow-hidden rounded-2xl border border-[var(--border)]',
              'bg-[var(--bg-card)] p-8',
              'min-h-[220px]',
            )}>
              {/* Background quote mark */}
              <Quote
                size={80}
                className="absolute -right-2 -top-2 opacity-[0.04] text-[var(--accent)]"
                strokeWidth={1}
              />

              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={current}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                >
                  {/* Stars */}
                  <div className="mb-4 flex gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span key={i} className="text-sm text-[#facc15]">★</span>
                    ))}
                  </div>

                  {/* Quote text */}
                  <blockquote className="mb-6 text-sm leading-relaxed text-[var(--text-secondary)] italic">
                    &ldquo;{active.text}&rdquo;
                  </blockquote>

                  {/* Author */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {/* Avatar initials */}
                      <div className={cn(
                        'flex h-10 w-10 items-center justify-center rounded-full',
                        'bg-[rgba(99,102,241,0.15)] font-display text-sm font-bold text-[var(--accent)]',
                      )}>
                        {active.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-[var(--text-primary)]">{active.name}</p>
                        <p className="text-xs text-[var(--text-muted)]">
                          {active.title} · {active.company}
                        </p>
                        <p className="text-xs text-[var(--text-muted)]">{active.relationship}</p>
                      </div>
                    </div>
                    {active.linkedInUrl && (
                      <a
                        href={active.linkedInUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="LinkedIn profile"
                        className="text-[var(--text-muted)] transition-colors hover:text-[#0077b5]"
                      >
                        <Linkedin size={18} />
                      </a>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation */}
            {TESTIMONIALS.length > 1 && (
              <div className="mt-6 flex items-center justify-center gap-4">
                <button
                  onClick={prev}
                  className={cn(
                    'flex h-9 w-9 items-center justify-center rounded-lg border',
                    'border-[var(--border)] text-[var(--text-muted)] transition-all',
                    'hover:border-[var(--border-strong)] hover:text-[var(--text-primary)]',
                  )}
                  aria-label="Previous"
                >
                  <ChevronLeft size={15} />
                </button>

                {/* Dot indicators */}
                <div className="flex gap-1.5">
                  {TESTIMONIALS.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => { setAutoplay(false); setDirection(i > current ? 1 : -1); setCurrent(i); }}
                      className={cn(
                        'rounded-full transition-all duration-300',
                        i === current
                          ? 'h-2 w-6 bg-[var(--accent)]'
                          : 'h-2 w-2 bg-[var(--border-strong)] hover:bg-[var(--text-muted)]',
                      )}
                      aria-label={`Go to testimonial ${i + 1}`}
                    />
                  ))}
                </div>

                <button
                  onClick={next}
                  className={cn(
                    'flex h-9 w-9 items-center justify-center rounded-lg border',
                    'border-[var(--border)] text-[var(--text-muted)] transition-all',
                    'hover:border-[var(--border-strong)] hover:text-[var(--text-primary)]',
                  )}
                  aria-label="Next"
                >
                  <ChevronRight size={15} />
                </button>
              </div>
            )}
          </div>

        </SectionWrapper>
      </div>
    </div>
  );
}
