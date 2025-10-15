import { InjectionToken } from '@angular/core';
import {
  BaseNavigationTreeNode,
  NavigationTreeNode,
} from '@app-shared/interfaces';
import { DEFAULT_DOC_NAVIGATION } from '@app-shared/consts';

export const DOC_NAVIGATION = new InjectionToken<NavigationTreeNode[]>(
  'DOC_NAVIGATION',
  {
    providedIn: 'root',
    factory: () => defaultNavigationFactory(DEFAULT_DOC_NAVIGATION),
  },
);

export function defaultNavigationFactory(
  baseNav: BaseNavigationTreeNode[],
): NavigationTreeNode[] {
  const dig = (
    nodes: BaseNavigationTreeNode[],
    parentBreadCrumb: string[] = [],
    parentRouterLink: string[] = ['/doc'],
  ) => {
    const mappedNav: NavigationTreeNode[] = [];

    nodes.forEach(({ title, path, children }) => {
      const breadCrumb = [...parentBreadCrumb, title];
      const routerLink = [...parentRouterLink, path];

      const mappedNode: NavigationTreeNode = {
        title,
        path,
        breadCrumb,
        routerLink,
      };

      if (children?.length) {
        mappedNode.children = dig(children, breadCrumb, routerLink);
      }
      mappedNav.push(mappedNode);
    });

    return mappedNav;
  };
  return dig(baseNav);
}
