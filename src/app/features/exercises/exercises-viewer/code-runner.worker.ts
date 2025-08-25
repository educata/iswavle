/// <reference lib="webworker" />

import {
  ExercisesExecutionData,
  ExercisesExecutionResult,
} from '@app-shared/interfaces';

addEventListener('message', ({ data }) => {
  const { code, testCases, starter } = data as ExercisesExecutionData;
  const results: ExercisesExecutionResult[] = [];

  const logs: string[] = [];

  const originalConsoleLog = console.log;
  console.log = new Proxy(console.log, {
    apply(target, thisArg, args) {
      const message = args
        .map((a) => (typeof a === 'object' ? JSON.stringify(a) : String(a)))
        .join(' ');
      logs.push(message);
      return originalConsoleLog.apply(thisArg, args);
    },
  });

  try {
    const match = starter.match(/^[\s\S]*?function\s+([a-zA-Z0-9_$]+)\s*\(/m);
    const functionName = match?.[1] || '';
    new Function(code)();

    const userFunction = new Function(`${code}; return ${functionName};`)();

    if (typeof userFunction !== 'function') {
      postMessage({
        logs: [...logs],
        criticalError: `Function "${functionName}" is not defined or is not a function.`,
      });
      logs.splice(0);
      return;
    }

    for (const testCase of testCases) {
      const start = Date.now();
      let output: unknown = undefined;
      let errorMessage: string | null = null;

      try {
        const args = testCase.input.map((i) => i.value);
        output = userFunction(...args);
      } catch (error) {
        errorMessage = error instanceof Error ? error.message : String(error);
      }

      const end = Date.now();
      const runtime = end - start;

      results.push({
        output,
        runtime,
        logs: [...logs],
        error: errorMessage,
        inputs: testCase.input,
        expected: testCase.expected,
        passed: passed(output, testCase.expected),
      });

      logs.splice(0);
    }
    postMessage({
      results,
    });
  } catch (error) {
    postMessage(
      testCases?.map((testCase) => ({
        inputs: [],
        output: undefined,
        expected: testCase.expected,
        runtime: 0,
        passed: false,
        logs: [],
        error: (error as Error).message,
      })) || null,
    );
    logs.splice(0);
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
