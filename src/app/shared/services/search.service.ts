import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { IndexMap } from '@app-shared/interfaces';
import { BehaviorSubject, EMPTY, catchError, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private readonly http = inject(HttpClient);

  readonly #indexMap$ = new BehaviorSubject<IndexMap | null>(null);
  readonly indexMap$ = this.#indexMap$.asObservable();

  readonly #search$ = new BehaviorSubject<string>('');
  readonly search$ = this.#search$.asObservable();

  init() {
    this.http
      .get<IndexMap>(`/assets/index-map.json`)
      .pipe(
        tap((result) => {
          this.#indexMap$.next(result);
        }),
        catchError(() => {
          return EMPTY;
        }),
      )
      .subscribe();
  }

  search(search: string) {
    this.#search$.next(search);
  }
}
