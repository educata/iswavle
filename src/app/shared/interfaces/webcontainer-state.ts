import { FileSystemTree, WebContainer } from '@webcontainer/api';
import { Observable } from 'rxjs';

export interface WebContainerInitOpts {
  files: FileSystemTree;
  initialFilePath?: string;
}

export interface WebContainerFile {
  path: string;
  contents: string;
}

export interface WebContainerState {
  instance: WebContainer | undefined;
  openFile$: Observable<WebContainerFile | null>;
  instanceLoaded$: Observable<boolean>;
  instanceDestroyed$: Observable<boolean>;
  init(opts: WebContainerInitOpts): Promise<void>;
  fileTreeMapper(files: any): FileSystemTree;
  writeFile(path: string, data: string): void;
  readFile(path: string): Promise<string | undefined>;
  openFile(path: string): Promise<void> | void;
}
