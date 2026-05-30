'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import type { ScanResult } from '@/lib/schemas';

const PERSONAS: { key: string; label: string }[] = [
  { key: 'cfo', label: 'CFO' },
  { key: 'senior_engineer', label: 'Senior engineer' },
  { key: 'cto', label: 'CTO' },
];

export function SkepticMode({ result }: { result: ScanResult }) {
  const [persona, setPersona] = useState('cfo');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function generate(p: string) {
    setPersona(p);
    setLoading(true);
    setError(null);
    setOutput('');
    try {
      const res = await fetch('/api/skeptic', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          persona: p,
          language: result.language,
          readiness: result.codebaseReadinessScore,
          summary: result.summary,
          candidates: result.candidates.map((c) => ({
            title: c.title,
            category: c.category,
            estimatedMinutesSaved: c.estimatedMinutesSaved,
          })),
        }),
      });
      if (!res.ok || !res.body) {
        setError(`Failed: ${res.status}`);
        return;
      }
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = '';
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        setOutput(acc);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-4 rounded-lg border bg-card p-5">
      <div>
        <h3 className="text-sm font-semibold">Skeptic Mode</h3>
        <p className="text-xs text-muted-foreground">
          Turn this scan into a pitch aimed at the skeptic who controls the budget.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {PERSONAS.map((p) => (
          <Button
            key={p.key}
            size="sm"
            variant={persona === p.key && output ? 'default' : 'outline'}
            disabled={loading}
            onClick={() => generate(p.key)}
          >
            Pitch the {p.label}
          </Button>
        ))}
      </div>

      {error ? <p className="text-sm text-destructive">{error}</p> : null}
      {loading && !output ? (
        <p className="text-sm text-muted-foreground">Writing the pitch…</p>
      ) : null}
      {output ? (
        <p className="whitespace-pre-wrap text-sm leading-relaxed">{output}</p>
      ) : null}
    </div>
  );
}
