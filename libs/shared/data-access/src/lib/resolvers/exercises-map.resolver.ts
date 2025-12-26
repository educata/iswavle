import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { Params, ExercisesNavigation } from '@iswavle/shared/utils';
import { EXERCISES_MAP } from '../providers';

export const exercisesMapResolver: ResolveFn<ExercisesNavigation[] | null> = (
  route: ActivatedRouteSnapshot,
) => {
  return inject(EXERCISES_MAP).getContent(route.params as Params);
};
