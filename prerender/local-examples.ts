import * as fs from 'fs';
import { EXAMPLES_OUTPUT_DIR_PATH, EXAMPLES_SRC_PATH } from './consts/path';

if (!fs.existsSync(EXAMPLES_OUTPUT_DIR_PATH)) {
  fs.mkdirSync(EXAMPLES_OUTPUT_DIR_PATH);
}

fs.cpSync(EXAMPLES_SRC_PATH, EXAMPLES_OUTPUT_DIR_PATH, { recursive: true });
