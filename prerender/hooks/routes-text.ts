import { resolve } from 'path';
import { writeFileSync } from 'fs';

import { BuildHook, FileMeta } from '@global-shared/interfaces';
import { ensureDir } from '../helpers';

function pushRoute(path: string, seen: Set<string>, routes: string[]): void {
  if (seen.has(path)) return;
  seen.add(path);
  routes.push(path);
}

const OUT_PATH = resolve('src', 'routes.txt');

export const ROUTES_TEXT_HOOK = (): BuildHook => {
  const seen = new Set<string>();
  const routes: string[] = [];

  pushRoute('/', seen, routes);
  pushRoute('/exercises', seen, routes);

  return {
    name: 'routes-text',
    onStart: async () => {
      console.log('📰 Routes text generation started');
    },
    onFile: async (meta: FileMeta, content: string) => {
      const normalizedPath = meta.path.replace(/\\/g, '/');
      if (
        (meta.name === 'guides.md' || meta.name === 'references.md') &&
        meta.category === '.'
      ) {
        const section = meta.name.replace('.md', '');
        pushRoute(`/doc/${section}`, seen, routes);
      } else if (meta.category === 'guides' && meta.extension === 'md') {
        const routePart = normalizedPath
          .replace('guides/', '')
          .replace(/\.md$/i, '');
        const route = '/doc/guides/' + routePart;
        pushRoute(route, seen, routes);
      } else if (meta.category === 'references' && meta.extension === 'md') {
        const routePart = normalizedPath
          .replace('references/', '')
          .replace(/\.md$/i, '');
        const route = '/doc/references/' + routePart;
        pushRoute(route, seen, routes);
      } else if (meta.category === 'exercises' && meta.extension === 'md') {
        const pathParts = normalizedPath.split('/');

        if (pathParts.length > 1) {
          const exerciseSlug = pathParts[1];

          const fileName = pathParts[pathParts.length - 1];
          if (['description.md', 'index.md', 'README.md'].includes(fileName)) {
            pushRoute(`/exercises/${exerciseSlug}`, seen, routes);
          }
        }
      }
    },
    onEnd: async () => {
      ensureDir(OUT_PATH);
      writeFileSync(OUT_PATH, routes.join('\n') + '\n', 'utf-8');
      console.log(
        `✅ Routes text generated with ${routes.length} routes at ${OUT_PATH}`,
      );
    },
    onError: async (error) => {
      console.error('❌ Error occurred during routes text generation:', error);
    },
  };
};
