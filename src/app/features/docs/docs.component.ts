import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { DocContent } from '../../shared/interfaces';

@Component({
  selector: 'sw-docs',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './docs.component.html',
  styleUrl: './docs.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class DocsComponent {
  private readonly activatedRoute = inject(ActivatedRoute);

  private readonly article$ = this.activatedRoute.data.pipe(
    map((response) => response['data'] as DocContent),
  );

  article = toSignal(this.article$);
}
