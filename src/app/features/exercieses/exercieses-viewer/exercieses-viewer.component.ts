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
import {
  ExerciesesContent,
  ExerciesesExecutionResult,
  ExerciesesExecutionResultError,
} from '@app-shared/interfaces/exercieses';
import { LoaderComponent } from '@app-shared/ui';
import { ContentDirective } from '@app-shared/directives';
import { map } from 'rxjs';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import {
  NzCodeEditorComponent,
  NzCodeEditorModule,
} from 'ng-zorro-antd/code-editor';
import { NzSplitterModule } from 'ng-zorro-antd/splitter';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';
@Component({
  selector: 'sw-exercieses-viewer',
  imports: [
    ReactiveFormsModule,
    ContentDirective,
    LoaderComponent,
    NzLayoutModule,
    NzCodeEditorModule,
    NzSplitterModule,
    JsonPipe,
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
  readonly isButtonDisabled = signal(false);
  readonly lastExecutionResult = signal<
    ExerciesesExecutionResult[] | ExerciesesExecutionResultError | null
  >(null);
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
    effect(() => {
      console.log(this.lastExecutionResult());
    });
  }

  formatCode(): void {
    // It's hack to format document this way becouse ng-zorro decided to make editor instance private
    // @ts-ignore
    this.editor?.editorInstance?._actions
      .get('editor.action.formatDocument')
      .run();
  }

  onResize(): void {
    this.updateEditorLayout();
  }

  runCode(): void {
    this.isButtonDisabled.set(true);
    this.lastExecutionResult.set(null);
    const exerciesesContent = this.exerciesesContent();
    const code = this.codeGroup.controls.code.value;
    const testCases = exerciesesContent?.data.testCases;
    const starter = exerciesesContent?.data.starter;
    const worker = new Worker(new URL('./code-runner.worker', import.meta.url));
    // TODO: loading ui

    const timeOut = setTimeout(() => {
      worker.terminate();
      this.isButtonDisabled.set(false);
      this.lastExecutionResult.set({
        criticalError:
          'შეიძლება კოდი გაილუპა ან საჭიროებს 10 წამზე მეტს. სცადეთ თავიდან განსხვავებული კოდით.',
      });
    }, 10000);

    worker.onmessage = ({ data }) => {
      clearTimeout(timeOut);
      worker.terminate();
      this.isButtonDisabled.set(false);
      this.lastExecutionResult.set(data?.criticalError ? data : data.results);
    };

    worker.postMessage({ code, starter, testCases });
  }

  private updateEditorLayout(): void {
    if (typeof this.editor?.layout === 'function') {
      this.editor.layout();
    }
  }
}
