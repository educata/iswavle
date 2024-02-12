import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { DocContent, Params } from '@app-shared/interfaces';
import { DOCS_CONTENT_LOADER } from '@app-shared/providers';

export const contentResolver: ResolveFn<DocContent | null> = (
  route: ActivatedRouteSnapshot,
) => {
  return inject(DOCS_CONTENT_LOADER).getContent(route.params as Params);
};
