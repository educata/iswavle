import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PlaygroundEffects, WebContainerFile } from '@app-shared/interfaces';
import {
  WEBCONTAINER_STATE,
  provideWebcontainerState,
} from '@app-shared/providers';
import { Uri } from 'monaco-editor';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCodeEditorModule } from 'ng-zorro-antd/code-editor';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import {
  NzTreeNodeOptions,
  NzFormatEmitEvent,
  NzTreeModule,
} from 'ng-zorro-antd/tree';
import {
  BehaviorSubject,
  map,
  combineLatest,
  tap,
  filter,
  debounceTime,
  withLatestFrom,
  take,
} from 'rxjs';
import { LanguageExtensionPipe } from '../language-extension.pipe';
import { PlaygroundBaseComponent } from '../playground-base';
import { TITLE_SUFFIX_SEPARATOR } from '@app-shared/consts';

declare const monaco: any;

@Component({
    selector: 'sw-playground-wc',
    imports: [
        CommonModule,
        NzIconModule,
        NzTreeModule,
        NzCodeEditorModule,
        NzSpinModule,
        FormsModule,
        LanguageExtensionPipe,
        NzGridModule,
        NzLayoutModule,
        NzButtonModule,
        NzDropDownModule,
        NzModalModule,
    ],
    templateUrl: './playground-wc.component.html',
    styleUrl: './playground-wc.component.less',
    providers: [provideWebcontainerState()],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export default class PlaygroundWcComponent
  extends PlaygroundBaseComponent
  implements OnInit
{
  private readonly webcontainerState = inject(WEBCONTAINER_STATE);

  readonly writeFile$ = new BehaviorSubject<WebContainerFile | null>(null);
  readonly openFile$ = this.webcontainerState.openFile$;
  readonly instanceLoaded$ = this.webcontainerState.instanceLoaded$;
  readonly instanceDestroyed$ = this.webcontainerState.instanceDestroyed$;
  readonly serverUrl$ = this.webcontainerState.serverUrl$.pipe(
    map((url) => this.domSanitizer.bypassSecurityTrustResourceUrl(url)),
  );

  readonly isServerRunning$ = this.webcontainerState.serverUrl$.pipe(
    map((url) => Boolean(url)),
  );

  readonly effects: PlaygroundEffects = {
    initWebContainerInstance$: this.files$.pipe(
      tap((files) => {
        if (files.length >= 0) {
          const mappedFiles = this.webcontainerState.fileTreeMapper(files);
          const firstChild = this.firstChild(files[0]);
          const path = firstChild ? firstChild['path'] : '';
          this.webcontainerState.init({
            files: mappedFiles,
            initialFilePath: path,
            static: true,
            port: '8080',
            root: files[0]['path'],
          });
        }
      }),
    ),

    writeFile$: this.writeFile$.pipe(
      filter(Boolean),
      debounceTime(1000),
      tap((file) => this.webcontainerState.writeFile(file.path, file.contents)),
    ),

    rerenderEditor$: this.openFile$.pipe(
      withLatestFrom(this.isEditorInitialized$),
      filter(Boolean),
      tap(() => this.reRenderEditor()),
    ),

    refreshEditorLayout$: this.isSiderCollapsed$.pipe(
      withLatestFrom(this.isEditorInitialized$),
      filter(([_, isEditorInitialized]) => isEditorInitialized),
      debounceTime(500),
      tap(() => this.editorRef.layout()),
    ),

    registerLinkOpener$: this.isEditorInitialized$.pipe(
      filter(Boolean),
      take(1),
      tap(() => {
        monaco.editor.registerLinkOpener({
          async open(resource: Uri) {
            // TODO: handle link opener
            console.log(resource);
            return true;
          },
        });
      }),
    ),
  };

  readonly vm$ = combineLatest([
    this.files$,
    this.openFile$,
    this.instanceLoaded$,
    this.instanceDestroyed$,
    this.serverUrl$,
    this.themeService.theme$,
    this.editorTheme$,
    this.isSiderCollapsed$,
    this.isEditorInitialized$,
    this.isServerRunning$,
    this.isDownloadModalVisible$,
  ]).pipe(
    map(
      ([
        files,
        openFile,
        instanceLoaded,
        instanceDestroyed,
        serverUrl,
        globalTheme,
        editorTheme,
        isSiderCollapsed,
        isEditorInitialized,
        isServerRunning,
        isDownloadModalVisible,
      ]) => ({
        files,
        openFile,
        instanceLoaded,
        instanceDestroyed,
        serverUrl,
        globalTheme,
        editorTheme,
        isSiderCollapsed,
        isEditorInitialized,
        isServerRunning,
        isDownloadModalVisible,
      }),
    ),
  );

  ngOnInit(): void {
    this.registerEffects(this.effects);
  }

  selectFile(event: NzFormatEmitEvent) {
    if (!event.node?.isLeaf) return;
    this.webcontainerState.openFile(event.node?.origin['path']);
  }

  private firstChild(node: NzTreeNodeOptions): NzTreeNodeOptions | null {
    if (node.isLeaf) {
      return node;
    } else {
      if (node.children) {
        for (const child of node.children) {
          const leafNode = this.firstChild(child);
          if (leafNode) {
            return leafNode;
          }
        }
      }
    }
    return null;
  }

  download(combined: boolean) {
    this.files$
      .pipe(
        take(1),
        tap(async (files) => {
          this.isDownloadModalVisible$.next(false);
          const allFiles: NzTreeNodeOptions[] = [];
          this.appendChildrenFiles(files, allFiles);

          const title =
            this.title
              .getTitle()
              .split(TITLE_SUFFIX_SEPARATOR)
              .shift()
              ?.split(' ')
              .filter((part) => Boolean(part))
              .join('_') || 'blank';

          for (const file of allFiles) {
            const content = await this.webcontainerState.readFile(file['path']);
            file['updatedContent'] = content;
            if (file['language'] === 'html') {
              const prev = file['updatedContent'];
              file['updatedContent'] =
                `<!-- კოდი დაგენერირდა: ${location.href}-ს ედიტორის გამოყენებით -->`.concat(
                  prev,
                );
            }
          }

          if (combined) {
            this.downloadService.downloadFiles(
              allFiles.map((file) => ({
                name: file.key,
                content: file['updatedContent'] || '',
                contentType: `text/${file['language']}`,
              })),
              title,
            );
            return;
          }

          allFiles.forEach((file) => {
            this.downloadService.downloadFile({
              name: file.key,
              content: file['updatedContent'] || '',
              contentType: `text/${file['language']}`,
            });
          });
        }),
      )
      .subscribe();
  }

  private appendChildrenFiles(
    files: NzTreeNodeOptions[],
    allFiles: NzTreeNodeOptions[],
  ) {
    files.forEach((file) => {
      if (file['content'] && file['language']) {
        allFiles.push(file);
      }
      if (file.children) {
        this.appendChildrenFiles(file.children, allFiles);
      }
    });
  }
}
