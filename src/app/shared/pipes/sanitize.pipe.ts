import { Pipe, PipeTransform, inject } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'sanitize',
  standalone: true,
})
export class SanitizePipe implements PipeTransform {
  private readonly domSanitizer = inject(DomSanitizer);

  transform(value: string): unknown {
    return this.domSanitizer.sanitize(1, value);
  }
}
