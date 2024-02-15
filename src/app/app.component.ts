import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  OnInit,
  inject,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { LOG_GREETER, NAVIGATION } from './shared/providers';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModeType, NzMenuModule } from 'ng-zorro-antd/menu';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'sw-root',
  standalone: true,
  imports: [
    RouterModule,
    NzLayoutModule,
    NzMenuModule,
    NzButtonComponent,
    NzIconModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  private defaultDataLog = inject(LOG_GREETER);
  readonly headerNavigation = inject(NAVIGATION);

  isOpen = false;
  menuMode: NzMenuModeType = 'horizontal';

  @HostListener('window:resize', ['$event']) onResize(event: Event) {
    const target = event.target as Window;
    this.menuMode = target.screen.availWidth >= 768 ? 'horizontal' : 'vertical';
    if (target.screen.availWidth >= 768) {
      this.isOpen = false;
    }
  }

  ngOnInit(): void {
    // this.initDefaultLog();
  }

  toggleMenu() {
    this.isOpen = !this.isOpen;
    this.menuMode = this.isOpen ? 'vertical' : 'horizontal';
  }

  private initDefaultLog() {
    this.defaultDataLog.forEach((data) => {
      console.log(data.message, ...data.style);
    });
  }
}
