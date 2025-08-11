import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { EMPTY, catchError, firstValueFrom } from 'rxjs';
import { ExerciesesMap, ContentLoader, Params } from '@app-shared/interfaces';

@Injectable()
export class ExerciesesMapService implements ContentLoader<ExerciesesMap> {
  private readonly cache = new Map<string, Promise<ExerciesesMap | null>>();
  private readonly httpClient = inject(HttpClient);
  private readonly router = inject(Router);

  getContent(params: Params): Promise<ExerciesesMap | null> {
    const path = `/assets/exercieses-map.json`;
    if (!this.cache.has(path)) {
      this.cache.set(
        path,
        firstValueFrom(
          this.httpClient.get<ExerciesesMap>(path).pipe(
            catchError(() => {
              this.router.navigateByUrl('/404');
              return EMPTY;
            }),
          ),
        ),
      );
    }
    return this.cache.get(path)!;
  }
}
