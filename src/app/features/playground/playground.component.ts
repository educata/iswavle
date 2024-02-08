import {
  ChangeDetectionStrategy,
  Component,
  PLATFORM_ID,
  inject,
  signal,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { NzIconModule, NzIconService } from 'ng-zorro-antd/icon';
import { CUSTOM_ICONS, ICON_PREFIX } from '../../shared/consts';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import {
  NzFormatEmitEvent,
  NzTreeModule,
  NzTreeNode,
  NzTreeNodeOptions,
} from 'ng-zorro-antd/tree';
import { NzCodeEditorModule } from 'ng-zorro-antd/code-editor';
import { FormsModule } from '@angular/forms';
import { NzConfigService } from 'ng-zorro-antd/core/config';

@Component({
  selector: 'sw-playground',
  standalone: true,
  imports: [
    CommonModule,
    NzIconModule,
    NzTreeModule,
    NzCodeEditorModule,
    FormsModule,
  ],
  templateUrl: './playground.component.html',
  styleUrl: './playground.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PlaygroundComponent {
  private readonly platform = inject(PLATFORM_ID);
  private readonly iconService = inject(NzIconService);
  private readonly route = inject(ActivatedRoute);
  private readonly nzConfigService = inject(NzConfigService);

  isBrowser = isPlatformBrowser(this.platform);
  files = toSignal(
    this.route.data.pipe(map((res) => [res['data']] as NzTreeNodeOptions[])),
  );
  openFile = signal<string>('');

  constructor() {
    for (const key in CUSTOM_ICONS) {
      this.iconService.addIconLiteral(ICON_PREFIX + key, CUSTOM_ICONS[key]);
    }
  }

  selectFile(event: NzFormatEmitEvent) {
    if (event.node && event.node.isLeaf) {
      this.openFile.set(event.node.origin['content']);
      // TODO: Either make this work or write custom structural directive to re-render editor component

      // const defaultConfig =
      //   this.nzConfigService.getConfigForComponent('codeEditor')
      //     ?.defaultEditorOption || {};
      // this.nzConfigService.set('codeEditor', {
      //   defaultEditorOption: {
      //     ...defaultConfig,
      //     language: event.node.origin['language'],
      //     theme: 'vs-dark',
      //   },
      // });
    }
  }
}
