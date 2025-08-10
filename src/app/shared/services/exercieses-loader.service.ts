import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { combineLatest, firstValueFrom, catchError, EMPTY, map } from 'rxjs';
import { ContentLoader, Params } from '@app-shared/interfaces';
import { ExerciesesContent } from '@app-shared/interfaces/exercieses';

@Injectable()
export class ExerciesesLoaderService
  implements ContentLoader<ExerciesesContent>
{
  private readonly cache = new Map<string, Promise<ExerciesesContent | null>>();
  private readonly httpClient = inject(HttpClient);
  private readonly router = inject(Router);

  getContent(params: Params): Promise<ExerciesesContent | null> {
    const exerciesesName = params['exercieses_name'];
    const path = `/assets/exercieses/${exerciesesName}`;
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
