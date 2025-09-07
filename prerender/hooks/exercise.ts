import path from 'path';
import fs from 'fs';
import { BuildHook, ExercisesAttributes } from '@global-shared/interfaces';
import {
  createOutputDirectoryStructure,
  normalizePath,
  renderMarkdownFile,
} from '../helpers';
import { SRC_ASSET_PATH, SRC_CONTENT_PATH } from '../consts';

export const EXERCISE_HOOK = (): BuildHook => {
  const exerciseDataMap = new Map<string, ExercisesAttributes>();
  return {
    name: 'exercise',
    onStart: () => {
      console.log('🧠 Exercise prerender started');
    },
    onFile: async (meta, content) => {
      if (meta.category !== 'exercises' || meta.extension !== 'md') {
        return;
      }
      const outputPath = createOutputDirectoryStructure(
        path.join(SRC_ASSET_PATH, meta.path),
      );
      const filePath = normalizePath(outputPath);
      const data = await renderMarkdownFile<ExercisesAttributes>(content);
      const srcDir = path.dirname(path.join(SRC_CONTENT_PATH, meta.path));
      let testCases: unknown = null;
      let starterCode = '';

      try {
        const tcPath = path.join(srcDir, 'test-cases.json');
        if (fs.existsSync(tcPath)) {
          testCases = JSON.parse(fs.readFileSync(tcPath, 'utf-8'));
        }
      } catch (error) {
        testCases = `{ message: "Error while extracting test cases. ${error}" }`;
      }

      try {
        const starterPath = path.join(srcDir, 'starter.js');
        if (fs.existsSync(starterPath)) {
          starterCode = fs.readFileSync(starterPath, 'utf-8');
        }
      } catch (error) {
        starterCode = `Error while extracting starter code. ${error}`;
      }

      const out = {
        ['attributes']: data.frontMatter,
        ['testCases']: testCases,
        ['starter']: starterCode,
      };

      const parentDirName = path.basename(path.dirname(filePath));
      exerciseDataMap.set(parentDirName, data.frontMatter);

      fs.writeFileSync(
        outputPath.replace('.md', '.html'),
        data.content,
        'utf-8',
      );

      fs.writeFileSync(
        outputPath.replace('.md', '.json'),
        JSON.stringify(out),
        'utf-8',
      );
    },
    onEnd: () => {
      fs.writeFileSync(
        'src/assets/exercises-map.json',
        JSON.stringify(exerciseDataMap),
        'utf-8',
      );
      console.log(
        `✅ Prerendered ${exerciseDataMap.size} exercises successfully`,
      );
    },
    onError: (error) => {
      console.error('❌ Error occurred during exercise prerendering:', error);
    },
  };
};
