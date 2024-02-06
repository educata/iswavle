import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map, combineLatest, firstValueFrom, catchError, EMPTY } from 'rxjs';
import { DocContent, DocParams, DocsContentLoader } from '../interfaces';
import { ArticleAttributes } from '../../../../shared/interfaces';

@Injectable()
export class ContentLoaderService implements DocsContentLoader {
  private readonly cache = new Map<string, Promise<DocContent | null>>();
  private readonly httpClient = inject(HttpClient);
  private readonly router = inject(Router);

  getContent(params: DocParams): Promise<DocContent | null> {
    const paths: string[] = [];
    Object.entries(params).forEach(([key, value]) => {
      paths[parseInt(key)] = value;
    });

    const path = `/assets/${paths.filter(Boolean).join('/')}`;
    if (!this.cache.has(path)) {
      this.cache.set(
        path,
        firstValueFrom(
          combineLatest([
            this.httpClient.get(`${path}.html`, {
              responseType: 'text',
            }),
            this.httpClient.get<ArticleAttributes>(`${path}.json`),
          ]).pipe(
            catchError((err) => {
              this.router.navigateByUrl('/404');
              return EMPTY;
            }),
            map(([content, attributes]) => ({ content, attributes })),
          ),
        ),
      );
    }
    return this.cache.get(path)!;
  }
}
