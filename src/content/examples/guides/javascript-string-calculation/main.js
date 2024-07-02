const form = document.querySelector('form');
const result = document.querySelector('#result');

form.addEventListener('submit', function (event) {
  event.preventDefault();

  const form = new FormData(this);

  const firstValue = form.get('firstInput') || '';
  const secondValue = form.get('secondInput') || '';
  const operation = form.get('operation') || '+';

  if (operation === '+') {
    result.value = firstValue + secondValue;
    return;
  }

  try {
    result.value = eval(`${firstValue} ${operation} ${secondValue}`);
  } catch (err) {
    result.value = 'NaN';
  }
});
