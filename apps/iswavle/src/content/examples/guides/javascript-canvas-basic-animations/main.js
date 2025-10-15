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

const clockCanvas = document.querySelector('#clockCanvas');

function drawClock() {
  if (clockCanvas.getContext) {
    const now = new Date();
    const ctx = clockCanvas.getContext('2d');
    ctx.save();
    ctx.clearRect(0, 0, 150, 150);
    ctx.translate(75, 75);
    ctx.scale(0.4, 0.4);
    ctx.rotate(-Math.PI / 2);
    ctx.strokeStyle = 'black';
    ctx.fillStyle = 'white';
    ctx.lineWidth = 8;
    ctx.lineCap = 'round';

    // საათების ხაზი
    ctx.save();
    for (let i = 0; i < 12; i++) {
      ctx.beginPath();
      ctx.rotate(Math.PI / 6);
      ctx.moveTo(100, 0);
      ctx.lineTo(120, 0);
      ctx.stroke();
    }
    ctx.restore();

    // წუთების ხაზი
    ctx.save();
    ctx.lineWidth = 5;
    for (let i = 0; i < 60; i++) {
      if (i % 5 !== 0) {
        ctx.beginPath();
        ctx.moveTo(117, 0);
        ctx.lineTo(120, 0);
        ctx.stroke();
      }
      ctx.rotate(Math.PI / 30);
    }
    ctx.restore();

    const sec = now.getSeconds();
    // ამჯამინდელი ანიმაციით ვღბულობთ წამიერად გადასვლას თუ გსურთ სრულიად მოძრაობდეს ნელი შეჩერებიბს გარეშე მაშინ გამოიყენეთ ქვედა sec ცვლადი
    // const sec = now.getSeconds() + now.getMilliseconds() / 1000;
    const min = now.getMinutes();
    const hr = now.getHours() % 12;

    ctx.fillStyle = 'black';

    // დავწეროთ სურათის აღწერილობა უკეთესი ხელმისაწვოდმობისთვის(accessibility | ARIA)
    clockCanvas.innerText = `დრო არის: ${hr}:${min}:${sec}`;

    // საათების დაწერა
    ctx.save();
    ctx.rotate(
      (Math.PI / 6) * hr + (Math.PI / 360) * min + (Math.PI / 21600) * sec,
    );
    ctx.lineWidth = 14;
    ctx.beginPath();
    ctx.moveTo(-20, 0);
    ctx.lineTo(80, 0);
    ctx.stroke();
    ctx.restore();

    // წუთების დაწერა
    ctx.save();
    ctx.rotate((Math.PI / 30) * min + (Math.PI / 1800) * sec);
    ctx.lineWidth = 10;
    ctx.beginPath();
    ctx.moveTo(-28, 0);
    ctx.lineTo(112, 0);
    ctx.stroke();
    ctx.restore();

    // წამების დაწერა
    ctx.save();
    ctx.rotate((sec * Math.PI) / 30);
    ctx.strokeStyle = '#D40000';
    ctx.fillStyle = '#D40000';
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(-30, 0);
    ctx.lineTo(83, 0);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(0, 0, 10, 0, Math.PI * 2, true);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(95, 0, 10, 0, Math.PI * 2, true);
    ctx.stroke();
    ctx.fillStyle = 'rgb(0 0 0 / 0%)';
    ctx.arc(0, 0, 3, 0, Math.PI * 2, true);
    ctx.fill();
    ctx.restore();

    ctx.beginPath();
    ctx.lineWidth = 14;
    ctx.strokeStyle = '#325FA2';
    ctx.arc(0, 0, 142, 0, Math.PI * 2, true);
    ctx.stroke();

    ctx.restore();

    requestAnimationFrame(drawClock);
  }
}

requestAnimationFrame(drawClock);
