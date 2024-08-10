import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { LAYOUT_SIZES } from '@app-shared/providers';
import { debounceTime, fromEvent, map, startWith } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LayoutService {
  private readonly document = inject(DOCUMENT);
  readonly sizes = inject(LAYOUT_SIZES);

  readonly windowWidth$ = fromEvent(
    this.document.defaultView as Window,
    'resize',
  ).pipe(
    map((event) => (event.target as Window).innerWidth),
    startWith(this.document.body.clientWidth),
  );

  // Debounced to prevent performance issues when used with async pipe
  // Might not be necessary if component only uses signals
  windowWidthDebounced(debounce: number = 500) {
    return this.windowWidth$.pipe(debounceTime(debounce));
  }

  isWiderThan(toCompare: number, delay = 500) {
    return this.windowWidthDebounced(delay).pipe(
      map((width) => toCompare > width),
    );
  }

  isNarrowerThan(toCompare: number, delay = 500) {
    return this.windowWidthDebounced(delay).pipe(
      map((width) => toCompare < width),
    );
  }
}
