# Codex Usage Analyzer

> Paste your code. In 10 seconds, see where OpenAI Codex would actually earn its keep on it.

**Live:** https://codex-usage-analyzer.vercel.app

Submission for the **OpenAI + AI Builders India Hackathon** (2026-05-25 → 2026-06-01).

A meta-product that sells Codex to skeptics: the analyzer pinpoints high-complexity functions, repetitive patterns, and test-coverage gaps where Codex would save the most engineering time — then lets you watch Codex actually attempt the change, with a conservative ROI estimate.

## Docs

### Research (Phase 1) — done
- [Market research synthesis](docs/research/market_research.md) — exec read; the one-pager
- [TAM / SAM / SOM](docs/research/tam_sam_som.md) — $374M base TAM, $180M SAM, $1.17M base SOM (24mo)
- [ICP / personas](docs/research/icp.md) — 5 personas; wedge = indie hacker + skeptic senior
- [Competitive landscape](docs/research/competitors.md) — CodeScene closest, OpenAI biggest 12-mo threat
- [Codex skeptic pain points](docs/research/codex_pain.md) — METR 19% slowdown, GitClear 8× clone growth, DORA 91–441% PR tax
- [Pricing benchmarks](docs/research/pricing_benchmarks.md) — full price table for every notable competitor
- [Why it works (thesis)](docs/research/why_it_works.md) — claims + answers to hostile questions
- [Pricing model](docs/research/pricing.md) — Indie $9/mo → Team $99/repo → Enterprise custom
- [GTM plan](docs/research/gtm.md) — HN/X/IndieHackers wedge → eng-manager bridge → enterprise

### Product (Phase 2)
- [Product spec](docs/product/product_spec.md)
- [Depth additions](docs/product/depth_additions.md)
- [Roadmap](docs/product/roadmap.md)

### Tech (Phase 3)
- [Architecture](docs/tech/architecture.md)
- [Prompts + schemas](docs/tech/prompts.md)

## Stack

Next.js 16 App Router · Vercel Fluid Compute · TypeScript · Bun · AI SDK v6 · OpenAI GPT-5 / GPT-5-mini · shadcn/ui · Tailwind · Zod.

## Local development

```bash
cp .env.example .env.local   # then paste your OpenAI key
bun install
bun dev                       # → http://localhost:3000
```

## Testing

```bash
bun test        # 50 unit tests (parse-audit, rank, roi, code-files, export-md, schemas)
bun run eval    # live LLM eval — property-based, needs OPENAI_API_KEY
bun run build   # production build + TypeScript check
```

The LLM eval asserts invariants (schema validity, score ranges, category presence, readiness sanity on messy vs clean code). It surfaced that the model doesn't reliably order candidates — fixed deterministically in `lib/rank.ts`, wired into UI + report export.

## Features

- **Quick Scan** — paste code / drop a zip / paste a GitHub URL → `gpt-5-mini` streams ranked, line-cited candidates with a 0–100 Codex-Readiness Score.
- **Deep Audit** — `gpt-5` attempts the change on any candidate → colour-highlighted diff + ROI card (complexity before→after, minutes saved, caveats).
- **ROI calculator**, **Skeptic Mode** (CFO/engineer/CTO pitch), **Markdown export**, shareable **OG score card**.

Stack: Next.js 16 (App Router) · AI SDK v6 (`streamText` + `Output.object`) · GPT-5 / GPT-5-mini · Zod 4 · shadcn/ui · Bun · Vercel Fluid Compute.
