---
title: 'სელექტორები'
description: 'HTML ელემენტის ამოღება JavaScript-ში'
keywords: 'selector, unique selector, id, class, tag, attr, select by attr, select by id, select by name, select by class, select by tag, querySelector, querySelectorAll, getElementById, getElementsByTagName, getElementsByClassName, getElementsByName, parentNode, childNodes, children, firstElementChild, lastElementChild, nextElementSibling, previousElementSibling'
---

ხშირ შემთხვევაში ვებგვერდზე სტატიკური კონტენტის გარდა საჭიროა დინამიურადაც გამოვიტანოთ კონტენტი. წარმოვიდგინოთ მაღაზიის ვებგვერდი.
რათქმაუნდა თითოეულ პროდუქტს HTML-ში ხელით არ დავწერთ, უფრო ეფექტური მიდგომა იქნება, რომ ჯერ სერვერიდან წამოვიღოთ ინფორმაცია
იმის შესახებ, თუ რა პროდუქტები არის გამოსატანი ვებგვერდზე და შემდგომ ნაწილ-ნაწილ გამოვიტანოთ ვიზუალზე პროდუქტები.
ამისათვის საჭიროა ჯერ შესაბამისი HTML ელემენტი ამოვიღოთ სელექტორების საშუალებით და შემდგომ
მასში დავარენდეროთ კონტენტი.

## რა არის სელექტორი ?

სელექტორი ეს არის ტექსტი, რომლის მიხედვითაც ბრაუზერი მოგვაწვდის შესაბამის ელემენტს ან ელემენტებს.

სელექტორი შესაძლოა იყოს:

- თეგის სახელი
- კლასი
- იდ
- ატრიბუტები
- ფსევდო კლასებით
- CSS სელექტორი

მაგალითად:

```js
const selector1 = 'button'; // თეგის სახელით
const selector2 = '.button'; // კლასი
const selector3 = '#button'; // იდ
const selector4 = '[data-value]'; // ატრიბუტით
const selector5 = '[data-value="22"]'; // ატრიბუტი სპეციფიკური მნიშვნელობით
const selector6 = 'main > p:first-child'; // პირველი პ ელემენტი მეინში
const selector7 = 'main > p:nth-of-type(3)'; // მესამე პ ელემენტი მეინში
const selector8 = ':not(section)'; // ყოველი ელემენტი გარდა სექციისა
```

შენიშნეთ, რომ ეს იგივე CSS-ის სელექტორებია?

სელექტორები გამოიყენება `document` ობიექტისა და დომის კვანძების სხვადასხვა მეთოდებში,
რომლის მიხედვითაც შესაძლებელია ამოვიღოთ ელემენტები.

## ელემენტების ძებნა

ელემენტების მოსაძებნად გვაქვს ჩაშენებული მეთოდები, რომლებიც მოდის ობიექტიდან.
მოძებნილი ელემენტი ისეთივე DOM-ის კვანძია, როგორც თვითონ `document`, მაშასადამე მასზე მანიპულაცია შეგვიძლია.
განვიხილოთ ელემენტების მოსაძებნად განკუთვნილი მეთოდები.

### querySelector

[`querySelector`](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector) არის მეთოდი, რომელიც გამოიყენება ერთი ელემენტის მოსაძებნად.
ის პარამეტრად იღებს [სელექტორს](#რა_არის_სელექტორი_?) და აბრუნებს პირველივე [ელემენტს](https://developer.mozilla.org/en-US/docs/Web/API/Element),
რომელიც დააკმაყოფილებს სელექტორის პირობას, ხოლო თუ ვერ იპოვა მსგავსი ელემენტი - დააბრუნებს `null`.

მაგალითები:

```js
const p = document.querySelector('p');
const button = document.querySelector('.btn');
const displayResult = document.querySelector('#result');
const highlightedParagraph = document.querySelector('p.highlight');
```

სხვა მეთოდებისგან განსხვავებით `querySelector` შედარებით უფრო მეტი შესაძლებლობა აქვს, რადგან შეიძლება ელემენტი მოვძებნოთ
არა კონკრეტულად თეგის სახელით, კლასით ან აიდით, არამედ თითქმის ნებისმიერი CSS-ის სელექტორის მიხედვით.

### querySelectorAll

[`querySelectorAll`](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll) არის `querySelector`-ის მსგავსი მეთოდი მცირედი განსხვავებით.
`querySelectorAll` აბრუნებს ყოველ იმ ელემენტს, რომელიც დააკმაყოფილებს სელექტორის პირობას. პოვნის შემთხვევაში დააბრუნებს მასივის მსგავს ობიექტს
\- [`NodeList`](https://developer.mozilla.org/en-US/docs/Web/API/NodeList)-ს, რომელზეც შეიძლება მასივის [`forEach`](./doc/guides/javascript/array#forEach) მეთოდის
გამოყენება.

მაგალითები:

```js
const paragraphs = document.querySelector('p');
const actionButtons = document.querySelector('.action');
const elementsWithData = document.querySelector('[data-value]');
```

### getElementById

[getElementById](https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementById) არის მეთოდი, რომელიც გამოიყენება ერთი კონკრეტული ელემენტის ამოსაღებად
[`id`](https://developer.mozilla.org/en-US/docs/Web/API/Element/id)-ის გამოყენებით. არგუმენტად იღებს `id`-ს და დააბრუნებს პირველივე ელემენტს,
რომელიც დააკმაყოფილებს პირობას. ვერ პოვნის შემთხვევაში - დააბრუნებს `null`.
`querySelector`-ისგან განსხვავებით, ის მხოლოდ `id`-ით მიხედვით ეძებს ელემეტნს და არა სელექტორით,
შესაბამისად არ სჭირდება `#` პრეფიქსი.

მაგალითები:

```js
const displayResult = document.getElementById('result');
const counter = document.getElementById('counter');
```

### getElementsByTagName

[getElementsByTagName](https://developer.mozilla.org/en-US/docs/Web/API/Element/getElementsByTagName) არის მეთოდი, რომელიც გამოიყენება რამდენიმე ელემენტის ამოსაღებად
ელემენტის [თეგის](https://developer.mozilla.org/en-US/docs/Web/API/Element/tagName) სახელის გამოყენებით. მეთოდი არგუმენტად იღებს თეგის სახელს და აბრუნებს
იმ ელემენტების `NodeList`-ს, რომლებიც განთავსებულია მიწოდებული თეგით, ვერ პოვნის შემთხვევაში - აბრუნებს `null`-ს.

მაგალითები:

```js
const paragraphs = document.getElementsByTagName('p');
const buttons = document.getElementsByTagName('buttons');
```

`getElementsByTagName`-ზე უფრო მოქნილი ვერსია არის `querySelectorAll`.

### getElementsByClassName

[getElementsByClassName](https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementsByClassName) არის მეთოდი, რომელიც გამოიყენება რამდენიმე ელემენტის
ამოსაღებად კლასის სახელის მიხედვით. მეთოდი არგუმენტად იღებს კლასის სახელს და აბრუნებს იმ ელემენტების `NodeList`-ს, რომლებსაც გააჩნიათ მითითებული კლასი,
ხოლო ვერ პოვნის შემთხვევაში - `null`-ს.

მაგალითები:

```js
const highlightedTexts = document.getElementsByClassName('highlight');
const actionButtons = document.getElementsByClassName('action');
```

`querySelectorAll`-სგან განსხვავებით `getElementsByClassName` არ სჭირდება კლასის პრეფიქსი `.`.

### getElementsByName

[`getElementsByName`](https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementsByName) არის მეთოდი, რომელიც გამოიყენება რამდენიმე ელემენტის ამოსაღებად
ელემენტის `name` ატრიბუტის გამოყენებით. მეთოდი არგუმენტად იღებს `name`-ს და აბრუნებს იმ ელემენტების `NodeList`-ს, რომლებსაც გააჩნიათ მიწოდებული მნიშვნელობის `name` ატრიბუტი.
ვერ პოვნის შემთხვევაში აბრუნებს `null`-ს.

მაგალითები:

```js
// იპოვის ელემენტებს <input name="some-random-radio-inputs">
const radioInputs = document.getElementsByName('some-random-radio-inputs');
```

მსგავსი ტიპის ელემენტები შეიძლება იყოს,
ნებისმიერი HTML ელემენტი, მათ შორის [`<meta>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta), [`<object>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/object) და ისეთი ელემენტებიც კი, რომელსაც რეალურად არ გააჩნია `name` ატრიბუტი (მაგალითად: `<div name="some">` ელემენტის ამოღებაც შეიძლება).

## ერთი კვანძიდან მეორეზე

DOM-ში კვანძების ობიექტები ისე არის აგებული, რომ ნავიგაცია ნებისმიერი ელემენტიდან შეგვიძლია დავიწყოთ და გავიდეთ ნებისმიერ სხვა ელემეტნზე.
ეს ყველაფერი კარგად ორგანიზებული ობიექტებით არის შესაძლებელი. განვიხილოთ რამოდენიმე ძირითადი თვისება, რომელიც დაგეხამრება ნავიგაციაში.

### parentNode

[`parentNode`](https://developer.mozilla.org/en-US/docs/Web/API/Node/parentNode) თვისება გვიბრუნებს ამოღებული ელემენტის მშობელ ელემენტს. თუ ელემენტი ახალი შექმნილია
და ჯერ არცეთ ელემენტზე არ არის დამატებული, მაშინ მისი მშობელი ელემენტი `null` გამოდის.
სხვა შემთხვევაში, დაბრუნებული ელემენტი არის [`Node`](https://developer.mozilla.org/en-US/docs/Web/API/Node) ტიპის.

### childNodes

[`childNodes`](https://developer.mozilla.org/en-US/docs/Web/API/Node/childNodes) თვისება აბრუნებს ყოველ შვილობილ ელემენტს, მათ შორის კომენტარსაც კი. დაბრუნებული მნიშვნელობა
არის [`NodeList`](https://developer.mozilla.org/en-US/docs/Web/API/NodeList) ტიპის.

### children

[`children`](https://developer.mozilla.org/en-US/docs/Web/API/Element/children) თვისება აბრუნებს ყოველ შვილობილ ელემენტს გარდა კომენტარებისა. დაბრუნებული მნიშვნელობა არის
[`HTMLCollection`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCollection) ტიპის.

### firstElementChild

[`firstElementChild`](https://developer.mozilla.org/en-US/docs/Web/API/Element/firstElementChild) თვისება აბრუნებს პირველ შვილობილ ელემენტს, თუ ის არ არსებობს,
დააბრუნებს `null`-ს. დაბრუნებული ელემენტი არის [`Element`](https://developer.mozilla.org/en-US/docs/Web/API/Element) ტიპის.

### lastElementChild

[`lastElementChild`](https://developer.mozilla.org/en-US/docs/Web/API/Node/lastElementChild) თვისება აბრუნებს ბოლო შვილობილ ელემენტს. თუ ის არ არსებობს -
დააბრუნებს `null`-ს. დაბრუნებული ელემენტი არის [`Element`](https://developer.mozilla.org/en-US/docs/Web/API/Element) ტიპის.

### nextElementSibling

[`nextElementSibling`](https://developer.mozilla.org/en-US/docs/Web/API/Element/nextElementSibling) აბრუნებს შემდგომი ელემენტის მნიშვნელობას,
თუ ბოლო ელემენტია, დააბრუნებს `null`-ს. დაბრუნებული ელემენტი არის [`Element`](https://developer.mozilla.org/en-US/docs/Web/API/Element) ტიპის.

### previousElementSibling

[`previousElementSibling`](https://developer.mozilla.org/en-US/docs/Web/API/Element/previousElementSibling) აბრუნებს წინა ელემენტის მნიშვნელობას,
თუ ის თავად არის პირველი ელემენტი, დააბრუნებს `null`. დაბრუნებული ელემენტი არის [`Element`](https://developer.mozilla.org/en-US/docs/Web/API/Element) ტიპის.

განვიხილოთ თითოეული თვისების მაგალითები:

```html
<div id="parent">
  <div id="child1"></div>
  <div id="child2"></div>
  <div id="child3"></div>
</div>
```

```js
const parent = document.querySelector('#parent');
const child = document.querySelector('#child2');
console.log(parent.childNodes); // [ #text, <div id="child1"></div>, #text, <div id="child2"></div>, #text, <div id="child3"></div>, #text ]
console.log(parent.children); // [ <div id="child1"></div>, <div id="child2"></div>, <div id="child3"></div> ]
console.log(parent.firstElementChild); // <div id="child1"></div>
console.log(parent.lastElementChild); // <div id="child3"></div>
console.log(child.parentNode); // <div id="parent">...</div>
console.log(child.parentnextElementSiblingNode); // <div id="child3"></div>
console.log(child.previousElementSibling); // <div id="child1"></div>
```

## შეჯამება

ამ თავში მიმოვიხილეთ სელექტორები და მათი გამოყენების ნიმუშები. ხშირ შემთხვევაში გამოიყენებთ შემდეგ მეთოდებს:
[`querySelector`](#querySelector),
[`querySelectorAll`](#querySelectorAll),
[`getElementById`](#getElementById),
[`getElementsByName`](#getElementsByName).
`querySelector`-ს გამოიყენებთ როცა ერთი ელემენტის ამოღება გსურთ,
`querySelectorAll`-ს გამოიყენებთ მაშინ როცა ბევრი ერთნაირი ელემენტის ამოღება გსურთ,
`getElementById`-ს გამოიყენებთ მაშინ, როცა `id` გაქვთ და პირდაპირ ელემენტის ამოღება გინდათ ზედმეტი პრეფიქსის გარეშე,
ხოლო `getElementsByName`-ს - მაშინ როცა `name` ატრიბუტით გსურთ მიწვდეთ ელემენტებს.
თუ გვსურს ნავიგაცია, შეგვიძლია გამოვიყენოთ კვანძის ელემენტების თვისებები.

იხილეთ სამაგალითო კოდები [playground](./playground/simple/guides/javascript-dom-selectors)-ში.
