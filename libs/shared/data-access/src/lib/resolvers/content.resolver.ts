import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { DocContent, Params } from '@iswavle/shared/utils';
import { DOCS_CONTENT_LOADER } from '../providers';

export const contentResolver: ResolveFn<DocContent | null> = (
  route: ActivatedRouteSnapshot,
) => {
  return inject(DOCS_CONTENT_LOADER).getContent(route.params as Params);
};
