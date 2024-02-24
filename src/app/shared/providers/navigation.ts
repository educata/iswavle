import { InjectionToken, inject } from '@angular/core';
import { Navigation } from '@app-shared/interfaces';
import { HEADER_NAVIGATION } from '@app-shared/consts';
import { DOC_NAVIGATION } from './doc-navigation';

export const NAVIGATION = new InjectionToken<Navigation[]>('NAVIGATION', {
  providedIn: 'root',
  factory: () => headerNavigationFactory(HEADER_NAVIGATION),
});

export function headerNavigationFactory(navigation: Navigation[]) {
  const docNavigation = inject(DOC_NAVIGATION);
  return navigation.concat(
    docNavigation.map(({ title, routerLink }) => ({
      title,
      routerLink,
    })),
  );
}
