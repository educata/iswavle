import { Pipe, PipeTransform } from '@angular/core';

const langMap: Record<string, string> = {
  js: 'javascript',
};

@Pipe({
  name: 'languageExtension',
  standalone: true,
})
export class LanguageExtensionPipe implements PipeTransform {
  transform(path: string): string {
    const extension = path.split('.').pop();
    return extension ? langMap[extension] || extension : 'txt';
  }
}
