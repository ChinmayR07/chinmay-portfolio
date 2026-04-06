import { cn, calculateYearsOfExp, getDuration, truncate, generateId } from '@/lib/utils';

describe('cn — Tailwind class merger', () => {
  it('merges class strings', () => {
    expect(cn('px-4', 'py-2')).toBe('px-4 py-2');
  });

  it('handles conditional classes', () => {
    expect(cn('base', false && 'not-included', 'included')).toBe('base included');
  });

  it('resolves Tailwind conflicts — last wins', () => {
    expect(cn('px-4', 'px-8')).toBe('px-8');
  });
});

describe('calculateYearsOfExp', () => {
  it('returns years with + suffix', () => {
    const result = calculateYearsOfExp(2019);
    expect(result).toMatch(/^\d+\+$/);
  });

  it('calculates at least 5 years from 2019', () => {
    const result = calculateYearsOfExp(2019);
    const years = parseInt(result);
    expect(years).toBeGreaterThanOrEqual(5);
  });
});

describe('getDuration', () => {
  it('returns correct duration for completed range', () => {
    expect(getDuration('Jan 2019', 'Oct 2021')).toBe('2 yrs 9 mos');
  });

  it('handles single month', () => {
    expect(getDuration('Jan 2023', 'Feb 2023')).toBe('1 mos');
  });

  it('handles exact years', () => {
    expect(getDuration('Jan 2020', 'Jan 2022')).toBe('2 yrs');
  });

  it('handles Present end date', () => {
    const result = getDuration('Jul 2024', 'Present');
    expect(result).toBeTruthy();
    expect(typeof result).toBe('string');
  });
});

describe('truncate', () => {
  it('returns full string if shorter than max', () => {
    expect(truncate('hello', 10)).toBe('hello');
  });

  it('truncates and appends ellipsis', () => {
    const result = truncate('hello world', 8);
    expect(result).toContain('…');
    expect(result.length).toBeLessThanOrEqual(9);
  });
});

describe('generateId', () => {
  it('returns a non-empty string', () => {
    expect(typeof generateId()).toBe('string');
    expect(generateId().length).toBeGreaterThan(0);
  });

  it('generates unique ids', () => {
    const ids = new Set(Array.from({ length: 100 }, generateId));
    expect(ids.size).toBe(100);
  });
});
