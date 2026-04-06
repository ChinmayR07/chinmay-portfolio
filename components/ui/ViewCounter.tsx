'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Eye } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useViewCount } from '@/hooks/useViewCount';

interface ViewCounterProps {
  variant: 'hero' | 'footer';
}

/**
 * Animated count-up — smoothly animates from 0 to the target number.
 * Gives the "live counter" feel even though it's a single DB read.
 */
function useCountUp(target: number | null, duration = 1500) {
  const [display, setDisplay] = useState(0);
  const rafRef = useRef<number>();
  const startRef = useRef<number>();

  useEffect(() => {
    if (target === null) return;

    // Start from a number close to target for subtle animation
    const startValue = Math.max(0, target - Math.min(target, 50));

    const animate = (timestamp: number) => {
      if (!startRef.current) startRef.current = timestamp;
      const elapsed = timestamp - startRef.current;
      const progress = Math.min(elapsed / duration, 1);

      // Ease out cubic — fast start, slow finish
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(startValue + (target - startValue) * eased);

      setDisplay(current);

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      startRef.current = undefined;
    };
  }, [target, duration]);

  return display;
}

export default function ViewCounter({ variant }: ViewCounterProps) {
  const { views, isLoading } = useViewCount();
  const displayCount = useCountUp(views);

  // ── Hero variant — bold, prominent, sits in the stats row ──────
  if (variant === 'hero') {
    return (
      <div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          {isLoading ? (
            // Skeleton loader — matches the stat style
            <div className="h-8 w-16 animate-pulse rounded-md bg-[var(--border)]" />
          ) : (
            <p className="font-display text-2xl font-bold text-[var(--text-primary)] sm:text-3xl">
              {views === null ? '—' : displayCount.toLocaleString()}
              <span className="text-[var(--accent)]">+</span>
            </p>
          )}
          <p className="mt-0.5 text-xs text-[var(--text-muted)]">Portfolio Views</p>
        </motion.div>
      </div>
    );
  }

  // ── Footer variant — subtle, small, tucked in ───────────────────
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1, duration: 0.5 }}
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-3 py-1',
        'border border-[var(--border)] bg-[var(--bg-secondary)]',
        'text-xs text-[var(--text-muted)]'
      )}
    >
      <Eye size={11} className="text-[var(--accent)]" />
      {isLoading ? (
        <span className="h-3 w-8 animate-pulse rounded bg-[var(--border)]" />
      ) : (
        <span>
          <span className="font-semibold text-[var(--text-secondary)]">
            {views === null ? '—' : displayCount.toLocaleString()}
          </span>{' '}
          views
        </span>
      )}
    </motion.div>
  );
}
