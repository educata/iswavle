import { Pipe, PipeTransform } from '@angular/core';
import { LANGUAGE_MAP } from '@app-shared/consts';

@Pipe({
  name: 'languageExtension',
  standalone: true,
})
export class LanguageExtensionPipe implements PipeTransform {
  transform(path: string): string {
    const extension = path.split('.').pop();
    return extension ? LANGUAGE_MAP[extension] || extension : 'txt';
  }
}
