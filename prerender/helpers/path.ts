import fs from 'fs';
import path from 'path';
import { SRC_ASSET_PATH, SRC_CONTENT_PATH } from '../consts';

export function normalizePath(path: string): string {
  return path
    .replaceAll('\\', '/')
    .replaceAll('src/assets', 'doc')
    .replaceAll('.md', '');
}

export function createOutputDirectoryStructure(filePath: string) {
  const relativePath = path.relative(SRC_CONTENT_PATH, filePath);
  const outputPath = path.join(SRC_ASSET_PATH, relativePath);

  const outputDir = path.dirname(outputPath);

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  return outputPath;
}
