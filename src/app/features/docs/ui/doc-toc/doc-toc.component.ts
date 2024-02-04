import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NzAnchorModule } from 'ng-zorro-antd/anchor';

@Component({
  selector: 'sw-doc-toc',
  standalone: true,
  imports: [NzAnchorModule],
  templateUrl: './doc-toc.component.html',
  styleUrl: './doc-toc.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocTocComponent {
  @Input() docAttrs!: {
    id: string;
    title: string;
    sub?: { id: string; title: string }[];
  }[];
}
