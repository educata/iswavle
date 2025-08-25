import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { Params, ExercisesNavigation } from '@app-shared/interfaces';
import { EXERCISES_MAP } from '@app-shared/providers';

export const exercisesMapResolver: ResolveFn<ExercisesNavigation[] | null> = (
  route: ActivatedRouteSnapshot,
) => {
  return inject(EXERCISES_MAP).getContent(route.params as Params);
};
