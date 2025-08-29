const animalsDisplay = document.querySelector('#animalsDisplay');
const volumeDisplay = document.querySelector('#volumeDisplay');
const volumeInput = document.querySelector('#volumeInput');

const audio = new Audio();

const statusCodes = [
  100, 101, 102, 103, 200, 201, 202, 203, 204, 205, 206, 207, 208, 226, 300,
  301, 302, 303, 304, 305, 307, 308, 400, 401, 402, 403, 404, 406, 407, 408,
  409, 410, 411, 412, 413, 414, 415, 416, 417, 418, 420, 421, 422, 423, 424,
  425, 426, 428, 429, 431, 444, 451, 497, 498, 499, 500, 501, 502, 503, 504,
  506, 507, 508, 509, 510, 511, 521, 522, 523, 525, 530, 599,
];

const animals = [
  {
    name: 'კატა',
    soundUrl: 'https://iswavle.com/assets/audios/cat_meow.wav',
    imagePrefix: 'https://http.cat',
  },
  {
    name: 'ძაღლი',
    soundUrl: 'https://iswavle.com/assets/audios/dog_bark.wav',
    imagePrefix: 'https://http.dog',
  },
];

volumeInput.addEventListener('input', () => {
  volumeDisplay.textContent = Math.floor(volumeInput.value * 100) + '%';
  audio.volume = volumeInput.value;
});

animals.forEach((animal) => {
  const animalElement = document.createElement('div');
  animalElement.innerHTML = `
    <h3>${animal.name}</h3>
    <img src="${animal.imagePrefix}/${getRandomStatusCode()}.jpg" alt="${animal.name}-ს შემთხვევითი ფოტო">
    <a href="${animal.imagePrefix}" target="_blank">ვებგვერდის გახსნა</a>
    <button title="ხმის ჩართვა" onclick="playSound('${animal.soundUrl}')">ხმის ჩართვა</button>
  `;
  animalsDisplay.appendChild(animalElement);
});

function playSound(soundUrl) {
  audio.src = soundUrl;
  audio.play();
}

function getRandomStatusCode() {
  return statusCodes[Math.floor(Math.random() * statusCodes.length)];
}
