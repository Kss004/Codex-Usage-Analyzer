function lineClass(line: string): string {
  if (line.startsWith('+++') || line.startsWith('---')) {
    return 'text-zinc-400';
  }
  if (line.startsWith('@@')) {
    return 'text-cyan-400';
  }
  if (line.startsWith('+')) {
    return 'bg-emerald-500/10 text-emerald-300';
  }
  if (line.startsWith('-')) {
    return 'bg-red-500/10 text-red-300';
  }
  return 'text-zinc-300';
}

export function AuditDiff({ diff }: { diff: string }) {
  const lines = diff.split('\n');
  return (
    <div className="overflow-hidden rounded-lg bg-zinc-950 ring-1 ring-zinc-800">
      <div className="border-b border-zinc-800 px-4 py-2 text-xs font-medium uppercase tracking-wide text-zinc-500">
        Codex&apos;s proposed change
      </div>
      <pre className="max-h-[460px] overflow-auto p-4 text-xs leading-relaxed">
        <code>
          {lines.map((line, i) => (
            <div key={i} className={`-mx-4 px-4 ${lineClass(line)}`}>
              {line || ' '}
            </div>
          ))}
        </code>
      </pre>
    </div>
  );
}
