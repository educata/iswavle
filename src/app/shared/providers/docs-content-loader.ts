import { InjectionToken } from '@angular/core';

import { DocsContentLoader } from '../interfaces';
import { ContentLoaderService } from '../services';

export const DOCS_CONTENT_LOADER = new InjectionToken<DocsContentLoader>(
  'DOCS_CONTENT_LOADER',
  {
    providedIn: 'root',
    factory: () => new ContentLoaderService(),
  },
);
