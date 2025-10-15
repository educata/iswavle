import { InjectionToken } from '@angular/core';
import { EXECISES_NAVIGATION as NAVIGATION } from '@app-shared/consts/exercise-navigation';
import { BaseNavigationTreeNode } from '@app-shared/interfaces';

export const EXERCISES_NAVIGATION = new InjectionToken<
  BaseNavigationTreeNode[]
>('EXERCISES_NAVIGATION', {
  providedIn: 'root',
  factory: () => NAVIGATION,
});
