import { InjectionToken } from '@angular/core';
import { ContentLoader } from '@app-shared/interfaces';
import { ExercisesContent } from '@app-shared/interfaces';
import { ExercisesLoaderService } from '@app-shared/services';

export const EXERCISES_LOADER = new InjectionToken<
  ContentLoader<ExercisesContent>
>('EXERCISES_LOADER', {
  providedIn: 'root',
  factory: () => new ExercisesLoaderService(),
});
