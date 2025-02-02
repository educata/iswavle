const container = document.querySelector('.container');
const result = document.querySelector('.result');
const items = document.querySelector('.list');

const STYLE_ATTRIBUTE_VALUE = 'data-style-value';

const STYLE_PROPERTY = extractDataFromLocation().style;
const data = extractDataFromLocation().values;

data.forEach((style, index) => {
  const row = document.createElement('div');
  row.classList.add('list-item');
  row.innerHTML = `<span style="color: #00f">${STYLE_PROPERTY}</span>: <span style="color: #a31515">${style}</span>;`;
  row.setAttribute(STYLE_ATTRIBUTE_VALUE, style);
  row.addEventListener('click', selectRow);
  if (index === 0) {
    row.click();
  }
  items.appendChild(row);
});

if (data.length === 0) {
  container.innerHTML =
    'მოცემული პარამეტრებით ვერ მოხდა მაგალითის დაგენერირება 😟';
  container.style.display = 'flex';
  container.style.padding = '25px';
  container.style.justifyContent = 'center';
  container.style.alignContent = 'center';
}

function selectRow() {
  document.querySelectorAll('.list-item').forEach((item) => {
    item.classList.remove('active');
  });
  this.classList.add('active');
  result.style[STYLE_PROPERTY] = this.getAttribute(STYLE_ATTRIBUTE_VALUE);
}

function extractDataFromLocation() {
  const data = {
    values: [],
    style: '',
  };

  const search = location.search;

  if (!search) {
    return data;
  }

  const params = new URLSearchParams(search);
  const style = params.get('style');
  const values = params.get('data');

  if (!style && !values) {
    return data;
  }

  try {
    data.values = JSON.parse(values);
    data.style = style;
  } catch (e) {
    console.warn('შეცდომა პარამეტრების გაპარსვის დროს', e);
  }

  return data;
}
