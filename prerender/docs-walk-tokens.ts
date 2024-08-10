import { Tokens } from 'marked';
import { run } from '@mermaid-js/mermaid-cli';
import { existsSync, readFileSync, rmSync, writeFileSync } from 'fs';

const srcAssetsDir = './src/assets';

export async function docsWalkTokens(walkToken: Tokens.Generic): Promise<void> {
  if (
    walkToken.type === 'code' &&
    (walkToken as Tokens.Code).lang === 'mermaid'
  ) {
    await handleMermaid(walkToken as Tokens.Code);
  }
}

async function handleMermaid(token: Tokens.Code) {
  const tempMermaidPath = `${srcAssetsDir}/mermaid-temp`;

  const inputPath = `${tempMermaidPath}.mmd`;
  const outputPath = `${tempMermaidPath}.svg`;

  try {
    writeFileSync(inputPath, token.text, 'utf-8');

    await run(inputPath, outputPath);

    token.text = `<div data-search-ignore class="mermaid">${readFileSync(outputPath, 'utf-8')}</div>`;

    existsSync(inputPath) && rmSync(inputPath);
    existsSync(outputPath) && rmSync(outputPath);
  } catch (error) {
    console.error('Error rendering mermaid diagram: ', error);
  }
}
