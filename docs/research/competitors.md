# Competitive Landscape — Codex Usage Analyzer

> Internal market research, drafted 2026-05-26. Anchor on 2025-2026 sources. The product positions itself as a "meta-tool": ingest a codebase, return a ranked, evidence-backed list of where OpenAI Codex would deliver the largest engineering-time savings (high-complexity functions, repetitive patterns, test-coverage gaps). The pitch is to skeptics — buyers who want a defensible business case before issuing seat licenses.

---

## 1. Executive Summary

- **The "AI-savings-finder" angle is partly empty, not fully empty.** Two camps are circling it from different sides: (a) **behavioral code analysis** vendors (CodeScene, Codacy, Sourcery) already rank refactor targets by complexity / change frequency, and (b) **eng-productivity analytics** vendors (Jellyfish, LinearB, Swarmia, DX) measure AI-tool ROI *after* deployment. Neither camp produces a pre-purchase, Codex-specific recommendation list ranked by estimated time savings.
- **No competitor today ships a "where would AI help most?" deliverable as its core product.** CodeScene is closest in spirit (hotspots = refactor candidates) but is framework-agnostic and AI-neutral; it does not estimate Codex-specific savings, does not provide before/after diffs, and does not name an AI vendor [source 6][source 21]. Jellyfish/LinearB/DX measure AI impact *after* adoption — they are buyer-justification tools, not buyer-acquisition tools [source 17][source 19][source 20].
- **The pitch wedge is the diagnostic-before-purchase moment.** Buyers evaluating Codex/Copilot/Cursor are mostly flying blind on where to point the tool first. Codex's own first-party analytics dashboard exists, but only *post-install* and only for usage telemetry — not a pre-install opportunity map [source 13].
- **Largest threat: Sourcegraph, Augment Code, and Greptile.** All three already ingest entire codebases for AI context. Adding a "Codex opportunity report" module would take any of them <1 quarter. Sourcegraph specifically has both Code Search analytics *and* an AI assistant under one roof [source 1][source 3][source 8].
- **OpenAI itself is the meta-threat.** Codex Enterprise added an analytics dashboard in 2026 [source 13]. A first-party "where to deploy Codex" report is a natural V2 — and OpenAI has every incentive to ship one to close enterprise deals. Treat this product as a 6–12 month window, not a long-term moat.

---

## 2. Feature Matrix

Legend: ✅ = ships today, ⚠️ = partial / indirect, ❌ = absent.

| Competitor | Identifies high-leverage AI targets? | Estimates time saved? | Before/after diff? | Multi-language? | Free tier? | Pricing (2026) |
|---|---|---|---|---|---|---|
| **Sourcegraph Cody + Code Search** | ⚠️ (code intel only) | ❌ | ❌ | ✅ | ⚠️ (limited) | $19–$59/user/mo + Enterprise quote [source 1] |
| **Greptile** | ⚠️ (PR-scoped) | ❌ | ⚠️ (per-review) | ✅ | ⚠️ | $30/dev/mo + $1/review over 50 [source 2] |
| **Augment Code** | ⚠️ (context-aware, not opportunity-ranked) | ❌ | ❌ | ✅ | ❌ | $20–$200/mo + Enterprise quote [source 3] |
| **Codacy** | ⚠️ (code quality smells) | ❌ | ❌ | ✅ (40+) | ✅ (OSS, ≤2 committers) | ~$15–$25/committer/mo [source 4][source 22] |
| **CodeScene** | ✅ (hotspots — closest analog) | ⚠️ (risk score, not hours) | ❌ | ✅ (28+ langs) | ✅ (OSS) | $20–$30/active author/mo [source 6][source 21] |
| **Sourcery** | ⚠️ (Pythonic refactors) | ❌ | ✅ (suggested diffs) | ⚠️ (Python-heavy) | ✅ | $10/user/mo [source 7] |
| **AppMap** | ⚠️ (runtime defects, not AI targets) | ❌ | ❌ | ✅ (5 langs) | ✅ (OSS) | Open-source core + Enterprise quote [source 8] |
| **Snyk Code (DeepCode)** | ❌ (security-focused) | ⚠️ (MTTR claim) | ✅ (auto-fix) | ✅ (19+) | ✅ (limited) | $0 / $25+/dev/mo / Enterprise [source 9] |
| **GitHub Copilot Metrics** | ❌ (post-adoption only) | ⚠️ (LOC, acceptance rate) | ❌ | ✅ | ⚠️ (Copilot tier req'd) | Bundled with Copilot Business/Ent. [source 10] |
| **Cursor Team Analytics** | ❌ (usage telemetry) | ❌ | ❌ | ✅ | ❌ | Included in Cursor Business/Ent. [source 11] |
| **Windsurf** | ❌ (PCW telemetry) | ⚠️ (PCW) | ❌ | ✅ | ⚠️ | $30/user/mo + Enterprise [source 12] |
| **Continue.dev** | ❌ | ❌ | ❌ | ✅ | ✅ | $0 / $10/dev/mo / Enterprise quote [source 14] |
| **Tabnine** | ❌ | ⚠️ (admin dashboards) | ❌ | ✅ | ✅ | $39–$59/user/mo + Enterprise [source 15] |
| **Replit Agent** | ❌ | ⚠️ (effort credits) | ❌ | ✅ | ✅ | $17–$100/mo + Enterprise [source 16] |
| **Devin (Cognition)** | ❌ | ⚠️ (ACU spend) | ❌ | ✅ | ❌ | $20–$500/mo + Enterprise quote [source 17] |
| **OpenAI Codex (first-party)** | ❌ (no opportunity report) | ⚠️ (usage analytics) | ❌ | ✅ | ⚠️ (ChatGPT Plus) | Bundled w/ ChatGPT plan + Enterprise [source 13] |
| **LinearB** | ❌ (process metrics) | ⚠️ (AI vs non-AI cohorts) | ❌ | ✅ (lang-agnostic) | ⚠️ | Enterprise quote [source 18] |
| **Swarmia** | ❌ | ⚠️ (adoption rate only) | ❌ | ✅ | ⚠️ | Per-dev SaaS [source 19] |
| **Jellyfish** | ❌ | ✅ (Copilot/Cursor/Claude Code dashboards) | ❌ | ✅ | ❌ | Enterprise quote [source 20] |
| **Sleuth** | ❌ (DORA/deploy focus) | ❌ | ❌ | ✅ | ⚠️ | Per-dev SaaS [source 23] |
| **DX (Atlassian)** | ❌ (post-adoption ROI) | ✅ (3.9 hrs/wk saved benchmark) | ❌ | ✅ | ❌ | Enterprise quote [source 24] |

**Read in one sentence:** nobody ships the full quartet of "rank AI targets / quantify hours saved / show before-after diff / language-agnostic" — CodeScene + Sourcery come closest but neither is AI-vendor-specific.

---

## 3. Per-Competitor Breakdown

### Tier A — Direct or adjacent code-intelligence tools

#### Sourcegraph Cody / Sourcegraph Code Search
Sourcegraph remains the most relevant adjacent player because it owns *both* a codebase-wide search/index product *and* an AI assistant (Cody) in the same SKU [source 1]. Cody indexes up to 10 repos for cross-system context, and pricing in 2026 sits at $9/user/mo (Pro), ~$49–$59/user/mo (Enterprise) [source 1]. The product positioning is "AI that understands your monorepo," not "show me where AI would save time." Code Search Insights does surface code-health trends, but the analytics view is owner-, language-, and pattern-based, not opportunity-ranked. **Weakness vs our pitch:** no "Codex opportunity report" deliverable, and Cody is locked to Sourcegraph's own LLMs (Claude/GPT-4o), not Codex specifically. **Threat:** very high — they have every piece of plumbing required to ship this in a quarter.

#### Greptile
Greptile indexes the repo into a code graph and runs multi-hop agentic investigations on PRs [source 2]. In March 2026 they moved to a per-review pricing model ($30/dev/mo includes 50 reviews, then $1/review), which prompted significant developer backlash [source 2]. The product is exclusively PR-scoped review; it does not produce a holistic "where should we apply AI" report. **Distinctive feature:** highest reported bug-catch rate (82%) but at the cost of false positives [source 2]. **Weakness vs our pitch:** no time-savings estimation, no Codex-specific recommendation, optimized for review-time decisions not adoption-time decisions. **Threat:** medium — they have the codebase-graph primitive but their pricing controversy gives them other priorities right now.

#### Augment Code
Augment positions on context-engine quality, indexing up to 500k files / dozens of repos and powering agents that span millions of LOC [source 3]. October 2025 pricing flipped to credit-based: Indie $20, Standard $60, Max $200, Enterprise custom [source 3]. The pitch is "AI that scales with codebase complexity" — the *opposite* angle from ours. Augment assumes you've already bought into AI and want better quality; we sell to people who haven't bought in. **Weakness vs our pitch:** no diagnostic / pre-purchase report. **Threat:** medium — Augment raised $227M, has the indexing tech, and adding an "opportunity scan" report would be a natural top-of-funnel acquisition lever for them.

#### Codacy
Codacy is classic static-analysis-as-a-service: 40+ language linters, code-quality metrics, coverage tracking [source 4]. Pricing is per-committer, ~$15–$25/committer/month for Professional [source 4][source 22]. Codacy added AI-assisted-engineering quality checks in 2025 but the core remains rule-based. **Weakness vs our pitch:** identifies bugs and style issues, not AI-leverage opportunities. A "high complexity function" surfaced by Codacy is flagged as a rule violation, not as a "would benefit from Codex regeneration" candidate — these are different framings even when the underlying functions overlap. **Threat:** low — Codacy is rooted in deterministic linting culture; AI-target-ranking would require a product pivot.

#### CodeScene
**The closest analog to our pitch.** CodeScene's defining concept is behavioral code analysis: overlay git change-frequency on cyclomatic-complexity scores to identify "hotspots" — frequently-changed, low-health files where engineering time bleeds away [source 6][source 21]. A 25-metric Code Health score per file, hotspots viz, knowledge-loss heatmaps, and now AI-refactoring suggestions are all in-product [source 6]. Pricing: $20–$30 per active author per month with unlimited viewers [source 21]. **Distinctive feature:** the only competitor whose central UX is "here is where engineering effort is wasted, ranked by ROI of fixing." **Weakness vs our pitch:** (i) it is AI-vendor-neutral — does not translate hotspots into "hours saved by Codex"; (ii) hotspots ≠ Codex-targets — many hotspots need human architectural judgment, not LLM generation; (iii) no before/after Codex diff; (iv) framework-philosophy-led, not buyer-justification-led — the sales narrative is technical-debt reduction, not "should we buy Copilot/Codex licenses?". **Threat:** very high. If CodeScene wraps a Codex/Copilot integration around its existing hotspot model, our product is largely obsolete.

#### Sourcery
Sourcery is a Python-first AI refactoring tool ($10/user/month, free for OSS), the cheapest in the category [source 7]. Generates concrete refactor diffs (loop comprehensions, dataclass conversions, conditional simplifications) inline in IDE / PR [source 7]. **Distinctive feature:** actually ships before/after diffs as the primary unit of value — the *only* competitor in this list that does. **Weakness vs our pitch:** the diff scope is small (one function, one pattern); it does not produce a strategic, codebase-wide opportunity report. Also language-limited despite multi-language announcements. **Threat:** medium — they have the diff-generation UX but lack the strategic-report framing.

#### AppMap
AppMap operates on a different axis: it instruments running applications to record execution traces, then offers runtime-aware code review (N+1 query detection, breaking-API analysis, runtime security flaws) [source 8]. Supports Java, JS/TS, Python, Ruby, with framework templates for Spring/Django/Rails/Next.js [source 8]. **Distinctive feature:** runtime-grounded diagnosis, not static analysis. **Weakness vs our pitch:** completely different problem space — AppMap finds runtime defects, not LLM-leverage opportunities. There is a possible adjacency story (functions with the most runtime time spent ≈ most ROI to optimize) but AppMap has not framed it that way. **Threat:** low.

#### Snyk Code (DeepCode)
Snyk Code is security-SAST, not productivity analysis. DeepCode AI added auto-fix with claimed 80% fix accuracy and 84% MTTR reduction [source 9]. Pricing: free tier (200 OSS / 100 Code tests / month), Team $25/dev/mo (min 5), Enterprise custom [source 9]. February 2026 they launched the "AI Security Fabric" positioning [source 9]. **Weakness vs our pitch:** security is orthogonal to AI-engineering-time savings. Snyk's auto-fix is a *result* — not a *pre-purchase recommendation*. **Threat:** low.

---

### Tier B — AI coding assistants whose dashboards could claim this ground

#### GitHub Copilot Workspace + Copilot Metrics
Copilot Metrics went GA in February 2026 [source 10]. The dashboard exposes 28-day trends across adoption, engagement, acceptance rate, LOC suggested/added/deleted, PR-lifecycle metrics, IDE and model breakdowns, with API export at enterprise/org/user grain [source 10]. **Critically: this is a post-adoption telemetry product, not a pre-adoption recommendation product.** It tells you what Copilot did, not where Copilot would help most if you bought it. **Weakness vs our pitch:** zero overlap with the pre-purchase diagnostic moment. **Threat:** medium-low — GitHub *could* ship an "opportunity finder" using their unique advantage of seeing all repos, but they have shown no urgency to do so; their current motion is "Copilot is the default, measure adoption."

#### Cursor (and its team analytics)
Cursor's May 2026 enterprise release added granular usage analytics: per-model, per-feature (autocomplete vs Composer vs chat), per-team breakdowns; soft-spend limits; model/provider allow-lists [source 11]. Cursor claims 64% of Fortune 500 usage [source 11]. **Weakness vs our pitch:** same as Copilot — pure usage telemetry, no codebase-opportunity diagnostic. **Threat:** low-medium — Cursor's culture is bottoms-up adoption, not justification-to-skeptics, so building a buyer-justification report is off-strategy for them.

#### Codeium / Windsurf
Windsurf (rebranded from Codeium April 2025, then center of OpenAI $3B acquisition rumors and eventual Cognition acquisition in 2025) reports 1M+ active users and 70M+ LOC/day [source 12]. Enterprise Teams plan ($30/user/mo) ships an admin dashboard exposing "Percent of Code Written (PCW) by AI," LOC, tool calls, credit consumption per developer [source 12]. **Distinctive feature:** PCW is the closest commercial proxy for "AI is taking over X% of engineering work." **Weakness vs our pitch:** PCW is a lagging indicator on installed users — it does not answer "where in the codebase would this help most." **Threat:** medium — Cognition now owns both Windsurf and Devin; an integrated "where to deploy our AI engineer" report is plausible.

#### Continue.dev
Open, configurable AI dev platform. Solo $0, Team $10/dev/mo, Enterprise custom; positioning is "BYOK + MCP + agent mode" [source 14]. The product is an IDE extension and agent platform, not an analytics surface. **Weakness vs our pitch:** no analytics layer. **Threat:** low.

#### Tabnine
Tabnine is the privacy-first / air-gapped option ($39 Code Assistant, $59 Agentic Platform, Enterprise custom) [source 15]. Enterprise dashboard surfaces seat usage, model breakdowns, compliance audit logs. **Weakness vs our pitch:** dashboards are seat-management, not opportunity-finding. **Threat:** low.

#### Replit Agent
Replit Agent 3 + Effort-Based Pricing (Feb 2026): per-checkpoint billing tied to compute+time per agent task [source 16]. Plans: Starter free, Core $17/mo, Pro $100/mo (15 builders), Enterprise [source 16]. **Distinctive feature:** Effort-based pricing is arguably the most transparent "cost per AI task" model in the market. **Weakness vs our pitch:** Replit is consumer/prosumer-skewed; the buyer-justification frame doesn't match their audience. **Threat:** low.

#### Devin (Cognition)
Devin 2.0 dropped entry pricing from $500 → $20/mo (Core), with Team at $500/mo (unlimited fair-use), Enterprise custom + ACU consumption [source 17]. Cognition raised at $25B valuation in April 2026 [source 17]. **Distinctive feature:** the "AI engineer" framing — sells autonomy, not augmentation. **Weakness vs our pitch:** Devin's pitch already assumes adoption — they don't sell to skeptics. **Threat:** medium — Cognition now owns Windsurf too, giving them both bottoms-up (IDE) and top-down (autonomous agent) channels; a "where would Devin replace tickets?" report is a natural addition.

#### OpenAI Codex (first-party)
Codex itself shipped (as of 2026) an Enterprise governance guide with an Analytics dashboard, data export, and Analytics API endpoints [source 13]. ChatGPT Enterprise admins issue Codex access tokens for CI/script use [source 13]. **Critically**: the analytics surface is usage-side (who used Codex, what they accepted), not opportunity-side (where Codex *should* be used). No publicly documented "Codex opportunity finder" exists from OpenAI today. **Weakness vs our pitch:** this is the *meta-threat*. OpenAI has every incentive to ship a pre-purchase scoping tool for Codex Enterprise deals, and they own the underlying model + telemetry to do it best. **Threat: very high (long-term).** Treat this as the single biggest existential risk.

---

### Tier C — Adjacent engineering analytics

#### LinearB
LinearB's 2026 benchmarks added three AI-specific metrics on top of 20 SDLC metrics; dataset spans 8.1M PRs across 4,800 teams [source 18]. Notable findings: AI PRs wait 4.6× longer for review but get reviewed 2× faster, acceptance is 32.7% (vs 84.4% human), AI PRs are 154% larger and contain 75% more logic errors [source 18]. **Distinctive feature:** the largest AI-PR benchmark dataset in the industry. **Weakness vs our pitch:** LinearB measures *flow metrics around* AI PRs; it does not score the codebase itself for AI-receptive areas. Their "AI Code Review Metrics Dashboard" tracks AI tool performance post-deployment, not where to point a tool pre-deployment. **Threat:** medium — they have the data to build "AI-substitutable work" scoring, but their product DNA is process analytics (cycle time, WIP, etc.), not codebase analytics.

#### Swarmia
Engineering effectiveness platform anchored in DORA/SPACE, plus an "AI assistants" view that tracks Copilot/Cursor/Claude Code adoption-vs-license and per-team trends [source 19]. **Acknowledged weakness (from third-party analysis):** "Swarmia tracks metadata such as PR cycle times and commit volumes but cannot distinguish AI-generated code from human-authored code" [source 19]. **Threat:** low — they have explicitly chosen not to do codebase-level analysis.

#### Jellyfish
**The most directly competitive product in Tier C.** Jellyfish ships dedicated dashboards for GitHub Copilot, Cursor, and Claude Code, plus a "Jellyfish AI Impact" cross-tool product that measures adoption, usage, spend, and outcomes (speed/quality/productivity) [source 20]. It compares Copilot users vs non-users on cycle time and throughput. **Weakness vs our pitch:** Jellyfish measures *people* (cohorts of devs), not *code* (regions of the codebase). It cannot tell you "this 4k-line legacy auth module is where Codex will save 80 hours" — its grain is org-chart, not file-system. **Threat:** medium-high. Of all Tier C vendors, Jellyfish has the most explicit "measure AI ROI" positioning and could pivot to codebase-grain analysis.

#### Sleuth
DORA + AI-agent governance platform — "the control plane that manages what agents know, where they run, and what they are allowed to do" [source 23]. Deployment-frequency focused; the 2026 pivot is toward AI-agent runtime visibility (cost attribution per skill) [source 23]. **Weakness vs our pitch:** deploy-side, not source-side. **Threat:** low.

#### DX (Atlassian)
**Acquired by Atlassian for $1B in November 2025** and integrated alongside Bitbucket/Compass/Rovo Dev [source 24]. DX's AI Measurement Framework tracks utilization, impact, cost across 400+ companies — found industry-wide AI adoption at 93% with average 3.9 hrs/week saved per developer, but only 5–15% throughput gain at the organizational level [source 24]. DX/Cursor integration measures impact directly; Dropbox case study showed Cursor users merge 20% more PRs/week [source 24]. April 2026: Atlassian launched "DX Fabric" as the evolution of Compass [source 24]. **Distinctive feature:** the most rigorous research-grade AI ROI measurement methodology in the market. **Weakness vs our pitch:** DX measures cohort-level impact post-adoption (and via developer surveys + activity metrics), not where in the codebase to target. **Threat:** medium-high — Atlassian now controls Bitbucket + DX + Compass + Rovo Dev (their AI assistant); they have all the pieces to build a "where to point Rovo Dev" recommendation, and they already have the buyer relationship that we'd need to win.

---

## 4. Positioning Gaps and Wedges for Codex Usage Analyzer

1. **The "pre-purchase diagnostic" moment is genuinely uncovered.** Every analytics tool measures AI *after* the seats are bought. Buyers want a defensible "expected ROI" report *before* signing the seat agreement. This is the highest-conviction wedge.
2. **AI-vendor-specific recommendations.** CodeScene scores hotspots vendor-agnostically. Our deliverable says "this function takes Codex ~3 minutes, saves you ~90 minutes of human time" — concrete, comparable, defensible. Pick Codex first and be the reference implementation; add Copilot/Cursor/Claude Code later as comparators.
3. **Before/after Codex diffs as proof.** Only Sourcery currently ships visible diffs at scale. A report that *runs Codex against the top 10 candidates and shows the diff* is dramatically more convincing than a scorecard. Cost is real (compute + Codex API calls) but the demo-value is enormous.
4. **Test-coverage gaps as a Codex-shaped opportunity.** AI is provably good at unit-test generation (multiple 2026 reports confirm 72% of teams using AI for test generation [source 26]). Our report ranks untested files by ROI-to-test, sized in hours. CodeScene/Codacy show coverage gaps; nobody frames them as "Codex deliverable."
5. **Repetitive-pattern detection as the third pillar.** Boilerplate (CRUD endpoints, validation, DTO mapping, repeated migration patterns) is where Codex saves the most measurable time. Static analyzers detect "duplicate code" but don't frame it as "Codex can generate 14 similar handlers — est. 6 hrs."
6. **Buyer persona is engineering managers / VPs, not ICs.** Most competitors sell to ICs (Cursor, Cody, Continue) or to platform teams (Snyk, Codacy). The pre-purchase justification report sells to the person with the seat-license budget. Different funnel, different content, different distribution.
7. **One-shot consulting-style deliverable, not a SaaS subscription.** A single PDF/HTML report at the start of a Codex deal is a *natural sales-enablement asset* — OpenAI could even white-label this for their enterprise team. Pricing model could be per-repo scan ($X per Mloc) rather than per-seat SaaS.
8. **Honest where it's already covered:** CodeScene's hotspot detection is mature and well-marketed; the static-analysis primitives we'd reuse (complexity, churn) are commodity. Our wedge is the *AI-translation layer*, not the analysis layer. Don't pretend we invented hotspot detection.
9. **Honest where buyers will push back:** "How do you know Codex actually takes 3 minutes / saves 90 minutes?" — we will need calibration data (small benchmark of human vs Codex on representative tasks per language) to defend the estimates. Without this the report is hand-waving.
10. **Distribution wedge: integrate at the GitHub App / GitLab integration layer**, scan once, deliver report via email/PDF. No IDE plugin, no daily-active-user funnel — short feedback loop, low friction. Most competitors require IDE installation; we don't.

---

## 5. Threat Assessment — Who Copies This in 6 Months?

**1. OpenAI itself (Codex team).** Highest threat. OpenAI's 2026 Analytics dashboard for Codex Enterprise [source 13] is one step away from "Opportunity Finder." They have the model, the telemetry, and the strongest commercial incentive (closing enterprise deals). If they ship a first-party version, every "should we buy Codex?" report we sell becomes redundant. *Mitigation:* sell multi-vendor comparison reports (Codex vs Copilot vs Claude Code) — OpenAI will never ship that; remain useful as an independent buyer's advocate.

**2. CodeScene.** Highest *product-level* threat. They already have the deepest hotspot/complexity/churn analytics in the industry [source 6][source 21] and have begun adding AI-refactor suggestions. Wrapping a Codex/Copilot integration around the existing hotspot model is a 1-quarter ship for them. *Mitigation:* be sharper on AI-vendor-specific time estimation and before/after diffs — CodeScene's heritage is vendor-neutral.

**3. Sourcegraph.** Owns codebase indexing (Code Search) + AI assistant (Cody) under one SKU [source 1]. Adding a "Cody opportunity report" is a natural cross-sell. They also have Code Insights, which already trends code-health metrics. *Mitigation:* our wedge is buyer-justification at *pre-Sourcegraph-purchase* moment; Sourcegraph's customers have already bought, so we are upstream of them in the funnel.

**Honorable mentions (lower probability but watchable):**
- **Jellyfish** — already measures Copilot/Cursor/Claude Code adoption; adding codebase-side analysis is a real strategy shift.
- **Greptile** — has the code-graph primitive; current focus is PR review and pricing-controversy fallout.
- **Augment Code** — $227M raised, indexes 500k files; an "opportunity scan" report is a natural top-of-funnel acquisition lever.
- **Atlassian (DX + Bitbucket + Rovo Dev)** — strongest distribution but slowest org; an "opportunity report" feature is plausible in 12+ months.

---

## 6. Sources / Bibliography

1. Sourcegraph Cody pricing & feature page (2026) — https://sourcegraph.com/pricing ; WeavAI Cody 2026 review — https://weavai.app/blog/en/2026/04/30/sourcegraph-cody-review-2026-enterprise-ai-at-59-mo/ ; CostBench Cody pricing — https://costbench.com/software/ai-coding-assistants/sourcegraph-cody/
2. Greptile pricing & v4 — https://www.greptile.com/pricing ; https://www.greptile.com/blog/greptile-v4 ; Agent-Wars commentary on per-review pricing change (May 2026) — https://www.agent-wars.com/news/2026-05-01-greptile-per-review-pricing ; CostBench Greptile — https://costbench.com/software/ai-code-review/greptile/
3. Augment Code pricing — https://www.augmentcode.com/pricing ; pricing-change post (Oct 2025) — https://www.augmentcode.com/blog/augment-codes-pricing-is-changing ; CheckThat pricing — https://checkthat.ai/brands/augment-code/pricing
4. Codacy pricing — https://www.codacy.com/pricing ; Vendr Codacy — https://www.vendr.com/marketplace/codacy ; product page — https://www.codacy.com/
5. (reserved — Codacy committer pricing notes covered in [22])
6. CodeScene product & blog — https://codescene.com/product/behavioral-code-analysis ; https://codescene.com/pricing ; Bumpy-Road complexity post — https://codescene.com/blog/bumpy-road-code-complexity-in-context/
7. Sourcery pricing & product — https://www.sourcery.ai/pricing/ ; https://www.sourcery.ai/ ; DEV review — https://dev.to/rahulxsingh/sourcery-ai-review-worth-it-for-python-developers-42je
8. AppMap product + Runtime Code Review — https://appmap.io/ ; The New Stack coverage — https://thenewstack.io/appmap-releases-runtime-code-review-as-a-github-action/ ; AppMap docs — https://appmap.io/docs/reference/guides/using-appmap-diagrams.html
9. Snyk Code / DeepCode — https://snyk.io/platform/deepcode-ai/ ; Snyk plans — https://snyk.io/plans/ ; 2026 guide — https://aitoolsdevpro.com/ai-tools/snyk-guide/
10. GitHub Copilot Metrics GA changelog (Feb 27 2026) — https://github.blog/changelog/2026-02-27-copilot-metrics-is-now-generally-available/ ; org-level dashboard preview — https://github.blog/changelog/2026-02-20-organization-level-copilot-usage-metrics-dashboard-available-in-public-preview/ ; docs — https://docs.github.com/en/copilot/concepts/copilot-usage-metrics/copilot-metrics
11. Cursor analytics docs — https://cursor.com/docs/account/teams/analytics ; May 2026 changelog — https://cursor.com/changelog/05-04-26 ; Enterprise admin write-up — https://pondero.ai/coding/guides/cursor-enterprise-admin-controls-may-2026/
12. Windsurf enterprise — https://windsurf.com/enterprise ; analytics docs — https://docs.windsurf.com/windsurf/accounts/analytics ; Windsurf statistics 2026 — https://www.getpanto.ai/blog/windsurf-ai-ide-statistics
13. OpenAI Codex changelog — https://developers.openai.com/codex/changelog ; Codex IDE — https://developers.openai.com/codex/ide ; Codex pricing — https://developers.openai.com/codex/pricing ; Codex GA announcement — https://openai.com/index/codex-now-generally-available/
14. Continue.dev pricing — https://www.continue.dev/pricing ; hub governance — https://docs.continue.dev/hub/governance/pricing
15. Tabnine pricing — https://www.tabnine.com/pricing/ ; CostBench Tabnine — https://costbench.com/software/ai-coding-assistants/tabnine/ ; WeavAI Tabnine review — https://weavai.app/blog/en/2026/04/24/tabnine-2026-review-privacy-first-enterprise-ai-guide/
16. Replit effort-based pricing — https://blog.replit.com/effort-based-pricing ; Replit pricing — https://replit.com/pricing ; 2026 review — https://serenitiesai.com/articles/replit-agent-2026-features-pricing-review
17. Devin pricing — https://devin.ai/pricing/ ; Devin 2.0 price cut (VentureBeat) — https://venturebeat.com/programming-development/devin-2-0-is-here-cognition-slashes-price-of-ai-software-engineer-to-20-per-month-from-500 ; Cognition $25B valuation talks (SiliconANGLE, April 2026) — https://siliconangle.com/2026/04/23/cognition-creator-ai-software-engineer-devin-talks-raise-hundreds-millions-25b-valuation/
18. LinearB 2026 benchmarks — https://linearb.io/resources/2026-benchmarks-roundtable ; AI code review metrics — https://linearb.io/blog/ai-code-review-metrics ; ByteIota analysis — https://byteiota.com/ai-prs-wait-4-6x-longer-linearb-2026-benchmarks/
19. Swarmia AI-tools page — https://help.swarmia.com/measure-the-productivity-impact-of-ai-tools ; product — https://www.swarmia.com/ ; third-party critique — https://blog.exceeds.ai/swarmia-alternative-ai-code-2026/
20. Jellyfish Copilot Dashboard — https://jellyfish.co/platform/jellyfish-copilot/ ; AI Impact — https://jellyfish.co/platform/jellyfish-ai-impact/ ; Claude Code Dashboard — https://jellyfish.co/platform/claude-code-dashboard/ ; 2026 State of Eng Mgmt — https://jellyfish.co/2026-state-of-engineering-management/
21. CodeScene pricing tiers — https://codescene.com/pricing ; G2 reviews — https://www.g2.com/products/codescene/reviews ; Capterra — https://www.capterra.com/p/193379/CodeScene/pricing/
22. Codacy per-committer pricing — https://www.vendr.com/marketplace/codacy ; SpotSaaS — https://www.spotsaas.com/product/codacy/pricing
23. Sleuth — https://www.sleuth.io/ ; Sleuth Metrics — https://www.sleuth.io/metrics/ ; G2 — https://www.g2.com/products/sleuth/reviews
24. DX product — https://getdx.com/ ; DX measure-AI post — https://getdx.com/blog/measure-ai-impact/ ; ICONIQ on Atlassian-DX acquisition — https://www.iconiq.com/growth/insights/dx-joins-atlassian-powering-developer-intelligence-for-the-ai-era ; Faros analysis — https://www.faros.ai/blog/atlassian-dx-acquisition-developer-productivity-strategy ; DX/Cursor integration — https://getdx.com/blog/dx-releases-integration-with-cursor/
25. Cyclomatic complexity & hotspot refactoring context — https://codescene.com/blog/bumpy-road-code-complexity-in-context/ ; Augment Code on reducing CC — https://www.augmentcode.com/learn/how-to-reduce-cyclomatic-complexity ; TheLinuxCode 2026 CC guide — https://thelinuxcode.com/cyclomatic-complexity-in-2026-how-i-measure-branching-risk-and-keep-code-testable/
26. AI test coverage / gap detection — https://tenjinonline.com/blog/ai-in-test-automation/ai-detects-test-coverage-gaps/ ; BrowserStack AI test coverage — https://www.browserstack.com/guide/ai-test-case-management ; AccelQ test coverage tools 2026 — https://www.accelq.com/blog/test-coverage-tools/

---

### Notes on uncertainty
- CodeScene's exact 2026 pricing ($20–$30/active author/mo) is reconstructed from secondary aggregators; the official pricing page requires a quote for upper tiers and the published rates may be stale.
- Codacy per-committer rates ($15–$25) vary materially with negotiated volume discounts (Vendr reports 20–35% lower for 50+ committers) and should be treated as a range.
- Cognition's Devin enterprise pricing is opaque beyond the $20/$500 self-serve tiers; ACU consumption can easily make Enterprise spend exceed those numbers by an order of magnitude.
- Greptile's per-review pricing (March 2026) is the subject of active developer backlash and may be revised again — re-check before any GTM positioning that references it.
- OpenAI Codex's first-party analytics surface is documented in the changelog but the underlying detail of how granular the dashboard goes is not public — there could be a private "opportunity finder" feature in development we cannot see.
