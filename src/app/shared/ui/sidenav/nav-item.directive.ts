import { Directive } from '@angular/core';
import { NavigationTreeNode } from '@app-shared/interfaces';

export type NavItemContext = {
  $implicit: NavigationTreeNode[];
  currentPath?: string;
  level: number;
};

@Directive({
  selector: 'ng-template[nav-item]',
  standalone: true,
})
export class NavItemDirective {
  static ngTemplateContextGuard(
    dir: NavItemDirective,
    ctx: unknown,
  ): ctx is NavItemContext {
    return true;
  }
}
