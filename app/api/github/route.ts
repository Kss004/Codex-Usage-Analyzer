import { INPUT_CAP_CHARS } from '@/lib/models';
import { isCodeFile, parseRepoUrl } from '@/lib/code-files';

export const maxDuration = 30;

function ghHeaders(): HeadersInit {
  const h: HeadersInit = { Accept: 'application/vnd.github+json' };
  if (process.env.GITHUB_TOKEN) {
    (h as Record<string, string>).Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }
  return h;
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const url = typeof body?.url === 'string' ? body.url : '';
  const parsed = parseRepoUrl(url);
  if (!parsed) {
    return Response.json({ error: 'Enter a valid github.com/owner/repo URL' }, { status: 400 });
  }
  const { owner, repo } = parsed;

  // Resolve default branch.
  const repoRes = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
    headers: ghHeaders(),
  });
  if (!repoRes.ok) {
    return Response.json(
      { error: repoRes.status === 404 ? 'Repo not found or private' : `GitHub error ${repoRes.status}` },
      { status: repoRes.status === 404 ? 404 : 502 },
    );
  }
  const repoJson = await repoRes.json();
  const branch = repoJson.default_branch ?? 'main';

  // Fetch the file tree.
  const treeRes = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/git/trees/${branch}?recursive=1`,
    { headers: ghHeaders() },
  );
  if (!treeRes.ok) {
    return Response.json({ error: `Could not read repo tree (${treeRes.status})` }, { status: 502 });
  }
  const treeJson = await treeRes.json();
  const files: Array<{ path: string; size: number }> = (treeJson.tree ?? [])
    .filter((n: { type: string; path: string; size?: number }) => n.type === 'blob' && isCodeFile(n.path))
    .sort((a: { size?: number }, b: { size?: number }) => (b.size ?? 0) - (a.size ?? 0))
    .slice(0, 12);

  if (files.length === 0) {
    return Response.json({ error: 'No source files found in repo' }, { status: 422 });
  }

  // Fetch file contents via raw.githubusercontent, concatenate up to the cap.
  let combined = '';
  const used: string[] = [];
  for (const f of files) {
    if (combined.length >= INPUT_CAP_CHARS) break;
    const rawRes = await fetch(
      `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${f.path}`,
    );
    if (!rawRes.ok) continue;
    const text = await rawRes.text();
    const block = `// FILE: ${f.path}\n${text}\n\n`;
    combined += block;
    used.push(f.path);
  }

  combined = combined.slice(0, INPUT_CAP_CHARS);
  if (!combined.trim()) {
    return Response.json({ error: 'Could not fetch file contents' }, { status: 502 });
  }

  return Response.json({ code: combined, files: used, repo: `${owner}/${repo}` });
}
