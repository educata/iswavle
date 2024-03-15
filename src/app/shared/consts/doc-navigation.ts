import { BaseNavigationTreeNode } from '@app-shared/interfaces';
import {
  HTML_CSS_GUIDE_NAV,
  HTML_CSS_REFERENCE_NAV,
} from './doc-navigation/html-css';
import { JAVASCRIPT_GUIDE_NAV } from './doc-navigation/js';
import { ANGULAR_GUIDE_NAV } from './doc-navigation/angular';

export const DEFAULT_DOC_NAVIGATION: BaseNavigationTreeNode[] = [
  {
    title: 'გზამკლევი',
    path: 'guides',
    children: [HTML_CSS_GUIDE_NAV, JAVASCRIPT_GUIDE_NAV, ANGULAR_GUIDE_NAV],
  },
  // TODO: fill later
  // {
  //   title: 'ცნობარი',
  //   path: 'references',
  //   children: [HTML_CSS_REFERENCE_NAV],
  // },
];
