import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { combineLatest, firstValueFrom, catchError, EMPTY, map } from 'rxjs';
import { ContentLoader, Params } from '@app-shared/interfaces';
import { ExercisesContent } from '@app-shared/interfaces';

@Injectable()
export class ExercisesLoaderService implements ContentLoader<ExercisesContent> {
  private readonly cache = new Map<string, Promise<ExercisesContent | null>>();
  private readonly httpClient = inject(HttpClient);
  private readonly router = inject(Router);

  getContent(params: Params): Promise<ExercisesContent | null> {
    const exercisesName = params['exercises_name'];
    const path = `/assets/exercises/${exercisesName}`;
    if (!this.cache.has(path)) {
      this.cache.set(
        path,
        firstValueFrom(
          combineLatest([
            this.httpClient.get(`${path}/description.html`, {
              responseType: 'text',
            }),
            this.httpClient.get<Record<string, any>>(
              `${path}/description.json`,
            ),
          ]).pipe(
            catchError(() => {
              this.router.navigateByUrl('/404');
              return EMPTY;
            }),
            map(([content, json]) => {
              return {
                content,
                data: {
                  starter: json['starter'],
                  testCases: json['testCases'],
                  attributes: json['attributes'],
                },
              };
            }),
          ),
        ),
      );
    }

    return this.cache.get(path)!;
  }
}
