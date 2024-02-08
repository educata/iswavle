import { InjectionToken } from '@angular/core';

import { CodeContentLoader } from '../interfaces';
import { CodeLoaderService } from '../services';

export const CODE_LOADER = new InjectionToken<CodeContentLoader>(
  'CODE_LOADER',
  {
    providedIn: 'root',
    factory: () => new CodeLoaderService(),
  },
);
