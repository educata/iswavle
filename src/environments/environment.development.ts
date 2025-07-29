import { Environment } from '@app-shared/interfaces';

export const environment: Environment = {
  production: false,
  baseURL: 'http://localhost:4200',
  examplesURL: 'http://localhost:4200/assets/dev',
  commentsRepo: 'educata/iswavle-comments',
  githubRepoURL: 'https://github.com/educata/iswavle',
  utterancClientCDN: 'https://utteranc.es/client.js',
};
