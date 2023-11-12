export interface FrontMatter<T = object> {
  attributes: T;
  body: string;
  bodyBegin: number;
  frontMatter: string;
}
