export type Params = Record<string, string>;

export interface ContentLoader<T> {
  getContent(params: Params): Promise<T | null>;
}
