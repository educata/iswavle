import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { AsyncPipe, TitleCasePipe } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BehaviorSubject, Observable, combineLatest, filter, map } from 'rxjs';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModeType } from 'ng-zorro-antd/menu';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { Theme } from '@app-shared/enums';
import { LayoutService, ThemeService } from '@app-shared/services';
import { LOG_GREETER, NAVIGATION } from './shared/providers';
import { SearchComponent } from '@app-shared/ui';

@Component({
  selector: 'sw-root',
  standalone: true,
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
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  private readonly defaultDataLog = inject(LOG_GREETER);
  private readonly router = inject(Router);
  private readonly themeService = inject(ThemeService);
  private readonly layoutService = inject(LayoutService);
  readonly headerNavigation = inject(NAVIGATION);
  readonly theme = Theme;

  readonly isMenuOpenedByUser$ = new BehaviorSubject<boolean>(false);

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

  readonly vm$ = combineLatest([
    this.isMenuOpen$,
    this.menuMode$,
    this.activePath$,
    this.headerNavigation$,
  ]).pipe(
    map(([isMenuOpen, menuMode, activePath, headerNavigation]) => ({
      isMenuOpen,
      menuMode,
      activePath,
      headerNavigation,
    })),
  );

  constructor() {
    this.themeService.init().pipe(takeUntilDestroyed()).subscribe();
  }

  ngOnInit(): void {
    // this.initDefaultLog();
  }

  private initDefaultLog() {
    this.defaultDataLog.forEach((data) => {
      console.log(data.message, ...data.style);
    });
  }

  changeTheme(theme: Theme) {
    this.themeService.theme = theme;
  }

  isActivePath(currentPath: string | null, routerLink: string | string[]) {
    if (routerLink && typeof routerLink === 'object') {
      routerLink = routerLink.join('/');
    }
    return currentPath ? currentPath.includes(routerLink) : false;
  }
}
