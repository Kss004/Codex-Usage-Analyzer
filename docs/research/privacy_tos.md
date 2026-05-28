# Privacy & Terms of Service — Defensible Posture

> Status: drafted 2026-05-26 from research synthesis. Updated as OpenAI policy + the NYT preservation order + our SOC 2 work evolve. All citations current as of May 2026.

Audience: founder, an enterprise procurement reviewer at a Persona 5 account, an OpenAI judge in Q&A who asks "what happens to the user's code?"

## 1. OpenAI API Terms — what the product is allowed to do

The product takes user-submitted source code, POSTs it to the OpenAI API (`gpt-5-mini` for Quick Scan, `gpt-5` for Deep Audit), and renders the streamed result. Three relevant policy surfaces:

- **Usage Policies.** OpenAI's usage policies [1] prohibit categories (CSAM, weapons, election manipulation, etc.) but place no restriction on submitting third-party source code provided the user owns or has the right to submit it. Refactor / analysis is a permitted developer use case.
- **Business Terms / Services Agreement (effective January 1, 2026).** [2] Customers retain ownership of inputs and outputs. OpenAI does not train on API customer data by default — this has been the API default since March 1, 2023, and is reaffirmed in the current Services Agreement and the Enterprise Privacy page [3][4]. Opt-in to training is explicit (e.g., Playground feedback).
- **Data Processing Addendum.** [5] Available for customers with EU/UK data subjects; we'll need to execute one once we have customers in those jurisdictions and are processing PII (the *user's* PII, not their code). For MVP — where we don't have logins and don't store inputs — the DPA exposure is low but should still be auto-signed in the signup flow once we add auth.

**Net.** There is no ToS-level barrier to building this product on the OpenAI API. The only contract-level decisions left to us are (a) whether we ever opt in to data sharing (we don't), and (b) whether we apply for Zero Data Retention (deferred — see §2).

**Uncertain.** OpenAI's policy pages are revised quarterly. Our compliance posture must be reread on a 90-day cadence; a stale ToS snapshot is one of the few ways a hostile reviewer could catch us flat-footed.

## 2. Data residency & retention — what OpenAI keeps by default

The default-retention story has gotten *worse* for end-users in 2025 and *clarified* for B2B:

- **API abuse-monitoring logs default to 30 days.** [6] This includes prompts and completions. After 30 days they are deleted unless legally required to be kept.
- **Zero Data Retention (ZDR) is gated.** [7][8] Not a self-serve toggle. Eligible enterprise accounts apply via sales; supported endpoints are listed in OpenAI enterprise docs. Once enabled, ZDR removes the 30-day window — data is processed in memory only.
- **Modified Abuse Monitoring (MAM)** is a middle tier — abuse logs exclude customer content but retain metadata. Available on a similar approval basis.
- **NYT preservation order — critical context.** [9] In May 2025 a magistrate judge ordered OpenAI to retain *all consumer ChatGPT* output logs indefinitely as evidence in the NYT v. OpenAI copyright case. OpenAI appealed; the order was affirmed June 26, 2025; partially rolled back September 26, 2025 (no new preservation going forward for consumer chats); 20M de-identified chat logs were ordered produced November 2025. **API customers were not subject to this order — only consumer ChatGPT logs.** This distinction matters: we are an API customer, not a consumer, and the 30-day default applies to our calls. We should communicate this distinction explicitly in our privacy disclosure (see §6) because users have read alarming headlines about it.
- **Data residency.** [10][11] As of Jan 16, 2026, OpenAI offers at-rest residency in the US, Canada, EU, UK, Japan, South Korea, Singapore, India, Australia, UAE, and in-region GPU inference in the US/EU for ChatGPT Enterprise / Edu / Healthcare. For our MVP API calls, residency defaults to US unless we configure otherwise — relevant when we go after EU Persona 5 accounts.

**Net for MVP.** We sit on the API default: 30-day abuse log retention, no training, US processing. ZDR/MAM are deferred until we have an enterprise customer whose contract demands it (i.e., Phase 3 of `[[gtm]]`). At that point, applying for ZDR is a one-week task gated entirely by sales-team approval, not engineering.

**Uncertain.** Whether ZDR will continue to be available on the specific endpoints we use (`responses` / `chat.completions` with streaming) for a brand-new $100-MRR customer. Realistically: OpenAI gates ZDR on annual spend, not endpoint compatibility. We may need a sponsoring Persona 5 customer to underwrite our application.

## 3. What we can credibly promise users in MVP

The defensible headline:

**"Your code is sent to OpenAI for analysis. OpenAI does not use API data to train its models. We do not store your code on our servers beyond the duration of your session."**

What we **can** say without lying:

- "We do not train any model on your code." (True — we don't fine-tune anything, and OpenAI doesn't train on API submissions by default.) [3][4]
- "OpenAI retains API inputs for up to 30 days for abuse monitoring, then deletes them." (True per [6]; cite the policy.)
- "We do not log, store, or persist your code on our infrastructure." (True given the architecture in `[[architecture]]` — no DB, inputs hashed, Vercel Runtime Cache keyed on `sha256(input)` with 1-hour TTL, no Blob storage in MVP except for zip uploads >1MB which we don't ship in MVP.)
- "Your code is not shared with any third party other than OpenAI for the purpose of running the analysis you requested." (True.)

What we **cannot** say (and shouldn't):

- "Your code never leaves our servers." (False — it goes to OpenAI.)
- "Your code is fully private." (Misleading — see 30-day abuse log retention.)
- "We use the OpenAI Codex agent." (Strictly false — we use the GPT-5 model family via the API. In UI marketing copy we can say "powered by the same OpenAI models as Codex" or similar; we should **not** claim we're invoking Codex the product.) Note: `[[product_spec]]` flags this — keep the disclosure honest.

## 4. Code copyright / IP — is there any legal risk to us?

Short answer: no, with three caveats.

- **The user owns their input.** We have no claim to the source code they paste. Our ToS will explicitly disclaim any ownership interest.
- **The user owns their outputs (the refactor diff), subject to OpenAI's terms.** OpenAI's Services Agreement [2] assigns output ownership to the customer where allowed by law. We pass that through. **However:** US Copyright Office guidance (Jan 2025) and the D.C. Circuit affirmation (March 2025) [12] hold that purely AI-generated work is not copyrightable absent human authorship contribution. Practical implication: if a user takes our Deep Audit diff *as-is* and ships it, the diff itself may not be independently copyrightable, but they retain copyright in the *combined* work where they've contributed expressive judgment (selecting, editing, integrating). This is the user's problem to manage, not ours; we should mention it in a one-line ToS clause.
- **Submitting code we don't have rights to.** The user warrants they have the right to submit the code. We're not in the policing business — same posture as any code analysis tool (Sourcery, Codacy, CodeScene). The risk vector is a user pasting a proprietary leaked codebase; we mitigate by (a) requiring affirmative consent on the input form, (b) not persisting inputs, (c) reserving the right in ToS to refuse processing of obviously misappropriated material.

**Uncertain.** Whether a malicious user could try to use our service to "launder" copyrighted code by getting GPT-5 to refactor it. This is theoretical; we are nowhere near a target for this kind of behavior at MVP scale.

## 5. Enterprise-grade story for Persona 5

Tied to the GTM sequencing in `[[gtm]]` (Phase 3, months 9–18) and the pricing gates in `[[pricing]]`:

- **Months 1–2:** SSO via WorkOS or Clerk. Both ship SAML + SCIM out of the box; integration is a 1–2 week build.
- **Months 2–4:** SOC 2 Type II observation period begins via Vanta or Drata. Cost: ~$10–15K including auditor. We can claim "SOC 2 Type II observation in progress" in sales conversations from Month 3.
- **Months 4–6:** ZDR application to OpenAI (requires existing enterprise customer to underwrite the request, or sufficient API spend — likely $20K+/year). On-prem / VPC deploy option as a one-off engagement.
- **Months 6–9:** SOC 2 Type II attestation completes. Enterprise contracts open. White-label option (the report PDF is co-brandable).
- **Months 9+:** ISO 27001 if a customer demands it. HIPAA out of scope — we don't process PHI.

**OpenAI piggyback.** Our compliance story benefits from OpenAI's own: SOC 2 Type II, ISO 27001:2022, ISO 27017/27018/27701, CSA STAR Level 1 are all current as of the latest Trust Portal report (Jan 1 – Jun 30, 2025) [13][14]. We can — accurately — tell an enterprise reviewer that the model we send their code to is operated under those controls. Our own SOC 2 covers the application layer; OpenAI's covers the model layer.

**Uncertain.** Whether Persona 5 reviewers will accept the bifurcated story ("our app is SOC 2, OpenAI is separately SOC 2") or whether they'll demand single-vendor attestation. The latter would require us to be a reseller of OpenAI services with a unified compliance posture — a much heavier lift. The hedge is to qualify Persona 5 prospects on whether they already use OpenAI directly; if they do, the bifurcated story is fine.

## 6. Required surfaces in MVP

We do not write the privacy policy or ToS here — that's a legal-template task (use Termly, Iubenda, or the Vercel-recommended Privacy Pal template). We *do* enumerate the bullets the policies must contain:

**Privacy policy must include:**

1. What data we collect: pasted code, IP address (transient), session ID (browser-only).
2. What data we *don't* collect: name, email, account (MVP has no signup).
3. Third parties: OpenAI (data processor), Vercel (hosting), Vercel Speed Insights (analytics, no PII).
4. Retention: code hashed and cached for ≤1 hour for performance; not persisted otherwise. OpenAI retains for ≤30 days for abuse monitoring per their policy [6].
5. Training: we do not train models. OpenAI does not train on our API submissions per their policy [3].
6. Cookies / local storage: session-only.
7. User rights: GDPR/CCPA — request deletion (trivial since we don't store anything user-identifiable in MVP).
8. Contact: a `privacy@` email.
9. Effective date + version + revision policy.

**Terms of Service must include:**

1. User warrants ownership of submitted code or right to submit.
2. We disclaim ownership of submitted code and refactored output.
3. AI-generated refactor outputs may not be independently copyrightable (cite USCO guidance) — user is responsible for downstream use.
4. We disclaim liability for incorrect, incomplete, or harmful refactor suggestions. **The output is advisory; the user is responsible for code they ship.** Standard "as-is, no warranty" language.
5. Rate limits + acceptable use (no abuse of Deep Audit endpoint).
6. Indemnification for misuse.
7. Governing law (Delaware default unless we incorporate elsewhere).
8. Right to refuse service for clearly misappropriated material.

**In-product disclosures (load-bearing UX surface):**

- On the input form (Paste / Zip / GitHub URL), a one-line above the submit button: **"Your code is sent to OpenAI for analysis. We don't store it. OpenAI doesn't train on it. Learn more →"** linking to a `/privacy` page.
- On the audit-result page, a footer disclaimer: **"Refactor suggestions are AI-generated and advisory. Review before merging."**
- An explicit "Don't paste secrets" warning on the paste input — pre-emptive guardrail against the most common foot-shooting incident.

**Not required, but recommended:**

- A public `SECURITY.md` and `/security` page listing our subprocessors (OpenAI, Vercel) and SOC 2 status. This is what enterprise reviewers Ctrl-F for first.

---

## Bibliography

1. OpenAI Usage Policies. https://openai.com/policies/usage-policies/
2. OpenAI Services Agreement (effective Jan 1, 2026). https://openai.com/policies/services-agreement/
3. OpenAI Enterprise Privacy. https://openai.com/enterprise-privacy/
4. OpenAI Business Data Privacy, Security, and Compliance. https://openai.com/business-data/
5. OpenAI Data Processing Addendum. https://openai.com/policies/data-processing-addendum/
6. OpenAI Platform — Data Controls in the OpenAI Platform. https://developers.openai.com/api/docs/guides/your-data
7. OpenAI Help Center — Zero Data Retention. https://help.openai.com/en/articles/5722486-how-your-data-is-used-to-improve-model-performance
8. OpenAI Developer Community — ZDR Information. https://community.openai.com/t/zero-data-retention-information/702540
9. OpenAI — Response to NYT Data Demands. https://openai.com/index/response-to-nyt-data-demands/ (see also affirmation June 26 2025; partial rollback Sep 26 2025; 20M log production order Nov 12 2025)
10. OpenAI — Introducing Data Residency in Europe / Asia. https://openai.com/index/introducing-data-residency-in-europe/ and https://openai.com/index/introducing-data-residency-in-asia/
11. OpenAI — Expanding Data Residency Access to Business Customers Worldwide (Jan 16, 2026). https://openai.com/index/expanding-data-residency-access-to-business-customers-worldwide/
12. US Copyright Office — Copyright and AI. https://www.copyright.gov/ai/ and Library of Congress CRS LSB10922. https://www.congress.gov/crs-product/LSB10922
13. OpenAI Trust Portal. https://trust.openai.com/
14. OpenAI Security and Privacy. https://openai.com/security-and-privacy/
