import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { LOG_GREETER } from './shared/providers';
import { DOC_NAVIGATION } from './shared/providers/doc-navigation';

@Component({
  selector: 'sw-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent implements OnInit {
  private defaultDataLog = inject(LOG_GREETER);
  navigation = inject(DOC_NAVIGATION);

  ngOnInit(): void {
    // this.initDefaultLog();
  }

  private initDefaultLog() {
    this.defaultDataLog.forEach((data) => {
      console.log(data.message, ...data.style);
    });
  }
}
