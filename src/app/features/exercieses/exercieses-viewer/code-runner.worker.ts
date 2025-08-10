/// <reference lib="webworker" />

import {
  ExerciesesExecutionData,
  ExerciesesExecutionResult,
} from '@app-shared/interfaces';

addEventListener('message', ({ data }) => {
  const { code, testCases, starter } = data as ExerciesesExecutionData;
  const results: ExerciesesExecutionResult[] = [];

  try {
    const match = starter.match(/^[\s\S]*?function\s+([a-zA-Z0-9_$]+)\s*\(/m);
    const functionName = match?.[1] || '';
    new Function(code)();

    const userFunction = new Function(`${code}; return ${functionName};`)();

    if (typeof userFunction !== 'function') {
      postMessage({
        criticalError: `Function "${functionName}" is not defined or is not a function.`,
      });
      return;
    }

    for (const testCase of testCases) {
      const start = performance.now();
      let output: unknown = null;
      let error: string | null = null;

      try {
        const args = testCase.input.map((i) => i.value);
        output = userFunction(...args);
      } catch (error) {
        error = error instanceof Error ? error.message : String(error);
      }

      const end = performance.now();
      const runtime = end - start;

      results.push({
        error,
        runtime,
        inputs: testCase.input,
        output,
        expected: testCase.expected,
        passed: passed(output, testCase.expected),
      });
    }
    postMessage({
      results,
    });
  } catch (error) {
    postMessage({
      criticalError: error,
    });
  }
});

function passed(output: unknown, expected: unknown): boolean {
  const isComplexValue =
    typeof output === 'object' || typeof expected === 'object';

  if (isComplexValue) {
    return JSON.stringify(output) === JSON.stringify(expected);
  }

  return output === expected;
}
