'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Github, Star, GitFork, ExternalLink, Code2, Users, BookMarked } from 'lucide-react';
import SectionWrapper from '@/components/ui/SectionWrapper';
import SectionHeader from '@/components/ui/SectionHeader';
import { staggerContainer, fadeUp } from '@/lib/animations';
import { cn } from '@/lib/utils';
import { SOCIAL_LINKS } from '@/data';
import type { GitHubRepo, GitHubUser } from '@/types';

// Language color map
const LANG_COLORS: Record<string, string> = {
  TypeScript: '#3178c6',
  JavaScript: '#f7df1e',
  Java: '#b07219',
  Python: '#3572A5',
  'C++': '#f34b7d',
  'C#': '#178600',
  Go: '#00add8',
  Rust: '#dea584',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Shell: '#89e051',
};

// GitHub contribution squares — static visual representation
// In production, use github-contributions-api or react-activity-calendar
const DAYS_OF_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function ContributionGraph() {
  // Generate a representative contribution pattern (52 weeks × 7 days)
  // Replace with real data from github-contributions-api in production
  const weeks = Array.from({ length: 52 }, (_, wi) =>
    Array.from({ length: 7 }, (_, di) => {
      const seed = (wi * 7 + di) * 17 + 3;
      const rand = ((seed * 1103515245 + 12345) & 0x7fffffff) % 100;
      // Create a realistic-looking pattern (more active on weekdays, occasional bursts)
      const isWeekend = di === 0 || di === 6;
      const base = isWeekend ? 20 : 50;
      const level =
        rand < base ? 0 : rand < base + 20 ? 1 : rand < base + 35 ? 2 : rand < base + 45 ? 3 : 4;
      return level;
    })
  );

  const colors = [
    'var(--border)',
    'rgba(99,102,241,0.2)',
    'rgba(99,102,241,0.4)',
    'rgba(99,102,241,0.7)',
    'rgba(99,102,241,1)',
  ];

  return (
    <div className="overflow-x-auto">
      <div className="inline-flex min-w-max flex-col gap-1">
        <div className="flex gap-[3px]">
          {weeks.map((week, wi) => (
            <div key={wi} className="flex flex-col gap-[3px]">
              {week.map((level, di) => (
                <div
                  key={di}
                  className="h-[10px] w-[10px] rounded-[2px] transition-opacity hover:opacity-80"
                  style={{ background: colors[level] }}
                  title={`Level ${level}`}
                />
              ))}
            </div>
          ))}
        </div>
        <div className="mt-1 flex items-center justify-end gap-1.5">
          <span className="text-[10px] text-[var(--text-muted)]">Less</span>
          {colors.map((c, i) => (
            <div key={i} className="h-[10px] w-[10px] rounded-[2px]" style={{ background: c }} />
          ))}
          <span className="text-[10px] text-[var(--text-muted)]">More</span>
        </div>
      </div>
    </div>
  );
}

export default function GitHubActivity() {
  const [data, setData] = useState<{ user: GitHubUser; repos: GitHubRepo[] } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch('/api/github')
      .then((r) => r.json())
      .then((d) => {
        setData(d);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  return (
    <div className="section-padding border-b border-[var(--border)] bg-[var(--bg-secondary)]">
      <div className="section-container">
        <SectionWrapper>
          <SectionHeader
            label="Open Source"
            title="GitHub Activity"
            subtitle="Consistent contributions — because great engineers ship code, not just talk about it."
          />

          {/* Contribution graph card */}
          <div
            className={cn('mb-8 rounded-xl border border-[var(--border)] bg-[var(--bg-card)] p-5')}
          >
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Github size={15} className="text-[var(--text-secondary)]" />
                <span className="text-sm font-semibold text-[var(--text-primary)]">
                  Contribution Activity
                </span>
                <span className="rounded-full bg-[var(--bg-secondary)] px-2 py-0.5 text-[10px] text-[var(--text-muted)]">
                  Last 12 months
                </span>
              </div>
              <a
                href={SOCIAL_LINKS.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-xs text-[var(--text-muted)] hover:text-[var(--accent)]"
              >
                View profile <ExternalLink size={11} />
              </a>
            </div>
            <ContributionGraph />
            <p className="mt-3 text-xs text-[var(--text-muted)]">
              * Install{' '}
              <code className="rounded bg-[var(--bg-secondary)] px-1 py-0.5 font-mono text-[10px]">
                react-activity-calendar
              </code>{' '}
              and connect the GitHub contributions API for real live data.
            </p>
          </div>

          {/* GitHub stats */}
          {!error && (
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4"
            >
              {[
                {
                  icon: BookMarked,
                  label: 'Public Repos',
                  value: loading ? '...' : (data?.user?.public_repos ?? '—'),
                },
                {
                  icon: Users,
                  label: 'Followers',
                  value: loading ? '...' : (data?.user?.followers ?? '—'),
                },
                { icon: Code2, label: 'Languages', value: '8+' },
                {
                  icon: Star,
                  label: 'Total Stars',
                  value: loading ? '...' : (data?.repos?.reduce((s, r) => s + r.stars, 0) ?? '—'),
                },
              ].map((stat) => (
                <motion.div
                  key={stat.label}
                  variants={fadeUp}
                  className="rounded-xl border border-[var(--border)] bg-[var(--bg-card)] p-4 text-center"
                >
                  <stat.icon size={16} className="mx-auto mb-2 text-[var(--accent)]" />
                  <p className="font-display text-2xl font-bold text-[var(--text-primary)]">
                    {stat.value}
                  </p>
                  <p className="mt-0.5 text-xs text-[var(--text-muted)]">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Pinned repos */}
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-[var(--text-muted)]">
              Pinned Repositories
            </h3>

            {loading && (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="h-28 animate-pulse rounded-xl border border-[var(--border)] bg-[var(--bg-card)]"
                  />
                ))}
              </div>
            )}

            {error && (
              <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-card)] p-6 text-center">
                <p className="text-sm text-[var(--text-muted)]">
                  Could not load GitHub data. Set{' '}
                  <code className="font-mono text-[11px]">NEXT_PUBLIC_GITHUB_USERNAME</code> in{' '}
                  <code className="font-mono text-[11px]">.env.local</code>.
                </p>
              </div>
            )}

            {!loading && !error && data && (
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid grid-cols-1 gap-4 sm:grid-cols-2"
              >
                {(data?.repos ?? []).map((repo) => (
                  <motion.a
                    key={repo.id}
                    variants={fadeUp}
                    href={repo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      'group flex flex-col gap-2 rounded-xl border border-[var(--border)]',
                      'bg-[var(--bg-card)] p-4 transition-all',
                      'hover:border-[var(--accent)] hover:shadow-[0_0_0_1px_rgba(99,102,241,0.1)]'
                    )}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <BookMarked size={13} className="text-[var(--text-muted)]" />
                        <span className="text-sm font-semibold text-[var(--accent)] group-hover:underline">
                          {repo.name}
                        </span>
                      </div>
                      <ExternalLink
                        size={12}
                        className="text-[var(--text-muted)] opacity-0 transition-opacity group-hover:opacity-100"
                      />
                    </div>
                    {repo.description && (
                      <p className="text-xs leading-relaxed text-[var(--text-secondary)]">
                        {repo.description}
                      </p>
                    )}
                    <div className="mt-auto flex items-center gap-4">
                      {repo.language && (
                        <span className="flex items-center gap-1 text-xs text-[var(--text-muted)]">
                          <span
                            className="h-2.5 w-2.5 rounded-full"
                            style={{ background: LANG_COLORS[repo.language] ?? '#8892a4' }}
                          />
                          {repo.language}
                        </span>
                      )}
                      {repo.stars > 0 && (
                        <span className="flex items-center gap-1 text-xs text-[var(--text-muted)]">
                          <Star size={11} /> {repo.stars}
                        </span>
                      )}
                    </div>
                  </motion.a>
                ))}
              </motion.div>
            )}
          </div>
        </SectionWrapper>
      </div>
    </div>
  );
}
