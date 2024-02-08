import { NzTreeNodeOptions } from 'ng-zorro-antd/tree';
import { ExampleFile } from '../../../../shared/interfaces';

export type CodeParams = Record<string, string>;

export interface CodeContentLoader {
  getContent(params: CodeParams): Promise<NzTreeNodeOptions | null>;
}
