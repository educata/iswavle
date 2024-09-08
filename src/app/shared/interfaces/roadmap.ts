import { NzGraphDataDef, NzGraphNodeDef } from 'ng-zorro-antd/graph';

export interface Roadmap {
  graphData: NzGraphDataDef;
  parentParts: RoadmapPart[];
}

export interface RoadmapPart {
  depth: number;
  parent: number;
  title: string;
}

export interface RoadmapDrawer {
  show: boolean;
  node: NzGraphNodeDef;
}
