import { InjectionToken } from '@angular/core';
import { DEFAULT_LAYOUT_SIZES, LayoutSizes } from '@iswavle/shared/utils';

export const LAYOUT_SIZES = new InjectionToken<LayoutSizes>('LAYOUT_SIZES', {
  providedIn: 'root',
  factory: () => DEFAULT_LAYOUT_SIZES,
});
