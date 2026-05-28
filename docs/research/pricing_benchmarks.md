# AI Coding Tools — Pricing Benchmarks (May 2026)

**Purpose:** Where the Codex Usage Analyzer should land on the price curve. Comprehensive snapshot of every notable AI coding assistant and code-quality tool's per-seat pricing as of May 2026.

---

## Master Pricing Table

All prices USD unless noted. Monthly-equivalent shown; "ann" = annual billing rate. Usage-based notes inline. Free tiers explicit.

| Tool | Free Tier | Individual / Pro | Team / Business | Enterprise | Usage-Based Component | Source |
|---|---|---|---|---|---|---|
| **OpenAI Codex (via ChatGPT)** | Yes (limited Codex) | **Plus $20/mo**; **Go $8/mo**; **Pro $100/mo (5×)** or **$200/mo (20×)** | **Business** pay-as-you-go (~$20–25/seat/mo) | Enterprise: custom | Token-aligned credits since Apr 2, 2026 (e.g. GPT-5.5: 125 credits/1M input, 750/1M output) | [1][2] |
| **OpenAI Codex CLI (open source)** | Free binary; needs paid plan or API key for models | — | — | — | Pay-per-token via API | [3] |
| **GitHub Copilot** | **Free** tier (limited) | **Pro $10/mo** (incl $10 AI credits); **Pro+ $39/mo** (incl $39 credits) | **Business $19/user/mo** (incl $19 credits) | **Enterprise $39/user/mo** | Moving to usage-based billing Jun 1, 2026 — all plans include monthly AI Credit allotment matching seat price | [4][5][6] |
| **Cursor** | **Hobby Free** | **Pro $20/mo**; **Pro+** higher tier; **Ultra** highest individual | **Teams/Business $40/user/mo** | Enterprise: custom (negotiable >100 seats) | Credit/token-based consumption; high spenders report >1T tokens/yr | [7][8] |
| **Windsurf (Codeium)** | **Free** ($0): unlimited Tab autocomplete, light Cascade quota | **Pro $20/mo** (raised from $15 on Mar 19, 2026); **Max $200/mo** | **Teams $40/user/mo** (up to 200 seats) | Enterprise: custom (SSO, RBAC, hybrid deploy) | Switched from credits → daily/weekly quotas Mar 19, 2026; annual saves 17–20% | [9][10] |
| **Sourcegraph Cody / Amp** | **Amp** is currently free (replaces discontinued Cody Free/Pro) | (Cody Free & Pro discontinued Jul 23, 2025) | — | **Cody Enterprise $59/user/mo** (some sources cite $49) | — | [11][12] |
| **Tabnine** | **Basic Free** | **Dev/Pro $12/user/mo** | — | **Enterprise $39/user/mo**; **Agentic $59/user/mo** | Median customer spend: $23,400/yr | [13][14] |
| **Greptile** (AI code review) | Free for qualified OSS; pre-Series-A discounts | — | **$30/seat/mo** incl. 50 reviews; **$1/review** thereafter (changed Mar 2026) | Custom (annual/multi-year) | Per-review overage | [15][16] |
| **Augment Code** | — | **Indie $20/mo** (40k credits); **Developer $50/mo** (600 messages) | **Standard $60/mo** up to 20 users (130k credits); **Max $200/mo** up to 20 users (450k credits) | Custom (required >20 users) | Credit pool; effective per-seat very low for large teams | [17][18] |
| **Codacy** (code quality) | Free tier (open source) | — | **~$15–25/committer/mo** annual; Pro pricing scales with seats | Custom | Per-committer seat-based | [19] |
| **CodeScene** (behavioral code analysis) | Free trial | — | **~$20–30/seat/mo** (3 tiers) | Custom | Per-seat | [20] |
| **Continue.dev** (open source) | **$0 forever** (Solo) — fully OSS; supports any LLM (OpenAI, Anthropic, Gemini, Ollama, LM Studio) | $0/dev/mo | Continue Hub paid tier (team features) | Custom | None core; user pays own model provider | [21] |
| **Replit Core / Pro / Enterprise** | **Starter Free** | **Core $20/mo** (was $25; includes $20 of credits, up to 5 collaborators) | **Pro $100/mo** for teams up to 15 (Turbo Mode, priority); | Enterprise: custom | Effort-based credits (AI + deployments + compute) | [22][23] |
| **Devin (Cognition Labs)** | — | **Core $20/mo** + $2.25/ACU (1 ACU ≈ 15 min Devin work; $20 ≈ 9 ACUs) | **Team $500/mo** (250 ACUs incl., ACUs at $2 each) | Enterprise: custom (VPC, custom Devins) | Heavily ACU-driven; cost balloons with usage | [24][25] |

---

## OpenAI Codex Pro Deep-Dive

The hackathon prize is **OpenAI Codex Pro**, valued around ₹1.2L/year ≈ **$1,440/year ≈ $120/mo equivalent**. This sits between the **ChatGPT Pro 5× tier ($100/mo = $1,200/yr)** and the **Pro 20× tier ($200/mo = $2,400/yr)** [1][2]. The prize signals OpenAI is willing to pay ~$1.2k–$2.4k per developer to seed daily-driver Codex usage among India hackathon winners — a strong signal that ChatGPT Pro is now positioned as a *power-developer subscription*, not a generic AI subscription.

### What Codex Pro ($100–$200/mo) actually includes

From the official OpenAI Codex pricing page [1]:

- **Surfaces:** Codex on the web, CLI (open-source), IDE extension (VS Code etc.), iOS, plus cloud integrations (automatic code review on GitHub, Slack integration).
- **Models:** GPT-5.5, GPT-5.4, GPT-5.3-Codex (latest reasoning + agentic), GPT-5.4-mini for routine tasks, plus GPT-5.3-Codex-Spark research preview.
- **Rate limits (5× tier @ $100):** 80–400 local messages per 5-hour window depending on model.
- **Rate limits (20× tier @ $200):** 300–1,600 local messages per 5-hour window.
- **Cloud tasks:** Codex can spawn autonomous cloud-VM tasks (longer-running agentic work). 5× and 20× tiers get proportional cloud capacity.
- **Promotional sweetener (current):** Double Codex usage on the $100/mo Pro tier through May 31, 2026 — effectively 10× Plus.
- **Everything in Plus:** All ChatGPT consumer features (Deep Research, Advanced Voice, image gen, memory, etc.).

### What Codex Pro *signals* about the market

1. **The $100 price floor for "serious" AI coding has been set.** This is 5× a Copilot Pro seat ($10) and 5× a Cursor Pro seat ($20). OpenAI is openly creating an upmarket developer tier where Copilot Business and Cursor Teams play.
2. **The agentic/cloud-task workload is the moat.** Codex Pro's value-add over Plus is *not* better autocomplete — it's the ability to run autonomous cloud Codex jobs. This is where Devin ($500/mo Team) and Replit Pro ($100/mo) also concentrate value.
3. **Token-aligned billing kills "predictable monthly cost".** April 2, 2026's switch to API-token-aligned credit accounting means power users pay closer to true model-inference cost. The "I tried it, the bill scared me" complaint pattern (see *codex_pain.md* Pain 6 & 12) is structural.
4. **India price parity:** ChatGPT Pro lists at **Rs. 10,699/mo incl. GST** in India [26] ≈ $128/mo at current FX — strongly suggesting the hackathon prize value of ~₹1.2L/yr is one year of the *Indian-localized Pro tier*. (Indian pricing is ~20–30% below US sticker due to GST-bundled localization.)

---

## Pricing Implications for the Codex Usage Analyzer

### The competitive landscape, in three layers

**Layer 1 — Free + ubiquitous (anchors what users won't pay).** GitHub Copilot Free, Cursor Hobby, Windsurf Free, Continue.dev, Sourcegraph Amp. These set the expectation that *any* AI assistant is approachable at $0.

**Layer 2 — Mid-market ($10–$40/seat).** Copilot Pro ($10), Tabnine Pro ($12), Cursor Pro ($20), Codex Plus ($20), Windsurf Pro ($20), Replit Core ($20), Augment Indie ($20), Greptile ($30), Codacy ($15–25), CodeScene ($20–30), Copilot Business ($19), Copilot Enterprise & Tabnine Enterprise ($39), Cursor Teams ($40), Windsurf Teams ($40). This is the densest segment — most products land here.

**Layer 3 — Premium / agentic ($59–$500).** Cody Enterprise ($59), Tabnine Agentic ($59), Codex Pro ($100–$200), Replit Pro ($100), Augment Max ($200), Windsurf Max ($200), Devin Team ($500). These are *outcomes* — autonomous agents, long-running tasks, enterprise security.

### Where the Codex Usage Analyzer should land

The Analyzer is **not** another assistant — it's a *meta-product*. This means we don't compete on per-seat assistant pricing; we compete on per-repo or per-engagement value. Three viable wedges:

**Option A — Repo audit, one-time fee.** $499–$1,999 per audit. Output: a 20–40 page report + a JSON manifest of high-leverage Codex targets. Pitch: "1× the cost of a Copilot Enterprise seat for one year, get the map." Closest analog: a code-quality consulting engagement. Good for hackathon demo because the "one-shot" feels demo-able.

**Option B — Per-seat companion to Codex.** $5–$10/seat/mo, billed alongside Codex Pro / Copilot / Cursor. Pitch: "Spending $19–$200/seat on Codex? Spend 10% more to know where to point it." This is the *insurance / amplifier* play. Lands at the low end of Layer 2.

**Option C — Per-repo SaaS, usage-tiered.** $99/mo for a single repo, $499/mo for up to 10 repos, custom for enterprise. Pitch: scans on every commit, surfaces drift in Codex-targetable surface area, integrates with PR review (recovering the 91–441% PR review tax flagged in DORA 2025). Lands between Greptile ($30 + per-review) and Codacy/CodeScene ($15–30/seat).

### Recommended wedge for the hackathon

**Hybrid: Option A as the demo, Option C as the business model.** The demo runs as a one-shot audit (clear narrative, instant ROI artifact), but the slide deck pitches the recurring per-repo SaaS at **$99/repo/mo (small team) → $499/repo/mo (enterprise)**. This is:

- **Below** Greptile's $30/seat (because we sell per-repo not per-seat, the math works out cheaper for any team >3 engineers).
- **Below** Codex Pro's $100/mo (Codex Pro is per-developer; we're per-repo, so for a 10-eng team on Codex our overhead is ~10% of total spend).
- **Above** the perceived "$0 OSS tool" floor — we're decisively a paid product but cheap enough to bypass procurement.

A **free OSS scanner (basic complexity/duplication metrics, no Codex targeting / no ROI quantification)** could anchor the funnel — clone the Continue.dev / Codacy free-tier playbook.

### Net-net

We sit on top of the entire Layer 2/3 stack. Every seat sold on Copilot, Codex, Cursor, Windsurf is a downstream buyer of the Analyzer. Our pricing should be calibrated to be **~5–15% of customers' aggregate AI coding spend** — a tax that's easy to approve because the ROI math is on the same invoice line as the Codex/Copilot bill.

---

# Sources

[1] OpenAI Developers, *Pricing — Codex*, 2026. https://developers.openai.com/codex/pricing
[2] OpenAI, *ChatGPT Plans — Free, Go, Plus, Pro, Business, Enterprise*. https://chatgpt.com/pricing/
[3] OpenAI Developers, *Codex for Open Source*. https://developers.openai.com/community/codex-for-oss
[4] GitHub Docs, *Plans for GitHub Copilot*. https://docs.github.com/en/copilot/get-started/plans
[5] GitHub, *Plans & pricing — Copilot*. https://github.com/features/copilot/plans
[6] GitHub Blog, *GitHub Copilot is moving to usage-based billing*. https://github.blog/news-insights/company-news/github-copilot-is-moving-to-usage-based-billing/
[7] Cursor, *Pricing*. https://cursor.com/pricing
[8] Vantage, *Cursor Pricing Explained 2026*. https://www.vantage.sh/blog/cursor-pricing-explained
[9] CloudZero, *Windsurf Pricing in 2026: Plans, Quotas, And More*. https://www.cloudzero.com/blog/windsurf-pricing/
[10] Verdent Guides, *Windsurf Pricing 2026: Plans, Quotas & What Changed*. https://www.verdent.ai/guides/windsurf-pricing-2026
[11] Sourcegraph, *Pricing*. https://sourcegraph.com/pricing
[12] Sourcegraph Blog, *Changes to Cody Free, Pro, and Enterprise Starter plans*. https://sourcegraph.com/blog/changes-to-cody-free-pro-and-enterprise-starter-plans
[13] Tabnine, *Plans & Pricing*. https://www.tabnine.com/pricing/
[14] CostBench, *Tabnine Pricing 2026: 3 Plans from Free–$39/user/month*. https://costbench.com/software/ai-coding-assistants/tabnine/
[15] Greptile, *Pricing*. https://www.greptile.com/pricing
[16] Agent Wars, *Greptile Now Charges Per Review*, May 2026. https://www.agent-wars.com/news/2026-05-01-greptile-per-review-pricing
[17] Augment Code, *Pricing — Plans for Teams and Enterprise*. https://www.augmentcode.com/pricing
[18] Augment Code Blog, *Augment Code's pricing is changing on October 20, 2025*. https://www.augmentcode.com/blog/augment-codes-pricing-is-changing
[19] Codacy, *Pricing*. https://www.codacy.com/pricing
[20] CodeScene, *Pricing*. https://codescene.com/pricing
[21] Continue.dev, *Pricing*. https://www.continue.dev/pricing
[22] Replit, *Pricing*. https://replit.com/pricing
[23] Replit Blog, *Replit Pro Is Here — and Core Now Offers Even Better Value*. https://blog.replit.com/pro-plan
[24] Devin (Cognition), *Pricing*. https://devin.ai/pricing/
[25] VentureBeat, *Devin 2.0 is here: Cognition slashes price of AI software engineer to $20 per month from $500*. https://venturebeat.com/programming-development/devin-2-0-is-here-cognition-slashes-price-of-ai-software-engineer-to-20-per-month-from-500
[26] FoneArena, *OpenAI rolls out new ChatGPT Pro plan with Codex, Deep Research support* (India pricing: Rs. 10,699/mo). https://www.fonearena.com/blog/479743/openai-chatgpt-pro-plan-price.html
