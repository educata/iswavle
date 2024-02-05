import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map, combineLatest, firstValueFrom } from 'rxjs';
import { DocContent, DocParams, DocsContentLoader } from '../interfaces';
import { ArticleAttributes } from '../../../../shared/interfaces';

@Injectable()
export class ContentLoaderService implements DocsContentLoader {
  private readonly cache = new Map<string, Promise<DocContent | null>>();
  private readonly httpClient = inject(HttpClient);
  private readonly router = inject(Router);

  getContent({
    section,
    subject,
    topic,
  }: DocParams): Promise<DocContent | null> {
    const paths = [section, subject, topic].filter(Boolean);
    const path = `/assets/${paths.join('/')}`;
    if (!this.cache.has(path)) {
      try {
        this.cache.set(
          path,
          firstValueFrom(
            combineLatest([
              this.httpClient.get(`${path}.html`, {
                responseType: 'text',
              }),
              this.httpClient.get<ArticleAttributes>(`${path}.json`),
            ]).pipe(map(([content, attributes]) => ({ content, attributes }))),
          ),
        );
      } catch {
        this.router.navigateByUrl('/404');
      }
    }
    return this.cache.get(path)!;
  }
}
