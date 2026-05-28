# Pricing Model — Codex Usage Analyzer

> Status: drafted 2026-05-26. Derived from `pricing_benchmarks.md` and `icp.md`. Update after first 10 paid customers reveal real WTP.

## Pricing principle

We sit on top of every paid Codex / Copilot / Cursor / Windsurf / Claude Code seat. Our pricing should be **~5–15% of the customer's aggregate AI coding spend** — a tax small enough to bypass procurement, large enough that the per-repo report justifies an annual contract. The pricing model itself doubles as positioning: per-repo, not per-seat, because seat-based pricing makes us look like one more AI assistant rather than the meta-product.

## Tiers

| Tier | Price | Scope | Who buys |
|---|---|---|---|
| **OSS Scanner** (free) | $0 | Local CLI, basic complexity + duplication metrics, no Codex-specific scoring, no ROI quantification | Persona 1 (skeptic senior eng) for HN distribution; Persona 4 (DevRel) for talks |
| **Indie** | **$9/mo** or **$90/yr** | 3 active repos, Quick Scan unlimited, 5 Deep Audits/mo, Markdown export | Persona 3 (indie hacker / solo founder) |
| **Team** | **$99/repo/mo** | 1 repo, Quick Scan unlimited, 50 Deep Audits/mo, ROI Calculator, Skeptic Mode, PR-bot beta access (post-MVP) | Persona 2 (eng manager / VP Eng) — small teams |
| **Business** | **$499/repo/mo** | Up to 5 repos, unlimited Deep Audits, all Team features + cross-repo readiness rollup + Slack digest | Persona 2 at larger scale |
| **Enterprise** | **Custom** ($50K–$250K ACV) | Unlimited repos, SSO, SCIM, SOC 2, on-prem option, white-label reports, OEM partnership | Persona 5 (platform engineering lead) |
| **One-shot Audit** | **$499 / $999 / $1,999** | Per-repo size: <50K LOC / 50K–500K LOC / 500K+ LOC. Single audit + PDF report + JSON manifest. No recurring. | Hackathon-launch motion + Persona 4 OEM sales |

## Why per-repo, not per-seat

Three reasons:

1. **Positioning.** Every AI assistant in Layer 2 ($10–$40) and Layer 3 ($59–$500) is per-seat. Anchoring on a different unit (per-repo) signals "different product category" immediately.
2. **Buyer-friendly math.** Per-repo is cheaper for any team above ~5 engineers and grows with the codebase, not the headcount. Eng managers love it because the line item doesn't scale with hiring.
3. **Matches the workload.** The unit of analysis is the repo. A 200-dev team with one repo costs the same to scan as a 20-dev team with one repo. Per-repo billing tracks our compute cost more honestly than per-seat.

## How the price ladder defends itself

- **OSS Free → Indie ($9/mo)**: trivial $9 hurdle. Selling continuous scanning + private repo support + export. Conversion target: 2–4% of HN-acquired free users in 90 days.
- **Indie ($9) → Team ($99)**: 11× jump justified by ROI Calculator, Skeptic Mode, larger audit quota, single-repo scope (vs 3-repo Indie scope — Team buyer cares about depth on one critical repo, not breadth across hobby projects).
- **Team ($99) → Business ($499)**: 5× jump justified by multi-repo rollup, unlimited audits, Slack digest, faster turnaround. Aimed at teams running Codex across multiple services.
- **Business ($499) → Enterprise**: standard procurement gates — SOC 2, SSO, SCIM, VPC deploy.

## Comparison to category

Anchors (per-seat, monthly):

- Copilot Pro: $10 (incl AI credits)
- Tabnine Pro: $12
- Codex Plus: $20 / Cursor Pro: $20 / Windsurf Pro: $20
- Codacy: $15–$25/committer
- CodeScene: $20–$30/author
- Greptile: $30/seat + $1/review over 50
- Copilot Business: $19 / Cursor Teams: $40 / Windsurf Teams: $40
- Tabnine Enterprise: $39 / Copilot Enterprise: $39
- Cody Enterprise: $59 / Tabnine Agentic: $59
- Codex Pro: $100–$200 / Replit Pro: $100 / Devin Team: $500

Our Team SKU ($99/repo) is the rough equivalent of one Copilot Enterprise seat's monthly spend, but priced per-repo so a 10-eng team paying $390/mo for Copilot Enterprise spends $99/mo on us — a clean 25% overlay. This is the spec for "5–15% of aggregate spend": acceptable surcharge, defensible ROI.

## What the hackathon prize signals about price ceilings

OpenAI Codex Pro lists at ₹1.2L/yr (~$1,440/yr ≈ $120/mo). India localized at ~₹10,699/mo for ChatGPT Pro. This sets the upmarket price floor for "serious developer subscriptions" at ~$100–$200/mo per developer. Our Team SKU at $99/repo sits *below* a single Codex Pro seat per month — every solo founder paying for Codex Pro can rationalize adding us.

## The one-shot audit pricing

Three tiers based on repo size, charged per audit:

| Repo size (LOC) | Audit price |
|---|---|
| <50,000 | $499 |
| 50,000–500,000 | $999 |
| 500,000+ | $1,999 |

Includes: one-time scan, deep audit on top 10 candidates, 20–40 page PDF report, JSON manifest of targets, 30-minute follow-up call. Targeted at:

- **Codex/Copilot procurement decisions** — eng manager wants a defensible buy-or-don't artifact. $999 is < 1 day of one senior engineer's loaded cost.
- **DevRel / OEM partnerships** — OpenAI / Anthropic / Vercel reps can co-brand the report for top enterprise prospects, bill the customer or absorb it as a sales-enablement asset.
- **Demo-mode for the hackathon judges** — the deliverable is the demo.

## Cost model — is this profitable?

For an Indie subscriber ($9/mo) doing 5 Deep Audits/mo on small repos:
- 5 audits × ~2k tokens × ~$0.03/1k = $0.30/mo OpenAI cost.
- Quick Scans: unlimited but capped at 5k tokens input × GPT-5-mini ≈ $0.005/scan; even 50 scans/mo is $0.25.
- Total marginal: <$1/mo. Gross margin ~90%.

For a Team subscriber ($99/repo/mo) doing 50 Deep Audits + heavy Quick Scans:
- Audits: 50 × ~$0.50 = $25.
- Scans: 500 × ~$0.005 = $2.50.
- Cache savings: ~50% of repeat scans hit cache → ~$13 effective.
- Gross margin: ~85%.

Vercel hosting + Runtime Cache + Blob: ~$50/mo flat for the first 1,000 users. Negligible per-customer.

The business is gross-margin-rich. The variable cost is OpenAI tokens, which scale linearly with usage and are protected by aggressive caching + input caps.

## Discounts and special cases

- **Annual prepay:** 17% off (2 free months). Matches Windsurf and Cursor convention.
- **Indie founders / solo devs proof:** $9 → $5 with founder verification. Marketing investment.
- **OSS maintainers:** Free Team tier for verified OSS repos with >500 stars. Pure goodwill / brand investment.
- **Education:** Free for accredited universities.
- **Hackathon special:** First 100 hackathon entrants get 6 months free of Team tier. Used as a launch-week distribution device.

## Pricing experiments to run in week 2

1. **A/B test Indie price at $9 vs $14 vs $19.** Sample size: 200 visitors/arm. Goal: find the upper bound where conversion holds.
2. **Time-locked one-shot bundle.** $499 audit + 3 months Team tier for $599 total. Test whether the bundled offer converts higher than either alone.
3. **Free credit for first repo scan.** Persona 2 acquisition lever: scan one repo free, get the report, then paywall continuous scanning at $99/mo.

## Strategic price discipline

What we will *not* do:

- **No per-seat pricing in MVP.** Even if a customer asks. The per-repo unit is the positioning.
- **No "freemium with daily token cap."** Cursor/Windsurf controversies show this destroys goodwill faster than it converts. We have either a free OSS scanner (no LLM) or a paid tier — no in-between cap surprises.
- **No lifetime deal.** Lifetime deals on AppSumo etc. attract customers we don't want and depress recurring revenue.
- **No "talk to sales" gate below Enterprise.** Persona 3 and Persona 2 buy with a credit card.

## What gates the Enterprise tier

Sequenced post-hackathon:

1. **Month 1–2 post-launch:** SSO via WorkOS or Clerk.
2. **Month 2–4:** SOC 2 Type II observation period kicks off (use Vanta).
3. **Month 4–6:** On-prem / VPC deploy as a one-off engagement; productize after the 3rd customer.
4. **Month 6–9:** SOC 2 attestation, enterprise contracts via Persona 5.

Until then, Enterprise inquiries get a customized one-shot audit + Team tier with annual prepay as the bridge.

## Net pricing thesis

A buyer paying $5K–$50K/year on Copilot / Codex / Cursor seats can add $99–$499/month on us without procurement. The ROI math (audited targets × minutes saved × hourly rate) clears the hurdle by a factor of 10–50× in any reasonable scenario. The pricing isn't aggressive — it's calibrated to disappear into the existing AI tools line item.
