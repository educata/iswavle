const form = document.querySelector('form');
const display = document.querySelector('#display');
const buttons = document.querySelectorAll('button');

buttons.forEach((button) => {
  if (button.getAttribute('data-show-after-submit')) {
    button.disabled = true;
  }
});

form.addEventListener('submit', function (event) {
  event.preventDefault();

  if (event.submitter.getAttribute('data-action') === 'generate') {
    const form = new FormData(this);
    let box = form.get('box');

    if (!box || isNaN(box)) {
      alert('ყუთების რაოდენობა უნდა იყოს რიცხვი');
      return;
    }

    box = Number(box);

    if (box < 5) {
      alert('ყუთების რაოდენობა უნდა იყოს მინიმუმ 3');
      return;
    }

    display.innerHTML = '';

    for (let i = 0; i < box; i++) {
      const line = document.createElement('div');
      line.classList.add('line');
      for (let j = 0; j < box; j++) {
        line.innerHTML += '<div class="box"></div>';
      }
      display.append(line);
    }

    buttons.forEach((button) => {
      button.disabled = false;
    });

    fillRandom();
  }

  switch (event.submitter.getAttribute('data-action')) {
    case 'random-fill': {
      fillRandom();
      break;
    }
    case 'column-fill': {
      fillColumn();
      break;
    }
    case 'row-fill': {
      fillRow();
      break;
    }
    case 'spiral-fill': {
      fillSpiralOneColor();
      break;
    }
    case 'spiral-fill-2': {
      fillSpiralDifferentColors();
      break;
    }
    case 'matrix-fill': {
      fillMatrix();
      break;
    }
  }
});

function getRandomNumber(floor = true, min = 0, max = 255) {
  const random = Math.random() * (max - min) + min;
  return floor ? Math.floor(random) : random;
}

function getRandomColor() {
  return `rgba(${getRandomNumber()}, ${getRandomNumber()}, ${getRandomNumber()}, ${getRandomNumber(false, 0.5, 1)})`;
}

function fillRandom() {
  for (const line of display.children) {
    for (const box of line.children) {
      box.style.backgroundColor = getRandomColor();
    }
  }
}

function fillColumn() {
  const columns = display.children[0].children.length;
  const rows = display.children.length;
  const maxAlpha = 1.0;
  const minAlpha = 0.1;
  const alphaStep = (maxAlpha - minAlpha) / (rows - 1);

  for (let i = 0; i < columns; i++) {
    const baseColor = getRandomColor().match(
      /rgba?\((\d+), (\d+), (\d+),? ?([0-9.]*)\)/,
    );
    const [r, g, b] = baseColor.slice(1, 4);
    for (let j = 0; j < rows; j++) {
      const alpha = maxAlpha - j * alphaStep;
      display.children[j].children[i].style.backgroundColor =
        `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }
  }
}

function fillRow() {
  const columns = display.children[0].children.length;
  const maxAlpha = 1.0;
  const minAlpha = 0.1;
  const alphaStep = (maxAlpha - minAlpha) / (columns - 1);

  for (const line of display.children) {
    const baseColor = getRandomColor().match(
      /rgba?\((\d+), (\d+), (\d+),? ?([0-9.]*)\)/,
    );
    const [r, g, b] = baseColor.slice(1, 4);
    for (let i = 0; i < line.children.length; i++) {
      const alpha = maxAlpha - i * alphaStep;
      line.children[i].style.backgroundColor =
        `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }
  }
}

function fillSpiralOneColor() {
  const rows = display.children.length;
  const columns = display.children[0].children.length;
  const maxAlpha = 1.0;
  const minAlpha = 0.1;
  const totalBoxes = rows * columns;
  const alphaStep = (maxAlpha - minAlpha) / (totalBoxes - 1);

  const baseColor = getRandomColor().match(
    /rgba?\((\d+), (\d+), (\d+),? ?([0-9.]*)\)/,
  );
  const [r, g, b] = baseColor.slice(1, 4);

  let top = 0;
  let bottom = rows - 1;
  let left = 0;
  let right = columns - 1;
  let index = 0;

  while (top <= bottom && left <= right) {
    for (let i = left; i <= right; i++) {
      const alpha = maxAlpha - index * alphaStep;
      display.children[top].children[i].style.backgroundColor =
        `rgba(${r}, ${g}, ${b}, ${alpha})`;
      index++;
    }
    top++;
    for (let i = top; i <= bottom; i++) {
      const alpha = maxAlpha - index * alphaStep;
      display.children[i].children[right].style.backgroundColor =
        `rgba(${r}, ${g}, ${b}, ${alpha})`;
      index++;
    }
    right--;
    if (top <= bottom) {
      for (let i = right; i >= left; i--) {
        const alpha = maxAlpha - index * alphaStep;
        display.children[bottom].children[i].style.backgroundColor =
          `rgba(${r}, ${g}, ${b}, ${alpha})`;
        index++;
      }
      bottom--;
    }
    if (left <= right) {
      for (let i = bottom; i >= top; i--) {
        const alpha = maxAlpha - index * alphaStep;
        display.children[i].children[left].style.backgroundColor =
          `rgba(${r}, ${g}, ${b}, ${alpha})`;
        index++;
      }
      left++;
    }
  }
}

function fillSpiralDifferentColors() {
  const rows = display.children.length;
  const columns = display.children[0].children.length;
  const maxAlpha = 1.0;
  const minAlpha = 0.1;
  const totalBoxes = rows * columns;
  const alphaStep = (maxAlpha - minAlpha) / (totalBoxes - 1);
  let index = 0;

  let top = 0;
  let bottom = rows - 1;
  let left = 0;
  let right = columns - 1;
  let baseColor = getRandomColor().match(
    /rgba?\((\d+), (\d+), (\d+),? ?([0-9.]*)\)/,
  );
  let [r, g, b] = baseColor.slice(1, 4);

  while (top <= bottom && left <= right) {
    for (let i = left; i <= right; i++) {
      if (index % Math.floor((totalBoxes - 1) / 5) === 0 && index !== 0) {
        baseColor = getRandomColor().match(
          /rgba?\((\d+), (\d+), (\d+),? ?([0-9.]*)\)/,
        );
        [r, g, b] = baseColor.slice(1, 4);
      }
      const alpha = maxAlpha - index * alphaStep;
      display.children[top].children[i].style.backgroundColor =
        `rgba(${r}, ${g}, ${b}, ${alpha})`;
      index++;
    }
    top++;
    for (let i = top; i <= bottom; i++) {
      if (index % Math.floor((totalBoxes - 1) / 5) === 0 && index !== 0) {
        baseColor = getRandomColor().match(
          /rgba?\((\d+), (\d+), (\d+),? ?([0-9.]*)\)/,
        );
        [r, g, b] = baseColor.slice(1, 4);
      }
      const alpha = maxAlpha - index * alphaStep;
      display.children[i].children[right].style.backgroundColor =
        `rgba(${r}, ${g}, ${b}, ${alpha})`;
      index++;
    }
    right--;
    if (top <= bottom) {
      for (let i = right; i >= left; i--) {
        if (index % Math.floor((totalBoxes - 1) / 5) === 0 && index !== 0) {
          baseColor = getRandomColor().match(
            /rgba?\((\d+), (\d+), (\d+),? ?([0-9.]*)\)/,
          );
          [r, g, b] = baseColor.slice(1, 4);
        }
        const alpha = maxAlpha - index * alphaStep;
        display.children[bottom].children[i].style.backgroundColor =
          `rgba(${r}, ${g}, ${b}, ${alpha})`;
        index++;
      }
      bottom--;
    }
    if (left <= right) {
      for (let i = bottom; i >= top; i--) {
        if (index % Math.floor((totalBoxes - 1) / 5) === 0 && index !== 0) {
          baseColor = getRandomColor().match(
            /rgba?\((\d+), (\d+), (\d+),? ?([0-9.]*)\)/,
          );
          [r, g, b] = baseColor.slice(1, 4);
        }
        const alpha = maxAlpha - index * alphaStep;
        display.children[i].children[left].style.backgroundColor =
          `rgba(${r}, ${g}, ${b}, ${alpha})`;
        index++;
      }
      left++;
    }
  }
}
