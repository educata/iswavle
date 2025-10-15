const solarCanvas = document.querySelector('#solarCanvas');
const sun = new Image();
const moon = new Image();
const earth = new Image();

init();

function init() {
  sun.src = 'https://iswavle.com/assets/images/canvas-sun.png';
  moon.src = 'https://iswavle.com/assets/images/canvas-moon.png';
  earth.src = 'https://iswavle.com/assets/images/canvas-earth.png';
  requestAnimationFrame(draw);
}

function draw() {
  if (solarCanvas.getContext) {
    const ctx = solarCanvas.getContext('2d');
    ctx.globalCompositeOperation = 'destination-over'; // ახალი ფიგურა იხატება არსებული კანვასის კონტენტის უკან
    ctx.clearRect(0, 0, 300, 300); // გავასუფთავოთ კანვასი

    ctx.fillStyle = 'rgb(0 0 0 / 40%)';
    ctx.strokeStyle = 'rgb(0 153 255 / 40%)';
    ctx.save();
    ctx.translate(150, 150);

    // დედამიწა
    const time = new Date();
    ctx.rotate(
      ((2 * Math.PI) / 60) * time.getSeconds() +
        ((2 * Math.PI) / 60000) * time.getMilliseconds(),
    );
    ctx.translate(105, 0);
    ctx.fillRect(0, -12, 40, 24); // ჩრდილი
    ctx.drawImage(earth, -12, -12);

    // მთვარე
    ctx.save();
    ctx.rotate(
      ((2 * Math.PI) / 6) * time.getSeconds() +
        ((2 * Math.PI) / 6000) * time.getMilliseconds(),
    );
    ctx.translate(0, 28.5);
    ctx.drawImage(moon, -3.5, -3.5);
    ctx.restore();

    ctx.restore();

    ctx.beginPath();
    ctx.arc(150, 150, 105, 0, Math.PI * 2, false); // დედამიწის ორბიტა
    ctx.stroke();

    ctx.drawImage(sun, 0, 0, 300, 300);

    requestAnimationFrame(draw);
  }
}
