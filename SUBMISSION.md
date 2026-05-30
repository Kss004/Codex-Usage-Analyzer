# Codex Usage Analyzer — Final Submission

> OpenAI × AI Builders India Hackathon. Copy-paste answers for the final form, mapped to the 5 judging criteria, plus a video script.

## Links (fill the deployed URL after `vercel --prod`)

- **Live demo:** `https://<your-vercel-domain>.vercel.app`
- **Repo:** https://github.com/Kss004/Codex-Usage-Analyzer
- **Pitch deck:** `<your Gamma public link>`
- **Announcement post:** `<your LinkedIn/X post link>`
- **Video walkthrough:** `<your 5–10 min video link>`

---

## One-line pitch

Codex Usage Analyzer scans any codebase and shows — in ~10 seconds — the ranked, line-cited places where OpenAI Codex would save the most engineering time, then lets you watch GPT-5 actually attempt the change with a conservative ROI estimate. A meta-product that sells Codex to skeptics by interrogating Codex on their own code.

---

## Problem statement

Developers don't doubt that AI can write code — they doubt it's worth their time to point it at *their* code.

- 84% of developers use AI tools, but only **29% trust them** (Stack Overflow Developer Survey 2025).
- **66%** say they spend more time fixing "almost-right" AI output.
- METR's randomized trial (2025) measured experienced developers as **19% slower** with AI tools — with a 39-point gap between perceived and actual speed.
- GitClear's 211M-line dataset: cloned code rose **8× in 2024**; refactoring share fell from 25% to under 10%.
- DORA 2025: PR review times up **91–441%** in high-AI-adoption teams.

Meanwhile, a CFO staring at a $19–$200/seat Codex/Copilot/Cursor bill has no defensible, per-repo ROI report. Every existing analytics tool measures AI usage *after* adoption (Copilot Metrics, Cursor analytics, Jellyfish, DX) or scores code health vendor-neutrally (CodeScene). Nobody ships the artifact a buyer needs *before* signing seats: a ranked, Codex-specific, hours-saved estimate on their own codebase.

**The fix isn't a smarter model — it's better targeting.** METR's slowdown came from developers invoking AI on the wrong code. We are the deterministic targeting layer.

## Solution & user journey

1. **Input** — paste code, drop a `.zip`, or paste a public GitHub URL. No login, no setup.
2. **Quick Scan** (GPT-5-mini, streamed) — up to 10 ranked candidates in ~10s. Each: title, exact line citation, category (high complexity / repetitive / test gap / refactor / doc gap), Codex-Fit Score 0–100, conservative minutes-saved estimate. The repo gets one **Codex-Readiness Score** (0–100).
3. **Deep Audit** (GPT-5, on demand) — click any candidate; GPT-5 actually attempts the change and streams a colour-highlighted unified diff plus an **ROI card** (lines ±, complexity before→after, minutes saved, rationale, caveats).
4. **Act on it** — adjustable **ROI calculator** (team size × hourly rate → $ value), **Skeptic Mode** (regenerates the findings as a pitch for a CFO / senior engineer / CTO), **Markdown report export**, and a shareable **Readiness score card** (OG image).

## Architecture

- **Next.js 16** (App Router, Turbopack) on **Vercel Fluid Compute** (Node 24).
- **Vercel AI SDK v6** — `streamText({ output: Output.object(schema) })` for streamed, schema-validated structured output; `experimental_useObject` renders partial candidates as they arrive.
- **Models:** OpenAI **GPT-5-mini** for the fast ranking pass (`reasoningEffort: 'low'`), **GPT-5** for Deep Audit attempts.
- **Zod 4** schemas (`lib/schemas.ts`) — `.describe()` on each field doubles as model instruction; `safeParse` on audit metadata with a raw fallback so it never blank-screens.
- **shadcn/ui + Tailwind v4** UI. **fflate** for client-side zip unpacking. **`next/og`** for the share-card. Unauthenticated `api.github.com` for repo fetch.
- **Bun** for install/build. No database, no auth, no AST parsers — language-agnostic by design.
- Routes: `/api/scan`, `/api/audit`, `/api/skeptic`, `/api/github`, `/api/og`.

## How we used Codex / OpenAI (two layers)

**In the product:** GPT-5-mini (ranking) + GPT-5 (refactor attempts) via AI SDK v6 structured streaming, with Zod-schema-constrained output and tuned reasoning effort for latency.

**To build the product:** the entire app + a 12-document market-research package (TAM/SAM/SOM, ICP, competitor teardown, pricing, GTM, thesis, privacy/ToS, calibration) was produced in days using Codex-style agentic workflows — parallel research agents running web research while the app was built, schema-first prompt engineering, and iterative streaming-API integration. The meta-narrative is the pitch: we used Codex to ship the tool that sells Codex.

---

## Mapped to judging criteria

**Technical Execution** — Multi-input (paste / zip / GitHub URL), real streaming structured output via AI SDK v6 + Zod, two-model pipeline, OG image generation, client-side zip handling, clean `bun run build` + `tsc` with 8 routes deployed on Fluid Compute.

**Problem Solving & Usefulness** — Targets a real, data-backed gap (the 84%/29% trust chasm, METR's 19% slowdown). Output is immediately actionable: ranked candidates, a real diff, an ROI number a CFO can act on.

**Creativity & Originality** — The meta-product framing ("sell Codex by interrogating Codex"), Skeptic Mode (persona-targeted pitch generation), and the pre-purchase-diagnostic positioning are genuinely uncovered in the competitive landscape.

**Usage of Codex & OpenAI Tools** — GPT-5 + GPT-5-mini in two distinct roles, structured streaming, reasoning-effort tuning — plus the build itself was Codex-driven.

**Product Demo & Presentation** — One-click sample loader, sub-3s first byte, visceral colour diff + ROI card, shareable score. Demo flow is rehearsed (script below).

---

## Video script / beat sheet (target 6–8 min)

1. **Hook (0:00–0:45)** — "84% of devs use AI tools. 29% trust them. METR found experienced devs got 19% *slower*. The problem isn't the model — it's knowing where to point it." Show the landing page + stat strip.
2. **Quick Scan (0:45–2:30)** — Click the **Python — order processor** sample. Hit Quick Scan. Narrate cards streaming in: readiness score, the 8 candidates, categories, line citations, minutes saved. Emphasize it's honest (clean code scores low).
3. **Deep Audit (2:30–4:30)** — Expand the top candidate. "Now watch Codex actually try it." Run Deep Audit. The colour diff streams; the ROI card surfaces — complexity before→after, minutes saved, caveats. This is the visceral moment.
4. **Make it a business case (4:30–6:00)** — ROI calculator: set team size + rate, show the $ number. Then Skeptic Mode → "Pitch the CFO" → read the generated pitch. "This is the meta-product — it sells Codex to the skeptic who controls the budget."
5. **Breadth (6:00–7:00)** — Quickly show Zip upload and GitHub URL input scanning a real repo. Show "Download report" and "Share score" (open the OG card).
6. **How it's built (7:00–8:00)** — One slide: Next.js 16 + AI SDK v6 + GPT-5/GPT-5-mini + Zod streaming on Vercel. "And the whole thing — app plus a 12-doc research package — was built with Codex-style agentic workflows in days." Close on the repo + live URL.

**Recording tips:** use the sample button (no typing on camera); pre-warm one scan so the cache is hot; have a fallback screen-recording of a successful Deep Audit in case of live API latency.

---

## Pre-submission checklist

- [ ] `vercel --prod` deployed; live URL loads in incognito.
- [ ] `OPENAI_API_KEY` set in Vercel (production + preview).
- [ ] Sample → Quick Scan → Deep Audit → ROI card works on the live URL.
- [ ] Zip + GitHub URL inputs work on the live URL.
- [ ] `/privacy` loads (no 404); footer link resolves.
- [ ] Deck link is "anyone with the link can view."
- [ ] Video uploaded + link is public/unlisted.
- [ ] All links pasted into the form open in a fresh incognito window.
