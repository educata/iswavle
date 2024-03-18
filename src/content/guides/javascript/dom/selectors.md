---
title: 'სელექტორები'
description: 'HTML ელემენტის ამოღება JavaScript-ში'
keywords: 'selector, unique selector, id, class, tag, attr, select by attr, select by id, select by name, select by class, select by tag, querySelector, querySelectorAll, getElementById, getElementsByTagName, getElementsByClassName, getElementsByName, parentNode, childNodes, children, firstElementChild, lastElementChild, nextElementSibling, previousElementSibling'
---

ხშირ შემთხვევაში ვებგვერდზე სტატიკური კონტენტის გარდა საჭიროა დინამიურადაც გამოვიტანოთ კონტენტი. წარმოვიდგინოთ მაღაზიის ვებგვერდი
რათქმაუნდა თითოეულ პროდუქტს HTML-ში ხელით არ დავწერთ, უფრო ეფექტური მიდგომა იქნებოდა ჯერ სერვერიდან წამოვიღოთ ინფორმაცია
იმის შესახებ თუ რა პროდუქტები არის გამოსატანი ვებგვერდზე და შემდგომ ნაწილ-ნაწილ გამოვიტანოთ ვიზუალზე პროდუქტები. ვიზუალურად
HTML-ს მხარეს რომ გამოვიტანოთ პროდუქტი ამისათვის საჭიროა ჯერ შესაბამისი HTML ელემენტი ამოვიღოთ სელექტორების საშუალებით და შემდგომ
მასში დავარენდეროთ კონტენტი.

## რა არის სელექტორი ?

სელექტორი ეს არის ტექსტი, რომლის მიხედვითაც უნდა ამოვიღოთ შესაბამისი ელემენტი ან ელემენტები. სელექტორი შესაძლოა იყოს:

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

სელექტორები გამოიყენება სხვადასხვა მეთოდებში, რის მიხედვითაც შესაძლებელია ამოვიღოთ ელემენტები.

## ელემენტების ძებნა

ელემენტების მოსაძებნად გვაქვს ჩაშენებული მეთოდები, რომლებიც მოდის [`document`](https://developer.mozilla.org/en-US/docs/Web/API/Document) ობიექტიდან.
განვიხილოთ ელემენტების მოსაძებნად განკუთვნილი მეთოდები.

### querySelector

[`querySelector`](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector) არის მეთოდი, რომელიც გამოიყენება ერთი ელემენტების მოსაძებნად.
პარამეტრად ღებულობს [სელექტორს](#რა_არის_სელექტორი_?) და დააბრუნებს პირველივე [ელემენტს](https://developer.mozilla.org/en-US/docs/Web/API/Element),
რომელიც დააკმაყოფილებს სელექტორის პირობას, ხოლო თუ ვერ იპოვა მსგავსი ელემენტი დააბრუნებს `null`.

მაგალითები:

```js
const p = document.querySelector('p');
const button = document.querySelector('.btn');
const displayResult = document.querySelector('#result');
const highlightedParagraph = document.querySelector('p.highlight');
```

სხვა მეთოდებისგან განსხვავებით `querySelector` შედარებით უფრო მეტი შესაძლებლობები აქვს, რადგან შეიძლება არა კონკრეტულად თეგის სახელით, კლასით ან აიდით,
არამედ ბევრნაირად ამოვიღოთ.

### querySelectorAll

[`querySelectorAll`](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll) არის `querySelector`-ის მსგავსი მეთოდი მცირედი განსხვავებით.
`querySelectorAll` აბრუნებს ყოველ იმ ელემენტს, რომელიც დააკმაყოფილებს სელექტორის პირობას. პოვნის შემთხვევაში დააბრუნებს მასივის მსგავს ობიექტს
[`NodeList`](https://developer.mozilla.org/en-US/docs/Web/API/NodeList), რომელზეც შეიძლება მასივის [`forEach`](./doc/guides/javascript/array#forEach) მეთოდის
გამოყენება.

მაგალითები:

```js
const paragraphs = document.querySelector('p');
const actionButtons = document.querySelector('.action');
const elementsWithData = document.querySelector('[data-value]');
```

### getElementById

[getElementById](https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementById) არის მეთოდი, რომელიც გამოიყენება ერთი კონკრეტული ელემენტის ამოსაღებად
[`id`](https://developer.mozilla.org/en-US/docs/Web/API/Element/id) გამოყენებით. პარამეტრად ღებულობს `id` და დააბრუნებს პირველივე ელემენტს,
რომელიც დააკმაყოფილებს პირობას, ვერ პოვნის შემთხვევაში დააბრუნებს `null`. `querySelector`-ს მსგავსია უბრალოდ შეზღუდულია სელექტორში, მხოლოდ `id`-ით პოვნა არის
შესაძლებელი.

მაგალითები:

```js
const displayResult = document.getElementById('result');
const counter = document.getElementById('counter');
```

`querySelector`-სგან განსხვავებით `getElementById` არ სჭირდება `#` პრეფიქსი.

### getElementsByTagName

[getElementsByTagName](https://developer.mozilla.org/en-US/docs/Web/API/Element/getElementsByTagName) არის მეთოდი, რომელიც გამოიყენება რამდენიმე ელემენტის ამოსაღებად
ელემენტის [თეგის](https://developer.mozilla.org/en-US/docs/Web/API/Element/tagName) სახელის გამოყენებით. მეთოდი პარამეტრად ღებულობს თეგის სახელს და აბრუნებს
`NodeList` იმ ელემენტების, თუ რომელმაც დააკმაყოფილა სელექტორის პირობა, ვერ პოვნის შემთხვევაში აბრუნებს `null`.

მაგალითები:

```js
const paragraphs = document.getElementsByTagName('p');
const buttons = document.getElementsByTagName('buttons');
```

`getElementsByTagName`-ზე შედარებით უფრო მოქნილი ვერსია არის `querySelectorAll`, სურვილისამებრ შეგვიძლია მათი გამოყენება.

### getElementsByClassName

[getElementsByClassName](https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementsByClassName) არის მეთოდი, რომელიც გამოიყენება რამდენიმე ელემენტის
ამოსაღებად კლასის სახელის გამოყენებით. მეთოდი პარამეტრად ღებულობს კლასის სახელს და აბრუნებს `NodeList` იმ ელემენტების, თუ რომელმაც დააკმაყოფილა სელექტორის პირობა,
ვერ პოვნის შემთხვევაში აბრუნებს `null`.

მაგალითები:

```js
const highlightedTexts = document.getElementsByClassName('highlight');
const actionButtons = document.getElementsByClassName('action');
```

`querySelectorAll`-სგან განსხვავებით `getElementsByClassName` არ სჭირდება კლასის პრეფიქსი `.`.

### getElementsByName

[`getElementsByName`](https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementsByName) არის მეთოდი, რომელიც გამოიყენება რამდენიმე ელემენტის ამოსაღებად
ელემენტის `name` ატრიბუტის გამოყენებით. მეთოდი პარამეტრად ღებულობს `name` და დააბრუნებს `NodeList` იმ ელემენტების, თუ რომელმაც დააკმაყოფილა სელექტორის პირობა,
ვერ პოვნის შემთხვევაში აბრუნებს `null`.

მაგალითები:

```js
const radioInputs = document.getElementsByName('some-random-radio-inputs');
```

დაბრუნებული `NodeList` შეიცავს ყოველ ელემენტს, რომელიც გადმოცემული `name` პარამეტრის მიხედვით გადიოდა სელექტორის პირობას, მსგავსი ტიპის ელემენტები შეიძლება იყოს,
ნებისმიერი HTML ელემენტი მათშორის [`<meta>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta), [`<object>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/object) და ისეთი ელემენტებიც კი, რომელსაც რეალურად არ გააჩნია `name` ატრიბუტი (მაგალითად: `<div name="some">` ამოღებაც შეიძლება).

## კვანძის ელემენტები

DOM-ში კვანძების ობიექტები ისე არის აგებული, რომ ნავიგაცია ნებისმიერი ელემენტიდან შეგვიძლია დავიწყოთ და გავიდეთ ნებისმიერ ელემეტნზე. ეს ყველაფერი კარგად ორგანიზებული
ობიექტებით არის მიღებული. განვიხილოთ რამოდენიმე ძირითადი თვისება, რაც დაგეხამრება ნავიგაციაში.

### parentNode

[`parentNode`](https://developer.mozilla.org/en-US/docs/Web/API/Node/parentNode) თვისება გვიბრუნებს ამოღებული ელემენტის მშობელ ელემენტს. თუ ელემენტი ახალი შექმნილია
და ჯერ არცეთ ელემენტზე არ არის დამატებული, რაც მის მშობელ ელემენტად `null` აქცევს. დაბრუნებული ელემენტის არის
[`Node`](https://developer.mozilla.org/en-US/docs/Web/API/Node) ტიპის.

### childNodes

[`childNodes`](https://developer.mozilla.org/en-US/docs/Web/API/Node/childNodes) თვისება აბრუნებს ყოველ შვილობილ ელემენტს მათ შორის კომენტარსაც კი. დაბრუნებული მნიშვნელობა
არის [`NodeList`](https://developer.mozilla.org/en-US/docs/Web/API/NodeList) ტიპი.

### children

[`children`](https://developer.mozilla.org/en-US/docs/Web/API/Element/children) თვისება აბრუნებს ყოველ შვილობილ ელემენტს გარდა კომენტარებისა. დაბრუნებული მნიშვნელობა არის
[`HTMLCollection`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCollection) ტიპის.

### firstElementChild

[`firstElementChild`](https://developer.mozilla.org/en-US/docs/Web/API/Element/firstElementChild) თვისება აბრუნებს პირველ შვილობილ ელემენტს, თუ არ არსებობს
დააბრუნებს `null`. დაბრუნებული ელემენტი არის [`Element`](https://developer.mozilla.org/en-US/docs/Web/API/Element) ტიპის.

### lastElementChild

[`lastElementChild`](https://developer.mozilla.org/en-US/docs/Web/API/Node/lastElementChild) თვისება აბრუნებს ბოლო შვილობილ ელემენტს, თუ არ არსებობს
დააბრუნებს `null`. დაბრუნებული ელემენტი არის [`Element`](https://developer.mozilla.org/en-US/docs/Web/API/Element) ტიპის.

### nextElementSibling

[`nextElementSibling`](https://developer.mozilla.org/en-US/docs/Web/API/Element/nextElementSibling) აბრუნებს შემდგომი ელემენტის მნიშვნელობას,
თუ ბოლო ელემენტია დააბრუნებს `null`. დაბრუნებული ელემენტი არის [`Element`](https://developer.mozilla.org/en-US/docs/Web/API/Element) ტიპის.

### previousElementSibling

[`previousElementSibling`](https://developer.mozilla.org/en-US/docs/Web/API/Element/previousElementSibling) აბრუნებს წინა ელემენტის მნიშვნელობას,
თუ პირველი ელემენტია დააბრუნებს `null`. დაბრუნებული ელემენტი არის [`Element`](https://developer.mozilla.org/en-US/docs/Web/API/Element) ტიპის.

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

ამ თავში მიმოვიხილეთ სელექტორები და მისი გამოყენების საშუალებები. ხშირ შემთხვევაში გამოიყენებთ: [`querySelector`](#querySelector), [`querySelectorAll`](#querySelectorAll), [`getElementById`](#getElementById), [`getElementsByName`](#getElementsByName). `querySelector` გამოიყენებთ როცა ერთი ელემენტის ამოღება გსურთ, `querySelectorAll` გამოიყენებთ მაშინ როცა ბევრი ერთნაირი ელემენტის ამოღება გსურთ, `getElementById` გამოიყენებთ მაშინ, როცა `id` გაქვთ და პირდაპირ ელემენტის ამოღება გინდათ ზედმეტი პრეფიქსის გარეშე, ხოლო `getElementsByName` მაშინ როცა `name` გსურთ მიწვდეთ ელემენტებს. გაითვალისწინეთ `querySelector` სჭირდება კლასებთან მიმართებაში `.` პრეფიქსი, `id` მიმართებაში `#` პრეფიქსი, ხოლო ატრიბუტის შემთხვევაში `[]` მოთავსება ატრიბუტის, ამ დამატებითი სინტაქსის გარეშე `querySelector` ამოიღებს მხოლოდ თეგებს. თუ გვსურს ნავიგაცია შეგვიძლია გამოვიყენოთ კვანძის
ელემენტების თვისებები.

იხილეთ სამაგალითო კოდები [playground](./playground/guides/javascript-dom-selectors)-ში.