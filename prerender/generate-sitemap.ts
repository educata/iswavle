import { existsSync, mkdirSync, readdirSync, writeFileSync } from 'fs';
import { dirname, join, relative, resolve } from 'path';
import { execSync } from 'child_process';

const BASE = 'https://iswavle.com';
const OUT_PATH = resolve('src', 'sitemap.xml');

const priority = {
  home: 1.0,
  docs: 0.9,
  exercises: 0.8,
};

function ensureDir(filePath: string) {
  const dir = dirname(filePath);
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
}

function toISO(date: Date) {
  return date.toISOString().split('T')[0];
}

function dateOnlyFromIso(iso: string) {
  return iso.split('T')[0];
}

function buildUrl(base: string, path: string) {
  const b = base.replace(/\/?$/, '');
  const p = path.startsWith('/') ? path : `/${path}`;
  return `${b}${p}`;
}

function gitLastModForPath(filePath: string): string | undefined {
  try {
    const out = execSync(`git log -1 --format=%cI -- "${filePath}"`, {
      stdio: ['ignore', 'pipe', 'ignore'],
    })
      .toString()
      .trim();
    return out ? dateOnlyFromIso(out) : undefined;
  } catch {
    return undefined;
  }
}

function gitLastModRepo(): string | undefined {
  try {
    const out = execSync('git log -1 --format=%cI', {
      stdio: ['ignore', 'pipe', 'ignore'],
    })
      .toString()
      .trim();
    return out ? dateOnlyFromIso(out) : undefined;
  } catch {
    return undefined;
  }
}

function generate() {
  const base = BASE;

  const seen = new Set<string>();
  const urls: Array<{
    loc: string;
    lastmod?: string;
    priority?: number;
    changefreq?: string;
  }> = [];

  function push(
    path: string,
    opts: Partial<{
      lastmod: string;
      priority: number;
      changefreq: string;
    }> = {},
  ) {
    const loc = buildUrl(base, path);
    if (seen.has(loc)) return;
    seen.add(loc);
    urls.push({ loc, ...opts });
  }

  const repoFallback = gitLastModRepo() || toISO(new Date());

  // Core routes (fallback to repo last commit)
  push('/', { priority: 1.0, changefreq: 'weekly', lastmod: repoFallback });
  push('/exercises', {
    priority: 0.8,
    changefreq: 'weekly',
    lastmod: repoFallback,
  });

  // Discover docs and exercises by scanning built assets
  const assetsRoot = resolve('src', 'assets');

  // Docs: guides and references .html files map to /doc/<relative>
  const docSections = ['guides', 'references'];
  for (const section of docSections) {
    const secDir = resolve(assetsRoot, section);
    const topFile = resolve(assetsRoot, `${section}.html`);
    if (existsSync(topFile)) {
      const lastmod = gitLastModForPath(topFile) || repoFallback;
      push(`/doc/${section}`, {
        priority: priority.docs,
        changefreq: 'monthly',
        lastmod,
      });
    }
    if (!existsSync(secDir)) continue;

    const stack: string[] = [secDir];
    while (stack.length) {
      const dir = stack.pop()!;
      const entries = readdirSync(dir, { withFileTypes: true });
      for (const ent of entries) {
        const full = resolve(dir, ent.name);
        if (ent.isDirectory()) {
          stack.push(full);
        } else if (ent.isFile() && ent.name.endsWith('.html')) {
          const rel = relative(assetsRoot, full).replace(/\\/g, '/');
          const route = '/doc/' + rel.replace(/\.html$/i, '');
          const lastmod = gitLastModForPath(full) || repoFallback;
          push(route, {
            priority: priority.docs,
            changefreq: 'monthly',
            lastmod,
          });
        }
      }
    }
  }

  // Exercises: each folder with description.html -> /exercises/<slug>
  const exRoot = resolve(assetsRoot, 'exercises');
  if (existsSync(exRoot)) {
    const entries = readdirSync(exRoot, { withFileTypes: true });
    for (const ent of entries) {
      if (!ent.isDirectory()) continue;
      const slug = ent.name;
      const desc = resolve(exRoot, slug, 'description.html');
      if (existsSync(desc)) {
        const lastmod = gitLastModForPath(desc) || repoFallback;
        push(`/exercises/${slug}`, {
          priority: priority.exercises,
          changefreq: 'monthly',
          lastmod,
        });
      }
    }
  }

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls.map((u) => {
      return [
        '  <url>',
        `    <loc>${u.loc}</loc>`,
        `    <lastmod>${u.lastmod || repoFallback}</lastmod>`,
        u.changefreq
          ? `    <changefreq>${u.changefreq}</changefreq>`
          : undefined,
        u.priority != null
          ? `    <priority>${u.priority.toFixed(1)}</priority>`
          : undefined,
        '  </url>',
      ]
        .filter(Boolean)
        .join('\n');
    }),
    '</urlset>',
    '',
  ].join('\n');

  ensureDir(OUT_PATH);
  writeFileSync(OUT_PATH, xml, 'utf-8');
  console.log(`Sitemap generated with ${urls.length} urls at ${OUT_PATH}`);
}

generate();
