import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'exerciseDifficulty',
  standalone: true,
})
export class ExerciseDifficultyPipe implements PipeTransform {
  transform(difficulty: string): string {
    return difficulty === 'easy'
      ? 'მარტივი'
      : difficulty === 'medium'
        ? 'საშუალო'
        : 'რთული';
  }
}
