---
title: 'მანიპულაცია ელემენტებზე'
description: 'HTML ელემენტების მანიპულირება JavaScript-ში'
keywords: 'ელემენტებზე მანიპულაცია, ტექსტური კონტენტის შეცვლა, სტილიზაციის შეცვლა, დინამიურად სტილიზაციის შეცვლა, textContent, innerText, innerHTML, getAttribute, setAttribute, removeAttribute, hasAttribute, attributes, dataset, classList, add class, remove class, toggle class, CRUD on element, ელემენტების შექმნა, ელემენტის შექმნა,
ელემენტის წაშლა, ელემენტის რედაქტირება, remove, removeChild'
---

წინა სტატიებში განვიხილეთ თუ როგორ უნდა ამოგვეღო ელემენტი და მოგვესმინა მის ივენთებზე. ელემენტებზე მანიპულაციისთვის რეალურად უფრო მეტი
შესაძლებელობა გვაქვს. შეგვიძლია: დავუმატოთ კლასი, წავუშალოთ კლასი, დავუმატოთ კონტენტი, წავუშალოთ კონტენტი და ბევრი
სხვა თვისება, რომლებიც შესაძლებლობას გვაძლევს კონტენტი დინამიურად დავაგენერიროთ.

## ტექსტური კონტენტის შეცვლა

კონტენტის შეცვლა ხშირ შემთხვევაში გვიწევს ორგვარად: სტატიკურად ან დინამიურად. სტატიკურია მომენტი მაშინ როცა დაზუსტებით
ვიცით თუ რაც უნდა მივანიჭოთ პირდაპირ, მაგალითად გამოვიტანოთ ყოველ ჯერზე სტატიკური ტექსტი `გამარჯობა მომხარებელო`,
ხოლო დინამიურობის იდეა არის, რაღაც მოქმედებებიდან გამომდინარე გამოვითვალოთ ან მოვიპოვოთ მნიშვნელობა და ვიზუალზე ის
წარვადგინოთ, მაგალითად: `გამარჯობა name`. `name` ამ შემთხვევაში პირობითი მნიშვნელობა არის სადაც შესაძლებელია ნებისმიერი
მნიშვნელობა ჩაჯდეს.

პირდაპირი კონტენტის შესაცვლელად შეგვიძლია DOM-ის რამოდენიმე თვისება გამოვიყენოთ: `textContent`, `innerText`, `innerHTML`.

### textContent

[`textContent`](https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent) თვისება გამოიყენება იმისთვის, რომ წავიკითხოთ
სრული ტექსტი ელემენტიდან. მასზე მნიშვნელობის მინიჭება გულისხმებს ელემენტის ტექსტური კონტენტის ცვლილებას.

მაგალითად:

```html
<p class="quote">დღევანდელი შემთხვევითი ციტატა: ვების სწავლა <a href="https://iswavle.com">iswavle.com</a>-ზე მარტივია</p>
```

```js
const paragraph = document.querySelector('p.quote');
console.log(paragraph.textContent); // დღევანდელი შემთხვევითი ციტატა: ვების სწავლა iswavle.com-ზე მარტივია
```

პ.ს იცოდი, რომ [iswavle.com](https://iswavle.com)-ს ცალკე პროექტიც აქვს ფრონტის დეველოპერებისთვის, სადაც უფასოდ შეგიძლია
სხვადასხვა `API`-ს გამოყენება? გაეცანი [`everrest.educata.dev`-ს](https://everrest.educata.dev/).

განვიხილოთ ტექსტის განახლების მაგალითი:

```html
<p>დღეს <span id="weatherResult">...</span> ამინდია</p>
<button id="goodBtn">კარგი</button>
<button id="badBtn">ცუდი</button>
```

```js
const weatherResult = document.querySelector('#weatherResult');
const goodBtn = document.querySelector('#goodBtn');
const badBtn = document.querySelector('#badBtn');

goodBtn.addEventListener('click', () => {
  weatherResult.textContent = 'კარგი';
});

badBtn.addEventListener('click', () => {
  weatherResult.textContent = 'ცუდი';
});
```

მაგალითში ჯერ ვიღებთ ელემენტს, შემდგომ ღილაკებზე დაკლიკებას ვუსმენთ და დაკლიკების შედეგად
`span` ელემენტის ვუცვლით ტექსტურ შიგთავსს.

### innerText

[`innerText`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/innerText) თვისება საკმაოდ წააგავს [`textContent`](#textContent)
თვისებას. ამ შემთხვევაში `innerText`-იც აბრუნებს ტექსტს და ანალოგიურად შესაძლებელია ტექსტური ტიპის მნიშვნელობის ცვლილება, ოღონდ გვაქვს
მცირედი განსხვავება: `innerText` წაიკითხავს მხოლოდ თვალით ხილვად ტექსტს.

მაგალითად:

```html
<p class="weather-text">დღეს კარგი ამინდია<span style="display: none">, მაგრამ გაწვიმებას აპირებს</span></p>
```

```js
const paragraph = document.querySelector('p.weather-text');
console.log(paragraph.innerText); // 'დღეს კარგი ამინდია'
console.log(paragraph.textContent); // 'დღეს კარგი ამინდია, მაგრამ გაწვიმებას აპირებს'
```

ამ კონკრეტულ მაგალითში `span` ელემენტზე გაწერილი არის `display: none` თვისება, რაც გულისხმობს, რომ ის ვიზუალზე არ უნდა გამოჩნდეს. თუ
შევეცდებით კონტენტის წაკითხვას, `innerText` მხოლოდ ხილვად ნაწილს დაგვიბრუნებს, რაც არის: `'დღეს კარგი ამინდია'`, ხოლო თუ გამოვიყენებთ
`textContent`-ს, შედარებით სრულ სურათს დავინახავთ: `'დღეს კარგი ამინდია, მაგრამ გაწვიმებას აპირებს'`. ორივე თვისება სიტუაციურია, თუ გსურთ
სრული კონტენტის ხილვა, მაშინ გამოიყენეთ `textContent`, ხოლო თუ გსურთ მხოლოდ ხილვადი ტექსტის წაკითხვა, გამოიყენეთ `innerText`.

### innerHTML

[`innerHTML`](https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML) თვისება გამოიყენება HTML კონტენტის დასარენდერებლად.
**რენდერი** ეს არის პროცესი, როცა კონტენტი გამოდის არა როგორც ტექსტური ფორმით, არამედ როგორც HTML-ის ელემენტი.

მაგალითად:

```html
<p>მცდელობა პირველი: <span id="firstResult"></span></p>
<p>მცდელობა მეორე: <span id="secondResult"></span></p>
<p>მცდელობა მესამე: <span id="thirdResult"></span></p>
<button id="renderBtn">დავარენდეროთ კონტენტი</button>
```

```js
const firstResult = document.querySelector('#firstResult');
const secondResult = document.querySelector('#secondResult');
const thirdResult = document.querySelector('#thirdResult');
const renderBtn = document.querySelector('#renderBtn');

renderBtn.addEventListener('click', () => {
  firstResult.textContent = '<i>დახრილი ტექსტი</i>';
  secondResult.innerText = '<i>დახრილი ტექსტი</i>';
  thirdResult.innerHTML = '<i>დახრილი ტექსტი</i>';
});
```

კონკრეტულ მაგალითში გვაქვს 3 მცდელობა, რომ HTML თეგი დავარენდეროთ. პირველი და მეორე მცდელობა არ იმუშავებს, რადგან `textContent`
და `innerText` უბრალოდ ტექსტს არენდერებს, ხოლო `innerHTML`-ს გააჩნია რენდერის შესაძლებლობა, ამიტომაც თუ შეუძლია ელემენტის
დარენდერება, აუცილებლად დაარენდერებს. სხვა შემთხვევაში, ეს თვისებაც უბრალოდ ტექსტს გამოიტანს.

:::warning
`innerHTML` გვთავაზობს HTML დარენდერებას, მაგრამ არასწორი გამოყენების შემთხვევაში, მოჰყვება სხვადასხვა უსაფრთხოების რისკები.
გაეცანით [MDN-ის სტატიას ვების უსაფრთხოებაზე](https://developer.mozilla.org/en-US/docs/Web/Security).
:::

## სტილიზაციის მანიპულაცია

DOM-ით შეგვიძლია სტილების შეცვლაც. ამისათვის საჭიროა ამოვიღოთ ელემენტი და მის `style` ობიექტში შევიტანოთ ცვლილებები.
ეს შესაძლებელია როგორც სტატიკურად, ასევე დინამიურადაც.

სტატიკურის მაგალითი:

```html
<div class="box"></div>
```

```js
const box = document.querySelector('.box');
box.style.width = '150px';
box.style.height = '150px';
box.style.backgroundColor = 'steelblue';
```

`box` ელემენტი, როგორც კი JavaScript გაეშვება, სტატიკურად მიიღებს `steelblue` ფერს და `150px`-ის სიგრძესა და სიგანეს.

დინამიურის მაგალითი:

```html
<p>საინტერესო <span id="dynamicStyle">ტექსტი</span></p>
<div>
  <label for="fontSize">ფონტის ზომა</label>
  <input type="number" id="fontSize" name="fontSize" placeholder="ფონტის ზომა" />
</div>
<div>
  <label for="color">ფერის ცვლილება</label>
  <select id="color" name="color">
    <option value="steelblue">ლურჯი</option>
    <option value="green">მწვანე</option>
    <option value="black">შავი</option>
    <option value="random">შემთხვევითი</option>
  </select>
</div>
```

```js
const dynamicStyle = document.querySelector('#dynamicStyle');
const fontSizeInput = document.querySelector('#fontSize');
const colorSelect = document.querySelector('#color');

fontSizeInput.addEventListener('change', function () {
  const size = Number(this.value); // ამოვიღოთ ველის მნიშვნელობა და გადავიყვანოთ რიცხვში
  dynamicStyle.style.fontSize = `${size}px`; // dynamicStyle-ს ფონტის ზომა
});

colorSelect.addEventListener('change', function () {
  // შევცვალოთ dynamicStyle ფერი შემთხვევითი ფერით ან სტატიკურად განთავსებული ფერით
  dynamicStyle.style.color = this.value === 'random' ? getRandomColor() : this.value;
});

function getRandomColor() {
  // დავაგენერიროთ შემთხვევითი რიცხვი 0 - 256, შემდგომ კი შევფუთოთ rgb ფორმატში
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r},${g},${b})`;
}
```

ამ მაგალითში მომხარებელს შეუძლია, შეცვალოს ფონტის ზომა და ფერი. ერთერთი მარტივი მიდგომა ველიდან
მნიშვნელობის წასაკითხად, არის მისი `value` თვისების წაკითხვა. ფონტის ზომის შემთხვევაში, მომხმარებელი რასაც შეიყვანს,
იმ მნიშვნელობას ვუყენებთ `span`-ის ელემენტს.
ფერის შემთხვევაში, მომხმარებელს შეუძლია აარჩიოს სტატიკური ფერი, ან დინამიკურად დაგენერირებული შემთხვევითი ფერი, რომელიც ელემენტს მიენიჭება.

ფორმის ელემენტებთან მუშაობა უფრო დეტალურად განხილული იქნება [ფორმების სტატიაში](./doc/guides/javasccript/dom/form).

## ატრიბუტის მანიპულაცია

HTML-ში მრავალი საინტერესო და გამოსადეგი ატრიბუტი გვაქვს, რომლის დინამიურად წაკითხვა, ცვლილება, წაშლა შეგვიძლია JavaScript-ის
მხრიდან.

### ზოგადი ატრიბუტების მანიპულაცია

[`getAttribute`](https://developer.mozilla.org/en-US/docs/Web/API/Element/getAttribute) მეთოდი დააბრუნებს ატრიბუტის მნიშვნელობას.
თუ ატრიბუტს მნიშვნელობა არ აქვს, მაშინ დააბრუნებს `null`-ს.

განვიხილოთ ატრიბუტის ამოღების მაგალითი:

```html
<button id="getAttrBtn" data-count="2">ატრიბუტის დალოგვა</button>
```

```js
const getAttrBtn = document.querySelector('#getAttrBtn');
getAttrBtn.addEventListener('click', function () {
  console.log(this.getAttribute('data-count')); // '2'
  console.log(this.getAttribute('src')); // null
});
```

ამ მაგალითში დაკლიკების შემდგომ დაილოგება ღილაკის ატრიბუტების მნიშვნელობები. შეგვეძლო ჩვეულებრივი ფუნქციის ნაცვლად
`arrow` ფუნქცია დაგვეწერა, მაგრამ ასე `this`-ს დავკარგავდით.

[`setAttribute`](https://developer.mozilla.org/en-US/docs/Web/API/Element/setAttribute) მეთოდი გამოიყენება ელემენტზე ატრიბუტის დასამატებლად.
მეთოდი ღებულობს ორ ტექსტურ პარამეტრს: ატრიბუტის სახელსა და ატრიბუტის მნიშვნელობას. მეთოდი არაფერს არ აბრუნებს.

განვიხილოთ ატრიბუტის დამატების მაგალითი:

```html
<button id="setAttrBtn">ატრიბუტის დამატება</button>
```

```js
const setAttrBtn = document.querySelector('#setAttrBtn');
setAttrBtn.addEventListener('click', function () {
  this.setAttribute('data-count', '22');
});
```

[`removeAttribute`](https://developer.mozilla.org/en-US/docs/Web/API/Element/removeAttribute) მეთოდის გამოყენებით შესაძლებელია ელემენტიდან
ატრიბუტის წაშლა. მეთოდი ღებულობს ერთ ტექსტურ პარამეტრს - წასაშლელი ატრიბუტის სახელს. მეთოდი არაფერ არ აბრუნებს.

განვიხილოთ ატრიბუტის წაშლის მაგალითი:

```html
<button id="removeAttrBtn" data-count="2">ატრიბუტის წაშლა</button>
```

```js
const removeAttrBtn = document.querySelector('#removeAttrBtn');
removeAttrBtn.addEventListener('click', function () {
  this.removeAttribute('data-count');
});
```

[`hasAttribute`](https://developer.mozilla.org/en-US/docs/Web/API/Element/hasAttribute) მეთოდის გამოყენებით შესაძლებელია შევამოწმოთ
ელემენტს გააჩნია თუ არა ატრიბუტი. მეთოდი ღებულობს ერთ ტექსტურ სტრინგს. მეთოდი დააბრუნებს
`true`-ს იმ შემთხვევაში თუ ელემენტს ატრიბუტი გააჩნია, ხოლო `false`-ს - თუ არ გააჩნია.

```html
<button id="hasAttrBtn" data-count="2">ატრიბუტის წაშლა</button>
```

```js
const hasAttrBtn = document.querySelector('#hasAttrBtn');
hasAttrBtn.addEventListener('click', function () {
  console.log(this.hasAttribute('data-count')); // true
});
```

[`attributes`](https://developer.mozilla.org/en-US/docs/Web/API/Element/attributes) თვისება დააბრუნებს ყოველ ატრიბუტს, რომელიც ელემენტს გააჩნია.
დაბრუნებული მნიშვნელობა იქნება [`NamedNodeMap`](https://developer.mozilla.org/en-US/docs/Web/API/NamedNodeMap)-ის ტიპის.

[`dataset`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset) თვისება დააბრუნებს ყოველ ხელით შექმნილ ატრიბუტს (custom attributes),
რომლებიც მეტწილადად იწყება `data-` პრეფიქსით. დაბრუნებული მნიშვნელობა იქნება [`DOMStringMap`](https://developer.mozilla.org/en-US/docs/Web/API/DOMStringMap) ტიპის.

ორივე თვისების მაგალითი:

```html
<div id="user" data-id="123456789"></div>
```

```js
const user = document.querySelector('#user');
console.log(user.attributes); // {0: id, 1: data-id, id: id, data-id: data-id, length: 2}
console.log(user.dataset); // {id: "123456789"}
```

ორივე თვისებას თავისი გამოყენების მიდგომა გააჩნია. `attributes` თვისება გამოიყენება ხშირად მაშინ, როცა ყოველი ატრიბუტის დაბრუნება გვსურს, ხოლო `dataset` მაშინ,
როცა ხელით შექმნილი ატრიბუტების ამოღება გვჭირდება.

### class-ების მანიპულაცია

DOM ასევე გთავაზობს მეთოდების ნაკრებს კლასებისთვისაც. ხშირია შემთხვევა, როცა სტატიკურად მინიჭებული კლასის გარდა
გვჭირდება დინამიურად მინიჭებული კლასის სახელები, მაგალითად: ჩამოსქროლვის შემდგომ რაღაც ელემენტმა მიიღოს კლასი,
რის მიხედვითაც გაეშვება CSS-ის ანიმაცია. კლასის თვისებები და მეთოდები თავმოყრილია ერთ ობიექტში,
[`classList`](https://developer.mozilla.org/en-US/docs/Web/API/Element/classList)-ში, რომელსაც შეგვიძლია ჩავწვდეთ ელემენტის ამოღების
შემდგომ.

კლასის დასამატებლად ვიყენებთ [`add`](https://developer.mozilla.org/en-US/docs/Web/API/DOMTokenList/add) მეთოდს. მეთოდი პარამეტრად
ღებულობს კლასის დასახელებებს, სტრინგის სახით, და არაფერს აბრუნებს.
ის უბრალოდ ელემენტზე დაამატებს კლასს ან კლასებს.

მაგალითად, ღილაკზე დაკლიკების შემდგომ დავამატოთ კლასი:

```html
<div id="addClassContainer"></div>
<button id="addClass">დავამატოთ კლასი</button>
```

```js
const addClassContainer = document.querySelector('#addClassContainer');
const addClassBtn = document.querySelector('#addClass');

addClassBtn.addEventListener('click', () => {
  addClassContainer.classList.add('animate');
});
```

ამ მაგალითში, ღილაკზე დაკლიკების შემდგომ დივი, რომელსაც `addClassContainer` მნიშვნელობის `id` აქვს, მიიღებს კლასს `animate`.

კლასის წასაშლელად ვიყენებთ [`remove`](https://developer.mozilla.org/en-US/docs/Web/API/DOMTokenList/remove) მეთოდს. მეთოდი პარამეტრად
ღებულობს კლასის დასახელებებს, სტრინგის სახით, და აბრუნებს არაფერს. ის უბრალოდ ელემენტზე წაშლის კლას ან კლასებს.

მაგალითად ღილაკზე დაკლიკების შემდგომ წავშალოთ კლასი:

```html
<div id="removeClassContainer" class="animate"></div>
<button id="removeClass">წავშალოთ კლასი</button>
```

```js
const removeClassContainer = document.querySelector('#removeClassContainer');
const removeClassBtn = document.querySelector('#removeClass');

removeClassBtn.addEventListener('click', () => {
  removeClassContainer.classList.remove('animate');
});
```

ამ მაგალითში განიხილება ღილაკზე დაკლიკების შემდგომ `animate` კლასის წაშლა დივიდან.

კლასის **toggle**-სთვის გამოიყენება მეთოდი [`toggle`](https://developer.mozilla.org/en-US/docs/Web/API/DOMTokenList/toggle). toggle ეს არის
პროცესი გადართვა-გადმორთვის პროცესი. კონკრეტულად ამ მეთოდის შემთხვევაში,
თუ ელემნტს აქვს პარამეტრში მიწოდებული კლასი, მას წაუშლის, ხოლო თუ არ აქვს - დაუმატებს.
მეთოდი პარამეტრად ღებულობს კლასის დასახელებას, სტრინგის სახით, და დააბრუნებს
`true`-ს ან `false`-ს, იმის მიხედვით, ელემენტს დაემატა (`true`) თუ წაეშალა (`false`) კლასი.

მაგალითად, ღილაკზე დაკლიკების შემდგომ გავაკეთოთ toggle კლასის:

```html
<div id="toggleClassContainer" class="animate"></div>
<button id="toggleClass">toggle კლასი</button>
```

```js
const toggleClassContainer = document.querySelector('#toggleClassContainer');
const toggleClassBtn = document.querySelector('#toggleClass');

toggleClassBtn.addEventListener('click', () => {
  toggleClassContainer.classList.toggle('animate');
});
```

ამ მაგალითიდან ჩანს, რომ ღილაკზე დაკლიკების შემთხვევაში კლასი ან წაიშლება ან დაემატება იმის მიხედვით, მანამდე გააჩნდა თუ არა კლასი.

არის მომენტები, როცა გვჭირდება შემოწმება, ელემენტს კლასი გააჩნია თუ არა. [`contains`](https://developer.mozilla.org/en-US/docs/Web/API/DOMTokenList/contains)-ის
მეთოდი სწორედ ამისთვის გვაქვს - რომ შევამოწმოთ ელემენტს გააჩნია თუ არა სპეციფიკური კლასი. მეთოდი პარამეტრად ღებულობს სტრინგს და დააბრუნებს
`true` თუ კლასს შეიცავს, ხოლო `false` - თუ არ შეიცავს.

მაგალითისთვის, შევამოწმოთ დივი შეიცავს თუ არა კლასს `animate`:

```html
<div id="checkOnClass" class="animate"></div>
```

```js
const checkOnClass = document.querySelector('#checkOnClass');
console.log(checkOnClass.classList.contains('animate')); // true რადგან შეიცავს
console.log(checkOnClass.classList.contains('circle')); // false რადგან არ შეიცავს
```

## ელემენტის მანიპულაცია

ტექსტური კონტენტის და სტილიზაციის კონტენტის გარდა, ასევე შეგვიძლია შევქმნათ და წავშალოთ ელემენტები.
ხშირ შემთხვევაში, როცა საქმე ეხება ჩაწერას, წაკითხვას, განახლებასა და წაშლას, გვაქვს მარტივი ტერმინი **CRUD**.
CRUD იშიფრება, როგორც:

- **C**reate - შექმნა
- **R**ead - წაკითხვა
- **U**pdate - განახლება
- **D**elete - წაშლა

### Create

HTML ელემენტის შექმნა შესაძლებელია ორი გზით:

- პირდაპირ HTML ელემენტის დამატებით (`innerHTML`-ის გამოყენებით).
- [`createElement`](https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement) მეთოდის გამოყენებით.

განვიხილოთ ორივე გზა:

```html
<article>
  <p>საინტერესო სტატია</p>
</article>
```

```js
const article = document.querySelector('article');
article.innerHTML += `
  <img src="https://everrest.educata.dev/logo.png" alt="სტატიის სურათი">
`;
```

`innerHTML`-ის გამოყენებით ვღებულობთ პირდაპირ დამატებულ კონტენტს არტიკლში (არტიკლი პირობითი ელემენტია, იგივე
მოქმედებები შეიძლება **ნებისმიერ** ელემენტზე). ამ შემთხვევაში დავარენდერეთ სურათის თეგი.
[`+=`](./doc/guides/javascript/operations-operators#მინიჭების_ოპერაციები) გამოვიყენეთ სინტაქსის შემოკლებისთვის,
რომ ახალი კონტენტი დაგვემატებინა `innerHTML`-ში არსებულ კონტენტთან ერთად.

განვიხილოთ იგივე მაგალითი `createElement` მეთოდის გამოყენებით:

```html
<article>
  <p>საინტერესო სტატია</p>
</article>
```

```js
const article = document.querySelector('article');
const image = document.createElement('img');
image.src = 'https://everrest.educata.dev/logo.png';
image.alt = 'სტატიის სურათი';
article.appendChild(image);
```

`createElement` მეთოდის გამოყენებით გვიწევს ჯერ ელემენტის შექმნა, შემდგომ მისი შესაბამისად მოდიფიცირება და ბოლოს
[`appendChild`](https://developer.mozilla.org/en-US/docs/Web/API/Node/appendChild) მეთოდის გამოყენებით კონტენტის ჩასმა
`article` ელემენტში.

ორივე მიდგომა სრულყოფილად ასრულებს თავის საქმეს, მაგრამ რომელი მეთოდი უნდა გამოვიყენოთ ხშირად?

შესაძლებელია ორივე მეთოდი გამოვიყენოთ სხვადასხვა სიტუაციების დროს, მეტწილადად `innerHTML` შეგიძლიათ გამოიყენოთ მაშინ
როცა პირდაპირ გსურთ ელემენტის დამატება ზედმეტი თვისებების გაწერის გარეშე და არ გჭირდებათ დამატებული ელემენტის თავიდან
ამოღება, ხოლო `createElement` გამოიყენეთ მაშინ, როცა გჭრდებათ თვისებების ცვლილებაც და ელემენტის სამომავლოდ გამოყენებაც.
ასე თავს აარიდებთ დამატებული კონტენტის თავიდან ამოღებას, რასაც `innerHTML` არ გვთავაზობს.

### Read

ელემენტის წაკითხვასთან დაკავშირებით შეგიძლიათ გაეცნოთ [ელემენტის ძებნის](./doc/guides/javascript/dom/selectors#ელემენტების_ძებნა)
სტატიას, სადაც დეტალურად არის განხილული თუ როგორ უნდა ამოვიღოთ ელემენტი ან ელემენტები.

### Update

ელემენტის განახლება შესაძლებელია ბევრი გზით. რეალურად HTML-ს ელემენტს, რომელიც არის წარმოდგენილი როგორც კვანძი (node), გააჩნია
საკმაოდ ბევრი თვისება და მეთოდი. მისი თითოეული თვისების ცვლილება გულისხმობს უკვე მის განახლებას. ამავე სტატიაში
განვიხილეთ რამოდენიმე განახლების ნაწილი: [ტექსტური კონტენტის შეცვლა](#ტექსტური_კონტენტის_შეცვლა),
[სტილიზაციის მანიპულაცია](#სტილიზაციის_მანიპულაცია), [ატრიბუტის მანიპულაცია](#ატრიბუტის_მანიპულაცია).

### Delete

ზოგჯერ დამატებული ელემენტი აღარ საჭიროებს ვებგვერდზე ყოფნას, ამიტომაც გვიწევს მისი წაშლა. წაშლისათვის შესაძლებელია
სხვადასხვა მიდგომის გამოყენება:

- `innerHTML` თვისების გამოყენება
- `remove` მეთოდის გამოყენება.
- `removeChild` მეთოდის გამოყენება.

`innerHTML`-ით წაშლა პრაქტიკაში ყველაზე ცუდი წაშლის მიდგომა არის, თუმცა ზოგი დეველოპერი მას მაინც იყენებს. რეალურად `innerHTML`
არ შლის, ის ასუფთავებს კონტენტს, შედეგად ვღებულობთ მშობელ ელემენტს, რომელსაც არ აქვს არანაირი კონტენტი.

```html
<p id="removeParagraph">არასაჭირო პარაგრაფი</p>
<button id="removeParagraphBtn">წაშლა</button>
```

```js
const removeParagraph = document.querySelector('#removeParagraph');
const removeParagraphBtn = document.querySelector('#removeParagraphBtn');

removeParagraphBtn.addEventListener('click', () => {
  removeParagraph.innerHTML = '';
});
```

ასე კონტენტი გაქრება `<p>` ელემენტიდან, მაგრამ თუ გახსნით დეველოპერის თულს და დააკვირდებით ელემენტებს, შეამჩნევთ,
რომ HTML-ში ისევ არის `<p>` ელემენტი. ამიტომაც ეს მიდგომა არ არის იდეალური, უმჯობესია `remove`-ისა ან `removeChild`-ის გამოყენება.

[`remove`](https://developer.mozilla.org/en-US/docs/Web/API/Element/remove) მეთოდი გამოიყენება იმისათვის, რომ კონკრეტული
ელემენტი მთლაიანდ წავშალოთ HTML-დან. მეთოდი არანაირ პარამეტრს არ ღებულობს და არც არაფერს აბრუნებს, უბრალოდ წაშლის ელემენტს
HTML-დან.

იგივე მაგალითზე განვიხილოთ `remove`:

```html
<p id="removeParagraph">არასაჭირო პარაგრაფი</p>
<button id="removeParagraphBtn">წაშლა</button>
```

```js
const removeParagraph = document.querySelector('#removeParagraph');
const removeParagraphBtn = document.querySelector('#removeParagraphBtn');

removeParagraphBtn.addEventListener('click', () => {
  removeParagraph.remove();
});
```

მსგავსი მიდგომით საერთოდ წაიშლება `<p>` ელემენტი HTML-ს სტრუქტურიდან.

[`removeChild`](https://developer.mozilla.org/en-US/docs/Web/API/Node/removeChild) თვისება გამოიყენება მშობლიდან შვილობილი ელემენტის
წასაშლელად, თუმცა თუ არ გვაქვს მშობელ ელემენტზე წვდომა, შვილობილ ელემენტსაც შეგვიძლია წავაშლევინოთ საკუთარი თავი.

შვილობილიდან წაშლის მაგალითი:

```html
<p id="removeParagraph">არასაჭირო პარაგრაფი</p>
<button id="removeParagraphBtn">წაშლა</button>
```

```js
const removeParagraph = document.querySelector('#removeParagraph');
const removeParagraphBtn = document.querySelector('#removeParagraphBtn');

removeParagraphBtn.addEventListener('click', () => {
  if (removeParagraph.parentNode) {
    removeParagraph.parentNode.removeChild(removeParagraph);
  }
});
```

ასე მშობელ ელემენტზე წვდომის გარეშეც წავშლით არსებულ ელემენტს, თუმცა ესეთ დროს უფრო მიღებულია
`remove` მეთოდის გამოყენება.

განვიხილოთ მშობლიდან შვილობილი ელემენტის წაშლის მაგალითი:

```html
<div id="parent">
  <div id="child"></div>
</div>
<button id="deleteFromParentNode">წაშალე შვილობილი ელემენტი</button>
```

```js
const deleteFromParentNodeBtn = document.querySelector('#deleteFromParentNode');
const parent = document.querySelector('#parent');
const child = document.querySelector('#child');

deleteFromParentNodeBtn.addEventListener('click', () => {
  parent.removeChild(child);
});
```

რეალურად ასე არის მშობელი ელემენტიდან შვილობილი ელემენტის წაშლა მიღებული.

განვიხილოთ ყოველი შვილობილი ელემენტის წაშლის მაგალითი:

```html
<div id="parentNode">
  <div>1</div>
  <div>2</div>
  <div>3</div>
  <div>4</div>
  <div>5</div>
</div>
<button id="deleteAllNodeBtn">წაშალე შვილობილი ელემენტი</button>
```

```js
const deleteAllNodeBtn = document.querySelector('#deleteAllNodeBtn');
const parentNode = document.querySelector('#parentNode');

deleteAllNodeBtn.addEventListener('click', () => {
  while (parentNode.firstChild) {
    parentNode.removeChild(parentNode.firstChild);
  }
});
```

ასეთი მიდგომით შესაძლებელია, ციკლი ვამუშავოთ მანამ, სანამ მშობელ ელემენტს გააჩნია
პირველი შვილობილი ელემენტი.

## შეჯამება

სტატიაში განვიხილეთ ელემენტებზე მანიპულაციის სხვადასხვა მეთოდები, რომლებიც გვეხმარება დინამიური კონტენტის შექმნაში.
უკვე იცით, თუ როგორი სახით არის შესაძლებელი ელემენტის კონტენტზე მანიპულაცია, ატრიბუტებზე მანიპულაცია,
კლასების მანიპულაცია და CRUD ოპერაციები.

იხილეთ სამაგალითო კოდები [playground](./playground/simple/guides/javascript-dom-elements-manipulation)-ში.
