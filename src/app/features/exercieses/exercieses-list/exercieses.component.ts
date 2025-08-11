import {
  Component,
  ChangeDetectionStrategy,
  inject,
  computed,
} from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ExerciesesMap, ExerciesesTableData } from '@app-shared/interfaces';
import { map } from 'rxjs/operators';
import { toSignal } from '@angular/core/rxjs-interop';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { presetColors } from 'ng-zorro-antd/core/color';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzTableModule } from 'ng-zorro-antd/table';
import { ExerciseDifficultyPipe } from '@app-shared/pipes';
import { EXERCISE_TAG_PATH_MAP } from '@app-shared/consts';

@Component({
  selector: 'sw-exercieses',
  imports: [
    RouterLink,
    ExerciseDifficultyPipe,
    NzLayoutModule,
    NzTableModule,
    NzTagModule,
  ],
  templateUrl: './exercieses.component.html',
  styleUrl: './exercieses.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ExerciesesComponent {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly exerciesesMap$ = this.activatedRoute.data.pipe(
    map((response) => response['data'] as ExerciesesMap),
  );
  private readonly exerciesesMap = toSignal(this.exerciesesMap$);

  readonly listOfDisplayData = computed(() =>
    this.buildTableData(this.exerciesesMap()),
  );

  readonly colors = {
    easy: presetColors[5],
    medium: presetColors[3],
    hard: presetColors[1],
  };

  readonly exercieseTagPathMap = EXERCISE_TAG_PATH_MAP;

  private buildTableData(
    exerciesesMap: ExerciesesMap | undefined,
  ): ExerciesesTableData[] {
    if (!exerciesesMap) return [];

    return Object.entries(exerciesesMap).map(([key, value]) => ({
      ...value,
      fileName: key,
      routerLink: `/exercieses/${key}`,
    }));
  }
}
