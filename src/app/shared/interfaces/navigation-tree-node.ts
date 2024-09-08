export interface BaseNavigationTreeNode {
  title: string;
  path: string;
  depricated?: boolean;
  children?: BaseNavigationTreeNode[];
  description?: string;
}

export interface NavigationTreeNode extends BaseNavigationTreeNode {
  routerLink: string[];
  breadCrumb: string[];
  children?: NavigationTreeNode[];
  isActive?: boolean;
}
