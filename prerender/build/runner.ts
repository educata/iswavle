import * as fs from 'fs/promises';
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
  ): Promise<void> {
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

  async function handleFile(filePath: string): Promise<void> {
    const relativePath = path.relative(baseDir, filePath);
    const content = await fs.readFile(filePath, 'utf-8');
    const category = path.dirname(relativePath).split(/[\\/]/)[0] as Category;
    const normalizedPath = relativePath.replace(/\\/g, '/');
    const extension = path.extname(filePath).slice(1) as Extension;

    const meta: FileMeta = {
      category,
      extension,
      name: path.basename(filePath).replace(`.${extension}`, ''),
      path: normalizedPath,
      subPath: normalizedPath
        .replace(`${category}/`, '')
        .replace(new RegExp(`\\.${extension}$`, 'i'), ''),
    };

    if (meta.name === 'README' && meta.extension === 'md') {
      return;
    }

    await runStage('onFile', meta, content);
  }

  async function walk(directory: string): Promise<void> {
    const dir = await fs.readdir(directory);
    const promises = dir.map(async (file) => {
      const filePath = path.join(directory, file);
      const stats = await fs.stat(filePath);
      if (stats.isDirectory()) {
        await walk(filePath);
      } else {
        await handleFile(filePath);
      }
    });
    await Promise.all(promises);
  }

  await runStage('onStart');
  await walk(baseDir);
  await runStage('onEnd');
}
