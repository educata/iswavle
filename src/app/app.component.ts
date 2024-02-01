import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NAVIGATION, DEFAULT_LOG_DATA } from './shared/consts';

@Component({
  selector: 'sw-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent implements OnInit {
  private defaultDataLog = DEFAULT_LOG_DATA;

  navigation = NAVIGATION;

  ngOnInit(): void {
    this.initDefaultLog();
  }

  private initDefaultLog() {
    this.defaultDataLog.forEach((data) => {
      console.log(data.message, ...data.style);
    });
  }
}
