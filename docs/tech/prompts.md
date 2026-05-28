# Prompts + Schemas — Codex Usage Analyzer

> Status: draft v1 (2026-05-26). Iterate during Phase 4 build with real inputs.

## Design principles

1. **Schema-first.** Both prompts target Zod schemas, not free text, so the UI can render incrementally.
2. **Cite the line.** Every candidate must point to specific lines or symbols. No vibes-only output.
3. **Honest ROI.** Estimated minutes saved must be conservative and explained. We never want a judge to call out an inflated number.
4. **Stream-friendly.** Quick Scan uses `streamObject` so the first candidate paints early. Avoid prompts that force the model to think for a long time before emitting anything.
5. **No tool calls in MVP.** Keep the loop simple: prompt in, structured output out.

## Schemas (`lib/schemas.ts`)

```ts
import { z } from 'zod';

export const ScanCandidate = z.object({
  id: z.string().describe('stable id; slug of symbol or path'),
  title: z.string().describe('1-line label, e.g. "validateOrder() — nested branches, no tests"'),
  filePath: z.string().nullable().describe('path if known; null for single-paste mode'),
  startLine: z.number().int().nullable(),
  endLine: z.number().int().nullable(),
  category: z.enum(['high_complexity', 'repetitive_pattern', 'test_gap', 'refactor_opportunity', 'doc_gap']),
  reason: z.string().describe('2-3 sentences explaining why Codex would help here, citing the actual code'),
  codexFitScore: z.number().int().min(0).max(100).describe('overall fit for Codex assistance'),
  estimatedMinutesSaved: z.number().int().min(0).max(480).describe('one-time savings estimate, conservative'),
  confidence: z.enum(['low', 'medium', 'high']),
  snippet: z.string().describe('short excerpt of the relevant code, <= 30 lines'),
});

export const ScanResult = z.object({
  language: z.string().describe('detected primary language'),
  codebaseReadinessScore: z.number().int().min(0).max(100).describe('overall, weighted across candidates'),
  candidates: z.array(ScanCandidate).max(10),
  summary: z.string().describe('1-2 sentences for the dashboard header'),
});
export type ScanResult = z.infer<typeof ScanResult>;

export const AuditMetadata = z.object({
  candidateId: z.string(),
  linesChangedAdd: z.number().int(),
  linesChangedRemove: z.number().int(),
  complexityBefore: z.number().int().min(0).max(100),
  complexityAfter: z.number().int().min(0).max(100),
  estimatedMinutesSaved: z.number().int(),
  rationale: z.string().describe('1 paragraph explaining the change and why it saves time'),
  caveats: z.array(z.string()).max(5),
});
export type AuditMetadata = z.infer<typeof AuditMetadata>;
```

## Quick Scan prompt (`gpt-5-mini` via `streamObject`)

**System:**

```
You are a senior staff engineer reviewing code on behalf of a developer who wants to know where an AI coding agent (OpenAI Codex) would save them the most time.

Your output is ranked, structured, and ruthlessly specific.

Selection criteria for candidates (in order):
1. HIGH COMPLEXITY — deeply nested control flow, long functions, unclear branches, manual state machines.
2. REPETITIVE PATTERN — near-duplicate blocks, parallel switch/case arms, boilerplate adapters.
3. TEST GAP — non-trivial logic without visible test coverage in the input.
4. REFACTOR OPPORTUNITY — code that obviously violates a clean pattern (god object, primitive obsession, deep cyclomatic complexity).
5. DOC GAP — non-obvious behavior without any explanation.

Rules:
- Return at most 10 candidates, ordered by codexFitScore descending.
- For each candidate, cite the EXACT lines or symbols. Never say "this file" without naming the function or block.
- Every reason must reference a concrete piece of the code, not generic advice.
- Estimate minutes saved CONSERVATIVELY. A simple refactor for one engineer is usually 10-30 minutes; a substantial test addition is 30-90 minutes. Never go above 480 minutes on a single candidate.
- If the input is too small or already clean, return fewer candidates with low scores and say so in the summary. Do not pad.
- Language-agnostic: detect the language from the input.

Output MUST validate against the provided ScanResult schema.
```

**User template:**

```
Codebase input (language unknown, infer it):

<code>
{INPUT}
</code>

Analyze and return ScanResult.
```

Stream behavior: client renders each `candidates[i]` as it streams in.

## Deep Audit prompt (`gpt-5` via `streamText`)

**System:**

```
You are an OpenAI Codex agent attempting to refactor or improve a specific piece of code chosen by the user. Your output is a unified diff plus a JSON metadata block at the end.

Operating mode:
- Make the SMALLEST change that delivers real value. No drive-by cleanup outside the candidate's scope.
- Preserve external behavior unless the candidate's category is "test_gap" (then you may add tests without changing behavior) or the user explicitly asked for behavior changes.
- Improve readability, reduce branches, factor duplication, or add tests as appropriate to the candidate's category.
- Annotate non-obvious lines with brief inline comments only where the WHY is non-obvious.
- If the change is unsafe to make without more context (e.g. the function calls something defined elsewhere), say so in the rationale and produce a minimal safe-subset change instead.

Output format (strict):

1. A fenced diff block in unified-diff format:
   ```diff
   --- a/<filepath or "input">
   +++ b/<filepath or "input">
   @@ ... @@
   <diff>
   ```

2. Then a single fenced ```json block matching the AuditMetadata schema.

No other prose outside these two blocks.
```

**User template:**

```
Candidate to audit:

Title: {CANDIDATE_TITLE}
Category: {CATEGORY}
Reason it was flagged: {REASON}

Original code:

<code>
{CANDIDATE_SNIPPET}
</code>

Apply the smallest, highest-value change.
```

Stream behavior: client renders diff as it arrives; metadata block parsed at finish and used to populate the ROI card.

## Edge cases

- **Empty / trivial input** — Quick Scan returns 0-1 candidates with low scores and a summary that says so. We do not invent issues.
- **Massive input** — chunk client-side and warn; only first N tokens go through.
- **Non-code input** — Quick Scan returns a 0-candidate result with `summary: "This does not appear to be source code."` No retries.
- **Audit fails to produce valid diff** — UI shows the raw text with a warning; the metadata is null and the ROI card hides.

## Prompt iteration plan

Day 4 evening — run Quick Scan against three real samples:
1. A messy real-world function from an OSS repo (e.g. a parser branch).
2. A small clean utility module.
3. A 200-line dump from a Python ML script.

Adjust the system prompt for each failure mode observed (over-confident on clean code, under-citing lines, inflated ROI). Save iterations in this file as `## v2`, `## v3`, etc.
