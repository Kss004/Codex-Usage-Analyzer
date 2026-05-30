import { describe, expect, test } from 'bun:test';
import { isCodeFile, parseRepoUrl } from '@/lib/code-files';

describe('isCodeFile', () => {
  test('accepts common source extensions', () => {
    for (const p of ['a.ts', 'b/c.tsx', 'main.py', 'x.go', 'Foo.java', 'q.rs']) {
      expect(isCodeFile(p)).toBe(true);
    }
  });

  test('rejects non-code extensions', () => {
    for (const p of ['README.md', 'logo.png', 'data.json', 'styles.css', 'noext']) {
      expect(isCodeFile(p)).toBe(false);
    }
  });

  test('rejects directory entries', () => {
    expect(isCodeFile('src/')).toBe(false);
  });

  test('skips vendored / build / test dirs', () => {
    expect(isCodeFile('node_modules/foo/index.js')).toBe(false);
    expect(isCodeFile('dist/bundle.js')).toBe(false);
    expect(isCodeFile('src/__tests__/foo.ts')).toBe(false);
    expect(isCodeFile('app/foo.test.ts')).toBe(false);
  });
});

describe('parseRepoUrl', () => {
  test('parses a standard repo URL', () => {
    expect(parseRepoUrl('https://github.com/owner/repo')).toEqual({ owner: 'owner', repo: 'repo' });
  });

  test('strips trailing .git', () => {
    expect(parseRepoUrl('https://github.com/owner/repo.git')).toEqual({
      owner: 'owner',
      repo: 'repo',
    });
  });

  test('ignores extra path segments (tree/blob)', () => {
    expect(parseRepoUrl('https://github.com/owner/repo/tree/main/src')).toEqual({
      owner: 'owner',
      repo: 'repo',
    });
  });

  test('accepts www.github.com', () => {
    expect(parseRepoUrl('https://www.github.com/a/b')).toEqual({ owner: 'a', repo: 'b' });
  });

  test('trims whitespace', () => {
    expect(parseRepoUrl('  https://github.com/a/b  ')).toEqual({ owner: 'a', repo: 'b' });
  });

  test('rejects non-github hosts', () => {
    expect(parseRepoUrl('https://gitlab.com/a/b')).toBeNull();
    expect(parseRepoUrl('https://evil.com/github.com/a/b')).toBeNull();
  });

  test('rejects URLs without owner/repo', () => {
    expect(parseRepoUrl('https://github.com/justowner')).toBeNull();
    expect(parseRepoUrl('https://github.com/')).toBeNull();
  });

  test('rejects garbage', () => {
    expect(parseRepoUrl('not a url')).toBeNull();
    expect(parseRepoUrl('')).toBeNull();
  });
});
