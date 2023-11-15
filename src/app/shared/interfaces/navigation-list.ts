export interface NavigationListItem {
  title: string;
  path: string;
  depricated?: boolean;
}

export interface NavigationSubject {
  title: string;
  path: string;
  items: NavigationListItem[];
}

export interface NavigationListSection {
  title: string;
  path: string;
  items: NavigationSubject[];
}

export type NavigationList = NavigationListSection[];
