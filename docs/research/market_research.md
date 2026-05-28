# Market Research — Executive Synthesis

> Status: synthesized 2026-05-26 from `competitors.md`, `tam_sam_som.md`, `icp.md`, `codex_pain.md`, `pricing_benchmarks.md`. Read those for sources and arithmetic.

## The product, in one line

Codex Usage Analyzer scans a codebase and returns a ranked, evidence-backed list of where OpenAI Codex would save the most engineering time — high-complexity functions, repetitive patterns, test-coverage gaps — with on-demand Deep Audits that actually attempt the change and quantify the ROI.

## The market gap (the headline)

**The "pre-purchase diagnostic" moment is genuinely uncovered.** Every existing analytics tool measures AI tools *after* the seats are bought (Copilot Metrics, Cursor analytics, Jellyfish AI Impact, DX, LinearB). Every code-intelligence tool either scores hotspots vendor-agnostically (CodeScene, Codacy, Sourcery) or generates better completions assuming you've already adopted AI (Augment, Cursor, Greptile). Nobody ships the artifact a buyer needs *before* signing a seat agreement: a defensible, codebase-specific, Codex-named, hours-saved estimate.

This gap exists because every incumbent is either (a) selling to ICs who've already decided, or (b) measuring outcomes for orgs that have already deployed. We sell to the budget-holder at the moment they're deciding whether to spend.

## Why now

Three simultaneous conditions in 2026:

1. **Trust gap is structural and widening.** 84% of devs use AI tools but only 29% trust them — down 11pp from 2024 (Stack Overflow 2025). 66% say they spend more time fixing "almost-right" AI code. METR's randomized trial measured experienced devs as 19% *slower* with AI tools, with a 39-point gap between perceived and actual speed.
2. **CFOs are now asking the ROI question.** Codex switched to token-aligned credit billing in April 2026. Copilot moves to usage-based billing in June. Cursor users routinely report 1T+ tokens/year. CodeRabbit hit $15M ARR in two years; Greptile $25M Series A. Every dollar of AI coding spend now has someone asking "what did we get for that?"
3. **Codebases are visibly degrading.** GitClear's 2024 dataset (211M lines): cloned code rose 8× in one year, refactoring share dropped from 25% to <10%, code churn doubled. DORA 2025: PR review time up 91–441% in high-AI-adoption teams. The same metrics that scare quality-focused engineers are *exactly the signals* our analyzer surfaces as Codex targets.

## Market sizing

| Layer | Conservative | **Base** | Bull |
|---|---:|---:|---:|
| TAM | $185M | **$374M** | $900M |
| SAM | $82M | **$180M** | $486M |
| SOM (24mo ARR) | $0.35M | **$1.17M** | $3.7M |

Base SAM ($180M) sits at ~3% of the broader AI code assistant market ($7–$13B), consistent with how observability/analytics layers price relative to the runtime tools they observe. SOM is bottom-up across three cohorts: indie hackers ($80 ACV), scrappy SaaS teams ($450 ACV), EM-led mid-market pilots ($5K ACV).

The highest-leverage assumption to validate is **per-seat ACV** ($12 add-on vs $60 platform = 2–5× TAM swing). The de-risking experiment: run a 30-day paid pilot with 3 mid-market eng managers at $3–5K. 2/3 conversion validates the SAM math; 0/3 means pivot to pure self-serve indie.

## Customer

Five personas, two-stage motion:

**Wedge (months 0–3):** indie hacker / solo founder (Persona 3) as the self-serve buyer, with skeptic senior engineer (Persona 1) as the HN distribution channel. Combined: HN front-page demo → free CLI tier → $9/mo SaaS. Reachable in days, no procurement.

**Bridge (months 3–9):** engineering manager / VP Eng (Persona 2). $5–15K ACV. Smallest atomic enterprise unit — can sign a credit card without procurement.

**Upmarket (months 9–24):** enterprise platform engineering lead (Persona 5) at $50–250K ACV, unlocked by SOC 2 work funded by Persona 2 revenue. DevRel (Persona 4) as a distribution multiplier throughout.

The product sells to whoever is closest to the budget. The wedge persona pays $99/yr personally. The upmarket persona signs a procurement contract. The motion is the same product; only the SKU shape changes.

## Competition

**Closest competitors that matter:**

1. **CodeScene** — hotspot detection by complexity × change frequency at $20–30/active author/mo. Vendor-neutral, doesn't quantify Codex-specific hours saved, doesn't show before/after diffs. One feature ship away from being us.
2. **OpenAI itself** — Codex Enterprise shipped analytics in 2026 but only post-install. A first-party "where to deploy Codex" report is the natural V2 and the existential 12-month threat. Mitigation: lean into multi-vendor comparison (Codex vs Copilot vs Claude Code) — something OpenAI structurally cannot ship.
3. **Jellyfish / DX (Atlassian, $1B acq)** — both ship AI-ROI dashboards across Copilot/Cursor/Claude Code, but at cohort/people grain, not codebase grain. Different funnel.

**Sleeping competitors:** Sourcegraph (owns both codebase index + Cody AI assistant), Greptile (has the code graph, currently fighting pricing controversy), Augment Code ($227M raised, indexes 500k files).

Our moat is speed of distribution, not technical depth. Anyone above can ship a copy in one quarter. The 6–12 month window is real.

## Why we can win in that window

1. **AI-vendor-specific recommendations.** "This function takes Codex ~3 minutes, saves ~90 minutes of human time" beats "this is a hotspot." Concrete, comparable, defensible.
2. **Before/after Codex diffs as proof.** Only Sourcery ships diffs at scale today, and only for Python refactors. A report that actually runs Codex against the top 3 candidates and shows the diff is dramatically more convincing than any scorecard.
3. **Buyer persona is different.** Most competitors sell to ICs or platform teams. We sell to the person with the seat-license budget. Different funnel, different content, different language.
4. **One-shot consulting-style deliverable, not a SaaS sub.** The artifact (a Markdown/PDF report) is the unit of value. It can be the natural sales-enablement asset for OpenAI's own enterprise team — a potential partnership channel, not a competition vector.
5. **Test-coverage gaps as a Codex-shaped opportunity.** 72% of teams using AI use it for test generation. We rank untested files by ROI-to-test in hours. Nobody else frames coverage gaps as "Codex deliverable."

## Top three pains we sell against (use in demo)

1. **The "Almost Right" Tax + METR 19% slowdown.** Skeptics' single most credible argument against generic Codex adoption. We flip it: deterministic targeting before invocation, no random AI use.
2. **Duplication and complexity collapse (GitClear).** The same metric that scares quality-focused devs is what flags our highest-leverage Codex targets. We turn the scare-stat into the actionable list.
3. **Cost/ROI opacity.** A skeptical CTO staring at a $19–$200/seat bill needs a per-repo ROI number. We compute it.

## Pricing thesis

We don't compete on per-seat assistant pricing — we're a meta-product. Recommended wedge: **demo as a one-shot repo audit ($499–$1,999), pitch the business as per-repo SaaS at $99/repo/mo (small) → $499/repo/mo (enterprise)**. Sits decisively above the free OSS floor, below Greptile's per-seat motion, calibrated to ~5–15% of the customer's aggregate Copilot/Cursor/Codex spend. Detailed model in `pricing.md`.

The hackathon prize itself (Codex Pro ≈ ₹1.2L/yr ≈ $1,440/yr) signals that OpenAI is openly setting a $100–$200/mo price floor for "serious AI coding." Our SKU sits adjacent to that floor, billed per-repo so it's never the most expensive item on the invoice.

## Strategic risks

| Risk | Likelihood | Mitigation |
|---|---|---|
| OpenAI ships first-party opportunity finder | High in 12mo | Lean into multi-vendor comparison; position as independent buyer's advocate |
| CodeScene wraps Codex/Copilot integration around existing hotspot model | High in 6mo | Sharper Codex-specific time estimation + before/after diffs |
| Trust gap closes (Gartner's 75%-by-2028 with high trust) | Medium | Pivot to pure productivity analytics; we keep the meta-product framing |
| Codex pricing model destabilizes (already token-billing in Apr 2026) | Already happening | Predict Codex token consumption per recommended action — itself a wedge feature |
| Hackathon judges already saw 50 "AI coding tool" pitches | Certain | Lead with the META framing in the first 10 seconds: "we sell Codex to skeptics by interrogating Codex itself" |

## The one-page thesis

A buyer staring at a $19–$200/seat Codex/Copilot decision currently has no defensible report telling them where in *their* codebase the spend will pay off. Every adjacent vendor measures the wrong thing (post-adoption telemetry) or the wrong grain (people, not code). We ship the missing artifact: a ranked, line-cited, vendor-specific, ROI-quantified list — with a live diff Codex actually generated to make the wins visceral. The wedge persona is the indie hacker; the bridge is the eng manager; the upmarket is the platform engineering lead. Pricing is per-repo SaaS calibrated to a 5–15% tax on existing AI tool spend. The window is 6–12 months before OpenAI or CodeScene ships first-party — fast enough to be a real category if we ship credible v1 in the next 7 days.
