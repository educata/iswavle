---
title: 'სურათების გამოყენება'
description: 'Javascript-ის კანვასში სურათების გამოყენება'
keywords: 'სურათების გამოყენება კანვასში, ვიდეოების გამოყენება კანვასში, გიფის გამოყენება კანვასში, using images in canvas, using gifs in canvas, using videos in canvas'
---

წინა სტატიებში შევისწავლეთ თუ როგორ უნდა დავხატოთ [ფიგურები](./doc/guides/javascript/canvas/drawing-figures)
და [ტექსტები](./doc/guides/javascript/canvas/drawign-text) კანვასში. ამ სტატიაში კი განვიხილავთ თუ როგორ გამოვიყენოთ
კანვასში სურათები. სურათები შეიძლება გამოვიყენოთ: დინამიური პოზიცირებისთვის, უკანა ფონისთვის და სხვა დანიშნულებისთვის.

სურათის ტიპს რომელსაც გამოვიყენებთ აუცილებლად ბრაუზერს უნდა ჰქონდეს მისი მხარდაჭერა, რომ კანვასში ჩავტვირთოთ. მსგავსი
ტიპის ფორმატებია: PNG, GIF, JPG და JPEG.

კანვასში სურათების გამოყენებისთვის ორი პროცესია შესასრულებელი:

- რომელიმე ელემენტიდან უნდა ამოვიღოთ სურათის ობიექტი (`img` თეგიდან, სხვა კანვასიდან ან ვიდეოდან).
  ასევე შესაძლებელია უბრალოდ სურათის მისამართის მიწოდებაც.
- დახატოთ სურათი `drawImage` მეთოდის გამოყენებით.

## სურათის მიღება დასახატად

კანვასის API გამოყენებისთვის შემდგომი ტიპები შესაძლებელია გამოვიყენოთ, როგორც სურათის წყარო:

- [`HTMLImageElement`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement) სურათები რომლებიც შექმნილია
  `Image` კონსტრუქტორით ან `<img>` ელემენტი.
- [`SVGImageElement`](https://developer.mozilla.org/en-US/docs/Web/API/SVGImageElement) SVG სურათები, რომლებიც ჩაშენებულია
  `<image>` ელემენტით.
- [`HTMLVideoElement`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLVideoElement) `<video>` ელემენტიდან შეგვიძლია
  ამოვჭრათ ამჟამინდელი კადრი (frame), რომელიც შეგვიძლია სურათად გამოვიყენოთ.
- [`HTMLCanvasElement`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement) სხვა `<canvas>` ელემენტი შეგვიძლია
  გამოვიყენოთ, როგორც სურათის წყაროდ.
- [`VideoFrame`](https://developer.mozilla.org/en-US/docs/Web/API/VideoFrame) ერთი ნებისმიერი კადრი (frame) ვიდეოდან, რომელიც
  შეგვიძლია სურათად გამოვიყენოთ.

## სურათების ამოღება

წინა სტატიებში განვიხილეთ თუ როგორ შეიძლება [ელემენტების ამოღება DOM გამოყენებით](./doc/guides/javascript/dom/selectors).
სტატიაში განხილული მეთოდების გარდა კიდევ შეგვიძლია ერთი თვისება გამოვიყენოთ
[`document.images`](https://developer.mozilla.org/en-US/docs/Web/API/Document/images), რაც დააბრუნებს სურათების მასივს.

## სურათის შექმნა

სურათის შესაქმნელად შეგვიძლია `Image` კონსტრუქტორი გამოვიყენოთ.

```js
const img = new Image();
img.src = 'https://iswavle.com/assets/images/js.png';
```

```js
const img = new Image();
img.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAADFSURBVDhP7ZMtDoQwEIVfVxAUgiB6B2pQaJAcAc29egASbCUHgBOAwmCqikGR/WkmId2wS7JrVuxnpnnTvMxPhl3v4AsuFD/mxw3WdcU8z/Y9TZONz5wOMc9zBEEAYwzatiV157SFMAyRpim2bSPF5dSAc46+71GWJSkubw2UUhiGAU3TYBxHUl1eGnRdh6Io4HkeqqoCY4wyLocGUkrbsxACy7KgrmtkWUZZl8MtPEqPoghaa8RxbFeZJAl836cfO/9bAG4DokeTflf1sgAAAABJRU5ErkJggg==';
```

## სურათის დახატვა

როცა სურათის ობიექტი გვექნება ამოღებული, მის შემდგომ სურათის დახტვა შესაძლებელია `drawImage` მეთოდით.

[`drawImage(image, x, y)`](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage) მეთოდი
პარამეტრად ღებულობს 3 მნიშვნელობას:

- `image` - სურათის ობიექტს
- `x` - X კორდინატი თუ საიდან დაიწყოს სურათი
- `y` - Y კორდინატი თუ საიდან დაიწყოს სურათი

### დიაგრამის მაგალითი

მოდით დავხატოთ დიაგრამა სხვადასხვა ხაზებით და უკანა ფონზე გამოვიყენოთ სურათი.

```html
<canvas id="graphExample" width="180" height="150"></canvas>
```

```js
const graphExampleCanvas = document.querySelector('#graphExample');

if (graphExampleCanvas.getContext) {
  const ctx = graphExampleCanvas.getContext('2d');
  const img = new Image();
  img.src = 'https://iswavle.com/assets/images/canvas-graph-bg.png';
  img.onload = () => {
    ctx.drawImage(img, 0, 0);
    ctx.beginPath();
    ctx.moveTo(30, 96);
    ctx.lineTo(70, 66);
    ctx.lineTo(103, 76);
    ctx.lineTo(170, 15);
    ctx.stroke();
  };
}
```

`drawImage` მეთოდს ასევე შესაძლებელია გადავცეთ `width` და `height`, რის მიხედვითაც
განისაზღვრება სურათის რეზოლუცია.

## შეჯამება

ამ თავში განვიხილეთ თუ როგორ არის შესაძლებელი `canvas`-ის ელემენტში დავამატოთ
სურათი.

იხილეთ სტატიის სამაგალითო კოდები [playground](./playground/guides/javascript-canvas-drawing-images)-ში.
