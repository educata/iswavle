import { InjectionToken } from '@angular/core';
import { ContentLoader, ExercisesNavigation } from '@app-shared/interfaces';
import { ExercisesMapService } from '@app-shared/services';

export const EXERCISES_MAP = new InjectionToken<
  ContentLoader<ExercisesNavigation[]>
>('EXERCISES_MAP', {
  providedIn: 'root',
  factory: () => new ExercisesMapService(),
});
