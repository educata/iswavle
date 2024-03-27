import { isPlatformBrowser } from '@angular/common';
import { Injectable, OnDestroy, PLATFORM_ID, inject } from '@angular/core';
import {
  DirectoryNode,
  FileNode,
  WebContainer,
  WebContainerProcess,
} from '@webcontainer/api';
import { FileSystemTree } from '@webcontainer/api';
import { BehaviorSubject, filter, take } from 'rxjs';
import { NzTreeNodeOptions } from 'ng-zorro-antd/tree';
import {
  WebContainerFile,
  WebContainerInitOpts,
  WebContainerState,
} from '@app-shared/interfaces';

@Injectable()
export class WebContainerService implements WebContainerState, OnDestroy {
  platform = inject(PLATFORM_ID);
  instance: WebContainer | undefined;

  #instanceDestroyed$ = new BehaviorSubject<boolean>(false);
  #instanceLoaded$ = new BehaviorSubject<boolean>(false);
  #openFile$ = new BehaviorSubject<WebContainerFile | null>(null);
  #serverUrl$ = new BehaviorSubject<string>('');
  #shellProcess = new BehaviorSubject<WebContainerProcess | null>(null);

  instanceDestroyed$ = this.#instanceDestroyed$.asObservable();
  instanceLoaded$ = this.#instanceLoaded$.asObservable();
  openFile$ = this.#openFile$.asObservable();
  serverUrl$ = this.#serverUrl$.asObservable();
  shellProcess$ = this.#shellProcess.asObservable();

  async init(opts: WebContainerInitOpts): Promise<void> {
    if (!isPlatformBrowser(this.platform)) return;

    // TODO: if route changed before boot inited there is error which will break playground
    // ! ERROR Error: Only a single WebContainer instance can be booted

    // TODO: maybe boot once throughout whole app and just mount different files
    const webcontainerInstance = await WebContainer.boot();
    this.instance = webcontainerInstance;
    await this.instance.mount(opts.files);
    this.#instanceLoaded$.next(true);

    if (opts.onServerReady) {
      this.instance.on('server-ready', opts.onServerReady);
    } else {
      this.instance.on('server-ready', (port, url) => {
        this.#serverUrl$.next(url);
      });
    }

    if (opts.initialFilePath) {
      this.openFile(opts.initialFilePath);
    }

    if (opts.static) {
      await this.instance.spawn('npx', [
        '-y',
        'servor',
        opts.root || '/',
        'index.html',
        opts.port || '8080',
        '--reload',
      ]);
    } else if (opts.npm) {
      await this.instance.spawn('npm', ['i']);
      await this.instance.spawn('npm', ['run', 'start']);
    }
  }

  async startShellProcess(terminal: { rows: number; cols: number }) {
    const process = await this.instance?.spawn('jsh', { terminal });
    process && this.#shellProcess.next(process);
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
    this.#instanceLoaded$.pipe(filter(Boolean), take(1)).subscribe(() => {
      console.log("Destroying webcontainer instance...")
      this.instance?.teardown();
      this.#instanceDestroyed$.next(true);
    });
  }
}
