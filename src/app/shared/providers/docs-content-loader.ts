import { InjectionToken, inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';

import { DocsContentLoader, DocContent, DocParams } from '../interfaces';
import { ContentLoaderService } from '../services';

export const DOCS_CONTENT_LOADER = new InjectionToken<DocsContentLoader>(
  'DOCS_CONTENT_LOADER',
  {
    providedIn: 'root',
    factory: () => new ContentLoaderService(),
  },
);

export const contentResolver: ResolveFn<DocContent | null> = (
  route: ActivatedRouteSnapshot,
) => {
  return inject(DOCS_CONTENT_LOADER).getContent(route.params as DocParams);
};
