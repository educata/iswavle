import * as path from 'path';
import { existsSync, rmSync } from 'fs';
import { runBuild } from './runner';
import {
  SITEMAP_HOOK,
  ROUTES_TEXT_HOOK,
  CONTENT_HOOK,
  EXERCISE_HOOK,
  EXAMPLES_HOOK,
} from '../hooks';
import { SRC_CONTENT_PATH } from '../consts';

async function main(baseDir: string): Promise<void> {
  const startTime = Date.now();
  console.log('🚀 Starting prerender process...');
  await runBuild(baseDir, [
    ROUTES_TEXT_HOOK(),
    SITEMAP_HOOK(),
    EXERCISE_HOOK(),
    EXAMPLES_HOOK(),
    CONTENT_HOOK(),
  ]);
  console.log(`✅ Prerender process completed successfully`);
  console.log(`🕒 Prerender process took ${(Date.now() - startTime) / 1000}s`);
  if (existsSync('.temp')) {
    rmSync('.temp', { recursive: true });
    console.log(`🗑️  Temporary files cleaned up`);
  }
}

main(SRC_CONTENT_PATH).catch(console.error);
