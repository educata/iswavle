import { existsSync, rmSync } from 'fs';

if (existsSync('.temp')) {
  rmSync('.temp', { recursive: true });
}
