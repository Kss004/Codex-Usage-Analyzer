# Calibration — How We Defend the Minutes-Saved Number

> Status: drafted 2026-05-26 from research synthesis. Updated as `calibration/v1.json` ships post-hackathon (target: week 2) and as customer telemetry begins (target: month 3+).

Audience: founder under hostile demo Q&A from a Persona 1 skeptic engineer or a Persona 5 procurement reviewer. The single question this doc has to survive: **"How do you know the minutes-saved number on the ROI card is honest?"**

`[[why_it_works]]` flagged this as a known weakness ("Your 'minutes saved' estimate is hand-wavy"). This is the methodology doc that closes that gap.

## 1. The problem statement

The Deep Audit ROI card displays, for each candidate:

- Lines changed.
- Complexity before/after.
- **Minutes saved** (the load-bearing number).
- Confidence band.
- Rationale + caveats.

The minutes-saved number is the one a skeptic will attack. The honest defense has three parts: (a) the number is bounded and visibly conservative; (b) it's paired with the actual diff so the user can sanity-check; (c) we have a calibration corpus on disk that the user can audit.

What we will **not** do:

- Quote a single point estimate without a confidence band.
- Average across languages or task types in a way that hides per-language variance.
- Use a number we can't trace back to a measured input in the calibration corpus.
- Claim the estimate is "audit-grade." The pitch is "directionally honest." We say so on the card.

## 2. Three-tier calibration approach

### Tier A — Public benchmark suite (anchor)

The single most defensible artifact we can ship is a small, well-documented benchmark. Methodology:

1. **Task selection.** Curate ~30 representative refactor tasks across five languages (JS/TS, Python, Go, Java, C#) — six tasks per language. Pull from real OSS repositories' merged PRs (not synthetic toy code). For each PR, isolate one self-contained refactor as the task.
2. **Task taxonomy.** Five categories per language, one task each: (a) extract pure function from nested control flow, (b) deduplicate near-duplicate branches, (c) generate missing unit tests for a pure function, (d) modernize idiom (e.g., callbacks → async/await, manual loop → list comprehension), (e) add type annotations or fix obvious type errors. Plus one "trap" task per language — a task that *looks* refactorable but requires domain context Codex can't have (e.g., a custom DSL).
3. **Human baseline.** Two options, mix-and-match:
   - **Time-bound from git blame.** Look at the PR. Measure: time from first commit on the branch to the merge of the relevant refactor commit, minus review-cycle waiting time. Imperfect (devs context-switch), but real.
   - **Live timing.** Recruit two senior devs per language ($150/hr × ~2 hrs each via Upwork or a personal network). They redo the refactor from scratch on a freshly cloned snapshot of the repo at the parent commit. Stopwatch. Record cognitive-difficulty-self-rating 1–5.
4. **GPT-5 / Codex baseline.** Same parent commit. Same prompt template our Deep Audit uses. Run 3 times per task (account for variance). Record: time-to-completion, token usage, diff quality (manual grade against the merged PR — exact match, semantically equivalent, partial, wrong).
5. **Output.** Per-task: `{ task_id, lang, category, human_minutes, codex_minutes_mean, codex_minutes_p95, semantic_match_rate, hourly_rate_assumed, raw_diff_link }`.
6. **Publish.** As `calibration/v1.json` in our public GitHub repo. One-pager blog post: *"How honest are our minutes-saved numbers? Here's the data."* Footnote-cite the JSON file from every Deep Audit report we generate.

Example record (illustrative):

```json
{
  "task_id": "ts-extract-001",
  "lang": "ts",
  "category": "extract-pure-function",
  "source_repo": "vercel/next.js",
  "source_pr": "https://github.com/vercel/next.js/pull/{id}",
  "parent_commit": "abc123",
  "human_minutes": { "n": 2, "mean": 47, "p95": 62 },
  "codex_minutes": { "n": 3, "mean": 4.1, "p95": 5.3 },
  "semantic_match_rate": 1.0,
  "diff_grade": "exact",
  "hourly_rate_assumed_usd": 120,
  "delta_minutes": 43,
  "delta_usd": 86,
  "notes": "Codex one-shot; matches merged PR within whitespace.",
  "raw_human_diff": "calibration/raw/ts-extract-001-human.diff",
  "raw_codex_diff": "calibration/raw/ts-extract-001-codex.diff"
}
```

When the ROI card surfaces a candidate matching the `category` × `lang` profile, we display a number derived from the **midpoint of the calibration band, scaled by the user's confidence multiplier** (Tier B). The footnote on the card reads: "Based on N=2 human and N=3 GPT-5 runs of comparable refactors in `calibration/v1.json` (see methodology)."

**The honest disclaimer.** N=30 is small. We will not extrapolate beyond the categories the corpus covers. For candidates that don't match a calibrated category, we label confidence as "low" and degrade the estimate visibly (see §4).

### Tier B — User-calibrated coefficients (honesty by design)

The ROI card exposes two user-adjustable knobs:

1. **Hourly rate** (default $120/hr — US senior-engineer loaded cost midpoint). User can set $50–$500.
2. **Confidence multiplier** (default 0.7 — we discount our raw estimate by 30%). User can set 0.3–1.0.

The displayed dollar value scales with both. The minutes-saved number scales only with the confidence multiplier.

The point of exposing these is **epistemic, not commercial**: if a skeptic doesn't believe our default, they can dial it to their own number and see what we'd say. The number is never claimed as universal. The product is "here's our best estimate against a published corpus, here's how to adjust it to your team."

This also defangs the most common objection in demo Q&A ("$120/hr is too high"). The honest answer is "set it to whatever you pay your engineers and look at what the math says then."

### Tier C — Public leaderboard / bounty for skeptics

Headline: **"Find a refactor we got wrong. We'll pay $50."**

Mechanism:

1. A `/leaderboard` page lists every accepted submission of a mis-estimated refactor.
2. Submission form: paste the original code, paste our Deep Audit output, paste either (a) Codex's actual successful refactor that took longer/shorter than we predicted, or (b) a human refactor that demonstrates our estimate was wrong by ≥2×.
3. We review weekly. Accepted submissions get $50 (PayPal/Venmo/Wise) and a public credit on the leaderboard.
4. Accepted submissions feed back into the calibration corpus as the next version of `calibration/v1.json` (becomes v2, v3, ...).

**Budget envelope.** Even at 20 accepted submissions/month, that's $1,000/month. Manageable. Below 5 accepted/month signals we don't have enough skeptic eyeballs yet — a marketing problem, not a calibration problem.

**Why this works as a strategy.** It (a) invites adversarial pressure rather than defending against it, (b) builds a validation corpus we'd otherwise have to pay full-time to assemble, (c) is the kind of move HN, Pragmatic Engineer, and Persona 1 skeptics respect (see `[[outreach_drafts]]`'s framing). The optics flip from "trust our number" to "we paid the people who proved us wrong."

## 3. Week-2-post-hackathon calibration shipment

Concrete deliverable. Total founder cost: **~2 working days + <$200 of OpenAI tokens**.

| Step | Time | Cost |
|---|---:|---:|
| Curate 25 tasks (5 per language × 5 languages) from OSS-repo merged PRs | 4 hrs | $0 |
| Set up timing harness (a small CLI that times Codex runs and writes JSON) | 3 hrs | $0 |
| Run GPT-5 three times per task (75 invocations × ~2k input + 2k output tokens) | runs in parallel | ~$60 in tokens |
| Human baselines: 2 devs × 2 hrs × $150/hr × 5 languages (split across our own time + 2 Upwork hires) | 10 hrs founder time + $300 | $300 |
| Write `calibration/v1.json` + raw diff dumps | 2 hrs | $0 |
| Write one-pager blog post + GitHub README | 3 hrs | $0 |
| Publish + footnote it from every Deep Audit | 1 hr | $0 |
| **Total** | **~2 working days** | **~$360** |

Slightly over the $200 budget if we pay Upwork humans; we can substitute git-blame-derived baselines for the first version to stay under $200. Either path works for v1.

The blog post title is locked: **"How honest are our minutes-saved numbers? Here's the data."** That title is itself a wedge — skeptics click it. Each ROI card in production links to it via a small "?" tooltip footnote.

## 4. Honest disqualifiers — when the ROI card should not be trusted

The UI must explicitly flag low-confidence estimates. Three concrete cases:

1. **The candidate doesn't match any calibrated `lang × category` cell.** Show the estimate, but render the minutes-saved number in muted gray with a "low confidence" badge. Card text: "We haven't calibrated this exact refactor pattern. The estimate is GPT-5's self-report, capped at 50% of typical."
2. **The Deep Audit diff is large** (> 200 lines changed or > 5 files touched). Refactors at this scale have higher variance and human review takes proportionally longer. Card text: "Large refactor — human review time may exceed Codex's generation time. Treat estimate as a ceiling."
3. **The language is outside the supported set (anything not in JS/TS, Python, Go, Java, C#).** Show the *static* signals (complexity, repetition score) but hide the minutes-saved number entirely. Card text: "Language outside our calibrated set. We'll rank the candidate, but won't quote a time estimate until we benchmark it."

In all three cases the user can still see the diff. The product still delivers value. We just don't let a hand-wavy number do load-bearing work.

**Bonus disqualifier.** When the user's `confidence_multiplier` is set to <0.5, we display the number with a "user-discounted" annotation so the screenshot they share doesn't accidentally misrepresent our default. Anti-meme insurance.

## 5. Long-term plan — calibration at 100 / 1,000 / 10,000 customers

**At ~100 customers (Year 1, $50–100K ARR):** v1 corpus (~30 tasks) + the leaderboard (target: ~50 accepted submissions = effective N≈80). At this stage we publish v2.json with double the language coverage and add Rust + Ruby as supported languages. Cost: ~$2K in bounties + ~$500 in tokens. Funded from revenue.

**At ~1,000 customers (Year 2, $1M+ ARR):** Hire a part-time research engineer to maintain the corpus and run quarterly recalibration as GPT-5 → GPT-6 → next-gen models change the time math. Add opt-in telemetry: "Share anonymized audit metrics to help calibrate" → user toggles a switch, we record (`task_category, lang, codex_minutes_measured, user_dismissed_estimate?, user_override_multiplier`). The telemetry corpus grows to N≈10,000 within a quarter. Cost: ~$80K loaded for the half-FTE + ~$5K infra.

**At ~10,000 customers (Year 3, $10M+ ARR, post-Series-A territory):** A full calibration team. Real-time A/B testing of recommendation prompts. Per-customer calibration that learns from their team's actual merge cadence. ML model trained on the telemetry corpus to predict minutes-saved without invoking GPT-5 at all. We explicitly defer this to post-Series-A — it's a Year 3+ problem and the bottleneck before then is distribution, not calibration depth.

**What we explicitly do not promise on day one.** Per-customer personalized calibration. Telemetry-based learning. Real-time recalibration as customer codebases evolve. These are all genuinely valuable but they are not load-bearing for the wedge sale. Indie hackers and even early Persona 2 buyers are happy with "we have a public benchmark, here's the link" — the heavy ML lifting is for Persona 5 customers who haven't appeared yet.

## 6. What this whole framework is really doing

Three things, in order of strategic importance:

1. **Defangs the single hardest demo question.** When the OpenAI judge asks "how do you justify the minutes-saved number," the answer is "here's a public dataset of 30 timed refactors plus a $50 bounty for finding refactors we got wrong." That's not marketing; it's evidence. We change the question from "are you sure" to "is your methodology rigorous" — which we can defend.
2. **Builds a moat that compounds.** Every accepted leaderboard submission grows the corpus. The corpus is the differentiator competitors can't ship in a quarter because it's gathered slowly by definition. CodeScene can copy our UX; they can't copy six months of skeptic-submitted ground-truth.
3. **Forces honesty into the product UX.** The disqualifiers in §4 prevent us from quoting a confident number when we shouldn't. This is what keeps the product from sliding into the same hype zone as every other AI-ROI tool. The pitch in `[[market_research]]` — "we sell to skeptics by interrogating Codex itself" — only works if we stay credible. Calibration is that credibility.

The thesis in `[[why_it_works]]` rests on "the artifact is more persuasive than any pitch." The corpus is what makes the artifact persuasive *under hostile review*. Without it, every minutes-saved number is a vibe. With it, the vibe has a footnote.
