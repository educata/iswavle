import { InjectionToken } from '@angular/core';
import { ContentLoader, ExercisesNavigation } from '@iswavle/shared/utils';
import { ExercisesMapService } from '../services';

export const EXERCISES_MAP = new InjectionToken<
  ContentLoader<ExercisesNavigation[]>
>('EXERCISES_MAP', {
  providedIn: 'root',
  factory: () => new ExercisesMapService(),
});
