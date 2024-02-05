import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { DOC_NAVIGATION } from '../../providers/doc-navigation';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NavigationTreeNode } from '../../interfaces';
import { filter, map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'sw-auto-breadcrumbs',
  standalone: true,
  imports: [NzBreadCrumbModule, RouterLink],
  templateUrl: './auto-breadcrumbs.component.html',
  styleUrl: './auto-breadcrumbs.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AutoBreadcrumbsComponent {
  private readonly navigation = inject(DOC_NAVIGATION);
  private readonly router = inject(Router);

  currentNode = toSignal(
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map(() => this.router.url),
      map((url) => {
        let found: NavigationTreeNode | undefined;

        const dig = (nodes: NavigationTreeNode[], matcher: string) => {
          nodes.forEach((node) => {
            if (node.routerLink.join('/').slice(1) === matcher) {
              found = node;
              return;
            }

            if (node.children?.length) {
              dig(node.children, matcher);
            }
          });
        };

        dig(this.navigation, url);

        return found
          ? {
              ...found,
              routerLink: found.routerLink
                .slice(1)
                .map(
                  (link, index, self) =>
                    `/${self.slice(0, index + 1).join('/')}`,
                ),
            }
          : null;
      }),
    ),
  );
}
