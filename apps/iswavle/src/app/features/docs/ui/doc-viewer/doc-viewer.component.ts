import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { DocContent } from '@iswavle/shared/utils';
import { ContentDirective } from '@iswavle/shared/ui';

@Component({
  selector: 'sw-doc-viewer',
  imports: [ContentDirective],
  templateUrl: './doc-viewer.component.html',
  styleUrl: './doc-viewer.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocViewerComponent {
  @Input() docContent!: DocContent;
  @Input() searchKey: string | null = null;
}
