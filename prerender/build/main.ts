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

const BASE_DIR_PATH = path.join(__dirname, '../../src/content');

async function main(baseDir: string): Promise<void> {
  const startTime = Date.now();
  console.log('🚀 Starting build process...');
  await runBuild(baseDir, [
    ROUTES_TEXT_HOOK(),
    SITEMAP_HOOK(),
    EXERCISE_HOOK(),
    EXAMPLES_HOOK(),
    CONTENT_HOOK(),
  ]);
  console.log(`✅ Build process completed successfully`);
  console.log(`🕒 Build process took ${(Date.now() - startTime) / 1000}s`);
  if (existsSync('.temp')) {
    rmSync('.temp', { recursive: true });
    console.log(`🗑️  Temporary files cleaned up`);
  }
}

main(BASE_DIR_PATH).catch(console.error);
