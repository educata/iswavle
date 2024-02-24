import { InjectionToken } from '@angular/core';

import { ContentLoader, DocContent } from '@app-shared/interfaces';
import { ContentLoaderService } from '@app-shared/services';

export const DOCS_CONTENT_LOADER = new InjectionToken<
  ContentLoader<DocContent>
>('DOCS_CONTENT_LOADER', {
  providedIn: 'root',
  factory: () => new ContentLoaderService(),
});
