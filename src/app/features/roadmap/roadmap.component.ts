import { AsyncPipe, isPlatformBrowser } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  inject,
  Component,
  ViewChild,
  PLATFORM_ID,
  ChangeDetectionStrategy,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  tap,
  map,
  delay,
  switchMap,
  combineLatest,
  BehaviorSubject,
} from 'rxjs';
import {
  NzGraphData,
  NzRankDirection,
  NzGraphComponent,
  NzGraphZoomDirective,
} from 'ng-zorro-antd/graph';
import { NzGraphModule } from 'ng-zorro-antd/graph';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzLayoutComponent } from 'ng-zorro-antd/layout';
import { LoaderComponent } from '@app-shared/ui';
import { ROADMAP_NAVIGATION } from '@app-shared/providers';
import { RoadmapDrawer, RoadmapPart } from '@app-shared/interfaces/roadmap';

@Component({
  selector: 'sw-roadmap',
  standalone: true,
  imports: [
    NzGraphModule,
    NzButtonModule,
    NzDrawerModule,
    NzGraphComponent,
    NzGraphZoomDirective,
    NzLayoutComponent,
    LoaderComponent,
    RouterLink,
    AsyncPipe,
  ],
  templateUrl: './roadmap.component.html',
  styleUrl: './roadmap.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class RoadmapComponent {
  @ViewChild(NzGraphComponent) nzGraphComponent!: NzGraphComponent;
  @ViewChild(NzGraphZoomDirective) zoomController!: NzGraphZoomDirective;

  readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  readonly roadmapNavigationBase = inject(ROADMAP_NAVIGATION);

  readonly ZOOM_MS = 500;
  readonly subjects = this.roadmapNavigationBase.parentParts;
  readonly directions: NzRankDirection[] = ['LR', 'RL', 'TB', 'BT'];

  readonly part$ = new BehaviorSubject<RoadmapPart | null>(null);
  readonly drawer$ = new BehaviorSubject<RoadmapDrawer | null>(null);
  readonly direction$ = new BehaviorSubject<NzRankDirection>(
    this.directions[0],
  );

  readonly roadmapNavigation$ = this.part$.pipe(
    map(
      (part) =>
        new NzGraphData(
          part
            ? this.buildGraphData(part)
            : this.roadmapNavigationBase.graphData,
        ),
    ),
  );

  readonly vm$ = combineLatest([
    this.part$,
    this.drawer$,
    this.direction$,
    this.roadmapNavigation$,
  ]).pipe(
    map(([part, drawer, direction, roadmapNavigation]) => ({
      part,
      drawer,
      direction,
      roadmapNavigation,
    })),
  );

  readonly focus$ = combineLatest([
    this.direction$,
    this.roadmapNavigation$,
  ]).pipe(switchMap(() => this.part$));

  constructor() {
    if (this.isBrowser) {
      this.focus$
        .pipe(
          takeUntilDestroyed(),
          delay(this.ZOOM_MS),
          tap((part) => {
            this.zoomController?.focus(part?.parent || 0, this.ZOOM_MS * 2);
          }),
        )
        .subscribe();
    }
  }

  graphInitialized() {
    this.zoomController?.focus(0, this.ZOOM_MS * 2);
  }

  private buildGraphData(part: RoadmapPart) {
    return {
      nodes: this.roadmapNavigationBase.graphData.nodes.filter(
        (node) =>
          node.id === part.parent ||
          node['parent'] === part.parent ||
          node['grandpa'] === part.parent,
      ),
      edges: this.roadmapNavigationBase.graphData.edges.filter(
        (node) => node.v === part.parent || node['grandpa'] === part.parent,
      ),
    };
  }
}
