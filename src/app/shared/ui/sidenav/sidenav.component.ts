import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  Input,
  TemplateRef,
} from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzTreeModule } from 'ng-zorro-antd/tree';
import { NavigationTreeNode } from '../../interfaces';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavItemDirective } from './nav-item.directive';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'sw-sidenav',
  standalone: true,
  imports: [
    CommonModule,
    NzMenuModule,
    NzIconModule,
    NzTreeModule,
    NzInputModule,
    FormsModule,
    NavItemDirective,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidenavComponent {
  @Input() navItems: NavigationTreeNode[] = [];

  @ContentChild('#menuTpl', { read: TemplateRef })
  menuTpl?: TemplateRef<unknown>;
}
