import * as fs from 'fs';
import * as path from 'path';
import marked from 'marked';

const srcContentDir = './src/content';
const srcAssetsDir = './src/assets';

function renderMarkdownFile(filePath: string): string {
  const markdown = fs.readFileSync(filePath, 'utf8');
  return marked.parse(markdown);
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
      const renderedHtml = renderMarkdownFile(filePath);
      fs.writeFileSync(
        outputPath.replace('.md', '.html'),
        renderedHtml,
        'utf8'
      );
    }
  });
}

processMarkdownFiles(srcContentDir);
console.log(
  'Markdown files have been prerendered and saved in the /src/assets directory.'
);
