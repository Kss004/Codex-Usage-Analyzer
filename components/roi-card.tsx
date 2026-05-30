import type { AuditMetadata } from '@/lib/schemas';

function ComplexityBar({ value, tone }: { value: number; tone: 'before' | 'after' }) {
  const pct = Math.max(0, Math.min(100, value));
  const color = tone === 'after' ? 'bg-emerald-500' : 'bg-red-500/70';
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
      <div className={`h-full ${color}`} style={{ width: `${pct}%` }} />
    </div>
  );
}

export function RoiCard({ metadata }: { metadata: AuditMetadata }) {
  const complexityDrop = metadata.complexityBefore - metadata.complexityAfter;

  return (
    <div className="space-y-4 rounded-lg border bg-card p-5">
      <div className="flex items-end justify-between gap-4">
        <div>
          <div className="text-4xl font-bold tabular-nums text-emerald-500">
            ~{metadata.estimatedMinutesSaved}
          </div>
          <div className="text-xs text-muted-foreground">minutes saved (one-time)</div>
        </div>
        <div className="text-right text-xs text-muted-foreground">
          <div>
            <span className="text-emerald-500">+{metadata.linesChangedAdd}</span>{' '}
            <span className="text-red-500">−{metadata.linesChangedRemove}</span> lines
          </div>
          {complexityDrop > 0 ? (
            <div className="mt-1">complexity ↓ {complexityDrop} pts</div>
          ) : null}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 text-xs">
        <div className="space-y-1">
          <div className="text-muted-foreground">Complexity before</div>
          <ComplexityBar value={metadata.complexityBefore} tone="before" />
          <div className="tabular-nums">{metadata.complexityBefore}/100</div>
        </div>
        <div className="space-y-1">
          <div className="text-muted-foreground">Complexity after</div>
          <ComplexityBar value={metadata.complexityAfter} tone="after" />
          <div className="tabular-nums">{metadata.complexityAfter}/100</div>
        </div>
      </div>

      <p className="text-sm leading-relaxed text-muted-foreground">{metadata.rationale}</p>

      {metadata.caveats.length > 0 ? (
        <div className="space-y-1">
          <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Caveats
          </div>
          <ul className="list-inside list-disc space-y-1 text-xs text-muted-foreground">
            {metadata.caveats.map((c, i) => (
              <li key={i}>{c}</li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
