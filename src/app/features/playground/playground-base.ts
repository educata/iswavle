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
import { DomSanitizer, Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { CUSTOM_ICONS, EDITOR_THEMES, ICON_PREFIX } from '@app-shared/consts';
import { LocalStorageKeys, Theme } from '@app-shared/enums';
import { DownloadService, ThemeService } from '@app-shared/services';
import { NzCodeEditorComponent } from 'ng-zorro-antd/code-editor';
import { NzIconService } from 'ng-zorro-antd/icon';
import { NzTreeNodeOptions } from 'ng-zorro-antd/tree';
import { BehaviorSubject, combineLatest, map, tap } from 'rxjs';

import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PlaygroundEffects } from '@app-shared/interfaces';

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
  protected readonly title = inject(Title);
  protected readonly domSanitizer = inject(DomSanitizer);
  protected readonly themeService = inject(ThemeService);
  protected readonly downloadService = inject(DownloadService);

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
  readonly currentEditorTheme$ = new BehaviorSubject<string>(
    (this.isBrowser &&
      localStorage?.getItem(LocalStorageKeys.CodeEditorTheme)) ||
      EDITOR_THEMES[0],
  );
  readonly isDownloadModalVisible$ = new BehaviorSubject<boolean>(false);

  readonly files$ = this.route.data.pipe(
    map((res) => [res['data']] as NzTreeNodeOptions[]),
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
    this.registerIcons();
  }

  protected registerEffects(effects: PlaygroundEffects) {
    for (let effect in effects) {
      effects[effect].pipe(takeUntilDestroyed(this.destroyRef)).subscribe();
    }
  }

  protected registerIcons() {
    for (const key in CUSTOM_ICONS) {
      this.iconService.addIconLiteral(ICON_PREFIX + key, CUSTOM_ICONS[key]);
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
