import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnChanges,
  PLATFORM_ID,
  Renderer2,
  SimpleChanges,
  ViewChild,
  inject,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ViewportScroller, isPlatformBrowser } from '@angular/common';
import { tap } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd/message';
import { DocContent } from '@app-shared/interfaces';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CUSTOM_ICONS } from '@app-shared/consts';
import { TitleIdPipe } from './title-id.pipe';

@Component({
  selector: 'sw-doc-viewer',
  standalone: true,
  imports: [TitleIdPipe],
  templateUrl: './doc-viewer.component.html',
  styleUrl: './doc-viewer.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocViewerComponent implements OnChanges {
  @Input() docContent!: DocContent;
  @ViewChild('container', { static: true }) container!: ElementRef<HTMLElement>;

  private readonly platform = inject(PLATFORM_ID);
  private readonly renderer = inject(Renderer2);
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly viewport = inject(ViewportScroller);
  private readonly message = inject(NzMessageService);

  readonly isBrowser = isPlatformBrowser(this.platform);
  private listener = () => {};

  constructor() {
    this.activatedRoute.queryParams
      .pipe(
        tap((query) => {
          const search = query['search'];
          // TODO: implement scroll to search text && fragment
          if (search) {
            console.log(`Scroll to ${search}`);
          }
        }),
        takeUntilDestroyed(),
      )
      .subscribe();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.isBrowser) {
      /*
        ? Feels hacky but this is way to unlisten renderer
        * https://github.com/angular/angular/issues/9368
      */
      this.listener();
    }

    if ('docContent' in changes) {
      this.renderPage(this.docContent);
    }
  }

  renderPage(docContent: DocContent) {
    const contentContainer = this.container.nativeElement;
    contentContainer.innerHTML = docContent.content;

    if (docContent.attributes.codes) {
      const codeWrappers =
        contentContainer.querySelectorAll('div.code-wrapper');
      codeWrappers.forEach((code, index) => {
        this.handleCopy(
          code as HTMLElement,
          (docContent.attributes.codes || [])[index],
        );
      });
    }

    const headings = contentContainer.querySelectorAll<HTMLHeadingElement>(
      'h1, h2, h3, h4, h5, h6',
    );

    headings.forEach((heading) => {
      heading.innerHTML = `
        <a class="anchor-fragment" href="doc/${this.activatedRoute.snapshot.url.map((url) => url.path).join('/')}#${heading.id}">${heading.innerHTML}</a>
      `;
    });

    this.listener = this.renderer.listen(contentContainer, 'click', (event) => {
      if (event.target instanceof HTMLAnchorElement) {
        const target = event.target as HTMLAnchorElement;
        if (!target.classList.contains('anchor-fragment')) {
          this.handleAnchorClick(event);
        }
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

  handleCopy(codeWrapper: HTMLElement, code: string) {
    const button = codeWrapper.querySelector('button');
    if (code && button) {
      button.addEventListener('click', () => {
        navigator.clipboard.writeText(code);
        button.innerHTML = CUSTOM_ICONS['check'];
        button.disabled = true;
        button.style.cursor = 'wait';
        (button.children[0] as SVGElement).style.fill = 'green';
        this.message
          .success('კოდი წარმატებით დაკოპირდა', {
            nzAnimate: true,
            nzPauseOnHover: true,
            nzDuration: 2000,
          })
          .onClose.pipe(
            tap(() => {
              button.innerHTML = CUSTOM_ICONS['copy'];
              button.disabled = false;
              button.style.cursor = 'pointer';
            }),
          )
          .subscribe();
      });
    }
  }
}
