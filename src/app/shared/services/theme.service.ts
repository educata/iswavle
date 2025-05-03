import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { LocalStorageKeys, Theme, ThemeOptions } from '@app-shared/enums';
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
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly platform = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platform);
  private readonly document = inject(DOCUMENT);

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
    }
    return this.theme$.pipe(
      tap((theme) => {
        this.applyThemeToDoc(theme);
      }),
    );
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
