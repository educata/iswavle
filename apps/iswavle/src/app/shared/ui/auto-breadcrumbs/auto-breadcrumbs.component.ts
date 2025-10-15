import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map } from 'rxjs';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { DOC_NAVIGATION } from '@app-shared/providers';
import { NavigationTreeNode } from '@app-shared/interfaces';

@Component({
  selector: 'sw-auto-breadcrumbs',
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
      map(() => this.router.url.split('?')[0].split('#')[0]),
      map((url) => {
        let found: NavigationTreeNode | undefined;

        const dig = (nodes: NavigationTreeNode[], matcher: string) => {
          nodes.forEach((node) => {
            if ('/' + node.routerLink.join('/').slice(1) === matcher) {
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
                    `/doc/${self.slice(0, index + 1).join('/')}`,
                ),
            }
          : null;
      }),
    ),
  );
}
