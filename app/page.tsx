'use client';

import { useState } from 'react';
import { experimental_useObject as useObject } from '@ai-sdk/react';
import { ScanResultSchema, type ScanCandidate } from '@/lib/schemas';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';
import { PasteInput } from '@/components/paste-input';
import { ReadinessScore } from '@/components/readiness-score';
import { ScanCard } from '@/components/scan-card';

export default function Home() {
  const [code, setCode] = useState('');

  const { object, isLoading, submit, error } = useObject({
    api: '/api/scan',
    schema: ScanResultSchema,
  });

  const handleScan = () => {
    if (!code.trim()) return;
    submit({ code });
  };

  const candidates: Partial<ScanCandidate>[] = object?.candidates ?? [];

  return (
    <div className="mx-auto w-full max-w-3xl flex-1 px-6 py-12">
      <header className="space-y-3 pb-8">
        <h1 className="text-3xl font-bold tracking-tight">
          Find where Codex earns its keep
        </h1>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Paste your code. In ~10 seconds, see the ranked list of places OpenAI Codex would
          save the most engineering time — with optional Deep Audits that actually attempt the
          change.
        </p>
      </header>

      <Tabs defaultValue="paste" className="space-y-4">
        <TabsList>
          <TabsTrigger value="paste">Paste code</TabsTrigger>
          <TabsTrigger value="zip" disabled>
            Zip (soon)
          </TabsTrigger>
          <TabsTrigger value="github" disabled>
            GitHub URL (soon)
          </TabsTrigger>
        </TabsList>
        <TabsContent value="paste" className="space-y-4">
          <PasteInput
            value={code}
            onChange={setCode}
            onSubmit={handleScan}
            loading={isLoading}
          />
        </TabsContent>
      </Tabs>

      <Separator className="my-10" />

      {error ? (
        <p className="text-sm text-destructive">Scan failed: {error.message}</p>
      ) : null}

      {object?.summary || object?.codebaseReadinessScore != null ? (
        <section className="space-y-2 pb-6">
          <ReadinessScore score={object?.codebaseReadinessScore} />
          {object?.language ? (
            <p className="text-xs uppercase tracking-wide text-muted-foreground">
              {object.language}
            </p>
          ) : null}
          {object?.summary ? (
            <p className="text-sm leading-relaxed">{object.summary}</p>
          ) : null}
        </section>
      ) : null}

      {isLoading && candidates.length === 0 ? (
        <div className="space-y-3">
          {[0, 1, 2].map((i) => (
            <Skeleton key={i} className="h-24 w-full" />
          ))}
        </div>
      ) : null}

      <ul className="space-y-3">
        {candidates.map((c, i) => {
          if (!c || !c.id || !c.title || !c.category) return null;
          return (
            <li key={c.id ?? i}>
              <ScanCard candidate={c as ScanCandidate} />
            </li>
          );
        })}
      </ul>

      <footer className="mt-16 border-t pt-6 text-xs text-muted-foreground">
        Your code is sent to OpenAI for analysis. Not stored. Not used for training. See{' '}
        <a href="/privacy" className="underline underline-offset-2">
          privacy
        </a>
        .
      </footer>
    </div>
  );
}
