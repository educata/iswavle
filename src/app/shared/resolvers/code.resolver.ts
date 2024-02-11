import { inject } from '@angular/core';
import { ResolveFn, ActivatedRouteSnapshot } from '@angular/router';
import { ExampleFile } from '../../../../shared/interfaces';
import { CodeParams } from '../interfaces';
import { CODE_LOADER } from '../providers/code-loader';
import { NzTreeNodeOptions } from 'ng-zorro-antd/tree';

export const codeResolver: ResolveFn<NzTreeNodeOptions | null> = (
  route: ActivatedRouteSnapshot,
) => {
  return inject(CODE_LOADER).getContent(route.params as CodeParams);
};