# Roadmap — Codex Usage Analyzer

> Status: draft v1 (2026-05-26). Hackathon ends 2026-06-01.

## 7-day MVP cut (this week)

Strict ship order. Each line must be working end-to-end on the deployed Vercel preview before the next starts.

| Day | Date | Milestone | Done = |
|-----|------|-----------|--------|
| 1 | 05-25 | Registered | (done) |
| 2 | 05-26 | Plan + research kickoff + tech docs | Plan file, docs/research agents launched, architecture + prompts drafted |
| 3 | 05-27 | Research synthesis | All `docs/research/*.md` finalized + `market_research.md`, `why_it_works.md`, `pricing.md`, `gtm.md` written |
| 4 | 05-28 | Bootstrap + Quick Scan v1 | Next.js app live on Vercel preview, paste-code input streams 1+ candidate |
| 5 | 05-29 | Quick Scan polished + Deep Audit v1 | All cards stream, click → Deep Audit streams diff, ROI card surfaces |
| 6 | 05-30 | Depth additions + zip input | Readiness score, ROI calc, Markdown export, Skeptic Mode, zip upload working |
| 7 | 05-31 | Polish + demo | GitHub URL input (if time), landing copy, 60–90s Loom, prod deploy |
| – | 06-01 | Submit | Submission form filled, live URL + video + repo + one-pager attached |

### Day-by-day kill switches

- **Day 3 EOD**: if research not synthesized, freeze it where it is and start bootstrap. No more research after this.
- **Day 4 EOD**: if Quick Scan does not stream a candidate against a real paste, drop Deep Audit polish and brute-force the basics until it works.
- **Day 5 EOD**: if Deep Audit not working, ship Quick Scan + Readiness Score + ROI Calculator only. The two-mode story becomes "scan today, audit coming this week".
- **Day 6 EOD**: if zip upload not done, ship paste-only and pivot the demo around a real OSS function rather than a whole repo. Better to nail one mode than half-ship two.

## Week 2 (post-submission, while waiting for results)

If the build lands cleanly, the post-hackathon push is about turning the demo into a product with retention:

1. **Auth + persistence.** GitHub OAuth, save scans, share via short URL.
2. **GitHub App / PR bot.** `@codex-analyzer scan` in PRs returns a Quick Scan on the diff.
3. **Private repo support.** OAuth scope expansion.
4. **CLI (`bunx codex-analyze .`).** Local-repo analysis that opens the web dashboard or prints Markdown.
5. **Team mode v1.** Track readiness over time per repo. Neon Postgres backend.

## Month 2

1. **Repeat-pattern detector across files.** Cross-file duplication & batch refactor surface.
2. **Test-gap heatmap.** Visual + LCOV ingestion.
3. **Slack integration.** Weekly digest to a configured channel.
4. **VS Code extension.** Inline annotations.
5. **Org-wide dashboard.** Aggregate readiness across many repos for one GitHub org.

## Strategic decisions still open

- **Free vs paid tier shape.** Defer until `pricing.md` lands. Likely: free for solo + small public repos, paid above a token threshold.
- **Model lock-in.** MVP is OpenAI-only by design (it's the OpenAI hackathon). Post-hackathon decide whether to stay Codex-exclusive (sharper positioning) or open up.
- **Distribution wedge.** Likely a viral angle — "share your codebase's Codex-Readiness Score" — but confirm via `gtm.md` once research lands.

## Killers we accept

Things we will *not* try to fix this week even if a judge asks:

- Codebases larger than ~5k tokens per scan: chunking story is in `architecture.md` but the demo uses small inputs.
- Languages with no Latin script in identifiers: untested.
- Real-time collaboration: out of scope forever for this product surface.

## Anchor for hackathon submission

The judging story is consistent across all artifacts:

- **Problem:** Engineers don't know where Codex earns its keep on *their* code.
- **Solution:** Paste, see, click, watch Codex try it, leave with a number.
- **Why now:** Codex is moving from novelty to budget line item; CFOs need ROI.
- **Why us:** Meta-product approach — we sell the model by interrogating the model.
- **Moat:** Prompt + UX, not data. Replicable in 6 months by a fast competitor → speed of distribution is the actual moat.
