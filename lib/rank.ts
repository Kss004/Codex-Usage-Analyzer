import type { ScanCandidate } from '@/lib/schemas';

/**
 * Deterministically order candidates by Codex-Fit Score (descending).
 * The model is asked to return them ordered, but does not reliably comply,
 * so we enforce it in code before display/export. Stable for equal scores.
 */
export function rankCandidates<T extends Pick<ScanCandidate, 'codexFitScore'>>(candidates: T[]): T[] {
  return candidates
    .map((c, i) => ({ c, i }))
    .sort((a, b) => b.c.codexFitScore - a.c.codexFitScore || a.i - b.i)
    .map(({ c }) => c);
}
