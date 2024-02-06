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
  return navigation.concat(
    docNavigation.map(({ title, routerLink }) => ({
      title,
      routerLink,
    })),
  );
}
