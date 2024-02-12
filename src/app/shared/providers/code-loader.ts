import { InjectionToken } from '@angular/core';
import { NzTreeNodeOptions } from 'ng-zorro-antd/tree';
import { CodeLoaderService } from '../services';
import { ContentLoader } from '../interfaces';

export const CODE_LOADER = new InjectionToken<ContentLoader<NzTreeNodeOptions>>(
  'CODE_LOADER',
  {
    providedIn: 'root',
    factory: () => new CodeLoaderService(),
  },
);
