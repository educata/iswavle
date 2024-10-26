---
title: 'რთული ანიმაციები'
description: 'რთული ანიმაციები კანვასის გამოყენებით JavaScript-ში'
keywords: 'რთული ანიმაციის აწყობა, ანიმაციის ფიზიკის აწყობა, ბურთის ანიმაცია, ბურთის ფიზიკის აწყობა კანვასში'
---

წინა თავში განვიხილეთ რამოდენიმე [მარტივი ანიმაცია](./doc/guides/javascript/canvas/basic-animations)
კანვასში და გავარკვიეთ, თუ როგორ შეიძლება ელემენტების გადაადგილება დროის ინტერვალით კანვასში.
ამ თავში კი განვიხილავთ თუ როგორ შეიძლება ანიმაციებზე ფიზიკის დამატება.

## ბურთის დახატვა

ერთ-ერთი კარგი მაგალითი არის ბურთი და მისი ფიზიკა. პირველ რიგში შემოვიტანოთ ბურთი ჩვენს კანვასში.

```html
<canvas id="ballCanvas" width="600" height="300"></canvas>
```

როგორც ყოველთვის, პირველ რიგში გვჭირდება დასახატი კონტექსტი. შევქმნათ ობიექტი, სადაც შევინახავთ
ბურთის თვისებებსა და მეთდებს. ამ ყველაფრის ობიექტში შენახვა კარგია, რადგან ნებისმიერ დროს გვექნება წვდომა მის თვისებებსა
და მეთოდებზე ერთ ადგილას, თუმცა შესაძლებელია მათი ცალ-ცალკე აღწერაც.

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

<iframe data-url="guides/javascript-canvas-advanced-animations-draw-ball" data-title="ბურთის დახატვა" data-height="350"></iframe>

ამ მაგალითში არაფერი განსაკუთრებული არ ხდება, ვიღებთ წინა სტატიებში განხილულ [`arc`](./doc/guides/javascript/canvas/drawing-figures#რკალი)
მეთოდს, რომ მივიღოთ წრე.

## სიჩქარის დამატება

მიღებულ ბურთზე უკვე შეგვიძლია მცირედი ანიმაციების გაწერა. შეგვიძლია წინა თავში შესწავლილი მასალა გამოვიყენოთ ანიმაციის
[გასაახლებლად](./doc/guides/javascript/canvas/basic-animations#დაგეგმილი_განახლებები). ბურთმა ყოველ მოძრაობაზე
უნდა მიიღოს ახალი სიჩქარე და ახალი პოზიცია. ყოველი კადრის (frame) ცვლილების დროს უნდა წავშალოთ ძველი ბურთი და გამოვაჩინოთ
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

<iframe data-url="guides/javascript-canvas-advanced-animations-adding-velocity" data-title="სიჩქარის დამატება" data-height="350"></iframe>

ამ შემთხვევაში ანიმაციის გასაშვებად ვიყენებთ `requestAnimationFrame` მეთოდს, რომელიც მოდის გლობალური `window`
ობიექტიდან. მეთოდს არგუმენტად ვაძლევთ თუ რომელი ფუნქცია უნდა გაუშვას, რაც ჩვენს შემთხვევაში არის `draw`.
ეს მოქმედებები კი ხდება, როცა კანვასზე იქნება მაუსი, ხოლო როცა კანვასი მაუს დატოვებს, ვიყენებთ
[`window.cancelAnimationFrame`](https://developer.mozilla.org/en-US/docs/Web/API/Window/cancelAnimationFrame) მეთოდს,
რომელიც შეწყვიტავს ბოლოს გამოყენებულ `requestAnimationFrame`-ს.

## საზღვრები

საზღვრების გარეშე ჩვენი ბურთი უსასრულოდ მიდის კანვასის საზღვრებიდან. ჩვენ უნდა შევამოწმოთ, ყოველ ჯერზე `x` და `y` პოზიცია
ხომ არ არის კანვასის არეალიდან გასული და, თუ არის, მაშინ საპირისპირო მიმართულებით შევაბრუნოთ ბურთი, რომ საზღვრებს არ გაცდეს.

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

<iframe data-url="guides/javascript-canvas-advanced-animations-boundaries" data-title="საზღვრების დამატება" data-height="350"></iframe>

## აჩქარება

იმისათვის, რომ მოძრაობა უფრო რეალური გახდეს, შეგვიძლია სიჩქარე შევცვალოთ შემდეგნაირად:

```js
ball.vy *= 0.99;
ball.vy += 0.25;
```

ასე ვერტიკალური სიჩქარე (`ball.vy`) შენელდება ყოველი კადრის განახლებაზე, რაც ბურთს
უფრო მიიზიდავს ქვემოთკენ.

ამ განახლებებით ჩვენი კოდი უნდა გამოიყურებოდეს შემდეგნაირად:

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

<iframe data-url="guides/javascript-canvas-advanced-animations-acceleration" data-title="აჩქარების დამატება" data-height="350"></iframe>

## მიმავალი ეფექტი

ჩვენს ბურთს ამჟამად არ აქვს კვალის (Trailing) ეფექტი. ყოველი კადრის განახლებაზე, ჩვენ უბრალოდ
ვასუფთავებთ წინა ბურთს და ვცვლით ახლით. შეგვიძლია [`clearRect`-ის](./doc/guides/javascript/canvas/drawing-figures#clearRect)
ნაცვლად გამოვიყენოთ [`fillRect`](./doc/guides/javascript/canvas/drawing-figures#fillRect) მეთოდი,
რომელიც მარტივი კვალის ეფექტს დაგვიტოვებს.

```js
ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
ctx.fillRect(0, 0, canvas.width, canvas.height);
```

<iframe data-url="guides/javascript-canvas-advanced-animations-trailing-effect" data-title="მიმავალი ეფექტის დამატება" data-height="350"></iframe>

## მაუსის კონტროლის დამატება

ბურთზე უფრო მეტი კონტროლისთვის, შეგვიძლია გამოვიყენოთ [`mousemove`](https://developer.mozilla.org/en-US/docs/Web/API/Element/mousemove_event)
ივენთი, რომ ბურთი მოგვყვებოდეს მაუსის მოძრაობისას, ხოლო როცა მოხდება [`click`](https://developer.mozilla.org/en-US/docs/Web/API/Element/click_event)
ივენთი, ბურთმა დაიწყოს იგივე მოძრაობა.

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

<iframe data-url="guides/javascript-canvas-advanced-animations-result" data-title="მაუსის კონტროლის დამატება" data-height="350"></iframe>

## შეჯამება

ამ თავში განვიხილეთ, თუ როგორ უნდა შევქმნათ შედარებით კომპლექსური ანიმაციები მცირედი ფიზიკის გამოყენებით.
სხვადასხვა ივენეთების გამოყენებამ კი მოგვცა უფრო მეტი კონტროლი, რაც უფრო ლამაზსა და გამართულს ხდის ჩვენს ანიმაციას.
თუ დავუმატებთ არსებულ ანიმაციას მცირედ პლატფორმას და სხვადასხვა ყუთებს, შეგვიძლია **Breakout**-ის თამაშიც ავაწყოთ.

კანვასის ბოლო სტატიებში შეგიძლიათ იხილოთ ორი თამაში:

1. [Breakout](./doc/guides/javascript/canvas/breakout)
2. [Stickman](./doc/guides/javascript/canvas/stickman)

იხილეთ სტატიის სამაგალითო კოდები playground-ში:

- [ბურთის დახატვა](./playground/simple/guides/javascript-canvas-advanced-animations-draw-ball)
- [სიჩქარის დამატება](./playground/simple/guides/javascript-canvas-advanced-animations-adding-velocity)
- [საზღვრები](./playground/simple/guides/javascript-canvas-advanced-animations-boundaries)
- [აჩქარება](./playground/simple/guides/javascript-canvas-advanced-animations-acceleration)
- [მიმავალი ეფექტი](./playground/simple/guides/javascript-canvas-advanced-animations-trailing-effect)
- [სრული ვერსია](./playground/simple/guides/javascript-canvas-advanced-animations-result)
