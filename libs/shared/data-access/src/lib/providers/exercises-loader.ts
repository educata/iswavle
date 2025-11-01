import { InjectionToken } from '@angular/core';
import { ContentLoader } from '@iswavle/shared/utils';
import { ExercisesContent } from '@iswavle/shared/utils';
import { ExercisesLoaderService } from '../services';

export const EXERCISES_LOADER = new InjectionToken<
  ContentLoader<ExercisesContent>
>('EXERCISES_LOADER', {
  providedIn: 'root',
  factory: () => new ExercisesLoaderService(),
});
