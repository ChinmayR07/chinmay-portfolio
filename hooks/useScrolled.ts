'use client';

import { useState, useEffect } from 'react';

/**
 * useScrolled
 *
 * Returns true when the page has scrolled past a threshold (default 20px).
 * Used by the Navbar to add a backdrop blur / border when not at the top.
 */
export function useScrolled(threshold = 20): boolean {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > threshold);
    };

    // Check immediately on mount
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  return scrolled;
}
