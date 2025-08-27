import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import {
  Component,
  ChangeDetectionStrategy,
  inject,
  computed,
  signal,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import {
  ExercisesNavigation,
  ExercisesTableData,
} from '@app-shared/interfaces';
import { ExerciseDifficultyPipe, EncodeURIPipe } from '@app-shared/pipes';
import { EXERCISE_TAG_PATH_MAP, DIFFICULTY_TEXT } from '@app-shared/consts';
import { ExercisesService, LayoutService } from '@app-shared/services';
import { map } from 'rxjs/operators';
import { toSignal } from '@angular/core/rxjs-interop';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { presetColors } from 'ng-zorro-antd/core/color';
import { NzTagModule } from 'ng-zorro-antd/tag';
import {
  NzTableModule,
  NzTableFilterFn,
  NzTableFilterList,
  NzTableSortFn,
  NzTableSortOrder,
} from 'ng-zorro-antd/table';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzInputModule } from 'ng-zorro-antd/input';
import { isPlatformBrowser } from '@angular/common';

interface ColumnItem {
  name: string;
  sortOrder: NzTableSortOrder | null;
  sortFn: NzTableSortFn<ExercisesTableData> | null;
  listOfFilter: NzTableFilterList;
  filterFn: NzTableFilterFn<ExercisesTableData> | null;
}

@Component({
  selector: 'sw-exercises',
  imports: [
    RouterLink,
    ReactiveFormsModule,
    EncodeURIPipe,
    ExerciseDifficultyPipe,
    NzLayoutModule,
    NzTableModule,
    NzTagModule,
    NzIconModule,
    NzButtonModule,
    NzDropDownModule,
    NzInputModule,
  ],
  templateUrl: './exercises.component.html',
  styleUrl: './exercises.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ExercisesComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly formBuilder = inject(FormBuilder);
  private readonly layoutService = inject(LayoutService);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly exerciseService = inject(ExercisesService);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private readonly exercisesMap$ = this.activatedRoute.data.pipe(
    map((response) => response['data'] as ExercisesNavigation[]),
  );
  private readonly exercisesMap = toSignal(this.exercisesMap$);

  readonly colors = {
    easy: presetColors[5],
    medium: presetColors[3],
    hard: presetColors[1],
  };

  readonly difficultyColumn: ColumnItem = {
    name: 'სირთულე',
    sortOrder: null,
    sortFn: (a: ExercisesTableData, b: ExercisesTableData) => {
      const difficultyOrder = { easy: 1, medium: 2, hard: 3 };
      return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
    },
    listOfFilter: [
      { text: DIFFICULTY_TEXT.easy, value: 'easy' },
      { text: DIFFICULTY_TEXT.medium, value: 'medium' },
      { text: DIFFICULTY_TEXT.hard, value: 'hard' },
    ],
    filterFn: (list: string[], item: ExercisesTableData) =>
      list.some((difficulty) => item.difficulty === difficulty),
  };

  readonly isWideScreen = this.layoutService.isWideScreen;
  readonly exerciseTagPathMap = EXERCISE_TAG_PATH_MAP;

  readonly searchControl = this.formBuilder.control('');
  readonly searchValue = signal('');
  readonly isSearchFilterActive = signal(false);
  readonly activePaginationIndex = signal(1);

  readonly listOfData = computed(() =>
    this.exerciseService.getExerciseData(this.exercisesMap() || []),
  );

  readonly listOfDisplayData = computed(() => {
    const list = this.listOfData();
    const filter = this.searchValue();

    if (!filter) {
      return list;
    }

    return list.filter((item) => item.title.toLowerCase().includes(filter));
  });

  readonly isSearchActive = computed(() => this.searchValue().length > 0);

  ngOnInit(): void {
    this.checkAndApplyPageIndex();
  }

  search(): void {
    const value = this.searchControl.value || '';
    this.isSearchFilterActive.set(false);
    this.searchValue.set(value);
  }

  reset(): void {
    this.isSearchFilterActive.set(false);
    this.searchValue.set('');
    this.searchControl.setValue('');
  }

  resetDifficultySort(): void {
    this.difficultyColumn.sortOrder = null;
  }

  resetDifficultyFilters(): void {
    this.difficultyColumn.listOfFilter = [
      { text: DIFFICULTY_TEXT.easy, value: 'easy' },
      { text: DIFFICULTY_TEXT.medium, value: 'medium' },
      { text: DIFFICULTY_TEXT.hard, value: 'hard' },
    ];
  }

  resetSortAndFilters(): void {
    this.resetDifficultySort();
    this.resetDifficultyFilters();
  }

  updatePagination(page: number): void {
    this.activePaginationIndex.set(page);
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: {
        page,
      },
      queryParamsHandling: 'merge',
    });
  }

  private checkAndApplyPageIndex(): void {
    if (this.isBrowser) {
      const page = this.activatedRoute.snapshot.queryParams['page'];
      if (page) {
        this.activePaginationIndex.set(page);
      }
    }
  }
}
