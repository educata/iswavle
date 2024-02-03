import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'sw-playground',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './playground.component.html',
  styleUrl: './playground.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PlaygroundComponent {}
