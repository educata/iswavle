import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LoaderComponent } from '@app-shared/ui';

@Component({
  selector: 'sw-exercieses',
  imports: [LoaderComponent],
  templateUrl: './exercieses.component.html',
  styleUrl: './exercieses.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ExerciesesComponent {}
