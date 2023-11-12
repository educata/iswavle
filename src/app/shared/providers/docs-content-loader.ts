import { InjectionToken, inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';

import { DocsContentLoader, DocContent, DocParams } from '../interfaces';

export const DOCS_CONTENT_LOADER = new InjectionToken<DocsContentLoader>(
  'DOCS_CONTENT_LOADER',
);

export const contentResolver: ResolveFn<DocContent | null> = (
  route: ActivatedRouteSnapshot,
) => {
  return inject(DOCS_CONTENT_LOADER).getContent(route.params as DocParams);
};
