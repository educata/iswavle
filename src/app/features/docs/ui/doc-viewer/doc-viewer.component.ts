import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { DocContent } from '@app-shared/interfaces';
import { ContentDirective } from '@app-shared/directives';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'sw-doc-viewer',
  standalone: true,
  imports: [ContentDirective, AsyncPipe],
  templateUrl: './doc-viewer.component.html',
  styleUrl: './doc-viewer.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocViewerComponent {
  @Input() docContent!: DocContent;
  @Input() searchKey: string | null = null;
}
