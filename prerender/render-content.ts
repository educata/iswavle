import * as fs from 'fs';
import * as path from 'path';
import * as marked from 'marked';
import frontMatter from 'front-matter';
import { ArticleAttributes, FrontMatter } from '../shared/interfaces';

const srcContentDir = './src/content';
const srcAssetsDir = './src/assets';

function renderMarkdownFile(filePath: string) {
  const markdown = fs.readFileSync(filePath, 'utf8');
  const parsedMarkdown = marked.parse(markdown.replace(/^---$.*^---$/ms, ''));
  const data = frontMatter<FrontMatter<ArticleAttributes>>(markdown);
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

function processMarkdownFiles(directory: string) {
  fs.readdirSync(directory).forEach((file) => {
    const filePath = path.join(directory, file);
    if (fs.statSync(filePath).isDirectory()) {
      processMarkdownFiles(filePath);
    } else if (file.endsWith('.md')) {
      const outputPath = createOutputDirectoryStructure(filePath);
      const data = renderMarkdownFile(filePath);

      fs.writeFileSync(
        outputPath.replace('.md', '.html'),
        data.content,
        'utf-8'
      );

      fs.writeFileSync(
        outputPath.replace('.md', '.json'),
        JSON.stringify(data.frontMatter),
        'utf-8'
      );
    }
  });
}

console.log();

processMarkdownFiles(srcContentDir);
console.log(
  'Markdown files have been prerendered and saved in the /src/assets directory.'
);
