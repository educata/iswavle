---
title: 'ფიგურების დახატვა'
description: 'Javascript-ის კანვასში ფიგურების ხატვა'
keywords: 'კანვასში ფიგურების ხატვა, draw figures in canvas, fillRect, strokeRect, clearRect, მარკუთხედის დახტვა კანვასში, მარკუთხედის დახტვა, beginPath, path მეთოდები, path methods, closePath, stroke, fill, moveTo, SVG path გამოყენება'
---

წინა სტატიაში განვიხილეთ, თუ როგორ არის კანვასის გარემო მოწყობილი და
როგორ არის შესაძლებელი ბრაუზერის მხარდაჭერის შემოწმება. ამ სტატიის ბოლოს
კი შეძლებთ მართკუთხედების, სამკუთხედების, ხაზების, რკალების და სხვადასხვა
ობიექტების დახატვას.

## გრიდი

სანამ დავიწყებთ დახატვას, მანამდე უნდა გვესმოდეს კანვასის გრიდები (ბადე) ან საკოორდინაციო სიბრტყე.
როცა HTML-ში ვწერთ `<canvas>`-ის ელემენტს, საჭიროა ზომების მითითება - ან პირდაპირ HTML-ში,
ატრიბუტების საშუალებით, ან CSS-დან ზომების გასწორება.

გრიდი გამოიყურება შემდეგნაირად:

![კანვასის გრიდის მაგალითი](/assets/images/canvas-grid.png)

ჩვეულებრივ, ერთი ერთეული გრიდში წარმოადგენს ერთ პიქსელს. გრიდი იწყება _ზედა მარცხენა_
კუთხიდან, მისი კოორდინატია (0, 0). ყოველი ელემენტი, რომელიც მოთავსდება გრიდის შიგნით, ამ ამოსავალ წერტილთან
მიმართებაში მიიღებს კოორდინანტებს (x, y).
რაც უფრო _მარჯვნივ_ არის ერთეული, მით უფრო მეტი იქნება მისი x კოორდინანტი
და რაც უფრო _ქვემოთ_ არის ერთეული, მით უფრო მეტი იქნება მისი y კოორდინანტი.

## მართკუთხედების ხატვა

[`SVG`](https://developer.mozilla.org/en-US/docs/Glossary/SVG)-სგან განსხვავებით
[`<canvas>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/canvas)-ს მხოლოდ ორი პრიმიტიული
ფიგურის დახატვა შეუძლია: მართკთხედი და paths (ხაზებით დაკავშირებული წერტილები). ყოველი სხვა
ფიგურა უნდა შეიქმნას ერთი ან რამდენიმე paths-ის გაერთიანებით. ჩვენდა საბედნიეროდ გვაქვს დახატვისთვის სხვადასხვა
მეთოდები, რომლებიც გაგვიმარტივებს რთული ფიგურების ხატვას. მართკუთხედის დასახატად გვაქვს 3 მეთოდი.

### fillRect

[`fillRect(x, y, width, height)`](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/fillRect)
მეთოდი დახატავს შევსებულ მართკუთხედს.

### strokeRect

[`strokeRect(x, y, width, height)`](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/strokeRect)
მეთოდი დახატავს მართკუთხა მონახაზს.

### clearRect

[`clearRect`](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/clearRect)
მეთოდი გაასუფთავებს მართკუთხა არეალს (სრულიად გამჭვირვალე არეალად აქცევს).

სამივე მეთოდი ღებულობს ერთნაირ პარამეტრებს. `x` და `y` განსაზღვრავს პოზიციას, რომელიც იწყება კანვასის ზედა მარცხენა
კუთხიდან. `width` და `height` განსაზღვრავს მართკუთხედის ზომებს.

### მართკუთხა ფორმის მაგალითი

```html
<canvas id="rectangularExample" width="150" height="150"></canvas>
```

```js
const rectangularCanvas = document.querySelector('#rectangularExample');

if (rectangularCanvas.getContext) {
  const ctx = rectangularCanvas.getContext('2d');
  ctx.fillRect(25, 25, 100, 100);
  ctx.clearRect(45, 45, 60, 60);
  ctx.strokeRect(50, 50, 50, 50);
} else {
  console.log('ბრაუზერს არ აქვს კანვასის მხარდაჭერა');
}
```

<iframe data-url="guides/javascript-canvas-drawing-figures-rectangular" data-title="მართკუთხა ფორმის მაგალითი" data-height="170"></iframe>

`fillRect` მეთოდი დახატავს დიდ შავ კვადრატს 100 პიქსელის ზომის ოთხივე გვერდით. `clearRect` მეთოდი ამოჭრის
`60x60` პიქსელის კვადრატს ცენტრიდან და შემდეგ `strokeRect` მეთოდი შექმნის
`50x50` ზომის მართკუთხა მონახაზს.

შემდეგ სტატიაში განვიხიალვთ: [სტილიზაციებსა და ფერების მინიჭებას](./doc/guides/javascript/canvas/style-and-colors)
კანვასის ელემენტებზე.

## paths ხატვა

Path არის წერტილების სია, რომელიც დაკავშირებულია ერთმანეთთან ხაზებით. მათი დახმარებით შეგვიძლია შევქმნათ არის სხვადასხვა ფორმის ფიგურები,
მოხრილი ან სწორი ფორმებით, განსხვავებული სიგანითა და ფერებით. path ან subpath შეიძლება შეიკრას, რომ მივიღოთ ფიგურა
path-ების გამოყენებით. ამისათვის საჭიროა ცოტა მეტი მოქმედების შესრულება.

- შექვმნათ path.
- შემდეგ გამოვიყენოთ [ხატვის მეთოდები](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D#paths) და დავხატოთ path.
- როცა path შეიქმნება, შეგიძლიათ შეავსოთ ან დაშტრიხოთ path რენდერისთვის.

განვიხილოთ მეთოდები, რომლებიც დაგეხმარებათ ამ მოქმედებების შესასრულებლად.

### beginPath

[`beginPath`](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/beginPath) მეთოდი გამოიყენება
ახალი path-ის შესაქმნელად. როცა path შეიქმნება მასზე შეგვიძლია სხვადასხვა მეთოდების გამოყენება.

### path მეთოდები

სხვადასხვა path დაყენების [მეთოდები](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D#paths) ობიექტებისთვის.

### closePath

[`closePath`](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/closePath) მეთოდები ამატებს სწორ ხაზს path, რომელიც
დაიწყება მიმიდნარე path-დან subpath-ის დასაწყისამდე.

### stroke

[`stroke`](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/stroke) მეთოდი ხატავს ფორმას მისი ჩარჩოს შესვებით.

### fill

[`fill`](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/fill) მეთოდი ხატავს შევსებულ ფიგურას.

პირველი ნაბიჯი path-ის შესაქმნელად არის `beginPath`-ს მეთოდის გამოყენება. path საკუთარ თავში ინახავს sub-paths, რომელიც შემდეგ
შეკრავს ფორმას. მეორე ნაბიჯი არის მეთოდის გამოძახება, რომელიც რეალურად დახატავს path-ებს. სურვილისამებრ, შეგიძლიათ მესამე ნაბიჯის გამოყენება,
რომ დაუძახოთ `closePath` მეთოდს. ეს მეთოდი შეეცდება შეკრას path-ები. თუ ფიგურა უკვე შეკრულია ეს მეთოდი არაფერს არ გააკეთებს.

## სამკუთხედის დახატვა

პრაქტიკისთვის, მოდით, დავხატოთ ისეთი ფიგურა, რომელიც მოითხოვს [Path-ის მეთოდების](#path_მეთოდები) გამოყენებას.

```html
<canvas id="triangleExample" width="150" height="150"></canvas>
```

```js
const triangleCanvas = document.querySelector('#triangleExample');

if (triangleCanvas.getContext) {
  const ctx = triangleCanvas.getContext('2d');
  ctx.beginPath();
  ctx.moveTo(75, 50);
  ctx.lineTo(100, 75);
  ctx.lineTo(100, 25);
  ctx.fill();
} else {
  console.log('ბრაუზერს არ აქვს კანვასის მხარდაჭერა');
}
```

<iframe data-url="guides/javascript-canvas-drawing-figures-triangle" data-title="სამკუთხედის დახატვის მაგალითი" data-height="170"></iframe>

## კალმის გადაადგილება

ერთ-ერთი სასარგებლო ფუნქცია, რომელიც საერთოდ არაფერს არ ხატავს მაგრამ ხშირად გამოიყენება, არის `moveTo` მეთოდი. ეს მეთოდი შეგიძლიათ
წარმოიდგინოთ, როგორც კალმის გადაადგილების ნაწილი, რომ ხატვის/წერის დროს, ნებისმიერ ადგილას გადავიტანოთ ხატვა/წერა.

### moveTo

[`moveTo(x, y)`](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/moveTo) მეთოდი გამოიყენება იმისათივს, რომ გადავაადგილოთ
წერის კოორდინატები `x` და `y`-ის კოორდინანტების მიხედვით.

როცა კანვასის ინციალიზებას ვიწყებთ, ან `beginPath` მეთოდს ვიძახებთ, კოორდინატები იწყება (0, 0)-დან. თუ გვსურს სხვა ადგილას გადავიტანოთ
დახატვის/წერის პროცესი, საჭიროა `moveTo` მეთოდის გამოყენება.

```html
<canvas id="moveToExample" width="150" height="150"></canvas>
```

```js
const moveToCanvas = document.querySelector('#moveToExample');

if (moveToCanvas.getContext) {
  const ctx = moveToCanvas.getContext('2d');
  ctx.beginPath();
  ctx.arc(75, 75, 50, 0, Math.PI * 2, true);
  ctx.moveTo(110, 75);
  ctx.arc(75, 75, 35, 0, Math.PI, false);
  ctx.moveTo(65, 65);
  ctx.arc(60, 65, 5, 0, Math.PI * 2, true);
  ctx.moveTo(95, 65);
  ctx.arc(90, 65, 5, 0, Math.PI * 2, true);
  ctx.stroke();
} else {
  console.log('ბრაუზერს არ აქვს კანვასის მხარდაჭერა');
}
```

<iframe data-url="guides/javascript-canvas-drawing-figures-move-to" data-title="კალმის გადაადგილების მაგალითი" data-height="170"></iframe>

თუ გაინტერესებთ, დამაკავშირებელი ხაზები შეგიძლიათ წაშალოთ `moveTo` მეთოდების გამოყენებით. [`arc`](#arc) მეთოდს განვიხილავთ ცოტა ხანში.

## ხაზები

[`lineTo(x, y)`](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineTo) მეთოდი გამოიყენება სწორი ხაზის გასავლებად,
`x` კოორდინატიდან `y` კოორდინატამდე.

მაგალითისთვის დავხატოთ ორი სამკუთხედი, ერთი შევსებული ფერით.

```html
<canvas id="twoTriangleExample" width="150" height="150"></canvas>
```

```js
const twoTriangleCanvas = document.querySelector('#twoTriangleExample');

if (twoTriangleCanvas.getContext) {
  const ctx = twoTriangleCanvas.getContext('2d');
  ctx.beginPath();
  ctx.moveTo(25, 25);
  ctx.lineTo(105, 25);
  ctx.lineTo(25, 105);
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(125, 125);
  ctx.lineTo(125, 45);
  ctx.lineTo(45, 125);
  ctx.closePath();
  ctx.stroke();
} else {
  console.log('ბრაუზერს არ აქვს კანვასის მხარდაჭერა');
}
```

<iframe data-url="guides/javascript-canvas-drawing-figures-two-triangle" data-title="ორი სამკუთხედის მაგალითი" data-height="170"></iframe>

მაგალითს ვიწყებთ `beginPath` მეთოდის გამოყენებით, რის მიხედვითაც ვქმნით ახალი ფიგურის path-ს. როცა ვიყენებთ `moveTo` მეთოდს,
ვცვლით იმ კოორდინატებს, საიდანც ფიგურის დახატვა დაიწყება.

## რკალი

რკალის ან წრის დასახატად ვიყენებთ `arc` და `arcTo` მეთოდებს.

[`arc(x, y, radius, startAngle, endAngle, counterclockwise)`](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/arc)
მეთოდი დახატავს რკალს, რომლის ცენტრიც იქნება (`x`, `y`) კოორდინატები, რკალი შემოიხაზება `radius`-ს დისტანციაზე, სადაც გვაქვს განსაზღვრული
თუ საიდან დაიწყოს შემოხაზვა (`startAngle`) და სად დამთავრდეს (`endAngle`). აქვე შეგვიძლია ისიც ვთქვათ, თუ როგორი მიმართულებით დაიწყოს
მოხაზვა, ნაგულისხმევია საათის ისრის მიმართულებით.

[`arcTo(x1, y1, x2, y2, radius)`](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/arcTo) მეთოდი დახატავს რკლას მიღებული
კოორდინატებითა და რადიუსით.

განვიხილოთ დეტალუარდ `arc` მეთოდი, რომელიც ღებულობს 6 პარამეტრს: `x` და `y` არის წრის ცენტრის კოორდინატები, სადაც რკალი უნდა იყოს დახატული.
`radius` არის წრის რადიუსი (რადიუსი — ეწოდება მონაკვეთს, რომელიც წრეწირის ცენტრს აერთებს წრეწირის ნებისმიერ წერტილთან). `startAngle` და `endAngle`
პარამეტრები აღწერს დასაწყის და საბოლო წერტილს რკალისთვის. `counterclockwise` პარამეტრი არის ბულიანის ტიპის, ნაგულისხმევი არის `false`, რაც გულისხმობს
საათის ისრის მიმართულებით დახატვას, თუმცა თუ `true`-ს გადავცემთ, მის საპირისპირო მიმართულებით დახატვას დაიწყებს.

გაითვალისწინეთ `arc` მეთოდისთვის `startAngle` და `endAngle` პარამეტრები ღებულობს რადიანს. გრადუსის რადიანებში კონვერტაციებისთვის საჭიროა შემდეგი ფორმულის
გამოყენება:

```js
let radians = (Math.PI / 180) * degrees;
```

დავხატოთ 12 განსხვავებული რკალი და წრე:

```html
<canvas id="arcsCanvas" width="150" height="200"></canvas>
```

```js
const arcsCanvas = document.querySelector('#arcsCanvas');

if (arcsCanvas.getContext) {
  const ctx = arcsCanvas.getContext('2d');
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 3; j++) {
      ctx.beginPath();

      const x = 25 + j * 50; // x კოორდინატი
      const y = 25 + i * 50; // y კოორდინატი
      const radius = 20; // რკალის რადიუსი
      const startAngle = 0; // დასაწყისი წერტილი წრის
      const endAngle = Math.PI + (Math.PI * j) / 2; // დასასრული წერტილი წრის
      const counterclockwise = i % 2 !== 0; // საათის ისრის მიმართულებით დახატვა ან პირიქით

      ctx.arc(x, y, radius, startAngle, endAngle, counterclockwise);

      if (i > 1) {
        ctx.fill();
      } else {
        ctx.stroke();
      }
    }
  }
} else {
  console.log('ბრაუზერს არ აქვს კანვასის მხარდაჭერა');
}
```

<iframe data-url="guides/javascript-canvas-drawing-figures-arcs" data-title="რკალის მაგალითი" data-height="210"></iframe>

განვიხილოთ მაგალითი: ორი ციკლი შექმნის სვეტს და სტრიქონს რკალისთვის. თითოეული რკალისთვის ვქმნით ახალ საწყის path-ს, `beginPath` მეთოდის
გამოყენებით. ამავე მაგალითში პარამეტრები არის დინამიურად დაგენერირებული, თუმცა არ არის რეალურად საჭირო მათი ასე დაგენერირება. `x` და `y`
კორიდნატი, როგორც მანამდე ვახსენეთ, განსაზღვრავს წრის ცენტრის კოორდინატებს. `radius` და `startAngle` ფიქსირებული ზომებით გვაქვს დაწერილი, ხოლო
`endAngle` იწყებს 180 გრადუსიდან (ნახევარი წრიდან) და აგრძელებს დინამიურად გაზრდას, რაც უფრო მეტი იტერაცია არის შესრულებული. `counterclockwise`
რიგრიგობით იცვლება `true`-დან `false`-ზე, იმის მიხედვით, `i` ცვლადი ლუწია თუ არა.

## ბეზიერი და კვადრატული მრუდეები

path-ების შემდეგი ტიპი არის [Bézier curve](https://developer.mozilla.org/en-US/docs/Glossary/Bezier_curve), რომელიც გვხვდება კუბურ და კვადრატულ ვარიაციებში.
ორივე ვარიაცია გამოიყენება კომპლექსური ფიგურების დასახატად.

[`quadraticCurveTo(cp1x, cp1y, x, y)`](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/quadraticCurveTo) მეთოდი ხაზავს კვადრატული
ბეზიერის მრუდს, მიმდინარე კალმის პოზიციიდან დაწყებული, `x` და `y`-ით მითითებულ წერტილამდე, სადაც გამოიყენება საკონტროლო
წერტილი `cp1x` და `cp1y` (`cp`, როგორც **control point**).

[`bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y)`](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/bezierCurveTo) მეთოდი ხაზავს კუბური
ბეზიერის მრუდს, მიმდინარე კალმის პოზიციიდან დაწყებული `x` და `y`-ით მითითებულ წერტილამდე, სადაც გამოიყენება 2 საკონტროლო წერტილი (`cp1x`, `cp1y`) და
(`cp2x`, `cp2y`).

განსხვავება კვადრატულსა და კუბურ ბეზიერ მრუდებს შორის არის ის, თუ რამდენი წერტილი გამოიყენება მრუდის ასაგებად. ორივე მრუდი იწყება კალმის ამჟამინდელი პოზიციიდან
და მთავრდება მითითებულ `x` და `y` წერტილზე. ხაზის გამრუდებას განსაზღვრავს საკონტროლო წერტილების რაოდენობა და მდებარეობა. კვადრატულს გააჩნია 1 საკონტროლო წერტილი ხოლო
კუბურს 2.

![ბეზიერის მაგალითები](/assets/images/canvas-curves.png)

`x` და `y` პარამეტერები ორივე მეთოდში მიუთითებს ხაზის დასასრულს. `cp1x` და `cp1y` არის პირველი საკონტროლო წერტილი, ხოლო `cp2x` და `cp2y` არის მეორე
საკონტროლი წერტილი.

კვადრატული და კუბური ბეზიერის მრუდის გამოყენება თავდაპირველად რთულია. ფრონტის მხარეს რთული არის მრუდის აგება რადგან ვიზუალურად ვერ ვამჩნევთ თუ რას ვაგებთ,
სანამ კოდის ნაწილს არ გავარჩევთ. არ შეგეშინდეთ! გარკვეული დროისა და მოთმინების შემდეგ, შევძლებთ სხვადასხვა კომპლექსური ფიგურების აგებას.

კვადრატული ბეზიერის მაგალითი:

```html
<canvas id="quadraticCurveCanvas" width="150" height="150"></canvas>
```

```js
const quadraticCurveCanvas = document.querySelector('#quadraticCurveCanvas');
if (quadraticCurveCanvas.getContext) {
  const ctx = quadraticCurveCanvas.getContext('2d');
  ctx.beginPath();
  ctx.moveTo(75, 25);
  ctx.quadraticCurveTo(25, 25, 25, 62.5);
  ctx.quadraticCurveTo(25, 100, 50, 100);
  ctx.quadraticCurveTo(50, 120, 30, 125);
  ctx.quadraticCurveTo(60, 120, 65, 100);
  ctx.quadraticCurveTo(125, 100, 125, 62.5);
  ctx.quadraticCurveTo(125, 25, 75, 25);
  ctx.stroke();
} else {
  console.log('ბრაუზერს არ აქვს კანვასის მხარდაჭერა');
}
```

<iframe data-url="guides/javascript-canvas-drawing-figures-quadratic-curve" data-title="კვადრატული ბეზიერის მაგალითი" data-height="170"></iframe>

კუბური ბეზიერის მაგალითი:

```html
<canvas id="bezierCurveCanvas" width="150" height="150"></canvas>
```

```js
const bezierCurveCanvas = document.querySelector('#bezierCurveCanvas');
if (bezierCurveCanvas.getContext) {
  const ctx = bezierCurveCanvas.getContext('2d');
  ctx.beginPath();
  ctx.moveTo(75, 40);
  ctx.bezierCurveTo(75, 37, 70, 25, 50, 25);
  ctx.bezierCurveTo(20, 25, 20, 62.5, 20, 62.5);
  ctx.bezierCurveTo(20, 80, 40, 102, 75, 120);
  ctx.bezierCurveTo(110, 102, 130, 80, 130, 62.5);
  ctx.bezierCurveTo(130, 62.5, 130, 25, 100, 25);
  ctx.bezierCurveTo(85, 25, 75, 37, 75, 40);
  ctx.fill();
} else {
  console.log('ბრაუზერს არ აქვს კანვასის მხარდაჭერა');
}
```

<iframe data-url="guides/javascript-canvas-drawing-figures-bazier-curve" data-title="კუბური ბეზიერის მაგალითი" data-height="170"></iframe>

## მართკუთხედები

[სამი მეთოდის](#მართკუთხედების_ხატვა) გარდა, რომელიც სტატიის დასაწყისში აღვწერეთ, ასევე არსებობს მეთოდი `rect`, რომელიც მართკუთხედს უმატებს ამჟამინდელ path-ს.

[`rect(x, y, width, height)`](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/rect) მეთოდი მართკუთხედის დახატვას იწყებს
_ზედა მარცხენა_ კუთხიდან, კონკრეტულად `x` და `y` კოორდინატიდან, `width` და `height` ზომებით.

<!-- რას ნიშნავს რომ წინასწარ ეშვება რექტ მეთოდამდე? -->

`rect` მეთოდის გაშვებამდე წინასწარ ავტომატურად ეშვება `moveTo` მეთოდი, `x` და `y` პარამეტრით, რომელიც კალმის პოზიციას
აყენებს `x` და `y` კოორდინატზე.

## კომბინაციების გაკეთება

უკვე ბევრი მეთოდი და მაგალითი განვიხილეთ ფიგურების ასაგებად. არანაირი შეზღუდვა არ გვაქვს, თუ რამდენ path-ს გამოვიყენებთ ფიგურის შესაქმნელად.
კომბინირებული მაგალითისთვის, დავხატოთ ერთი ცნობილი ძველი თამაშის პერსონაჟები.

```html
<canvas id="gameCanvas" width="150" height="150"></canvas>
```

```js
const gameCanvas = document.querySelector('#gameCanvas');
if (gameCanvas.getContext) {
  const ctx = gameCanvas.getContext('2d');

  roundedRect(ctx, 12, 12, 150, 150, 15);
  roundedRect(ctx, 19, 19, 150, 150, 9);
  roundedRect(ctx, 53, 53, 49, 33, 10);
  roundedRect(ctx, 53, 119, 49, 16, 6);
  roundedRect(ctx, 135, 53, 49, 33, 10);
  roundedRect(ctx, 135, 119, 25, 49, 10);

  ctx.beginPath();
  ctx.arc(37, 37, 13, Math.PI / 7, -Math.PI / 7, false);
  ctx.lineTo(31, 37);
  ctx.fill();

  for (let i = 0; i < 8; i++) {
    ctx.fillRect(51 + i * 16, 35, 4, 4);
  }

  for (let i = 0; i < 6; i++) {
    ctx.fillRect(115, 51 + i * 16, 4, 4);
  }

  for (let i = 0; i < 8; i++) {
    ctx.fillRect(51 + i * 16, 99, 4, 4);
  }

  ctx.beginPath();
  ctx.moveTo(83, 116);
  ctx.lineTo(83, 102);
  ctx.bezierCurveTo(83, 94, 89, 88, 97, 88);
  ctx.bezierCurveTo(105, 88, 111, 94, 111, 102);
  ctx.lineTo(111, 116);
  ctx.lineTo(106.333, 111.333);
  ctx.lineTo(101.666, 116);
  ctx.lineTo(97, 111.333);
  ctx.lineTo(92.333, 116);
  ctx.lineTo(87.666, 111.333);
  ctx.lineTo(83, 116);
  ctx.fill();

  ctx.fillStyle = 'white';
  ctx.beginPath();
  ctx.moveTo(91, 96);
  ctx.bezierCurveTo(88, 96, 87, 99, 87, 101);
  ctx.bezierCurveTo(87, 103, 88, 106, 91, 106);
  ctx.bezierCurveTo(94, 106, 95, 103, 95, 101);
  ctx.bezierCurveTo(95, 99, 94, 96, 91, 96);
  ctx.moveTo(103, 96);
  ctx.bezierCurveTo(100, 96, 99, 99, 99, 101);
  ctx.bezierCurveTo(99, 103, 100, 106, 103, 106);
  ctx.bezierCurveTo(106, 106, 107, 103, 107, 101);
  ctx.bezierCurveTo(107, 99, 106, 96, 103, 96);
  ctx.fill();

  ctx.fillStyle = 'black';
  ctx.beginPath();
  ctx.arc(101, 102, 2, 0, Math.PI * 2, true);
  ctx.fill();

  ctx.beginPath();
  ctx.arc(89, 102, 2, 0, Math.PI * 2, true);
  ctx.fill();
} else {
  console.log('ბრაუზერს არ აქვს კანვასის მხარდაჭერა');
}

function roundedRect(ctx, x, y, width, height, radius) {
  ctx.beginPath();
  ctx.moveTo(x, y + radius);
  ctx.arcTo(x, y + height, x + radius, y + height, radius);
  ctx.arcTo(x + width, y + height, x + width, y + height - radius, radius);
  ctx.arcTo(x + width, y, x + width - radius, y, radius);
  ctx.arcTo(x, y, x, y + radius, radius);
  ctx.stroke();
}
```

<iframe data-url="guides/javascript-canvas-drawing-figures-game" data-title="Pac man თამაშის მაგალითი" data-height="170"></iframe>

მაგალითში განხილულია [Pac-Man](https://en.wikipedia.org/wiki/Pac-Man) თამაშის პერსონაჟები. ძირითადად ყოველი მეთოდი ცალ-ცალკე ამავე სტატიაში უკვე არის აღწერილი, მაგრამ
მაგალითში არის ერთი მეთოდი, რომელიც ჯერ არ გვიხსენებია, ეს არის `fillStyle` მეთოდი. `fillStyle` მეთოდი აღწერილი იქნება
[სტილიზაციებისა და ფერების მინიჭების](./doc/guides/javascript/canvas/style-and-colors) სტატიაში. ამავე მაგალითში შევქმენით ფუნქცია `roundedRect`, მსგავსი ტიპის ფუნქციები
გვიზოგავს დროს და ხაზებს, რომ იგივე კოდი არ გავიმეოროთ.

## Path2D ობიექტები

როგორც წინა მაგალითებში განვიხილეთ, შესაძლებელია გვქონდეს ბევრი path სპეციფიკური ფიგურის მისაღებად. რომ გავამარტივოთ კოდის წერის პროცესი და მივიღოთ
უფრო ოპტიმიზირებული კოდი, შეგვიძლია გამოვიყენოთ [`Path2D`](https://developer.mozilla.org/en-US/docs/Web/API/Path2D) ობიექტი. ეს არის ობიექტი, რომელიც
აკეთებს ახალ ჩანაწერს ან იყენებს ქეშირებას დახატვის მეთოდებისთვის, რაც საშუალებას გაძლევს ისევ თავიდან დავხატოთ ფიგურა.

[`Path2D`](https://developer.mozilla.org/en-US/docs/Web/API/Path2D/Path2D) [კონსტრუქტორი](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/constructor) აბრუნებს `Path2D` ობიექტის ახალ ინსტანციას, რომელსაც სურვილისამებრ შესაძლებელია ახალი path გადავცეთ არგუმენტად ან [SVG path](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths).

```js
new Path2D(); // ცარიელი path ობიექტი
new Path2D(path); // დავაკოპიროთ path სხვა Path2D ობიექტიდან
new Path2D(d); // path SVG-დან
```

ყოველი მეთოდი რაც მანამდე განვიხილეთ (`moveTo`, `arc`, `rect` და სხვა) შესაძლოა გამოვიყენოთ ასევე `Path2D` ობიექტზეც.

`Path2D` ასევე საშუალებას გვაძლევს path დავუმატოთ `addPath` მეთოდის გამოყენებით. მეთოდი გამოსადეგია მაშნ როცა გვსურს ობიექტისგან რამოდენიმე კომპონენტის აწყობა.

[`Path2D.addPath(path [, transform])`](https://developer.mozilla.org/en-US/docs/Web/API/Path2D/addPath) მეთოდი ამატებს ახალ path-ს, რომელსაც შესაძლოა სურვილისამებრ
მატრიცის ტრანსფორმაცია გავაყოლოთ პარამეტრად.

მაგალითისთვის დავხატოთ მართკუთხედი და წრე.

```html
<canvas id="path2Canvas" width="150" height="150"></canvas>
```

```js
const path2Canavs = document.querySelector('#path2Canvas');
if (path2Canavs.getContext) {
  const ctx = path2Canavs.getContext('2d');

  const rectangle = new Path2D();
  rectangle.rect(10, 10, 50, 50);

  const circle = new Path2D();
  circle.arc(100, 35, 25, 0, 2 * Math.PI);

  ctx.stroke(rectangle);
  ctx.fill(circle);
} else {
  console.log('ბრაუზერს არ აქვს კანვასის მხარდაჭერა');
}
```

<iframe data-url="guides/javascript-canvas-drawing-figures-path2" data-title="Path2D მაგალითი" data-height="170"></iframe>

### SVG path გამოყენება

როგორც ვახსენეთ, `Path2D`-ს გამოყენების დროს შეიძლება გამოიყენოთ SVG path, როცა გვსურს `<canvas>`-ში SVG-ს გამოტანა, რომელსაც
სამომავლოდ მრავალჯერადად გამოიყენებთ.

```js
const path = new Path2D('M10 10 h 80 v 80 h -80 Z');
```

მაგალითში path დააიწყებს გადაადგილებას (`M10 10`) წერტილიდან, ესეიგი (`10`, `10`) კოორდინატიდან, შემდეგ გაავლებს `80` ერთეულის ჰორიზონტალურად ხაზს მარჯვნივ,
შემდეგ `80` ერთეულით გაავლებს ვერტიკალურ ხაზს ქვემოთ, შემდეგ `80` ერთეულით გაავლებს ჰორიზონტალურ ხაზს მარცხნივ და `Z`-ით გაავლებს ამჟამინდელი წერტილიდან
დასაწყისამდე ხაზს (`Z` გამოიყენება path დასახურად).

იხილეთ ნიმუშები [playground](./playground/simple/guides/javascript-canvas-drawing-figures)-ში.
