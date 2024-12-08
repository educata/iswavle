import { DOCUMENT, ViewportScroller, isPlatformBrowser } from '@angular/common';
import {
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
export class ContentDirective implements OnChanges {
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

  renderPage(content: DocContent, searchKey: string | null) {
    const contentContainer = this.vcr.element.nativeElement;
    contentContainer.innerHTML = '';

    const title = this.renderer.createElement('h1');
    const body = this.renderer.createElement('div') as HTMLDivElement;
    title.textContent = content.attributes.title;
    body.innerHTML = content.content;

    const headings = body.querySelectorAll('h1, h2, h3, h4, h5, h6');

    headings.forEach((heading) => {
      heading.id = this.sanitizer.sanitizeTocID(heading.id);
      heading.innerHTML = `<a class="anchor-fragment" href="doc/${this.activatedRoute.snapshot.url.map((url) => url.path).join('/')}#${this.sanitizer.sanitizeTocID(heading.id)}">${heading.innerHTML}</a>`;
    });

    this.renderIframes(body);
    this.appendCrossOrigin(body);

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

  private renderIframes(body: HTMLDivElement) {
    const iframes = body.querySelectorAll('iframe');

    if (iframes.forEach) {
      iframes.forEach((iframe: HTMLIFrameElement) => {
        iframe.setAttribute('crossorigin', 'anonymous');
        const isExternalSource =
          iframe.getAttribute('data-is-external-source') || false;
        const url = iframe.getAttribute('data-url') || '';

        const shouldNotRender = !url && !iframe.src;

        if (shouldNotRender) {
          return;
        }

        const shouldRenderAsExternalSource =
          isExternalSource && !url && iframe.src;

        if (shouldRenderAsExternalSource) {
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

        const source = `${this.environment.examplesURL}/${url}`;
        const shouldHavePlaygroundLink = !iframe.src && url;

        const preloadLink = document.createElement('link');
        preloadLink.rel = 'preload';
        preloadLink.href = source;
        preloadLink.as = 'document';
        preloadLink.crossOrigin = 'anonymous';

        this.document.head.appendChild(preloadLink);

        newFrame.innerHTML = `
          <div class="title-frame">
            <span>${title}</span>
            <div>
              ${
                shouldHavePlaygroundLink &&
                `<a href="https://github.com/educata/iswavle/tree/main/src/content/examples/${url}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512"><path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"/></svg> <span>GitHub-ზე გახსნა</span></a> <a href="./playground/${isComplexPlayground ? 'wc' : 'simple'}/${url}"> <svg title="ედიტორში გახსნა" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M392.8 1.2c-17-4.9-34.7 5-39.6 22l-128 448c-4.9 17 5 34.7 22 39.6s34.7-5 39.6-22l128-448c4.9-17-5-34.7-22-39.6zm80.6 120.1c-12.5 12.5-12.5 32.8 0 45.3L562.7 256l-89.4 89.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l112-112c12.5-12.5 12.5-32.8 0-45.3l-112-112c-12.5-12.5-32.8-12.5-45.3 0zm-306.7 0c-12.5-12.5-32.8-12.5-45.3 0l-112 112c-12.5 12.5-12.5 32.8 0 45.3l112 112c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256l89.4-89.4c12.5-12.5 12.5-32.8 0-45.3z"/></svg> <span>ედიტორში გახსნა</span></a>`
              }
            </div>
          </div>
          <div class="body-frame">
            <iframe src="${source}/index.html" height="${height}" frameborder="0" crossorigin="anonymous" loading="eager"></iframe>
          </div>
        `;

        iframe.replaceWith(newFrame);
      });
    }
  }

  private appendCrossOrigin(body: HTMLDivElement) {
    const images = body.querySelectorAll('img');
    const regexForCrossOrigin = new RegExp('^https://.*', 'g');

    if (images.forEach) {
      images.forEach((image) => {
        const isCrossOrigin = regexForCrossOrigin.test(image.src);

        if (isCrossOrigin) {
          image.setAttribute('crossorigin', 'anonymous');
        }
      });
    }
  }
}
