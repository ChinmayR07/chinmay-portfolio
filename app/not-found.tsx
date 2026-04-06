import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[var(--bg-primary)] text-[var(--text-primary)]">
      <p className="font-mono text-sm text-[var(--accent)]">404</p>
      <h1 className="font-display text-4xl font-bold">Page not found</h1>
      <p className="text-[var(--text-secondary)]">
        Looks like this route doesn&apos;t exist.
      </p>
      <Link
        href="/"
        className="mt-4 rounded-lg bg-[var(--accent)] px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
      >
        Back to portfolio
      </Link>
    </div>
  );
}
