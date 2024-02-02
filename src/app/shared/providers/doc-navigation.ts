import { InjectionToken } from '@angular/core';
import { NavigationTreeNode } from '../interfaces';
import { DEFAULT_DOC_NAVIGATION } from '../consts';

export const DOC_NAVIGATION = new InjectionToken<NavigationTreeNode[]>(
  'DOC_NAVIGATION',
  {
    providedIn: 'root',
    factory: () => DEFAULT_DOC_NAVIGATION,
  },
);
