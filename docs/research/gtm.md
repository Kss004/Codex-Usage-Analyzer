# Go-to-Market Plan — Codex Usage Analyzer

> Status: drafted 2026-05-26. The 7-day hackathon launch is Phase 0; this is the 12-month plan that begins immediately after submission.

## Distribution thesis

Build the wedge as a free, viral artifact that lives natively on the channels where the wedge persona already hangs out. We don't buy attention; we earn it with a single shareable output: the Codex-Readiness Score + the report card. Every shared score is a free top-of-funnel touch.

## Sequenced motion

### Phase 0 — Hackathon week (May 25 – Jun 1, 2026)

**Goal:** Win a top-5 slot. Sub-goal: bank 200 newsletter signups by the time we submit.

- Ship the web app on a public Vercel URL.
- Record a 60–90s Loom: paste a real messy function → Quick Scan → Deep Audit → ROI card → Readiness Score.
- Submit the hackathon entry with the live URL + one-pager + Loom.
- Post the Loom to X with a 6-tweet thread. Tag @OpenAI, @AIBuildersIndia, @levelsio, @sahil, @marc_louvion.
- Submit to Hacker News on Friday May 29 morning (PT) — best slot for HN front-page traction.
- 5-minute "Show & Tell" in any AI Builders India Slack/Discord channels.
- Cold DM 25 indie hackers on X with a "scan your repo free" link.

### Phase 1 — Months 0–3 post-hackathon: Indie + Skeptic motion

**Goal:** 5,000 free OSS-scanner downloads + 200 Indie subs ($9/mo) + 5 Team subs ($99/mo).

**Channels by ROI rank:**

1. **Hacker News** (free, highest signal). One Show HN per major release. Topic: "Show HN: Codex Usage Analyzer — find the 1% of your repo where AI will earn its keep." Pair with a deeply technical blog post on the methodology (complexity scoring, repetition detection, what the LLM does and doesn't decide). The honesty of the framing is what wins HN.
2. **X / Twitter dev hashtags.** Build-in-public posts, ProductHunt prep, indie-hacker tooling roundups. Target accounts: @levelsio, @marc_louvion, @sahil, @paulg, @jasonwzyu. Goal: 1 viral tweet/month showing a real codebase's Readiness Score.
3. **IndieHackers + r/SaaS + r/indiehackers.** Weekly "scan your repo and post your score" thread. Memetic — the score becomes a signal in the community.
4. **ProductHunt launch.** Month 2, after we have a polished landing + 5+ public testimonials. Goal: top 3 product of the day → ~2,000 signups in 24 hours.
5. **Dev newsletters.** Sponsor or get covered in: TLDR Newsletter, Pragmatic Engineer (long shot), Hacker Newsletter, Console (devtools), CodeProject newsletter. Sponsorship cost: $1–3K per slot; targeting Indie + Team conversion.
6. **Open-source CLI.** `bunx codex-analyze .` published on npm and a small GitHub readme that ranks in search. Cheap to maintain; every install is a touch.

**Content calendar (one piece/week):**

- Week 1: "We analyzed 100 OSS repos for Codex-Readiness. Here's the distribution." (Data-driven, HN-friendly.)
- Week 2: "The 5 patterns Codex makes 10× faster — and the 5 it makes worse." (Counter-narrative to "AI is magic.")
- Week 3: "I ran Cursor on a 100K-LOC monorepo for 30 days. Here's what the scanner said before and after." (Indie-hacker case study.)
- Week 4: "Replicating METR: we found where AI actually helps and it's not where you think." (Citation bait.)
- Months 2–3: One eng-manager case study, one founder case study, one OSS-maintainer case study.

**KPIs:** OSS scanner installs (vanity), Indie subscribers ($9/mo), HN front-page hits, Twitter impressions on Readiness Score screenshots, ProductHunt upvotes.

### Phase 2 — Months 3–9: Eng manager bridge

**Goal:** 50 Team subscribers ($99–$499/repo/mo). $50–$100K ARR.

**Channels:**

1. **The Pragmatic Engineer newsletter (Gergely Orosz).** Get covered or sponsored. Audience is exactly Persona 2. Cost: $5–15K for a sponsored mention; ROI is high if message is right.
2. **LeadDev conferences + Slack.** Submit a talk: "How to defend your Copilot/Codex budget to a CFO." Networking is the conversion machine.
3. **LinkedIn (Persona 2 hangs out heavily).** Founder posts 1×/week on AI tool ROI, eng productivity, CFO conversations. Goal: 5K followers in 6 months.
4. **DX community + DX/Cursor integration content.** Persona 2 reads DX content religiously. Either partner with DX or write counter-content that cites DX's research.
5. **Cold outbound to eng managers at 5–50-dev SaaS companies.** 50 personalized emails/week, offering a free one-time scan + 30-min consult. Conversion target: 5%.
6. **Webinar series.** Monthly "Codex ROI in 30 minutes" with a live scan of an attendee's repo. Lead capture + demo.

**Content calendar:**

- Monthly: a downloadable PDF "Codex ROI Calculator for Engineering Managers." Lead magnet.
- Quarterly: a benchmark report ("State of Codex Adoption — Q3 2026") published as a GitHub repo + blog post + LinkedIn doc.

**KPIs:** Team subscribers, average ACV, sales-cycle length, ProductMarketFit signal (eng managers proactively asking for an annual prepay).

### Phase 3 — Months 9–18: Enterprise

**Goal:** 5 Enterprise contracts ($50–$250K ACV each). $500K–$1.25M ARR.

**Prerequisites (work in parallel during Phase 2):**

- SOC 2 Type II (start observation Month 4, attestation Month 9).
- SSO / SCIM via WorkOS or Clerk integration.
- On-prem / VPC deploy option as a one-off; productize after 3rd customer.
- White-label / OEM partnership conversations with OpenAI Enterprise sales, Vercel for Startups, AWS Marketplace.

**Channels:**

1. **Gartner Peer Community + analyst briefings.** Submit for AI Code Assistant Magic Quadrant — even adjacent inclusion is leverage.
2. **OEM with OpenAI Enterprise.** Pitch Codex Usage Analyzer as a sales-enablement asset for OpenAI's enterprise team. Either co-marketed or white-labeled. This is the biggest single channel.
3. **PlatformCon + DOES + LeadDev**: top-tier speaking slots on AI tooling rollouts.
4. **Persona 4 (DevRel) partnerships.** OEM licenses with Vercel, Cursor, Anthropic, Windsurf. Each DevRel relationship is a multi-customer pipeline.
5. **Account-based outbound** to Fortune 1000 platform-eng leads. 10 named accounts/month, ABM-style.

**KPIs:** Enterprise pipeline value, sales-cycle length, deal-size median, OEM deal count.

## Partnerships

Highest-leverage potential partners, in priority order:

1. **OpenAI Codex Enterprise team** — pitch as a co-branded pre-sales artifact for their enterprise reps. If we land this, it doubles as a moat (they distribute, we power).
2. **Vercel for Startups + Vercel Marketplace** — list as a marketplace integration. Vercel already pushes AI dev tooling hard.
3. **Cursor / Anthropic Claude Code / Cognition Devin** — multi-vendor positioning means we run scans framed for *their* assistants too. Carrot: more market share for them. Cost to us: a few extra prompt variants.
4. **DX / Faros / Jellyfish** — these are competitive in cohort-grain ROI but complementary in codebase-grain ROI. Possible integration where they consume our Readiness Score as a metric in their dashboards.
5. **GitHub Marketplace** — listing as a GitHub App for PR-bot integration (Phase 2 feature).
6. **AppSumo / Lifetime deals** — explicit "no" in pricing.md. Listed here to prevent later reconsideration.

## Viral mechanics

Three loops we design into the product:

1. **Score-share.** Every Quick Scan ends with a shareable card: "{repo-name} scored 73/100 for Codex-Readiness." Card image generated server-side, optimized for X/LinkedIn. Includes a CTA "Scan your repo."
2. **Public leaderboard (post-launch).** Top OSS repos ranked by Codex-Readiness. Memetic; controversial. Drives traffic.
3. **PR-bot comments (Phase 2 feature).** When the PR bot comments on a GitHub PR, the comment is publicly visible if the repo is public — every comment is a marketing impression.

## Anti-channels — what we explicitly don't do

- **Paid Google search ads** before Month 6. Keywords are too expensive vs the channels above. Reconsider after content has SEO traction.
- **TikTok / Instagram.** Audience mismatch. Persona 1 hates it, Persona 5 isn't there.
- **Booths at conferences.** Slow ROI vs speaking slots.
- **Whitepapers gated by email forms** before we have product traction. Lead-gen content needs an audience first.

## Budget envelope (first 12 months)

Bootstrap-friendly. Assumptions: solo founder + ~$30K saved from one Cohort C deal.

| Line item | Cost |
|---|---|
| OpenAI API tokens (Year 1) | $4K–$8K |
| Vercel hosting + Blob + Runtime Cache | $1.5K |
| Domain + email + transactional sending | $500 |
| Newsletter sponsorships (3–4 across year) | $10K |
| Content / design freelance (logo, landing visuals) | $3K |
| SOC 2 (Vanta or Drata + auditor) | $15K |
| Conference travel (2 talks) | $4K |
| **Total** | **~$38–$42K** |

Funding sources: revenue + Codex Pro prize (if won) + small angel checks at the $1M-ARR mark if we hit it.

## Risk mitigation in distribution

- **HN launch flops.** Backup plan: ProductHunt launch in week 6. Slower but more controllable.
- **OpenAI ships first-party.** Pivot messaging to multi-vendor comparison the day they announce.
- **Indie hackers churn fast.** Acceptable — they're our distribution, not our retention. Persona 2 is retention.
- **Persona 2 cycle slips past 6 months.** Aggressive content marketing month 4–6 to compress the cycle. Free one-shot audit as the lead magnet.

## The single most important GTM bet

**The artifact is the marketing.** Every shared Readiness Score, every screenshotted ROI card, every blog post embedding our chart of "where Codex helps vs hurts" is a free top-of-funnel impression with a built-in CTA. We invest in making the *output* of the product shareable before we invest in any other channel. If the output isn't shareable, no amount of paid acquisition will save us; if it is, every customer becomes a distribution node.
