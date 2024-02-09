import { isPlatformBrowser } from '@angular/common';
import {
  ElementRef,
  Injectable,
  OnDestroy,
  PLATFORM_ID,
  inject,
} from '@angular/core';
import {
  DirectoryNode,
  FileNode,
  WebContainer,
  WebContainerProcess,
} from '@webcontainer/api';
import { FileSystemTree } from '@webcontainer/api';
import {
  WebContainerFile,
  WebContainerInitOpts,
  WebContainerState,
} from '../interfaces';
import { NzTreeNodeOptions } from 'ng-zorro-antd/tree';
import { BehaviorSubject } from 'rxjs';
import { Terminal } from 'xterm';

@Injectable()
export class WebContainerService implements WebContainerState, OnDestroy {
  platform = inject(PLATFORM_ID);
  instance: WebContainer | undefined;
  terminal: Terminal | undefined;

  #instanceDestroyed$ = new BehaviorSubject<boolean>(false);
  #instanceLoaded$ = new BehaviorSubject<boolean>(false);
  #openFile$ = new BehaviorSubject<WebContainerFile | null>(null);
  #serverUrl$ = new BehaviorSubject<string>('');

  instanceDestroyed$ = this.#instanceDestroyed$.asObservable();
  instanceLoaded$ = this.#instanceLoaded$.asObservable();
  openFile$ = this.#openFile$.asObservable();
  serverUrl$ = this.#serverUrl$.asObservable();

  async init(opts: WebContainerInitOpts): Promise<void> {
    if (!isPlatformBrowser(this.platform)) return;

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
      const serveProcess = await this.instance.spawn('npx', [
        '-y',
        'servor',
        opts.root || '/',
        'index.html',
        opts.port || '8080',
        '--reload',
      ]);
      this.writeToTerminal(serveProcess);
    }

    if (opts.npm) {
      const installProcess = await this.instance.spawn('npm', ['i']);
      this.writeToTerminal(installProcess);

      const startProcess = await this.instance.spawn('npm', ['run', 'start']);
      this.writeToTerminal(startProcess);
    }
  }

  async connectTerminal(ref: ElementRef<any>) {
    if (!isPlatformBrowser(this.platform)) return;
    const Terminal = await import('xterm').then((m) => m.Terminal);
    this.terminal = new Terminal({ convertEol: true });
    this.terminal.open(ref.nativeElement);
  }

  writeToTerminal(process: WebContainerProcess) {
    const terminal = this.terminal;
    process.output.pipeTo(
      new WritableStream({
        write(data) {
          terminal?.write(data);
        },
      }),
    );
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
