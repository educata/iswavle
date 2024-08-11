import { cpSync, existsSync, readFileSync, rmSync, writeFileSync } from 'fs';
import { Tokens } from 'marked';
import { run } from '@mermaid-js/mermaid-cli';
import path from 'path';

const srcAssetsDir = './src/assets';
const notFoundSvgPath = path.join(__dirname, 'assets', 'not-found.svg');

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

    await run(inputPath, outputPath, {
      parseMMDOptions: {
        mermaidConfig: {
          themeCSS: `
            background-color: var(--mermaid-bg-color, transparent) !important;
            margin: auto;
            display: block;
          `,
        },
      },
    });

    if (!existsSync(outputPath)) {
      cpSync(notFoundSvgPath, outputPath);
      console.warn(
        `⚠ Mermaid diagram could not be rendered, using default not-found.svg`,
      );
    }

    token.text = `<div data-search-ignore class="mermaid">${readFileSync(outputPath, 'utf-8')}</div>`;

    existsSync(inputPath) && rmSync(inputPath);
    existsSync(outputPath) && rmSync(outputPath);
  } catch (error) {
    const { message } = error as Error;
    console.error(`❌ Error while rendering mermaid: ${message}}`);
  }
}
