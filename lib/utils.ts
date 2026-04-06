import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merges Tailwind CSS classes safely, handling conflicts.
 * Usage: cn('px-4 py-2', isActive && 'bg-accent', className)
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Calculates years of experience from a start year.
 * e.g. calculateYearsOfExp(2019) → "5+ years"
 */
export function calculateYearsOfExp(startYear: number): string {
  const years = new Date().getFullYear() - startYear;
  return `${years}+`;
}

/**
 * Formats a date range for display.
 * e.g. formatDateRange("Jan 2019", "Oct 2021") → "Jan 2019 – Oct 2021 · 2 yrs 9 mos"
 */
export function formatDateRange(startDate: string, endDate: string | 'Present'): string {
  return `${startDate} – ${endDate}`;
}

/**
 * Calculates duration between two dates for display.
 * e.g. getDuration("Jan 2019", "Oct 2021") → "2 yrs 9 mos"
 */
export function getDuration(startDate: string, endDate: string | 'Present'): string {
  const parseDate = (d: string) => {
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    const parts = d.split(' ');
    const month = months.indexOf(parts[0]);
    const year = parseInt(parts[1]);
    return new Date(year, month);
  };

  const start = parseDate(startDate);
  const end = endDate === 'Present' ? new Date() : parseDate(endDate);

  const totalMonths =
    (end.getFullYear() - start.getFullYear()) * 12 +
    (end.getMonth() - start.getMonth());

  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;

  if (years === 0) return `${months} mos`;
  if (months === 0) return `${years} yr${years > 1 ? 's' : ''}`;
  return `${years} yr${years > 1 ? 's' : ''} ${months} mos`;
}

/**
 * Truncates text to a max length with ellipsis.
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength).trimEnd()}…`;
}

/**
 * Generates a unique ID for chat messages.
 */
export function generateId(): string {
  return Math.random().toString(36).slice(2, 9);
}

/**
 * Debounce function for search/scroll handlers.
 */
export function debounce<T extends (...args: unknown[]) => void>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout>;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}
