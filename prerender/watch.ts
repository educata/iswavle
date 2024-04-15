import * as fs from 'fs';
import * as path from 'path';
import { spawn } from 'child_process';

const renderScripts = [
  './prerender/render-content.ts',
  './prerender/render-examples.ts',
];

const srcContentDir = './src/content';

function renderContent(scriptPath: string) {
  const renderProcess = spawn('node', ['--loader', 'ts-node/esm', scriptPath], {
    stdio: 'inherit',
  });

  renderProcess.on('error', (err) => {
    console.error(`Error occurred while rendering ${scriptPath}:`, err);
  });
}

fs.watch(srcContentDir, { recursive: true }, (eventType, filename) => {
  if (filename) {
    console.log(`Detected change in ${path.join(srcContentDir, filename)}`);

    renderScripts.forEach((script) => renderContent(script));
  }
});

renderScripts.forEach((script) => renderContent(script));
