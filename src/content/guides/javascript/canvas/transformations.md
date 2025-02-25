---
title: 'ტრანსფორმაციები'
description: 'ტრანსოფრმაციის თვისებებთან მუშაობა JavaScript-ში'
keywords: 'კანვასის სთეითთან მუშაობა, canvas state, restore state, save state, კანვასში სთეითის შენახვა, კანვასში სტეითის აღდგენა'
---

წინა სტატიებში განვიხილეთ თუ როგორ არის შესაძლებელი [კანვასის გრიდის](./doc/guides/javascript/canvas/drawing-figures)
გამოყენება კორდინირებისთვის, ამ სტატიაში კი განვიხილავთ თუ როგორ შეიძლება სხვადსახვა ტრანსფორმაციის თვისებების
გამოყენება კანვასის ელემენტებზე.

## სთეითის (მდგომარეობის) შენახვა და აღდგენა

სანამ ტრანსფორმაციის მეთოდების განხილვას დავიწყებდეთ, მანამდე უმჯობესია განვიხილოთ სთეითის ორი მეთოდი,
რომელიც დაგვეხმარება კომპლექსური ფიგურების ხატვაში.

- [save](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/save) მეთოდი შეინახავს მთლიან სთეითს.
- [restore](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/restore) მეთოდი აღადგენს ბოლო შენახულ სთეითს.

სთეითის მნიშვნელობები ინახება სტეკში. ყოველ ჯერზე `save` მეთოდის გამოძახებით, სტეკში ახალი ჩანახატის სთეითი ჩაიწერება, რომელიც
შესაძლებელია შეიცავდეს შემდეგ თვისებებს:

- ტრანსფორმაციის თვისებები ([`translate`](#translate), [`rotate`](#rotate), [`scale`](#scale) და სხვა).
- [strokeStyle](./doc/guides/javascript/canvas/style-and-colors#strokeStyle_მაგალითი)
- [fillStyle](./doc/guides/javascript/canvas/style-and-colors#fillStyle_მაგალითი)
- [globalAlpha](./doc/guides/javascript/canvas/style-and-colors#globalAlpha)
- [lineWidth](./doc/guides/javascript/canvas/style-and-colors#lineWidth_მაგალითი)
- [lineCap](./doc/guides/javascript/canvas/style-and-colors#lineCap_მაგალითი)
- [lineJoin](./doc/guides/javascript/canvas/style-and-colors#lineJoin_მაგალითი)
- [miterLimit](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/miterLimit)
- [lineDashOffset](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineDashOffset)
- [shadowOffsetX](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/shadowOffsetX)
- [shadowOffsetY](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/shadowOffsetY)
- [shadowBlur](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/shadowBlur)
- [shadowColor](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/shadowColor)
- [globalCompositeOperation](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/globalCompositeOperation)
- [font](./doc/guides/javascript/canvas/drawing-text#ტექსტების_დახატვა)
- [textAlign](./doc/guides/javascript/canvas/drawing-text#textAlign)
- [textBaseline](./doc/guides/javascript/canvas/drawing-text#textBaseLine)
- [direction](./doc/guides/javascript/canvas/drawing-text#direction)
- [imageSmoothingEnabled](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/imageSmoothingEnabled)

`save` მეთოდი შეგიძლიათ გამოიძახოთ იმდენჯერ, რამდენჯერაც გაგიხარდებათ. `restore` მეთოდი რიგრიგობით აღადგენს
ბოლო შენახულ სთეითებს.

### `save` და `restore` მაგალითები

```html
<canvas id="stateCanvas" width="150" height="150"></canvas>
```

```js
const stateCanvas = document.querySelector('#stateCanvas');
if (stateCanvas.getContext) {
  const ctx = stateCanvas.getContext('2d');
  ctx.fillRect(0, 0, 150, 150); // დავხატოთ შავი მართკუთხედი ნაგულისხმევი თვისებებით
  ctx.save(); // შევინახოთ სთეითი

  ctx.fillStyle = '#09F'; // შევუცვალოთ ფერი
  ctx.fillRect(15, 15, 120, 120); // დავხატოთ ლურჯი მართკუთხედი ახალი თვისებებით
  ctx.save(); // შევინახოთ ამჟამინდელი სთეითი

  ctx.fillStyle = '#FFF'; // შევუცვალოთ ფერი
  ctx.globalAlpha = 0.5;
  ctx.fillRect(30, 30, 90, 90); // დავხატოთ თეთრი ფერის მართკუთხედი ახალი თვისებებით

  ctx.restore(); // აღვადგინოთ ბოლო სთეითი
  ctx.fillRect(45, 45, 60, 60); // დავხატოთ მართკუთხედი ლურჯი თვსიებებით

  ctx.restore(); // აღვადგინოთ ბოლოს წინა სთეითი
  ctx.fillRect(60, 60, 30, 30); // დავხატოთ შავი ფერის მართკუთხედი შავი თვისებებით
}
```

<iframe data-url="guides/javascript-canvas-transformations-state" data-title="State მაგალითი" data-height="170"></iframe>

განვიხილოთ მოცემული კოდი: პირველ რიგში დავხატეთ შავი მართკთხედი, რომელმაც სრულიად შეავსო
კანვასი. შემდგომ შევინახეთ მისი სთეითი, ამჟამად მას აქვს ნაგულისხმევი თვისებები, ამიტომაც სთეითში
შევინახეთ შავი ფერი. შემდგომ შევუცავლეთ ფერი ლურჯზე, დავხატეთ ახალი მართკუთხედი და შევინახეთ
ახალი სთეითი. ახლა ჩვენ სთეითში გვაქვს ლურჯი ფერი, ხოლო მის წინა სთეითში შავი ფერი. შემდგომ დავხატეთ
თეთრი ფერის მართკთხედი. მის შემდგომ აღვადგინეთ სთეითი, რამაც დაგვიბრუნა ლურჯი ფერი და მისი გამოყენებით
დავხატეთ ლურჯი მართკუთხედი. ბოლოსთვის კი ისევ აღვადიგნეთ სთეითი, სადაც დავიბრუნეთ შავი ფერი და მისი
გამოყენებით დავხატეთ შავი მართკუთხედი.

მაგალითიდან გამომდინარე ვამჩნევთ, თუ როგორ მარტივად შევინახეთ ფერის თვისება და გამოვიყენეთ მრავალჯერადად.
ახლა წარმოიდგინეთ ფერის გარდა სხვა თვისებების აღდგენაც თუ დაგვჭირდა რამდენი კოდის სტრიქონს დავზოგავთ.

## Translating

პირველი თვისება, რომელსაც ტრანსფორმაციის მეთოდებში განვიხილავთ, იქნება `translate`. მეთოდი გამოიყენება იმისათვის,
რომ კანვასში ელემენტის საწყისი ადგილი განვსაზღვროთ თუ საიდან მოხდება მოქმედებები.

### translate

[`translate(x, y)`](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/translate) მეთოდი
ღბულობს ორ პარამეტრს: `x` და `y` კოორდინატებს. ამ კოორდინატების მიხედვით შეგვიძლია განვსაზღვროთ თუ საიდან დაიწყება
ელემენტის მოქმედებები.

![translate გამოყენება კანვასის გრიდში](./assets/images/canvas-grid-translate.png)

პრაქტიკაში მიღებულია სთეითის შენახვა ტრანსფორმაციის მეთოდების გამოყენებამდე. ხშირ შემთხვევაში მარტივია `restore`
მეთოდის დაძახება ვიდრე მთელი სთეითის რევერსულად უკან დაბრუნება.

`translate`-ს მაგალითი:

```html
<canvas id="translateCanvas" width="150" height="150"></canvas>
```

```js
const translateCanvas = document.querySelector('#translateCanvas');
if (translateCanvas.getContext) {
  const ctx = translateCanvas.getContext('2d');
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      ctx.save();
      ctx.fillStyle = `rgb(${51 * i}, ${255 - 51 * i}, 255)`;
      ctx.translate(10 + j * 50, 10 + i * 50);
      ctx.fillRect(0, 0, 25, 25);
      ctx.restore();
    }
  }
}
```

<iframe data-url="guides/javascript-canvas-transformations-translate" data-title="Translate მაგალითი" data-height="170"></iframe>

ამ მაგალითშია ნაჩვენებია თუ როგორი გამოსადეგია `translate` მეთოდი. ამ მეთოდი გარეშე ყოველი მართკუთხედი დახატული
იქნება ერთ ადგილას (0, 0) კოორდინატზე. მეთოდის გამოყენებით მოვახერხეთ მართკუთხედების დახატვა სხვადასხვა პოზიციაზე.
ორ ციკლს ვიყენებთ ცხრა მართკუთხედის დასახატად, სადაც თითოეულ მართკუთხედს ექნება განსხვავებული ფერი და იქნება
განსხვავებულ პოზიაციაზე მოთავსებული.

## Rotating

მეორე ტრანსფორმაციის მეთოდს რასაც განვიხილავთ არის `rotate`. მეთოდი გამოიყენება კანვასის საწყისი წერტილის შესაცვლელად
გრადუსის გამოყენებით.

### rotate

[`rotate(angle)`](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/rotate) მეთოდი იწყებს
ბრუნვას კანვასის საწყისი წერტილიდან გადაცემული გრადუსის მიხედვით, რაც საბოლოო ჯამში შეცვლის საწყის წერტილს (საიდანაც
უნდა დაიწყოს ხატვა). პარამეტრი არის გრადუსი, რომელიც უნდა იყოს რადიანით ჩაწერილი.

მეთოდი ბრუნვას იწყებს საათის ისრის მიმართულებით თუ გვსურს საპირისპირო მიმართულებით ბრუნვა მაშინ საჭიროა გრადუსის
მინუსებში გადაცემა.

![rotate გამოყენება კანვასში](./assets/images/canvas-grid-rotate.png)

რადიანის მისაღებად საჭიროა შემდგომი ფორმულის გამოყენება: `radians = (Math.PI / 180) * degree`.

`rotate`-ს მაგალითი:

```html
<canvas id="rotateCanvas" width="300" height="200"></canvas>
```

```js
const rotateCanvas = document.querySelector('#rotateCanvas');
if (rotateCanvas.getContext) {
  const ctx = rotateCanvas.getContext('2d');
  // მარცხენა მართკუთხედი, რომელიც ბრუნვას იწყებს კანვასის დასაწყისიდან
  ctx.save();
  // ლურჯი მართკუთხედი
  ctx.fillStyle = '#0095DD';
  ctx.fillRect(30, 30, 100, 100);
  ctx.rotate((Math.PI / 180) * 25);
  // ნაცრისფერი მართკთხედი
  ctx.fillStyle = '#4D4E53';
  ctx.fillRect(30, 30, 100, 100);
  ctx.restore();

  // მარჯვენა მართკუთხედი, რომელიც ბრუნვას იწყებს მართკუთხედის ცენტრიდან
  // დავხატოთ ლურჯი მართკუთხედი
  ctx.fillStyle = '#0095DD';
  ctx.fillRect(150, 30, 100, 100);

  ctx.translate(200, 80); // გადავიტანოთ მარკუთხედი ცენტრში
  // x = x + 0.5 * სიგანე
  // y = y + 0.5 * სიმაღლე
  ctx.rotate((Math.PI / 180) * 25); // ვაბრუნოთ
  ctx.translate(-200, -80); // უკან გადავიტანოთ

  // დავხატოთ ნაცრისფერი მართკუთხედი
  ctx.fillStyle = '#4D4E53';
  ctx.fillRect(150, 30, 100, 100);
}
```

<iframe data-url="guides/javascript-canvas-transformations-rotate" data-title="Rotate მაგალითი" data-height="220"></iframe>

არსებული მაგალითიდან მივიღებთ ოთხ მარკუთხედს სადაც ორი იქნება ლურჯი ფერის (უკანა მართკუთხედები)
და 2 ნაცრისფერი, რომლებიც იქნება ლურჯზე ზემოდან გამოსული.

## Scaling

შემდგომი ტრანსფორმის მეთოდი არის `scale`. მეთოდის გამოყენებით შესაძლებელია ელემენტის ზომების
გაზრდა ან შემცირება.

### scale

[`scale(x, y)`](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/scale) მეთოდი
პარამეტრად ღებულობს ორ რიცხვს, რომელიც გაზრდის ან შეამცირებს ელემენტის ზომებს. პარამეტრები შესაძლებელია გადავცეთ
ათწილადი რიცხვების სახით, სადაც `1.0` არის `100%`. ამრიგად თუ გადავცემთ `1.5` იგულისხმება `150%`-ით არსებული
ზომის გაზრდა, ხოლო `0.5` იგულისხმება, როგორც არსებული ზომის `50%`-ით შემცირება. გადაცემული მნიშვნელობა რიგრიგობით
ღებულობს `x` და `y` ზომებს.

უარყოფითი რიცხვების გამოყენებით შესაძლებელია შეასრულოთ ღერძის სარკისებურად შებრუნება.

მაგალითისთვის: `scale(1, -1)` დეკარტოს კოორდინატთა სისტემაში შეასრულებს სარკისებურ შებრუნებას.

```html
<canvas id="scaleCanvas" width="300" height="150"></canvas>
```

```js
const scaleCanvas = document.querySelector('#scaleCanvas');

if (scaleCanvas.getContext) {
  const ctx = scaleCanvas.getContext('2d');
  ctx.save();
  ctx.scale(10, 3);
  ctx.fillRect(1, 10, 10, 10);
  ctx.restore();

  // ჰორიზონტალურად შებრუნება
  ctx.scale(-1, 1);
  ctx.font = '48px serif';
  ctx.fillText('ISWAVLE', -210, 120);
}
```

<iframe data-url="guides/javascript-canvas-transformations-scale" data-title="Scale მაგალითი" data-height="170"></iframe>

## შეჯამება

ამ თავში განვიხილეთ თუ როგორი ტრანსფორმაციის თვისებები გააჩნია კანვას, რეალურად თითოეული თვისება
მსგავსია CSS-ის `transform`-ის თვისებებისა.

იხილეთ სტატიის სამაგალითო კოდები [playground](./playground/simple/guides/javascript-canvas-transformations)-ში.
