import { BaseNavigationTreeNode } from '@app-shared/interfaces';

export const TYPESCRIPT_GUIDE_NAV: BaseNavigationTreeNode = {
  title: 'Typescript',
  path: 'typescript',
  children: [
    { title: 'შესავალი', path: 'introduction' },
    { title: 'tsc', path: 'tsc' },
    { title: 'ტიპები', path: 'types' },
    { title: 'ჯენერიკი', path: 'generic' },
    { title: 'კლასი', path: 'class' },
    { title: 'სასარგებლო ტიპები', path: 'utility-types' },
  ],
};
