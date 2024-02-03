import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterLink,
  RouterModule,
  RouterOutlet,
} from '@angular/router';
import { LOG_GREETER } from './shared/providers';
import { DOC_NAVIGATION } from './shared/providers/doc-navigation';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { SidenavComponent } from './shared/ui';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { AutoBreadcrumbsComponent } from './shared/ui/auto-breadcrumbs/auto-breadcrumbs.component';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
  selector: 'sw-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NzLayoutModule,
    NzBreadCrumbModule,
    NzMenuModule,
    SidenavComponent,
    AutoBreadcrumbsComponent,
    NzIconModule,
    NzButtonModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  private defaultDataLog = inject(LOG_GREETER);
  isCollapsed = false;

  navigation = inject(DOC_NAVIGATION)[0].children || [];

  ngOnInit(): void {}

  private initDefaultLog() {
    this.defaultDataLog.forEach((data) => {
      console.log(data.message, ...data.style);
    });
  }
}
