import { Category } from './category';
import { Extension } from './extensions';

export interface FileMeta {
  name: string;
  path: string;
  subPath: string;
  category: Category;
  extension: Extension;
}

export interface BuildHook {
  name: string;
  onStart: () => void | Promise<void>;
  onEnd: () => void | Promise<void>;
  onFile: (meta: FileMeta, content: string) => void | Promise<void>;
  onError: (error: unknown, meta?: FileMeta) => void | Promise<void>;
}
