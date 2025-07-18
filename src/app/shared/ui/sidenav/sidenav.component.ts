import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMenuModule, NzMenuItemComponent } from 'ng-zorro-antd/menu';
import { NzTreeModule } from 'ng-zorro-antd/tree';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NavigationTreeNode } from '@app-shared/interfaces';
import { NavItemDirective } from './nav-item.directive';

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
  encapsulation: ViewEncapsulation.None,
})
export class SidenavComponent {
  @Input() navItems: NavigationTreeNode[] = [];

  @ContentChild('#menuTpl', { read: TemplateRef })
  menuTpl?: TemplateRef<unknown>;

  @Output() onClick = new EventEmitter<NzMenuItemComponent>();

  readonly paddingSize = 24;

  click(event: NzMenuItemComponent) {
    this.onClick.emit(event);
  }
}
