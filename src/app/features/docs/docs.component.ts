import { MetaService, ThemeService } from '@app-shared/services';
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
import { BehaviorSubject, filter, fromEvent, map, startWith, tap } from 'rxjs';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzBackTopModule } from 'ng-zorro-antd/back-top';
import {
  Contributor,
  DocContent,
  GithubResponse,
} from '@app-shared/interfaces';
import { SidenavComponent, AutoBreadcrumbsComponent } from '@app-shared/ui';
import { DOC_NAVIGATION } from '@app-shared/providers';
import {
  GITHUB_API_COMMITS,
  GITHUB_API_COMMITS_PREFIX,
  LAYOUT_SIZES,
} from '@app-shared/consts';
import {
  DocContributorsComponent,
  DocTocComponent,
  DocViewerComponent,
} from './ui';
import { HttpClient } from '@angular/common/http';

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
  private readonly http = inject(HttpClient);
  private readonly document = inject(DOCUMENT);
  private readonly metaService = inject(MetaService);
  private readonly article$ = this.activatedRoute.data.pipe(
    map((response) => response['data'] as DocContent),
  );

  readonly themeService = inject(ThemeService);
  readonly docNavigation = inject(DOC_NAVIGATION);
  readonly article = toSignal(this.article$);
  readonly isBrowser = isPlatformBrowser(this.platform);
  readonly siderWidth = LAYOUT_SIZES.docSiderWidth;

  isDrawerVisible = false;
  activeContentTitle = 'კონტენტი';

  readonly navigation = toSignal(
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map(() => this.router.url),
      map((url) => {
        /*
          Since the URL starts with a "/", we need to slice it after that,
          split it by "/", then only take the second value as a reference or guide.
        */
        const path = url.slice(1).split('/')[1];
        const navigation = this.docNavigation.find((nav) => nav.path === path);
        this.activeContentTitle = navigation?.title || 'კონტენტი';
        this.loadGithubContributors();
        return navigation?.children || [];
      }),
    ),
  );

  readonly #contributors$ = new BehaviorSubject<Contributor[]>([]);
  readonly contributors$ = this.#contributors$.asObservable();

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

  private loadGithubContributors() {
    if (this.router.url.split('/').slice(2).length === 2) {
      // Exclude contributors from base articles
      this.#contributors$.next([]);
      return;
    }
    const path = GITHUB_API_COMMITS_PREFIX.concat(
      '/',
      this.router.url.split('/').slice(2).join('/'),
      '.md',
    );
    this.http
      .get<GithubResponse[]>(`${GITHUB_API_COMMITS}?path=${path}`)
      .pipe(
        tap((result) => {
          const contributors = result
            .map((result) => ({
              name: result.author.login,
              avatar_url: result.author.avatar_url,
              html_url: result.author.html_url,
            }))
            .filter(
              (contributor, index, self) =>
                index ===
                self.findIndex((user) => user.name === contributor.name),
            );
          this.#contributors$.next(contributors);
        }),
      )
      .subscribe();
  }
}
