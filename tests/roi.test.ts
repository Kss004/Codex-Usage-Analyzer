import { describe, expect, test } from 'bun:test';
import { computeRoi, formatCurrency, totalMinutesSaved } from '@/lib/roi';

describe('totalMinutesSaved', () => {
  test('sums estimatedMinutesSaved', () => {
    expect(
      totalMinutesSaved([
        { estimatedMinutesSaved: 30 },
        { estimatedMinutesSaved: 90 },
        { estimatedMinutesSaved: 0 },
      ]),
    ).toBe(120);
  });

  test('empty list → 0', () => {
    expect(totalMinutesSaved([])).toBe(0);
  });

  test('tolerates missing/undefined minutes', () => {
    expect(
      totalMinutesSaved([{ estimatedMinutesSaved: 10 }, {} as { estimatedMinutesSaved: number }]),
    ).toBe(10);
  });
});

describe('computeRoi', () => {
  test('basic math: 120 min, team 10, $80/hr', () => {
    const r = computeRoi({ totalMinutes: 120, teamSize: 10, hourlyRate: 80 });
    expect(r.hoursSaved).toBe(2);
    expect(r.oneTimeValue).toBe(160); // 2 hrs * 80
    expect(r.teamValue).toBe(1600); // *10
  });

  test('zero minutes → zero value', () => {
    const r = computeRoi({ totalMinutes: 0, teamSize: 5, hourlyRate: 100 });
    expect(r.hoursSaved).toBe(0);
    expect(r.oneTimeValue).toBe(0);
    expect(r.teamValue).toBe(0);
  });

  test('team size below 1 is clamped to 1', () => {
    const r = computeRoi({ totalMinutes: 60, teamSize: 0, hourlyRate: 50 });
    expect(r.teamValue).toBe(50);
  });

  test('hours rounded to one decimal', () => {
    const r = computeRoi({ totalMinutes: 100, teamSize: 1, hourlyRate: 60 });
    expect(r.hoursSaved).toBe(1.7);
  });
});

describe('formatCurrency', () => {
  test('formats USD with no decimals', () => {
    expect(formatCurrency(1600)).toBe('$1,600');
    expect(formatCurrency(0)).toBe('$0');
  });
});
