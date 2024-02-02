import { ArticleAttributes } from '../../../../shared/interfaces';

export interface DocContent {
  attributes: ArticleAttributes;
  content: string;
}

export interface DocParams {
  section: string;
  subject: string;
  topic: string;
}

export interface DocsContentLoader {
  getContent(params: DocParams): Promise<DocContent | null>;
}
