import { streamText } from 'ai';
import { openai } from '@ai-sdk/openai';
import { skepticSystemPrompt, skepticUserPrompt, SKEPTIC_PERSONAS, type SkepticPersona } from '@/lib/prompts';
import { MODELS } from '@/lib/models';

export const maxDuration = 60;

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const persona = (body?.persona as SkepticPersona) ?? 'cfo';
  if (!(persona in SKEPTIC_PERSONAS)) {
    return new Response(JSON.stringify({ error: 'invalid persona' }), {
      status: 400,
      headers: { 'content-type': 'application/json' },
    });
  }

  const language = typeof body?.language === 'string' ? body.language : 'unknown';
  const readiness = typeof body?.readiness === 'number' ? body.readiness : 0;
  const summary = typeof body?.summary === 'string' ? body.summary : '';
  const candidates = Array.isArray(body?.candidates) ? body.candidates : [];

  if (candidates.length === 0) {
    return new Response(JSON.stringify({ error: 'no candidates' }), {
      status: 400,
      headers: { 'content-type': 'application/json' },
    });
  }

  const result = streamText({
    model: openai(MODELS.scan),
    system: skepticSystemPrompt(persona),
    prompt: skepticUserPrompt({ language, readiness, summary, candidates }),
  });

  return result.toTextStreamResponse();
}
