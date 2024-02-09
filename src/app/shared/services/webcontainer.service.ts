import { isPlatformBrowser } from '@angular/common';
import {
  DestroyRef,
  Injectable,
  OnDestroy,
  PLATFORM_ID,
  inject,
} from '@angular/core';
import { DirectoryNode, FileNode, WebContainer } from '@webcontainer/api';
import { FileSystemTree } from '@webcontainer/api';
import {
  WebContainerFile,
  WebContainerInitOpts,
  WebContainerState,
} from '../interfaces';
import { NzTreeNodeOptions } from 'ng-zorro-antd/tree';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class WebContainerService implements WebContainerState, OnDestroy {
  platform = inject(PLATFORM_ID);
  instance: WebContainer | undefined;

  #instanceDestroyed$ = new BehaviorSubject<boolean>(false);
  #instanceLoaded$ = new BehaviorSubject<boolean>(false);
  #openFile$ = new BehaviorSubject<WebContainerFile | null>(null);

  instanceDestroyed$ = this.#instanceDestroyed$.asObservable();
  instanceLoaded$ = this.#instanceLoaded$.asObservable();
  openFile$ = this.#openFile$.asObservable();

  async init({ files, initialFilePath }: WebContainerInitOpts): Promise<void> {
    if (!isPlatformBrowser(this.platform)) return;

    const webcontainerInstance = await WebContainer.boot();
    this.instance = webcontainerInstance;
    await this.instance.mount(files);
    this.#instanceLoaded$.next(true);

    if (initialFilePath) {
      this.openFile(initialFilePath);
    }
  }

  writeFile(path: string, data: string) {
    this.instance?.fs.writeFile(path, data);
  }

  async readFile(path: string) {
    return this.instance?.fs.readFile(path, 'utf-8');
  }

  async openFile(path: string) {
    const contents = await this.readFile(path);
    this.#openFile$.next({ path, contents: contents || '' });
  }

  fileTreeMapper(nodes: NzTreeNodeOptions[]): FileSystemTree {
    const fileSystemTree: FileSystemTree = {};

    nodes.forEach((node) => {
      const { title, isLeaf, children, content } = node;

      if (isLeaf) {
        // It's a file node
        const fileNode: FileNode = {
          file: {
            contents: content,
          },
        };

        fileSystemTree[title] = fileNode;
      } else {
        // It's a directory node
        const directoryNode: DirectoryNode = {
          directory: this.fileTreeMapper(children || []),
        };

        fileSystemTree[title] = directoryNode;
      }
    });

    return fileSystemTree;
  }

  ngOnDestroy(): void {
    this.instance?.teardown();
  }
}
