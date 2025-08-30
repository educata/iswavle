const resultBackgroundColor = document.querySelector('#resultBackgroundColor');
const formRangeInputs = document.querySelectorAll('input[type="range"]');
const resultColor = document.querySelector('#resultColor');
const colorModel = document.querySelector('#colorModel');
const controls = document.querySelectorAll('.control');
const form = document.querySelector('form');

const DEFAULT_MODEL = 'rgb';
const MODEL_CONFIG = {
  rgb: {
    values: {
      r: {
        min: 0,
        max: 255,
        name: '<b>R</b>ed',
        suffix: '',
      },
      g: {
        min: 0,
        max: 255,
        name: '<b>G</b>reen',
        suffix: '',
      },
      b: {
        min: 0,
        max: 255,
        name: '<b>B</b>lue',
        suffix: '',
      },
    },
    format: (r, g, b) => `rgb(${r}, ${g}, ${b})`,
  },
  hex: {
    values: {
      r: {
        min: 0,
        max: 255,
        name: '<b>R</b>ed',
        suffix: '',
      },
      g: {
        min: 0,
        max: 255,
        name: '<b>G</b>reen',
        suffix: '',
      },
      b: {
        min: 0,
        max: 255,
        name: '<b>B</b>lue',
        suffix: '',
      },
    },
    format: (r, g, b) =>
      `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`,
  },
  hsl: {
    values: {
      h: {
        min: 0,
        max: 360,
        name: '<b>H</b>ue',
        suffix: '°',
      },
      s: {
        min: 0,
        max: 100,
        name: '<b>S</b>aturation',
        suffix: '%',
      },
      l: {
        min: 0,
        max: 100,
        name: '<b>L</b>ightness',
        suffix: '%',
      },
    },
    format: (h, s, l) => `hsl(${h}, ${s}%, ${l}%)`,
  },
};

const selectedModel = initType(DEFAULT_MODEL);
initInputs(selectedModel, MODEL_CONFIG);

form.addEventListener('input', calculateResult);

function displayResult(color) {
  resultColor.innerHTML = color;
  resultBackgroundColor.style.backgroundColor = color;
}

function calculateResult(event) {
  const config = MODEL_CONFIG[selectedModel];
  const formData = new FormData(form);
  const firstValue = Number(formData.get('first'));
  const secondValue = Number(formData.get('second'));
  const thirdValue = Number(formData.get('third'));

  if (!event) {
    displayResult(config.format(firstValue, secondValue, thirdValue));
    return;
  }

  const target = event.target;
  const numberDisplay = target.parentNode.querySelectorAll('span')[1];
  numberDisplay.innerHTML = target.value;

  displayResult(config.format(firstValue, secondValue, thirdValue));
}

function initType(defaultModel) {
  const search = location.search;

  if (!search) {
    return defaultModel;
  }

  const params = new URLSearchParams(search);
  const type = params.get('type');

  const isModelTypeValid = Object.keys(MODEL_CONFIG).includes(type);

  if (isModelTypeValid) {
    return type;
  }

  console.warn(
    `არასწორი მოდელის ტიპი, აირჩიეთ შემდეგი ტიპებიდან: ${Object.keys(MODEL_CONFIG).join(', ')}`,
  );

  return defaultModel;
}

function initInputs(type, modelConfig) {
  const config = modelConfig[type];
  colorModel.innerHTML = type.toUpperCase();

  let index = 0;

  for (const value in config.values) {
    const input = formRangeInputs[index];
    const randomValue = Math.floor(
      Math.random() * (config.values[value].max + 1),
    );
    input.min = config.values[value].min;
    input.max = config.values[value].max;
    input.value = randomValue;

    const control = controls[index];
    const spans = control.querySelectorAll('span');
    spans[0].innerHTML = config.values[value].name;
    spans[1].textContent = `${randomValue}${config.values[value].suffix}`;

    index++;
  }

  calculateResult();
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
