'use client';

import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { INPUT_CAP_CHARS } from '@/lib/models';

export function PasteInput({
  value,
  onChange,
  onSubmit,
  loading,
}: {
  value: string;
  onChange: (v: string) => void;
  onSubmit: () => void;
  loading: boolean;
}) {
  const overCap = value.length > INPUT_CAP_CHARS;

  return (
    <div className="space-y-3">
      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="// paste a function, a file, or anything up to ~20k chars. Any language."
        className="min-h-[280px] font-mono text-xs"
        spellCheck={false}
      />
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>
          {value.length.toLocaleString()} / {INPUT_CAP_CHARS.toLocaleString()} chars
          {overCap ? <span className="ml-2 text-amber-500">will be truncated</span> : null}
        </span>
        <Button
          onClick={onSubmit}
          disabled={loading || !value.trim()}
          size="sm"
        >
          {loading ? 'Scanning…' : 'Quick Scan'}
        </Button>
      </div>
    </div>
  );
}
