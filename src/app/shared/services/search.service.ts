import { HttpClient } from '@angular/common/http';
import { Injectable, PLATFORM_ID, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { IndexMap } from '@app-shared/interfaces';
import {
  BehaviorSubject,
  EMPTY,
  catchError,
  from,
  switchMap,
  tap,
  timeout,
} from 'rxjs';
import { TTL_MS } from '@app-shared/consts';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private readonly http = inject(HttpClient);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);
  private worker?: Worker;

  readonly #indexMap$ = new BehaviorSubject<IndexMap | null>(null);
  readonly indexMap$ = this.#indexMap$.asObservable();

  readonly #search$ = new BehaviorSubject<string>('');
  readonly search$ = this.#search$.asObservable();

  readonly hasInitialized = signal(false);

  init() {
    if (this.isBrowser && !this.hasInitialized()) {
      this.hasInitialized.set(true);
      try {
        this.worker = new Worker(
          new URL('../../shared/workers/search-cache.worker', import.meta.url),
          { type: 'module' },
        );
        this.http
          .get<{ version?: string }>(`/assets/index-map.meta.json`, {
            headers: { 'cache-control': 'no-cache' },
          })
          .pipe(
            catchError(() => {
              return [{ version: undefined }];
            }),
            switchMap((meta) => {
              const version = meta?.version;
              if (this.worker) {
                const response$ = new Promise<IndexMap>((resolve, reject) => {
                  const handle = (evt: MessageEvent) => {
                    const msg = evt.data as
                      | { type: 'indexMap'; ok: true; data: IndexMap }
                      | { type: 'indexMap'; ok: false; error: string }
                      | undefined;
                    if (msg && msg.type === 'indexMap') {
                      this.worker?.removeEventListener('message', handle);
                      if (msg.ok) resolve(msg.data);
                      else reject(new Error(msg.error));
                    }
                  };
                  this.worker!.addEventListener('message', handle);
                  this.worker!.postMessage({
                    type: 'getIndexMap',
                    version,
                    ttlMs: TTL_MS,
                  });
                });
                return from(response$).pipe(
                  timeout({ first: 4000 }),
                  catchError(() => {
                    const v = version
                      ? `?v=${encodeURIComponent(version)}`
                      : '';
                    return this.http.get<IndexMap>(
                      `/assets/index-map.json${v}`,
                    );
                  }),
                );
              }

              const v = version ? `?v=${encodeURIComponent(version)}` : '';
              return this.http.get<IndexMap>(`/assets/index-map.json${v}`);
            }),
            tap((result) => this.#indexMap$.next(result)),
            catchError(() => EMPTY),
          )
          .subscribe();
      } catch (error) {
        console.error('❌ Error while initializing Web Worker:', error);
      }
    }
  }

  search(search: string) {
    this.#search$.next(search);
  }
}
