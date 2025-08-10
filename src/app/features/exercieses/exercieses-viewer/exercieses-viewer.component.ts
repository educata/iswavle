import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  signal,
  ViewChild,
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
import {
  NzCodeEditorComponent,
  NzCodeEditorModule,
} from 'ng-zorro-antd/code-editor';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'sw-exercieses-viewer',
  imports: [
    ReactiveFormsModule,
    ContentDirective,
    LoaderComponent,
    NzGridModule,
    NzResizableModule,
    NzLayoutModule,
    NzCodeEditorModule,
  ],
  templateUrl: './exercieses-viewer.component.html',
  styleUrl: './exercieses-viewer.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ExerciesesViewerComponent {
  @ViewChild(NzCodeEditorComponent) editor!: NzCodeEditorComponent;

  private readonly fb = inject(FormBuilder);
  private readonly layoutService = inject(LayoutService);
  private readonly activatedRoute = inject(ActivatedRoute);

  private readonly exerciesesContent$ = this.activatedRoute.data.pipe(
    map((response) => response['data'] as ExerciesesContent),
  );

  readonly codeGroup = this.fb.group({
    code: this.fb.control(''),
  });

  readonly col = signal(8);
  readonly id = signal(-1);
  readonly isWideScreen = this.layoutService.isWideScreen;
  readonly exerciesesContent = toSignal(this.exerciesesContent$);

  readonly directions: NzResizeHandleOption[] = [
    {
      direction: 'right',
      cursorType: 'grid',
    },
  ];

  constructor() {
    effect(() => {
      const exerciesesContent = this.exerciesesContent();
      if (exerciesesContent) {
        this.codeGroup.controls.code.setValue(exerciesesContent.data.starter);
        this.updateEditorLayout();
        // TODO: add page metadata
      }
    });
  }

  onResize(event: NzResizeEvent): void {
    const { col } = event;
    cancelAnimationFrame(this.id());
    this.updateEditorLayout();
    this.id.set(
      requestAnimationFrame(() => {
        this.col.set(col!);
      }),
    );
  }

  formatCode(): void {
    // It's hack to format document this way becouse ng-zorro decided to make editor instance private
    // @ts-ignore
    this.editor?.editorInstance?._actions
      .get('editor.action.formatDocument')
      .run();
  }

  runCode(): void {
    const code = this.codeGroup.controls.code.value;
    console.log(code);
  }

  private updateEditorLayout(): void {
    if (typeof this.editor?.layout === 'function') {
      this.editor.layout();
    }
  }
}
