import {
  Injectable,
  computed,
  inject,
  signal,
  DOCUMENT,
  PLATFORM_ID,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { isPlatformBrowser } from '@angular/common';
import { LAYOUT_SIZES } from '@app-shared/providers';
import { fromEvent, map, startWith } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LayoutService {
  private readonly document = inject(DOCUMENT);
  private readonly platform = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platform);
  readonly sizes = inject(LAYOUT_SIZES);

  readonly #windowWidth = signal<number>(this.sizes.header + 1);

  get windowWidth() {
    return this.#windowWidth.asReadonly();
  }

  readonly isWideScreen = computed(
    () => this.windowWidth() > this.sizes.header,
  );

  constructor() {
    if (this.isBrowser) {
      this.#windowWidth.set(
        this.document.defaultView?.innerWidth || this.sizes.header + 1,
      );

      fromEvent(this.document.defaultView as Window, 'resize')
        .pipe(
          takeUntilDestroyed(),
          map((event) => (event.target as Window).innerWidth),
        )
        .subscribe((width) => this.#windowWidth.set(width));
    }
  }

  isWiderThan(toCompare: number) {
    return computed(() => this.windowWidth() > toCompare);
  }

  isNarrowerThan(toCompare: number) {
    return computed(() => this.windowWidth() < toCompare);
  }
}
