import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NzAnchorModule } from 'ng-zorro-antd/anchor';
import { SanitizeIdPipe } from './sanitize-id.pipe';

@Component({
  selector: 'sw-doc-toc',
  standalone: true,
  imports: [NzAnchorModule, SanitizeIdPipe],
  templateUrl: './doc-toc.component.html',
  styleUrl: './doc-toc.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocTocComponent {
  @Input() isFixed = true;

  @Input() docAttrs!: {
    id: string;
    title: string;
    sub?: { id: string; title: string }[];
  }[];
}
