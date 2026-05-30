export const CODE_EXT = new Set([
  'ts', 'tsx', 'js', 'jsx', 'py', 'go', 'rs', 'java', 'rb', 'php', 'c', 'cpp', 'h', 'hpp',
  'cs', 'kt', 'swift', 'scala', 'sh', 'sql',
]);

export const SKIP_DIRS = [
  'node_modules/', 'dist/', 'build/', '.next/', 'vendor/', '.git/', '__macosx/',
  'test', 'spec', '__tests__',
];

/** True if `path` looks like a source file we should analyze. */
export function isCodeFile(path: string): boolean {
  const lower = path.toLowerCase();
  if (lower.endsWith('/')) return false;
  if (SKIP_DIRS.some((d) => lower.includes(d))) return false;
  const ext = lower.split('.').pop() ?? '';
  return CODE_EXT.has(ext);
}

/** Parse a github.com URL into { owner, repo }, or null if not a valid repo URL. */
export function parseRepoUrl(url: string): { owner: string; repo: string } | null {
  try {
    const u = new URL(url.trim());
    if (u.hostname !== 'github.com' && u.hostname !== 'www.github.com') return null;
    const parts = u.pathname.split('/').filter(Boolean);
    if (parts.length < 2) return null;
    const owner = parts[0];
    const repo = parts[1].replace(/\.git$/, '');
    if (!owner || !repo) return null;
    return { owner, repo };
  } catch {
    return null;
  }
}
