import { NzGraphEdgeDef, NzGraphNodeDef } from 'ng-zorro-antd/graph';
import { DOC_NAVIGATION } from './doc-navigation';
import { InjectionToken, inject } from '@angular/core';
import { NavigationTreeNode } from '@app-shared/interfaces';
import { Roadmap, RoadmapPart } from '@app-shared/interfaces/roadmap';

export const ROADMAP_NAVIGATION = new InjectionToken<Roadmap>(
  'ROADMAP_NAVIGATION',
  {
    providedIn: 'root',
    factory: () => roadmapNavigationFactory(),
  },
);

export function roadmapNavigationFactory() {
  // TODO: Filter data based on route, in future we will have more than FE
  const docNavigation = inject(DOC_NAVIGATION);
  const nodes: NzGraphNodeDef[] = []; // for unique node
  const edges: NzGraphEdgeDef[] = []; // for unique connection where v is parent and w is child
  const parentParts: RoadmapPart[] = [];

  let index = 0;

  const flatter = (
    node: NavigationTreeNode,
    parent: number = -1,
    depth = 0,
  ) => {
    let nzNode: NzGraphNodeDef = {
      id: index++,
      label: node.title,
      width: node.title.length * 8 + 10,
      description: node.description,
      routerLink: node.routerLink || [],
      parent,
      depth,
    };

    let nzEdge: NzGraphEdgeDef = {
      v: parent,
      w: nzNode.id,
      depth,
    };

    nodes.push(nzNode);

    if (parent !== -1) {
      edges.push(nzEdge);
    }

    if (depth === 1) {
      parentParts.push({
        depth,
        parent: nzNode.id,
        title: node.title,
      });
    }

    if (node.children) {
      node.children.forEach((child) => {
        flatter(child, nzNode.id, depth + 1);
      });
    }
  };

  docNavigation.forEach((child) => {
    flatter(child);
  });

  return {
    parentParts,
    graphData: {
      nodes,
      edges,
    },
  };
}
