import { ExerciesesAttributes } from '@global-shared/interfaces';

export type ExerciesesMap = Record<string, ExerciesesAttributes>;

export interface ExerciesesTableData extends ExerciesesAttributes {
  fileName: string;
  routerLink: string;
}

export interface ExerciesesInput {
  name: string;
  value: unknown;
}

export interface ExerciesesTestCase {
  input: ExerciesesInput[];
  expected: unknown;
}

export interface ExerciesesContent {
  content: string;
  data: {
    starter: string;
    testCases: ExerciesesTestCase[];
    attributes: ExerciesesAttributes;
  };
}

export interface ExerciesesExecutionData {
  code: string;
  testCases: ExerciesesTestCase[];
  starter: string;
}

export interface ExerciesesExecutionResult {
  inputs: ExerciesesInput[];
  output: unknown;
  expected: unknown;
  runtime: number;
  passed: boolean;
  error: string | null;
}

export interface ExerciesesExecutionResultError {
  criticalError: string;
}
