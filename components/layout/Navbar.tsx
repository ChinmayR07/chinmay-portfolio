'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useActiveSection } from '@/hooks/useActiveSection';
import { useScrolled } from '@/hooks/useScrolled';
import { NAV_LINKS } from '@/data';

export default function Navbar() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const activeSection = useActiveSection();
  const scrolled = useScrolled();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = resolvedTheme === 'dark';

  const toggleTheme = () => setTheme(isDark ? 'light' : 'dark');

  /**
   * Smooth scroll to section when nav link is clicked.
   * Uses the native scroll-behavior: smooth set in globals.css
   * with scroll-padding-top: 72px to account for sticky navbar.
   */
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setMobileOpen(false);
  };

  return (
    <>
      <header
        className={cn(
          'fixed left-0 right-0 top-0 z-50 transition-all duration-300',
          scrolled
            ? // Scrolled: add frosted glass background + border
              'bg-[var(--bg-primary)]/90 border-b border-[var(--border)] backdrop-blur-md'
            : // At top: fully transparent
              'bg-transparent'
        )}
      >
        <nav className="section-container flex h-[72px] items-center justify-between">
          {/* ── Logo ─────────────────────────────────────────────── */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, '#home')}
            className="font-display text-xl font-bold tracking-tight text-[var(--text-primary)] transition-opacity hover:opacity-80"
            aria-label="Chinmay Raichur — Home"
          >
            CR
            <span className="text-[var(--accent)]">.</span>
          </a>

          {/* ── Desktop Links ─────────────────────────────────────── */}
          <ul className="hidden items-center gap-1 md:flex" role="navigation">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <li key={link.id}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={cn(
                      'relative px-3 py-1.5 text-sm font-medium transition-colors duration-200',
                      isActive
                        ? 'text-[var(--accent)]'
                        : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                    )}
                    aria-current={isActive ? 'true' : undefined}
                  >
                    {link.label}
                    {/* Active underline indicator */}
                    {isActive && (
                      <motion.span
                        layoutId="nav-active-indicator"
                        className="absolute bottom-0 left-3 right-3 h-[2px] rounded-full bg-[var(--accent)]"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>

          {/* ── Right Controls ────────────────────────────────────── */}
          <div className="flex items-center gap-2">
            {/* Dark / Light Theme Toggle — FULLY WORKING */}
            {mounted && (
              <button
                onClick={toggleTheme}
                className={cn(
                  'flex h-9 w-9 items-center justify-center rounded-lg border transition-all duration-200',
                  'border-[var(--border)] bg-[var(--bg-secondary)]',
                  'text-[var(--text-secondary)] hover:border-[var(--border-strong)] hover:text-[var(--text-primary)]'
                )}
                aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
                title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {isDark ? (
                    <motion.span
                      key="sun"
                      initial={{ opacity: 0, rotate: -90, scale: 0.7 }}
                      animate={{ opacity: 1, rotate: 0, scale: 1 }}
                      exit={{ opacity: 0, rotate: 90, scale: 0.7 }}
                      transition={{ duration: 0.18 }}
                    >
                      <Sun size={16} />
                    </motion.span>
                  ) : (
                    <motion.span
                      key="moon"
                      initial={{ opacity: 0, rotate: 90, scale: 0.7 }}
                      animate={{ opacity: 1, rotate: 0, scale: 1 }}
                      exit={{ opacity: 0, rotate: -90, scale: 0.7 }}
                      transition={{ duration: 0.18 }}
                    >
                      <Moon size={16} />
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileOpen((prev) => !prev)}
              className={cn(
                'flex h-9 w-9 items-center justify-center rounded-lg border md:hidden',
                'border-[var(--border)] bg-[var(--bg-secondary)] text-[var(--text-secondary)]',
                'hover:border-[var(--border-strong)] hover:text-[var(--text-primary)]'
              )}
              aria-label="Toggle mobile menu"
              aria-expanded={mobileOpen}
            >
              <AnimatePresence mode="wait" initial={false}>
                {mobileOpen ? (
                  <motion.span
                    key="close"
                    initial={{ opacity: 0, rotate: -45 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: 45 }}
                    transition={{ duration: 0.15 }}
                  >
                    <X size={16} />
                  </motion.span>
                ) : (
                  <motion.span
                    key="menu"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <Menu size={16} />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </nav>
      </header>

      {/* ── Mobile Drawer ─────────────────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
              onClick={() => setMobileOpen(false)}
            />

            {/* Drawer panel */}
            <motion.div
              key="drawer"
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className={cn(
                'fixed right-0 top-0 z-50 h-full w-[260px] md:hidden',
                'border-l border-[var(--border)] bg-[var(--bg-primary)] px-6 py-8'
              )}
            >
              {/* Drawer header */}
              <div className="mb-8 flex items-center justify-between">
                <span className="font-display text-lg font-bold">
                  CR<span className="text-[var(--accent)]">.</span>
                </span>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                  aria-label="Close menu"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Drawer links */}
              <ul className="flex flex-col gap-1">
                {NAV_LINKS.map((link, i) => {
                  const isActive = activeSection === link.id;
                  return (
                    <motion.li
                      key={link.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <a
                        href={link.href}
                        onClick={(e) => handleNavClick(e, link.href)}
                        className={cn(
                          'flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all',
                          isActive
                            ? 'bg-accent-muted text-[var(--accent)]'
                            : 'text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] hover:text-[var(--text-primary)]'
                        )}
                      >
                        {isActive && (
                          <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                        )}
                        {link.label}
                      </a>
                    </motion.li>
                  );
                })}
              </ul>

              {/* Drawer theme toggle */}
              <div className="mt-8 border-t border-[var(--border)] pt-6">
                <button
                  onClick={toggleTheme}
                  className={cn(
                    'flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium',
                    'border border-[var(--border)] text-[var(--text-secondary)] transition-all',
                    'hover:border-[var(--border-strong)] hover:text-[var(--text-primary)]'
                  )}
                >
                  {isDark ? <Sun size={15} /> : <Moon size={15} />}
                  {isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
