import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from '@app-shared/ui';

@Component({
  selector: 'sw-home',
  standalone: true,
  imports: [CommonModule, LoaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class HomeComponent {}
