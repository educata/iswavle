import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
    selector: 'sw-loader',
    imports: [],
    templateUrl: './loader.component.html',
    styleUrl: './loader.component.less',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoaderComponent {
  @Input() isFullSize = false;
}
