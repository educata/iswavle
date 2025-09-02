import * as path from 'path';

import { runBuild } from './runner';
import { SITEMAP_HOOK, ROUTES_TEXT_HOOK } from '../hooks';

const BASE_DIR_PATH = path.join(__dirname, '../../src/content');

async function main(baseDir: string): Promise<void> {
  const startTime = Date.now();
  console.log('🚀 Starting build process...');
  await runBuild(baseDir, [ROUTES_TEXT_HOOK(), SITEMAP_HOOK()]);
  console.log(
    `✅ Build process completed successfully in ${(Date.now() - startTime) / 1000}s`,
  );
}

main(BASE_DIR_PATH).catch(console.error);
