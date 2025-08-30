---
title: 'ძირითადი ანიმაციები'
description: 'ძირითადი ანიმაციები კანვასის გამოყენებით JavaScript-ში'
keywords: 'setInterval, setTimeout, requestAnimationFrame'
---

ხშირად ვებგვერდს სჭირდება ანიმაცია. ეს ანიმაცია შეიძლება იყოს
მომხარებლის დაყოვნებისთვის, როცა რაღაც იტვირთება, ან უბრალოდ ლამაზი გაფორმებისთვის.

ანიმაცია შესაძლებელია დიზაინერმა მოამზადოს გიფის ან სხვა გაფართოების სახით,
რასაც შემდეგ გამოვიყენებთ ვებგვერდზე, თუმცა დიზაინერის მიერ შესრულებული ანიმაცია,
ხშირ შემთხვევაში, დიდი ფაილია, რის ჩასატვირთადაც დიდი რესურსი იხარჯება (განსაკუთრებით
თუ მომხარებლის ინტერნეტი არ არის 'ულიმიტო'), ამიტომაც შეგვიძლია იგივე ანიმაცია
CSS-ში ან კანვასშიც ავაწყოთ JavaScript-ის გამოყენებით. ამ სტატიაში განვიხილავთ
თუ როგორ არის შესაძლებელი მარტივი ანიმაციების შექმნა.

## ანიმაციის ძირითადი ნაბიჯები

განვიხილოთ ნაბიჯები, რომლებიც დაგვჭირდება კადრის (frame) დასახატად:

1. **გავასუფთავოთ კანვასი** სხვა ზედმეტი ფიგურებისგან, რომლებიც ამჟამინდელ
   კადრში არ გვჭირდება. ყველაზე მარტივი მიდგომა არის [`clearRect`](./doc/guides/javascript/drawing-figures#clearRect)
   მეთოდის გამოყენება.
2. **სთეითის შენახავა** ხშირად დაგვჭირდება, როცა სხვადასხვა სტილიზაციებისა და
   ტრანსფორმაციების მრავალჯერადად გამოყენებას დავაპირებთ.
3. **ანიმაციური ფორმების** ხაზვა სხვადასხვა კადრის დროს.
4. **სთეითის აღდგენა** როცა წინა სთეითში არსებული სტილიზაციების გამოყენება გვსურს.

## ანიმაციის კონტროლი

ფიგურები, რომლებიც იხატება კანვასში, შესაძლებელია პირდაპირ მეთოდის გამოძახებით
გამოვიტანოთ ვიზუალზე, ან ჩვენი ფუნქციების გავლით. ნორმალურ პირობებში, ანიმაციას ვხედავთ მაშინ,
როცა კანვასის სკრიპტი დაასრულებს გაშვებას. მაგალითად, შეუძლებელია ანიმაციის გაკეთება
[`for`](./doc/guides/javascript/loops#for) ციკლიდან.

ასერომ, თუ გვსურს კარგი ანიმაციის გაშვება, საჭიროა რაღაც დროით შევაყოვნოთ მოქმედებები, რომ ყველაფერი
ერთიანად არ შესრულდეს. ამ შედეგის მისაღებად კი ორი გზა არსებობს.

### დაგეგმილი განახლებები

დაგეგმილი განახლებებისთვის გვაქვს: `setTimeout()`, `setInterval()` და `window.requestAnimationFrame()` ფუნქციები,
რომლებიც დროთა განმავლობაში შეგვიძლია გამოვიძახოთ.

[`setTimeout`](https://developer.mozilla.org/en-US/docs/Web/API/setTimeout) ფუნქცია გამოიყენება გარკვეული კოდის გასაშვებად,
რაღაც დროის შემდეგ. ფუნქცია პარამეტრად ღებულობს callback ფუნქციას (თუ რა კოდი გაეშვას) და დროს მილიწამებში (რა დროში გაეშვას).

```js
console.log('პირველი ლოგი');
setTimeout(() => {
  console.log('ორი წამის მერე ლოგი');
}, 2000);
```

[`setInterval`](https://developer.mozilla.org/en-US/docs/Web/API/setInterval) ფუნქცია ჰგავს `setTimeout`-ს, ოღონდ განსხვავება იმით,
თუ რამდენჯერ მოხდება მისი გამოძახება. `setTimeout`-ის გამოძახება ხდება მხოლოდ ერთხელ, ხოლო `setInterval`-ის - იმდენჯერ, სანამ ინტერვალს არ მოვხსნით.
`setInterval` ფუნქცია აბრუნებს ინტერვალის ID-ის, რომელიც შემდეგ გამოგვადგება ინტერვალის გასათიშად. თუ ამ ID-ის არ შევინახავთ, მაშინ `setInterval`-ში
არსებული ფუნქცია გამოიძახება უსასრულოდ.

```js
const interval = setInterval(() => {
  console.log('ყოველ 2 წამში დაილოგოს კოდი');
}, 2000);

setTimeout(() => {
  console.log('10 წამის შემდეგ გავთიშოთ ინტერვალის ფუნქცია');
  clearInterval(interval);
}, 10000);
```

[`requestAnimationFrame`](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame) ფუნქცია ეუბნება ბრაუზერს, რომ გვსურს
ანიმაციის გაშვება და მოითხოვს ფუნქციის გაშვებას იქამდე, სანამ არსებული ანიმაცია არ გაეშვება.

თუ არ გსურთ მომხარებლის ჩართულობა ანიმაციის დროს, მაშინ შეგიძლიათ გამოიყენოთ `setInterval` ფუნქცია, რომელიც გაეშვება უწყვეტად რაღაც დროის ინტერვალით.
პირობითად, თუ თამაშის აწყობას ვაპირებთ ვებგვერდზე, მისი ვიზუალი შეგვიძლია კანვასში გამოვიტანოთ და აქვე გავაკეთოთ ანიმაციის განახლებები.
ასეთ დროს არ არის საჭირო `setInterval`-ის გამოყენება (თუ რაიმე სპეციფიკურს არ აკეთებთ გარკვეული დროის შემდეგ) - ჩვენ შეგვიძლია მოვუსმინოთ მომხარებლის
კლავიატურას (WASD) და მის მიხედვით გავუშვათ ანიმაციები.

შემდეგ მაგალითებში გამოვიყენებთ `requestAnimationFrame` ფუნქციას, რომ გავაკონტროლოთ ანიმაციები. ამ ფუნქციის გამოყენებით უფრო სწრაფ და ოპტიმიზირებულ
ანიმაციას მივიღებთ. დრო, რის მიხედვითაც უნდა გაეშვას callback ფუნქცია, ხშირ შემთხვევაში, არის წამში `60`-ჯერ, რაც შედეგად გვაძლევს
60 FPS-ს (frame per second, ანუ კადრი წამში). შეგვიძლია ეს რაოდენობა შევცვალოთ ჩვენთვის სასრუველ მნიშვნელობაზე.

## მზის სისტემის ანიმაცია

შევქმნათ ჩვენი მზის სისტემის ანიმაციური მოდელი.

```html
<canvas id="solarCanvas" width="300" height="300"></canvas>
```

```js
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
    ctx.rotate(((2 * Math.PI) / 60) * time.getSeconds() + ((2 * Math.PI) / 60000) * time.getMilliseconds());
    ctx.translate(105, 0);
    ctx.fillRect(0, -12, 40, 24); // ჩრდილი
    ctx.drawImage(earth, -12, -12);

    // მთვარე
    ctx.save();
    ctx.rotate(((2 * Math.PI) / 6) * time.getSeconds() + ((2 * Math.PI) / 6000) * time.getMilliseconds());
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
```

<iframe data-url="guides/javascript-canvas-basic-animations-solar" data-title="მზის სისტემის ანიმაცია" data-height="320"></iframe>

## საათის ანიმაცია

საათის ანიმაცია, რომელიც აჩვენებს ამჟამინდელ დროს.

```html
<canvas id="clockCanvas" width="150" height="150"></canvas>
```

```js
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
    ctx.rotate((Math.PI / 6) * hr + (Math.PI / 360) * min + (Math.PI / 21600) * sec);
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
```

<iframe data-url="guides/javascript-canvas-basic-animations-clock" data-title="საათის ანიმაცია" data-height="170"></iframe>

## მაუსის ანიმაცია

ახლა კი შევქმნათ ისეთი ანიმაცია, რომ მომხარებლის მაუსის გამოძრავებისას მცირედი ნაწილაკები მის გარშემო ტრიალებდეს.

```html
<canvas id="mouseCanvas"></canvas>
```

```css
body {
  margin: 0;
  padding: 0;
  background-color: rgba(0, 0, 0, 0.05);
}

#mouseCanvas {
  position: fixed;
  z-index: -1;
}
```

```js
const mouseCanvas = document.querySelector('#mouseCanvas');
const ctx = mouseCanvas.getContext('2d');

const cursor = {
  x: innerWidth / 2,
  y: innerHeight / 2,
};

const particlesArray = [];

if (mouseCanvas.getContext) {
  ctx.globalAplha = 0.5;
  generateParticles(101);
  setSize();
  anim();

  addEventListener('mousemove', (e) => {
    cursor.x = e.clientX;
    cursor.y = e.clientY;
  });

  addEventListener(
    'touchmove',
    (e) => {
      e.preventDefault();
      cursor.x = e.touches[0].clientX;
      cursor.y = e.touches[0].clientY;
    },
    { passive: false },
  );

  addEventListener('resize', () => setSize());
}

function generateParticles(amount) {
  for (let i = 0; i < amount; i++) {
    particlesArray[i] = new Particle(innerWidth / 2, innerHeight / 2, 4, generateColor(), 0.02);
  }
}

function generateColor() {
  const hexSet = '0123456789ABCDEF';
  let finalHexString = '#';
  for (let i = 0; i < 6; i++) {
    finalHexString += hexSet[Math.ceil(Math.random() * 15)];
  }
  return finalHexString;
}

function setSize() {
  mouseCanvas.height = innerHeight;
  mouseCanvas.width = innerWidth;
}

function Particle(x, y, particleTrailWidth, strokeColor, rotateSpeed) {
  this.x = x;
  this.y = y;
  this.particleTrailWidth = particleTrailWidth;
  this.strokeColor = strokeColor;
  this.theta = Math.random() * Math.PI * 2;
  this.rotateSpeed = rotateSpeed;
  this.t = Math.random() * 150;

  this.rotate = () => {
    const ls = {
      x: this.x,
      y: this.y,
    };
    this.theta += this.rotateSpeed;
    this.x = cursor.x + Math.cos(this.theta) * this.t;
    this.y = cursor.y + Math.sin(this.theta) * this.t;
    ctx.beginPath();
    ctx.lineWidth = this.particleTrailWidth;
    ctx.strokeStyle = this.strokeColor;
    ctx.moveTo(ls.x, ls.y);
    ctx.lineTo(this.x, this.y);
    ctx.stroke();
  };
}

function anim() {
  requestAnimationFrame(anim);

  ctx.fillStyle = 'rgb(0 0 0 / 5%)';
  ctx.fillRect(0, 0, mouseCanvas.width, mouseCanvas.height);

  particlesArray.forEach((particle) => particle.rotate());
}
```

<iframe data-url="guides/javascript-canvas-mouse-animation" data-title="მაუსის ანიმაცია" data-height="500"></iframe>

## შეჯამება

ამ თავში განვიხილეთ მარტივი ანიმაციები, რომლის მიღებაც შესაძლებელია კანვასის გამოყენებით.
შემდეგ თავში კი განვიხილავთ შედარებით [რთულ ანიმაციებს](./doc/guides/javascript/canvas/advanced-animations)
ცოტაოდენი ფიზიკის გამოყენებითაც.

იხილეთ სტატიის სამაგალითო კოდები playground-ში:

- [მზის სისტემის და საათის ანიმაცია](./playground/simple/guides/javascript-canvas-basic-animations)
- [მაუსის ანიმაცია](./playground/simple/guides/javascript-canvas-mouse-animation)
