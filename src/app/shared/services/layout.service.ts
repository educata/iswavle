import { Injectable, computed, inject, signal, DOCUMENT } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { LAYOUT_SIZES } from '@app-shared/providers';
import { fromEvent, map, startWith } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LayoutService {
  private readonly document = inject(DOCUMENT);
  readonly sizes = inject(LAYOUT_SIZES);

  readonly #windowWidth = signal<number>(this.document.body.clientWidth);

  get windowWidth() {
    return this.#windowWidth.asReadonly();
  }

  readonly isWideScreen = computed(
    () => this.windowWidth() > this.sizes.header,
  );

  constructor() {
    fromEvent(this.document.defaultView as Window, 'resize')
      .pipe(
        takeUntilDestroyed(),
        map((event) => (event.target as Window).innerWidth),
        startWith(this.document.body.clientWidth),
      )
      .subscribe((width) => this.#windowWidth.set(width));
  }

  isWiderThan(toCompare: number) {
    return computed(() => this.windowWidth() > toCompare);
  }

  isNarrowerThan(toCompare: number) {
    return computed(() => this.windowWidth() < toCompare);
  }
}
