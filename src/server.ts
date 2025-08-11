import { CommonEngine } from '@angular/ssr/node';
import { render } from '@netlify/angular-runtime/common-engine.mjs';

const commonEngine = new CommonEngine();

export async function netlifyCommonEngineHandler(
  request: Request,
  context: any,
): Promise<Response> {
  return await render(commonEngine);
}
