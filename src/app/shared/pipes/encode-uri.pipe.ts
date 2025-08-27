import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'encodeURI',
  standalone: true,
})
export class EncodeURIPipe implements PipeTransform {
  transform(url: string): string {
    return encodeURI(url);
  }
}
