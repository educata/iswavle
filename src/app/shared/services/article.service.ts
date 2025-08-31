import { Injectable, inject } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { NavigationTreeNode } from '@app-shared/interfaces';
import { DOC_NAVIGATION } from '@app-shared/providers';
import { filter, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  private readonly router = inject(Router);
  private readonly docNavigation = inject(DOC_NAVIGATION);
  private readonly currentUrl$ = this.router.events.pipe(
    filter((event) => event instanceof NavigationEnd),
    map(() => this.router.url),
  );

  get navigationSection() {
    let currentUrl = this.router.url;

    if (currentUrl.includes('#')) {
      currentUrl = currentUrl.split('#')[0];
    }

    return currentUrl.slice(1).split('/')[1];
  }

  get navigation$() {
    return this.currentUrl$.pipe(
      map((url) => {
        const navigation = this.docNavigation.find(
          (nav) => nav.path === this.navigationSection,
        );

        if (navigation) {
          navigation.children?.map((subject) => {
            subject.isActive = url.includes(subject.routerLink.join('/'));
          });
        }

        return navigation;
      }),
    );
  }

  get siblings$() {
    return this.currentUrl$.pipe(
      map((url) => this.findSiblings(this.docNavigation, url)),
    );
  }

  traverseTree(
    nodes: NavigationTreeNode[],
    callback: (
      node: NavigationTreeNode,
      parentNode: NavigationTreeNode[],
    ) => void,
  ) {
    for (const node of nodes) {
      callback(node, nodes);
      if (node.children) {
        this.traverseTree(node.children, callback);
      }
    }
  }

  findSiblings(
    root: NavigationTreeNode[],
    url: string,
  ): { prev: NavigationTreeNode | null; next: NavigationTreeNode | null } {
    let prev: NavigationTreeNode | null = null;
    let next: NavigationTreeNode | null = null;
    let found = false;

    this.traverseTree(
      root,
      (node: NavigationTreeNode, parentNode: NavigationTreeNode[]) => {
        if (found) return;

        if (node.routerLink.join('/') === url) {
          found = true;

          const prevIndex = parentNode.indexOf(node) - 1;

          if (prevIndex >= 0) {
            prev = parentNode[prevIndex];
          }

          if (node.children) {
            next = node.children[0];
          } else {
            const nextIndex = parentNode.indexOf(node) + 1;
            if (nextIndex < parentNode.length) {
              next = parentNode[nextIndex];
            }
          }
        }
      },
    );

    return { prev, next };
  }
}
