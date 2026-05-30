'use client';

import { useState } from 'react';
import { experimental_useObject as useObject } from '@ai-sdk/react';
import { ScanResultSchema, type ScanCandidate, type ScanResult } from '@/lib/schemas';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { PasteInput } from '@/components/paste-input';
import { ZipInput } from '@/components/zip-input';
import { GithubInput } from '@/components/github-input';
import { ReadinessScore } from '@/components/readiness-score';
import { ScanCard } from '@/components/scan-card';
import { RoiCalculator } from '@/components/roi-calculator';
import { SkepticMode } from '@/components/skeptic-mode';
import { totalMinutesSaved } from '@/lib/roi';
import { buildReportMarkdown, downloadMarkdown } from '@/lib/export-md';

export default function Home() {
  const [code, setCode] = useState('');
  const [sourceNote, setSourceNote] = useState<string | null>(null);

  const { object, isLoading, submit, error } = useObject({
    api: '/api/scan',
    schema: ScanResultSchema,
  });

  const runScan = (input: string, note?: string) => {
    if (!input.trim()) return;
    setSourceNote(note ?? null);
    submit({ code: input });
  };

  const candidates = object?.candidates ?? [];
  const readyCandidates = candidates.filter(
    (c): c is ScanCandidate => !!c && !!c.id && !!c.title && !!c.category,
  );
  const scanComplete = !isLoading && readyCandidates.length > 0;
  const totalMins = totalMinutesSaved(readyCandidates);

  return (
    <div className="mx-auto w-full max-w-3xl flex-1 px-6 py-12">
      <header className="space-y-4 pb-8">
        <h1 className="text-3xl font-bold tracking-tight">Find where Codex earns its keep</h1>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Paste your code, drop a zip, or point it at a GitHub repo. In ~10 seconds, see the
          ranked list of places OpenAI Codex would save the most engineering time — with Deep
          Audits that actually attempt the change.
        </p>
        <div className="flex flex-wrap gap-x-6 gap-y-1 text-xs text-muted-foreground">
          <span>
            <strong className="text-foreground">84%</strong> of devs use AI tools
          </span>
          <span>
            <strong className="text-foreground">29%</strong> trust them
          </span>
          <span>
            <strong className="text-foreground">19%</strong> slower in METR&apos;s trial
          </span>
          <span className="text-muted-foreground/60">— we fix the targeting.</span>
        </div>
      </header>

      <Tabs defaultValue="paste" className="space-y-4">
        <TabsList>
          <TabsTrigger value="paste">Paste code</TabsTrigger>
          <TabsTrigger value="zip">Zip upload</TabsTrigger>
          <TabsTrigger value="github">GitHub URL</TabsTrigger>
        </TabsList>
        <TabsContent value="paste" className="space-y-4">
          <PasteInput value={code} onChange={setCode} onSubmit={() => runScan(code)} loading={isLoading} />
        </TabsContent>
        <TabsContent value="zip" className="space-y-4">
          <ZipInput
            loading={isLoading}
            onCode={(c, meta) => {
              setCode(c);
              runScan(c, `${meta.files.length} files from zip`);
            }}
          />
        </TabsContent>
        <TabsContent value="github" className="space-y-4">
          <GithubInput
            loading={isLoading}
            onCode={(c, meta) => {
              setCode(c);
              runScan(c, `${meta.repo} · ${meta.files.length} files`);
            }}
          />
        </TabsContent>
      </Tabs>

      <Separator className="my-10" />

      {error ? <p className="text-sm text-destructive">Scan failed: {error.message}</p> : null}

      {object?.summary || object?.codebaseReadinessScore != null ? (
        <section className="space-y-3 pb-6">
          <ReadinessScore score={object?.codebaseReadinessScore} />
          <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-wide text-muted-foreground">
            {object?.language ? <span>{object.language}</span> : null}
            {sourceNote ? (
              <>
                <span>·</span>
                <span className="normal-case">{sourceNote}</span>
              </>
            ) : null}
          </div>
          {object?.summary ? <p className="text-sm leading-relaxed">{object.summary}</p> : null}

          {scanComplete ? (
            <div className="flex flex-wrap gap-2 pt-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  downloadMarkdown(
                    'codex-readiness-report.md',
                    buildReportMarkdown(object as ScanResult),
                  )
                }
              >
                Download report
              </Button>
              <a
                className={cn(buttonVariants({ variant: 'outline', size: 'sm' }))}
                href={`/api/og?score=${object?.codebaseReadinessScore ?? 0}&lang=${encodeURIComponent(
                  object?.language ?? 'code',
                )}&summary=${encodeURIComponent(object?.summary ?? '')}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Share score
              </a>
            </div>
          ) : null}
        </section>
      ) : null}

      {isLoading && readyCandidates.length === 0 ? (
        <div className="space-y-3">
          {[0, 1, 2].map((i) => (
            <Skeleton key={i} className="h-24 w-full" />
          ))}
        </div>
      ) : null}

      <ul className="space-y-3">
        {readyCandidates.map((c) => (
          <li key={c.id}>
            <ScanCard candidate={c} />
          </li>
        ))}
      </ul>

      {scanComplete && totalMins > 0 ? (
        <div className="mt-6 grid gap-4">
          <RoiCalculator totalMinutes={totalMins} />
          <SkepticMode result={object as ScanResult} />
        </div>
      ) : null}

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
