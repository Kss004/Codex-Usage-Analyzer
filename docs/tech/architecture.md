# Architecture — Codex Usage Analyzer

> Status: draft v1 (2026-05-26). Update after Phase 4 build reveals real constraints.

## North star

A web app where a developer pastes code (or uploads a zip / pastes a GitHub URL) and within 10 seconds sees a ranked list of the highest-leverage places to apply OpenAI Codex on their codebase, plus an on-demand "Deep Audit" mode where GPT-5 actually attempts the refactor and shows the diff with an ROI estimate.

Selling point: **fast, language-agnostic, zero setup**. No clone, no install, no AST.

## Stack

| Layer | Choice | Why |
|---|---|---|
| Framework | **Next.js 16** (App Router) | Server Components for fast initial paint, Route Handlers for streaming AI responses, deploys natively on Vercel. |
| Runtime | **Vercel Fluid Compute** (Node 24 LTS) | Reuses function instances across concurrent requests → lower cold starts than serverless. Default 300s timeout. No Edge runtime — Node SDKs work natively. |
| Language | **TypeScript** (strict) | Standard for Next.js + AI SDK. |
| Package manager + test runner | **Bun 1.3** | Fast install, built-in test runner, runs `.ts` directly. Replaces npm/pnpm/yarn. |
| AI SDK | **Vercel AI SDK v6** (`ai`, `@ai-sdk/openai`) | First-class streaming + structured output (`streamObject`) + tool calling. Vercel-native. |
| Models | **GPT-5-mini** (Quick Scan), **GPT-5** (Deep Audit) | Mini for speed/cost on the ranking pass; full GPT-5 only when user opts in to a deep refactor. |
| UI | **shadcn/ui + Tailwind CSS** | Fast to compose, accessible, themable, no design debt. |
| Schema validation | **Zod** | Used inline with `streamObject` for typed streaming. |
| Cache | **Vercel Runtime Cache** | Key on `sha256(input)`. Cuts cost on demo replays + repeat scans. |
| Object storage | **Vercel Blob** (Phase 2 only) | For zip uploads above some threshold. Public read off. |
| GitHub fetch | **Octokit** (Phase 3, stretch) | Public-repo only initially; OAuth if scope expands. |
| Observability | **Vercel Speed Insights + Log Drains** | Track p50/p95 latency, token usage, errors. |
| Hosting | **Vercel** (preview per branch, prod on `main`) | Deploy pipeline + per-PR preview URLs. |

No database in MVP. State lives in URL params + client memory + Runtime Cache. Add Neon Postgres only if "team mode" / history feature lands.

## High-level flow

```
            ┌──────────────┐
   user ──▶ │ paste / zip /│ ──▶ POST /api/scan ───┐
            │ github URL   │                       │
            └──────────────┘                       ▼
                                          ┌─────────────────────┐
                                          │ /api/scan           │
                                          │ ─ chunk input       │
                                          │ ─ hash + check cache│
                                          │ ─ streamObject      │
                                          │   GPT-5-mini        │
                                          │ ─ Zod schema:       │
                                          │   ScanResult[]      │
                                          └─────────┬───────────┘
                                                    │ stream
                                                    ▼
                                          ┌─────────────────────┐
                                          │ client renders cards│
                                          │ as candidates arrive│
                                          └─────────┬───────────┘
                                                    │ user clicks one
                                                    ▼
                                          ┌─────────────────────┐
                                          │ POST /api/audit     │
                                          │ ─ streamText GPT-5  │
                                          │ ─ returns diff +    │
                                          │   JSON metadata     │
                                          └─────────┬───────────┘
                                                    ▼
                                          ┌─────────────────────┐
                                          │ diff view + ROI card│
                                          └─────────────────────┘
```

## Directory layout

```
.
├─ app/
│  ├─ page.tsx                 # landing + input selector
│  ├─ scan/[id]/page.tsx       # scan results (Quick Scan dashboard)
│  ├─ audit/[id]/page.tsx      # Deep Audit detail view
│  └─ api/
│     ├─ scan/route.ts         # POST: streams ScanResult[] via streamObject
│     ├─ audit/route.ts        # POST: streams diff + metadata via streamText
│     └─ github/route.ts       # POST: fetches repo files via Octokit (Phase 3)
├─ components/
│  ├─ input/paste-input.tsx
│  ├─ input/zip-input.tsx
│  ├─ input/github-input.tsx
│  ├─ scan/scan-list.tsx
│  ├─ scan/scan-card.tsx
│  ├─ audit/audit-diff.tsx
│  ├─ audit/roi-card.tsx
│  └─ readiness-score.tsx
├─ lib/
│  ├─ schemas.ts               # Zod schemas (single source of truth)
│  ├─ prompts.ts               # system + user prompts
│  ├─ roi.ts                   # ROI math (hours × hourly_rate, etc.)
│  ├─ chunk.ts                 # token-aware chunking
│  ├─ cache.ts                 # Runtime Cache wrappers
│  └─ openai.ts                # AI SDK provider config
├─ docs/                       # research + product + tech docs
├─ public/
├─ next.config.ts
├─ tailwind.config.ts
├─ tsconfig.json
├─ bunfig.toml
├─ vercel.ts                   # typed Vercel config (replaces vercel.json)
└─ package.json
```

## Streaming model

- **Quick Scan** uses `streamObject` with a Zod array schema. The client subscribes to the partial-object stream and renders each candidate as it arrives — first card paints under 3s on warm cache, under 5s cold.
- **Deep Audit** uses `streamText` because we want a unified-diff string streamed, not structured JSON. Metadata (lines changed, minutes saved) is delivered via a single `data` annotation at the end of the stream (AI SDK supports this via stream parts).

## Input handling

- **Paste**: directly POSTed. Cap at ~16k characters client-side; trim and warn above.
- **Zip**: unzipped client-side via `fflate` (no upload until we know it's small enough). For zips above 1 MB we'd upload to Vercel Blob and unzip server-side; out of MVP scope.
- **GitHub URL**: server fetches via Octokit unauthenticated (60 req/hr per IP). Cap to first N files (default 30), filter by extension to common languages. Stretch goal.

## Token + cost budget

- Quick Scan: cap input at 5k input tokens. GPT-5-mini at ~$0.15/1M in, $0.60/1M out. Per-scan cost ≈ $0.003. Cache hits = free.
- Deep Audit: cap input at 2k tokens per candidate. GPT-5 at higher rate, but only on demand and capped to top 3 per session.
- Per-session ceiling (rough): under $0.05.

## Caching strategy

- Compute `sha256(input)` client-side. Send hash with request. Server checks Vercel Runtime Cache (`scan:<hash>`) before LLM call. Replays during demo are instant + free.
- Cache TTL: 1 hour for scan results, 24 hours for audit results.

## Why not Edge runtime / why not custom server

- Edge has Web-API-only fetch limits and historically poor compatibility with the OpenAI SDK. Fluid Compute on Node solves cold-start without the constraints.
- A custom server (Express/Fastify) buys nothing here; Next.js Route Handlers + AI SDK is the shorter path.

## Deployment

- `bun install` → `bun run build` → `vercel deploy`.
- Preview per PR. Prod on `main` after Day 6 milestone.
- Env vars set via `vercel env add` for `OPENAI_API_KEY`. Pull locally with `vercel env pull .env.local`.

## Verification

- Manual: paste a known-messy function (e.g. nested if/else with no tests, ~60 lines), confirm Quick Scan emits first candidate <10s, Deep Audit completes <40s.
- Latency instrumentation: log `Date.now()` deltas at route entry, first chunk, finish. Surface in dev console + Speed Insights.
- Cost watch: log token usage per response (AI SDK returns `usage` on finish).
- E2E on Day 7: clean browser session, run full flow on prod URL before recording demo.

## Open questions

- Does the user's OpenAI key have GPT-5 + GPT-5-mini access in the right tier? (Confirm before Day 4 build.)
- Vercel CLI on this machine is 50.41.0; latest is 54.4.1. Upgrade with `bun add -g vercel@latest` before deploy.
