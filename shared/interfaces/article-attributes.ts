export interface ArticleAttributes {
  title: string;
  description: string;
  toc: ArticleToc[];
  cover?: string;
  slug?: string;
  keywords?: string;
  depricated?: boolean;
  headings?: string[];
  codes?: string[];
}

export interface ArticleToc {
  title: string;
  id: string;
  sub?: { id: string; title: string }[]; // no recursion
}
