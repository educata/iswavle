import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ExerciesesViewerComponent } from './ui/exercieses-viewer/exercieses-viewer.component';
import { NzLayoutModule } from 'ng-zorro-antd/layout';

@Component({
  selector: 'sw-exercieses',
  imports: [NzLayoutModule, ExerciesesViewerComponent],
  templateUrl: './exercieses.component.html',
  styleUrl: './exercieses.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ExerciesesComponent {}
