import { describe, expect, test } from 'bun:test';
import { buildReportMarkdown } from '@/lib/export-md';
import type { ScanResult } from '@/lib/schemas';

const result: ScanResult = {
  language: 'Python',
  codebaseReadinessScore: 65,
  summary: 'A messy order processor.',
  candidates: [
    {
      id: 'process-orders',
      title: 'process_orders() — nested control flow',
      filePath: 'orders.py',
      startLine: 1,
      endLine: 80,
      category: 'high_complexity',
      reason: 'Deeply nested loops and manual state.',
      codexFitScore: 95,
      estimatedMinutesSaved: 180,
      confidence: 'high',
      snippet: 'def process_orders(...):',
    },
    {
      id: 'tests',
      title: 'Missing unit tests',
      filePath: null,
      startLine: null,
      endLine: null,
      category: 'test_gap',
      reason: 'No coverage.',
      codexFitScore: 90,
      estimatedMinutesSaved: 90,
      confidence: 'medium',
      snippet: '',
    },
  ],
};

describe('buildReportMarkdown', () => {
  const md = buildReportMarkdown(result);

  test('includes title, language, and score', () => {
    expect(md).toContain('# Codex-Readiness Report');
    expect(md).toContain('Python');
    expect(md).toContain('65/100');
  });

  test('includes each candidate title', () => {
    expect(md).toContain('process_orders() — nested control flow');
    expect(md).toContain('Missing unit tests');
  });

  test('computes total minutes/hours', () => {
    expect(md).toContain('270 minutes');
    expect(md).toContain('4.5 hours');
  });

  test('handles empty candidate list without throwing', () => {
    const empty = buildReportMarkdown({ ...result, candidates: [] });
    expect(empty).toContain('Candidates (0)');
    expect(empty).toContain('~0 minutes');
  });
});
