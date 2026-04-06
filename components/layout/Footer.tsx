import { Github, Linkedin, Mail, Heart } from 'lucide-react';
import { SOCIAL_LINKS } from '@/data';
import ViewCounter from '@/components/ui/ViewCounter';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--border)] bg-[var(--bg-primary)]">
      <div className="section-container flex flex-col items-center gap-4 py-10 sm:flex-row sm:justify-between">
        {/* Logo + tagline */}
        <div>
          <p className="font-display text-base font-bold">
            CR<span className="text-[var(--accent)]">.</span>
          </p>
          <p className="mt-0.5 text-xs text-[var(--text-muted)]">
            Full Stack Software Engineer · Chicago, IL
          </p>
        </div>

        {/* ── Subtle view counter pill ── */}
        <ViewCounter variant="footer" />

        {/* Social links */}
        <div className="flex items-center gap-3">
          <a
            href={SOCIAL_LINKS.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--border)] text-[var(--text-secondary)] transition-all hover:border-[var(--border-strong)] hover:text-[var(--text-primary)]"
          >
            <Github size={14} />
          </a>
          <a
            href={SOCIAL_LINKS.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--border)] text-[var(--text-secondary)] transition-all hover:border-[var(--border-strong)] hover:text-[var(--text-primary)]"
          >
            <Linkedin size={14} />
          </a>
          <a
            href={`mailto:${SOCIAL_LINKS.email}`}
            aria-label="Email"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--border)] text-[var(--text-secondary)] transition-all hover:border-[var(--border-strong)] hover:text-[var(--text-primary)]"
          >
            <Mail size={14} />
          </a>
        </div>

        {/* Copyright */}
        <p className="flex items-center gap-1 text-xs text-[var(--text-muted)]">
          © {year} Chinmay Raichur · Built with
          <Heart size={10} className="text-[var(--accent)]" />
          using Next.js
        </p>
      </div>
    </footer>
  );
}
