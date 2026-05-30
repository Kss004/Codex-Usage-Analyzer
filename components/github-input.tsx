'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export function GithubInput({
  onCode,
  loading,
}: {
  onCode: (code: string, meta: { repo: string; files: string[] }) => void;
  loading: boolean;
}) {
  const [url, setUrl] = useState('');
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function fetchRepo() {
    setFetching(true);
    setError(null);
    try {
      const res = await fetch('/api/github', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ url }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data?.error ?? `Failed: ${res.status}`);
        return;
      }
      onCode(data.code, { repo: data.repo, files: data.files });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setFetching(false);
    }
  }

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <Input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://github.com/owner/repo"
          onKeyDown={(e) => {
            if (e.key === 'Enter' && url.trim() && !fetching && !loading) fetchRepo();
          }}
        />
        <Button onClick={fetchRepo} disabled={fetching || loading || !url.trim()} size="sm">
          {fetching ? 'Fetching…' : 'Scan repo'}
        </Button>
      </div>
      <p className="text-xs text-muted-foreground">
        Public repos only. Fetches up to 12 source files (largest first), capped to fit one scan.
      </p>
      {error ? <p className="text-sm text-destructive">{error}</p> : null}
    </div>
  );
}
