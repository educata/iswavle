import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { DocContent } from '@app-shared/interfaces';
import { ContentDirective } from '@app-shared/directives';

@Component({
  selector: 'sw-doc-viewer',
  standalone: true,
  imports: [ContentDirective],
  templateUrl: './doc-viewer.component.html',
  styleUrl: './doc-viewer.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocViewerComponent {
  @Input() docContent!: DocContent;
  @Input() searchKey: string | null = null;
}
