import { NavigationList } from '../interfaces';

export const NAVIGATION: NavigationList = [
  {
    title: 'Guides',
    path: 'guides',
    items: [
      {
        title: 'HTML&CSS',
        path: 'html-css',
        items: [{ title: 'შესავალი', path: 'introduction' }],
      },
      {
        title: 'JavaScript',
        path: 'javascript',
        items: [
          { title: 'შესავალი', path: 'introduction' },
          { title: 'რა არის JavaScript', path: 'what-is-javascript' },
          { title: 'ცვლადი', path: 'variable' },
        ],
      },
      {
        title: 'Angular',
        path: 'angular',
        items: [{ title: 'შესავალი', path: 'introduciton' }],
      },
    ],
  },
];
