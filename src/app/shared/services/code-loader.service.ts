import { Injectable, inject } from '@angular/core';
import { CodeContentLoader, CodeParams } from '../interfaces/';
import { ExampleFile } from '../../../../shared/interfaces';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { firstValueFrom, catchError, EMPTY, map, tap } from 'rxjs';
import { NzTreeNodeOptions } from 'ng-zorro-antd/tree';
import { CUSTOM_ICONS, ICON_PREFIX } from '../consts';

// TODO: implement generic interface for loaders
@Injectable()
export class CodeLoaderService implements CodeContentLoader {
  private readonly cache = new Map<string, Promise<NzTreeNodeOptions | null>>();
  private readonly httpClient = inject(HttpClient);
  private readonly router = inject(Router);

  getContent(params: CodeParams): Promise<NzTreeNodeOptions | null> {
    const paths: string[] = [];
    Object.entries(params).forEach(([key, value]) => {
      paths[parseInt(key)] = value;
    });
    const path = `/assets/examples/${paths.filter(Boolean).join('/')}`;
    if (!this.cache.has(path)) {
      this.cache.set(
        path,
        firstValueFrom(
          this.httpClient.get<ExampleFile>(`${path}.json`).pipe(
            catchError((err) => {
              this.router.navigateByUrl('/404');
              return EMPTY;
            }),
            map((file) => this.map(file)),
          ),
        ),
      );
    }
    return this.cache.get(path)!;
  }

  map(file: ExampleFile): NzTreeNodeOptions {
    return {
      title: file.name,
      key: file.name,
      isLeaf: !file.children,
      children: file?.children?.map((child) => this.map(child)),
      icon: file.children?.length
        ? ICON_PREFIX + 'folder'
        : ICON_PREFIX + file.name.split('.').pop() || 'document',
      expanded: true,
      content: file.content,
      language: file.children ? undefined : file.name.split('.').pop(),
    };
  }
}
