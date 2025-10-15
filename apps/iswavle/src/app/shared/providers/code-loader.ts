import { InjectionToken } from '@angular/core';
import { NzTreeNodeOptions } from 'ng-zorro-antd/tree';
import { CodeLoaderService } from '@app-shared/services';
import { ContentLoader } from '@app-shared/interfaces';

export const CODE_LOADER = new InjectionToken<ContentLoader<NzTreeNodeOptions>>(
  'CODE_LOADER',
  {
    providedIn: 'root',
    factory: () => new CodeLoaderService(),
  },
);
