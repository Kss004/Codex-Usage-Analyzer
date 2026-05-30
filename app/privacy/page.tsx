import Link from 'next/link';

export const metadata = {
  title: 'Privacy — Codex Usage Analyzer',
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto w-full max-w-2xl flex-1 px-6 py-12">
      <Link href="/" className="text-sm text-muted-foreground underline underline-offset-2">
        ← Back
      </Link>
      <h1 className="mt-6 text-2xl font-bold tracking-tight">Privacy</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Plain-English summary of how Codex Usage Analyzer handles your code.
      </p>

      <div className="mt-8 space-y-6 text-sm leading-relaxed">
        <section className="space-y-2">
          <h2 className="font-semibold">What we do with your code</h2>
          <ul className="list-inside list-disc space-y-1 text-muted-foreground">
            <li>
              When you run a scan or audit, the code you submit is sent to the OpenAI API to
              generate the analysis. That is the only place it goes.
            </li>
            <li>
              We do not store your code on our servers. It lives in the request, is analyzed,
              and the response is streamed back to your browser.
            </li>
            <li>
              We do not run, execute, or compile your code. It is read as text only.
            </li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="font-semibold">OpenAI&apos;s handling</h2>
          <ul className="list-inside list-disc space-y-1 text-muted-foreground">
            <li>
              Per OpenAI&apos;s API data policy, data submitted through the API is{' '}
              <strong>not used to train</strong> their models.
            </li>
            <li>
              OpenAI may retain API inputs/outputs for a limited window for abuse monitoring,
              then deletes them. See OpenAI&apos;s API data usage policy for current terms.
            </li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="font-semibold">What we collect</h2>
          <ul className="list-inside list-disc space-y-1 text-muted-foreground">
            <li>No accounts, no login, no cookies beyond what Vercel sets for hosting.</li>
            <li>Aggregate, anonymous usage metrics (page views, latency) via Vercel.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="font-semibold">Your responsibility</h2>
          <p className="text-muted-foreground">
            Don&apos;t paste secrets, credentials, or code you&apos;re not authorized to share
            with a third-party API. This is a hackathon prototype, not an enterprise-grade
            service — treat it accordingly.
          </p>
        </section>
      </div>
    </div>
  );
}
