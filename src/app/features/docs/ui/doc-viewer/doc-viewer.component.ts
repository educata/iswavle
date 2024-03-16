import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnChanges,
  Renderer2,
  SimpleChanges,
  ViewChild,
  inject,
} from '@angular/core';
import { Router } from '@angular/router';
import { ViewportScroller } from '@angular/common';
import { NzMessageService } from 'ng-zorro-antd/message';
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

  private readonly renderer = inject(Renderer2);
  private readonly router = inject(Router);
  private readonly viewport = inject(ViewportScroller);
  private readonly message = inject(NzMessageService);

  ngOnChanges(changes: SimpleChanges) {
    if ('docContent' in changes) {
      this.renderPage(this.docContent.content);
    }
  }

  renderPage(content: string) {
    const contentContainer = this.container.nativeElement;
    contentContainer.innerHTML = content;

    const codeWrappers = contentContainer.querySelectorAll('div.code-wrapper');
    codeWrappers.forEach((code) => {
      this.handleCopy(code as HTMLElement);
    });

    this.renderer.listen(contentContainer, 'click', (event) => {
      if (event.target instanceof HTMLAnchorElement) {
        this.handleAnchorClick(event);
      }
    });
  }

  handleAnchorClick(event: Event) {
    const a = event.target as HTMLAnchorElement;
    if (a?.target || /^https:\/\/.*/.test(a.href) || /^#.*/.test(a.href)) {
      return;
    }
    event.preventDefault();
    const currentDomain = a.href.split('/').slice(0, 3).join('/');
    this.router.navigateByUrl(a.href.replace(currentDomain, ''));
    this.viewport.scrollToPosition([0, 0]);
  }

  handleCopy(codeWrapper: HTMLElement) {
    const button = codeWrapper.querySelector('button');
    const code =
      codeWrapper.querySelector('span[data-value="code"]')?.innerHTML || '';
    if (code && button) {
      button.addEventListener('click', () => {
        navigator.clipboard.writeText(code);
        this.message.success('კოდი წარმატებით დაკოპირდა', {
          nzAnimate: true,
          nzPauseOnHover: true,
          nzDuration: 2000,
        });
      });
    }
  }
}
