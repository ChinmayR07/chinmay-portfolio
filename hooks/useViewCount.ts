'use client';

import { useState, useEffect } from 'react';

interface UseViewCountResult {
  views: number | null; // null = still loading
  isLoading: boolean;
}

/**
 * useViewCount
 *
 * On first call, increments the view counter (POST) and returns the new count.
 * Uses sessionStorage to avoid counting the same person multiple times
 * per browser session — so refreshing the page doesn't spam the counter.
 */
export function useViewCount(): UseViewCountResult {
  const [views, setViews] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const SESSION_KEY = 'portfolio_viewed';

    async function trackView() {
      try {
        // Check if this browser session already counted a view
        const alreadyCounted = sessionStorage.getItem(SESSION_KEY);

        if (alreadyCounted) {
          // Already counted this session — just GET the current count
          const res = await fetch('/api/views');
          const data = await res.json();
          setViews(data.views);
        } else {
          // First visit this session — POST to increment
          const res = await fetch('/api/views', { method: 'POST' });
          const data = await res.json();
          setViews(data.views);
          // Mark this session as counted
          sessionStorage.setItem(SESSION_KEY, 'true');
        }
      } catch (error) {
        console.error('View count error:', error);
        setViews(null);
      } finally {
        setIsLoading(false);
      }
    }

    trackView();
  }, []);

  return { views, isLoading };
}
