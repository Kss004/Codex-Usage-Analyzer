# Outreach Drafts — Week 1 Post-Hackathon

> Status: drafted 2026-05-26 from research synthesis. Updated as we get responses (or non-responses) and as named DevRel/sales contacts surface from LinkedIn + warm intros.

Audience: founder, with finger on send button the day after hackathon submission. Five copy-paste-ready assets, each preceded by a one-line "why this person, why now" rationale and a 1-sentence calibration note. Send schedule at the bottom.

The framing across all five: **we built the pre-purchase artifact every Codex enterprise rep wishes they could attach to a deck.** Honest, vendor-flexible where useful, vendor-loyal where useful. No "AI for AI" word salad. Concrete number, concrete demo URL, concrete ask.

Placeholders are in `{braces}`. Replace with the live URL, Loom link, and recipient details before sending.

---

## 1 — OpenAI Enterprise / Developer Relations

**Why this person, why now.** The Codex Enterprise team is incentivized to close seats, and their biggest weapon at the procurement table is "here is what Codex would do *on your codebase*." That artifact is what we make. The cold-email window is the two weeks immediately after hackathon submission, while the demo is fresh and a Codex Pro prize signal is still live. Target: `devrel@openai.com` + named Codex Enterprise rep via LinkedIn (search "Codex Enterprise" + "Solutions Engineer" / "DevRel").

**Calibration note.** OpenAI gets thousands of cold pitches. The hook has to be the artifact itself — they should be able to click and immediately see what they'd hand to a prospect.

**Subject:** A pre-sales artifact for Codex Enterprise reps (built on the API, demo live)

**Body:**

Hi {name},

I built a tool over the AI Builders hackathon that I think the Codex Enterprise team would find useful as a pre-sales asset.

Codex Usage Analyzer takes a codebase (paste, zip, or GitHub URL) and returns a ranked, line-cited list of where Codex would save the most engineering time — high-complexity functions, repetitive patterns, test gaps — with an on-demand Deep Audit that streams a real GPT-5 refactor diff and a conservative minutes-saved estimate. Average session: under 90 seconds. Output is a Markdown / PDF report that's white-labelable.

Why this might be interesting to you: every Codex Enterprise pitch ends with a prospect asking "but will it work on *our* code?" Today the answer is a trial license. We make the answer a 90-second report your SE can run live in the room.

It's built on GPT-5 + GPT-5-mini via the API, deployed on Vercel, no fine-tuning, no proprietary data — so there's no IP entanglement. I'd love to explore whether this could be co-marketed, white-labeled for your enterprise team, or just listed as a Codex partner integration.

Live URL: {url}
60-second Loom: {loom}

Could I get 15 minutes on your calendar next week?

— {name}, {handle}

---

## 2 — Vercel for Startups / Vercel DevRel

**Why this person, why now.** We're already built on Next.js 16 + AI SDK v6 + Fluid Compute — this is a flagship case study Vercel's DevRel team can use unmodified. The AI SDK v6 launch is recent and they're hungry for streaming-streamObject demos. Target: `lee@vercel.com` (or whoever currently runs DevRel — check the latest Ship Week credits), `startups@vercel.com` for the program track. Warm intro via Next.js Discord or Vercel Marketplace partnerships team if available.

**Calibration note.** Vercel responds to volume + visual polish. Lead with the Loom, not the prose.

**Subject:** A Next.js 16 + AI SDK v6 flagship demo, looking for marketplace listing + Vercel for Startups

**Body:**

Hi {name},

Quick pitch. Codex Usage Analyzer is a web app that scans a codebase and ranks where AI coding tools would save the most time. Built entirely on the Vercel stack: Next.js 16 App Router, AI SDK v6 (`streamObject` for ranked candidates, `streamText` for streaming diffs), Fluid Compute, Runtime Cache for sub-second cache hits, Blob for zip uploads, Speed Insights for p95 latency tracking. First card streams under 3 seconds; full Deep Audit under 40 seconds.

Two asks:

1. **Vercel for Startups program** — credits would let us cover OpenAI API costs through the wedge phase (Persona 3 indie hackers and Persona 2 eng managers — both Vercel customer profiles).
2. **Marketplace + DevRel collab** — this is a clean showcase of `streamObject` + `streamText` + Fluid Compute working together. I'd happily co-author a blog post (or be the subject of one) on AI SDK v6 patterns we landed on.

Live URL: {url}
60-second Loom: {loom}
Stack details: {repo or one-pager}

Happy to ship faster on whichever of the above is more interesting.

— {name}

---

## 3 — Anthropic DevRel

**Why this person, why now.** The multi-vendor positioning angle in `[[market_research]]` and `[[gtm]]` cuts both ways: if we evaluate Codex targets, we can equally evaluate Claude Code targets. Anthropic DevRel is incentivized to support tools that make Claude Code more legible to enterprise buyers — and we are an *independent* voice doing exactly that. Target: Anthropic developer experience team contacts via LinkedIn or the Claude Discord; `claude-developer-experience@anthropic.com` if listed.

**Calibration note.** Anthropic DevRel is allergic to anyone who sounds like an OpenAI fan club. Lead with the multi-vendor framing in the first sentence.

**Subject:** Independent buyer's-advocate tool — would love to add Claude Code as a first-class target

**Body:**

Hi {name},

I built Codex Usage Analyzer for the AI Builders hackathon — a web app that scans a codebase and ranks where AI coding assistants would save the most engineering time, with a live Deep Audit that streams a real refactor diff. The current MVP frames recommendations against Codex, but the underlying ranking is vendor-agnostic. The next obvious move is adding Claude Code as a parallel target.

Why I think Anthropic would care: enterprise buyers comparing Copilot / Codex / Claude Code today have *no* independent artifact telling them which assistant would pay off on their specific codebase. We could be that artifact. Today our report says "Codex would save X minutes here" — tomorrow it can say "Claude Code would save Y minutes on this task, Codex would save X." That comparison ships better from a third party than from either vendor.

I'm interested in: API credit support to develop and benchmark the Claude Code variant, a co-marketing collab (a blog post or shared launch), and whatever direct lines into the Claude Code product team would let us calibrate the recommendations against real-world Claude Code performance.

Live URL: {url}
60-second Loom: {loom}

Could we talk for 15 minutes next week?

— {name}

---

## 4 — Pragmatic Engineer (Gergely Orosz)

**Why this person, why now.** Per `[[gtm]]`, Gergely's audience is exactly Persona 2 (eng managers, VP Eng). His content is citation-heavy and skeptic-first — which is *also* our positioning. We are not looking for a deal; we're looking for a citation or a quote or a passing mention. His response rate to cold pitches is famously low, so the email must be short, no fluff, and citation-dense. Target: via his contact form on pragmaticengineer.com or a warm intro from a previous Pragmatic Engineer guest.

**Calibration note.** Gergely will skip anything that smells like marketing. Lead with numbers, not adjectives.

**Subject:** Pre-purchase ROI tool for AI coding assistants — would love your skeptical take

**Body:**

Hi Gergely,

I've followed your AI tooling coverage closely — the Stack Overflow trust-gap data, METR's 19% slowdown, DORA's PR-review explosion. Those numbers led me to build a thing during the AI Builders hackathon:

Codex Usage Analyzer scans a codebase and returns a ranked list of where AI coding tools would actually save engineering time — line-cited, with a streaming GPT-5 refactor diff to make it visceral. The framing is deliberately anti-hype: most ROI claims for AI coding tools are downstream-of-adoption telemetry (Copilot Metrics, Cursor analytics, Jellyfish). We ship the *pre*-adoption artifact a budget-holder would want before signing seat agreements.

I'm writing because (a) you're the journalist whose skepticism would expose any thin claim in this product faster than anyone else, and (b) if it survives that skepticism, it might be the kind of pre-purchase diagnostic your readers have been asking for. I'd love a hostile review — happy to do a live demo on a codebase you choose, or send a written brief with the methodology + calibration plan.

Live URL: {url}
60-second Loom: {loom}
Methodology doc: {link to calibration.md once public}

No expectation of coverage. Genuinely interested in being wrong if I am.

— {name}

---

## 5 — Show HN Post

**Why this channel, why now.** Per `[[gtm]]`, HN is the single highest-leverage channel for Persona 1 (skeptic senior engineer) and Persona 3 (indie hacker). The Friday morning PT slot is the right one. The honest "anti-hype" framing is what wins HN — not the marketing claim, the methodology disclosure.

**Calibration note.** HN punishes hype. The title must under-promise. The first paragraph (the load-bearing one) must immediately establish that we know the trust gap is real and we're not selling a fix.

**Title:** Show HN: We built the diagnostic that tells you where Codex actually saves time (and where it doesn't)

**First paragraph (load-bearing):**

Hi HN. METR measured experienced devs as 19% slower with AI tools allowed. Stack Overflow 2025 has trust in AI coding down to 29%. GitClear says cloned code blocks rose 8× in 2024. The pattern is consistent — most developers using AI coding tools are applying them to the wrong code. We built a web app that takes the *opposite* end of the funnel: paste a codebase, get a ranked list of where AI would actually pay off (and a Deep Audit mode that streams a GPT-5 refactor with a conservative minutes-saved estimate). It's free for pasted code. We're not selling AI; we're selling a targeting layer.

**Structure of the rest:**

- **How it works** (one paragraph). GPT-5-mini ranks candidates against a 5-signal rubric (complexity, repetition, test gaps, refactor opportunity, doc gaps). GPT-5 runs the on-demand Deep Audit. Static heuristics anchor the ranking — the model justifies, not invents. Architecture link: `[[architecture]]`.
- **What's honest about the minutes-saved number** (one paragraph). We cap it (480-min max), pair every estimate with the diff that produced it so you can sanity-check, and we're publishing a calibration benchmark in week 2 (link to `[[calibration]]` once posted). Estimates are directionally honest, not audit-grade — and we say so in the UI.
- **What it explicitly doesn't do** (bullet list). No login. No persistence. No telemetry beyond Vercel Speed Insights. Doesn't run your code. Doesn't store inputs (30-day API abuse log retention applies on OpenAI's side; we don't cache beyond 1 hour for performance).
- **What we want from HN** (one paragraph). Hostile reviews. Codebases that break the ranker. Tell us when the minutes-saved number is wrong — we'll publish the dataset of corrections. We're paying $50 per accepted submission of a refactor we mis-estimated (see calibration doc).
- **Link** (URL + Loom + GitHub repo for the CLI scanner).
- **About us** (one sentence — solo founder, hackathon project, considering whether this is a real business).

**Target length:** ~300 words total in the post body. Title under 80 chars. Submit between 8:30 AM and 9:30 AM PT on a Friday for max front-page dwell.

---

## Send schedule (week 1 post-hackathon)

| Day | Asset | Channel | Why this slot |
|---|---|---|---|
| Submission day (Sun May 31) | none | — | Recovery + Loom polish; don't outreach tired. |
| Mon Jun 1 | (2) Vercel DevRel | Email + Vercel Discord | Mondays: high open-rate. Vercel team is on the lookout for AI SDK v6 demos. |
| Tue Jun 2 | (1) OpenAI Enterprise DevRel | Email + LinkedIn DM | Tuesday morning is the high-engagement slot for cold outbound to FAANG-tier orgs. |
| Wed Jun 3 | (3) Anthropic DevRel | Email + Claude Discord | Mid-week gives time for OpenAI thread to land first — establishes we're not exclusive. |
| Thu Jun 4 | (4) Pragmatic Engineer | Contact form + warm-intro ping | Gergely reads Thursday/Friday — high signal-to-noise weeks before he publishes weekend issues. |
| Fri Jun 5, 8:30 AM PT | (5) Show HN | Hacker News | Per `[[gtm]]`: Friday morning PT is the optimal front-page window. |
| Sat Jun 6 | Follow-up tweets + IndieHackers crosspost | Twitter, IH | Distribute the HN momentum. Tag @levelsio, @marc_louvion, @sahil. |
| Sun Jun 7 | Personal follow-ups + LinkedIn | LinkedIn | One personalized DM each to ~10 Persona 2 / 5 prospects from Friday HN comment threads. |

**Re-send policy.** No reply within 5 business days → one polite follow-up with a single new piece of info (e.g., HN traction screenshot). Two no-replies = drop and revisit at the 90-day mark.

**Tracking.** Each outbound email gets a tagged UTM. Open rates are vanity; only response rate and demo conversion matter. Target: 30%+ open, 10%+ reply, 1+ accepted meeting from the five named-target outbounds (1–4); HN top-25 from (5).

**What we don't do in week 1.** No ProductHunt launch (saved for month 2 per `[[gtm]]`). No paid acquisition. No press release. No general-purpose mailing list outreach. The first week is about high-leverage individual targets; volume comes later.
