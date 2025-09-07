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
import {
  createOutputDirectoryStructure,
  normalizePath,
  removePreAndHtmlTags,
  renderMarkdownFile,
} from '../../helpers';
import { SRC_ASSET_PATH, SRC_CONTENT_PATH } from '../../consts';

const CONTENT_CATEGORIES: Category[] = ['guides', 'references'];

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
      console.log('📰 Content prerender started');
    },
    onFile: async (meta: FileMeta, content: string) => {
      if (
        !CONTENT_CATEGORIES.includes(meta.category) ||
        meta.extension !== 'md'
      ) {
        return;
      }

      const outputPath = createOutputDirectoryStructure(
        path.join(SRC_ASSET_PATH, meta.path),
      );
      const data = await renderMarkdownFile<ArticleAttributes>(content);
      data.frontMatter.toc = extractHeaders(data.content);
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
        (href) =>
          !fs.existsSync(path.join(SRC_CONTENT_PATH, `guides/${href}.md`)),
      );
      hyperLinks.references = hyperLinks.references.filter(
        (href) =>
          !fs.existsSync(path.join(SRC_CONTENT_PATH, `references/${href}.md`)),
      );
      hyperLinks.references = [...new Set(hyperLinks.references)];
      hyperLinks.guides = [...new Set(hyperLinks.guides)];
      const data = JSON.stringify({
        guides: hyperLinks.guides,
        references: hyperLinks.references,
      });
      fs.writeFileSync(
        path.join(SRC_ASSET_PATH, 'empty-hyperlinks.json'),
        data,
        'utf-8',
      );
      fs.writeFileSync(
        path.join(SRC_ASSET_PATH, 'index-map.json'),
        JSON.stringify(dataMap),
        'utf-8',
      );

      let missingCount = 0;

      for (const section in hyperLinks) {
        missingCount += hyperLinks[section as 'guides' | 'references'].length;
      }

      const emoji = missingCount === 0 ? '✅' : '📌';

      console.log(`✅ Prerendered ${dataMap.size} articles successfully`);
      console.log(
        `${emoji} Created empty hyperlinks file, missing ${missingCount} hyperlinks`,
      );
    },
    onError: (error) => {
      console.error('❌ Error occurred during content prerendering:', error);
    },
  };
};
