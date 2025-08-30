---
title: 'Stickman თამაში'
description: 'Stickman თამაშის აწყობა JavaScript-ში კანვასის გამოყენებით'
keywords: 'stickman, თამაშის აწყობა javascript-ში'
---

ამ სტატიაში განვიხილავთ თუ როგორ უნდა ავაწყოთ Stickman თამაში.

## თამაშის იდეა

თამაშის იდეა მარტივია: გვაქვს ერთი მოთამაშე, რომელიც უსასრულოდ გადაადგილება როგანზომილებიან სივრცეში, მარცხნივ ან მარჯვნივ.

## პარალაქსის ეფექტი და მოძრაობა

თამაშის იდეიდან გამომდინარე, უნდა გვქონდეს ერთი სურათი, რომელიც უსასრულოდ იმოძრავებს უკანა ფონზე.
ამ შედეგის მისაღწევად კი უნდა შევქმნათ [პარალქსის](https://ka.wikipedia.org/wiki/%E1%83%9E%E1%83%90%E1%83%A0%E1%83%90%E1%83%9A%E1%83%90%E1%83%A5%E1%83%A1%E1%83%98) ეფექტი.

```html
<canvas id="gameCanvas">
  <img id="bgImage" src="./bg-image.jpg" alt="background image" />
</canvas>
```

კანვასის ელემენტში სურათი მოვათავსეთ, რადგან მასზე წვდომა გვქონდეს მარტივად.

```css
body {
  margin: 0;
  padding: 0;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

canvas {
  border: 1px solid black;
  overflow: hidden;
}
```

მცირედი სტილიზაცია, რომ კანვასის ელემენტი იყოს ცენტრში და არ ჰქონდეს `overflow` (ტექნიკურად `800px`-ს ვუწერთ კონფიგურაციაში ზომას, თუმცა შესაძლებელია სრულიად რესპონსიული სახითაც შესრულება).

```js
const canvas = document.querySelector('#gameCanvas');
const bgImage = document.querySelector('#bgImage');
const ctx = canvas.getContext('2d');

const config = {
  canvas_sizes: {
    width: 800,
    height: 720,
  },
  x: 0,
  x2: bgImage.width,
  moveSpeedX: 2,
};

function initCanvasSizes() {
  canvas.width = config.canvas_sizes.width;
  canvas.height = config.canvas_sizes.height;
}

function drawBackground() {
  ctx.drawImage(bgImage, config.x, 0);
  ctx.drawImage(bgImage, config.x2, 0);
}

function animate() {
  ctx.clearRect(0, 0, config.canvas_sizes.width, config.canvas_sizes.height);

  config.x -= config.moveSpeedX;
  config.x2 -= config.moveSpeedX;

  if (config.x <= -bgImage.width) {
    config.x = config.x2 + bgImage.width;
  }

  if (config.x2 <= -bgImage.width) {
    config.x2 = config.x + bgImage.width;
  }

  if (config.x >= bgImage.width) {
    config.x = config.x2 - bgImage.width;
  }

  if (config.x2 >= bgImage.width) {
    config.x2 = config.x - bgImage.width;
  }

  drawBackground();
  requestAnimationFrame(animate);
}

initCanvasSizes();
drawBackground();
animate();
```

<iframe data-url="guides/javascript-canvas-stickman-drawing-paralax" data-title="პარალაქსის ეფექტი" data-height="750"></iframe>

დავიწყოთ კონფიგურაციის განხილვით:

- `canvas_sizes` - კანვასის ელემენტის ზომები, რომელიც ინახავს სიგანეს და სიმაღლეს
- `x` - პირველი სურათის კოორდინატი
- `x2` - მეორე სურათის კოორდინატი
- `moveSpeedX` - სურათის მოძრაობის სიჩქარე

რეალურად გვაქვს ერთი სურათი, მაგრამ მას ვიყენებთ ორჯერ. ერთი სურათის გამოყენებით რესურს (კადრს) საკმაოდ მალევე ამოვწურავთ, ხოლო როცა ორ სურათს ვიყენებთ შეგვიძლია იგივე სურათი გავამეოროთ პირველის დასრულების შემდეგ.

`initCanvasSizes` ფუნქცია გაეშვება ერთხელ და მიანიჭებს კანვასს კონფიგში არსებულ ზომებს, `drawBackground` ფუნქცია კი დახატავს სურათს ორჯერ.
`animate` ფუნქციის გამოყენებით ვციკლავთ ჩვენ კოდს, რომ პარალაქსის ეფექტმა უსასრულოდ იმუშაოს.

`animate` ფუნქციაში არსებული ლოგიკა განსაზღვრავს, თუ რა დროს უნდა მოხდეს `x` კოორდინატის ცვლილება პირველი სურათისთვის და `x2` კოორდინატის ცვლილება მეორე სურათისთვის.
ამავე ფუნქციაში ხდება ბექგრაუნდის დახატვა არსებული `x` და `x2` კოორდინატებით, ასევე `requestAnimateFrame` ფუნქციის გამოძახება, რომ გამუდმებით გამოიძახოს `animate` ფუნქცია და მივიღოთ ერთგვარი ლუპი.

## მოძრაობის დამატება

არსებული ანიმაცია მიდის უსასრულოდ მარჯნივ. რათა მივცეთ მომხმარებელს მართვის საშუალება, შემოვიტანოთ <kbd>&#8592;</kbd> და <kbd>&#8594;</kbd> ისრების მოძრაობები.

```js
const config = {
  // წინა მნიშვნელობები
  moveSpeedX: 2,
  originalMoveSpeedX: 2,
  isMoving: false,
};

function animate() {
  // წინა კოდის ნაწილი
  if (config.x2 >= bgImage.width) {
    config.x2 = config.x - bgImage.width;
  }

  drawBackground();

  if (config.isMoving) {
    requestAnimationFrame(animate);
  }
}

document.addEventListener('keydown', function (event) {
  if (event.key === 'ArrowRight') {
    config.moveSpeedX = Math.abs(config.originalMoveSpeedX);
    if (!config.isMoving) {
      config.isMoving = true;
      animate();
    }
  } else if (event.key === 'ArrowLeft') {
    config.moveSpeedX = -Math.abs(config.originalMoveSpeedX);
    if (!config.isMoving) {
      config.isMoving = true;
      animate();
    }
  }
});

document.addEventListener('keyup', function (event) {
  if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
    config.isMoving = false;
  }
});
```

<iframe data-url="guides/javascript-canvas-stickman-drawing-paralax-moving" data-title="მოძრაობის დამატება" data-height="750"></iframe>

:::info
პირველ რიგში დააკლიკეთ ჩარჩოს, რომ კლავიშების ფოკუსი იყოს კონკრეტულ `iframe`-ზე. გამოიყენეთ <kbd>&#8592;</kbd> და <kbd>&#8594;</kbd> ისრები კანვასის მიმართლების შესაცვლელად.
:::

არსებული კოდით უკვე შეგვიძლია ორივე მიმართულებით მოძრაობა, ისრების გამოყენებით.
ამისათვის კი დაგვჭირდა კონფიგურაციის მოდიფიცირება. დაემატა ორი ახალი თვისება: `originalMoveSpeedX` და `isMoving`.

- `originalMoveSpeedX` - განსაზღვრავს რეალურ სიჩქარეს, ხოლო `moveSpeedX` განსაზღვრავს უკვე აჩქარებულ მნიშვნელობას.
- `isMoving` - მოძრაობს თუ არა მოთამაშე.

ასევე დაემატა ორი ივენთის მოსმენა: კლავშზე დაკლიკება და ხელის აშვება.
როცა მომხარებელს კლავიშზე ხელი აქვს დაჭერილი, ამ დროს რომელიმე მიმართულებით უნდა მოხდეს გადაადგილება, ხოლო გაშვების შემთხვევაში - შეწყდეს ანიმაცია.

`animate` ფუნქციას ვიძახებთ იმ შემთხვევაში, თუ მომხარებელს ღილაკზე თითი აქვს დაჭერილი.

## მოთამაშის შემოტანა

ახლა კი საჭიროა დავამატოთ მოთამაშეც. თავდაპირევლად შემოვიტანოთ მარტივი ფიგურა, რომელიც პასუხისმგებელი იქნება მოძრაობაზე.

```js
const config = {
  // წინა თვისებები
  isMoving: false,
  player: {
    x: 50,
    y: 720 - (91.3 + 50),
    width: 100,
    height: 91.3,
    dir: 'right',
    speed: 1,
    bufferZone: 50,
  },
};

function drawPlayer() {
  ctx.fillStyle = 'red';
  ctx.fillRect(config.player.x, config.player.y, config.player.width, config.player.height);

  if (config.player.dir === 'right' && config.player.x < canvas.width - config.player.width - config.player.bufferZone) {
    config.player.x += config.player.speed;
  } else if (config.player.dir === 'left' && config.player.x > config.player.bufferZone) {
    config.player.x -= config.player.speed;
  }
}

function animate() {
  // წინა კოდები
  drawBackground();
  drawPlayer();

  if (config.isMoving) {
    requestAnimationFrame(animate);
  }
}

initCanvasSizes();
drawBackground();
drawPlayer();

document.addEventListener('keydown', function (event) {
  if (event.key === 'ArrowRight' && !config.isJumping) {
    config.moveSpeedX = Math.abs(config.originalMoveSpeedX);
    if (!config.isMoving) {
      config.isMoving = true;
      config.player.dir = 'right';
      animate();
    }
  } else if (event.key === 'ArrowLeft' && !config.isJumping) {
    config.moveSpeedX = -Math.abs(config.originalMoveSpeedX);
    if (!config.isMoving) {
      config.isMoving = true;
      config.player.dir = 'left';
      animate();
    }
  }
});
```

<iframe data-url="guides/javascript-canvas-stickman-moving-left-right" data-title="მოთამაშის დამატება" data-height="750"></iframe>

მომხარებლის დამატებას ვიწყებთ კონფიგურაციის მოდიფიცირებით:

- `player` - მოთამაშის ობიექტი.
  - `x` - მოთამაშის `x` კოორდინატი.
  - `y` - მოთამაშის `y` კოორდინატი.
  - `width` - მოთამაშის სიგანე.
  - `height` - მოთამაშის სიმაღლე.
  - `dir` - მოთამაშის მოძრაობის მიმართულება.
  - `speed` - მოთამაშის მოძრაობის სიჩქარე.
  - `bufferZone` - ბაფერის ზომა საზღვრისთვის.

შევქმენით `drawPlayer` ფუნქცია, რომელიც პასუხიმგებელია მოთამაშის დახატვაზე. ფუნქციაში გამოგვაქვს წითელი მართკუთხედი,
რომელსაც დავუწერეთ საზღვრები, რათა ის კანვასის ფარგლებს არ გასცდეს.

ასევე განახლება გავუკეთეთ `keydown` ივენთ ლისენერს, რისი განახლებითაც უკვე ვიმახსოვრებთ მომხარებლის სამოძრაო მიმართულებას.

## მოთამაშის ახტომა

ახლა დავუმატოთ ახტომის ფუნქციონალი. ახტომის შემოტანა მოისაზრებს მცირედი გრავიტაციის ფიზიკის შემოტანას.

დავიწყოთ კონფიგურაციის მოდიფიცირებით:

```js
const config = {
  // წინა თვისებები
  keyPressed: {},
  player: {
    x: 50,
    y: 720 - (91.3 + 50),
    width: 100,
    height: 91.3,
    dir: 'right',
    speed: 1,
    bufferZone: 50,
    isJumping: false,
    jumpVelocity: 10,
    gravity: 0.5,
  },
};

function animate() {
  // წინა კოდი

  if (config.x2 >= bgImage.width) {
    config.x2 = config.x - bgImage.width;
  }

  if (config.player.isJumping) {
    config.player.y -= config.player.jumpVelocity;
    config.player.jumpVelocity -= config.player.gravity;
    if (config.player.y >= 720 - (91.3 + 50)) {
      config.player.y = 720 - (91.3 + 50);
      config.player.isJumping = false;
    }
  }

  drawBackground();
  drawPlayer();

  if (config.isMoving || config.player.isJumping) {
    requestAnimationFrame(animate);
  }
}

document.addEventListener('keydown', function (event) {
  config.keyPressed[event.key] = true;

  if ((config.keyPressed['ArrowRight'] || config.keyPressed['ArrowLeft']) && config.keyPressed['ArrowUp']) {
    return;
  }

  if (config.keyPressed['ArrowRight'] && !config.player.isJumping) {
    config.moveSpeedX = Math.abs(config.originalMoveSpeedX);
    if (!config.isMoving) {
      config.isMoving = true;
      config.player.dir = 'right';
      animate();
    }
  } else if (config.keyPressed['ArrowLeft'] && !config.player.isJumping) {
    config.moveSpeedX = -Math.abs(config.originalMoveSpeedX);
    if (!config.isMoving) {
      config.isMoving = true;
      config.player.dir = 'left';
      animate();
    }
  }

  if (event.key === 'ArrowUp' && !config.player.isJumping) {
    config.player.isJumping = true;
    config.player.jumpVelocity = 10;
    animate();
  }
});
```

<iframe data-url="guides/javascript-canvas-stickman-jumping" data-title="ახტომის ფუნქციონალი" data-height="750"></iframe>

კონფიგურაციას დაემატა ახალი თვისებები:

- `isJumping` - ბულიანის მნიშვნელობა, მოთამაშე ჰაერშია თუ არა.
- `jumpVelocity` - ახტომის აჩქარების მნიშვნელობა.
- `gravity` - გრავიტაციის მნიშვნელობა.

`animate` ფუნქციაში დაემატა ლოგიკური პირობა, თუ მოთამაშე ჰაერშია, დაცემის ეფექტი როგორ შესრულდეს.
დაცემის ეფექტისთვის, ყოველ კადრზე ხდება მოთამაშის `y` კოორდინატის ცვლილება ახტომის აჩქარების მნიშვნელობით
და ახტომის აჩქარებაც იცვლება ყოველ კადრში, გრავიტაციის მნიშვნელობიდან გამომდინარე.
თუ მოთამაშე საწყის წერტილს დაუბრუნდა, მისი ჰაერში ყოფნის თვისება შეიცვლება `false`-ზე.

შეიცვალა `keydown` ივენთის ლისენერიც. უკვე ვიმასხოვრებთ, თუ მოთამაშემ რომელ ღილაკებს დააჭირა და მის მიხედვით ვიწყებთ სხვადასხვა ფუნქციონალის გაშვებას.
თუ ერთდროულად აკლიკებს: <kbd>&#8592;</kbd> <kbd>&#8594;</kbd> და <kbd>&#8593;</kbd> კლავიშებს, მაშინ არ განვიხილავთ არანაირ მოქმედებას,
ველოდებით მოთამაშის საწყის `y` პოზიციაზე დაბრუნებას.

## მოთამაშის დახატვა

ჩვენი თამაშის დასასრულებლად საჭიროა რეალური მოთამაშის დახატვა და არა წითელი მართკუთხედი. გამოვიყენოთ კანვასის თვისებები და დავხატოთ ლამაზი stickman.

დავარედაქტიროთ `drawPlayer` ფუნქცია:

```js
function drawPlayer() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0)';
  ctx.beginPath();
  ctx.arc(config.player.x + config.player.width / 2, config.player.y - 30, 20, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = 'black';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(config.player.x + config.player.width / 2, config.player.y - 30, 20, 0, Math.PI * 2);
  ctx.stroke();

  ctx.fillStyle = 'black';
  ctx.beginPath();
  ctx.arc(config.player.x + config.player.width / 2 - 8, config.player.y - 35, 2, 0, Math.PI * 2);
  ctx.arc(config.player.x + config.player.width / 2 + 8, config.player.y - 35, 2, 0, Math.PI * 2);
  ctx.fill();

  ctx.beginPath();
  ctx.arc(config.player.x + config.player.width / 2, config.player.y - 25, 10, 0, Math.PI);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(config.player.x + config.player.width / 2, config.player.y - 10);
  ctx.lineTo(config.player.x + config.player.width / 2, config.player.y + 40);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(config.player.x + config.player.width / 2, config.player.y + 5);
  ctx.lineTo(config.player.x + config.player.width / 2 + 20, config.player.y + 20);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(config.player.x + config.player.width / 2, config.player.y + 5);
  ctx.lineTo(config.player.x + config.player.width / 2 - 20, config.player.y + 20);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(config.player.x + config.player.width / 2, config.player.y + 40);
  ctx.lineTo(config.player.x + config.player.width / 2 + 20, config.player.y + 70);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(config.player.x + config.player.width / 2, config.player.y + 40);
  ctx.lineTo(config.player.x + config.player.width / 2 - 20, config.player.y + 70);
  ctx.stroke();

  if (config.player.dir === 'right' && config.player.x < canvas.width - config.player.width - config.player.bufferZone) {
    config.player.x += config.player.speed;
  } else if (config.player.dir === 'left' && config.player.x > config.player.bufferZone) {
    config.player.x -= config.player.speed;
  }
}
```

<iframe data-url="guides/javascript-canvas-stickman-drawing-player" data-title="მოთამაშის დახატვა" data-height="750"></iframe>

კანვასის მეთოდების გამოყენებით კი უკვე მივიღეთ ლამაზი Stickman.

## შეჯამება

ამ სტატიაში განვიხილეთ თუ როგორ უნდა აგვეწყო პატარა stickman თამაში, JavaScript-ს გამოყენებით.
რეალურად მხოლოდ მოძრაობები არის განხილული, თუმცა თავისუფლად შეგიძლიათ თამაში განავრცოთ.
კარგი სავარჯიშო იქნება, თუ შემოიტანთ ერთმანეთისგან დაშორებულ პლატფორმებს, რომლებზეც მოთამაშე უნდა გადახტეს და არ ჩავარდეს დაბლა.
კოდის დაწერა განსხვავებული მიდგომითაც შეიძლება, ეს დამოკიდებულია უშუალოდ დეველოპერსა და არსებულ კოდზე.

იხილეთ სტატიის სამაგალითო კოდები playground-ში:

- [პარალაქსის ეფექტი და მოძრაობა](./playground/simple/guides/javascript-canvas-stickman-drawing-paralax)
- [მოძრაობის დამატება](./playground/simple/guides/javascript-canvas-stickman-drawing-paralax-moving)
- [მოთამაშის შემოტანა](./playground/simple/guides/javascript-canvas-stickman-moving-left-right)
- [მოთამაშის ახტომა](./playground/simple/guides/javascript-canvas-stickman-jumping)
- [მოთამაშის დახატვა](./playground/simple/guides/javascript-canvas-stickman-drawing-player)
