import { streamText, Output } from 'ai';
import { openai } from '@ai-sdk/openai';
import { ScanResultSchema } from '@/lib/schemas';
import { scanSystemPrompt, scanUserPrompt } from '@/lib/prompts';
import { INPUT_CAP_CHARS, MODELS } from '@/lib/models';

export const maxDuration = 60;

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const code = typeof body?.code === 'string' ? body.code : '';
  if (!code.trim()) {
    return new Response(JSON.stringify({ error: 'code is required' }), {
      status: 400,
      headers: { 'content-type': 'application/json' },
    });
  }

  const truncated = code.slice(0, INPUT_CAP_CHARS);

  const result = streamText({
    model: openai(MODELS.scan),
    output: Output.object({ schema: ScanResultSchema }),
    system: scanSystemPrompt,
    prompt: scanUserPrompt(truncated),
  });

  return result.toTextStreamResponse();
}
