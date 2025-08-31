import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  PLATFORM_ID,
  computed,
  effect,
  inject,
  signal,
  viewChild,
  DOCUMENT,
} from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import {
  CommonModule,
  ViewportScroller,
  isPlatformBrowser,
} from '@angular/common';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModeType } from 'ng-zorro-antd/menu';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzIconModule, NzIconService } from 'ng-zorro-antd/icon';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { ThemeOptions } from '@app-shared/enums';
import { LayoutService, ThemeService } from '@app-shared/services';
import { LOG_GREETER, NAVIGATION } from './shared/providers';
import { SearchComponent } from '@app-shared/ui';
import { ENVIRONMENT } from '@app-shared/providers/environment';
import { DISPLAY_THEMES } from '@app-shared/consts/theme';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CUSTOM_ICONS, ICON_PREFIX } from '@app-shared/consts';

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
    CommonModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements AfterViewInit {
  private readonly alertRef = viewChild<ElementRef<HTMLDivElement>>('alert');

  private readonly platform = inject(PLATFORM_ID);
  private readonly defaultDataLog = inject(LOG_GREETER);
  private readonly environment = inject(ENVIRONMENT);
  private readonly router = inject(Router);
  private readonly themeService = inject(ThemeService);
  private readonly layoutService = inject(LayoutService);
  private readonly iconService = inject(NzIconService);
  private readonly viewport = inject(ViewportScroller);
  private readonly document = inject(DOCUMENT);

  readonly headerNavigation = inject(NAVIGATION);
  readonly themeOptions = DISPLAY_THEMES;
  readonly isBrowser = isPlatformBrowser(this.platform);

  // Signals
  readonly isMenuOpenedByUser = signal(false);
  readonly burgerTopDistance = signal('66px');
  readonly currentPath = signal(this.router.url);

  readonly isWideScreen = this.layoutService.isWideScreen;

  readonly isMenuOpen = computed(
    () => !this.isWideScreen() && this.isMenuOpenedByUser(),
  );

  readonly menuMode = computed<NzMenuModeType>(() =>
    this.isWideScreen() ? 'horizontal' : 'vertical',
  );

  readonly headerNavigationItems = computed(() =>
    this.headerNavigation.map((nav) => ({
      ...nav,
      isActive: this.isActivePath(this.currentPath(), nav.routerLink),
    })),
  );

  readonly isHomePage = computed(() => this.currentPath() === '/');

  get isDev(): boolean {
    return this.environment.production === false;
  }

  constructor() {
    if (this.isBrowser && this.environment.production) {
      this.initDefaultLog();
    }

    if (this.isBrowser) {
      this.themeService.init().pipe(takeUntilDestroyed()).subscribe();
    }

    for (const key in CUSTOM_ICONS) {
      this.iconService.addIconLiteral(ICON_PREFIX + key, CUSTOM_ICONS[key]);
    }

    // Router events
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentPath.set(this.router.url);
      }
    });

    effect(() => {
      if (this.isBrowser) {
        const isOpen = this.isMenuOpen();
        this.document.body.style.overflow = isOpen ? 'hidden' : 'visible';
        if (isOpen) {
          this.viewport.scrollToPosition([0, 0]);
        }
      }
    });
  }

  ngAfterViewInit(): void {
    if (this.isBrowser) {
      this.burgerTopDistance.set(
        `${66 + (this.alertRef()?.nativeElement?.clientHeight || 0)}px`,
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

  toggleMenu() {
    this.isMenuOpenedByUser.update((value) => !value);
  }

  closeMenu() {
    this.isMenuOpenedByUser.set(false);
  }
}
