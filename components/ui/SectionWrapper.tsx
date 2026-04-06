'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SectionWrapperProps {
  children: React.ReactNode;
  className?: string;
  /** Delay before animation triggers (seconds) */
  delay?: number;
  /** Once true, animation only plays once on first entry */
  once?: boolean;
}

/**
 * SectionWrapper
 *
 * Wraps section content in a scroll-triggered fade-up animation.
 * Uses framer-motion's useInView — when 15% of the section enters
 * the viewport, the animation fires.
 *
 * Usage:
 *   <SectionWrapper>
 *     <div>...section content...</div>
 *   </SectionWrapper>
 */
export default function SectionWrapper({
  children,
  className,
  delay = 0,
  once = true,
}: SectionWrapperProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    once,
    // Trigger when 15% of the element is visible
    amount: 0.15,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
      transition={{
        duration: 0.55,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
