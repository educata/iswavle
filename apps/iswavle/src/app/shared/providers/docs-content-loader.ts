import { InjectionToken } from '@angular/core';

import { ContentLoader, DocContent } from '@iswavle/shared/utils';
import { ContentLoaderService } from '@app-shared/services';

export const DOCS_CONTENT_LOADER = new InjectionToken<
  ContentLoader<DocContent>
>('DOCS_CONTENT_LOADER', {
  providedIn: 'root',
  factory: () => new ContentLoaderService(),
});
