import { Pipe, PipeTransform } from '@angular/core';
import { DIFFICULTY_TEXT } from '@iswavle/shared/utils';

@Pipe({
  name: 'exerciseDifficulty',
  standalone: true,
})
export class ExerciseDifficultyPipe implements PipeTransform {
  transform(difficulty: keyof typeof DIFFICULTY_TEXT): string {
    return DIFFICULTY_TEXT[difficulty];
  }
}
