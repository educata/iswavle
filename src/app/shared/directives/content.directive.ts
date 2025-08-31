import { ViewportScroller, isPlatformBrowser } from '@angular/common';
import {
  Directive,
  Input,
  OnChanges,
  PLATFORM_ID,
  Renderer2,
  SimpleChanges,
  ViewContainerRef,
  inject,
  DOCUMENT,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { CUSTOM_ICONS } from '@app-shared/consts';
import { EmbedMessageType, SupportedPreviewLanguages } from '@app-shared/enums';
import { DocContent, ExercisesContent } from '@app-shared/interfaces';
import { ENVIRONMENT } from '@app-shared/providers/environment';
import {
  SanitizerService,
  CodeUtilService,
  ThemeService,
} from '@app-shared/services';
import { combineLatest, delay, map, Subject, tap } from 'rxjs';

@Directive({
  selector: '[swContent]',
  standalone: true,
})
export class ContentDirective implements OnChanges {
  // Might consider passing templateRef to allow custom rendering
  @Input('swContent') content!: DocContent | ExercisesContent;
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
  private readonly codeUtilService = inject(CodeUtilService);
  private readonly themeService = inject(ThemeService);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  private readonly postIframeMessage$ = new Subject<
    NodeListOf<HTMLIFrameElement>
  >();

  private unlistenFn = () => {};

  private readonly codePreviews: {
    language: SupportedPreviewLanguages;
    code: string;
  }[] = [];

  constructor() {
    if (this.isBrowser) {
      // Effect to render iframe content theme
      combineLatest([
        this.postIframeMessage$.pipe(delay(500)),
        this.themeService.theme$,
      ])
        .pipe(
          map(([iframes, theme]) => ({ iframes, theme })),
          takeUntilDestroyed(),
          tap((data) => {
            data.iframes.forEach((iframe: HTMLIFrameElement) => {
              try {
                const src = iframe.getAttribute('src');
                if (!src) return;
                const origin = new URL(src).origin;
                iframe.contentWindow?.postMessage(
                  {
                    type: EmbedMessageType.THEME_CHANGED,
                    theme: data.theme,
                  },
                  origin,
                );
              } catch (error) {
                console.error('Error posting message to iframe:', error);
              }
            });
          }),
        )
        .subscribe();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if ('content' in changes || 'searchKey' in changes) {
      this.renderPage(this.content, this.searchKey);
    }
  }

  renderPage(content: DocContent | ExercisesContent, searchKey: string | null) {
    const isDocContent = 'attributes' in content;
    const contentContainer = this.vcr.element.nativeElement;
    contentContainer.innerHTML = '';

    const title = this.renderer.createElement('h1');
    const body = this.renderer.createElement('div') as HTMLDivElement;
    body.innerHTML = content.content;
    title.textContent = isDocContent
      ? content.attributes.title
      : content.data.attributes.title;

    if (isDocContent) {
      const headings = body.querySelectorAll('h1, h2, h3, h4, h5, h6');
      headings.forEach((heading) => {
        if (heading.getAttribute('data-linkifier-ignore')) {
          return;
        }
        heading.id = this.sanitizer.sanitizeTocID(heading.id);
        heading.innerHTML = `<a class="anchor-fragment" href="doc/${this.activatedRoute.snapshot.url.map((url) => url.path).join('/')}#${this.sanitizer.sanitizeTocID(heading.id)}">${heading.innerHTML}</a>`;
      });
    }

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

    const codeWrappers = contentContainer.querySelectorAll('div.code-wrapper');

    codeWrappers.forEach((code: HTMLElement) => {
      this.handleCopy(code, 'code');
      this.handlePreview(code);
    });

    this.postIframeMessage$.next(contentContainer.querySelectorAll('iframe'));
  }

  handleAnchorClick(event: Event) {
    const a = event.target as HTMLAnchorElement;
    const currentHrefUrl = a.href.split('/').slice(0, 3).join('/');
    const currentDomain = this.router.url.split('#')[0];
    if (a.href.replace(currentHrefUrl, '').replace('/', '').startsWith('#')) {
      a.href = `${currentDomain}#${a.href.split('#')[1]}`;
      return;
    }
    if (
      a?.target ||
      (/^https:\/\/.*/.test(a.href) && !a.href.includes(currentDomain))
    ) {
      return;
    }
    event.preventDefault();
    const navigateToUrl = a.href.replace(currentHrefUrl, '');
    this.router.navigateByUrl(navigateToUrl);
    this.viewport.scrollToPosition([0, 0]);
  }

  handleCopy(codeWrapper: HTMLElement, selector: string) {
    const button = codeWrapper.querySelector('button');
    if (button) {
      button.addEventListener('click', () => {
        const codeBlock = codeWrapper.querySelector(selector);

        if (!codeBlock) {
          return;
        }

        const code = this.codeUtilService.extractCodeFromHTML(
          codeBlock.outerHTML,
        );

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
          iframe.getAttribute('data-is-external-source') === '' || false;
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
        const searchParams = iframe.getAttribute('data-search-params') || '';
        const height = iframe.getAttribute('data-height') || 200;
        const isStikyToWrapper =
          iframe.getAttribute('data-sticky-example') === '' || false;

        const newFrame = this.renderer.createElement('div') as HTMLDivElement;
        newFrame.classList.add('frame-wrapper');

        if (isStikyToWrapper) {
          newFrame.classList.add('frame-wrapper-sticky');
        }

        const source = `${this.environment.examplesURL}/${url}`;
        const shouldHavePlaygroundLink = !iframe.src && url;

        const preloadLink = document.createElement('link');
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
                `<a href="https://github.com/educata/iswavle/tree/main/src/content/examples/${url}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512"><path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"/></svg> <span>GitHub</span></a> <a href="./playground/${isComplexPlayground ? 'wc' : 'simple'}/${url}"> <svg title="ედიტორში გახსნა" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M392.8 1.2c-17-4.9-34.7 5-39.6 22l-128 448c-4.9 17 5 34.7 22 39.6s34.7-5 39.6-22l128-448c4.9-17-5-34.7-22-39.6zm80.6 120.1c-12.5 12.5-12.5 32.8 0 45.3L562.7 256l-89.4 89.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l112-112c12.5-12.5 12.5-32.8 0-45.3l-112-112c-12.5-12.5-32.8-12.5-45.3 0zm-306.7 0c-12.5-12.5-32.8-12.5-45.3 0l-112 112c-12.5 12.5-12.5 32.8 0 45.3l112 112c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256l89.4-89.4c12.5-12.5 12.5-32.8 0-45.3z"/></svg> <span>ედიტორი</span></a><a href="https://static.iswavle.com/${url}/index.html"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M352 256c0 22.2-1.2 43.6-3.3 64l-185.3 0c-2.2-20.4-3.3-41.8-3.3-64s1.2-43.6 3.3-64l185.3 0c2.2 20.4 3.3 41.8 3.3 64zm28.8-64l123.1 0c5.3 20.5 8.1 41.9 8.1 64s-2.8 43.5-8.1 64l-123.1 0c2.1-20.6 3.2-42 3.2-64s-1.1-43.4-3.2-64zm112.6-32l-116.7 0c-10-63.9-29.8-117.4-55.3-151.6c78.3 20.7 142 77.5 171.9 151.6zm-149.1 0l-176.6 0c6.1-36.4 15.5-68.6 27-94.7c10.5-23.6 22.2-40.7 33.5-51.5C239.4 3.2 248.7 0 256 0s16.6 3.2 27.8 13.8c11.3 10.8 23 27.9 33.5 51.5c11.6 26 20.9 58.2 27 94.7zm-209 0L18.6 160C48.6 85.9 112.2 29.1 190.6 8.4C165.1 42.6 145.3 96.1 135.3 160zM8.1 192l123.1 0c-2.1 20.6-3.2 42-3.2 64s1.1 43.4 3.2 64L8.1 320C2.8 299.5 0 278.1 0 256s2.8-43.5 8.1-64zM194.7 446.6c-11.6-26-20.9-58.2-27-94.6l176.6 0c-6.1 36.4-15.5 68.6-27 94.6c-10.5 23.6-22.2 40.7-33.5 51.5C272.6 508.8 263.3 512 256 512s-16.6-3.2-27.8-13.8c-11.3-10.8-23-27.9-33.5-51.5zM135.3 352c10 63.9 29.8 117.4 55.3 151.6C112.2 482.9 48.6 426.1 18.6 352l116.7 0zm358.1 0c-30 74.1-93.6 130.9-171.9 151.6c25.5-34.2 45.2-87.7 55.3-151.6l116.7 0z"/></svg><span>ლაივი</span></a>`
              }
            </div>
          </div>
          <div class="body-frame">
            <iframe src="${source}/index.html${!searchParams ? '' : `?${searchParams}`}" height="${height}" frameborder="0" crossorigin="anonymous" loading="lazy"></iframe>
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

  private handlePreview(codeWrapper: HTMLElement) {
    if (!this.isBrowser) {
      return;
    }

    const hasPreview = codeWrapper.getAttribute('data-show-preview') !== null;

    if (!hasPreview) {
      return;
    }

    const language = codeWrapper.getAttribute('data-language') || '';

    if (!language) {
      return;
    }

    this.codePreviews.push({
      language: language as SupportedPreviewLanguages,
      code: codeWrapper.querySelector('code')?.innerHTML || '',
    });

    const nextSibling = codeWrapper.nextElementSibling;
    const shouldRenderPreview =
      nextSibling?.getAttribute('data-show-preview') === null ||
      nextSibling?.getAttribute('data-show-preview') === undefined;

    if (shouldRenderPreview) {
      this.renderPreview(codeWrapper);
      return;
    }
  }

  private renderPreview(codeWrapper: HTMLElement) {
    const uniquieId = Math.random().toString(36).substring(2, 15);
    let code = '';
    this.codePreviews.forEach((preview) => {
      switch (preview.language) {
        case SupportedPreviewLanguages.HTML:
          code += `
            <div class="preview-${uniquieId}">
              ${this.codeUtilService.extractCodeFromHTML(preview.code)}
            </div>
          `;
          break;
        case SupportedPreviewLanguages.CSS:
          const extractedCode = this.codeUtilService.extractCodeFromHTML(
            preview.code,
          );
          let normalCSSCode = extractedCode;
          let keyframesCSSCode = '';
          if (extractedCode.includes('@keyframes')) {
            normalCSSCode = extractedCode.split('@keyframes')[0];
            keyframesCSSCode = `@keyframes ${extractedCode.split('@keyframes')[1]}`;
          }
          code += `
            <style>
              div.preview-${uniquieId} {
                ${normalCSSCode}
              }
              ${keyframesCSSCode}
            </style>`;
          break;
        case SupportedPreviewLanguages.JS:
          code += `
            <script id="preview-${uniquieId}">
              ${this.codeUtilService.extractCodeFromHTML(preview.code)}
            </script>
          `;
          try {
            // Using an IIFE to create a clean scope
            new Function(
              this.codeUtilService.extractCodeFromHTML(preview.code),
            )();
          } catch (error) {
            console.error('Error in preview code:', error);
          }
          break;
        default:
          code += `<div class="preview-${uniquieId}">${preview.language} isn't supported. Supported languages for preview are: ${Object.values({ ...SupportedPreviewLanguages })}</div>
        `;
      }
    });
    codeWrapper.parentNode?.insertBefore(
      this.getPreviewElement(code),
      codeWrapper.nextSibling,
    );
    this.codePreviews.splice(0);
  }

  private getPreviewElement(code: string) {
    const div = this.renderer.createElement('div') as HTMLDivElement;
    div.classList.add('preview-wrapper');
    div.setAttribute('data-search-ignore', 'true');
    div.innerHTML = `
      <div class="preview-wrapper-header">
        <span class="preview-wrapper-header-title"></span>
      </div>
      <div class="preview-wrapper-body">
        ${code}
      </div>
    `;
    return div;
  }
}
