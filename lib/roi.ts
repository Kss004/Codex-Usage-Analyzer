import type { ScanCandidate } from '@/lib/schemas';

export function totalMinutesSaved(candidates: Array<Pick<ScanCandidate, 'estimatedMinutesSaved'>>): number {
  return candidates.reduce((sum, c) => sum + (c.estimatedMinutesSaved ?? 0), 0);
}

export type RoiInputs = {
  totalMinutes: number;
  teamSize: number;
  hourlyRate: number;
};

export type RoiResult = {
  hoursSaved: number;
  oneTimeValue: number;
  teamValue: number;
};

/**
 * One-time savings if every flagged candidate is addressed once.
 * teamValue scales the one-time value by team size as a rough proxy for the
 * same patterns recurring across a team's codebase.
 */
export function computeRoi({ totalMinutes, teamSize, hourlyRate }: RoiInputs): RoiResult {
  const hoursSaved = totalMinutes / 60;
  const oneTimeValue = hoursSaved * hourlyRate;
  const teamValue = oneTimeValue * Math.max(1, teamSize);
  return {
    hoursSaved: Math.round(hoursSaved * 10) / 10,
    oneTimeValue: Math.round(oneTimeValue),
    teamValue: Math.round(teamValue),
  };
}

export function formatCurrency(n: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(n);
}
