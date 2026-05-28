# Product Spec — Codex Usage Analyzer

> Status: draft v1 (2026-05-26). Update once Phase 1 research lands.

## One-liner

Paste your code, find out in 10 seconds where OpenAI Codex would actually earn its keep — with a ranked, evidence-backed list and an on-demand "watch Codex try it" deep audit.

## Why now

Codex (and AI coding more broadly) has a trust problem, not a capability problem. Senior engineers don't doubt the model can write code — they doubt it can write code that's worth their time to review on *their* codebase. Codex Usage Analyzer is the meta-product: it doesn't write code for you. It shows you where writing code with Codex *would have* paid off, on your actual files. The pitch lands hardest with skeptics.

## Two modes

### Quick Scan (default, free)

**Goal:** under 10 seconds from paste to first insight. Streamed.

- Input: pasted code, or (Phase 2) a zip, or (Phase 3) a GitHub URL.
- Model: GPT-5-mini via `streamObject` with the `ScanResult` Zod schema (see `docs/tech/prompts.md`).
- Output: up to 10 ranked candidates. Each candidate has:
  - title, file/lines, category, reason, codexFitScore (0–100), estimatedMinutesSaved, confidence, snippet.
- Overall: codebase-level **Codex-Readiness Score** (0–100) + one-line summary.

### Deep Audit (opt-in per candidate)

**Goal:** make the value visceral. The user clicks one candidate, sees Codex *actually attempt* the change.

- Input: a candidate from Quick Scan.
- Model: GPT-5 via `streamText`. Returns a unified-diff block + a JSON `AuditMetadata` block.
- Output: streamed diff view + ROI card (lines changed, complexity before/after, minutes saved, rationale, caveats).
- Hard cap: top 3 audits per session (cost control). User is told.

## Scoring rubric (Codex-Fit Score)

A 0–100 score per candidate. The model judges, but it must justify:

| Signal | Weight | Description |
|---|---|---|
| Complexity | 0.35 | Nested control flow, length, manual state. |
| Repetition | 0.25 | Near-duplicate blocks, parallel branches. |
| Test gap | 0.20 | Logic without visible tests in the input. |
| Refactor opportunity | 0.15 | Violates a clean pattern. |
| Doc gap | 0.05 | Non-obvious behavior without explanation. |

Codebase-level **Readiness Score** = clipped weighted average of top-K candidate scores, capped at 100. Trivial / clean code yields a low (and visible) score — we never inflate.

## UX flow

```
1. Landing — single hero, three input tabs (Paste / Zip / GitHub URL).
   Live placeholder: "// paste a function, a file, or anything ~10k chars max"

2. Submit — instant transition to scan dashboard with skeleton cards.
   Stream-fills cards as candidates arrive.

3. Scan dashboard
   ─ Header: language detected, readiness score, summary line.
   ─ List of ranked candidate cards. Each: title, category badge, score, ROI estimate, snippet preview.
   ─ Click a card → opens Audit drawer / detail view.

4. Audit view
   ─ Original code (left) + streaming diff (right).
   ─ Once metadata streams in: ROI card surfaces (minutes saved, complexity Δ, caveats).
   ─ "Run another audit" button (rate-limited to top 3 per session).

5. Export
   ─ "Download report" (Markdown). Future: PDF, shareable URL.
```

## Output schemas

Authoritative definitions live in `docs/tech/prompts.md` (`ScanResult`, `ScanCandidate`, `AuditMetadata`).

## What we explicitly do NOT do in MVP

- No login. No persistence. No multi-user accounts.
- No actual Codex CLI integration — we use the OpenAI API directly with GPT-5 / GPT-5-mini. We frame this as "Codex agent" in the UI (acceptable per the OpenAI Codex narrative — Codex is the agent product, GPT-5 is the underlying model).
- No code execution / sandbox. We never run the user's code. Out of scope.
- No private-repo support. Phase 3 GitHub URL input is public-repo only.
- No telemetry beyond Vercel Speed Insights.
- No IDE plugin. Landing page may CTA "VS Code coming soon" if research shows demand.

## Demo north-star (for OpenAI judges)

A three-beat live demo:

1. **Visceral.** Paste a real messy function. Quick Scan streams in. First card paints in ~3s.
2. **Analytical.** Click the top card → Deep Audit. Diff streams in. ROI card surfaces with conservative minute estimates that *look honest*.
3. **Meta-pitch.** Last beat: "Notice what just happened — you were skeptical, you saw the evidence, and now you want to try Codex on this repo. That's the entire product."

## Success metrics for the hackathon week

- Quick Scan time-to-first-card < 5s on a 2k-token input (p95).
- Deep Audit completes < 40s on a 500-line candidate (p95).
- Per-session OpenAI cost < $0.05 (cache + caps).
- 1 polished public URL on Vercel.
- 1 recorded demo (60-90s) showing the three-beat flow.
- Markdown report export works.

## Non-goals (post-hackathon, intentionally deferred)

See `depth_additions.md`.
