import {
  ChangeDetectionStrategy,
  Component,
  Input,
  Output,
  EventEmitter,
  inject,
  computed,
} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { map } from 'rxjs';
import { NzAnchorModule } from 'ng-zorro-antd/anchor';
import { SanitizeIdPipe } from './sanitize-id.pipe';
import { TocItem } from '@app-shared/interfaces';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { toSignal } from '@angular/core/rxjs-interop';
import { NgTemplateOutlet } from '@angular/common';
import { ENVIRONMENT } from '@app-shared/providers/environment';

@Component({
  selector: 'sw-doc-toc',
  standalone: true,
  imports: [NzAnchorModule, SanitizeIdPipe, NzDividerModule, NgTemplateOutlet],
  templateUrl: './doc-toc.component.html',
  styleUrl: './doc-toc.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocTocComponent {
  @Input() isFixed = true;
  @Input() docAttrs!: TocItem[];
  @Output() onClick = new EventEmitter<string>();

  private readonly environment = inject(ENVIRONMENT);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly routeParams = toSignal(this.activatedRoute.params, {
    initialValue: {} as Params,
  });

  readonly articleEditUrl = computed(() => {
    const params = this.routeParams();
    let url = '';
    for (const key in params) {
      url += `/${params[key]}`;
    }
    return `${this.environment.githubRepoURL}/edit/main/src/content/${url}.md`;
  });

  readonly staticAdditionalLinks: Array<{
    label: string;
    href: string | undefined;
    isExternal?: boolean;
  }> = [
    {
      label: 'გახსენი იშუ (შეცვალე)',
      href: `${this.environment.githubRepoURL}/issues/new/choose`,
      isExternal: true,
    },
    {
      label: 'დატოვე კომენტარი',
      href: 'comments',
    },
  ];
}
