import type { Variants } from 'framer-motion';

// ─── Fade Up ──────────────────────────────────────────────────────────────────
// Used for: section content, cards, text blocks
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

// ─── Fade In ──────────────────────────────────────────────────────────────────
// Used for: images, overlays, subtle reveals
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
};

// ─── Slide In Left ────────────────────────────────────────────────────────────
// Used for: timeline items, sidebar content
export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

// ─── Slide In Right ───────────────────────────────────────────────────────────
export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

// ─── Scale In ─────────────────────────────────────────────────────────────────
// Used for: skill badges, small chips
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.88 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3, ease: 'easeOut' },
  },
};

// ─── Stagger Container ────────────────────────────────────────────────────────
// Wrap around lists/grids so children animate one after another
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

// ─── Stagger Container (Fast) ─────────────────────────────────────────────────
// For dense grids like skill badges
export const staggerFast: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0.05,
    },
  },
};

// ─── Card Hover ───────────────────────────────────────────────────────────────
// Apply as whileHover prop directly on motion.div
export const cardHoverProps = {
  whileHover: {
    y: -4,
    scale: 1.015,
    transition: { duration: 0.2, ease: 'easeOut' },
  },
  whileTap: { scale: 0.99 },
};

// ─── Hero Stagger ─────────────────────────────────────────────────────────────
// Longer stagger for the hero section sequence
export const heroContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
};

// ─── Timeline Line Draw ───────────────────────────────────────────────────────
// SVG path animation for the experience timeline vertical line
export const lineDrawDown: Variants = {
  hidden: { scaleY: 0, originY: 0 },
  visible: {
    scaleY: 1,
    transition: { duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

// ─── Chat Panel Slide Up ──────────────────────────────────────────────────────
export const chatPanelVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.97,
    transformOrigin: 'bottom right',
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] },
  },
  exit: {
    opacity: 0,
    y: 12,
    scale: 0.97,
    transition: { duration: 0.18, ease: 'easeIn' },
  },
};
