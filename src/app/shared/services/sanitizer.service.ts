import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SanitizerService {
  sanitizeTocID(id: string) {
    return id.replaceAll('?', '');
  }
}
