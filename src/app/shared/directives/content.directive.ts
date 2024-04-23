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
import { ActivatedRoute, Router } from '@angular/router';
import { CUSTOM_ICONS } from '@app-shared/consts';
import { DocContent } from '@app-shared/interfaces';
import { ENVIRONMENT } from '@app-shared/providers/environment';
import { SanitizerService } from '@app-shared/services';

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
  private readonly sanitizer = inject(SanitizerService);
  private readonly environment = inject(ENVIRONMENT);
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
      heading.id = this.sanitizer.sanitizeTocID(heading.id);
      heading.innerHTML = `<a class="anchor-fragment" href="doc/${this.activatedRoute.snapshot.url.map((url) => url.path).join('/')}#${this.sanitizer.sanitizeTocID(heading.id)}">${heading.innerHTML}</a>`;
    });

    const iframes = body.querySelectorAll('iframe');

    if (iframes.forEach) {
      iframes.forEach((iframe: HTMLIFrameElement) => {
        const isExternalSource =
          iframe.getAttribute('data-is-external-source') || false;
        const url = iframe.getAttribute('data-url') || '';

        if (isExternalSource && !url && iframe.src) {
          const newFrame = this.renderer.createElement('div') as HTMLDivElement;
          newFrame.classList.add('external-frame');
          iframe.parentNode?.insertBefore(newFrame, iframe);
          newFrame.appendChild(iframe);
          return;
        }

        const title = iframe.getAttribute('data-title') || '';
        const isComplexPlayground =
          iframe.getAttribute('data-is-complex-playground') || false;
        const height = iframe.getAttribute('data-height') || 200;

        const newFrame = this.renderer.createElement('div') as HTMLDivElement;
        newFrame.classList.add('frame-wrapper');

        let source = `${this.environment.examplesURL}/${url}`;

        newFrame.innerHTML = `
          <div class="title-frame">
            <span>${title}</span>
            <a href="./playground/${isComplexPlayground ? 'complex' : 'simple'}/${url}">
              <svg title="ედიტორში გახსნა" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M392.8 1.2c-17-4.9-34.7 5-39.6 22l-128 448c-4.9 17 5 34.7 22 39.6s34.7-5 39.6-22l128-448c4.9-17-5-34.7-22-39.6zm80.6 120.1c-12.5 12.5-12.5 32.8 0 45.3L562.7 256l-89.4 89.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l112-112c12.5-12.5 12.5-32.8 0-45.3l-112-112c-12.5-12.5-32.8-12.5-45.3 0zm-306.7 0c-12.5-12.5-32.8-12.5-45.3 0l-112 112c-12.5 12.5-12.5 32.8 0 45.3l112 112c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256l89.4-89.4c12.5-12.5 12.5-32.8 0-45.3z"/></svg> ედიტორში გახსნა
            </a>
          </div>
          <div class="body-frame">
            <iframe src="${source}" height="${height}" frameborder="0"></iframe>
          </div>
        `;

        iframe.replaceWith(newFrame);
      });
    }

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
