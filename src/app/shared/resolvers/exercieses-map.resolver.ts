import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { Params, ExerciesesMap } from '@app-shared/interfaces';
import { EXERCIESES_MAP } from '@app-shared/providers';

export const exerciesesMapResolver: ResolveFn<ExerciesesMap | null> = (
  route: ActivatedRouteSnapshot,
) => {
  return inject(EXERCIESES_MAP).getContent(route.params as Params);
};
