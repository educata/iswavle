import { inject } from '@angular/core';
import { ResolveFn, ActivatedRouteSnapshot } from '@angular/router';
import { EXERCIESES_LOADER } from '@app-shared/providers';
import { Params, ExerciesesContent } from '@app-shared/interfaces';

export const exerciesesResolver: ResolveFn<ExerciesesContent | null> = (
  route: ActivatedRouteSnapshot,
) => {
  return inject(EXERCIESES_LOADER).getContent(route.params as Params);
};
