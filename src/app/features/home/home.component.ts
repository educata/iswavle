import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { CODE_BLOCKS } from './code-blocks';
import { BypassSanitizePipe } from '@app-shared/pipes';

@Component({
  selector: 'sw-home',
  standalone: true,
  imports: [NzButtonModule, RouterLink, BypassSanitizePipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class HomeComponent {
  readonly showcases = [
    {
      title: 'HTML & CSS',
      description: 'ვებგვერდის სტრუქტურა და სტილიზაცია',
      image: '/assets/images/html-css.png',
      routerLink: '/doc/guides/html-css',
      code: CODE_BLOCKS.htmlCss,
    },
    {
      title: 'JavaScript',
      description: 'ინტერაქციული ვებ-აპლიკაციებისთვის',
      image: '/assets/images/js.png',
      routerLink: '/doc/guides/javascript',
      code: CODE_BLOCKS.js,
    },
    {
      title: 'TypeScript',
      description: 'მკაცრადტიპიზირებული ჯავასკრიპტი',
      image: '/assets/images/ts.png',
      routerLink: '/doc/guides/typescript',
      code: CODE_BLOCKS.ts,
    },
    {
      title: 'Angular',
      description: 'Enterprise დონის ვებ-აპლიკაციები',
      image: '/assets/images/angular.png',
      routerLink: '/doc/guides/angular',
      code: CODE_BLOCKS.angular,
    },
  ];
}
