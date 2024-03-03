import { BaseNavigationTreeNode } from '@app-shared/interfaces';

export const HTML_CSS_GUIDE_NAV: BaseNavigationTreeNode = {
  title: 'HTML&CSS',
  path: 'html-css',
  children: [
    { title: 'შესავალი', path: 'introduction' },
    { title: 'შესავალი CSS-ში', path: 'css' },
    { title: 'ცხრილები', path: 'table' },
    { title: 'ტექსტის გასტილვა', path: 'styling-text' },
    { title: 'Box Model (ყუთის მოდელი)', path: 'box-model' },
  ],
};

export const HTML_CSS_REFERENCE_NAV: BaseNavigationTreeNode = {
  title: 'HTML',
  path: 'html',
  children: [
    {
      title: '<center>',
      path: 'center',
      depricated: true,
    },
  ],
};
