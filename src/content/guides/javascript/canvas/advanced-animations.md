---
title: 'რთული ანიმაციები'
description: 'რთული ანიმაციები კანვასის გამოყენებით JavaScript-ში'
keywords: 'რთული ანიმაციის აწყობა, ანიმაციის ფიზიკის აწყობა, ბურთის ანიმაცია, ბურთის ფიზიკის აწყობა კანვასში'
---

წინა თავში განვიხილეთ რამოდენიმე [მარტივი ანიმაცია](./doc/guides/javascript/canvas/basic-animations)
კანვასში და გავარკვიეთ თუ როგორ შეიძლება ელემენტების გადაადგილება დროის ინტერვალით კანვასში.
ამ თავში კი განვიხილავთ თუ როგორ შეიძლება ანიმაციებზე ფიზიკის დამატება.

## ბურთის დახატვა

ერთ-ერთი კარგი მაგალითი არის ბურთი და მისი ფიზიკა. პირველ რიგში შემოვიტანოთ ბურთი ჩვენს კანვასში.

```html
<canvas id="ballCanvas" width="600" height="300"></canvas>
```

როგორც ყოველთვის, პირველ რიგში გვჭირდება დასახატი კონტექსტი. შევქმნათ ობიექტი სადაც შევინახავთ
ბურთის თვისებებს და მეთდებს. ობიექტში შენახვა კარგია რადგან ნებისმიერ დროს გვექნება წვდომა მის თვისებებზე
და მეთოდებს ერთ ადგილას, ტექნიკურად შესაძლებელია ცალ-ცალკე აღწერაც.

```js
const canvas = document.querySelector('#ballCanvas');
const ctx = canvas.getContext('2d');

const ball = {
  x: 100,
  y: 100,
  radius: 25,
  color: 'steelblue',
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fillStyle = this.color;
    ctx.fill();
  },
};

ball.draw();
```

ამ მაგალითში არაფერი განსაკუთრებული არ ხდება, ვიღებთ წინა სტატიებში განხილულ [`arc`](./doc/guides/javascript/canvas/drawing-figures#რკალი)
მეთოდს, რომ მივიღოთ წრე.

## სიჩქარის დამატება

მიღებულ ბურთზე უკვე შეგვიძლია მცირედი ანიმაციების გაწერა. შეგვიძლია წინა თავში შესწავლილი მასალა გამოვიყენოთ ანიმაციის
[გასანახლებლად](./doc/guides/javascript/canvas/basic-animations#დაგეგმილი_განახლებები). ბურთმა ყოველ მოძრაობაზე
უნდა მიიღოს ახალი სიჩქარე და ახალი პოზიცია. ყოველი ჩარჩოს (frame)-ს ცვლილების დროს უნდა წავშალოთ ძველი ბურთი და გამოვაჩინოთ
ახალი მის ნაცვლად.

```js
const canvas = document.querySelector('#ballCanvas');
const ctx = canvas.getContext('2d');
let raf;

const ball = {
  x: 100,
  y: 100,
  vx: 5,
  vy: 2,
  radius: 25,
  color: 'blue',
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fillStyle = this.color;
    ctx.fill();
  },
};

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ball.draw();
  ball.x += ball.vx;
  ball.y += ball.vy;
  raf = window.requestAnimationFrame(draw);
}

canvas.addEventListener('mouseover', (e) => {
  raf = window.requestAnimationFrame(draw);
});

canvas.addEventListener('mouseout', (e) => {
  window.cancelAnimationFrame(raf);
});

ball.draw();
```

ამ შემთხვევაში ანიმაციის გასაშვებად ვიყენებთ `requestAnimationFrame` მეთოდს, რომელიც მოდის გლობალური `window`-ს
ობიექტიდან. მეთოდს პარამეტრად ვაძლევთ თუ რომელი ფუნქცია უნდა გაუშვას, რაც ჩვენს შემთხვევაში არის `draw`.
ეს მოქმედებები კი ხდება როცა კანვასზე იქნება მაუსი, ხოლო როცა კანვასი მაუს დატოვებს ვიყენებთ
[`window.cancelAnimationFrame`](https://developer.mozilla.org/en-US/docs/Web/API/Window/cancelAnimationFrame) მეთოდს,
რომელიც შეწყვიტავს ბოლოს გამოყენებულ `requestAnimationFrame`-ს.

## საზღვრები

საზღვრების გარეშე ჩვენი ბურთი უსასრულოდ მიდის კანვასის არეალიდან. ჩვენ უნდა შევამოწმოთ ყოველ ჯერზე `x` და `y` პოზიცია,
ხომ არ არის კანვასის არეალიდან გასული და თუ არის მაშინ საპირისპირო მიმართულებით შევაბრუნოთ ბურთი, რომ საზღვრას არ გაცდეს.

განახლება გავუკეთოთ ჩვენს `draw` ფუნქციას:

```js
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ball.draw();
  ball.x += ball.vx;
  ball.y += ball.vy;

  if (ball.y + ball.vy > canvas.height - ball.radius || ball.y + ball.vy < ball.radius) {
    ball.vy = -ball.vy;
  }

  if (ball.x + ball.vx > canvas.width - ball.radius || ball.x + ball.vx < ball.radius) {
    ball.vx = -ball.vx;
  }

  raf = window.requestAnimationFrame(draw);
}
```

## აჩქარება

იმისათვის, რომ მოძრაობა უფრო რეალური გახდეს, შეგვიძლია სიჩქარე შევცვალოთ შემდგომ ნაირად:

```js
ball.vy *= 0.99;
ball.vy += 0.25;
```

მსგავს ტიპად ვერტიკალური სიჩქარე (`ball.vy`) შენელდება ყოველი ფრეიმის განახლებაზე, რაც ბურთს
უფრო მიიზიდავს ქვემოთკენ.

ამ განახლებებით ჩვენი კოდი უნდა გამოიყურებოდეს შემდგომ ნაირად:

```html
<canvas id="ballCanvas" style="border: 1px solid black" width="600" height="300"></canvas>
```

```js
const canvas = document.querySelector('#ballCanvas');
const ctx = canvas.getContext('2d');
let raf;

const ball = {
  x: 100,
  y: 100,
  vx: 5,
  vy: 2,
  radius: 25,
  color: 'steelblue',
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fillStyle = this.color;
    ctx.fill();
  },
};

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ball.draw();
  ball.x += ball.vx;
  ball.y += ball.vy;
  ball.vy *= 0.99;
  ball.vy += 0.25;

  if (ball.y + ball.vy > canvas.height - ball.radius || ball.y + ball.vy < ball.radius) {
    ball.vy = -ball.vy;
  }

  if (ball.x + ball.vx > canvas.width - ball.radius || ball.x + ball.vx < ball.radius) {
    ball.vx = -ball.vx;
  }

  raf = window.requestAnimationFrame(draw);
}

canvas.addEventListener('mouseover', (e) => {
  raf = window.requestAnimationFrame(draw);
});

canvas.addEventListener('mouseout', (e) => {
  window.cancelAnimationFrame(raf);
});

ball.draw();
```

## მიმავალი ეფექტი

ჩვენს ბურთს ამჟამად არ აქვს მიმავალი (Trailing) ეფექტი. ყოველი ფრეიმის განახლებაზე ჩვენ უბრალოდ
ვასუფთავებთ წინა ბურთს და ვცვლით ახალით. შეგვიძლია [`clearRect`](./doc/guides/javascript/canvas/drawing-figures#clearRect)
ნაცვლად გამოვიყენოთ [`fillRect`](./doc/guides/javascript/canvas/drawing-figures#fillRect) მეთოდი,
რომელიც მარტივ მიმავალ ეფექტს დაგვიტოვებს.

```js
ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
ctx.fillRect(0, 0, canvas.width, canvas.height);
```

## მაუსის კონტროლის დამატება

ბურთზე უფრო მეტი კონტროლისთვის შეგვიძლია გამოვიყენოთ [`mousemove`](https://developer.mozilla.org/en-US/docs/Web/API/Element/mousemove_event)
ივენთი, რომ ბურთი მოგვყვებოდეს მაუსის მოძრაობისას, ხოლო როცა მოხდება [`click`](https://developer.mozilla.org/en-US/docs/Web/API/Element/click_event)
ივენთი ბურთმა დაიწყოს იგივე მოძრაობა.

```html
<canvas id="ballCanvas" style="border: 1px solid black" width="600" height="300"></canvas>
```

```js
const canvas = document.querySelector('#ballCanvas');
const ctx = canvas.getContext('2d');
let raf;
let running = false;

const ball = {
  x: 100,
  y: 100,
  vx: 5,
  vy: 1,
  radius: 25,
  color: 'steelblue',
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fillStyle = this.color;
    ctx.fill();
  },
};

function clear() {
  ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function draw() {
  clear();
  ball.draw();
  ball.x += ball.vx;
  ball.y += ball.vy;

  if (ball.y + ball.vy > canvas.height - ball.radius || ball.y + ball.vy < ball.radius) {
    ball.vy = -ball.vy;
  }

  if (ball.x + ball.vx > canvas.width - ball.radius || ball.x + ball.vx < ball.radius) {
    ball.vx = -ball.vx;
  }

  raf = window.requestAnimationFrame(draw);
}

canvas.addEventListener('mousemove', (e) => {
  if (!running) {
    clear();
    ball.x = e.clientX;
    ball.y = e.clientY;
    ball.draw();
  }
});

canvas.addEventListener('click', (e) => {
  if (!running) {
    raf = window.requestAnimationFrame(draw);
    running = true;
  }
});

canvas.addEventListener('mouseout', (e) => {
  window.cancelAnimationFrame(raf);
  running = false;
});

ball.draw();
```

## შეჯამება

ამ თავში განვიხილეთ თუ როგორ უნდა შევქმნათ შედარებით კომპლექსური ანიმაციები მცირედი ფიზიკის გამოყენებით.
სხვადასხვა ივენეთების გამოყენებამ კი მოგვცა უფრო მეტი კონტროლი, რაც უფრო ლამაზს და გამართულს ხდის ჩვენს ანიმაციას.
თუ დავუმატებთ არსებულ ანიმაციას მცირედ პლატფორმას და სხვადასხვა ყუთებს შეგვიძლია **Breakout**-ს თამაშიც ავაწყოთ.

კანვასის ბოლო სტატიებში კი შეგიძლიათ იხილოთ ორი თამაში:

1. [Breakout](./doc/guides/javascript/canvas/breakout)
2. TODO: სახელის განალება სტატიის დამატების შემდგომ

იხილეთ სტატიის სამაგალითო კოდები playground-ში:

- [ბურთის დახატვა](./playground/simple/guides/javascript-canvas-advanced-animations-drawing-ball)
- [სიჩქარის დამატება](./playground/simple/guides/javascript-canvas-advanced-animations-adding-velocity)
- [საზღვრები](./playground/simple/guides/javascript-canvas-advanced-animations-boundaries)
- [აჩქარება](./playground/simple/guides/javascript-canvas-advanced-animations-acceleration)
- [მიმავალი ეფექტი](./playground/simple/guides/javascript-canvas-advanced-animations-trailing-effect)
- [სრული ვერსია](./playground/simple/guides/javascript-canvas-advanced-animations-result)
