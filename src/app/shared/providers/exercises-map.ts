import { InjectionToken } from '@angular/core';
import { ExercisesMap, ContentLoader } from '@app-shared/interfaces';
import { ExercisesMapService } from '@app-shared/services';

export const EXERCISES_MAP = new InjectionToken<ContentLoader<ExercisesMap>>(
  'EXERCISES_MAP',
  {
    providedIn: 'root',
    factory: () => new ExercisesMapService(),
  },
);
