import { DOCUMENT, ViewportScroller, isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  Directive,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  PLATFORM_ID,
  Renderer2,
  SimpleChanges,
  ViewContainerRef,
  inject,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CUSTOM_ICONS } from '@app-shared/consts';
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
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly viewport = inject(ViewportScroller);
  private readonly document = inject(DOCUMENT);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  private unlistenFn = () => {};

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

    const headings = body.querySelectorAll('h1, h2, h3, h4, h5, h6');

    headings.forEach((heading: HTMLHeadingElement) => {
      heading.innerHTML = `<a class="anchor-fragment" href="doc/${this.activatedRoute.snapshot.url.map((url) => url.path).join('/')}#${heading.id}">${heading.innerHTML}</a>`;
    });

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

    if (this.isBrowser) {
      this.unlistenFn();
    }

    this.unlistenFn = this.renderer.listen(
      contentContainer,
      'click',
      (event) => {
        if (event.target instanceof HTMLAnchorElement) {
          this.handleAnchorClick(event);
        }
      },
    );

    if (content.attributes.codes) {
      const codeWrappers =
        contentContainer.querySelectorAll('div.code-wrapper');
      codeWrappers.forEach((code: HTMLElement, index: number) => {
        this.handleCopy(code, (content.attributes.codes || [])[index]);
      });
    }
  }

  handleAnchorClick(event: Event) {
    const a = event.target as HTMLAnchorElement;
    if (a?.target || /^https:\/\/.*/.test(a.href) || a.href.includes('#')) {
      return;
    }
    event.preventDefault();
    const currentDomain = a.href.split('/').slice(0, 3).join('/');
    this.router.navigateByUrl(a.href.replace(currentDomain, ''));
    this.viewport.scrollToPosition([0, 0]);
  }

  handleCopy(codeWrapper: HTMLElement, code: string) {
    const button = codeWrapper.querySelector('button');
    if (code && button) {
      button.addEventListener('click', () => {
        navigator.clipboard.writeText(code);
        button.innerHTML = CUSTOM_ICONS['check'];
        button.disabled = true;
        (button.children[0] as SVGElement).style.fill = 'green';

        setTimeout(() => {
          button.innerHTML = CUSTOM_ICONS['copy'];
          button.disabled = false;
          button.style.cursor = 'pointer';
        }, 3000);
      });
    }
  }
}
