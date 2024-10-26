const timeDisplay = document.querySelector('#time-display');

setInterval(() => {
  timeDisplay.innerHTML = new Date();
}, 1000);
