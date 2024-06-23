import * as fs from 'fs';
import * as path from 'path';
import { Renderer, marked } from 'marked';
import { ArticleAttributes, ArticleToc } from '@global-shared/interfaces';
import frontMatter from 'front-matter';
import hljs from 'highlight.js';
import { docsWalkTokens } from './docs-walk-tokens.mts';

const srcContentDir = './src/content';
const srcAssetsDir = './src/assets';

type srcSectionDirType = 'guides' | 'references';

const srcSectionsDirs: srcSectionDirType[] = ['guides', 'references'];

const hyperLinks: {
  guides: string[];
  references: string[];
} = {
  guides: [],
  references: [],
};

const dataMap: { [key: string]: { title: string; content: string } } = {};

const codesArray: string[] = [];

const render = new Renderer();

render.code = (code, language) => {
  if (language === 'mermaid') {
    return code;
  }

  const validLang = !!(language && hljs.getLanguage(language));

  const highlighted = validLang
    ? hljs.highlight(code, { language }).value
    : code;

  codesArray.push(code);

  return `<div class="code-wrapper"><div class="language-header"><span>${language?.toUpperCase()}</span><button><svg width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M208 0H332.1c12.7 0 24.9 5.1 33.9 14.1l67.9 67.9c9 9 14.1 21.2 14.1 33.9V336c0 26.5-21.5 48-48 48H208c-26.5 0-48-21.5-48-48V48c0-26.5 21.5-48 48-48zM48 128h80v64H64V448H256V416h64v48c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V176c0-26.5 21.5-48 48-48z" /></svg></button></div><pre><code class="hljs ${language}">${highlighted}</code></pre></div>`;
};

render.heading = (text: string, level: number, raw: string) => {
  return `
    <h${level} id="${raw.trim().split(' ').join('_')}">${text}</h${level}>
  `;
};

render.table = (header: string, body: string) => {
  return `<div class="table-wrapper"><table><thead>${header}</thead><tbody>${body}</tbody></table></div>`;
};

render.paragraph = (text) => {
  if (text.startsWith(':::') && text.endsWith(':::')) {
    return registerCustomBlocks(text);
  }

  return `<p>${text}</p>`;
};

marked.use({
  renderer: render,
  async: true,
  walkTokens: docsWalkTokens,
});

function registerCustomBlocks(text: string) {
  const block = text.split('\n')[0].replace(':::', '') || '';

  switch (block.toLocaleLowerCase()) {
    case 'success': {
      return `<div class="note ant-alert ant-alert-success">${text.slice(11, -4)}</div>`;
    }
    case 'warning': {
      return `<div class="note ant-alert ant-alert-warning">${text.slice(11, -4)}</div>`;
    }
    case 'error': {
      return `<div class="note ant-alert ant-alert-error">${text.slice(9, -4)}</div>`;
    }
    case 'info': {
      return `<div class="note ant-alert ant-alert-info">${text.slice(8, -4)}</div>`;
    }
    case '': {
      return `<div class="note ant-alert ant-alert-info">${text.slice(4, -4)}</div>`;
    }
  }

  return text;
}

function extractHeaders(htmlString: string): ArticleToc[] {
  const result: ArticleToc[] = [];

  htmlString
    .split('\n')
    .filter((text) => text.trim().startsWith('<h'))
    .forEach((heading) => {
      if (heading.search('id="') === -1) {
        return;
      }
      if (heading.includes('1') || heading.includes('2')) {
        result.push({
          id: heading.split('id="')[1].split('"')[0],
          title: heading.split('>')[1].split('<')[0],
        });
      } else {
        if (!result[result.length - 1].sub) {
          result[result.length - 1].sub = [];
        }
        result[result.length - 1].sub?.push({
          id: heading.split('id="')[1].split('"')[0],
          title: heading.split('>')[1].split('<')[0],
        });
      }
    });

  return result;
}

async function renderMarkdownFile(filePath: string) {
  const markdown = fs.readFileSync(filePath, 'utf8');
  const parsedMarkdown = await marked.parse(
    markdown.replace(/^---$.*^---$/ms, ''),
  );
  const data = frontMatter<ArticleAttributes>(markdown);
  if (data?.attributes) {
    data.attributes.toc = extractHeaders(parsedMarkdown);
  }
  return {
    content: parsedMarkdown,
    frontMatter: data.attributes,
  };
}

function createOutputDirectoryStructure(filePath: string) {
  const relativePath = path.relative(srcContentDir, filePath);
  const outputPath = path.join(srcAssetsDir, relativePath);

  const outputDir = path.dirname(outputPath);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  return outputPath;
}

function appendFileToHyperLinkList(data: string) {
  const hrefRegex = /href="([^"#]*)"/g;
  const hrefs = [];
  let match: any;

  while ((match = hrefRegex.exec(data)) !== null) {
    if (srcSectionsDirs.find((section) => match[1].search(section) >= 0)) {
      hrefs.push(match[1]);
    }
  }

  if (hrefs.length >= 1) {
    hrefs.forEach((href) => {
      const section = href.split('/')[1] as srcSectionDirType;
      if (hyperLinks[section] && !hyperLinks[section].includes(href)) {
        hyperLinks[section].push(href.slice(3 + section.length));
      }
    });
  }
}

async function processMarkdownFiles(directory: string) {
  const dir = fs.readdirSync(directory);
  const promises = dir.map(async (file) => {
    const filePath = path.join(directory, file);
    if (fs.statSync(filePath).isDirectory()) {
      await processMarkdownFiles(filePath);
    } else if (file.endsWith('.md')) {
      codesArray.splice(0);
      const outputPath = createOutputDirectoryStructure(filePath);
      const data = await renderMarkdownFile(filePath);
      appendFileToHyperLinkList(data.content);

      fs.writeFileSync(
        outputPath.replace('.md', '.html'),
        data.content,
        'utf-8',
      );

      dataMap[normalizePath(outputPath)] = {
        title: data.frontMatter.title,
        content: removePreAndHtmlTags(data.content),
      };

      data.frontMatter.codes = codesArray;

      fs.writeFileSync(
        outputPath.replace('.md', '.json'),
        JSON.stringify(data.frontMatter),
        'utf-8',
      );
    }
  });
  await Promise.all(promises);
}

function removePreAndHtmlTags(content: string) {
  return content
    .replace(/<pre>.*?<\/pre>/gs, '')
    .replace(/<\/?[^>]*>/g, '')
    .replace(/<[^>]*data-search-ignore[^>]*>[^<]*<\/[^>]*>/gim, '')
    .replaceAll('\n', ' ');
}

function normalizePath(path: string): string {
  return path
    .replaceAll('\\', '/')
    .replaceAll('src/assets', 'doc')
    .replaceAll('.md', '');
}

function createFileFromConnetion() {
  hyperLinks.guides = hyperLinks.guides.filter(
    (href) => !fs.existsSync(`src/content/guides/${href}.md`),
  );

  hyperLinks.references = hyperLinks.references.filter(
    (href) => !fs.existsSync(`src/content/references/${href}.md`),
  );

  hyperLinks.references = [...new Set(hyperLinks.references)];
  hyperLinks.guides = [...new Set(hyperLinks.guides)];

  const data = JSON.stringify({
    guides: hyperLinks.guides,
    references: hyperLinks.references,
  });

  fs.writeFileSync('src/assets/empty-hyperlinks.json', data, 'utf-8');

  fs.writeFileSync(
    'src/assets/index-map.json',
    JSON.stringify(dataMap),
    'utf-8',
  );

  let count = 0;

  for (const section in hyperLinks) {
    count += hyperLinks[section as srcSectionDirType].length;
  }

  console.log(`Created empty hyperlinks file, missing ${count} hyperlinks.`);
}

async function main() {
  await processMarkdownFiles(srcContentDir);
  createFileFromConnetion();
  console.log(
    `Markdown files have been prerendered and saved in the ${srcAssetsDir} directory.`,
  );
}

main();
