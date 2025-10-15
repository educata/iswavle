import { inject } from '@angular/core';
import { ResolveFn, ActivatedRouteSnapshot } from '@angular/router';
import { EXERCISES_LOADER } from '@app-shared/providers';
import { Params, ExercisesContent } from '@app-shared/interfaces';

export const exercisesResolver: ResolveFn<ExercisesContent | null> = (
  route: ActivatedRouteSnapshot,
) => {
  return inject(EXERCISES_LOADER).getContent(route.params as Params);
};
