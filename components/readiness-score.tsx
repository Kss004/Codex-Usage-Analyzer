export function ReadinessScore({ score }: { score: number | undefined }) {
  const value = typeof score === 'number' ? Math.max(0, Math.min(100, score)) : null;
  const color =
    value == null
      ? 'text-muted-foreground'
      : value >= 70
        ? 'text-emerald-500'
        : value >= 40
          ? 'text-amber-500'
          : 'text-zinc-500';

  return (
    <div className="flex items-baseline gap-2">
      <span className={`text-5xl font-bold tabular-nums ${color}`}>{value ?? '—'}</span>
      <span className="text-sm text-muted-foreground">/100 Codex-Readiness</span>
    </div>
  );
}
