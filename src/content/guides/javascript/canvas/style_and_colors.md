---
title: 'სტილიზაციების და ფერების მინიჭება'
description: 'კანვასის ელემენტებზე სტილიზაციების და ფერების მინიჭება JavaScript-ში'
keywords: 'FILL LATER'
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
