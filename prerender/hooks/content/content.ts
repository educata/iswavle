import * as fs from 'fs';
import * as path from 'path';
import { Renderer, marked } from 'marked';
import {
  ArticleAttributes,
  ArticleToc,
  BuildHook,
  Category,
  FileMeta,
} from '@global-shared/interfaces';
import { docsWalkTokens } from './doc-walk-tokens';
import { configureRenderer } from './renderer/renderer';
import frontMatter from 'front-matter';

const CONTENT_CATEGORIES: Category[] = ['guides', 'references'];
const SRC_ASSET_PATH = path.join(__dirname, '../../src/assets');
const SRC_CONTENT_PATH = path.join(__dirname, '../../src/content');

function extractHeaders(htmlString: string): ArticleToc[] {
  const result: ArticleToc[] = [];

  htmlString
    .split('\n')
    .filter((text) => text.trim().startsWith('<h'))
    .forEach((heading) => {
      try {
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
      } catch (error) {
        const wrongHeaderStructure = {
          id: 'error-' + Math.random().toString(36),
          title: `არასწორი სათაურების სტრუქტურა`,
        };
        result.push(wrongHeaderStructure, wrongHeaderStructure);
        console.error(`არასწორი სათაურის სტრუქტურა`, heading);
      }
    });

  return result;
}

async function renderMarkdownFile(filePath: string, markdown: string) {
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
  const relativePath = path.relative(SRC_CONTENT_PATH, filePath);
  const outputPath = path.join(SRC_ASSET_PATH, relativePath);

  const outputDir = path.dirname(outputPath);

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  return outputPath;
}

function appendFileToHyperLinkList(
  data: string,
  hyperLinks: { guides: string[]; references: string[] },
) {
  const hrefRegex = /href="([^"#]*)"/g;
  const hrefs = [];
  let match: any;

  while ((match = hrefRegex.exec(data)) !== null) {
    if (CONTENT_CATEGORIES.find((section) => match[1].search(section) >= 0)) {
      hrefs.push(match[1]);
    }
  }

  if (hrefs.length >= 1) {
    hrefs.forEach((href) => {
      const section = href?.split('/')[1] as 'guides' | 'references';
      if (hyperLinks[section] && !hyperLinks[section].includes(href)) {
        hyperLinks[section].push(href.slice(3 + section.length));
      }
    });
  }
}

function removePreAndHtmlTags(content: string) {
  return content
    .replace(/<pre>.*?<\/pre>/gs, '')
    .replace(/<(\w+)([^>]*data-search-ignore[^>]*)>([\s\S]*?)<\/\1>/gi, '')
    .replace(/<\/?[^>]*>/g, '')
    .replace(/<[^>]*data-search-ignore[^>]*\s*\/?>/gi, '')
    .replaceAll('\n', ' ');
}

function normalizePath(path: string): string {
  return path
    .replaceAll('\\', '/')
    .replaceAll('src/assets', 'doc')
    .replaceAll('.md', '');
}

export const CONTENT_HOOK = (): BuildHook => {
  const hyperLinks: {
    guides: string[];
    references: string[];
  } = {
    guides: [],
    references: [],
  };

  const dataMap = new Map<string, { title: string; content: string }>();

  const render = new Renderer();

  configureRenderer(render);

  marked.use({ renderer: render, async: true, walkTokens: docsWalkTokens });

  return {
    name: 'content',
    onStart: () => {
      console.log('📰 Content generation started');
    },
    onFile: async (meta: FileMeta, content: string) => {
      if (
        !CONTENT_CATEGORIES.includes(meta.category) ||
        meta.extension !== 'md'
      ) {
        return;
      }

      const inputPath = path.join('src/content', meta.path);
      const outputPath = createOutputDirectoryStructure(
        path.join('src/assets', meta.path),
      );
      const data = await renderMarkdownFile(inputPath, content);
      appendFileToHyperLinkList(data.content, hyperLinks);

      fs.writeFileSync(
        outputPath.replace('.md', '.html'),
        data.content,
        'utf-8',
      );

      dataMap.set(normalizePath(outputPath), {
        title: data.frontMatter.title,
        content: removePreAndHtmlTags(data.content),
      });

      fs.writeFileSync(
        outputPath.replace('.md', '.json'),
        JSON.stringify(data.frontMatter),
        'utf-8',
      );
    },
    onEnd: () => {
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

      let missingCount = 0;

      for (const section in hyperLinks) {
        missingCount += hyperLinks[section as 'guides' | 'references'].length;
      }

      const emoji = missingCount === 0 ? '✅' : '📌';

      console.log(`✅ Generated ${dataMap.size} articles successfully.`);
      console.log(
        `${emoji} Created empty hyperlinks file, missing ${missingCount} hyperlinks.`,
      );
    },
    onError: (error) => {
      console.error('❌ Error occurred during content generation:', error);
    },
  };
};
