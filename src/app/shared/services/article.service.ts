import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationTreeNode } from '@app-shared/interfaces';
import { DOC_NAVIGATION } from '@app-shared/providers';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  private readonly router = inject(Router);
  private readonly docNavigation = inject(DOC_NAVIGATION);

  get navigationSection() {
    return this.router.url.slice(1).split('/')[1];
  }

  get navigation() {
    return this.docNavigation.find(
      (nav) => nav.path === this.navigationSection,
    );
  }

  get siblings() {
    return this.findSiblings(this.docNavigation, this.router.url);
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
          console.log(parentNode);
          if (node.children) {
            next = node.children[0];
          } else {
            const nextIndex = parentNode.indexOf(node) + 1;
            if (nextIndex < parentNode.length) {
              next = parentNode[nextIndex];
            }
          }
          console.log(prev, next);
        }
      },
    );

    return { prev, next };
  }
}
