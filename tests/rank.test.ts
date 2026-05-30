import { describe, expect, test } from 'bun:test';
import { rankCandidates } from '@/lib/rank';

describe('rankCandidates', () => {
  test('orders by codexFitScore descending', () => {
    const out = rankCandidates([
      { codexFitScore: 50 },
      { codexFitScore: 95 },
      { codexFitScore: 70 },
    ]);
    expect(out.map((c) => c.codexFitScore)).toEqual([95, 70, 50]);
  });

  test('is stable for equal scores (preserves input order)', () => {
    const out = rankCandidates([
      { codexFitScore: 80, id: 'a' },
      { codexFitScore: 80, id: 'b' },
      { codexFitScore: 90, id: 'c' },
    ]);
    expect(out.map((c) => c.id)).toEqual(['c', 'a', 'b']);
  });

  test('does not mutate the input array', () => {
    const input = [{ codexFitScore: 10 }, { codexFitScore: 90 }];
    rankCandidates(input);
    expect(input.map((c) => c.codexFitScore)).toEqual([10, 90]);
  });

  test('handles empty + single', () => {
    expect(rankCandidates([])).toEqual([]);
    expect(rankCandidates([{ codexFitScore: 42 }])).toEqual([{ codexFitScore: 42 }]);
  });
});
