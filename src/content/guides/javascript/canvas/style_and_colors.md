---
title: 'სტილიზაციების და ფერების მინიჭება'
description: 'კანვასის ელემენტებზე სტილიზაციების და ფერების მინიჭება JavaScript-ში'
keywords: 'ხაზების ხატვა, სტილიზაციების მინიჭება ხაზებზე, ტირეს გამოტანა, ხაზების შეერთება'
---

წინა სტატიაში განვიხილეთ ფიგურების ხატვა მხოლოდ ნაგულისხმევი ხაზებით და ფერებით. ამ სტატიაში
განვიხილავთ კანვასის სტილიზაციის ოპციებს. შეისწავლით თუ როგორ მიანიჭოთ სხვადასხვა ფერები,
ხაზის სტილები, გრადიენტები, პატერნები და ჩრდილები.

გაითვალისწინეთ კანვასი სქრინ რიდერებისთვის, არ არის ხელმისაწვდომი. თუ კანვას იყენებთ, როგორც
დეკორაციული სახით მაშინ დაუმატეთ ატრიბუტი `role="presentation"` სხვა შემთხვევაში უმჯობესია
გაუწეროთ [`aria-label`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-label)
კონტენტის აღსაწერად.

## ფერები

ფერების მისანიჭებლად გამოიყენება ორი ძირითადი თვისება:

[`fillStyle`](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/fillStyle) თვისებას
მიენიჭება ფერი, რომელიც შეავსებებს მიღებულ ფიგურას კონკრეტული მინიჭებული ფერით.

[`strokeStyle`](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/strokeStyle) თვისებას
მიენიჭება ფერი, რომელიც გამოიყენება ფიგურის მოხაზულობის ფერის მისანიჭებლად.

გადაცემული ფერი შესაძლებელია წარმოვადგინოთ იგივე სახით, როგორი სახითაც
[ფერებს](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value) სტილავთ CSS-ში. ნაგულისხმევია თუ ფერის
თვისებას არ შევცვლით, რომ იყოს შავი ფერი (`#000000`), რომელიც წარმოდგენილია `hex` მნიშვნელობის სახით.

გაითვალისწინეთ `fillStyle` და `strokeStyle` გამოყენების შემდგომ, იმავე კანვასში რა ფიგურასაც ან ელემენტს დაამატებთ,
გაიზიარებს იგივე ფერს, ამიტომაც თუ დაგჭირდებათ ფერის შეცვლა თავიდან უნდა შეცვალოთ.

```js
ctx.fillStyle = 'steelblue';
ctx.fillStyle = '#4682b4';
ctx.fillStyle = 'rgb(70, 130, 180)';
```

### `fillStyle` მაგალითი

პრაქტიკაში ვიხილოთ `fillStyle` გამოყენება:

```html
<canvas id="fillStyleExample" width="150" height="150"></canvas>
```

```js
const fillStyleCanvas = document.querySelector('#fillStyleExample');

if (fillStyleCanvas.getContext) {
  const ctx = fillStyleCanvas.getContext('2d');
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 6; j++) {
      ctx.fillStyle = `rgb(${Math.floor(255 - 42.5 * i)} ${Math.floor(255 - 42.5 * j)} 0)`;
      ctx.fillRect(j * 25, i * 25, 25, 25);
    }
  }
}
```

ამ მაგალითში ვიყენებთ ორ ციკლს, რომ დავხატოთ გრიდი მართკთხედების, ყოველ მართკუთხედს ექნება განსხვავებული ფერი.
ორ ციკლს ვიყენებთ `i` და `j` ცვლადებისთვის, რომ დავაგენერიროთ ყოველ ჯერზე უნიკალური RGB ფერი ყოველი
კვადრატისთვის, რასაც ვცლით არის მხოლოდ წითელი და მწვანე ფერები, ლურჯი ამჯერად სტატიკური მნიშვნელობა არის.

### `strokeStyle` მაგალითი

პრაქტიკასი ვიხილოთ `strokeStyle` გამოყენება:

```html
<canvas id="strokeStyleExample" width="150" height="150"></canvas>
```

```js
const strokeStyleCanvas = document.querySelector('#strokeStyleExample');

if (strokeStyleCanvas.getContext) {
  const ctx = strokeStyleCanvas.getContext('2d');
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 6; j++) {
      ctx.strokeStyle = `rgb(0 ${Math.floor(255 - 42.5 * i)} ${Math.floor(255 - 42.5 * j)})`;
      ctx.beginPath();
      ctx.arc(12.5 + j * 25, 12.5 + i * 25, 10, 0, 2 * Math.PI, true);
      ctx.stroke();
    }
  }
}
```

მაგალითი მსგავსია, რაც `fillStyle`-ზე გვაქვს შესრულებული. განსხვავება მდგომარეობს, რომ მართკუთხედის ნაცვლად
წრეს ვაგებთ, `arc` მეთოდს გამოყენებით. ხოლო `strokeStyle` გამოყენებით წრის ჩარჩოებს ვაფერადებთ.

## გამჭვირვალობა

ფერების მინიჭების დროს შესაძლებელია გავითვალისწინოთ ფერის გამჭვირვალობაც. ეს შესაძლებელია მივიღოთ, როდესაც ფერს ვანიჭებთ
(ფერი იყოს გამჭვირვალე, როგორიცა: RGBA, HEXA და სხვა მსგავსი გამჭვირვალე ფერები) ან გამოვიყენოთ `globalAplha` თვისება.

### globalAlpha

[`globalAlpha`](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/globalAlpha) თვისება გამოიყენება
გამჭვირვალობისთვის, რომელიც ღებულობს მნიშვნელობას `0`-დან (სრულიად გამჭვირვალე) `1`-მდე (სრულიად გაუმჭვირვალე).
ნაგულისხმევად თვისების მნიშვნელობა არის `1`. როდესაც ამ თვისებას მივანიჭებთ კანვას, მის შემდგომ ყოველი ფიგურა მიიღებს
იგივე გამჭვირვალობისთვის მნიშვნელობას.

## ხაზის სტილები

ბევრი მიდგომა არის იმისათვის, რომ ხაზები დავსტილოთ:

- [`lineWidth`](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineWidth) თვისება განსაზღვრავს
  ფიგურის სიგანეს.
- [`lineCap`](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineCap) თვისება განსაზღვრავს
  ხაზის დაბოლოების ვიზუალს.
- [`lineJoin`](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineJoin) თვისება განსაზღვრავს
  ვიზუალურ ნაწილს, როცა ხაზები ერთიანდება.
- [`miterLimit`](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/miterLimit) თვისება
  ადგენს ლიმიტს მიტრაზე, როდესაც ორი ხაზი უერთდება ერთმანეთს მკვეთრი კუთხით, რათა გააკონტროლოთ
  რამდენად სქელი იქნება შეერთება.
- [`getLineDash()`](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/getLineDash) მეთოდი აბრუნებს
  ამჟამინდელი ხაზის ტირეს ნიმუშების მასივს.
- [`setLineDash(segments)`](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/setLineDash) მეთოდი
  აყენებს მიმდინარე ხაზის ტირე შაბლონს.
- [`lineDashOffset`](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineDashOffset) თვისება
  განსაზღვრავს თუ საიდან უნდა დაიწყოს ტირე მასივი.

დავიწყოთ თითოეული თვისების და მეთოდის განხილვა:

### `lineWidth` მაგალითი

თვისება განსაზღვრავს თუ რამდენი უნდა იყოს ფიგურის სისქე. მნიშვნელობა უნდა იყოს დადებითი რიცხვი. ნაგულისხმევად სისქის
მნიშვნელობა არის `1.0`.

მაგალითისთვის განვიხილოთ 10 ხაზი, რომელიც ნელნელა გაიზრდება სისქეში:

```html
<canvas id="widthExample" width="150" height="150"></canvas>
```

```js
const widthCanvas = document.querySelector('#widthExample');

if (widthCanvas.getContext) {
  const ctx = widthCanvas.getContext('2d');
  for (let i = 0; i < 10; i++) {
    ctx.lineWidth = 1 + i;
    ctx.beginPath();
    ctx.moveTo(5 + i * 14, 5);
    ctx.lineTo(5 + i * 14, 140);
    ctx.stroke();
  }
}
```

### `lineCap` მაგალითი

`lineCap` თვისება განსაზღვრავს, თუ როგორ არის შედგენილი თითოეული ხაზის ბოლო წერტილები. თვისებამ შეიძლება მიიღოს
3 შესაძლო მნიშვნელობა: `butt`, `round` და `square`. ნაგულისხმევი მნიშვნელობა არის `butt`.

- `butt` - ბოლო წერტილებში ხაზების ბოლოები კვადრატულია.
- `round` - ხაზების ბოლოები მომრგვალებულია.
- `square` - ხაზების ბოლოები კვადრატულია.

```html
<canvas id="lineCapExample" width="150" height="150"></canvas>
```

```js
const lineCapCanvas = document.querySelector('#lineCapExample');

if (lineCapCanvas.getContext) {
  const ctx = lineCapCanvas.getContext('2d');
  ctx.strokeStyle = '#09f';
  ctx.beginPath();
  ctx.moveTo(10, 10);
  ctx.lineTo(140, 10);
  ctx.moveTo(10, 140);
  ctx.lineTo(140, 140);
  ctx.stroke();
  ctx.strokeStyle = 'black';
  ['butt', 'round', 'square'].forEach((lineCap, i) => {
    ctx.lineWidth = 15;
    ctx.lineCap = lineCap;
    ctx.beginPath();
    ctx.moveTo(25 + i * 50, 10);
    ctx.lineTo(25 + i * 50, 140);
    ctx.stroke();
  });
}
```

ამ მაგალითში სამივე თვისების მნიშვნელობა გამოვიყენეთ, კოდის გაშვების შემდგომ შეამჩნევთ ვიზუალურ
განსხვავებებსაც. წინასწარ დამატებული არის დასაწყისში და დასასრულში ლურჯი ხაზები, რაც დაგეხმარებათ
განსხვავების აღთქმაში.

### `lineJoin` მაგალითი

`lineJoin` თვისება განსაზღვრავს, თუ როგორ კავშირდდება ორი სეგმენტი (ხაზები, რკალი ან მრუდი).
თვისებამ შეიძლება მიიღოს სამი მნიშვნელობა: `round`, `bevel` და `miter`. ნაგულისხმევი მნიშვნელობა არის
`miter`. გაითვალისწინეთ `lineJoin`-ს არ გააჩნია არანაირი ეფექტი თუ ორივე სეგმენტის მიმართულება
არის ერთნაირი, რადგან გაერთიანების წერტილი არ ექნებათ.

- `round` - წარმოქმნის მომრგვალებულ კუთხეს ხაზების შეერთების ადგილზე.
- `bevel` - ქმნის ბრტყელ, დახრილ კუთხეს ხაზების შეერთების ადგილზე.
- `miter` - წარმოქმნის მკვეთრ კუთხეს, სადაც ხაზების გარე კიდეები ხვდება ერთმანეთს. თუ `miter` სიგრძე
  (დაშორება გადაკვეთის წერტილიდან კუთხემდე) აჭარბებს გარკვეულ ზღვარს (`miterLimit`),
  შეერთება იჭრება ზედმეტად გრძელი და მკვეთრი კუთხეების თავიდან ასაცილებლად.

```html
<canvas id="lineJoinExample" width="150" height="150"></canvas>
```

```js
const lineJoinCanvas = document.querySelector('#lineJoinExample');

if (lineJoinCanvas.getContext) {
  const ctx = lineJoinCanvas.getContext('2d');
  ctx.lineWidth = 10;
  ['round', 'bevel', 'miter'].forEach((lineJoin, index) => {
    ctx.lineJoin = lineJoin;
    ctx.beginPath();
    ctx.moveTo(-5, 5 + index * 40);
    ctx.lineTo(35, 45 + index * 40);
    ctx.lineTo(75, 5 + index * 40);
    ctx.lineTo(115, 45 + index * 40);
    ctx.lineTo(155, 5 + index * 40);
    ctx.stroke();
  });
}
```

## შეჯამება

ამ სტატიაში განვიხილეთ თუ როგორ შეიძლება სტილიზაციების და ფერების მინიჭება ხაზებზე და ფიგურებზე.
რეალურად კანვას უფრო მეტი ჩაშენებული სტილიზაციებიც გააჩნია, როგორებიცა:

- [CanvasGradient](https://developer.mozilla.org/en-US/docs/Web/API/CanvasGradient)
- [Patterns](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/createPattern)

იხილეთ სტატიის სამაგალითო კოდები [playground](./playground/guides/javascript-canvas-style-and-colors)-ში.
