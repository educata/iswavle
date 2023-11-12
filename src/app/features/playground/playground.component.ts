import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'sw-playground',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './playground.component.html',
  styleUrl: './playground.component.less',
})
export default class PlaygroundComponent {}
