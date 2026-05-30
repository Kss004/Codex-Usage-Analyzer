'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { AuditDiff } from '@/components/audit-diff';
import { RoiCard } from '@/components/roi-card';
import { parseAudit } from '@/lib/parse-audit';
import type { ScanCandidate } from '@/lib/schemas';

export function AuditStream({
  candidate,
  onMetadata,
}: {
  candidate: ScanCandidate;
  onMetadata?: (candidateId: string, minutesSaved: number) => void;
}) {
  const [output, setOutput] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  async function run() {
    setLoading(true);
    setError(null);
    setOutput('');
    setDone(false);
    try {
      const res = await fetch('/api/audit', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          candidateId: candidate.id,
          title: candidate.title,
          category: candidate.category,
          reason: candidate.reason,
          snippet: candidate.snippet,
        }),
      });
      if (!res.ok || !res.body) {
        setError(`Audit failed: ${res.status}`);
        setLoading(false);
        return;
      }
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = '';
      while (true) {
        const { value, done: streamDone } = await reader.read();
        if (streamDone) break;
        acc += decoder.decode(value, { stream: true });
        setOutput(acc);
      }
      setDone(true);
      const parsed = parseAudit(acc);
      if (parsed.metadata && onMetadata) {
        onMetadata(candidate.id, parsed.metadata.estimatedMinutesSaved);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }

  const parsed = output ? parseAudit(output) : null;

  return (
    <div className="space-y-3">
      <Button onClick={run} disabled={loading} size="sm" variant="default">
        {loading ? 'Codex is working…' : done ? 'Re-run Deep Audit' : 'Run Deep Audit'}
      </Button>

      {error ? <p className="text-sm text-destructive">{error}</p> : null}

      {parsed?.diff ? <AuditDiff diff={parsed.diff} /> : null}

      {parsed?.metadata ? <RoiCard metadata={parsed.metadata} /> : null}

      {/* Fallback: show raw text only while streaming and before a diff fence appears. */}
      {output && !parsed?.diff && !parsed?.metadata ? (
        <pre className="max-h-[300px] overflow-auto rounded-lg bg-zinc-950 p-4 text-xs leading-relaxed text-zinc-100 ring-1 ring-zinc-800">
          <code>{output}</code>
        </pre>
      ) : null}
    </div>
  );
}
