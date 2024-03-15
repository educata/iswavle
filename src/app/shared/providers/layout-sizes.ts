import { InjectionToken } from '@angular/core';
import { DEFAULT_LAYOUT_SIZES } from '@app-shared/consts/default-layout-sizes';
import { LayoutSizes } from '@app-shared/interfaces/layout-sizes';

export const LAYOUT_SIZES = new InjectionToken<LayoutSizes>('LAYOUT_SIZES', {
  providedIn: 'root',
  factory: () => DEFAULT_LAYOUT_SIZES,
});
