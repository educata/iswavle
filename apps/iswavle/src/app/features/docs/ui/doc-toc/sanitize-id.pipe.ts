import { inject, Pipe, PipeTransform } from '@angular/core';
import { SanitizerService } from '@iswavle/shared/data-access';

@Pipe({
  name: 'sanitizeId',
  standalone: true,
})
export class SanitizeIdPipe implements PipeTransform {
  private readonly sanitizer = inject(SanitizerService);

  transform(id: string) {
    return this.sanitizer.sanitizeTocID(id);
  }
}
