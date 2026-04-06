import { cn } from '@/lib/utils';

interface SectionHeaderProps {
  label: string;       // e.g. "Career"
  title: string;       // e.g. "Work Experience"
  subtitle?: string;   // optional description below title
  className?: string;
  align?: 'left' | 'center';
}

export default function SectionHeader({
  label,
  title,
  subtitle,
  className,
  align = 'left',
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        'mb-10',
        align === 'center' && 'text-center',
        className
      )}
    >
      <p className="section-label mb-2">{label}</p>
      <h2 className="font-display text-3xl font-bold tracking-tight text-[var(--text-primary)] sm:text-4xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-[var(--text-secondary)]">
          {subtitle}
        </p>
      )}
    </div>
  );
}
