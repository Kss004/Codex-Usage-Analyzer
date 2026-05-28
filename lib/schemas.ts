import { z } from 'zod';

export const ScanCategorySchema = z.enum([
  'high_complexity',
  'repetitive_pattern',
  'test_gap',
  'refactor_opportunity',
  'doc_gap',
]);
export type ScanCategory = z.infer<typeof ScanCategorySchema>;

export const ScanCandidateSchema = z.object({
  id: z.string().describe('stable kebab-case id; slug of the symbol or path'),
  title: z
    .string()
    .describe('1-line label, e.g. "validateOrder() — nested branches, no tests"'),
  filePath: z.string().nullable().describe('path if known; null for single-paste mode'),
  startLine: z.number().int().nullable(),
  endLine: z.number().int().nullable(),
  category: ScanCategorySchema,
  reason: z
    .string()
    .describe('2-3 sentences explaining why Codex would help here, citing the actual code'),
  codexFitScore: z
    .number()
    .int()
    .min(0)
    .max(100)
    .describe('overall fit for Codex assistance, 0-100'),
  estimatedMinutesSaved: z
    .number()
    .int()
    .min(0)
    .max(480)
    .describe('one-time savings estimate, conservative'),
  confidence: z.enum(['low', 'medium', 'high']),
  snippet: z.string().describe('short excerpt of the relevant code, <= 30 lines'),
});
export type ScanCandidate = z.infer<typeof ScanCandidateSchema>;

export const ScanResultSchema = z.object({
  language: z.string().describe('detected primary language of the input'),
  codebaseReadinessScore: z
    .number()
    .int()
    .min(0)
    .max(100)
    .describe('overall, weighted across candidates'),
  summary: z.string().describe('1-2 sentences for the dashboard header'),
  candidates: z.array(ScanCandidateSchema).max(10),
});
export type ScanResult = z.infer<typeof ScanResultSchema>;

export const AuditMetadataSchema = z.object({
  candidateId: z.string(),
  linesChangedAdd: z.number().int(),
  linesChangedRemove: z.number().int(),
  complexityBefore: z.number().int().min(0).max(100),
  complexityAfter: z.number().int().min(0).max(100),
  estimatedMinutesSaved: z.number().int(),
  rationale: z.string().describe('1 paragraph explaining the change and why it saves time'),
  caveats: z.array(z.string()).max(5),
});
export type AuditMetadata = z.infer<typeof AuditMetadataSchema>;
