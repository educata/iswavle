import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  OnInit,
  PLATFORM_ID,
  inject,
} from '@angular/core';
import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
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
  ],
  templateUrl: './docs.component.html',
  styleUrl: './docs.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class DocsComponent implements OnInit {
  private readonly platform = inject(PLATFORM_ID);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly document = inject(DOCUMENT);
  private readonly article$ = this.activatedRoute.data.pipe(
    map((response) => response['data'] as DocContent),
  );
  // TODO: refactor inject for navigation
  readonly navigation = inject(DOC_NAVIGATION)[0].children || [];
  readonly article = toSignal(this.article$);
  readonly isBrowser = isPlatformBrowser(this.platform);
  readonly siderWidth = `250px`;

  isDrawerVisible = false;
  isXLarge = false;
  hideToc = false;

  @HostListener('window:resize') onResize() {
    this.hideToc = !(this.document.body.clientWidth >= 767);
    this.isXLarge = this.document.body.clientWidth >= 1330;
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      this.onResize();
    }
  }
}
