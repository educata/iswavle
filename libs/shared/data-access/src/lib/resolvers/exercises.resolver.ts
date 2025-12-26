import { inject } from '@angular/core';
import { ResolveFn, ActivatedRouteSnapshot } from '@angular/router';
import { EXERCISES_LOADER } from '../providers';
import { Params, ExercisesContent } from '@iswavle/shared/utils';

export const exercisesResolver: ResolveFn<ExercisesContent | null> = (
  route: ActivatedRouteSnapshot,
) => {
  return inject(EXERCISES_LOADER).getContent(route.params as Params);
};
