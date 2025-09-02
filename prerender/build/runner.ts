import * as fs from 'fs';
import * as path from 'path';
import {
  BuildHook,
  Category,
  Extension,
  FileMeta,
} from '@global-shared/interfaces';

type FunctionKeys<T> = {
  [K in keyof T]: T[K] extends (...args: any[]) => any ? K : never;
}[keyof T];

export async function runBuild(
  baseDir: string,
  hooks: BuildHook[],
): Promise<void> {
  async function runStage<T extends FunctionKeys<BuildHook>>(
    stage: T,
    ...args: Parameters<BuildHook[T]>
  ) {
    for (const hook of hooks) {
      const fn = hook[stage] as (...args: Parameters<BuildHook[T]>) => any;
      if (!fn) continue;
      try {
        await fn(...args);
      } catch (error) {
        if (hook.onError) {
          await hook.onError(error);
        } else {
          throw error;
        }
      }
    }
  }

  async function handleFile(filePath: string) {
    const relativePath = path.relative(baseDir, filePath);
    const content = fs.readFileSync(filePath, 'utf-8');
    const category = path.dirname(relativePath).split(/[\\/]/)[0] as Category;
    const meta: FileMeta = {
      name: path.basename(filePath),
      path: relativePath,
      category: category,
      extension: path.extname(filePath).slice(1) as Extension,
    };
    await runStage('onFile', meta, content);
  }

  async function walk(directory: string) {
    const dir = fs.readdirSync(directory);
    const promises = dir.map(async (file) => {
      const filePath = path.join(directory, file);
      if (fs.statSync(filePath).isDirectory()) {
        await walk(filePath);
      } else {
        handleFile(filePath);
      }
    });
    await Promise.all(promises);
  }

  await runStage('onStart');
  await walk(baseDir);
  await runStage('onEnd');
}
