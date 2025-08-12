import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  signal,
  ViewChild,
} from '@angular/core';
import { JsonPipe } from '@angular/common';
import { LayoutService, MetaService } from '@app-shared/services';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  ExercisesContent,
  ExercisesExecutionResult,
  ExercisesExecutionResultError,
} from '@app-shared/interfaces';
import { LoaderComponent } from '@app-shared/ui';
import { ContentDirective } from '@app-shared/directives';
import { map } from 'rxjs/operators';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import {
  NzCodeEditorComponent,
  NzCodeEditorModule,
} from 'ng-zorro-antd/code-editor';
import { NzSplitterModule } from 'ng-zorro-antd/splitter';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NgTemplateOutlet } from '@angular/common';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTooltipModule } from 'ng-zorro-antd/tooltip';
import { ThemeService } from '@app-shared/services/theme.service';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { presetColors } from 'ng-zorro-antd/core/color';
import { ExerciseDifficultyPipe } from '@app-shared/pipes';
import { EXERCISE_TAG_PATH_MAP } from '@app-shared/consts';
import { NzResultModule } from 'ng-zorro-antd/result';

@Component({
  selector: 'sw-exercises-viewer',
  imports: [
    JsonPipe,
    RouterLink,
    NgTemplateOutlet,
    ReactiveFormsModule,
    LoaderComponent,
    ContentDirective,
    ExerciseDifficultyPipe,
    NzTagModule,
    NzIconModule,
    NzTabsModule,
    NzResultModule,
    NzLayoutModule,
    NzDividerModule,
    NzTooltipModule,
    NzDropDownModule,
    NzSplitterModule,
    NzButtonComponent,
    NzCodeEditorModule,
  ],
  templateUrl: './exercises-viewer.component.html',
  styleUrl: './exercises-viewer.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ExercisesViewerComponent {
  @ViewChild(NzCodeEditorComponent) editor!: NzCodeEditorComponent;

  private readonly fb = inject(FormBuilder);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly metaService = inject(MetaService);
  private readonly themeService = inject(ThemeService);
  private readonly layoutService = inject(LayoutService);

  private readonly exercisesContent$ = this.activatedRoute.data.pipe(
    map((response) => response['data'] as ExercisesContent),
  );

  readonly codeGroup = this.fb.group({
    code: this.fb.control(''),
  });

  readonly selectedTabIndex = signal(0);
  readonly isButtonDisabled = signal(false);
  readonly lastExecutionResult = signal<
    ExercisesExecutionResult[] | ExercisesExecutionResultError | null
  >(null);
  readonly isWideScreen = this.layoutService.isWideScreen;
  readonly exercisesContent = toSignal(this.exercisesContent$);
  readonly editorTheme = toSignal(this.themeService.editorTheme$);

  readonly editorThemeOptions = this.themeService.editorThemeOptions;
  readonly exerciseTagPathMap = EXERCISE_TAG_PATH_MAP;
  readonly colors = {
    easy: presetColors[5],
    medium: presetColors[3],
    hard: presetColors[1],
  };

  constructor() {
    effect(() => {
      const exercisesContent = this.exercisesContent();
      if (exercisesContent) {
        this.codeGroup.controls.code.setValue(exercisesContent.data.starter);
        this.updateEditorLayout();
        this.metaService.updateContentMetaTags(
          {
            title: exercisesContent.data.attributes?.title,
            description: exercisesContent.data.attributes?.description,
            image: exercisesContent.data.attributes?.image,
            keywords: exercisesContent.data.attributes?.keywords,
          },
          this.activatedRoute.snapshot.params[1],
        );
      }
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
    const exercisesContent = this.exercisesContent();
    const code = this.codeGroup.controls.code.value;
    const testCases = exercisesContent?.data.testCases;
    const starter = exercisesContent?.data.starter;
    const worker = new Worker(new URL('./code-runner.worker', import.meta.url));
    this.selectedTabIndex.set(1);

    const timeOut = setTimeout(() => {
      worker.terminate();
      this.isButtonDisabled.set(false);
      this.selectedTabIndex.set(0);
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
      this.selectedTabIndex.set(0);
    };

    worker.postMessage({ code, starter, testCases });
  }

  changeTheme(theme: string) {
    this.themeService.changeEditorTheme(theme);
  }

  private updateEditorLayout(): void {
    if (typeof this.editor?.layout === 'function') {
      this.editor.layout();
    }
  }
}
