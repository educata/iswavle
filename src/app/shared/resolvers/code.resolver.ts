import { inject } from '@angular/core';
import { ResolveFn, ActivatedRouteSnapshot } from '@angular/router';
import { NzTreeNodeOptions } from 'ng-zorro-antd/tree';
import { CODE_LOADER } from '@app-shared/providers/code-loader';
import { Params } from '@app-shared/interfaces';

export const codeResolver: ResolveFn<NzTreeNodeOptions | null> = (
  route: ActivatedRouteSnapshot,
) => {
  return inject(CODE_LOADER).getContent(route.params as Params);
};
