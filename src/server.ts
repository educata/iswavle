import { CommonEngine } from '@angular/ssr/node';
import { render } from '@netlify/angular-runtime/common-engine.mjs';

const commonEngine = new CommonEngine();

export async function netlifyCommonEngineHandler(
  request: Request,
  context: any,
): Promise<Response> {
  try {
    const response = await render(commonEngine);

    response.headers.set('Cache-Control', 'public, max-age=60, s-maxage=300');
    response.headers.set('Vary', 'Accept-Encoding');

    return response;
  } catch (error) {
    return new Response(
      `<!DOCTYPE html>
      <html>
      <head><title>Loading...</title></head>
      <body><script>window.location.reload();</script></body>
      </html>`,
      {
        status: 200,
        headers: {
          'Content-Type': 'text/html',
          'Cache-Control': 'no-cache',
        },
      },
    );
  }
}
