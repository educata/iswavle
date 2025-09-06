import { BuildHook } from '@global-shared/interfaces';

export const EXERCISE_HOOK = (): BuildHook => {
  return {
    name: 'exercise',
    onStart: () => {},
    onFile: async (meta, content) => {},
    onEnd: () => {},
    onError: (error, meta) => {},
  };
};
