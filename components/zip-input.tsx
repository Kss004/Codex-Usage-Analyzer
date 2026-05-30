'use client';

import { useState } from 'react';
import { unzipSync, strFromU8 } from 'fflate';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { INPUT_CAP_CHARS } from '@/lib/models';

const CODE_EXT = new Set([
  'ts', 'tsx', 'js', 'jsx', 'py', 'go', 'rs', 'java', 'rb', 'php', 'c', 'cpp', 'h', 'hpp',
  'cs', 'kt', 'swift', 'scala', 'sh', 'sql',
]);

const SKIP = ['node_modules/', 'dist/', 'build/', '.next/', 'vendor/', '.git/', '__macosx/'];

export function ZipInput({
  onCode,
  loading,
}: {
  onCode: (code: string, meta: { files: string[] }) => void;
  loading: boolean;
}) {
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  async function handleFile(file: File) {
    setError(null);
    setBusy(true);
    try {
      const buf = new Uint8Array(await file.arrayBuffer());
      const unzipped = unzipSync(buf);
      const entries = Object.entries(unzipped)
        .filter(([path]) => {
          const lower = path.toLowerCase();
          if (lower.endsWith('/')) return false;
          if (SKIP.some((s) => lower.includes(s))) return false;
          const ext = path.split('.').pop()?.toLowerCase() ?? '';
          return CODE_EXT.has(ext);
        })
        .sort(([, a], [, b]) => b.length - a.length)
        .slice(0, 15);

      if (entries.length === 0) {
        setError('No source files found in the zip.');
        return;
      }

      let combined = '';
      const used: string[] = [];
      for (const [path, data] of entries) {
        if (combined.length >= INPUT_CAP_CHARS) break;
        combined += `// FILE: ${path}\n${strFromU8(data)}\n\n`;
        used.push(path);
      }
      combined = combined.slice(0, INPUT_CAP_CHARS);
      onCode(combined, { files: used });
    } catch {
      setError('Could not read that zip file.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-3">
      <label
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          const f = e.dataTransfer.files?.[0];
          if (f) handleFile(f);
        }}
        className={`flex min-h-[180px] cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed p-6 text-center transition-colors ${
          dragOver ? 'border-primary bg-primary/5' : 'border-muted-foreground/25'
        }`}
      >
        <span className="text-sm text-muted-foreground">
          {busy ? 'Unzipping…' : 'Drop a .zip here, or click to choose'}
        </span>
        <span className="text-xs text-muted-foreground/70">
          Up to 15 source files, capped to fit one scan
        </span>
        <input
          type="file"
          accept=".zip"
          className="hidden"
          disabled={busy || loading}
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) handleFile(f);
          }}
        />
        <span className={cn(buttonVariants({ variant: 'outline', size: 'sm' }))}>
          Choose file
        </span>
      </label>
      {error ? <p className="text-sm text-destructive">{error}</p> : null}
    </div>
  );
}
