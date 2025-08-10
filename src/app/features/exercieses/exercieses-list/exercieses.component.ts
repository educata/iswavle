import { Component, ChangeDetectionStrategy } from '@angular/core';
import { NzLayoutModule } from 'ng-zorro-antd/layout';

@Component({
  selector: 'sw-exercieses',
  imports: [NzLayoutModule],
  templateUrl: './exercieses.component.html',
  styleUrl: './exercieses.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ExerciesesComponent {}
