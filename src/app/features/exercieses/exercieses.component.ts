import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'sw-exercieses',
  standalone: true,
  imports: [],
  templateUrl: './exercieses.component.html',
  styleUrl: './exercieses.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ExerciesesComponent {}
