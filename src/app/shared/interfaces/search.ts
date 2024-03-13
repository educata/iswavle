export interface IndexMap {
  [key: string]: IndexMapContent;
}

export interface IndexMapContent {
  title: string;
  content: string;
}

export interface IndexMapResult {
  title: string;
  routerLink: string;
  content: IndexMapResultContent[];
}

export interface IndexMapResultContent {
  data: string;
  highlight: boolean;
}
