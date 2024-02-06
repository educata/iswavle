import { ArticleAttributes } from '../../../../shared/interfaces';

export interface DocContent {
  attributes: ArticleAttributes;
  content: string;
}

export type DocParams = Record<string, string>;

export interface DocsContentLoader {
  getContent(params: DocParams): Promise<DocContent | null>;
}
