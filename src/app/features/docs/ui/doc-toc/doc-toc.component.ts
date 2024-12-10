import {
  ChangeDetectionStrategy,
  Component,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { NzAnchorModule } from 'ng-zorro-antd/anchor';
import { SanitizeIdPipe } from './sanitize-id.pipe';
import { TocItem } from '@app-shared/interfaces';

@Component({
    selector: 'sw-doc-toc',
    imports: [NzAnchorModule, SanitizeIdPipe],
    templateUrl: './doc-toc.component.html',
    styleUrl: './doc-toc.component.less',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DocTocComponent {
  @Input() isFixed = true;
  @Input() docAttrs!: TocItem[];
  @Output() onClick = new EventEmitter<string>();
}
