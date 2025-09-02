import * as path from 'path';

import { runBuild } from './runner';
import { SITEMAP_HOOK } from '../hooks';

const BASE_DIR_PATH = path.join(__dirname, '../../src/content');

async function main(baseDir: string): Promise<void> {
  await runBuild(baseDir, [SITEMAP_HOOK()]);
}

main(BASE_DIR_PATH).catch(console.error);
