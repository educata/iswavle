const form = document.querySelector('form');
const iframe = document.querySelector('iframe');

const defaultHtmlText = '<h1>შეცვალე კოდი</h1>';
const defaultCssText = `h1 {
 color: #1890ff;
}`;

form.addEventListener('input', () => {
  const formData = new FormData(form);
  const html = formData.get('html');
  const css = formData.get('css');
  iframe.src = getSourceCode(html, css);
});

form.addEventListener('reset', () => {
  iframe.src = getSourceCode('', '');
});

initDefaultValues();

function initDefaultValues() {
  form.elements.html.value = defaultHtmlText;
  form.elements.css.value = defaultCssText;
  iframe.src = getSourceCode(defaultHtmlText, defaultCssText);
}

function getSourceCode(html = '', css = '') {
  return `data:text/html;charset=utf-8,${encodeURIComponent(generateHtml(html, css))}`;
}

function generateHtml(html, css) {
  return `
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Iswavle live simple editor example</title>
        <style>${css}</style>
        <style>
          body {
            margin: 0;
            padding: 8px;
            min-height: 100%;
          }
        </style>
      </head>
      <body>
        ${html}
      </body>
    </html>
  `;
}

/*
  Theme instalation from parent window
*/
(function initThemeFromParentContext() {
  window.addEventListener('message', (event) => {
    if (event.data.type !== "THEME_CHANGED") {
      return;
    }
    const currentTheme = document.body.classList[0] || 'light';
    document.body.classList.remove(currentTheme);
    document.body.classList.add(event.data.theme);
  });
})();
