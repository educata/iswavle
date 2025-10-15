---
title: 'ტექსტის დახატვა'
description: 'Javascript-ის კანვასში ტექსტების ხატვა'
keywords: 'ტექსტების ხატვა, ტექსტების დაწერა, canvas drawing text, canvas writing text, styling text, ტექსტების დასტილვა'
---

წინა სტატიაში განვიხილეთ, თუ როგორ უნდა მივანიჭოთ [სტილიზაციები და ფერები](./doc/guides/javascript/canvas/style-and-colors)
კანვასის ელემენტებს, ამ სტატიაში კი განვიხილავთ თუ როგორ ჩავწეროთ და დავხატოთ ტექსტი კანვასში.

## ტექსტების დახატვა

კანვასში ტექსტების გამოსატანად ვიყენებთ ორ მეთოდს:

### fillText

[`fillText(text, x, y [, maxWidth])`](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/fillText) მეთოდი
გამოიყენება ტექსტის ჩასაწერად. მეთოდი პარამეტრად ღებულობს 4 მნიშვნელობას:

- `text` - რა ჩაწეროს.
- `x` - რომელი `x` კოორდინატიდან.
- `y` - რომელი `y` კოორდინატიდან.
- `maxWidth` - მაქსიმუმი სიგანე დასახატად (პარამეტრი არ არის სავალდებულო).

```html
<canvas id="textCanvas" width="150" height="150"></canvas>
```

```js
const textCanvas = document.querySelector('#textCanvas');

if (textCanvas.getContext) {
  const ctx = textCanvas.getContext('2d');
  ctx.font = '48px serif';
  ctx.fillText('Iswavle', 22, 22);
}
```

<iframe data-url="guides/javascript-canvas-drawing-text-text" data-title="Fill text მაგალითი" data-height="170"></iframe>

### strokeText

`strokeText` მეთოდი საკმაოდ წააგავს `fillText` მეთოდს. განსხვავება მათ შორის არის გამოტანილ ტექსტში: `fillText` შეავსებს
ტექსტს სტანდარტული სახით ხოლო `strokeText` `stroke` სტილიზაციას მისცემს (ჩარჩოს მაგვარი ტექსტი).

[`strokeText(text, x, y [, maxWidth])`](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/strokeText)
მეთოდი იგივე პარამეტრებს ღებულობს, რასაც `fillText`.

```html
<canvas id="strokeTextCanvas" width="150" height="150"></canvas>
```

```js
const strokeTextCanvas = document.querySelector('#strokeTextCanvas');

if (strokeTextCanvas.getContext) {
  const ctx = strokeTextCanvas.getContext('2d');
  ctx.font = '22px serif';
  ctx.strokeText('EverREST', 22, 44);
}
```

<iframe data-url="guides/javascript-canvas-drawing-text-stroke-text" data-title="Stroke text მაგალითი" data-height="170"></iframe>

## ტექსტების სტილიზაცია

წინა მაგალითებში განვიხილეთ [`font`](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/font)
გასტილვა, რომელიც საშუალებას გვაძლევს გავსტილოთ ტექსტის თვისებები, როგორც CSS-ში. განვიხილოთ სხვა თვისებებიც:

### textAlign

[`textAlign`](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/textAlign) თვისება გამოიყენება
ტექსტის პოზიცირებისთვის. შესაძლო მნიშვნელობები: `start`, `end`, `left`, `right` ან `center`. ნაგულისხმევად აქვს `start`.

### textBaseLine

[`textBaseline`](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/textBaseline) თვისება გამოიყენება
ტექსტის სიმაღლის გასწორებისთვის. შესაძლო მნიშვნელობები: `top`, `hanging`, `middle`, `alphabetic`, `ideographic` და `bottom`.
ნაგულისხმევად აქვს `alphabetic`.

![baseline მაგალითები](/assets/images/canvas-baselines.png)

### direction

[`direction`](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/direction) თვისება გამოიყენება
ტექსტის მიმართულების გაწერისთვის. შესაძლო მნიშვნელობები: `ltr`, `rtl` და `inherit`. ნაგულისხმევად აქვს `inherit`.

```html
<canvas id="basicStylesCanvas" width="150" height="150"></canvas>
```

```js
const basicStylesCanvas = document.querySelector('#basicStylesCanvas');

if (basicStylesCanvas.getContext) {
  const ctx = basicStylesCanvas.getContext('2d');
  ctx.font = '22px serif';
  ctx.strokeStyle = 'steelblue';
  ctx.textAlign = 'center';
  ctx.strokeText('Educata', 100, 44);
}
```

<iframe data-url="guides/javascript-canvas-drawing-text-basic-style" data-title="Basic style მაგალითი" data-height="170"></iframe>

## შეჯამება

ტექსტის გამოტანა არამხოლოდ HTML თეგებში არის შესაძლებელი, არამედ `canvas`-სის ელემენტშიც, სადაც
ანალოგიური CSS თვისებები შეგვიძლია გავუწეროთ.

იხილეთ სტატიის სამაგალითო კოდები [playground](./playground/simple/guides/javascript-canvas-drawing-text)-ში.
