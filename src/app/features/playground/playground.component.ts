import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  PLATFORM_ID,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
  inject,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DomSanitizer } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import {
  BehaviorSubject,
  combineLatest,
  debounceTime,
  filter,
  map,
  merge,
  take,
  tap,
  withLatestFrom,
} from 'rxjs';
import { Uri } from 'monaco-editor';
import { NzIconModule, NzIconService } from 'ng-zorro-antd/icon';
import { NzGridModule } from 'ng-zorro-antd/grid';
import {
  NzFormatEmitEvent,
  NzTreeModule,
  NzTreeNodeOptions,
} from 'ng-zorro-antd/tree';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzButtonModule } from 'ng-zorro-antd/button';
import {
  NzCodeEditorComponent,
  NzCodeEditorModule,
} from 'ng-zorro-antd/code-editor';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import {
  WEBCONTAINER_STATE,
  provideWebcontainerState,
} from '@app-shared/providers/';
import { WebContainerFile } from '@app-shared/interfaces';
import { CUSTOM_ICONS, EDITOR_THEMES, ICON_PREFIX } from '@app-shared/consts';
import { TerminalComponent } from './ui';
import { LanguageExtensionPipe } from './language-extension.pipe';
import { ThemeService } from '@app-shared/services';
import { LocalStorageKeys, Theme } from '@app-shared/enums';

declare const monaco: any;

@Component({
  selector: 'sw-playground',
  standalone: true,
  imports: [
    CommonModule,
    NzIconModule,
    NzTreeModule,
    NzCodeEditorModule,
    NzSpinModule,
    FormsModule,
    LanguageExtensionPipe,
    TerminalComponent,
    NzGridModule,
    NzLayoutModule,
    NzButtonModule,
    NzDropDownModule,
  ],
  providers: [provideWebcontainerState()],
  templateUrl: './playground.component.html',
  styleUrl: './playground.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PlaygroundComponent {
  private readonly platform = inject(PLATFORM_ID);
  private readonly iconService = inject(NzIconService);
  private readonly route = inject(ActivatedRoute);
  private readonly webcontainerState = inject(WEBCONTAINER_STATE);
  private readonly domSanitizer = inject(DomSanitizer);
  private readonly themeService = inject(ThemeService);

  @ViewChild('editorOutlet', { read: ViewContainerRef })
  outletRef!: ViewContainerRef;
  @ViewChild('editorTemplate', { read: TemplateRef })
  contentRef!: TemplateRef<NzCodeEditorComponent>;
  @ViewChild('editor', { static: false })
  editorRef!: NzCodeEditorComponent;

  readonly isBrowser = isPlatformBrowser(this.platform);
  readonly editorThemes = EDITOR_THEMES;

  readonly isEditorInitialized$ = new BehaviorSubject<boolean>(false);
  readonly isSiderCollapsed$ = new BehaviorSubject<boolean>(false);
  readonly writeFile$ = new BehaviorSubject<WebContainerFile | null>(null);
  readonly currentEditorTheme$ = new BehaviorSubject<string>(
    (this.isBrowser &&
      localStorage?.getItem(LocalStorageKeys.CodeEditorTheme)) ||
      EDITOR_THEMES[0],
  );

  readonly files$ = this.route.data.pipe(
    map((res) => [res['data']] as NzTreeNodeOptions[]),
  );

  readonly openFile$ = this.webcontainerState.openFile$;
  readonly instanceLoaded$ = this.webcontainerState.instanceLoaded$;
  readonly instanceDestroyed$ = this.webcontainerState.instanceDestroyed$;
  readonly serverUrl$ = this.webcontainerState.serverUrl$.pipe(
    map((url) => this.domSanitizer.bypassSecurityTrustResourceUrl(url)),
  );
  readonly isServerRunning$ = this.webcontainerState.serverUrl$.pipe(
    map((url) => Boolean(url)),
  );

  readonly editorTheme$ = combineLatest([
    this.currentEditorTheme$,
    this.themeService.theme$,
  ]).pipe(
    map(([editorTheme, globalTheme]) => {
      let userPrefrableTheme;
      if (this.isBrowser) {
        userPrefrableTheme = localStorage.getItem(
          LocalStorageKeys.CodeEditorTheme,
        );
      }
      return userPrefrableTheme
        ? editorTheme
        : this.convertGlobalTheme(globalTheme);
    }),
    tap(() => {
      if (this.isBrowser) {
        if (!localStorage.getItem(LocalStorageKeys.CodeEditorTheme)) {
          this.reRenderEditor();
        }
      }
    }),
  );

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
      }),
    ),
  );

  constructor() {
    this.registerIcons();
    this.initEditorEnv();
  }

  private initEditorEnv() {
    /*
     * TODO: if files change but instance is already loaded,
     * just unmount old files and mount new ones
     */
    const initWebContainerInstance$ = this.files$.pipe(
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
    );

    const writeFile$ = this.writeFile$.pipe(
      filter(Boolean),
      debounceTime(1000),
      tap((file) => this.webcontainerState.writeFile(file.path, file.contents)),
    );

    const rerenderEditor$ = this.openFile$.pipe(
      withLatestFrom(this.isEditorInitialized$),
      filter(Boolean),
      tap(() => this.reRenderEditor()),
    );

    const refreshEditorLayout$ = this.isSiderCollapsed$.pipe(
      withLatestFrom(this.isEditorInitialized$),
      filter(([_, isEditorInitialized]) => isEditorInitialized),
      debounceTime(500),
      tap(() => this.editorRef.layout()),
    );

    const registerLinkOpener$ = this.isEditorInitialized$.pipe(
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
    );

    merge(
      initWebContainerInstance$,
      writeFile$,
      rerenderEditor$,
      refreshEditorLayout$,
      registerLinkOpener$,
    )
      .pipe(takeUntilDestroyed())
      .subscribe();
  }

  selectFile(event: NzFormatEmitEvent) {
    if (!event.node?.isLeaf) return;
    this.webcontainerState.openFile(event.node?.origin['path']);
  }

  private reRenderEditor() {
    if (this.editorRef && this.contentRef) {
      this.outletRef.clear();
      this.outletRef.createEmbeddedView(this.contentRef);
    }
  }

  private convertGlobalTheme(theme: Theme) {
    return theme === Theme.Light ? 'vs' : 'vs-dark';
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

  private registerIcons() {
    for (const key in CUSTOM_ICONS) {
      this.iconService.addIconLiteral(ICON_PREFIX + key, CUSTOM_ICONS[key]);
    }
  }

  download() {
    console.log('Download all files');
  }

  changeTheme(theme: string) {
    this.currentEditorTheme$.next(theme);
    localStorage.setItem(LocalStorageKeys.CodeEditorTheme, theme);
  }

  defaultTheme() {
    this.currentEditorTheme$.next(
      this.convertGlobalTheme(this.themeService.theme),
    );
    localStorage.removeItem(LocalStorageKeys.CodeEditorTheme);
  }
}
