# Depth Additions — beyond MVP

> Status: draft v1 (2026-05-26). Use as the "where this goes" section in the demo and the post-hackathon roadmap.

The MVP is intentionally small: paste-code in, ranked candidates out, optional Deep Audit. The depth additions below extend the narrative without bloating the 7-day build. Each is rated by **demo value** (how much it strengthens the OpenAI-judge pitch this week) and **post-week value** (real product traction).

## Tier 1 — high demo value, fits in MVP if time permits

### 1. Codex-Readiness Score (repo-level)

A 0–100 number, prominently displayed on the dashboard. Computed from the weighted average of top-K candidate scores. Gives the user a single "headline metric" to share / screenshot / tweet. Demo value: **very high**. Build cost: trivial — already in the `ScanResult` schema.

### 2. ROI calculator

A small interactive component on the dashboard:

```
Team size: [ 12 ] devs
Hourly rate: [ $80 ]
Hours/week saved per dev (estimated): 3.2 (computed from candidates)
Annual value: $159,744
```

Inputs adjustable, output recomputed live. Demo value: **very high** — gives eng managers a number to take to their CFO. Build cost: a few hours.

### 3. Markdown report export

"Download as Markdown" button on the dashboard. Renders the full scan + selected audits as a portable `.md` file. Demo value: **medium-high** — closes the loop for skeptics who want to forward results to teammates. Build cost: ~1 hour.

### 4. Skeptic Mode — generates conversion copy

A toggle: "Generate conversion copy for: [ a senior engineer / a CFO / a CTO ]". The Quick Scan output is rerun through a small prompt that translates the same findings into language tailored to the target persona. Demo value: **high** — directly demonstrates the "meta-product that sells Codex to skeptics" pitch. Build cost: 1-2 hours (one extra prompt).

### 5. Before/after diff statistics

In the Audit view, alongside the diff: a small bar showing lines added/removed, cyclomatic complexity proxy (LLM-judged), function length Δ. Demo value: **high** — analytical-feeling without being noisy. Build cost: small (metadata already in schema).

## Tier 2 — strong post-week value, deferred from MVP

### 6. Repeat-pattern detector across files

Once zip / GitHub URL input is in, an LLM batch pass that looks for *cross-file* duplication and refactor opportunities (parallel adapters, copy-pasted error handling, etc.). Strongest signal for "Codex on a whole codebase". Defer — needs careful chunking + dedup.

### 7. Test-gap heatmap

A visual showing files/functions with no test coverage. Either inferred from the LLM or wired to actual coverage data (if a `lcov.info` is included in the upload). Defer — needs more UI polish.

### 8. Team mode (history & trends)

Track Codex-Readiness Score over time per repo. Requires auth + a DB. Postpones for a week 2 sprint.

### 9. GitHub PR bot

`@codex-analyzer scan` in a PR comment → bot scans the diff and replies with a Quick Scan summary. Highest stickiness for adoption, but needs an installable GitHub App. Defer.

### 10. Slack integration

Weekly "Top 3 places Codex could save your team time this week" auto-post to a configured Slack channel. Buyer-friendly. Defer.

### 11. VS Code extension

Inline annotations in the editor on functions Codex would help with. Highest dev DAUs / stickiness. Defer — separate distribution channel.

### 12. CLI (`bunx codex-analyze .`)

Run on a local repo from the terminal. Output a Markdown report or open the web dashboard with the results prefilled. Closer to a dev's daily workflow. Build cost: medium — would share most of the analyzer code. Defer to week 2.

## Tier 3 — speculative, for the post-hackathon vision section only

### 13. Codex Playground per candidate

For each candidate, a "tweak the prompt and re-run Codex" mini-playground inline. Effectively turns the analyzer into a Codex tuning surface. Compelling for power users.

### 14. Codex-vs-baseline benchmark

Pick a candidate, run a manual refactor (timed by user) vs Codex's attempt, compare diffs side-by-side. Closes the "is Codex actually faster?" objection with hard data.

### 15. Multi-model comparison

Same candidate run through GPT-5, Claude 4.7, Gemini 2.5 → user sees which model produces the cleanest diff. Risk: positions us as model-agnostic when we want to be the Codex showcase. Skip unless asked.

### 16. Org-wide rollout dashboard

Aggregate Codex-Readiness across many repos in a GitHub org. SaaS angle. Wire to GitHub Apps for org-level access.

## Selection for hackathon week

If on track at end of Day 5 (Quick Scan + Deep Audit fully working):

- Definitely add: #1 Readiness Score (free), #2 ROI Calculator, #3 Markdown Export.
- Probably add: #4 Skeptic Mode, #5 Diff Stats.
- Hard "no" until post-hackathon: #6–#16.

Everything in Tier 2/3 stays in this file as the "Coming next" section of the landing page, signaling vision without overpromising.
