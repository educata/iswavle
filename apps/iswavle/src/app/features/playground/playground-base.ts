import { isPlatformBrowser } from '@angular/common';
import {
  Component,
  DestroyRef,
  HostListener,
  PLATFORM_ID,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
  inject,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { MetaTags, Theme } from '@iswavle/shared/utils';
import {
  DownloadService,
  MetaService,
  ThemeService,
} from '@iswavle/shared/data-access';
import { NzCodeEditorComponent } from 'ng-zorro-antd/code-editor';
import { NzIconService } from 'ng-zorro-antd/icon';
import { NzTreeNodeOptions } from 'ng-zorro-antd/tree';
import { BehaviorSubject, map, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PlaygroundEffects } from '@iswavle/shared/utils';

@Component({
  selector: 'sw-playground-base',
  standalone: true,
  template: '',
})
export class PlaygroundBaseComponent {
  protected readonly platform = inject(PLATFORM_ID);
  protected readonly destroyRef = inject(DestroyRef);
  protected readonly iconService = inject(NzIconService);
  protected readonly route = inject(ActivatedRoute);
  protected readonly domSanitizer = inject(DomSanitizer);
  protected readonly themeService = inject(ThemeService);
  protected readonly metaService = inject(MetaService);
  protected readonly downloadService = inject(DownloadService);

  @ViewChild('editorOutlet', { read: ViewContainerRef })
  outletRef!: ViewContainerRef;
  @ViewChild('editorTemplate', { read: TemplateRef })
  contentRef!: TemplateRef<NzCodeEditorComponent>;
  @ViewChild('editor', { static: false })
  editorRef!: NzCodeEditorComponent;

  readonly isBrowser = isPlatformBrowser(this.platform);
  readonly editorThemeOptions = this.themeService.editorThemeOptions;

  readonly isEditorInitialized$ = new BehaviorSubject<boolean>(false);
  readonly isSiderCollapsed$ = new BehaviorSubject<boolean>(false);
  readonly isDownloadModalVisible$ = new BehaviorSubject<boolean>(false);

  readonly files$ = this.route.data.pipe(
    map((res) => [res['data']] as NzTreeNodeOptions[]),
  );

  readonly editorTheme$ = this.themeService.editorTheme$.pipe(
    tap(() => {
      if (this.isBrowser && !this.themeService.hasEditorThemeSelection) {
        this.reRenderEditor();
      }
    }),
  );

  @HostListener('window:keydown', ['$event']) keyDown(event: KeyboardEvent) {
    if (event.key === 's' && event.ctrlKey) {
      event.preventDefault();
      this.isDownloadModalVisible$.next(true);
    }
  }

  @HostListener('window:beforeunload', ['$event']) onBeforeUnload(
    event: Event,
  ) {
    event.preventDefault();
  }

  constructor() {
    if (this.isBrowser) {
      const metaRenderer$ = this.files$.pipe(
        takeUntilDestroyed(),
        tap((nodes) => this.setPlaygroundMetaTags(nodes[0])),
      );

      metaRenderer$.subscribe();
    }
  }

  protected registerEffects(effects: PlaygroundEffects) {
    for (let effect in effects) {
      effects[effect].pipe(takeUntilDestroyed(this.destroyRef)).subscribe();
    }
  }

  protected convertGlobalTheme(theme: Theme) {
    return theme === Theme.Light ? 'vs' : 'vs-dark';
  }

  protected reRenderEditor() {
    if (this.editorRef && this.contentRef) {
      this.outletRef.clear();
      this.outletRef.createEmbeddedView(this.contentRef);
    }
  }

  changeTheme(theme: string) {
    this.themeService.changeEditorTheme(theme);
  }

  private setPlaygroundMetaTags(node: NzTreeNodeOptions): void {
    const usedExtensions: string[] = [];

    const traverseNodes = (n: NzTreeNodeOptions) => {
      const keys = n.key?.toString().split('.');
      const isSingleItem = keys.length === 1;
      const ext = keys.pop();
      if (ext && !usedExtensions.includes(ext) && !isSingleItem) {
        usedExtensions.push(ext);
      }
      if (n.children) {
        n.children.forEach((child) => traverseNodes(child));
      }
    };

    traverseNodes(node);

    this.metaService.updateMediaMetaTags(
      MetaTags.Keywords,
      usedExtensions.join(', '),
    );

    this.metaService.updateMediaMetaTags(
      MetaTags.Title,
      this.metaService.getTitle(),
    );
  }
}
