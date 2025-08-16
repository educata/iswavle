import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { EMPTY, catchError, firstValueFrom } from 'rxjs';
import { ExercisesMap, ContentLoader, Params } from '@app-shared/interfaces';

@Injectable()
export class ExercisesMapService implements ContentLoader<ExercisesMap> {
  private readonly cache = new Map<string, Promise<ExercisesMap | null>>();
  private readonly httpClient = inject(HttpClient);
  private readonly router = inject(Router);

  getContent(params: Params): Promise<ExercisesMap | null> {
    const path = `/assets/exercises-map.json`;
    if (!this.cache.has(path)) {
      this.cache.set(
        path,
        firstValueFrom(
          this.httpClient.get<ExercisesMap>(path).pipe(
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
