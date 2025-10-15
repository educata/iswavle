const textContainer = document.querySelector('.text');
const container = document.querySelector('.container');
const controls = document.querySelector('.controls');
const result = document.querySelector('.result');
const items = document.querySelector('.list');

const STYLE_ATTRIBUTE_VALUE = 'data-style-value';
const extractedData = extractDataFromLocation();

init();

function init() {
  extractedData.values.forEach((style, index, self) => {
    const row = document.createElement('div');
    row.classList.add('list-item');
    row.innerHTML = `<span style="color: var(--code-property-color)">${extractedData.style}</span>: <span style="color: var(--code-value-color)">${style}</span>;`;
    row.setAttribute(STYLE_ATTRIBUTE_VALUE, style);
    row.addEventListener('click', selectRow);
    if (index === 0) {
      row.click();
    }
    items.appendChild(row);
    if (index + 1 === self.length) {
      textContainer.style.maxHeight =
        items.clientHeight - (extractedData.showDirection ? 56 : 0) + 'px';
    }
  });

  if (extractedData.values.length === 0) {
    container.innerHTML =
      'მოცემული პარამეტრებით ვერ მოხდა მაგალითის დაგენერირება 😟';
    container.style.display = 'flex';
    container.style.padding = '25px';
    container.style.justifyContent = 'center';
    container.style.alignContent = 'center';
  }

  if (extractedData.text.length > 0) {
    result.querySelector('p').innerHTML = extractedData.text;
  }

  if (extractedData.showDirection) {
    const button = document.createElement('button');
    button.classList.add('direction');
    button.innerHTML = 'მიმართულება LTR';
    button.setAttribute('data-direction', 'ltr');
    button.addEventListener('click', toggleDirection);
    button.style.color = 'var(--primary-text-color)';
    controls.appendChild(button);
    controls.style.borderTop = '1px solid #cdcdcd';
  } else {
    result.style.gridTemplateRows = '1fr';
    controls.remove();
  }
}

function selectRow() {
  document.querySelectorAll('.list-item').forEach((item) => {
    item.classList.remove('active');
  });
  this.classList.add('active');
  result.querySelector('p').style[extractedData.style] = this.getAttribute(
    STYLE_ATTRIBUTE_VALUE,
  );
}

function toggleDirection() {
  const isLtr = this.getAttribute('data-direction') === 'ltr';
  const direction = isLtr ? 'rtl' : 'ltr';
  this.setAttribute('data-direction', direction);
  this.innerHTML = `მიმართულება ${direction.toUpperCase()}`;
  result.style.direction = direction;
}

function extractDataFromLocation() {
  const data = {
    values: [],
    style: '',
    text: '',
    showDirection: false,
  };

  const search = location.search;

  if (!search) {
    return data;
  }

  const params = new URLSearchParams(search);
  const style = params.get('style');
  const values = params.get('data');
  const text = params.get('text');
  const showDirection = params.get('showDirection');

  if (!style && !values) {
    return data;
  }

  try {
    data.values = JSON.parse(values);
    data.style = style;
    data.showDirection = Boolean(showDirection);
    if (text) {
      data.text = decodeURI(text);
    }
  } catch (e) {
    console.warn('შეცდომა პარამეტრების გაპარსვის დროს', e);
  }

  return data;
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
