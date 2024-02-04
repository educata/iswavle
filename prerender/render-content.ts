import * as fs from 'fs';
import * as path from 'path';
import { Renderer, marked } from 'marked';
import frontMatter from 'front-matter';
import { ArticleAttributes, ArticleToc } from '../shared/interfaces';
import hljs from 'highlight.js';

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

const render = new Renderer();

render.code = (code, language) => {
  const validLang = !!(language && hljs.getLanguage(language));

  const highlighted = validLang
    ? hljs.highlight(code, { language }).value
    : code;

  return `<pre><code class="hljs ${language}">${highlighted}</code></pre>`;
};

render.heading = (text: string, level: number, raw: string) => {
  return `
    <h${level} id="${raw.trim().split(' ').join('_')}">${text}</h${level}>
  `;
};

marked.setOptions({ renderer: render });

function extractHeaders(htmlString: string): ArticleToc[] {
  const result: ArticleToc[] = [];

  htmlString
    .split('\n')
    .filter((text) => text.trim().startsWith('<h'))
    .forEach((heading) => {
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

function renderMarkdownFile(filePath: string) {
  const markdown = fs.readFileSync(filePath, 'utf8');
  const parsedMarkdown = marked.parse(markdown.replace(/^---$.*^---$/ms, ''));
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

function processMarkdownFiles(directory: string) {
  fs.readdirSync(directory).forEach((file) => {
    const filePath = path.join(directory, file);
    if (fs.statSync(filePath).isDirectory()) {
      processMarkdownFiles(filePath);
    } else if (file.endsWith('.md')) {
      const outputPath = createOutputDirectoryStructure(filePath);
      const data = renderMarkdownFile(filePath);
      appendFileToHyperLinkList(data.content);

      fs.writeFileSync(
        outputPath.replace('.md', '.html'),
        data.content,
        'utf-8',
      );

      fs.writeFileSync(
        outputPath.replace('.md', '.json'),
        JSON.stringify(data.frontMatter),
        'utf-8',
      );
    }
  });
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

  let count = 0;

  for (const section in hyperLinks) {
    count += hyperLinks[section as srcSectionDirType].length;
  }

  console.log(`Created empty hyperlinks file, missing ${count} hyperlinks.`);
}

processMarkdownFiles(srcContentDir);
createFileFromConnetion();
console.log(
  `Markdown files have been prerendered and saved in the ${srcAssetsDir} directory.`,
);
