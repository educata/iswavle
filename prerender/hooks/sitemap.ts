import { resolve } from 'path';
import { writeFileSync } from 'fs';
import { exec } from 'child_process';
import { promisify } from 'util';

import { BuildHook, FileMeta } from '@global-shared/interfaces';
import { ensureDir } from '../helpers';
import { environment } from '../../src/environments/environment';

const execAsync = promisify(exec);

function toISO(date: Date): string {
  return date.toISOString().split('T')[0];
}

function dateOnlyFromIso(iso: string): string {
  return iso.split('T')[0];
}

function buildUrl(base: string, path: string): string {
  const b = base.replace(/\/?$/, '');
  const p = path.startsWith('/') ? path : `/${path}`;
  return `${b}${p}`;
}

async function gitLastModForPath(
  filePath: string,
): Promise<string | undefined> {
  try {
    const { stdout } = await execAsync(
      `git log -1 --format=%cI -- "${filePath}"`,
    );
    const out = stdout.toString().trim();
    return out ? dateOnlyFromIso(out) : undefined;
  } catch {
    return undefined;
  }
}

type ChangeFreq = 'daily' | 'weekly' | 'monthly';

type UrlEntry = {
  loc: string;
  lastmod?: string;
  priority?: number;
  changefreq?: ChangeFreq;
};

function updateUrlEntry(
  path: string,
  seen: Set<string>,
  urls: Array<UrlEntry>,
  opts: Omit<UrlEntry, 'loc'> = {},
): void {
  const loc = buildUrl(environment.baseURL, path);
  if (seen.has(loc)) return;
  seen.add(loc);
  urls.push({ loc, ...opts });
}

async function gitLastModRepo(): Promise<string | undefined> {
  try {
    const { stdout } = await execAsync('git log -1 --format=%cI');
    const out = stdout.toString().trim();
    return out ? dateOnlyFromIso(out) : undefined;
  } catch {
    return undefined;
  }
}

const PRIORITY = {
  home: 1.0,
  docs: 0.9,
  exercises: 0.8,
};

const OUT_PATH = resolve('src', 'sitemap.xml');

export const SITEMAP_HOOK = (): BuildHook => {
  const seen = new Set<string>();
  const urls: UrlEntry[] = [];
  let repoFallBack: string;

  return {
    name: 'sitemap',
    onStart: async () => {
      console.log('🌐 Sitemap generation started');
      repoFallBack = (await gitLastModRepo()) || toISO(new Date());

      updateUrlEntry('/', seen, urls, {
        priority: PRIORITY.home,
        lastmod: repoFallBack,
        changefreq: 'weekly',
      });

      updateUrlEntry('/exercises', seen, urls, {
        priority: PRIORITY.exercises,
        lastmod: repoFallBack,
        changefreq: 'weekly',
      });
    },
    onFile: async (meta: FileMeta) => {
      if (meta.extension === 'md' && meta.category === '.') {
        const lastmod =
          (await gitLastModForPath(resolve('src', 'content', meta.path))) ||
          repoFallBack;
        updateUrlEntry(`/doc/${meta.name}`, seen, urls, {
          priority: PRIORITY.docs,
          changefreq: 'monthly',
          lastmod,
        });
      } else if (meta.category === 'guides' && meta.extension === 'md') {
        const route = '/doc/guides/' + meta.subPath;
        const lastmod =
          (await gitLastModForPath(resolve('src', 'content', meta.path))) ||
          repoFallBack;
        updateUrlEntry(route, seen, urls, {
          priority: PRIORITY.docs,
          changefreq: 'monthly',
          lastmod,
        });
      } else if (meta.category === 'references' && meta.extension === 'md') {
        const route = '/doc/references/' + meta.subPath;
        const lastmod =
          (await gitLastModForPath(resolve('src', 'content', meta.path))) ||
          repoFallBack;
        updateUrlEntry(route, seen, urls, {
          priority: PRIORITY.docs,
          changefreq: 'monthly',
          lastmod,
        });
      } else if (meta.category === 'exercises' && meta.extension === 'md') {
        const pathParts = meta.path.split('/');

        if (pathParts.length > 1) {
          const exerciseSlug = pathParts[1];

          const fileName = pathParts[pathParts.length - 1];
          if (['description.md', 'index.md', 'README.md'].includes(fileName)) {
            const lastmod =
              (await gitLastModForPath(resolve('src', 'content', meta.path))) ||
              repoFallBack;
            updateUrlEntry(`/exercises/${exerciseSlug}`, seen, urls, {
              priority: PRIORITY.exercises,
              changefreq: 'monthly',
              lastmod,
            });
          }
        }
      }
    },
    onEnd: async () => {
      const xml = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
        ...urls.map((u) => {
          return [
            '  <url>',
            `    <loc>${u.loc}</loc>`,
            `    <lastmod>${u.lastmod || repoFallBack}</lastmod>`,
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
      console.log(
        `✅ Sitemap generated with ${urls.length} urls at ${OUT_PATH}`,
      );
    },
    onError: async (error) => {
      console.error('❌ Error occurred during sitemap generation:', error);
    },
  };
};
