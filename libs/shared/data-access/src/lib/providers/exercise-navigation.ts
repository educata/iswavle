import { InjectionToken } from '@angular/core';
import { EXECISES_NAVIGATION as NAVIGATION } from '@iswavle/shared/utils';
import { BaseNavigationTreeNode } from '@iswavle/shared/utils';

export const EXERCISES_NAVIGATION = new InjectionToken<
  BaseNavigationTreeNode[]
>('EXERCISES_NAVIGATION', {
  providedIn: 'root',
  factory: () => NAVIGATION,
});
