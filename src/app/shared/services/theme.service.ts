import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { LocalStorageKeys, Theme } from '@app-shared/enums';
import { BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly platform = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platform);
  private readonly document = inject(DOCUMENT);
  readonly #theme$ = new BehaviorSubject<Theme>(Theme.Light);
  readonly theme$ = this.#theme$.asObservable();

  get theme() {
    return this.#theme$.value;
  }

  set theme(theme: Theme) {
    this.#theme$.next(theme);
  }

  init() {
    if (this.isBrowser) {
      const prevTheme = localStorage.getItem(
        LocalStorageKeys.Theme,
      ) as Theme | null;
      if (prevTheme) {
        this.theme = prevTheme;
      }
    }
    return this.#theme$.pipe(
      tap((theme) => {
        this.changeTheme(theme);
      }),
    );
  }

  changeTheme(theme: Theme) {
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
