const form = document.querySelector('form');
const displayMoves = document.querySelector('#displayMoves');
const movesCount = document.querySelector('#movesCount');
const fragment = document.createDocumentFragment();

let move = 0;
let prev = null;

form.addEventListener('submit', function (event) {
  event.preventDefault();
  const form = new FormData(this);
  let rods = form.get('rods');

  if (!rods) {
    alert('რგოლის მნიშვნელობა აუცილებელია');
    return;
  }

  rods = Number(rods);

  if (prev === rods) {
    return;
  }

  if (isNaN(rods)) {
    alert('რგოლის მნიშვნელობა აუცილებლად რიცხვი უნდა იყოს');
    return;
  }

  displayMoves.innerHTML = '';
  fragment.innerHTML = '';
  move = 0;
  prev = rods;
  hanoiTower(rods, 'A', 'C', 'B');
  movesCount.innerHTML = move;
  displayMoves.innerHTML = fragment.innerHTML;
});

function hanoiTower(n, from, to, aux) {
  if (n === 0) {
    return;
  }
  hanoiTower(n - 1, from, aux, to);
  fragment.innerHTML += `<li class="list-group-item">(${++move}) რგოლი ${n} გადავიტანეთ ${from}-დან ${to}-ზე</li>`;
  hanoiTower(n - 1, aux, to, from);
}
