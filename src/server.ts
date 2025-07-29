import {
  AngularNodeAppEngine,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { join } from 'node:path';
import { getContext } from '@netlify/angular-runtime/context';
import { createRequestHandler } from '@angular/ssr';

const browserDistFolder = join(import.meta.dirname, '../browser');

const app = express();
const angularApp = new AngularNodeAppEngine();

app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

export async function netlifyAppEngineHandler(
  request: Request,
): Promise<Response> {
  const context = getContext();
  const result = await angularApp.handle(request as any, context);
  return result || new Response('Not found', { status: 404 });
}

app.use((req, res, next) => {
  angularApp
    .handle(req)
    .then((response) =>
      response ? writeResponseToNodeResponse(response, res) : next(),
    )
    .catch(next);
});

if (isMainModule(import.meta.url)) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

export const reqHandler = createRequestHandler(netlifyAppEngineHandler);
