/**
 * LLM eval for the Quick Scan engine. Hits the real OpenAI API — costs tokens.
 * Run manually:  bun run evals/scan.eval.ts
 * Requires OPENAI_API_KEY in the environment (.env.local is auto-loaded by bun).
 *
 * These are property-based assertions, not exact-match: LLM output varies, so we
 * assert invariants (valid schema, sane scores, expected categories surface) rather
 * than specific strings.
 */
import { generateText, Output } from 'ai';
import { openai } from '@ai-sdk/openai';
import { ScanResultSchema, type ScanResult } from '../lib/schemas';
import { scanSystemPrompt, scanUserPrompt } from '../lib/prompts';
import { MODELS } from '../lib/models';
import { SAMPLES } from '../lib/samples';

type Case = {
  name: string;
  code: string;
  expectMinCandidates: number;
  expectMaxReadiness?: number;
  expectMinReadiness?: number;
  expectCategories?: string[];
};

const CLEAN = `export const add = (a: number, b: number): number => a + b;`;

const CASES: Case[] = [
  {
    name: 'messy python order processor',
    code: SAMPLES[0].code,
    expectMinCandidates: 4,
    expectMinReadiness: 45,
    expectCategories: ['high_complexity', 'repetitive_pattern'],
  },
  {
    name: 'verbose react form',
    code: SAMPLES[1].code,
    expectMinCandidates: 2,
    expectCategories: ['repetitive_pattern'],
  },
  {
    name: 'trivially clean one-liner',
    code: CLEAN,
    expectMinCandidates: 0,
    expectMaxReadiness: 45,
  },
];

async function scan(code: string): Promise<ScanResult> {
  const { experimental_output } = await generateText({
    model: openai(MODELS.scan),
    output: Output.object({ schema: ScanResultSchema }),
    system: scanSystemPrompt,
    prompt: scanUserPrompt(code),
    providerOptions: { openai: { reasoningEffort: 'low' } },
  });
  return experimental_output as ScanResult;
}

function check(name: string, cond: boolean, detail: string): boolean {
  console.log(`  ${cond ? '✅' : '❌'} ${detail}`);
  return cond;
}

async function run() {
  let passed = 0;
  let total = 0;

  for (const c of CASES) {
    console.log(`\n▶ ${c.name}`);
    let result: ScanResult;
    try {
      result = await scan(c.code);
    } catch (err) {
      console.log(`  ❌ scan threw: ${err instanceof Error ? err.message : String(err)}`);
      total += 1;
      continue;
    }

    const checks: boolean[] = [];
    checks.push(check(c.name, ScanResultSchema.safeParse(result).success, 'output validates against schema'));
    checks.push(
      check(
        c.name,
        result.candidates.length >= c.expectMinCandidates,
        `>= ${c.expectMinCandidates} candidates (got ${result.candidates.length})`,
      ),
    );
    checks.push(
      check(
        c.name,
        result.codebaseReadinessScore >= 0 && result.codebaseReadinessScore <= 100,
        `readiness in [0,100] (got ${result.codebaseReadinessScore})`,
      ),
    );
    checks.push(
      check(
        c.name,
        result.candidates.every((x) => x.codexFitScore >= 0 && x.codexFitScore <= 100),
        'all codexFitScores in [0,100]',
      ),
    );
    checks.push(
      check(
        c.name,
        result.candidates.every((x) => x.estimatedMinutesSaved >= 0 && x.estimatedMinutesSaved <= 480),
        'all minutes-saved in [0,480]',
      ),
    );
    // Note: display ordering is enforced in code via rankCandidates(), not by the
    // model, so we do not assert raw model ordering here (see tests/rank.test.ts).

    if (c.expectMaxReadiness !== undefined) {
      checks.push(
        check(
          c.name,
          result.codebaseReadinessScore <= c.expectMaxReadiness,
          `readiness <= ${c.expectMaxReadiness} for clean code (got ${result.codebaseReadinessScore})`,
        ),
      );
    }
    if (c.expectMinReadiness !== undefined) {
      checks.push(
        check(
          c.name,
          result.codebaseReadinessScore >= c.expectMinReadiness,
          `readiness >= ${c.expectMinReadiness} for messy code (got ${result.codebaseReadinessScore})`,
        ),
      );
    }
    if (c.expectCategories) {
      const got = new Set(result.candidates.map((x) => x.category));
      for (const cat of c.expectCategories) {
        checks.push(check(c.name, got.has(cat as never), `surfaces a "${cat}" candidate`));
      }
    }

    const casePass = checks.every(Boolean);
    passed += casePass ? 1 : 0;
    total += 1;
    console.log(`  → ${casePass ? 'PASS' : 'FAIL'}`);
  }

  console.log(`\n${passed}/${total} eval cases passed.`);
  if (passed < total) process.exit(1);
}

run();
