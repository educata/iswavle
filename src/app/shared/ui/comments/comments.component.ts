import { isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  PLATFORM_ID,
  Renderer2,
  ViewContainerRef,
  inject,
} from '@angular/core';

@Component({
  selector: 'sw-comments',
  standalone: true,
  imports: [],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentsComponent implements OnInit {
  private readonly renderer = inject(Renderer2);
  private readonly vcr = inject(ViewContainerRef);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  ngOnInit(): void {
    if (this.isBrowser) {
      const script = this.renderer.createElement('script');
      this.renderer.setAttribute(
        script,
        'src',
        'https://utteranc.es/client.js',
      );
      this.renderer.setAttribute(script, 'repo', 'educata/iswavle-comments');
      this.renderer.setAttribute(script, 'issue-term', 'title');
      this.renderer.setAttribute(script, 'label', 'კომენტარი 💬');
      this.renderer.setAttribute(script, 'theme', 'github-light');
      this.renderer.setAttribute(script, 'crossorigin', 'anonymous');
      this.renderer.setAttribute(script, 'async', '');
      (this.vcr.element.nativeElement as HTMLElement).appendChild(script);
    }
  }
}
