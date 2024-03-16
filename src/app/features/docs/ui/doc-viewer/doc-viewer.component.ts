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
import { ActivatedRoute, Router } from '@angular/router';
import { ViewportScroller } from '@angular/common';
import { DocContent } from '@app-shared/interfaces';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs';

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
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly viewport = inject(ViewportScroller);

  constructor() {
    this.activatedRoute.queryParams
      .pipe(
        tap((query) => {
          const search = query['search'];
          console.log(search);
        }),
        takeUntilDestroyed(),
      )
      .subscribe();
  }

  ngOnChanges(changes: SimpleChanges) {
    if ('docContent' in changes) {
      this.renderPage(this.docContent.content);
    }
  }

  renderPage(content: string) {
    const contentContainer = this.container.nativeElement;
    contentContainer.innerHTML = content;

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
