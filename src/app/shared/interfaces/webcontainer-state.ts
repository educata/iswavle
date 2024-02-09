import { ElementRef } from '@angular/core';
import {
  FileSystemTree,
  ServerReadyListener,
  WebContainer,
} from '@webcontainer/api';
import { Observable } from 'rxjs';
import { Terminal } from 'xterm';

export interface WebContainerInitOpts {
  files: FileSystemTree;
  initialFilePath?: string;
  static?: boolean;
  npm?: boolean;
  onServerReady?: ServerReadyListener;
  port?: string;
  root?: string;
}

export interface WebContainerFile {
  path: string;
  contents: string;
}

export interface WebContainerState {
  instance: WebContainer | undefined;
  terminal: Terminal | undefined;
  openFile$: Observable<WebContainerFile | null>;
  instanceLoaded$: Observable<boolean>;
  instanceDestroyed$: Observable<boolean>;
  serverUrl$: Observable<string>;
  init(opts: WebContainerInitOpts): Promise<void>;
  fileTreeMapper(files: any): FileSystemTree;
  writeFile(path: string, data: string): void;
  readFile(path: string): Promise<string | undefined>;
  openFile(path: string): Promise<void> | void;
  connectTerminal(ref: ElementRef<any>): void;
}
