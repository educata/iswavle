import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { IndexMap, IndexMapResult } from '@app-shared/interfaces';
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

  readonly cache = new Map<string, IndexMapResult[]>();

  constructor() {
    this.init();
  }

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

  getCache(word: string) {
    return this.cache.get(word);
  }

  setCache(word: string, result: IndexMapResult[]) {
    this.cache.set(word, result);
  }
}
