import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine } from '@angular/ssr/node';
import { render } from '@netlify/angular-runtime/common-engine.mjs';

import bootstrap from './main.server';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import { existsSync, readFileSync } from 'node:fs';

const commonEngine = new CommonEngine();
const serverDistFolder = dirname(fileURLToPath(import.meta.url));
const browserDistFolder = resolve(serverDistFolder, '../browser');
const indexHtml = join(serverDistFolder, 'index.server.html');

export async function netlifyCommonEngineHandler(
  request: Request,
): Promise<Response> {
  const url = new URL(request.url);

  let routePath =
    url.pathname.endsWith('/') && url.pathname !== '/'
      ? url.pathname.slice(0, -1)
      : url.pathname;

  const staticFile = join(browserDistFolder, routePath, 'index.html');

  try {
    if (existsSync(staticFile)) {
      const html = readFileSync(staticFile, 'utf-8');
      return new Response(html, {
        headers: { 'Content-Type': 'text/html' },
      });
    }

    const ssrHtml = await commonEngine.render({
      bootstrap,
      documentFilePath: indexHtml,
      url: url.href,
      publicPath: browserDistFolder,
      providers: [{ provide: APP_BASE_HREF, useValue: url.pathname }],
    });

    return new Response(ssrHtml, {
      headers: { 'Content-Type': 'text/html' },
    });
  } catch (err) {
    return await render(commonEngine);
  }
}
