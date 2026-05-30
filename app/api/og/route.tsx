import { ImageResponse } from 'next/og';

export const runtime = 'nodejs';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const score = Math.max(0, Math.min(100, Number(searchParams.get('score') ?? '0')));
  const lang = searchParams.get('lang') ?? 'code';
  const summary = (searchParams.get('summary') ?? '').slice(0, 160);

  const scoreColor = score >= 70 ? '#10b981' : score >= 40 ? '#f59e0b' : '#a1a1aa';

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#09090b',
          padding: '64px',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', color: '#71717a', fontSize: 28, letterSpacing: 2 }}>
            CODEX USAGE ANALYZER
          </div>
          <div style={{ display: 'flex', color: '#fafafa', fontSize: 40, fontWeight: 700, marginTop: 8 }}>
            Codex-Readiness Score
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'flex-end' }}>
          <div style={{ display: 'flex', color: scoreColor, fontSize: 200, fontWeight: 800, lineHeight: 1 }}>
            {String(score)}
          </div>
          <div style={{ display: 'flex', color: '#71717a', fontSize: 40, paddingBottom: 32, marginLeft: 24 }}>
            / 100
          </div>
          <div
            style={{
              display: 'flex',
              color: '#a1a1aa',
              fontSize: 28,
              paddingBottom: 40,
              marginLeft: 24,
              textTransform: 'uppercase',
            }}
          >
            {lang}
          </div>
        </div>

        <div style={{ display: 'flex', color: '#d4d4d8', fontSize: 26, maxWidth: 1000 }}>
          {summary || 'Find where Codex would earn its keep on your codebase.'}
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
