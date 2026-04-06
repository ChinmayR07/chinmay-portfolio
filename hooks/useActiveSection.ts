'use client';

import { useState, useEffect, useRef } from 'react';
import { NAV_LINKS } from '@/data';

/**
 * useActiveSection
 *
 * Tracks which section is currently in the viewport using IntersectionObserver.
 * Returns the id of the active section (e.g. "experience").
 *
 * The Navbar uses this to highlight the correct link as the user scrolls.
 *
 * How it works:
 * - Observes all section elements whose id matches NAV_LINKS
 * - When a section enters the viewport (≥20% visible), it becomes "active"
 * - Uses a Map to track visibility ratio — whichever visible section is
 *   highest on the page wins (accounts for fast scrolling)
 */
export function useActiveSection() {
  const [activeSection, setActiveSection] = useState<string>('home');
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Map to store current intersection ratio for each section
    const visibilityMap = new Map<string, number>();

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        visibilityMap.set(entry.target.id, entry.intersectionRatio);
      });

      // Find the section with the highest visibility ratio that is
      // intersecting — gives a "most visible wins" behavior
      let bestId = '';
      let bestRatio = 0;

      visibilityMap.forEach((ratio, id) => {
        if (ratio > bestRatio) {
          bestRatio = ratio;
          bestId = id;
        }
      });

      if (bestId) {
        setActiveSection(bestId);
      }
    };

    observerRef.current = new IntersectionObserver(handleIntersection, {
      // rootMargin: shrinks the top of the viewport by navbar height (72px)
      // so sections trigger only when they're actually readable, not hidden behind nav
      rootMargin: '-72px 0px -40% 0px',
      threshold: [0, 0.1, 0.2, 0.5, 1.0],
    });

    // Observe all sections that have a matching id in NAV_LINKS
    const sectionIds = NAV_LINKS.map((l) => l.id);
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observerRef.current?.observe(el);
    });

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  return activeSection;
}
