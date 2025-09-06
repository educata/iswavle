import { existsSync, mkdirSync } from 'fs';
import { dirname } from 'path';

export function ensureDir(filePath: string) {
  const dir = dirname(filePath);
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
}
