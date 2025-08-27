export type ExercisesDifficulty = 'easy' | 'medium' | 'hard';

export interface ExercisesAttributes {
  title: string;
  description: string;
  difficulty: ExercisesDifficulty;
  tags: string[];
  image?: string;
  keywords?: string;
}
