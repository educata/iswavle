import {
  ArticleService,
  MetaService,
  ThemeService,
} from '@app-shared/services';
import {
  ChangeDetectionStrategy,
  Component,
  PLATFORM_ID,
  inject,
} from '@angular/core';
import {
  AsyncPipe,
  CommonModule,
  DOCUMENT,
  ViewportScroller,
  isPlatformBrowser,
} from '@angular/common';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterModule,
} from '@angular/router';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { filter, fromEvent, map, of, startWith, switchMap, tap } from 'rxjs';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzBackTopModule } from 'ng-zorro-antd/back-top';
import { DocContent } from '@app-shared/interfaces';
import { SidenavComponent, AutoBreadcrumbsComponent } from '@app-shared/ui';
import { LAYOUT_SIZES } from '@app-shared/consts';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import {
  DocContributorsComponent,
  DocTocComponent,
  DocViewerComponent,
} from './ui';
import { ContributorsService } from '@app-shared/services/contributors.service';

@Component({
  selector: 'sw-docs',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    DocViewerComponent,
    DocTocComponent,
    NzBreadCrumbModule,
    NzLayoutModule,
    AutoBreadcrumbsComponent,
    SidenavComponent,
    NzMenuModule,
    NzDrawerModule,
    NzButtonModule,
    NzIconModule,
    NzBackTopModule,
    AsyncPipe,
    NzToolTipModule,
    DocContributorsComponent,
  ],
  templateUrl: './docs.component.html',
  styleUrl: './docs.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class DocsComponent {
  private readonly platform = inject(PLATFORM_ID);
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly viewport = inject(ViewportScroller);
  private readonly document = inject(DOCUMENT);
  private readonly metaService = inject(MetaService);
  private readonly contributorsService = inject(ContributorsService);
  private readonly articleService = inject(ArticleService);
  private readonly article$ = this.activatedRoute.data.pipe(
    map((response) => response['data'] as DocContent),
  );

  readonly themeService = inject(ThemeService);

  readonly article = toSignal(this.article$);
  readonly isBrowser = isPlatformBrowser(this.platform);
  readonly siderWidth = LAYOUT_SIZES.docSiderWidth;

  isDrawerVisible = false;
  activeContentTitle = 'კონტენტი';

  readonly navigation = toSignal(
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map(() => {
        const navigation = this.articleService.navigation;
        this.activeContentTitle = navigation?.title || 'კონტენტი';
        return navigation?.children || [];
      }),
    ),
  );

  readonly articleSiblings$ = this.article$.pipe(
    map(() => {
      return this.articleService.siblings;
    }),
  );

  readonly contributors = toSignal(
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map(() => this.router.url),
      switchMap((url) => {
        if (url.split('/').slice(2).length === 2) {
          // Exclude contributors from base articles
          return of([]);
        }
        return this.contributorsService.getContributors(url);
      }),
    ),
  );

  private readonly windowResize$ = fromEvent(
    this.document.defaultView as Window,
    'resize',
  ).pipe(startWith(this.document.body.clientWidth));

  readonly isXLarge$ = this.windowResize$.pipe(
    map(() => this.document.body.clientWidth >= LAYOUT_SIZES.xLargeForDoc),
  );

  readonly hideToc$ = this.windowResize$.pipe(
    map(() => !(this.document.body.clientWidth >= LAYOUT_SIZES.hideToc)),
  );

  constructor() {
    this.article$
      .pipe(
        takeUntilDestroyed(),
        tap((content) => {
          this.metaService.updateContentMetaTags(
            content,
            this.activatedRoute.snapshot.params[1],
          );
        }),
      )
      .subscribe();
  }

  scrollUp() {
    this.viewport.scrollToPosition([0, 0]);
  }
}
