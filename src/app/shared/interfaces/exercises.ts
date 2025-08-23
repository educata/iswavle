import { ExercisesAttributes } from '@global-shared/interfaces';

export type ExercisesMap = Record<string, ExercisesAttributes>;

export interface ExercisesTableData extends ExercisesAttributes {
  fileName: string;
  routerLink: string;
}

export interface ExercisesInput {
  name: string;
  value: unknown;
}

export interface ExercisesTestCase {
  input: ExercisesInput[];
  expected: unknown;
}

export interface ExercisesContent {
  content: string;
  data: {
    starter: string;
    testCases: ExercisesTestCase[];
    attributes: ExercisesAttributes;
  };
}

export interface ExercisesExecutionData {
  code: string;
  testCases: ExercisesTestCase[];
  starter: string;
}

export interface ExercisesExecutionResult {
  inputs: ExercisesInput[];
  output: unknown;
  expected: unknown;
  runtime: number;
  passed: boolean;
  error: string | null;
  logs: string[];
}

export interface ExercisesExecutionResultError {
  criticalError: string;
  logs: string[];
}
