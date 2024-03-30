import { DOCUMENT, ViewportScroller, isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  Directive,
  Input,
  OnChanges,
  PLATFORM_ID,
  Renderer2,
  SimpleChanges,
  ViewContainerRef,
  inject,
} from '@angular/core';
import { Router } from '@angular/router';
import { DocContent } from '@app-shared/interfaces';

@Directive({
  selector: '[swContent]',
  standalone: true,
})
export class ContentDirective implements OnChanges, AfterViewInit {
  // Might consider passing templateRef to allow custom rendering
  @Input('swContent') content!: DocContent;
  @Input('swContentSearch') searchKey: string | null = null;
  @Input() highlightBgColor = '#1890ff';
  @Input() highlightColor = '#fff';

  private readonly vcr = inject(ViewContainerRef);
  private readonly renderer = inject(Renderer2);
  private readonly router = inject(Router);
  private readonly viewport = inject(ViewportScroller);
  private readonly document = inject(DOCUMENT);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  ngOnChanges(changes: SimpleChanges) {
    if ('content' in changes || 'searchKey' in changes) {
      this.renderPage(this.content, this.searchKey);
    }
  }

  ngAfterViewInit(): void {}

  renderPage(content: DocContent, searchKey: string | null) {
    const contentContainer = this.vcr.element.nativeElement;
    contentContainer.innerHTML = '';

    const title = this.renderer.createElement('h1');
    const body = this.renderer.createElement('div');
    title.textContent = content.attributes.title;
    body.innerHTML = content.content;

    if (searchKey) {
      const segments = (body.innerHTML as string).split(/(<[^>]+>)/);
      const escapedSearchKey = searchKey.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const pattern = new RegExp(escapedSearchKey, 'giu');
      body.innerHTML = segments
        .map((segment) =>
          segment.startsWith('<')
            ? segment
            : segment.replace(
                pattern,
                (match) =>
                  `<span class="sw-content-highlighted" style="background: ${this.highlightBgColor}; color: ${this.highlightColor}">${match}</span>`,
              ),
        )
        .join('');
    }

    contentContainer.appendChild(title);
    contentContainer.appendChild(body);

    if (this.isBrowser && searchKey) {
      setTimeout(() => {
        this.document
          .querySelector('.sw-content-highlighted')
          ?.scrollIntoView();
      }, 500);
    }

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
}
