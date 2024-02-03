import { BaseNavigationTreeNode } from '../interfaces';

export const DEFAULT_DOC_NAVIGATION: BaseNavigationTreeNode[] = [
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
          { title: 'მონაცემთა ტიპები', path: 'data-types' },
          { title: 'ოპერაციები და ოპერატორები', path: 'operations-operators' },
          { title: 'ლოგიკური გამოსახულებები', path: 'logical-expression' },
          { title: 'ფუნქცია', path: 'function' },
          { title: 'ობიექტები ნაწილი #1', path: 'object-basics' },
          { title: 'მასივი', path: 'array' },
          { title: 'ციკლი', path: 'loops' },
          { title: 'სტრინგი', path: 'string' },
          { title: 'რეგულარული გამოსახულებები', path: 'regex' },
          { title: 'მათემატიკური ობიექტი', path: 'math' },
          { title: 'რიცხვი', path: 'number' },
          { title: 'კონსოლის ობიექტი', path: 'console' },
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