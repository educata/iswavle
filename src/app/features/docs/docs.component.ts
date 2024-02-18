import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
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
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, fromEvent, map, merge, of } from 'rxjs';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzBackTopModule } from 'ng-zorro-antd/back-top';
import { DocContent } from '@app-shared/interfaces';
import { SidenavComponent, AutoBreadcrumbsComponent } from '@app-shared/ui';
import { DOC_NAVIGATION } from '@app-shared/providers';
import { LAYOUT_SIZES } from '@app-shared/consts';
import { DocTocComponent, DocViewerComponent } from './ui';

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
  private readonly article$ = this.activatedRoute.data.pipe(
    map((response) => response['data'] as DocContent),
  );

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
        return navigation?.children || [];
      }),
    ),
  );

  private readonly resize$ = merge(
    of(false),
    fromEvent(this.document.defaultView as Window, 'resize'),
  );

  readonly isXLarge$ = this.resize$.pipe(
    map(() => this.document.body.clientWidth >= LAYOUT_SIZES.xLargeForDoc),
  );

  readonly hideToc$ = this.resize$.pipe(
    map(() => !(this.document.body.clientWidth >= LAYOUT_SIZES.hideToc)),
  );

  scrollUp() {
    this.viewport.scrollToPosition([0, 0]);
  }
}
