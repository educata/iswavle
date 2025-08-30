import { existsSync, mkdirSync, readdirSync, writeFileSync } from 'fs';
import { dirname, join, relative, resolve } from 'path';

const OUT_PATH = resolve('src', 'routes.txt');

function ensureDir(filePath: string) {
  const dir = dirname(filePath);
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
}

function generate() {
  const seen = new Set<string>();
  const routes: string[] = [];

  function push(path: string) {
    if (seen.has(path)) return;
    seen.add(path);
    routes.push(path);
  }

  push('/');
  push('/exercises');

  const contentRoot = resolve('src', 'content');

  const docSections = ['guides', 'references'];
  for (const section of docSections) {
    const secDir = resolve(contentRoot, section);
    const topFile = resolve(contentRoot, `${section}.md`);

    if (existsSync(topFile)) {
      push(`/doc/${section}`);
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
        } else if (ent.isFile() && ent.name.endsWith('.md')) {
          const rel = relative(secDir, full).replace(/\\/g, '/');
          const route = '/doc/' + section + '/' + rel.replace(/\.md$/i, '');
          push(route);
        }
      }
    }
  }

  const exRoot = resolve(contentRoot, 'exercises');
  if (existsSync(exRoot)) {
    const entries = readdirSync(exRoot, { withFileTypes: true });
    for (const ent of entries) {
      if (!ent.isDirectory()) continue;
      const slug = ent.name;

      const candidates = [
        resolve(exRoot, slug, 'description.md'),
        resolve(exRoot, slug, 'index.md'),
        resolve(exRoot, slug, 'README.md'),
      ];

      if (candidates.some(existsSync)) {
        push(`/exercises/${slug}`);
      }
    }
  }

  ensureDir(OUT_PATH);
  writeFileSync(OUT_PATH, routes.join('\n') + '\n', 'utf-8');
  console.log(`Routes generated with ${routes.length} entries at ${OUT_PATH}`);
}

generate();
