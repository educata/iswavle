export interface IndexMap {
  [key: string]: IndexMapContent;
}

export interface IndexMapContent {
  title: string;
  content: string;
}

export interface IndexMapResult {
  routerLink: string;
  title: IndexMapResultContent[];
  content: IndexMapResultContent[];
}

export interface IndexMapResultContent {
  data: string;
  highlight: boolean;
}
