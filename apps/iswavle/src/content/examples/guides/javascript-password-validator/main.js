const passwordInput = document.querySelector('#passwordInput');
const progressBar = document.querySelector('#progressBar');
const validators = document.querySelectorAll('[data-regex]');
const actions = document.querySelectorAll('[data-action]');

const eyeIcons = {
  open: '<i class="bi bi-eye-slash"></i>',
  closed: '<i class="bi bi-eye"></i>',
};

const validatorIcons = {
  default: '<i class="bi bi-circle-fill"></i>',
  valid: '<i class="bi bi-check-lg"></i>',
  invalid: '<i class="bi bi-x-lg"></i>',
};

passwordInput.addEventListener('keyup', function () {
  validatePassword(this.value);
  updateProgressbar();
});

actions.forEach((actionElement) => {
  actionElement.addEventListener('click', function () {
    const action = this.getAttribute('data-action') || '';

    switch (action) {
      case 'eye': {
        toggleEye();
        break;
      }
      case 'clear': {
        clearPassword();
        validatePassword();
        updateProgressbar();
        break;
      }
      case 'copy': {
        copyPassword();
        updateProgressbar();
        break;
      }
      case 'generate': {
        generatePassword();
        break;
      }
    }
  });
});

init();

function init() {
  validatePassword();
}

function toggleEye() {
  const eye = document.querySelector("[data-action='eye']");
  const isEyeOpen = passwordInput.type === 'text';
  passwordInput.type = isEyeOpen ? 'password' : 'text';
  eye.innerHTML = isEyeOpen ? eyeIcons.closed : eyeIcons.open;
}

function forceEyeOpen() {
  if (passwordInput.type === 'password') {
    toggleEye();
  }
}

function clearPassword() {
  passwordInput.value = '';
}

function copyPassword() {
  if (passwordInput.value === '') {
    alert('არაფერია დასაკოპირებელი');
    return;
  }
  if (confirm('გსურთ პაროლის დაკოპირება ?')) {
    navigator.clipboard.writeText(passwordInput.value.trim());
    alert('პაროლი დაკოპირდა');
  }
}

function generatePassword() {
  let randomPassword = getRandomPassword();
  while (!isValidPassword(randomPassword)) {
    randomPassword = getRandomPassword();
  }
  passwordInput.value = randomPassword;
  forceEyeOpen();
  validatePassword(randomPassword);
  updateProgressbar();
}

function isValidPassword(password) {
  for (const validator of validators) {
    const regex = new RegExp(validator.getAttribute('data-regex'));
    if (!regex.test(password)) {
      return false;
    }
  }
  return true;
}

function validatePassword(password = '') {
  password = password.trim();

  if (password.length === 0) {
    validators.forEach((validator) => {
      validator.children[0].innerHTML = validatorIcons.default;
    });
    return;
  }

  validators.forEach((validator) => {
    const regex = new RegExp(validator.getAttribute('data-regex'));
    validator.children[0].innerHTML = regex.test(password)
      ? validatorIcons.valid
      : validatorIcons.invalid;
  });
}

function updateProgressbar() {
  if (passwordInput.value === '') {
    progressBar.style.width = '0%';
    return;
  }
  let count = 0;
  validators.forEach((validator) => {
    const regex = new RegExp(validator.getAttribute('data-regex'));
    if (regex.test(passwordInput.value.trim())) {
      count++;
    }
  });
  progressBar.style.width = `${(count / validators.length) * 100}%`;
}

function getRandomPassword(
  length = 8,
  charset = '0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM!@#$%^&',
) {
  let password = '';
  for (let i = 0; i < length; i++) {
    password += charset[Math.floor(Math.random() * charset.length)];
  }
  return password;
}
