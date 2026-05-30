import { describe, expect, test } from 'bun:test';
import { ScanResultSchema, AuditMetadataSchema, ScanCandidateSchema } from '@/lib/schemas';

const validCandidate = {
  id: 'x',
  title: 't',
  filePath: null,
  startLine: null,
  endLine: null,
  category: 'high_complexity',
  reason: 'r',
  codexFitScore: 80,
  estimatedMinutesSaved: 60,
  confidence: 'high',
  snippet: 's',
};

describe('ScanCandidateSchema', () => {
  test('accepts a valid candidate', () => {
    expect(ScanCandidateSchema.safeParse(validCandidate).success).toBe(true);
  });

  test('rejects codexFitScore > 100', () => {
    expect(ScanCandidateSchema.safeParse({ ...validCandidate, codexFitScore: 101 }).success).toBe(
      false,
    );
  });

  test('rejects estimatedMinutesSaved > 480', () => {
    expect(
      ScanCandidateSchema.safeParse({ ...validCandidate, estimatedMinutesSaved: 999 }).success,
    ).toBe(false);
  });

  test('rejects unknown category', () => {
    expect(ScanCandidateSchema.safeParse({ ...validCandidate, category: 'nonsense' }).success).toBe(
      false,
    );
  });

  test('rejects bad confidence', () => {
    expect(ScanCandidateSchema.safeParse({ ...validCandidate, confidence: 'maybe' }).success).toBe(
      false,
    );
  });
});

describe('ScanResultSchema', () => {
  test('accepts a valid result', () => {
    const r = ScanResultSchema.safeParse({
      language: 'Python',
      codebaseReadinessScore: 65,
      summary: 's',
      candidates: [validCandidate],
    });
    expect(r.success).toBe(true);
  });

  test('rejects readiness score out of range', () => {
    expect(
      ScanResultSchema.safeParse({
        language: 'Python',
        codebaseReadinessScore: 150,
        summary: 's',
        candidates: [],
      }).success,
    ).toBe(false);
  });

  test('rejects more than 10 candidates', () => {
    expect(
      ScanResultSchema.safeParse({
        language: 'Python',
        codebaseReadinessScore: 50,
        summary: 's',
        candidates: Array(11).fill(validCandidate),
      }).success,
    ).toBe(false);
  });
});

describe('AuditMetadataSchema', () => {
  test('accepts valid metadata', () => {
    const r = AuditMetadataSchema.safeParse({
      candidateId: 'x',
      linesChangedAdd: 3,
      linesChangedRemove: 5,
      complexityBefore: 80,
      complexityAfter: 30,
      estimatedMinutesSaved: 45,
      rationale: 'r',
      caveats: [],
    });
    expect(r.success).toBe(true);
  });

  test('rejects complexity out of range', () => {
    expect(
      AuditMetadataSchema.safeParse({
        candidateId: 'x',
        linesChangedAdd: 3,
        linesChangedRemove: 5,
        complexityBefore: 200,
        complexityAfter: 30,
        estimatedMinutesSaved: 45,
        rationale: 'r',
        caveats: [],
      }).success,
    ).toBe(false);
  });

  test('rejects more than 5 caveats', () => {
    expect(
      AuditMetadataSchema.safeParse({
        candidateId: 'x',
        linesChangedAdd: 3,
        linesChangedRemove: 5,
        complexityBefore: 80,
        complexityAfter: 30,
        estimatedMinutesSaved: 45,
        rationale: 'r',
        caveats: ['1', '2', '3', '4', '5', '6'],
      }).success,
    ).toBe(false);
  });
});
