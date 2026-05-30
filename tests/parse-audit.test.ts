import { describe, expect, test } from 'bun:test';
import { parseAudit } from '@/lib/parse-audit';

const fullResponse = [
  '```diff',
  '--- a/input',
  '+++ b/input',
  '@@ -1,3 +1,2 @@',
  '-old line',
  '+new line',
  ' context',
  '```',
  '',
  '```json',
  JSON.stringify({
    candidateId: 'x',
    linesChangedAdd: 1,
    linesChangedRemove: 1,
    complexityBefore: 80,
    complexityAfter: 40,
    estimatedMinutesSaved: 30,
    rationale: 'Simplified.',
    caveats: ['none'],
  }),
  '```',
].join('\n');

describe('parseAudit', () => {
  test('extracts diff and valid metadata from a complete response', () => {
    const r = parseAudit(fullResponse);
    expect(r.diff).toContain('+new line');
    expect(r.diff).toContain('-old line');
    expect(r.metadata).not.toBeNull();
    expect(r.metadata?.candidateId).toBe('x');
    expect(r.metadata?.complexityAfter).toBe(40);
    expect(r.metadata?.caveats).toEqual(['none']);
  });

  test('returns partial diff while the diff fence is still streaming', () => {
    const partial = '```diff\n--- a/input\n+++ b/input\n+half a li';
    const r = parseAudit(partial);
    expect(r.diff).toContain('--- a/input');
    expect(r.metadata).toBeNull();
  });

  test('diff present, metadata null when json has not arrived yet', () => {
    const noJson = '```diff\n-a\n+b\n```\n\nthinking about metadata…';
    const r = parseAudit(noJson);
    expect(r.diff).toBe('-a\n+b');
    expect(r.metadata).toBeNull();
  });

  test('malformed json does not throw and yields null metadata', () => {
    const bad = '```diff\n-a\n+b\n```\n```json\n{ not valid json,, }\n```';
    const r = parseAudit(bad);
    expect(r.diff).toBe('-a\n+b');
    expect(r.metadata).toBeNull();
  });

  test('json failing schema validation yields null metadata', () => {
    const wrong = '```json\n' + JSON.stringify({ candidateId: 'x', complexityBefore: 999 }) + '\n```';
    const r = parseAudit(wrong);
    expect(r.metadata).toBeNull();
  });

  test('no fences at all → both null, raw preserved', () => {
    const r = parseAudit('just some prose with no code fences');
    expect(r.diff).toBeNull();
    expect(r.metadata).toBeNull();
    expect(r.raw).toBe('just some prose with no code fences');
  });

  test('empty input → both null', () => {
    const r = parseAudit('');
    expect(r.diff).toBeNull();
    expect(r.metadata).toBeNull();
  });
});
