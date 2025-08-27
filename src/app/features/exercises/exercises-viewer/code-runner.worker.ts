/// <reference lib="webworker" />

import {
  ExercisesExecutionData,
  ExercisesExecutionResult,
} from '@app-shared/interfaces';
import { UTILS, buildTree } from '@app-shared/utils';

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

    const globals = Object.keys(UTILS).join(',');
    const values = Object.values(UTILS);

    const userFunction = new Function(
      globals,
      `${code}; return ${functionName};`,
    )(...values);

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
      let output: unknown = null;
      let error: string | null = null;

      try {
        const args = testCase.input.map((i) => {
          if (i.name === 'root' && code.includes('TreeNode')) {
            return buildTree(i.value as number[]);
          }
          return i.value;
        });

        output = userFunction(...args);
      } catch (error) {
        postMessage({
          logs: [...logs],
          criticalError: error instanceof Error ? error.message : String(error),
        });
        return;
      }

      const end = Date.now();
      const runtime = end - start;

      results.push({
        error,
        output,
        runtime,
        logs: [...logs],
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
    postMessage({
      criticalError: error instanceof Error ? error.message : String(error),
      logs: [...logs],
    });
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
