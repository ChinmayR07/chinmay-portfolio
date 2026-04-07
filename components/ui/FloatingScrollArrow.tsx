'use client';

import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { cn } from '@/lib/utils';

const NAVBAR_OFFSET = 72;

export default function FloatingScrollArrow() {
  const [nextSectionId, setNextSectionId] = useState<string | null>(null);

  const hasNextSection = useMemo(() => nextSectionId !== null, [nextSectionId]);

  useEffect(() => {
    const updateNextSection = () => {
      const sections = Array.from(document.querySelectorAll('main section[id]')) as HTMLElement[];
      if (!sections.length) {
        setNextSectionId(null);
        return;
      }

      const currentOffset = window.scrollY + NAVBAR_OFFSET + 12;
      const nextSection = sections.find((section) => section.offsetTop > currentOffset);
      setNextSectionId(nextSection?.id ?? null);
    };

    updateNextSection();
    window.addEventListener('scroll', updateNextSection, { passive: true });
    window.addEventListener('resize', updateNextSection);

    return () => {
      window.removeEventListener('scroll', updateNextSection);
      window.removeEventListener('resize', updateNextSection);
    };
  }, []);

  const handleScrollToNext = () => {
    if (!nextSectionId) return;
    document.getElementById(nextSectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <motion.button
      type="button"
      onClick={handleScrollToNext}
      aria-label="Scroll to next section"
      className={cn(
        'fixed inset-x-0 z-40 mx-auto w-max',
        'bottom-[calc(1rem+env(safe-area-inset-bottom))] sm:bottom-6',
        'flex h-11 items-center gap-1 rounded-full border px-3',
        'border-[var(--border-strong)] bg-[var(--bg-card)]/90 text-[var(--text-secondary)] backdrop-blur',
        'transition-all duration-200 hover:border-[var(--accent)] hover:text-[var(--accent)]',
        hasNextSection ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
      )}
      initial={{ opacity: 0 }}
      animate={{ opacity: hasNextSection ? 1 : 0 }}
      transition={{ duration: 0.2 }}
    >
      <span className="text-xs font-semibold uppercase tracking-[0.14em]">Scroll</span>
      <motion.span
        animate={{ y: [0, 4, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <ArrowDown size={14} />
      </motion.span>
    </motion.button>
  );
}
