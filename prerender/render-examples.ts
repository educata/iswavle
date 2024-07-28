import { ExampleFile } from '@global-shared/interfaces';
import * as fs from 'fs';
import * as path from 'path';

const examplesSrc = './src/content/examples';
const outputDir = './src/assets/examples';

function renderExampleFolder(rootSrc: string) {
  const dir = fs.readdirSync(rootSrc);
  const exampleFiles: ExampleFile[] = [];
  dir.forEach((src) => {
    const innerSrc = path.join(rootSrc, src);
    const content = readContent(innerSrc);
    if (content) {
      exampleFiles.push({
        content,
        name: src,
      });
    } else {
      exampleFiles.push({
        name: src,
        children: renderExampleFolder(innerSrc),
      });
    }
  });
  return exampleFiles;
}

function readContent(src: string): string | null {
  try {
    return fs.readFileSync(src, { encoding: 'utf-8' });
  } catch (err) {
    return null;
  }
}

function renderExamplesJSON(examples: ExampleFile[], outputSrc: string) {
  if (!fs.existsSync(outputSrc)) {
    fs.mkdirSync(outputSrc);
  }
  examples.forEach((example) => {
    const fileName = path.join(outputSrc, example.name);
    fs.writeFileSync(`${fileName}.json`, JSON.stringify(example), {
      encoding: 'utf-8',
    });
  });
}

const guideExamples = renderExampleFolder(path.join(examplesSrc, 'guides'));
const referenceExamples = renderExampleFolder(
  path.join(examplesSrc, 'references'),
);

renderExamplesJSON(guideExamples, path.join(outputDir, 'guides'));
renderExamplesJSON(referenceExamples, path.join(outputDir, 'references'));
