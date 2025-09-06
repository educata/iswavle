import hljs from 'highlight.js';

export function codeRenderer(
  code: string,
  language: string | undefined,
): string {
  let showPreview = false;

  if (language?.includes('preview') && language?.length > 7) {
    language = language.replaceAll('preview', '').trim();
    showPreview = true;
  }

  if (language === 'mermaid' || language === 'preview') {
    return code;
  }

  const validLang = !!(language && hljs.getLanguage(language));

  const highlighted = validLang
    ? hljs.highlight(code, { language: language || '' }).value
    : code;

  return `<div class="code-wrapper" data-language="${language}" ${showPreview ? 'data-show-preview' : ''}><div class="language-header"><span>${language?.toUpperCase()}</span><button><svg width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M208 0H332.1c12.7 0 24.9 5.1 33.9 14.1l67.9 67.9c9 9 14.1 21.2 14.1 33.9V336c0 26.5-21.5 48-48 48H208c-26.5 0-48-21.5-48-48V48c0-26.5 21.5-48 48-48zM48 128h80v64H64V448H256V416h64v48c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V176c0-26.5 21.5-48 48-48z" /></svg></button></div><pre><code class="hljs ${language}">${highlighted}</code></pre></div>`;
}
