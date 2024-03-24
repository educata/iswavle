import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchBreadcrumb',
  standalone: true,
})
export class SearchBreadcrumbPipe implements PipeTransform {
  transform(value: string) {
    return value
      .split('/')
      .map((element) => {
        return element
          .split('')
          .map((symbol, index) => (index === 0 ? symbol.toUpperCase() : symbol))
          .join('');
      })
      .slice(0, -1)
      .join(' > ');
  }
}
