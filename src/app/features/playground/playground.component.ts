import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  PLATFORM_ID,
  ViewChild,
  inject,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { NzIconModule, NzIconService } from 'ng-zorro-antd/icon';
import { CUSTOM_ICONS, ICON_PREFIX } from '../../shared/consts';
import { ActivatedRoute } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  BehaviorSubject,
  combineLatest,
  debounceTime,
  filter,
  map,
  merge,
  tap,
} from 'rxjs';
import {
  NzFormatEmitEvent,
  NzTreeModule,
  NzTreeNodeOptions,
} from 'ng-zorro-antd/tree';
import { NzCodeEditorModule } from 'ng-zorro-antd/code-editor';
import { FormsModule } from '@angular/forms';
import {
  WEBCONTAINER_STATE,
  provideWebcontainerState,
} from '../../shared/providers/';
import { WebContainerFile } from '../../shared/interfaces';
import { LanguageExtensionPipe } from './language-extension.pipe';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { DomSanitizer } from '@angular/platform-browser';
// terminal styles
import 'xterm/css/xterm.css';

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
  ],
  providers: [provideWebcontainerState()],
  templateUrl: './playground.component.html',
  styleUrl: './playground.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PlaygroundComponent implements AfterViewInit {
  private readonly platform = inject(PLATFORM_ID);
  private readonly iconService = inject(NzIconService);
  private readonly route = inject(ActivatedRoute);
  private readonly webcontainerState = inject(WEBCONTAINER_STATE);
  private readonly domSanitizer = inject(DomSanitizer);

  readonly isBrowser = isPlatformBrowser(this.platform);
  @ViewChild('terminal') terminal!: ElementRef<HTMLElement>;

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
    // Register editor icons
    for (const key in CUSTOM_ICONS) {
      this.iconService.addIconLiteral(ICON_PREFIX + key, CUSTOM_ICONS[key]);
    }

    // Effects
    const initWebContainerInstance$ = this.files$.pipe(
      tap((files) => {
        if (files.length >= 0) {
          const mappedFiles = this.webcontainerState.fileTreeMapper(files);
          this.webcontainerState.init({
            files: mappedFiles,
            initialFilePath: files[0]?.children?.[0]?.['index.html'], // TODO: FIX
            port: '8080',
            static: true,
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

  ngAfterViewInit(): void {
    this.webcontainerState.connectTerminal(this.terminal);
  }

  selectFile(event: NzFormatEmitEvent) {
    this.webcontainerState.openFile(event.node?.origin['path']);
  }
}
