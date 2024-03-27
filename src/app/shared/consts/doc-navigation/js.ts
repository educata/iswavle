import { BaseNavigationTreeNode } from '@app-shared/interfaces';

export const JAVASCRIPT_GUIDE_NAV: BaseNavigationTreeNode = {
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
    {
      title: 'შესავალი DOM-ში',
      path: 'dom',
      children: [
        {
          title: 'სელექტორები',
          path: 'selectors',
        },
        {
          title: 'ივენთები',
          path: 'events',
        },
        {
          title: 'მანიპულაცია ელემენტებზე',
          path: 'elements-manipulation',
        },
        {
          title: 'ფერების თამაში',
          path: 'color-game',
        },
      ],
    },
  ],
};
