import { NgTemplateOutlet } from '@angular/common';
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
@Component({
  selector: 'sw-exercieses-viewer',
  imports: [NzGridModule, NzResizableModule],
  templateUrl: './exercieses-viewer.component.html',
  styleUrl: './exercieses-viewer.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExerciesesViewerComponent {
  private readonly layoutService = inject(LayoutService);

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
