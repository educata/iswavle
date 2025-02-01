import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CodeUtilService {
  extractCodeFromHTML(htmlElement: string): string {
    if (!htmlElement) return '';

    // Remove all HTML tags and get raw text
    let textContent = htmlElement.replace(/<\/?[^>]+(>|$)/g, '');

    // Decode HTML entities like &lt;, &gt;, &quot;, etc.
    const textArea = document.createElement('textarea');
    textArea.innerHTML = textContent;
    return textArea.value.trim();
  }
}
