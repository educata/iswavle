const displayScore = document.querySelector('#displayScore');
const displayColor = document.querySelector('#displayColor');
const displayMode = document.querySelector('#displayMode');
const resetBtn = document.querySelector('#resetBtn');
const actionButtons = document.querySelectorAll('button[data-box-count]');
const boxes = document.querySelectorAll('div.box');

const config = {
  mode: '',
  answer: -1,
  count: 0,
  score: 0,
  scoreMap: {
    win: 0,
    loss: 0,
  },
};

actionButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const boxCount = Number(button.getAttribute('data-box-count'));
    const winScore = Number(button.getAttribute('data-win-score'));
    const lossScore = Number(button.getAttribute('data-loss-score'));
    const mode = button.innerText;
    initGame({ mode, boxCount, winScore, lossScore });
  });
});

resetBtn.addEventListener('click', () => {
  config.mode = '';
  config.answer = -1;
  config.count = 0;
  config.score = 0;
  config.scoreMap = {
    win: 0,
    loss: 0,
  };
  displayMode.textContent = 'არაფერი';
  displayColor.textContent = 'არაფერი';
  displayScore.textContent = 0;
  initDefaultStyles();
  displayAlert('განულდა', 'success', 'თამაში თავიდან დაიწყო');
});

boxes.forEach((box, index) => {
  box.addEventListener('click', () => {
    if (config.mode === '' || config.answer === -1) {
      displayAlert('არასწორი რეჟიმი', 'info', 'პირველ რიგში აირჩიე რეჟიმი');
      return;
    }

    const hasClicked = box.getAttribute('data-clicked');

    if (hasClicked) {
      displayAlert('აირჩიეთ გაფერადებული ყუთი', 'warning', 'აქ უკვე დააკლიკეთ');
      return;
    }

    if (config.count <= index) {
      displayAlert('აირჩიეთ გაფერადებული ყუთი', 'warning');
      return;
    }

    const hasWon = config.answer === index;

    let total =
      config.score + (hasWon ? config.scoreMap.win : config.scoreMap.loss);

    if (total < 0) {
      total = 0;
    }

    config.score = total;
    displayScore.textContent = config.score;
    box.setAttribute('data-clicked', true);
    box.style.backgroundColor = 'transparent';
    box.style.cursor = 'not-allowed';

    displayAlert(
      hasWon ? 'მოიგეთ' : 'წააგეთ',
      hasWon ? 'success' : 'error',
      `თქვენ ${hasWon ? 'სწორ' : 'არასწორ'} ყუთს დააკლიკეთ`,
    );

    if (hasWon) {
      initGame({
        mode: config.mode,
        boxCount: config.count,
        winScore: config.scoreMap.win,
        lossScore: Math.abs(config.scoreMap.loss),
      });
      return;
    }

    const clickedCount = document.querySelectorAll(
      'div.box[data-clicked]',
    ).length;
    if (clickedCount + 1 === config.count) {
      displayAlert(
        'გამოტოვება',
        'info',
        'თქვენ დააკლიკეთ ყოველ არასწორ ყუთს ამიტომაც მოხდა skip',
      );
      initGame({
        mode: config.mode,
        boxCount: config.count,
        winScore: config.scoreMap.win,
        lossScore: Math.abs(config.scoreMap.loss),
      });
      return;
    }
  });
});
function initGame(buttonAttr) {
  initDefaultStyles();
  initDefaultAttributes();
  const { mode, boxCount, winScore, lossScore } = buttonAttr;
  const colors = getRandomColors(boxCount);
  const answer = getRandomNumber(boxCount);

  for (const [index, box] of boxes.entries()) {
    if (index === boxCount) {
      break;
    }
    box.style.backgroundColor = colors[index];
    box.style.cursor = 'pointer';
  }

  displayColor.textContent = colors[answer];
  displayMode.textContent = mode;
  config.mode = mode;
  config.count = boxCount;
  config.answer = answer;
  config.scoreMap = {
    win: winScore,
    loss: lossScore * -1,
  };
}

function getRandomNumber(max = 256) {
  return Math.floor(Math.random() * max);
}

function getRandomRGB() {
  const r = getRandomNumber();
  const g = getRandomNumber();
  const b = getRandomNumber();
  return `rgb(${r},${g},${b})`;
}

function getRandomColors(count) {
  const array = [];
  for (let i = 0; i < count; i++) {
    array.push(getRandomRGB());
  }
  return array;
}

function initDefaultStyles() {
  boxes.forEach((box) => {
    box.style.backgroundColor = 'transparent';
    box.style.cursor = 'not-allowed';
  });
}

function displayAlert(title, icon, text = '') {
  Swal.fire({ title, icon, text });
}

function initDefaultAttributes() {
  boxes.forEach((box) => {
    box.removeAttribute('data-clicked');
  });
}

// For scripts

const script = document.createElement('script');
script.src = 'https://cdn.jsdelivr.net/npm/sweetalert2@11';
document.head.appendChild(script);
