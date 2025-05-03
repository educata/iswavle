import { inject, Pipe, PipeTransform } from '@angular/core';
import { SanitizerService } from '@app-shared/services';

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
