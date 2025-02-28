import { Pipe, PipeTransform, inject } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'bypassSanitize',
  standalone: true,
})
export class BypassSanitizePipe implements PipeTransform {
  private readonly domSanitizer = inject(DomSanitizer);

  transform(value: string) {
    return this.domSanitizer.bypassSecurityTrustHtml(value);
  }
}
