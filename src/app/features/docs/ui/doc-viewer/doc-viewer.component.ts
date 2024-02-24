import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { DocContent } from '@app-shared/interfaces';

@Component({
  selector: 'sw-doc-viewer',
  standalone: true,
  imports: [],
  templateUrl: './doc-viewer.component.html',
  styleUrl: './doc-viewer.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocViewerComponent implements OnChanges {
  @Input() docContent!: DocContent;
  @ViewChild('container', { static: true }) container!: ElementRef<HTMLElement>;

  ngOnChanges(changes: SimpleChanges) {
    if ('docContent' in changes) {
      this.renderPage(this.docContent.content);
    }
  }

  renderPage(content: string) {
    const contentContainer = this.container.nativeElement;
    contentContainer.innerHTML = content;
  }
}
