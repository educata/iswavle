import { BuildHook } from '@global-shared/interfaces';

export const SITEMAP_HOOK = (): BuildHook => {
  return {
    name: 'sitemap',
    onStart: async () => {
      console.log('Sitemap generation started');
    },
    onFile: async (meta, content) => {
      console.log(meta);
    },
    onEnd: async () => {
      console.log('Sitemap generation finished');
    },
    onError: async (error) => {
      console.error('Error occurred during sitemap generation:', error);
    },
  };
};
