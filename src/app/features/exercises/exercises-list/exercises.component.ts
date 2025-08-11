import {
  Component,
  ChangeDetectionStrategy,
  inject,
  computed,
} from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ExercisesMap, ExercisesTableData } from '@app-shared/interfaces';
import { map } from 'rxjs/operators';
import { toSignal } from '@angular/core/rxjs-interop';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { presetColors } from 'ng-zorro-antd/core/color';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzTableModule } from 'ng-zorro-antd/table';
import { ExerciseDifficultyPipe } from '@app-shared/pipes';
import { EXERCISE_TAG_PATH_MAP } from '@app-shared/consts';

@Component({
  selector: 'sw-exercises',
  imports: [
    RouterLink,
    ExerciseDifficultyPipe,
    NzLayoutModule,
    NzTableModule,
    NzTagModule,
  ],
  templateUrl: './exercises.component.html',
  styleUrl: './exercises.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ExercisesComponent {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly exercisesMap$ = this.activatedRoute.data.pipe(
    map((response) => response['data'] as ExercisesMap),
  );
  private readonly exercisesMap = toSignal(this.exercisesMap$);

  readonly listOfDisplayData = computed(() =>
    this.buildTableData(this.exercisesMap()),
  );

  readonly colors = {
    easy: presetColors[5],
    medium: presetColors[3],
    hard: presetColors[1],
  };

  readonly exerciseTagPathMap = EXERCISE_TAG_PATH_MAP;

  private buildTableData(
    exercisesMap: ExercisesMap | undefined,
  ): ExercisesTableData[] {
    if (!exercisesMap) return [];

    return Object.entries(exercisesMap).map(([key, value]) => ({
      ...value,
      fileName: key,
      routerLink: `/exercises/${key}`,
    }));
  }
}
