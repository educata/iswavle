import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  HostListener,
  inject,
  PLATFORM_ID,
  signal,
  ViewChild,
} from '@angular/core';
import { isPlatformBrowser, JsonPipe, NgTemplateOutlet } from '@angular/common';
import {
  ExercisesService,
  LayoutService,
  MetaService,
} from '@app-shared/services';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ThemeService } from '@app-shared/services/theme.service';
import { ExerciseDifficultyPipe, EncodeURIPipe } from '@app-shared/pipes';
import { DIFFICULTY_TEXT, EXERCISE_TAG_PATH_MAP } from '@app-shared/consts';
import { LocalStorageKeys } from '@app-shared/enums';
import {
  ExercisesContent,
  ExercisesExecutionResult,
  ExercisesNavigation,
  ExercisesTableData,
  ExerciseStorageContent,
} from '@app-shared/interfaces';
import { LoaderComponent } from '@app-shared/ui';
import { ContentDirective } from '@app-shared/directives';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  startWith,
  tap,
} from 'rxjs/operators';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import {
  NzCodeEditorComponent,
  NzCodeEditorModule,
} from 'ng-zorro-antd/code-editor';
import { NzSplitterModule } from 'ng-zorro-antd/splitter';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTooltipModule } from 'ng-zorro-antd/tooltip';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { presetColors } from 'ng-zorro-antd/core/color';
import { NzResultModule } from 'ng-zorro-antd/result';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzInputModule } from 'ng-zorro-antd/input';

@Component({
  selector: 'sw-exercises-viewer',
  imports: [
    JsonPipe,
    RouterLink,
    NgTemplateOutlet,
    ReactiveFormsModule,
    LoaderComponent,
    ContentDirective,
    EncodeURIPipe,
    ExerciseDifficultyPipe,
    NzTagModule,
    NzIconModule,
    NzTabsModule,
    NzModalModule,
    NzInputModule,
    NzResultModule,
    NzLayoutModule,
    NzDrawerModule,
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
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);

  private readonly metaService = inject(MetaService);
  private readonly themeService = inject(ThemeService);
  private readonly layoutService = inject(LayoutService);
  private readonly nzModalService = inject(NzModalService);
  private readonly exerciseService = inject(ExercisesService);

  private readonly exerciseContent$ = this.activatedRoute.data.pipe(
    map((response) => response['exercise'] as ExercisesContent),
  );

  private readonly exercisesList$ = this.activatedRoute.data.pipe(
    map((response) =>
      this.exerciseService.getExerciseData(
        response['exercises'] as ExercisesNavigation[],
      ),
    ),
  );

  readonly codeGroup = this.fb.group({
    code: this.fb.control(''),
  });

  readonly exerciseSearchControl = this.fb.control('');

  readonly isWideScreen = this.layoutService.isWideScreen;
  readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  readonly hasSolved = signal(false);
  readonly isDrawerVisible = signal(false);
  readonly isButtonDisabled = signal(false);
  readonly lastExecutionResult = signal<ExercisesExecutionResult[] | null>(
    null,
  );
  readonly exercisesContent = toSignal(this.exerciseContent$);
  readonly exercisesList = toSignal(this.exercisesList$);
  readonly editorTheme = toSignal(this.themeService.editorTheme$);

  readonly exerciseSearchResults = toSignal(
    this.exerciseSearchControl.valueChanges.pipe(
      startWith(''),
      distinctUntilChanged(),
      map((searchText) => this.filterExercises(searchText)),
    ),
  );

  readonly displayOtherExerciseNavigation = computed(() =>
    this.calculateNeighborExercises(
      this.exercisesContent() || null,
      this.exercisesList() || [],
    ),
  );

  readonly editorThemeOptions = this.themeService.editorThemeOptions;
  readonly exerciseTagPathMap = EXERCISE_TAG_PATH_MAP;
  readonly colors: Record<string, string> = {
    easy: presetColors[5],
    medium: presetColors[3],
    hard: presetColors[1],
  };

  get exerciseName(): string {
    return this.activatedRoute.snapshot.params['exercises_name'];
  }

  @HostListener('window:keydown', ['$event']) keyDown(event: KeyboardEvent) {
    if (event.key === 's' && event.ctrlKey) {
      event.preventDefault();
      this.runCode();
    }
    if (event.key === 'r' && event.ctrlKey) {
      event.preventDefault();
      const content = this.exercisesContent();
      if (content) {
        this.resetCode(content);
      }
    }
  }

  constructor() {
    effect(() => {
      const exercisesContent = this.exercisesContent();
      if (exercisesContent) {
        if (this.isBrowser) {
          const storageData = localStorage.getItem(
            `${LocalStorageKeys.ExercisePrefix}${this.exerciseName}`,
          );
          const localStorageCode = storageData
            ? JSON.parse(storageData)?.code
            : null;
          const code = localStorageCode || exercisesContent.data.starter;
          this.codeGroup.controls.code.setValue(code);
          if (
            storageData !== null &&
            localStorageCode !== exercisesContent.data.starter
          ) {
            this.runCode(true);
          } else {
            this.lastExecutionResult.set(null);
          }
        }
        this.updateEditorLayout();
        this.metaService.updateContentMetaTags(
          {
            title: exercisesContent.data.attributes?.title,
            description: exercisesContent.data.attributes?.description,
            image: exercisesContent.data.attributes?.image,
            keywords: exercisesContent.data.attributes?.keywords,
          },
          this.exerciseName,
        );
      }
    });
    if (this.isBrowser) {
      this.codeGroup.controls.code.valueChanges
        .pipe(
          debounceTime(500),
          distinctUntilChanged(),
          tap((value) => this.updateStorageData(value)),
        )
        .subscribe();
    }
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

  runCode(skipOpenCompletionModal = false): void {
    this.formatCode();
    this.isButtonDisabled.set(true);
    this.lastExecutionResult.set(null);
    const exercisesContent = this.exercisesContent();
    const code = this.codeGroup.controls.code.value;
    const testCases = exercisesContent?.data.testCases;
    const starter = exercisesContent?.data.starter;
    const worker = new Worker(new URL('./code-runner.worker', import.meta.url));

    const timeOut = setTimeout(() => {
      worker.terminate();
      this.isButtonDisabled.set(false);
      const lastExecution =
        testCases?.map((testCase) => ({
          inputs: [],
          output: undefined,
          expected: testCase.expected,
          runtime: 0,
          passed: false,
          logs: [],
          error:
            'შეიძლება კოდი გაილუპა ან საჭიროებს 10 წამზე მეტს. სცადეთ თავიდან განსხვავებული კოდით.',
        })) || null;
      this.lastExecutionResult.set(lastExecution);
      this.updateStorageData(code);
    }, 10000);

    worker.onmessage = ({ data }) => {
      clearTimeout(timeOut);
      worker.terminate();
      this.isButtonDisabled.set(false);
      this.lastExecutionResult.set(data.results);

      const passedEveryTestCase = data.results.every(
        (result: ExercisesExecutionResult) => result.passed,
      );
      if (
        passedEveryTestCase &&
        data.results.length > 0 &&
        !skipOpenCompletionModal
      ) {
        this.openCompletionModal();
        this.updateStorageData(code, true);
      }
    };

    worker.postMessage({ code, starter, testCases });
  }

  changeTheme(theme: string) {
    this.themeService.changeEditorTheme(theme);
  }

  resetCode(exercise: ExercisesContent): void {
    this.nzModalService.confirm({
      nzTitle: 'გსურთ კოდის გასუფთავება?',
      nzContent: 'კოდის გასუფთავების შემდეგ, ყველა ცვლილება დაკარგება.',
      nzCancelText: 'დახურვა',
      nzOkText: 'გასუფთავება',
      nzOnOk: () => {
        this.codeGroup.controls.code.setValue(exercise.data.starter);
        this.updateStorageData(exercise.data.starter, false);
        this.lastExecutionResult.set(null);
      },
    });
  }

  navigateToExercise(path: string | undefined): void {
    if (path) {
      this.router.navigate(['/exercises', path]);
    }
  }

  private filterExercises(searchText: string | null): ExercisesTableData[] {
    const list = this.exercisesList() || [];

    if (!searchText) {
      return list;
    }

    const lowerCaseSearchText = searchText.toLowerCase();
    return list.filter(
      (exercise) =>
        exercise.title.toLowerCase().includes(lowerCaseSearchText) ||
        DIFFICULTY_TEXT[exercise.difficulty]
          .toLowerCase()
          .includes(lowerCaseSearchText),
    );
  }

  private updateStorageData(
    code: string | null,
    solved: boolean | null = null,
  ): void {
    const storageKey = `${LocalStorageKeys.ExercisePrefix}${this.exerciseName}`;
    const storageItem = localStorage.getItem(storageKey) || '';

    let hasSolved = storageItem ? JSON.parse(storageItem).hasSolved : false;

    if (solved !== null) {
      hasSolved = solved;
    }

    const result: ExerciseStorageContent = {
      hasSolved,
      code: code || '',
      path: this.exerciseName,
    };

    localStorage.setItem(storageKey, JSON.stringify(result));
    this.hasSolved.set(hasSolved);
    this.updateResultStatusForExercise(hasSolved);
  }

  private updateEditorLayout(): void {
    if (typeof this.editor?.layout === 'function') {
      this.editor.layout();
    }
  }

  private openCompletionModal(): void {
    this.nzModalService.create({
      nzTitle: 'გილოცავთ 🎉',
      nzContent: 'თქვენ წარმატებით ამოხსენით ამოცანა',
      nzOkText: 'დახურვა',
      nzCancelText: null,
    });
  }

  private calculateNeighborExercises(
    exercisesContent: ExercisesContent | null,
    exercises: ExercisesTableData[],
  ): {
    previous: ExercisesNavigation | null;
    next: ExercisesNavigation | null;
  } {
    const currentIndex = exercises.findIndex(
      (exercise) => exercise.path === this.exerciseName,
    );

    const previous = exercises[currentIndex - 1] || null;
    const next = exercises[currentIndex + 1] || null;

    return { previous, next };
  }

  private updateResultStatusForExercise(hasSolved: boolean): void {
    const list = this.exercisesList() || [];
    const item = list.find((item) => item.path === this.exerciseName);

    if (item) {
      item.hasSolved = hasSolved;
    }
  }
}
