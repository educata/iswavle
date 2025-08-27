import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { LocalStorageKeys } from '@app-shared/enums';
import {
  ExercisesNavigation,
  ExercisesTableData,
  ExerciseStorageContent,
} from '@app-shared/interfaces';

@Injectable({
  providedIn: 'root',
})
export class ExercisesService {
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  get storedExercises(): ExerciseStorageContent[] {
    const result: ExerciseStorageContent[] = [];

    if (!this.isBrowser) {
      return result;
    }

    for (const key in localStorage) {
      if (key.startsWith(LocalStorageKeys.ExercisePrefix)) {
        const data = localStorage.getItem(key);
        if (data) {
          result.push(JSON.parse(data));
        }
      }
    }

    return result;
  }

  getExerciseData(
    exercisesNavigation: ExercisesNavigation[],
  ): ExercisesTableData[] {
    const storedExercises = this.storedExercises;
    return exercisesNavigation.map((exercise) => {
      const storedExercise = storedExercises.find(
        (e) => e.path === exercise.path,
      );
      return {
        ...exercise,
        hasSolved: !!storedExercise?.hasSolved,
      };
    });
  }
}
