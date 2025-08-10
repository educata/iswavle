export type ExerciesesDifficulty = 'easy' | 'medium' | 'hard';

export interface ExerciesesAttributes {
  title: string;
  description: string;
  difficulty: ExerciesesDifficulty;
  tags: string[];
  image?: string;
  keywords?: string;
}
