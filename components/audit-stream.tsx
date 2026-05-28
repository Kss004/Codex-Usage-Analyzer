'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import type { ScanCandidate } from '@/lib/schemas';

export function AuditStream({ candidate }: { candidate: ScanCandidate }) {
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
      while (true) {
        const { value, done: streamDone } = await reader.read();
        if (streamDone) break;
        setOutput((prev) => prev + decoder.decode(value, { stream: true }));
      }
      setDone(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-3">
      <Button onClick={run} disabled={loading} size="sm" variant="default">
        {loading ? 'Codex is thinking…' : done ? 'Re-run audit' : 'Run Deep Audit'}
      </Button>
      {error ? (
        <p className="text-sm text-destructive">{error}</p>
      ) : output ? (
        <pre className="max-h-[480px] overflow-auto rounded-lg bg-zinc-950 p-4 text-xs leading-relaxed text-zinc-100 ring-1 ring-zinc-800">
          <code>{output}</code>
        </pre>
      ) : null}
    </div>
  );
}
