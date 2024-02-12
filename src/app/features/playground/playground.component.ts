import {
  ChangeDetectionStrategy,
  Component,
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
  tap,
} from 'rxjs';
import { NzIconModule, NzIconService } from 'ng-zorro-antd/icon';
import {
  NzFormatEmitEvent,
  NzTreeModule,
  NzTreeNodeOptions,
} from 'ng-zorro-antd/tree';
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
import { CUSTOM_ICONS, ICON_PREFIX } from '@app-shared/consts';
import { TerminalComponent } from './ui';
import { LanguageExtensionPipe } from './language-extension.pipe';

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
  ],
  providers: [provideWebcontainerState()],
  templateUrl: './playground.component.html',
  styleUrl: './playground.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PlaygroundComponent {
  @ViewChild('outlet', { read: ViewContainerRef }) outletRef!: ViewContainerRef;
  @ViewChild('content', { read: TemplateRef })
  contentRef!: TemplateRef<NzCodeEditorComponent>;
  private readonly platform = inject(PLATFORM_ID);
  private readonly iconService = inject(NzIconService);
  private readonly route = inject(ActivatedRoute);
  private readonly webcontainerState = inject(WEBCONTAINER_STATE);
  private readonly domSanitizer = inject(DomSanitizer);

  readonly isBrowser = isPlatformBrowser(this.platform);

  writeFile$ = new BehaviorSubject<WebContainerFile | null>(null);

  files$ = this.route.data.pipe(
    map((res) => [res['data']] as NzTreeNodeOptions[]),
  );

  openFile$ = this.webcontainerState.openFile$;
  instanceLoaded$ = this.webcontainerState.instanceLoaded$;
  instanceDestroyed$ = this.webcontainerState.instanceDestroyed$;
  serverUrl$ = this.webcontainerState.serverUrl$.pipe(
    map((url) => this.domSanitizer.bypassSecurityTrustResourceUrl(url)),
  );

  vm$ = combineLatest([
    this.files$,
    this.openFile$,
    this.instanceLoaded$,
    this.instanceDestroyed$,
    this.serverUrl$,
  ]).pipe(
    map(([files, openFile, instanceLoaded, instanceDestroyed, serverUrl]) => ({
      files,
      openFile,
      instanceLoaded,
      instanceDestroyed,
      serverUrl,
    })),
  );

  constructor() {
    this.registerIcons();
    this.initWebContainer();
  }

  private initWebContainer() {
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

    merge(initWebContainerInstance$, writeFile$)
      .pipe(takeUntilDestroyed())
      .subscribe();
  }

  async selectFile(event: NzFormatEmitEvent) {
    await this.webcontainerState.openFile(event.node?.origin['path']);
    this.outletRef.clear();
    this.outletRef.createEmbeddedView(this.contentRef);
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
}
