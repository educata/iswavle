import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  OnInit,
  inject,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AsyncPipe, DOCUMENT, TitleCasePipe } from '@angular/common';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModeType, NzMenuModule } from 'ng-zorro-antd/menu';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { Theme } from '@app-shared/enums';
import { ThemeService } from '@app-shared/services';
import { LOG_GREETER, NAVIGATION } from './shared/providers';
import { BehaviorSubject, combineLatest, fromEvent, map } from 'rxjs';

@Component({
  selector: 'sw-root',
  standalone: true,
  imports: [
    RouterModule,
    NzLayoutModule,
    NzMenuModule,
    NzButtonComponent,
    NzIconModule,
    NzDropDownModule,
    TitleCasePipe,
    AsyncPipe,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  private readonly defaultDataLog = inject(LOG_GREETER);
  private readonly document = inject(DOCUMENT);
  private readonly themeService = inject(ThemeService);
  readonly headerNavigation = inject(NAVIGATION);
  readonly theme = Theme;

  isMenuOpenedByUser$ = new BehaviorSubject<boolean>(false);

  isWideScreen$ = fromEvent(this.document.defaultView as Window, 'resize').pipe(
    map((event) => (event.target as Window).innerWidth >= 830),
  );

  isMenuOpen$ = combineLatest([
    this.isWideScreen$,
    this.isMenuOpenedByUser$,
  ]).pipe(map(([isWideScreen, isOpenByUser]) => !isWideScreen && isOpenByUser));

  menuMode$ = this.isWideScreen$.pipe(
    map((isWide) => (isWide ? 'horizontal' : 'vertical')),
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
}
