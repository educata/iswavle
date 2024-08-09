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
    { title: 'შეცდომების კონტროლი', path: 'error-handling' },
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
    {
      title: 'კანვასი',
      path: 'canvas',
      children: [
        {
          title: 'ძირითადი გამოყენება',
          path: 'basic-usage',
        },
        {
          title: 'ფიგურების დახატვა',
          path: 'drawing-figures',
        },
        {
          title: 'სტილიზაციების და ფერების მინიჭება',
          path: 'style-and-colors',
        },
        {
          title: 'ტექსტების დახატვა',
          path: 'drawing-text',
        },
        {
          title: 'სურათების გამოყენება',
          path: 'using-images',
        },
        {
          title: 'ტრანსფორმაციები',
          path: 'transformations',
        },
        {
          title: 'მარტივი ანიმაციები',
          path: 'basic-animations',
        },
        {
          title: 'რთული ანიმაციები',
          path: 'advanced-animations',
        },
        {
          title: 'კანვასის ოპტიმიზირება',
          path: 'optimization',
        },
        {
          title: 'Breakout თამაში',
          path: 'breakout',
        },
        {
          title: 'Stickman თამაში',
          path: 'stickman',
        },
        {
          title: 'შეჯამება',
          path: 'summary',
        },
      ],
    },
    {
      title: 'ასინქრონული პროგრამირება',
      path: 'async-programming',
      children: [
        {
          title: 'Promise',
          path: 'promise',
        },
        {
          title: 'Async & Await',
          path: 'async-await',
        },
      ],
    },
  ],
};
