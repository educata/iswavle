import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { DocContent, Params } from '../interfaces';
import { DOCS_CONTENT_LOADER } from '../providers';
import { inject } from '@angular/core';

export const contentResolver: ResolveFn<DocContent | null> = (
  route: ActivatedRouteSnapshot,
) => {
  return inject(DOCS_CONTENT_LOADER).getContent(route.params as Params);
};
