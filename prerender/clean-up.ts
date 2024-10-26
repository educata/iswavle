import fs, { existsSync } from 'fs';

if (existsSync('.temp')) {
  fs.rmSync('.temp', { recursive: true });
}
