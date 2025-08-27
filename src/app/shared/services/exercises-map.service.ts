import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { EMPTY, catchError, firstValueFrom, map } from 'rxjs';
import {
  ExercisesMap,
  ContentLoader,
  Params,
  ExercisesNavigation,
} from '@app-shared/interfaces';
import { EXERCISES_NAVIGATION } from '@app-shared/providers';

@Injectable()
export class ExercisesMapService
  implements ContentLoader<ExercisesNavigation[]>
{
  private readonly cache = new Map<string, Promise<ExercisesNavigation[]>>();
  private readonly httpClient = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly exercisesNavigation = inject(EXERCISES_NAVIGATION);

  getContent(params: Params): Promise<ExercisesNavigation[]> {
    const path = `/assets/exercises-map.json`;
    if (!this.cache.has(path)) {
      this.cache.set(
        path,
        firstValueFrom(
          this.httpClient.get<ExercisesMap>(path).pipe(
            map((data) => {
              let index = 0;
              return this.exercisesNavigation.reduce((acc, navigation) => {
                if (data[navigation.path]) {
                  acc.push({
                    index: ++index,
                    path: navigation.path,
                    routerLink: `/exercises/${navigation.path}`,
                    ...data[navigation.path],
                  });
                }
                return acc;
              }, [] as ExercisesNavigation[]);
            }),
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
