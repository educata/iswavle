import * as fs from 'fs';

const examplesSrc = './src/content/examples';
const outputDir = './src/assets/dev';

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

fs.cpSync(examplesSrc, outputDir, { recursive: true });
