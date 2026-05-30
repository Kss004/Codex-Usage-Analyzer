import { streamText } from 'ai';
import { openai } from '@ai-sdk/openai';
import { auditSystemPrompt, auditUserPrompt } from '@/lib/prompts';
import { MODELS } from '@/lib/models';

export const maxDuration = 120;

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const candidateId = typeof body?.candidateId === 'string' ? body.candidateId : '';
  const title = typeof body?.title === 'string' ? body.title : '';
  const category = typeof body?.category === 'string' ? body.category : '';
  const reason = typeof body?.reason === 'string' ? body.reason : '';
  const snippet = typeof body?.snippet === 'string' ? body.snippet : '';

  if (!snippet.trim() || !candidateId) {
    return new Response(JSON.stringify({ error: 'candidateId + snippet are required' }), {
      status: 400,
      headers: { 'content-type': 'application/json' },
    });
  }

  const result = streamText({
    model: openai(MODELS.audit),
    system: auditSystemPrompt,
    prompt: auditUserPrompt({ candidateId, title, category, reason, snippet }),
    providerOptions: {
      openai: { reasoningEffort: 'medium' },
    },
  });

  return result.toTextStreamResponse();
}
