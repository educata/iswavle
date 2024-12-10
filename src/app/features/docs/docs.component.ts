import {
  ArticleService,
  MetaService,
  ThemeService,
  ContributorsService,
  LayoutService,
} from '@app-shared/services';
import {
  ChangeDetectionStrategy,
  Component,
  PLATFORM_ID,
  computed,
  effect,
  inject,
} from '@angular/core';
import {
  CommonModule,
  ViewportScroller,
  isPlatformBrowser,
} from '@angular/common';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterModule,
} from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map, of, switchMap } from 'rxjs';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzBackTopModule } from 'ng-zorro-antd/back-top';
import { DocContent } from '@app-shared/interfaces';
import {
  SidenavComponent,
  AutoBreadcrumbsComponent,
  CommentsComponent,
} from '@app-shared/ui';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import {
  DocContributorsComponent,
  DocTocComponent,
  DocViewerComponent,
} from './ui';

@Component({
    selector: 'sw-docs',
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
        NzToolTipModule,
        DocContributorsComponent,
        CommentsComponent,
    ],
    templateUrl: './docs.component.html',
    styleUrl: './docs.component.less',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export default class DocsComponent {
  private readonly platform = inject(PLATFORM_ID);
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly viewport = inject(ViewportScroller);
  private readonly layoutServie = inject(LayoutService);
  private readonly metaService = inject(MetaService);
  private readonly contributorsService = inject(ContributorsService);
  private readonly articleService = inject(ArticleService);
  private readonly themeService = inject(ThemeService);

  private readonly article$ = this.activatedRoute.data.pipe(
    map((response) => response['data'] as DocContent),
  );
  private readonly baseNavNode = toSignal(this.articleService.navigation$);
  private readonly queryParamMap = toSignal(this.activatedRoute.queryParamMap);

  readonly article = toSignal(this.article$);
  readonly theme = toSignal(this.themeService.theme$);
  readonly isBrowser = isPlatformBrowser(this.platform);
  readonly siderWidth = this.layoutServie.sizes.docSiderWidth;
  readonly searchKey = computed(
    () => this.queryParamMap()?.get('search') ?? null,
  );

  isDrawerVisible = false;

  readonly activeContentTitle = computed(
    () => this.baseNavNode()?.title || 'კონტენტი',
  );
  readonly navigation = computed(() => this.baseNavNode()?.children || []);

  readonly articleSiblings = toSignal(this.articleService.siblings$);

  readonly contributors = toSignal(
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map(() => this.router.url),
      switchMap((url) => {
        if (url.split('/').slice(2).length === 2) {
          // Exclude contributors from base articles
          return of([]);
        }
        url = url.split('#')[0];
        return this.contributorsService.getContributors(url);
      }),
    ),
  );

  private readonly windowWidth = toSignal(
    this.layoutServie.windowWidthDebounced(100),
  );

  readonly isXLarge = computed(
    () => this.windowWidth()! >= this.layoutServie.sizes.xLargeForDoc,
  );

  readonly hideToc = computed(
    () => !(this.windowWidth()! >= this.layoutServie.sizes.hideToc),
  );

  readonly isEnoughToc = computed(
    () => (this.article()?.attributes.toc.length || 0) > 1,
  );

  constructor() {
    effect(() => {
      const content = this.article();
      if (!content) return;
      this.metaService.updateContentMetaTags(
        content,
        this.activatedRoute.snapshot.params[1],
      );
    });
  }

  scrollUp() {
    this.viewport.scrollToPosition([0, 0]);
  }

  sidenavTocClick() {
    this.isDrawerVisible = false;
  }
}
