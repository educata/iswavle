import fs from 'fs';
import path from 'path';
import { BuildHook, ExampleFile } from '@global-shared/interfaces';
import { createOutputDirectoryStructure } from '../helpers';
import { SRC_ASSET_PATH } from '../consts';

export const EXAMPLES_HOOK = (): BuildHook => {
  const seenParentDir = new Set<string>();
  const examplesFileMap = new Map<string, ExampleFile>();

  return {
    name: 'examples',
    onStart: () => {
      console.log('📦 Examples prerender started');
    },
    onFile: async (meta, content) => {
      if (meta.category !== 'examples') {
        return;
      }

      const dir = path.dirname(meta.subPath);
      if (dir === '.') return;

      const rootDir = dir.split('/').slice(0, 2).join('/');
      const fileName = `${meta.name}.${meta.extension}`;
      const parts = meta.subPath.split('/').slice(2);

      if (!seenParentDir.has(rootDir)) {
        seenParentDir.add(rootDir);
        examplesFileMap.set(rootDir, {
          name: rootDir,
          children: [],
        });
      }

      const root = examplesFileMap.get(rootDir);
      if (!root) return;

      let currentChildren = root.children!;

      for (let i = 0; i < parts.length - 1; i++) {
        const dirName = parts[i];
        let childDir = currentChildren.find(
          (c) => c.name === dirName && c.children,
        );

        if (!childDir) {
          childDir = { name: dirName, children: [] };
          currentChildren.push(childDir);
        }

        currentChildren = childDir.children!;
      }

      currentChildren.push({ name: fileName, content });
    },
    onEnd: () => {
      examplesFileMap.forEach((example) => {
        const outputPath = createOutputDirectoryStructure(
          path.join(
            SRC_ASSET_PATH,
            'examples',
            path.dirname(example.name),
            path.basename(example.name) + '.json',
          ),
        );
        example.name = path.basename(example.name);
        fs.writeFileSync(outputPath, JSON.stringify(example), {
          encoding: 'utf-8',
        });
      });
      console.log(
        `✅ Prerendered ${examplesFileMap.size} examples successfully`,
      );
    },
    onError: (error) => {
      console.error('❌ Error occurred during examples prerendering:', error);
    },
  };
};
