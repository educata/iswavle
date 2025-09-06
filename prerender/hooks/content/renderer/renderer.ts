import { Renderer } from 'marked';
import { codeRenderer } from './code';
import { headingRenderer } from './heading';
import { tableRenderer } from './table';
import { paragraphRenderer } from './paragraph';

export function configureRenderer(renderer: Renderer) {
  renderer.code = codeRenderer;
  renderer.table = tableRenderer;
  renderer.heading = headingRenderer;
  renderer.paragraph = paragraphRenderer;
}
