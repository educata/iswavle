import {
  cpSync,
  existsSync,
  mkdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from 'fs';
import { Tokens } from 'marked';
import { run } from '@mermaid-js/mermaid-cli';
import path from 'path';

const temepDir = '.temp';
const notFoundSvgPath = path.join(__dirname, 'assets', 'not-found.svg');

enum WalkTokenCodeLanguage {
  Mermaid = 'mermaid',
  Preview = 'preview',
}

export async function docsWalkTokens(walkToken: Tokens.Generic): Promise<void> {
  const walkTokenCode = walkToken as Tokens.Code;
  if (walkTokenCode.type !== 'code') {
    return;
  }
  switch (walkTokenCode.lang) {
    case WalkTokenCodeLanguage.Mermaid: {
      await handleMermaid(walkTokenCode);
      break;
    }
    case WalkTokenCodeLanguage.Preview: {
      await handlePreview(walkTokenCode);
      break;
    }
  }
}

async function handlePreview(token: Tokens.Code) {
  const text = token.text;
  token.text = `
    <div data-search-ignore class="preview-wrapper">
      <div class="preview-wrapper-header">
        <span class="preview-wrapper-header-title"></span>
      </div>
      <div class="preview-wrapper-body">
        ${text}
      </div>
    </div>
  `;
}

async function handleMermaid(token: Tokens.Code) {
  const uniqueId = generateUUID();
  const tempMermaidPath = `${temepDir}/mermaid-temp-${uniqueId}`;

  const inputPath = `${tempMermaidPath}.mmd`;
  const outputPath = `${tempMermaidPath}.svg` as `${string}.svg`;

  // TODO: move to prepare script if we need .temp in other scripts

  if (!existsSync('.temp')) {
    mkdirSync('.temp');
  }

  try {
    writeFileSync(inputPath, token.text, 'utf-8');

    await run(inputPath, outputPath, {
      parseMMDOptions: {
        mermaidConfig: {
          themeCSS: `
            background-color: var(--mermaid-bg-color, transparent) !important;
            margin: auto;
            display: block;
            g {
              rect {
                fill: var(--node-bg-color) !important;
                stroke: var(--node-border-color) !important;
              }
            }
            .nodeLabel,
            span,
            tspan,
            text {
              color: var(--node-color) !important;
              fill: var(--node-color) !important;
            }
            .legend {
              rect {
                filter: none;
                opacity: 0.7;
              }
              text {
                fill: var(--node-color) !important; // legend label text color
              }
            }
            .slice {  // e.g. text on the pie charts
              fill: var(--node-color) !important;
            }
            .flowchart-link, line { // lines
              stroke: var(--node-color) !important;
            }
            .marker,
            #statediagram-barbEnd,
            .transition,
            #arrowhead path { // arrows
              stroke: var(--node-color) !important;
              fill: var(--node-color) !important;
            }
            .cluster rect {
              stroke: var(--node-color) !important;
              fill: var(--page-background) !important;
            }
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
    console.log(`🎨 Mermaid diagram rendered successfully: ${uniqueId}`);
  } catch (error) {
    const { message } = error as Error;
    console.error(`❌ Error while rendering mermaid: ${message}}`);
    token.text = `
    <div data-search-ignore class="note ant-alert ant-alert-error">
      <img width="100" height="100" src="/assets/icons/bomb.svg" alt="Mermaid diagram not found" />
      <div class="code-wrapper">
        <div class="language-header">დიაგრამა აილეწა 😢</div>
        <pre>${message}</pre>
      </div>
    </div>
    `;
  }
}

function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
