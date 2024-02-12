import { InjectionToken } from '@angular/core';

import { ContentLoader, DocContent } from '../interfaces';
import { ContentLoaderService } from '../services';

export const DOCS_CONTENT_LOADER = new InjectionToken<
  ContentLoader<DocContent>
>('DOCS_CONTENT_LOADER', {
  providedIn: 'root',
  factory: () => new ContentLoaderService(),
});
