import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { LayoutService } from '@app-shared/services';
import { NzGridModule } from 'ng-zorro-antd/grid';
import {
  NzResizableModule,
  NzResizeEvent,
  NzResizeHandleOption,
} from 'ng-zorro-antd/resizable';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { ExerciesesContent } from '@app-shared/interfaces/exercieses';
import { LoaderComponent } from '@app-shared/ui';
import { ContentDirective } from '@app-shared/directives';
import { map } from 'rxjs';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
@Component({
  selector: 'sw-exercieses-viewer',
  imports: [
    ContentDirective,
    LoaderComponent,
    NzGridModule,
    NzResizableModule,
    NzLayoutModule,
  ],
  templateUrl: './exercieses-viewer.component.html',
  styleUrl: './exercieses-viewer.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ExerciesesViewerComponent {
  private readonly layoutService = inject(LayoutService);
  private readonly activatedRoute = inject(ActivatedRoute);

  private readonly exerciesesContent$ = this.activatedRoute.data.pipe(
    map((response) => response['data'] as ExerciesesContent),
  );

  readonly exerciesesContent = toSignal(this.exerciesesContent$);

  readonly directions: NzResizeHandleOption[] = [
    {
      direction: 'right',
      cursorType: 'grid',
    },
  ];

  readonly col = signal(8);
  readonly id = signal(-1);
  readonly isWideScreen = this.layoutService.isWideScreen;

  onResize(event: NzResizeEvent): void {
    const { col } = event;
    cancelAnimationFrame(this.id());
    this.id.set(
      requestAnimationFrame(() => {
        this.col.set(col!);
      }),
    );
  }
}
