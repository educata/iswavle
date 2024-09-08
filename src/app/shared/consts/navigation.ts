import { Navigation } from '@app-shared/interfaces';

export const HEADER_NAVIGATION: Navigation[] = [
  {
    title: 'მთავარი',
    routerLink: '/',
  },
  // TODO: include after exercieses is finished
  // {
  //   title: 'სავარჯიშოები',
  //   routerLink: '/exercieses',
  // },
  {
    title: 'ედიტორი',
    routerLink: '/playground',
  },
  {
    title: 'roadmap', // TODO: ქართულად რა იქნება?
    routerLink: '/roadmap',
  },
];
