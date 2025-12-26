export interface TocItem {
  id: string;
  title: string;
  sub?: { id: string; title: string }[]; // only 1 depth
}
