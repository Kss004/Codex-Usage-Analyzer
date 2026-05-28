'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CategoryBadge } from '@/components/category-badge';
import { AuditStream } from '@/components/audit-stream';
import type { ScanCandidate } from '@/lib/schemas';

export function ScanCard({ candidate }: { candidate: ScanCandidate }) {
  const [open, setOpen] = useState(false);

  return (
    <Card className="overflow-hidden">
      <CardHeader className="space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-2">
            <CardTitle className="text-base leading-snug">{candidate.title}</CardTitle>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <CategoryBadge category={candidate.category} />
              <span>·</span>
              <span>Codex fit {candidate.codexFitScore}/100</span>
              <span>·</span>
              <span>~{candidate.estimatedMinutesSaved} min saved</span>
              <span>·</span>
              <span className="uppercase tracking-wide">{candidate.confidence}</span>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
          >
            {open ? 'Hide' : 'View'}
          </Button>
        </div>
      </CardHeader>
      {open ? (
        <CardContent className="space-y-4 pt-0">
          <p className="text-sm leading-relaxed text-muted-foreground">{candidate.reason}</p>
          <pre className="max-h-[280px] overflow-auto rounded-md bg-muted p-3 text-xs leading-relaxed">
            <code>{candidate.snippet}</code>
          </pre>
          <AuditStream candidate={candidate} />
        </CardContent>
      ) : null}
    </Card>
  );
}
