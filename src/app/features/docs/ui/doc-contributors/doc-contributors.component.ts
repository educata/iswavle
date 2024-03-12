import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Contributor } from '@app-shared/interfaces';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';

@Component({
  selector: 'sw-doc-contributors',
  standalone: true,
  imports: [NzToolTipModule, NzAvatarModule],
  templateUrl: './doc-contributors.component.html',
  styleUrl: './doc-contributors.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocContributorsComponent {
  @Input() contributor: Contributor | null = null;
}
