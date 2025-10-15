import { BaseNavigationTreeNode } from '@app-shared/interfaces';
import {
  HTML_CSS_GUIDE_NAV,
  HTML_CSS_REFERENCE_NAV,
} from './doc-navigation/html-css';
import { ANGULAR_GUIDE_NAV } from './doc-navigation/angular';
import { JAVASCRIPT_GUIDE_NAV } from './doc-navigation/js';
import { TYPESCRIPT_GUIDE_NAV } from './doc-navigation/ts';
import { CLIENT_SIDE_TOOLS_NAV } from './doc-navigation/client-side-tools';

export const DEFAULT_DOC_NAVIGATION: BaseNavigationTreeNode[] = [
  {
    title: 'გზამკლევი',
    path: 'guides',
    children: [
      HTML_CSS_GUIDE_NAV,
      JAVASCRIPT_GUIDE_NAV,
      CLIENT_SIDE_TOOLS_NAV,
      TYPESCRIPT_GUIDE_NAV,
      ANGULAR_GUIDE_NAV,
    ],
  },
  // TODO: fill later
  // {
  //   title: 'ცნობარი',
  //   path: 'references',
  //   children: [HTML_CSS_REFERENCE_NAV],
  // },
];
