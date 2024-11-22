import { NzGraphDataDef, NzGraphNodeDef } from 'ng-zorro-antd/graph';

export interface Roadmap {
  graphData: NzGraphDataDef;
  parentParts: RoadmapPart[];
}

export interface RoadmapPart {
  title: string;
  depth: number;
  parent: number;
  grandpa: number;
}

export interface RoadmapDrawer {
  show: boolean;
  node: NzGraphNodeDef;
}
