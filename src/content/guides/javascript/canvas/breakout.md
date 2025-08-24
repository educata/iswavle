---
title: 'Breakout თამაში'
description: 'Breakout თამაშის აწყობა JavaScript-ში კანვასის გამოყენებით'
keywords: 'Breakout, Breakout game, თამაშის აწყობა javascript-ში'
---

ამ სტატიაში ავაწყობთ Breakout თამაშს. თუ არ იცით ეს თამაში, შეგიძლიათ
იხილოთ სტატიის ბოლოს არსებული [საბოლოო ვერსია](#საფინალო_ვერსია).

## თამაშის იდეა

თამაშის იდეა მარტივია: გვაქვს რამდენიმე აგური, რომელიც უნდა გატეხოს ბურთმა. აგურები მოთავსებულია
ჩარჩოს ზედა ნაწილიში ხოლო ბურთი და მისი სამართავი პანელი მოთავსებულია ქვემოთ. ბურთი თავდაპირველად
იწყებს ზემოთ ფრენას, რის შემდეგაც აუცილებლად ერთ-ერთ აგურს დაეჯახება და შემდეგ საპირისპირო
მიმართულებით წამოვა ქვემოთ.
მოთამაშეს ევალება, რომ ბურთს დაახვედროს მართვადი პანელი, რათა ბურთი ისევ ზემოთ ააგდოს და ქვემოთ არ ჩაუვარდეს.

![თამაშის ვიზუალი](./assets/images/canvas-breakout.png)

## აგურების დახატვა

პირველ რიგში, გვჭირდება შევქმნათ კანვასი და მასში დავხატოთ აგურები.
აგურების კოორდინატები და მნიშვნელობები სადმე უნდა შევინახოთ.
შეგვიძლია ცალ-ცალკე შევინახოთ თითოეული მნიშვნელობა, ან ერთიანად კონფიგურაციის ობიექტში მოვათავსოთ ეს მნიშვნელობები.

დავიწყოთ კანვასის შექმნით და მისი მცირედად გასტილვით:

```html
<canvas id="breakoutCanvas"></canvas>
```

```css
body {
  margin: 0;
  padding: 0;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 1rem;
  background-color: #fff;
}

canvas {
  border: 1px solid #000;
}
```

```js
const canvas = document.querySelector('canvas');

const canvasWidth = document.body.clientWidth - 50;
const canvasHeight = 500;

canvas.width = canvasWidth;
canvas.height = canvasHeight;

const config = {
  ballRadius: 10,
  paddle: {
    height: 10,
    width: 75,
    x: (canvas.width - 75) / 2,
  },
  x: canvas.width / 2,
  y: canvas.height - 30,
  brick: {
    row: Math.floor(canvas.width / 75) - 2,
    column: Math.floor(canvas.height / 50),
    width: 75,
    height: 20,
    padding: 10,
    offsetTop: 30,
    offsetLeft: 30,
  },
  bricks: [],
};

const ctx = canvas.getContext('2d');

function fillBricks() {
  for (let i = 0; i < config.brick.column; i++) {
    config.bricks[i] = [];
    for (let j = 0; j < config.brick.row; j++) {
      config.bricks[i][j] = {
        x: 0,
        y: 0,
        status: 1,
      };
    }
  }
}

function drawBricks() {
  for (let i = 0; i < config.brick.column; i++) {
    for (let j = 0; j < config.brick.row; j++) {
      if (config.bricks[i][j].status === 1) {
        let brickX = j * (config.brick.width + config.brick.padding) + config.brick.offsetLeft;
        let brickY = i * (config.brick.height + config.brick.padding) + config.brick.offsetTop;
        config.bricks[i][j].x = brickX;
        config.bricks[i][j].y = brickY;
        ctx.beginPath();
        ctx.rect(brickX, brickY, config.brick.width, config.brick.height);
        ctx.fillStyle = '#0095DD';
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}

fillBricks();
drawBricks();
```

<iframe data-url="guides/javascript-canvas-breakout-drawing-bricks" data-title="აგურების დახატვა" data-height="550"></iframe>

HTML-ის მხარეს გვაქვს ერთი ელემენტი - კანვასი - სადაც მთლიანი თამაშია გამოტანილი. CSS-ის ნაწილით კი არსებული
კანვასის ელემენტი მოვაქციეთ ცენტრში და მივანიჭეთ მარტივი სტილიზაციები. JavaScript-ის მხრიდან იწყება
მთლიანი თამაშის აწყობა. პირველ რიგში, ამოვიღეთ კანვასის ელემენტი და შემოვიტანეთ მუდმივი მნიშვნელობები:
სიგანე და სიმაღლე. სიმაღლე ყოველთვის `500` პიქსელი იქნება, თუმცა სურვილისამებრ მისი გაზრდა,
რა თქმა უნდა, შესაძლებელია, ხოლო სიგანე არსებული ეკრანის ზომას გამოკოებული `50` პიქსელის იქნება.

შემდეგ შევქმენით კონფიგურაციის ობიექტი, სადაც გვაქვს თვისებები:

- `ballRadius` - ბურთის რადიუსი.
- `paddle` - სამართავი პანელი, რომელიც იქნება ობიექტი, რადგან მასში კიდევ 3 მნიშვნელობის შენახვა გვსურს.
  - `height` - სამართავი პანელის სიმაღლე.
  - `width` - სამართავი პანელის სიგანე.
  - `x` - სამართავი პანელის საწყისი `x` კოორდინატი.
- `x` - ბურთის ამჟამინდელი `x` კოორდინატი.
- `y` - ბურთის ამჟამინდელი `y` კოორდინატი.
- `brick` - აგურის ობიექტი.
  - `row` - სტრიქონში არსებული აგურების რაოდენობა.
  - `column` - სვეტში არსებული აგურების რაოდენობა.
  - `width` - აგურის სიგანე.
  - `height` - აგურის სიმაღლე.
  - `padding` - აგურის შიდა დაშორება.
  - `offsetTop` - აგურის დაშორება ზედა ჩარჩოდან.
  - `offsetLeft` - აგურის დაშორება მარცხენა ჩარჩოდან.
- `bricks` - აგურების მასივი სადაც შევინახავთ აგურებს.

შემდეგ შევქმენით ფუნქცია `fillBricks`, რომელიც გაეშვება ერთხელ `config`-ში არსებულ `bricks` მასივში,
აგურების დასამატებლად.

თითოეულ აგურს გააჩნია 3 თვისება ციკლში:

- `x` - აგურის `x` კოორდინატი.
- `y` - აგურის `y` კოორდინატი.
- `status` - სტატუსი, სადაც `1` არის საწყისი მნიშვნელობა, ხოლო `0` დასრულებული (გატეხილი) მნიშვნელობა.

`drawBricks` ფუქნციის შექმნით ვიზუალზე ვხატავთ არსებულ აგურებს, წინა სტატიაში შესწავლილი ხერხებით.

## ბურთის დახატვა

აგურების შემდეგ გვჭირდება ბურთი, რომელიც მათ გატეხავს. გამოვიყენოთ არსებული კონფიგურაციის მნიშვნელობები და დავხატოთ ბურთიც.

```js
function drawBall() {
  ctx.beginPath();
  ctx.arc(config.x, config.y, config.ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = '#0095DD';
  ctx.fill();
  ctx.closePath();
}
```

ბურთის დახატვის დროს, გამოვიყენეთ `arc` მეთოდი, რომელსაც გადავეცით შემდეგი პარამეტრები:

- `config.x` - ბურთის `x` კოორდინატი.
- `config.y` - ბურთის `y` კოორდინატი.
- `config.ballRadius` - ბურთის რადიუსი.
- `0` - საწყისი კუთხე (startAngle).
- `Math.PI` - დასასრულის კუთხე (endAngle).

## პანელის დახატვა

ბურთის სამართავად გვჭირდება პანელი. არსებული კონფიგურაციის გამოყენებით შეგვიძლია შევქმნათ შემდეგი პანელის ფუნქცია:

```js
function drawPaddle() {
  ctx.beginPath();
  ctx.rect(config.paddle.x, canvas.height - config.paddle.height, config.paddle.width, config.paddle.height);
  ctx.fillStyle = '#0095DD';
  ctx.fill();
  ctx.closePath();
}
```

ორივე ფუნქციის დამატების შემდეგ საჭიროა მათი გამოძახება:

```js
drawBall();
drawPaddle();
```

<iframe data-url="guides/javascript-canvas-breakout-drawing-panel-and-ball" data-title="ბურთის და პანელის დახატვა" data-height="550"></iframe>

## თამაშის დაწყება

არსებული მდგომარეობით მხოლოდ ერთხელ ვხატავთ აგურებს, ბურთსა და პანელს. თამაშის დასაწყებად საჭიროა
ეს პროცესები კონსისტენტურად (კარგი ვიზუალიზაციისთვის) და სწრაფად დაიხატოს. ამ შედეგის მისაღებად კი შეგვიძლია გამოვიყენოთ `setInterval` ან `requestAnimationFrame`.

ორივე ფუნქცია მისაღებია, თუმცა უნდა დავფიქრდეთ, თუ სად გვსურს დატვირთვის გაშვება.
`setInterval` (და `setTimeout`-იც) ორიენტირებული არის CPU-ს (Central Processing Unit) გამოყენებაზე.
CPU-ში, ამ შემთხვევაშ, მოისაზრება ჩვენი კომპიუტერის (მოწყობილობის) პროცესორი, რომელიც ამუშავებს პატარა დავალებებს მოკლე დროში.
`requestAnimationFrame` კი სრულიად ორიენტირებული არის GPU-ზე (Graphics Processing Unit).
GPU-ში მოისაზრება ვიდეო ბარათი, რომელიც შესაძლებელია მოწყობილობას ჰქონდეს ცალკე გამოყოფილი ან ინტეგრირებული.

რეალურად ორივე მიდგომა შეგვიძლია გამოვიყენოთ თამაშის ციკლში მოთავსებისთვის, თუმცა პრაქტიკაში
უმჯობესია თამაშის დარენდერებისთვის (ვიზუალზე გამოსატანად) GPU დავთვირთოთ და არა CPU, ამიტომაც
გამოვიყენებთ `requestAnimationFrame`-ს.

ნაგულისხმევად `requestAnimationFrame` ეშვება `60fps`-ზე, რაც გულისხმობს 60 კადრს წამში.
შეგვიძლია ამ თვისების მოდიფიცირებაც, მაგრამ ამჯერად `60fps` სავსებით საკმარისია.

შევქმნათ ერთი ფუნქცია, რომელსაც გამოვიძახებთ ყოველი კადრის განახლებაზე.

```js
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  fillBricks();
  drawBricks();
  drawBall();
  drawPaddle();

  requestAnimationFrame(draw);
}

draw();
```

<iframe data-url="guides/javascript-canvas-breakout-looping-game" data-title="თამაშის გალუპვა" data-height="550"></iframe>

სანამ დავხატავთ, უმჯობესია, წინა კანვასის მნიშვნელობები წავშალოთ და თავიდან დავხატოთ ახალი კონფიგურაციით.

## ბურთის მოძრაობა

ახლა თამაში კი მიდის გამუდმებით, მაგრამ არაფერი არ მოძრაობს, რადგან ჩვენი კონფიგურაცია ჯერ-ჯერობით უცვლელია.
ამისათვის კი შეგვიძლია ბურთის კოორდინატი შევცვალოთ ყოველ `draw` ფუნქციის გამოძახების დროს.

კონფიგურაციაში დავამატოთ ბურთის ახალი მნიშვნელობები:

```js
const config = {
  // წინა მნიშვნელობები
  x: canvas.width / 2,
  y: canvas.height - 30,
  dx: 2,
  dy: -2,
  // შემდეგი მნიშვნელობები
};
```

`dx` და `dy` წარმოადგენს დელტა `x`-სა და დელტა `y`-ს,
რაც გულისხმობს ელემენტის კოორდინატის ცვლილების ერთეულს (`x2 - x1` და `y2 - y1`).

გამოვიყენოთ ეს მნიშვნელობები `draw`-ის ფუნქციაში:

```js
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  fillBricks();
  drawBricks();
  drawBall();
  drawPaddle();

  config.x += config.dx;
  config.y += config.dy;

  requestAnimationFrame(draw);
}
```

<iframe data-url="guides/javascript-canvas-breakout-drawing-moving-ball" data-title="ბურთის გააქტიურება" data-height="600"></iframe>

## ბურთის ჩარჩოში მოქცევა

ამ ეტაპზე ბურთი გადის აგურებშიც და ჩარჩოს მიღმაც. პირველ რიგში ჯობია გარე ჩარჩოზე საზღვრების შემოტანა.

```js
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  fillBricks();
  drawBricks();
  drawBall();
  drawPaddle();

  config.x += config.dx;
  config.y += config.dy;

  if (config.x + config.dx > canvas.width - config.ballRadius || config.x + config.dx < config.ballRadius) {
    config.dx = -config.dx;
  }

  if (config.y + config.dy > canvas.height - config.ballRadius || config.y + config.dy < config.ballRadius) {
    config.dy = -config.dy;
  }

  requestAnimationFrame(draw);
}
```

<iframe data-url="guides/javascript-canvas-breakout-boundaries" data-title="გარე ჩარჩოს შემოტანა" data-height="600"></iframe>

ამრიგად საზღვრები კი შემოვიტანეთ, თუმცა თამაშის უნდა დასრულდეს თუ ქვედა საზღვრას ეხება ბურთი. მცირედი ცვლილება შევიტანოთ ჩვენს კოდში:

```js
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  fillBricks();
  drawBricks();
  drawBall();
  drawPaddle();

  config.x += config.dx;
  config.y += config.dy;

  if (config.x + config.dx > canvas.width - config.ballRadius || config.x + config.dx < config.ballRadius) {
    config.dx = -config.dx;
  }
  if (config.y + config.dy < config.ballRadius) {
    config.dy = -config.dy;
  } else if (config.y + config.dy > canvas.height - config.ballRadius) {
    // წააგო მომხარებელმა
    return;
  }

  requestAnimationFrame(draw);
}
```

<iframe data-url="guides/javascript-canvas-breakout-correct-boundaries" data-title="სწორი საზღვრების დაწესება" data-height="600"></iframe>

არსებული პირობითი ოპერატორების დამატებით, განვსაზღვრავთ, თუ რა მომენტში უნდა მოხდეს დელტა `x` `y` ცვილებები და როდის უნდა დამთავრდეს თამაში.
თამაშის დასამთავრებლად გამოვიყენეთ ცარიელი `return`, რომელიც ფუნქციის მუშაობას ასრულებს კონკრეტულ ხაზზე.
რეალურად ჩვენ არ გვაინტერესებს `draw` ფუნქცია თუ რაიმე მნიშვნელობას დააბრუნებს მაგრამ ამ მიდგომით ვღებულობთ შეწყვეტის ფუნქციონალს,
რომ ბრაუზერმა ხელმეორედ არ გამოიძახოს `requestAnimationFrame`.

## პანელის ამუშავება

ახლა კი დავამატოთ პანელის მოძრაობა თავისი შეხების ფუნქციონალით.

```js
const config = {
  // წინა მნიშვნელობები
  dx: 2,
  dy: -2,
  movements: {
    leftPressed: false,
    rightPressed: false,
  },
  // შემდეგი მნიშვნელობები
};

document.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowRight') {
    config.movements.rightPressed = true;
  } else if (event.key === 'ArrowLeft') {
    config.movements.leftPressed = true;
  }
});

document.addEventListener('keyup', (event) => {
  if (event.key === 'ArrowRight') {
    config.movements.rightPressed = false;
  } else if (event.key === 'ArrowLeft') {
    config.movements.leftPressed = false;
  }
});

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  fillBricks();
  drawBricks();
  drawBall();
  drawPaddle();

  config.x += config.dx;
  config.y += config.dy;

  if (config.movements.rightPressed && config.paddle.x < canvas.width - config.paddle.width) {
    config.paddle.x += 7;
  } else if (config.movements.leftPressed && config.paddle.x > 0) {
    config.paddle.x -= 7;
  }

  if (config.x + config.dx > canvas.width - config.ballRadius || config.x + config.dx < config.ballRadius) {
    config.dx = -config.dx;
  }
  if (config.y + config.dy < config.ballRadius) {
    config.dy = -config.dy;
  } else if (config.y + config.dy > canvas.height - config.ballRadius) {
    if (config.x > config.paddle.x && config.x < config.paddle.x + config.paddle.width) {
      config.dy = -config.dy;
    } else {
      return;
    }
  }

  requestAnimationFrame(draw);
}
```

დააკლიკეთ ჩარჩოში არსებულ ვიზუალს, რომ კლავიატურის ფოკუსი გადავიდეს თამაშზე.

<iframe data-url="guides/javascript-canvas-breakout-moving-panel" data-title="პანელის ამუშავება" data-height="600"></iframe>

ამრიგად კოდში ვამატებთ ივენთის მოსმენას კლავიშზე დაკლიკებასა და აშვებაზე. კონფიგურაციაში
ვიმახსოვრებთ მომხრებლის დაკლიკებასა და აშვებას შემდეგ კლავიშებზე: <kbd>&#8592;</kbd> <kbd>&#8594;</kbd>.

განახლებული კონფიგურაციით შეგვიძლია ავამუშავოთ ჩვენი პანელი, რომლის განახლებაც ხდება `draw` ფუნქციაში.

## აგურების ამუშავება

ამჟამინდელი მდგომარეობით, აგურები მხოლოდ ვიზუალურად გამოდის და მასში თავისუფლად ტარდება ბურთი.
დავუმატოთ თითოეულ აგურს ახალი ფუნქციონალური ნაწილი, რომლის მიხედვითაც ბურთის შეხებისას ის გაქრება და ბურთი შეიცვლის მიმართულებას.

```js
function collisionDetection() {
  for (let i = 0; i < config.brick.column; i++) {
    for (let j = 0; j < config.brick.row; j++) {
      let brick = config.bricks[i][j];
      if (brick.status === 1) {
        if (config.x > brick.x && config.x < brick.x + config.brick.width && config.y > brick.y && config.y < brick.y + config.brick.height) {
          config.dy = -config.dy;
          brick.status = 0;
          if (config.score === config.brick.row * config.brick.column) {
            // თამაშის დასრულება
          }
        }
      }
    }
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawBricks();
  drawBall();
  drawPaddle();
  collisionDetection();
  // დანარჩენი კოდი
}

fillBricks();
draw();
```

<iframe data-url="guides/javascript-canvas-breakout-bricks" data-title="აგურების ამუშავება" data-height="600"></iframe>

ამგვარად დავამატეთ ფუნქცია `collisionDetection`, რომელიც ამოწმებს, ამჟამინდელი მდგომარეობით,
რომელიმე აგურს ხომ არ შეეხო ჩვენი ბურთი და, თუ შეეხო, მაშინ მისი სტატუსი შეცვალოს `0`-ზე,
რათა შემდეგი კადრის დახატვის დროს იგი აღარ გამოვიტანოთ.

ამრიგად `draw` ფუნქციის გარეთ გაგვაქვს `fillBricks` ფუნქციაც, რადგან ის მაშინ უნდა გაეშვას, როცა თამაში იწყება.

## ქულები და თამაშის დასრულება

აგურებზე ფუნქციონალური ნაწილის დამატების შემდეგ, უკვე შესაძლებელი გახდა თამაშში მეტი აქტივობის შემოტანა,
როგორიცა ქულების სისტემა და თამაშის დასრულება. თამაში უფრო საინტერესო გახდება ორივე აქტივობის დამატებით.

```js
const config = {
  // წინა მნიშვნელობები
  bricks: [],
  score: 0,
  gameOver: false,
};

function collisionDetection() {
  for (let i = 0; i < config.brick.column; i++) {
    for (let j = 0; j < config.brick.row; j++) {
      let brick = config.bricks[i][j];
      if (brick.status === 1) {
        if (config.x > brick.x && config.x < brick.x + config.brick.width && config.y > brick.y && config.y < brick.y + config.brick.height) {
          config.dy = -config.dy;
          brick.status = 0;
          config.score++;
          if (config.score === config.brick.row * config.brick.column) {
            config.gameOver = true;
          }
        }
      }
    }
  }
}

function drawScore() {
  ctx.font = '16px Arial';
  ctx.fillStyle = '#0095DD';
  ctx.fillText('ქულა: ' + config.score, 8, 20);
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawBricks();
  drawBall();
  drawPaddle();
  drawScore();
  collisionDetection();

  if (!config.gameOver) {
    config.x += config.dx;
    config.y += config.dy;
  }

  // დანარჩენი კოდი
}
```

<iframe data-url="guides/javascript-canvas-breakout-winning-game" data-title="ქულების დამატება" data-height="600"></iframe>

მსგავსი კოდის მოდიფიცირებით, ყოველი აგურის გატეხვის დროს მოთამაშეს ქულა მოემატება
და შემდეგ ამავე ქულის გამოყენებით ვგებულობთ შეწყდეს თუ არა თამაში.

ჩვენ ასევე დავამატეთ ახალი `drawScore` ფუნქციაც, რომელიც გაეშვება ყოველჯერზე `draw` ფუქნციის გამოძახების დროს.

## საფინალო ვერსია

რადგან უკვე გვაქვს თამაშის დასრულების ლოგიკა, ასევე საჭიროა თამაშის დარესტარტების ლოგიკის შემოტანაც.

```html
<button id="restartBtn" disabled>Restart</button>
```

```css
button {
  border: 1px solid steelblue;
  background-color: transparent;
  padding: 0.5rem 1.5rem;
  border-radius: 3px;
  cursor: pointer;
  background-color: #0095dd;
  color: white;
}

button:disabled {
  cursor: not-allowed;
  background-color: #0093dd7a;
}
```

```js
const restartBtn = document.querySelector('#restartBtn');

restartBtn.addEventListener('click', function () {
  if (config.canRestart) {
    this.disabled = true;
    restartGame();
  }
});

const config = {
  // წინა მნიშვნელობები
  dx: Math.random() < 0.5 ? -2 : 2,
  dy: Math.random() < 0.5 ? -2 : 2,
  // სხვა მნიშვნელობები
  canRestart: false,
  gameOver: false,
  animationFrame: 0,
};

function collisionDetection() {
  for (let i = 0; i < config.brick.column; i++) {
    for (let j = 0; j < config.brick.row; j++) {
      let brick = config.bricks[i][j];
      if (brick.status === 1) {
        if (config.x > brick.x && config.x < brick.x + config.brick.width && config.y > brick.y && config.y < brick.y + config.brick.height) {
          config.dy = -config.dy;
          brick.status = 0;
          config.score++;
          if (config.score === config.brick.row * config.brick.column) {
            config.canRestart = true;
            restartBtn.disabled = false;
            config.gameOver = true;
          }
        }
      }
    }
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBricks();
  drawBall();
  drawPaddle();
  drawScore();
  collisionDetection();

  if (!config.gameOver) {
    config.x += config.dx;
    config.y += config.dy;
  }

  if (config.movements.rightPressed && config.paddle.x < canvas.width - config.paddle.width) {
    config.paddle.x += 7;
  } else if (config.movements.leftPressed && config.paddle.x > 0) {
    config.paddle.x -= 7;
  }

  if (config.x + config.dx > canvas.width - config.ballRadius || config.x + config.dx < config.ballRadius) {
    config.dx = -config.dx;
  }
  if (config.y + config.dy < config.ballRadius) {
    config.dy = -config.dy;
  } else if (config.y + config.dy > canvas.height - config.ballRadius) {
    if (config.x > config.paddle.x && config.x < config.paddle.x + config.paddle.width) {
      config.dy = -config.dy;
    } else {
      restartBtn.disabled = false;
      config.canRestart = true;
      cancelAnimationFrame(config.animationFrame);
      return;
    }
  }

  config.animationFrame = requestAnimationFrame(draw);
}

function restartGame() {
  cancelAnimationFrame(config.animationFrame);
  config.x = canvas.width / 2;
  config.y = canvas.height - 30;
  config.movements.leftPressed = false;
  config.movements.rightPressed = false;
  config.score = 0;
  config.canRestart = false;
  config.gameOver = false;
  config.paddle.x = config.x - config.paddle.width / 2;
  config.dx = Math.random() < 0.5 ? -2 : 2;
  config.dy = Math.random() < 0.5 ? -2 : 2;
  fillBricks();
  draw();
}
```

ამ კოდის დამატებით კი უკვე რესტარტის ღილაკიც იქნება ფუნქციური. მომხარებელმა რომ თამაშის პროცესში არ დააჭიროს რესტარტს,
ღილაკს ექნება `disabled` ატრიბუტი, რომლის დახმარებითაც დაკლიკება არ იქნება შესაძლებელი.
ასევე საჭიროა `requestAnimationFrame`-ის მიერ დაბრუნებული უნიკალური `id`-ს შენახვა, რომ მისი `cancelAnimationFrame`-იც სწორ დროს მოხდეს.
თუ `cancelAnimationFrame`-ს არ გამოვიყენებთ, მაშინ ყოველ გაშვებაზე გამოვიძახებთ `draw` ფუნქციას, რაც თამაშს დროდადრო ისე აასწრაფებს,
რომ შეუძლებელი გახდება თამაში.

უფრო საინტერესო რომ გავხადოთ თამაში, დავამატოთ შემთხვევითობის პრინციპი. ამ პრინციპის დამატებით, დასაწყისში და დარესტარტების დროს, ბურთის მიმართულება იქნება შემთხვევითი.

<iframe data-url="guides/javascript-canvas-breakout" data-title="Breakout თამაში" data-height="600"></iframe>

## შეჯამება

ამ სტატიაში ნულიდან ავაწყვეთ Breakout თამაში. თამაში სრულიად განაწილებულია ფუნქციებში და დაყრდნობილია ძირითად `config` ობიექტზე,
რაც საშუალებას გვაძლევს, სხვადასხვა რეჟიმები დავამატოთ მარტივად.

ამჟამინდელი ვერსია მხოლოდ მორგებულია ისეთ მოწყობილობებზე, რომელსაც გააჩნია კლავიატურა.
კოდში მცირედი მოდიფიცირებით შეგიძლიათ ორი ღილაკი დაამატოთ, რომლის მიხედვითაც თამაში ფუნქციური იქნება მობილურ მოწყობილობებზეც.

იხილეთ სტატიის სამაგალითო კოდები playground-ში:

- [აგურების დახატვა](./playground/simple/guides/javascript-canvas-breakout-drawing-bricks)
- [ბურთის და პანელის დახატვა](./playground/simple/guides/javascript-canvas-breakout-drawing-panel-and-ball)
- [თამაშის გალუპვა](./playground/simple/guides/javascript-canvas-breakout-looping-game)
- [ბურთის გააქტიურება](./playground/simple/guides/javascript-canvas-breakout-drawing-moving-ball)
- [გარე ჩარჩოს შემოტანა](./playground/simple/guides/javascript-canvas-breakout-boundaries)
- [სწორი საზღვრების დაწესება](./playground/simple/guides/javascript-canvas-breakout-correct-boundaries)
- [პანელის ამუშავება](./playground/simple/guides/javascript-canvas-breakout-moving-panel)
- [აგურების ამუშავება](./playground/simple/guides/javascript-canvas-breakout-bricks)
- [ქულების დამატება](./playground/simple/guides/javascript-canvas-breakout-winning-game)
- [საფინალო ვერსია](./playground/simple/guides/javascript-canvas-breakout)
