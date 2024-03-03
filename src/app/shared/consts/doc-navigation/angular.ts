import { BaseNavigationTreeNode } from '@app-shared/interfaces';

export const ANGULAR_GUIDE_NAV: BaseNavigationTreeNode = {
  title: 'Angular',
  path: 'angular',
  children: [
    {
      title: 'შესავალი',
      path: 'introduction',
      children: [
        { title: 'ინსტალაცია', path: 'getting-started' },
        { title: 'კომპონენტის შექმნა', path: 'creating-component' },
        {
          title: 'ინტერპოლაცია და ივენთ ბაინდინგი',
          path: 'interpolation-data-binding',
        },
      ],
    },
    {
      title: 'Data Binding - მონაცემების მიბმა',
      path: 'data-binding',
      children: [
        {
          title: 'Property & Attribute Binding',
          path: 'property-and-attribute-binding',
        },
        {
          title: 'Input & Output',
          path: 'input-output',
        },
        {
          title: 'Two-way Binding',
          path: 'two-way-binding',
        },
      ],
    },
    {
      title: 'Directives',
      path: 'directives',
      children: [
        { title: 'დირექტივის შექმნა', path: 'creating-directive' },
        { title: 'ატრიბუტის დირექტივები', path: 'attribute-directives' },
        { title: 'სტრუქტურული დირექტივები', path: 'structural-directives' },
      ],
    },
    {
      title: 'Control Flow',
      path: 'control-flow',
    },
    {
      title: 'Pipes',
      path: 'pipes',
      children: [
        { title: 'ჩაშენებული ფაიფები', path: 'built-in-pipes' },
        { title: 'ფაიფის შექმნა', path: 'creating-pipe' },
      ],
    },
    {
      title: 'Dependency Injection',
      path: 'dependency-injection',
      children: [
        { title: 'DI ზოგადად', path: 'di-in-general' },
        {
          title: 'DI ანგულარში',
          path: 'di-in-angular',
          children: [
            {
              title: 'საწყისი კოდი',
              path: 'initial-setup',
            },
            {
              title: 'DI-ს გარეშე',
              path: 'without-di',
            },
            {
              title: 'DI-ს დახმარებით',
              path: 'with-di',
            },
          ],
        },
      ],
    },
    {
      title: 'Forms',
      path: 'forms',
      children: [
        {
          title: 'Template Driven Forms',
          path: 'template-driven',
        },
        {
          title: 'Reactive Forms',
          path: 'reactive',
        },
        {
          title: 'ვალიდაცია და ვალიდატორები',
          path: 'validation',
          children: [
            {
              title: 'ჩაშენებული ვალიდატორები',
              path: 'built-in-validators',
            },
            {
              title: 'ვალიდატორის შექმნა',
              path: 'creating-validator',
            },
            {
              title: 'ვალიდაციის მესიჯები',
              path: 'validation-messages',
            },
          ],
        },
      ],
    },
    {
      title: 'Routing',
      path: 'routing',
      children: [
        {
          title: 'მარტივი Routing',
          path: 'basic-routing',
        },
        {
          title: 'Child Routing',
          path: 'child-routing',
        },
        {
          title: 'Dynamic Routes',
          path: 'dynamic-routes',
          children: [
            {
              title: 'Route Params',
              path: 'route-params',
            },
            {
              title: 'Query Params',
              path: 'query-params',
            },
          ],
        },
      ],
    },
    {
      title: 'HTTP მოთხოვნებთან მუშაობა',
      path: 'http',
    },
    {
      title: 'Authentication - ავტორიზაცია',
      path: 'authentication',
      children: [
        {
          title: 'JWT Authentication',
          path: 'jwt-authentication',
        },
        {
          title: 'CanActivate',
          path: 'can-activate',
        },
      ],
    },
    {
      title: 'Standalone Components',
      path: 'standalone',
      children: [
        {
          title: 'შექმნა და გამოყენება',
          path: 'creation-and-usage',
        },
        {
          title: 'Routing & Lazy-loading',
          path: 'routing-and-lazy-loading',
        },
      ],
    },
    {
      title: 'RxJS ანგულარში',
      path: 'rxjs',
      children: [
        {
          title: 'Observable Stream',
          path: 'observable-stream',
        },
        {
          title: 'Operators',
          path: 'operators',
          children: [
            {
              title: 'Creation Operators',
              path: 'creation-operators',
            },
            {
              title: 'Pipeable Operators',
              path: 'pipeable-operators',
            },
          ],
        },
        {
          title: 'Subjects',
          path: 'subjects',
        },
      ],
    },
    {
      title: 'State Management RxJS-ით',
      path: 'state-management',
      children: [
        {
          title: 'პროექტის მომზადება',
          path: 'initial-setup',
        },
        {
          title: 'სთეითში მონაცემების ინიციალიზაცია',
          path: 'initializing-state',
        },
        {
          title: 'სთეითში მონაცემების დამატება',
          path: 'adding-data-to-state',
        },
        {
          title: 'სთეითში მოლოდინის რეჟიმისა და ერორის ასახვა',
          path: 'loading-state-and-error',
        },
        {
          title: 'წაშლა და მონიშვნა',
          path: 'update-and-delete',
        },
        {
          title: 'შეჯამება',
          path: 'summary',
        },
      ],
    },
    {
      title: 'NgModule',
      path: 'ng-modules',
    },
    {
      title: 'ინტერნაციონალიზაცია',
      path: 'internationalization',
      children: [
        {
          title: 'angular i18n',
          path: 'angular-i18n',
        },
        {
          title: 'ngx-translate',
          path: 'ngx-translate',
        },
        {
          title: 'შეჯამება',
          path: 'summary',
        },
      ],
    },
    {
      title: 'სიგნალები',
      path: 'signals',
    },
    {
      title: 'HostListener',
      path: 'at-host',
    },
    {
      title: 'Tests',
      path: 'tests',
    },
    {
      title: 'Deployment',
      path: 'deployment',
    },
  ],
};
