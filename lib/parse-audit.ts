import { AuditMetadataSchema, type AuditMetadata } from '@/lib/schemas';

export type ParsedAudit = {
  diff: string | null;
  metadata: AuditMetadata | null;
  raw: string;
};

/**
 * The Deep Audit endpoint streams plain text containing a ```diff fenced block
 * followed by a ```json fenced block (AuditMetadata). This extracts both,
 * tolerating partial / streaming input and minor format drift.
 */
export function parseAudit(raw: string): ParsedAudit {
  const diff = extractFence(raw, 'diff');
  const jsonText = extractFence(raw, 'json');

  let metadata: AuditMetadata | null = null;
  if (jsonText) {
    try {
      const parsed = JSON.parse(jsonText);
      const result = AuditMetadataSchema.safeParse(parsed);
      if (result.success) metadata = result.data;
    } catch {
      // JSON still streaming or malformed — leave metadata null.
    }
  }

  return { diff, metadata, raw };
}

/**
 * Extract the contents of the first ```<lang> ... ``` fenced block.
 * If the closing fence hasn't streamed yet, returns what's accumulated so far
 * (so the diff can render progressively).
 */
function extractFence(text: string, lang: string): string | null {
  const open = new RegExp('```' + lang + '\\s*\\n', 'i');
  const openMatch = text.match(open);
  if (!openMatch || openMatch.index === undefined) return null;

  const start = openMatch.index + openMatch[0].length;
  const rest = text.slice(start);
  const closeIdx = rest.indexOf('```');
  if (closeIdx === -1) {
    // Closing fence not streamed yet — return partial content.
    return rest.length > 0 ? rest : null;
  }
  return rest.slice(0, closeIdx).trimEnd();
}
