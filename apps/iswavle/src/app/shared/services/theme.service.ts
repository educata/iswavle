import { isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, inject, DOCUMENT } from '@angular/core';
import { LocalStorageKeys, Theme, ThemeOptions } from '@app-shared/enums';
import { EDITOR_THEMES } from '@app-shared/consts';
import {
  BehaviorSubject,
  Observable,
  filter,
  fromEvent,
  map,
  of,
  startWith,
  switchMap,
  tap,
  combineLatest,
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly platform = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platform);
  private readonly document = inject(DOCUMENT);

  private readonly currentEditorTheme$ = new BehaviorSubject<string>(
    EDITOR_THEMES[0],
  );

  readonly #selectedMode$ = new BehaviorSubject<ThemeOptions>(ThemeOptions.OS);
  readonly selectedMode$ = this.#selectedMode$.asObservable();

  readonly theme$: Observable<Theme> = this.#selectedMode$.pipe(
    startWith(ThemeOptions.OS),
    filter(() => this.isBrowser),
    switchMap((theme) => {
      switch (theme) {
        case ThemeOptions.Light: {
          return of(Theme.Light);
        }

        case ThemeOptions.Dark: {
          return of(Theme.Dark);
        }

        default: {
          const query = this.document.defaultView!.matchMedia(
            '(prefers-color-scheme: dark)',
          );
          return fromEvent(query, 'change').pipe(
            startWith(query),
            map((query) => {
              const matches = (query as MediaQueryList).matches;
              return matches ? Theme.Dark : Theme.Light;
            }),
          );
        }
      }
    }),
  );

  readonly editorTheme$ = combineLatest([
    this.currentEditorTheme$,
    this.theme$,
  ]).pipe(
    map(
      ([editorTheme, globalTheme]) =>
        editorTheme || (globalTheme === Theme.Light ? 'vs' : 'vs-dark'),
    ),
  );

  get editorThemeOptions(): string[] {
    return EDITOR_THEMES;
  }

  get hasEditorThemeSelection(): boolean {
    try {
      return Boolean(localStorage.getItem(LocalStorageKeys.CodeEditorTheme));
    } catch {
      return false;
    }
  }

  setTheme(theme: ThemeOptions) {
    this.#selectedMode$.next(theme);
  }

  init() {
    if (this.isBrowser) {
      const prevTheme = localStorage.getItem(
        LocalStorageKeys.Theme,
      ) as ThemeOptions | null;
      if (prevTheme) {
        this.#selectedMode$.next(prevTheme);
      }
      const editorTheme =
        localStorage.getItem(LocalStorageKeys.CodeEditorTheme) || '';
      this.currentEditorTheme$.next(editorTheme);
    }
    return this.theme$.pipe(
      tap((theme) => {
        if (this.isBrowser) {
          this.applyThemeToDoc(theme);
        }
      }),
    );
  }

  changeEditorTheme(theme: string) {
    if (!this.isBrowser) {
      return;
    }
    this.currentEditorTheme$.next(theme);
    localStorage.setItem(LocalStorageKeys.CodeEditorTheme, theme);
  }

  private applyThemeToDoc(theme: Theme) {
    if (this.isBrowser) {
      const documentClassList = this.document.documentElement.classList;
      if (theme === Theme.Dark) {
        documentClassList.add(Theme.Dark);
        documentClassList.remove(Theme.Light);
      } else {
        documentClassList.add(Theme.Light);
        documentClassList.remove(Theme.Dark);
      }
      localStorage.setItem(LocalStorageKeys.Theme, theme);
    }
  }
}
