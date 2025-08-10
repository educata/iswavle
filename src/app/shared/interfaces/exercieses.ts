import { ExerciesesAttributes } from '@global-shared/interfaces';

export interface ExerciesesInput {
  name: string;
  value: unknown;
}

export interface ExerciesesExpectedResult {
  type: string;
  value: string;
}

export interface ExerciesesTestCase {
  input: ExerciesesInput;
  expectedResult: ExerciesesExpectedResult;
}

export interface ExerciesesContent {
  content: string;
  data: {
    starter: string;
    testCases: ExerciesesTestCase[];
    attributes: ExerciesesAttributes;
  };
}
