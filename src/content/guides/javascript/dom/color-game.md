---
title: 'ფერების თამაში'
description: 'ფერების თამაშის აწყობა JavaScript გამოყენებით'
keywords: 'ვებში თამაშის აწყობა, ფერების თამაში, მარტივი თამაშის აწყობა, color game, build web game'
image: 'https://iswavle.com/assets/images/color-game.jpg'
---

ამ სტატიაში გამოვიყენებთ წინა სტატიებში მიღებულ ცოდნას და შევქმნით ფერების თამაშს.

## თამაშის იდეა

ზოგადად სანამ კოდის წერას დაიწყებთ, ყოველთვის საჭიროა ამოცანის კარგად გაანალიზება.
თამაშის იდეა შემდგომია: მომხარებელს ვიზუალზე უჩანს ცხრა ცალი ყუთი, სადაც რეჟიმიდან
გამომდინარე იქნება შესაბამისი რაოდენობის ყუთი გაფერადებული. სულ გვექნება სამი
რეჟიმი თუმცა რეჟიმების დამატებაც სურვილისამებრ შეგიძლიათ.

რეჟიმის კონფიგურაციები შეგიძლიათ შეცვალოთ სურვილისამებრ, შემოგთავაზებთ მარტივ ვერსიას
ცხრილის სახით:

| რეჟიმი  | გაფერადებული ყუთების რაოდენობა | ქულის მომატება | ქულის დაკლება |
| ------- | ------------------------------ | -------------- | ------------- |
| მარტივი | 3                              | 10             | -7            |
| საშუალო | 6                              | 20             | -14           |
| რთული   | 9                              | 40             | -28           |

პირველ რიგში მომხარებელმა უნდა აირჩიოს რეჟიმი, რის მიხედვითაც დაიწყება თამაში. როცა თამაში
დაიწყება შეივსება იმ რაოდენობის ფერებით თუ რა რეჟიმიც იყო არჩეულიც.

![ფერების თამაშის ვიზუალური მაგალითი](./assets/images/color-game.jpg)

## თამაშის მარქაფი

თამაშის ვიზუალი მარტივია, ორ ნაწილად გაყოფილი კონტეინერი სადაც მარცხენა მხარეს კონტროლერებია,
ხოლო მარჯვენა მხარეს ყუთები. HTML და CSS დაწერა ბევრნაირად შეიძლება ამ შემთხვევაში კი მარტივად
შესრულებულია ორივე ნაწილი რისი გაუმჯობესებაც შესაძლებელია.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>ფერების თამაში</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet" />
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous" />
    <link rel="stylesheet" href="./style.css" />
  </head>
  <body>
    <main class="container-xxl m-auto p-4">
      <section class="game row d-flex align-items-center justify-content-center w-100 m-auto p-4 shadow rounded gap-3">
        <aside class="col">
          <article>
            <h3>რეჟიმი: <span id="displayMode">არაფერი</span></h3>
            <h3>ფერი: <span id="displayColor">არაფერი</span></h3>
            <h3>ქულა: <span id="displayScore">0</span></h3>
            <div class="d-flex align-items-center gap-3 mt-4">
              <button class="btn btn-success" data-box-count="3" data-win-score="10" data-loss-score="7">მარტივი</button>
              <button class="btn btn-warning" data-box-count="6" data-win-score="20" data-loss-score="14">საშუალო</button>
              <button class="btn btn-danger" data-box-count="9" data-win-score="40" data-loss-score="28">რთული</button>
              <button class="btn btn-primary" id="resetBtn">თავიდან დაწყება</button>
            </div>
          </article>
        </aside>
        <aside class="col boxes">
          <div class="box-wrap">
            <div class="box"></div>
            <div class="box"></div>
            <div class="box"></div>
          </div>
          <div class="box-wrap">
            <div class="box"></div>
            <div class="box"></div>
            <div class="box"></div>
          </div>
          <div class="box-wrap">
            <div class="box"></div>
            <div class="box"></div>
            <div class="box"></div>
          </div>
        </aside>
      </section>
    </main>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
    <script src="./main.js"></script>
  </body>
</html>
```

```css
body {
  margin: 0;
  padding: 0;
  font-family: 'Montserrat', sans-serif;
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

main section.game {
  max-width: 1050px;
}

main section aside.boxes {
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 50px;
}

main section aside div.box-wrap {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 50px;
  place-items: center;
}

main section aside div.box-wrap div.box {
  width: 100%;
  min-width: 100px;
  padding-top: 100%;
  background-color: transparent;
  border: 1px solid black;
  cursor: not-allowed;
  border-radius: 8px;
}
```

მოცემულ მაგალითში გვაქვს HTML და CSS კოდები. HTML მხარეს გვაქვს `Montserrat` ფონტის შემოტანა,
`bootstrap`-ის შემოტანა და ასევე CSS-ს ნაწილი, რაც გამოგვადგება სპეციფიკური სტილიზაციების შემოსატანად.
ასევე CSS-ს გარდა გვაქვს სკრიპტების შემოტანა სადაც შემოგვაქვს: `sweetalert2`-ს ბიბლიოთეკა, `bootstrap`-ს
JavaScript-ს ნაწილი და `main.js` ჩვენი სკრიპტებისთვის.

მთავარი მარქაფი იწყება `main` ელემენტის შიგნით, სადაც გვაქვს ვიზუალის ორ ნაწილად გაყოფა.
მარცხენა მხარეს გვაქვს: რეჟიმის, გამოსაცნობი ფერის და ქულის გამოტანა, ასევე რეჟიმის სამართავი ღილაკები.
მარჯვენა მხარეს კი გვაქვს 9 ცალი ყუთი, რომელიც თავიდან არის უფერული.

HTML-ში არსებულ ღილაკებს თუ დაუკვირდებით მითითებული გვაქვს რამოდენიმე ატრიბუტი:

- `data-box-count` - რამდენი ყუთი იყოს
- `data-correct-score` - რამდენი ქულა მოემატოს
- `data-incorrect-score` - რამდენი ქულა დააკლდეს

## თამაშის სკრიპტი

სკრიპტის დაწერისას პირველ რიგში დაგვჭირდება საჭირო ელემენტების ამოღება:

```js
const displayScore = document.querySelector('#displayScore');
const displayColor = document.querySelector('#displayColor');
const displayMode = document.querySelector('#displayMode');
const resetBtn = document.querySelector('#resetBtn');
const actionButtons = document.querySelectorAll('button[data-box-count]');
const boxes = document.querySelectorAll('div.box');
```

მსგავს ტიპად ყოველი ელემენტი საჭირო ელემენტი ამოვირეთ JavaScript-ის მხარეს.
ღილაკები ორ ნაირად ამოვიღეთ: ერთი ღილაკი სპეციფიკურად თავიდან დასაწყებად ცალკე
ამოვიღეთ `id`-ით ხოლო დანარჩენი ღილაკები ერთიანად ამოვიღეთ რადგან ერთ ლოგიკას
გადიან განსხვავებული კონფიგურაციით.

ელემენტის ამოღების შემდეგ საჭიროა მათი გამოყენება. პირველ რიგში დავიწყოთ რეჟიმის
ღილაკებზე ივენთის მოსმენა, რომ დაკლიკების შემთხვევაში ჩვენი სკრიპტი გაეშვას:

```js
actionButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const boxCount = Number(button.getAttribute('data-box-count'));
    const winScore = Number(button.getAttribute('data-win-score'));
    const lossScore = Number(button.getAttribute('data-loss-score'));
    const mode = button.innerText;
    initGame({ mode, boxCount, winScore, lossScore });
  });
});

function initGame(buttonAttr) {
  console.log(buttonAttr);
}
```

მსგავსი ტიპით ყოველ რეჟიმის ღილაკს მოვუსმენთ, რომ დაკლიკების შემთხვევაში
გამოვიძახოთ `initGame` ფუნქციას სადაც პარამეტრად გავაყოლებთ ობიექტს შემდგომი
თვისებებით: რეჟიმის სახელს, ყუთების რაოდენობას, მოგების ქულას და წაგების ქულას.

`initGame` ფუნქციას ცოტა ხანში დავუბრუნდებით მანამდე რამდენიმე დამხმარე
ფუნქცია ავაწყოთ:

```js
function getRandomNumber(max = 256) {
  return Math.floor(Math.random() * max);
}

function getRandomRGB() {
  const r = getRandomNumber();
  const g = getRandomNumber();
  const b = getRandomNumber();
  return `rgb(${r},${g},${b})`;
}

function getRandomColors(count) {
  const array = [];
  for (let i = 0; i < count; i++) {
    array.push(getRandomRGB());
  }
  return array;
}
```

შევქმენით 3 დამხმარე ფუნქცია, რასაც შემდეგ გამოვიყენებთ `initGame` ფუნქციაში.
ზოგადად ჯობია დამხმარე ფუნქციები შექმნათ შემდგომი ლოგიკით: ერთი ფუნქცია
ერთი დანიშნულება.

გავაგრძელოთ `initGame` ფუნქციის აწყობა:

```js
function initGame(buttonAttr) {
  const { mode, boxCount, winScore, lossScore } = buttonAttr;
  const colors = getRandomColors(boxCount);
  const answer = getRandomNumber(boxCount);
  console.log(colors, answer);
}
```

სანამ სრულიად ავაწყობთ `initGame` ფუნქციას, მანამდე ნაწილ-ნაწილ განვიხილოთ
თუ რა მნიშვნელობებს გამოვიყენებთ:

- ვიწყებთ ობიექტის დესტრუქტურიზაციით, რომ გვქონდეს ცვლადები: `mode`, `boxCount`,
  `winScore` და `lossScore` თავისი მნიშვნელობებით.
- ვქმნით `colors` მასივს სადაც იქნება იმ რაოდენობის ფერები მოცემული
  თუ რამდენი ყუთიც გვაქვს შესავსები.
- ვქმნით `answer` ცვლადს და ვანიჭებთ დაგენერირებულ მნიშვნელობას `0`-დან
  `boxCount` მნიშვნელობამდე.

გავაგრძელოთ ფერების შევსებით:

```js
function initGame(buttonAttr) {
  const { mode, boxCount, winScore, lossScore } = buttonAttr;
  const colors = getRandomColors(boxCount);
  const answer = getRandomNumber(boxCount);

  for (const [index, box] of boxes.entries()) {
    if (index === boxCount) {
      break;
    }
    box.style.backgroundColor = colors[index];
    box.style.cursor = 'pointer';
  }

  displayColor.textContent = colors[answer];
  displayMode.textContent = mode;
}
```

უკვე ჩვენს `initGame` ფუნქციას შეუძლია: ფერების შევსება, გამოსაცნობი ფერის გამოტანა,
და რეჟიმის გამოტანა. დავიწყეთ ციკლი ყუთის ყოველი ელემენტისთვის, სადაც რეჟიმიდან
გამომდინარე სპეციფიკური რაოდენობის ყუთები გავაფერადეთ შემთხვევითი ფერებით.
`entries()` მეთოდის გამოყენებით დავაბრუნეთ იტერირებადი მასივი, რის მიხედვითაც
გვაქვს ელემენტიც და ინდექსიც.

ციკლი უნდა დატრიალდეს მხოლოდ იმ რაოდენობის ელემენტებისთვის თუ რა რეჟიმიც
არის არჩეული. თუ ციკლის იტერაცია (`index`) გახდება ყუთების რაოდენობის ტოლი,
ეს არის ის მომენტი როცა უნდა გავწყვიტოთ ციკლი. შესაძლოა ციკლი არ გაგვწყვიტა,
რაც მხოლოდ იმ ყუთების რაოდენობას შეავსებდა ფერებით რაც გვაქვს `colors` მასივში,
დანარჩენი ყუთებისთვის იქნებოდა `undefined` ფერი, რაც არ მიენიჭებოდა საერთოდ,
თუმცა ფერის ცვლილებასთან ერთად ვანიჭებთ `cursor`-ს ტიპსაც, რაც განსაზღვრავს
დაკლიკება შეიძლება თუ არა (`pointer`), რადგან თავიდან ყოველ ყუთს მივანიჭეთ
`cursor: not-allowed`.

ამიტომაც სწორ რაოდენობაზე, რომ გვქონდეს `cursor: pointer` ამისათვის ჯობია ციკლი
სწორ დროს გავწყვიტოთ. ციკლის შემდგომ ვიზუალზე გამოგვაქვს გამოსაცნობი ფერი და
არსებული რეჟიმი. გამოსაცნობი ფერისთვის გამოვიყენეთ `colors[answer]`, რაც გულისხმობს
ფერების მასივიდან `answer` ინდექსის მნიშვნელობის ამოღებას.

თუმცა ერთი პრობლემა გვაქვს ვიზუალზე თუ მომხარებელი რიგრიგობით არ დააკლიკებს
ღილაკებს ფერები ძველი რეჟიმიდან დარჩება. მაგალითად: დავაკლიკეთ `მარტივ` ღილაკს,
გაფერადდა 3 ყუთი, შემდეგ `რთულ` ღილაკზე დაკლიკებით ვღებულობთ 9 შევსებულ
ფერს, თუმცა თუ ნებისმიერ სხვა რეჟიმს ავირჩევთ გაფერადებული ფერები დარჩება, ამიტომაც
საჭიროა ყოველჯერზე როცა მომხარებელი რეჟიმს აირჩევს გავასუფთავოთ მინიჭებული სტილიზაციები
და მივანიჭოთ ნაგულისხმევი სტილები.

```js
//  წინა კოდები

function initGame(buttonAttr) {
  initDefaultStyles();
  // დანარჩენი კოდები
}

// სხვა utils ფუნქციები

function initDefaultStyles() {
  boxes.forEach((box) => {
    box.style.backgroundColor = 'transparent';
    box.style.cursor = 'not-allowed';
  });
}
```

მსგავს ტიპად ყოველჯერზე როცა რეჟიმს აირჩევს მომხარებელი სტილიზაციები დაუბრუნდება ნაგულისხმევ
მნიშვნელობას. ამ ეტაპამდე უკვე გვაქვს ყუთების გაფერადება, გამოსაცნობი ფერის და ამჟამინდელი რეჟიმის გამოტანა.

ეხლა გადავიდეთ მთავარ ეტაპზე, ყუთებზე დაკლიკება. ყუთზე დაკლიკება ამ თამაშის მთავარი ნაწილია,
რადგან მის მიხედვით უნდა გამოვიტანოთ მომხარებელმა ფერი გამოიცნო თუ ვერა.

```js
boxes.forEach((box) => {
  box.addEventListener('click', () => {
    console.log(box);
  });
});
```

მსგავს ტიპად ყოველ ყუთზე დაკლიკება დაგვილოგავს იმ ელემენტს თუ რაზეც მოხდა დაკლიკება. თუმცა აქვე
ერთი საინტერესო კითხვა ჩნდება:

როგორ მივხდეთ სწორ ადგილას დააკლიკა თუ არა მომხარებელმა ?

როცა თამაში იწყება `initGame` ფუნქციით, ჩვენ პარამეტრად მთელი ღილაკის არგუმენტებს ვღებულობთ, მაგრამ
ამ არგუმენტებზე წვდომა მხოლოდ `initGame` ფუნქციის `scope`-ში გვაქვს, რამენაირად უნდა მოვახერხოთ, რომ ეს
კონფიგურაცია `box`-ზე დაკლიკების დროსაც გვქონდეს.

ერთ-ერთი მიდგომა ამისათვის არის ცალკე ცვლადში შენახვა და ყოველ რეჟიმის არჩევისას მისი განახლება. მსგავსი
კონფიგურაცია უმჯობესია შევინახოთ ობიექტში, რომლის გამოყენებაც მთლიან კოდში იქნება შესაძლებელი.

```js
// სხვა ელემენტების შემოტანა
const actionButtons = document.querySelectorAll('button[data-box-count]');
const boxes = document.querySelectorAll('div.box');

const config = {
  mode: '',
  answer: -1,
  count: 0,
  score: 0,
  scoreMap: {
    win: 0,
    loss: 0,
  },
};
```

მსგავს ტიპად `config`-ს ობიექტში ინფორმაციის შენახვა დაგვეხმარება ცვლადებს მივწვდეთ იმ `scope`-ში სადაც
გვსურს, რეალურად წვდომა შესაძლებელია მისი აღწერის შემდეგ, ამიტომაც `config` ცვლადი აღვწერეთ ზემოთ.

`config` ობიექტს თავიდან ნაგულისხმევი მნიშვნელობები მივანიჭეთ:

- `mode` - ცარიელი სტრინგი რადგან არანაირი რეჟიმი არ არის არჩეული.
- `answer` - `-1` რადგან მინუს ერთი ინდექსი არ არსებობს.
- `count` - `0` თავიდან ერთი ყუთიც არ გვაქვს.
- `score` - `0` თავიდან არანაირი ქულა არ აქვს.
- `scoreMap` - ობიექტში `win` და `loss` ქულები `0` რადგან ჯერ არ ვიცით რეჟიმიდან გამომდინარე
  რამდენი ქულა უნდა მოვუმატოთ ან დავაკლოთ.

```js
// წინა კოდები

boxes.forEach((box) => {
  box.addEventListener('click', () => {
    console.log(box);
    console.log(config);
  });
});

function initGame(buttonAttr) {
  const { mode, boxCount, winScore, lossScore } = buttonAttr;
  const colors = getRandomColors(boxCount);
  const answer = getRandomNumber(boxCount);
  // წინა კოდები
  displayColor.textContent = colors[answer];
  displayMode.textContent = mode;
  config.mode = mode;
  config.count = boxCount;
  config.answer = answer;
  config.scoreMap = {
    win: winScore,
    loss: lossScore * -1,
  };
}
```

მსგავს ტიპად `config` ცვლადში ვინახავთ ყოველ ჯერზე განახლებულ კონფიგურაციას, როცა მომხარებელი
აირჩევს რეჟიმს. ყუთებზე დაკლიკების შემდგომ უკვე დაილოგება: ყუთი რომელზეც მოხდა დაკლიკება (`box`)
და კონფიგურაცია (`config`).

ეხლა უკვე შეგვიძლია დავასრულოთ ყუთზე დაკლიკების მთლიანი ლოგიკა.

## sweetAlert

HTML მხარეს შემოვიტანეთ [`sweetAlert`](https://sweetalert2.github.io/)-ის ბიბლიოთეკა, რაც დაგვეხმარება
ლამაზი ალერტების გამოტანაში. ინსტალაცია საკმაოდ მარტივია HTML-ში შეგვიძლია `cdn` შემოვიტანოთ.

```html
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
```

მისი გამოყენება საკმაოდ მარტივია, შეგიძლიათ სხვადასხვა [მაგალითები](https://sweetalert2.github.io/#examples)
იხილოთ და შემდგომ დაიწყოთ მისი გამოყენება.

ჩვენს შემთხვევაში `sweetAlert` ბიბლიოთეკის გამოყენებას ერთ ფუნქციაში შევკრავთ, რომელსაც ხშირად გამოვიყენებთ:

```js
function displayAlert(title, icon, text = '') {
  Swal.fire({ title, icon, text });
}
```

## თამაშის დასრულება

გავაგრძელოთ ყუთზე დაკლიკების ლოგიკის დასრულება:

```js
boxes.forEach((box, index) => {
  box.addEventListener('click', () => {
    if (config.mode === '' || config.answer === -1) {
      displayAlert('არასწორი რეჟიმი', 'info', 'პირველ რიგში აირჩიე რეჟიმი');
      return;
    }

    if (config.count <= index) {
      displayAlert('აირჩიეთ გაფერადებული ყუთი', 'warning');
      return;
    }

    const hasWon = config.answer === index;

    let total = config.score + (hasWon ? config.scoreMap.win : config.scoreMap.loss);

    if (total < 0) {
      total = 0;
    }

    config.score = total;
    displayScore.textContent = config.score;

    displayAlert(hasWon ? 'მოიგეთ' : 'წააგეთ', hasWon ? 'success' : 'error', `თქვენ ${hasWon ? 'სწორ' : 'არასწორ'} ყუთს დააკლიკეთ`);
  });
});
```

მსგავსი კოდის დაწერით ყოველ ჯერზე, როცა ყუთს დავაკლიკებთ დინამიურად ვიანგარიშებთ
მომხარებელმა სწორ ადგილას დააკლიკა თუ არა, დაკლიკების შემდგომ ქულა რამდენით მოემატოს.

დეტალურად განვიხილოთ კოდის ნაწილი:

პირველი `if`-ით განვსაზღვრავთ მომხარებელმა რეჟიმი აირჩია თუ არა. მეორე `if`-ით განვსაზღვრავთ
მომხარებელმა აირჩია თუ არა გაფერადებული ყუთი. თუ რომელიმე `if` გაეშვება მაშინ ფუნქციის
გამოძახება გაწყდება იქვე, რომ კოდი არ გაგრძელდეს. `hasWon` ცვლადში განვსაზღვრავთ მომხარებელმა
გამოიცნო თუ ვერა ფერი. ქულას კი ვანგარიშობთ შემდგომი პრინციპით: თუ სწორ ადგილას დააკლიკა
ვიყენებთ `config.scoreMap.win` მნიშვნელობას, რაც არის დადებითი რიცხვი ხოლო თუ არასწორ
ადგილას დააკლიკებს ვიყენებთ `config.scoreMap.loss` მნიშვნელობას სადაც უარყოფითი რიცხვი გვაქვს
შენახული. ამჟამინდელ ქულას ვუმატებთ მოგების ქულას ან წაგების ქულას, რაც საბოლოო ჯამში
მოგვცემს ახალ ქულას, რომელსაც შევინახავთ ცვლად `total`-ში. შემდგომ თუ ჯამური ქულა ნაკლებია
0-ზე მაშინ ჯამს ვანულებთ რადგან მეტწილადად მომხარებელს არ მოსწონს მისი ქულა მინუსებში, ამიტომაც
ჯობია უბრალოდ გავანულოთ ჯამი (სურვილისამებრ შეგიძლიათ შეცვალოთ).

კონფიგურაციაში ვინახავთ ახალ ჯამურ მნიშვნელობას და `displayScore`-ში ვანახლებთ `textContent`
თვისებას სადაც ახალ ჯამურ მნიშვნელობას მივანიჭებთ, რის მიხედვითაც ვიზუალზე მოხდება
განახლებული შედეგის გამოტანა.

თუმცა ამით ჩვენი თამაში არ მთავრდება, ამჟამინდელ კოდს ერთი შეცდომა აქვს. არასწორ ადგილას
დაკლიკება სწორად აკლებს ქულას მაგრამ სწორ ადგილას დაკლიკება ქულას მოუმატებს და მეტი არაფერი
მოხდება, მომხარებელს შეუძლია ხშირად იგივე ადგილას დააკლიკოს. როგორ გამოვასწოროთ ეს პრობლემა ?

შეგვიძლია `initGame` თავიდან გამოვიძახოთ შემდგომი სახით:

```js
// box დაკლიკების იგივე კოდი
config.score = total;
displayScore.textContent = config.score;

displayAlert(hasWon ? 'მოიგეთ' : 'წააგეთ', hasWon ? 'success' : 'error', `თქვენ ${hasWon ? 'სწორ' : 'არასწორ'} ყუთს დააკლიკეთ`);

if (hasWon) {
  initGame({
    mode: config.mode,
    boxCount: config.count,
    winScore: config.scoreMap.win,
    lossScore: Math.abs(config.scoreMap.loss),
  });
}
```

ამ კოდის დამატებით, როცა მომხარებელი სწორ ყუთს დააკლიკებს ისევ `initGame` ფუნქციას თავიდან გამოიძახებს,
რაც თავიდან დაიწყებს იგივე რეჟიმს. `lossScore`-თან მიმართებაში გამოვიყენეთ `Math.abs`, რომელიც გამოიყენება
რიცხვის მოდულში გასატანად, რომ ნებისმიერ შემთხვევაშ დადაებითი რიცხვი დაბრუნდეს (`10 = |-10|`). `Math.abs`
გამოყენება გვჭირდება იმისათვის, რომ შემდგომ `initGame`-ში მინუს ერთზე ვამრავლებთ თუ არ გადავცემთ დადებით
რიცხვს, მივიღებთ რომ მინუს მინუსზე გავამრავლებთ, რაც ისევ დადებით რიცხვს მოგვცემს.

## თამაშის reset

ვიზუალზე გვაქვს თავიდან დაწყების ღილაკი (`reset`), რომელზეც ჯერ არანაირი ფუნქციონალი არ გაგვიწერია.
მოდით შევმატოთ ამ ღილაკს თავიდან დაწყების ფუნქციონალი:

```js
const config = {
  mode: '',
  answer: -1,
  count: 0,
  score: 0,
  scoreMap: {
    win: 0,
    loss: 0,
  },
};

resetBtn.addEventListener('click', () => {
  config.mode = '';
  config.answer = -1;
  config.count = 0;
  config.score = 0;
  config.scoreMap = {
    win: 0,
    loss: 0,
  };
  displayMode.textContent = 'არაფერი';
  displayColor.textContent = 'არაფერი';
  displayScore.textContent = 0;
  initDefaultStyles();
  displayAlert('განულდა', 'success', 'თამაში თავიდან დაიწყო');
});
```

ამ კოდით კი თამაშის `reset` წარმატებით მოხდება. `reset` ფუნქციონალის იდეა
მდდგომარეობს იმაში, რომ კონფიგურაცია "განულდეს" და დაუბრუნდეს საწყის მნიშვნელობას,
ასევე ყუთის სტილიზაციებიც უნდა დავუბრუნოთ საწყის მნიშვნელობას.

## თამაშის გაუმჯობესება

ამ თამაშის გაუმჯობესება ბევრნაირად შეიძლება. დავამატოთ შემდგომი ფუნქციონალი, თუ მომახერბელი
არასწორ ადგილას დააკლიკებს, ის ადგილი უფერული გავხადოთ და მასზე დაკლიეკბა აღარ იყოს
შესაძლებელი მანამ სანამ რეჟიმი არ შეიცვლება.

ამისათვის მცირედი მოდიფიკაციების შეტანა მოგვიწევს დაკლიკების ფუნქციაში.

```js
boxes.forEach((box, index) => {
  box.addEventListener('click', () => {
    if (config.mode === '' || config.answer === -1) {
      displayAlert('არასწორი რეჟიმი', 'info', 'პირველ რიგში აირჩიე რეჟიმი');
      return;
    }

    const hasClicked = box.getAttribute('data-clicked');

    if (hasClicked) {
      displayAlert('აირჩიეთ გაფერადებული ყუთი', 'warning', 'აქ უკვე დააკლიკეთ');
      return;
    }

    if (config.count <= index) {
      displayAlert('აირჩიეთ გაფერადებული ყუთი', 'warning');
      return;
    }

    const hasWon = config.answer === index;

    let total = config.score + (hasWon ? config.scoreMap.win : config.scoreMap.loss);

    if (total < 0) {
      total = 0;
    }

    config.score = total;
    displayScore.textContent = config.score;
    box.setAttribute('data-clicked', true);
    box.style.backgroundColor = 'transparent';
    box.style.cursor = 'not-allowed';

    displayAlert(hasWon ? 'მოიგეთ' : 'წააგეთ', hasWon ? 'success' : 'error', `თქვენ ${hasWon ? 'სწორ' : 'არასწორ'} ყუთს დააკლიკეთ`);

    if (hasWon) {
      initGame({
        mode: config.mode,
        boxCount: config.count,
        winScore: config.scoreMap.win,
        lossScore: Math.abs(config.scoreMap.loss),
      });
    }
  });
});

function initGame(buttonAttr) {
  initDefaultStyles();
  initDefaultAttributes();
  // სხვა კოდები
}

// სხვა ფუნქციები

function initDefaultAttributes() {
  boxes.forEach((box) => {
    box.removeAttribute('data-clicked');
  });
}
```

ამ მოდიფიკაციების დამატებით ვღებულობთ, რომ როცა მომხარებელი არასწორ ადგილას დააკლიკებს
იმ ყუთზე მოხდება `'data-clicked'` ატრიბუტის დამატება, რომელსაც შემდგომ გამოვიყენებთ
შემოწმებისთვის, მომხარებელმა დააკლიკა თუ არა უკვე ამ ადგილას. ხოლო როცა თავიდან მოხდება
`initGame` გამოძახება, ასევე გამოვიძახებთ `initDefaultAttributes` ფუნქციას, სადაც მოხდება ყოველი
ყუთიდან `'data-clicked'` ატრიბუტის მოხსნა იმ შემთხვევაში თუ აქვს.

## შეჯამება

თუ ამ სტატიაში დაწერილ თითოეულ მაგალითს გამოიყენებთ და გაერთიანებთ ერთ კოდში მიიღებთ
მოქმედ ფერების თამაშს, რომელიც გამართულად მუშაობს. თუმცა უნდა გაითვალისწინოთ ის ნაწილი, რომ
რადგანაც შემოწმება და მთლიანი მოქმედები კლიენტის მხარეს ხდება, ყველას შეუძლია გახსნას `inspect`
და ელემენტებს დააკვირდეს თუ რა ფერი აქვს, ასევე კონსოლში დალოგოს პირდაპირ `config` ან საერთოდაც
მისი მოდიფიცირება მოახდინოს `config.score = 1000000`, რასაც ხელს ვერ შევუშლით. ამიტომაც არის რომ
ყველაფერი კლიენტის მხარეს არ უნდა მოხდეს, თუმცა ამ ნაწილს ცოტა მოგვიანებით განვიხილავთ სხვა სტატიაში.

კოდი დაწერილია იმ ცოდნით, თუ რა ცოდნასაც მიიღებდით წინა სტატიებიდან, ამიტომაც ამ კოდის გაუმჯობესება
და ოპტიმიზირება რათქმაუნდა შეიძლება.

მცირედი დავალება მომხარებელმა შეიძლება ყოველ არასწორ ყუთს დააკლიკოს და დარჩეს მხოლოდ სწორი ყუთი,
ამიტომაც თუ მსგავსი სიტუაცია მოხდება, რომ ვიზუალზე მხოლოდ სწორი ყუთია დარჩენილი მაშინ მოხდეს
`skip` (გამოტოვება ამჟამინდელი დაკლიკების), რაც პასუხისმგებელი იქნება, რომ თავიდან გამოიძახოს
იგივე რეჟიმი იგივე კონფიგურაციით.

<details>
  <summary>მინიშნება</summary>
  თუ გაგიჭირდათ ამ დავალების შესრულება, მინიშნებისთვის ამ კოდის გამოყენებას გირჩევთ.
  <code>document.querySelectorAll("div.box[data-clicked]").length</code>
</details>

იხილეთ მთლიანი კოდი თავისი დავალებით [playground](./playground/guides/javascript-color-game)-ში.
