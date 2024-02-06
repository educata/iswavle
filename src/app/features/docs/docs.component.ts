import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, tap } from 'rxjs';
import { DocContent } from '../../shared/interfaces';
import { DocTocComponent, DocViewerComponent } from './ui';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { SidenavComponent, AutoBreadcrumbsComponent } from '../../shared/ui';
import { DOC_NAVIGATION } from '../../shared/providers/doc-navigation';

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
  ],
  templateUrl: './docs.component.html',
  styleUrl: './docs.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class DocsComponent {
  private readonly activatedRoute = inject(ActivatedRoute);

  private readonly article$ = this.activatedRoute.data.pipe(
    map((response) => response['data'] as DocContent),
  );

  navigation = inject(DOC_NAVIGATION)[0].children || [];

  article = toSignal(this.article$);
}
