export interface NavigationTreeNode {
  title: string;
  path: string;
  depricated?: boolean;
  children?: NavigationTreeNode[];
}
