import { InjectionToken, inject } from '@angular/core';
import { Navigation } from '../interfaces';
import { HEADER_NAVIGATION } from '../consts/navigation';
import { DOC_NAVIGATION } from './doc-navigation';

export const NAVIGATION = new InjectionToken<Navigation[]>('NAVIGATION', {
  providedIn: 'root',
  factory: () => headerNavigationFactory(HEADER_NAVIGATION),
});

export function headerNavigationFactory(navigation: Navigation[]) {
  const docNavigation = inject(DOC_NAVIGATION);

  navigation.push(
    ...docNavigation.map((nav) => ({
      title: nav.title,
      routerLink: nav.routerLink,
    })),
  );

  return navigation;
}
