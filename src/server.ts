import { CommonEngine } from '@angular/ssr/node';
import bootstrap from './main.server';
import { APP_BASE_HREF } from '@angular/common';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const browserDistFolder = resolve(__dirname, '../browser');
const indexHtml = join(__dirname, 'index.server.html');

const commonEngine = new CommonEngine();

export async function netlifyCommonEngineHandler(request: Request) {
  const url = request.url;

  return await commonEngine.render({
    bootstrap,
    documentFilePath: indexHtml,
    url,
    publicPath: browserDistFolder,
    providers: [{ provide: APP_BASE_HREF, useValue: '/' }],
  });
}
