import { isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  PLATFORM_ID,
  Renderer2,
  ViewContainerRef,
  inject,
} from '@angular/core';
import { Theme } from '@iswavle/shared/utils';
import { ENVIRONMENT, ThemeService } from '@iswavle/shared/data-access';
import { tap } from 'rxjs';

@Component({
  selector: 'sw-comments',
  imports: [],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentsComponent {
  private readonly renderer = inject(Renderer2);
  private readonly vcr = inject(ViewContainerRef);
  private readonly environment = inject(ENVIRONMENT);
  private readonly themeService = inject(ThemeService);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  constructor() {
    this.themeService.theme$
      .pipe(
        tap((theme) => {
          if (this.isBrowser) {
            this.vcr.clear();
            (this.vcr.element.nativeElement as HTMLElement).innerHTML = '';
            const script = this.renderer.createElement('script');
            this.renderer.setAttribute(
              script,
              'src',
              this.environment.utterancClientCDN,
            );
            this.renderer.setAttribute(
              script,
              'repo',
              this.environment.commentsRepo,
            );
            this.renderer.setAttribute(script, 'issue-term', 'title');
            this.renderer.setAttribute(script, 'label', 'კომენტარი 💬');
            (this.renderer.setAttribute(
              script,
              'theme',
              `github-${Theme.Light === theme ? 'light' : 'dark'}`,
            ),
              this.renderer.setAttribute(script, 'crossorigin', 'anonymous'));
            this.renderer.setAttribute(script, 'async', '');
            (this.vcr.element.nativeElement as HTMLElement).appendChild(script);
          }
        }),
      )
      .subscribe();
  }
}
