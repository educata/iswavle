const form = document.querySelector('form');

form.addEventListener('submit', function (event) {
  event.preventDefault();
  const form = new FormData(this);
  let age = form.get('age');

  if (!age) {
    alert('ველი ცარიელია');
    return;
  }

  age = Number(age);

  if (age === 18) {
    alert('გილოცავთ სრულწლოვნობას');
  } else if (age > 18) {
    alert('თქვენ ხართ სრულწლოვანი');
  } else {
    alert('თქვენ არ ხართ სრულწლოვანი');
  }
});
