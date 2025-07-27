import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  PLATFORM_ID,
  ViewChild,
  inject,
} from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import {
  AsyncPipe,
  CommonModule,
  DOCUMENT,
  TitleCasePipe,
  ViewportScroller,
  isPlatformBrowser,
} from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  BehaviorSubject,
  Observable,
  combineLatest,
  filter,
  map,
  tap,
} from 'rxjs';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModeType } from 'ng-zorro-antd/menu';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { ThemeOptions } from '@app-shared/enums';
import { LayoutService, ThemeService } from '@app-shared/services';
import { LOG_GREETER, NAVIGATION } from './shared/providers';
import { SearchComponent } from '@app-shared/ui';
import { ENVIRONMENT } from '@app-shared/providers/environment';
import { DISPLAY_THEMES } from '@app-shared/consts/theme';

@Component({
    selector: 'sw-root',
    imports: [
        RouterModule,
        NzLayoutModule,
        NzButtonComponent,
        NzIconModule,
        NzDropDownModule,
        NzAlertModule,
        SearchComponent,
        TitleCasePipe,
        AsyncPipe,
        CommonModule,
    ],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements AfterViewInit {
  @ViewChild('alert') alertRef!: ElementRef<HTMLDivElement>;
  private readonly platform = inject(PLATFORM_ID);
  private readonly defaultDataLog = inject(LOG_GREETER);
  private readonly environment = inject(ENVIRONMENT);
  private readonly router = inject(Router);
  private readonly themeService = inject(ThemeService);
  private readonly layoutService = inject(LayoutService);
  private readonly viewport = inject(ViewportScroller);
  private readonly document = inject(DOCUMENT);
  readonly headerNavigation = inject(NAVIGATION);
  readonly themeOptions = DISPLAY_THEMES;
  readonly isBrowser = isPlatformBrowser(this.platform);

  readonly isMenuOpenedByUser$ = new BehaviorSubject<boolean>(false);
  readonly burgerTopDistance$ = new BehaviorSubject<string>('66px');

  readonly isWideScreen$ = this.layoutService.isNarrowerThan(
    this.layoutService.sizes.header,
    100,
  );

  readonly isMenuOpen$ = combineLatest([
    this.isWideScreen$,
    this.isMenuOpenedByUser$,
  ]).pipe(map(([isWideScreen, isOpenByUser]) => !isWideScreen && isOpenByUser));

  readonly menuMode$: Observable<NzMenuModeType> = this.isWideScreen$.pipe(
    map((isWide) => (isWide ? 'horizontal' : 'vertical')),
  );

  readonly activePath$ = this.router.events.pipe(
    filter((event) => event instanceof NavigationEnd),
    map(() => this.router.url),
  );

  readonly headerNavigation$ = this.activePath$.pipe(
    map((path) =>
      this.headerNavigation.map((nav) => ({
        ...nav,
        isActive: this.isActivePath(path, nav.routerLink),
      })),
    ),
  );

  readonly isHomePage$ = this.activePath$.pipe(map((path) => path === '/'));

  readonly vm$ = combineLatest([
    this.isMenuOpen$,
    this.menuMode$,
    this.activePath$,
    this.headerNavigation$,
    this.burgerTopDistance$,
    this.isHomePage$,
  ]).pipe(
    map(
      ([
        isMenuOpen,
        menuMode,
        activePath,
        headerNavigation,
        burgerTopDistance,
        isHomePage,
      ]) => ({
        isMenuOpen,
        menuMode,
        activePath,
        headerNavigation,
        burgerTopDistance,
        isHomePage,
      }),
    ),
  );

  constructor() {
    if (this.isBrowser && this.environment.production) {
      this.initDefaultLog();
    }
    if (this.isBrowser) {
      this.themeService.init().pipe(takeUntilDestroyed()).subscribe();
    }
    this.isMenuOpen$
      .pipe(
        takeUntilDestroyed(),
        tap((isOpen) => {
          this.document.body.style.overflow = isOpen ? 'hidden' : 'visible';
          if (isOpen) {
            this.viewport.scrollToPosition([0, 0]);
          }
        }),
      )
      .subscribe();
  }

  ngAfterViewInit(): void {
    if (this.isBrowser) {
      this.burgerTopDistance$.next(
        `${66 + this.alertRef.nativeElement.clientHeight}px`,
      );
    }
  }

  private initDefaultLog() {
    this.defaultDataLog.forEach((data) => {
      console.log(data.message, ...data.style);
    });
  }

  changeTheme(theme: ThemeOptions) {
    this.themeService.setTheme(theme);
  }

  isActivePath(currentPath: string | null, routerLink: string | string[]) {
    if (routerLink && typeof routerLink === 'object') {
      routerLink = routerLink.join('/');
    }
    return currentPath ? currentPath.includes(routerLink) : false;
  }
}