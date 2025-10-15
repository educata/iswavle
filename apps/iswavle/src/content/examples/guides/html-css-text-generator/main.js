const form = document.querySelector('form');
const result = document.querySelector('iframe');
const DATA_INPUT_REGEX = /\S+\([^)]*\)|\S+/g;
const ONE_ROW_HEIGHT = 77;
const baseUrl = 'https://static.iswavle.com/guides/html-css-text/index.html';

result.src = baseUrl;

form.addEventListener('change', handleFormChange);
form.addEventListener('submit', handleFormSubmit);
form.addEventListener('reset', handleFormReset);
form.reset();

function handleFormChange(e) {
  e.preventDefault();
  const formData = new FormData(form);
  const style = formData.get('style');
  const data = formData.get('data');
  const text = formData.get('text');
  const rtlControl = Boolean(formData.get('rtlControl') || false);

  const searchParams = new URLSearchParams();
  searchParams.set('style', style);
  if (rtlControl) {
    searchParams.set('showDirection', true);
  }
  if (text) {
    searchParams.set('text', text);
  }
  searchParams.set('data', JSON.stringify(data.match(DATA_INPUT_REGEX) || []));
  const url = `${baseUrl}?${searchParams.toString()}`;
  result.src = url;
}

function handleFormReset(e) {
  e.preventDefault();
  form.reset();
  handleFormChange(e);
}

function handleFormSubmit(e) {
  e.preventDefault();
  const suggestedHeight =
    (document.querySelector('#data').value.match(DATA_INPUT_REGEX) || [])
      .length * ONE_ROW_HEIGHT;
  navigator.clipboard.writeText(
    `<iframe data-url="guides/html-css-text" data-search-params="${result.src.split('?')[1]}" data-title="შემცვალე!" data-height="${suggestedHeight}"></iframe>`,
  );
}
