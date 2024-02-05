import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { LOG_GREETER, NAVIGATION } from './shared/providers';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';

@Component({
  selector: 'sw-root',
  standalone: true,
  imports: [RouterModule, NzLayoutModule, NzMenuModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  private defaultDataLog = inject(LOG_GREETER);
  readonly headerNavigation = inject(NAVIGATION);

  ngOnInit(): void {}

  private initDefaultLog() {
    this.defaultDataLog.forEach((data) => {
      console.log(data.message, ...data.style);
    });
  }
}
