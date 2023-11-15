import { NavigationTreeNode } from '../interfaces';

export const NAVIGATION: NavigationTreeNode[] = [
  {
    title: 'Guides',
    path: 'guides',
    children: [
      {
        title: 'HTML&CSS',
        path: 'html-css',
        children: [{ title: 'შესავალი', path: 'introduction' }],
      },
      {
        title: 'JavaScript',
        path: 'javascript',
        children: [
          { title: 'შესავალი', path: 'introduction' },
          { title: 'რა არის JavaScript', path: 'what-is-javascript' },
          { title: 'ცვლადი', path: 'variable' },
        ],
      },
      {
        title: 'Angular',
        path: 'angular',
        children: [{ title: 'შესავალი', path: 'introduciton' }],
      },
    ],
  },
  {
    title: 'References',
    path: 'references',
    children: [
      {
        title: 'HTML',
        path: 'html',
        children: [
          {
            title: '<center>',
            path: 'center',
            depricated: true,
          },
        ],
      },
    ],
  },
];
