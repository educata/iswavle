---
title: 'სელექტორები და ფსევდო კლასები'
description: 'როგორ გამოვიყენოთ სელექტორები და ფსევდო კლასები CSS-ში?'
keywords: 'სელექტორი, სელექტორები, ფსევდო კლასი, ფსევდო კლასები'
---

[CSS-ის შესავალში](doc/guides/html-css/css) განვიხილეთ მარტივი ტიპის სელექტორები, როგორებიცა:

- HTML ელემენტი.
- `კლასი`.
- `id`.

ამ სტატიაში კი განვიხილავთ შედარებით სპეციფიკურ სელექტორებს და ფსევდო კლასებს,
რომლის მიხედვითაც უფრო ლამაზ სტილიზაციას მიიღებთ.

## კომბინატორები

CSS კომბინატორების გამოყენებით, შეგვიძლია დავსტილოთ კონკრეტული ელემენტი სხვადასხვა ელემენტების გამოყენებით.

### სიის კომბინატორი

[სიის კომბინატორი](https://developer.mozilla.org/en-US/docs/Web/CSS/Selector_list) გამოიყენება რამოდენიმე ელემენტის ერთნაირად დასასტილად.

ფორმულა:

```css
selector1,
selector2 {
  /* სტილიზაცია */
}
```

მაგალითად გვსურს დავსტილოთ სათაურის და პარაგრაფის ტექსტები ერთ ფერში:

```html preview
<h6>ყველაზე პატარა სათაური</h6>
<p>პარაგრაფი</p>
```

```css preview
h6,
p {
  color: red;
  font-size: 16px;
}
```

### შთამომავალი კომბინატორი

[შთამომავალი კომბინატორი](https://developer.mozilla.org/en-US/docs/Web/CSS/Descendant_combinator) გამოიყენება ისეთი ელემენტის დასტილვაში,
რომელიც მოთავსებულია კონკრეტულ ელემენტებში. შთამომავალი კომბინატორისთვის საჭიროა ცარიელი ადგილის გამოყენება.

ფორმულა:

```css
selector1 selector2 {
  /* სტილიზაცია */
}
```

მაგალითად გვსურს დავსტილოთ ისეთი ტიპის `a` ელემენტი, რომელიც მოთავსებულია სიის ელემენტში.

```html preview
<ul>
  <li><a href="/index.html">მთავარი</a></li>
  <li><a href="/editor.html">ედიტორი</a></li>
  <li><a href="/guide.html">გზამკლევი</a></li>
</ul>
<a href="/article.html">სტატიის ბმული</a>
```

```css preview
a {
  color: red;
}

ul li a {
  color: green;
}
```

ასე მივიღეთ 'სტატიის ბმული` წითელ ფერში, ხოლო სიაში მოთავსებული ბმულები მწვანე ფერში.

### შვილობილი კომბინატორი

[შვილობილი კომბინატორი](https://developer.mozilla.org/en-US/docs/Web/CSS/Child_combinator) გამოიყენება კონკრეტული
შვილობილი ელემენტების დასასტილად. შვილობილი ელემენტი აუცილებლად უნდა მშობლის შემდგომ დონეზე,
განსხვავებით [შთამომავალი კომბინატორისგან](#შთამომავალი_კომბინატორი) შვილობილი კომბინატორი უფრო ზუსტია.

ფორმულა:

```css
selector1 > selector2 {
  /* სტილიზაცია */
}
```

მაგალითად გვსურს ისეთი `span`-ის დასტილვა, რომელიც მოთავსებულია `div`-ში

```html preview
<div>
  <span>პირველი span</span> <span>მეორე span <span>მესამე span</span></span>
</div>
<span>პირველი სპანი div-ის გარეთ</span>
```

```css preview
div > span {
  color: red;
}
span {
  color: steelblue;
}
```

იგივე მაგალითი შთამომავალი კომბინატორის გამოყენებით, მესამე `span`-იც დაისტილებოდა.

### მეზობელი კომბინატორი

[მეზობელი კომბინატორი](https://developer.mozilla.org/en-US/docs/Web/CSS/Next-sibling_combinator) გამოიყენება ისეთი
ელემენტის ელემენტის დასტილვაში, რომელიც კონკრეტულად კერძო ელემენტის შემდგომ არის გამოყენებული.

ფორმულა:

```css
former_element + target_element {
  /* სტილიზაცია */
}
```

მაგალითად გვსურს დავსტილოთ ისეთი პარაგრაფი, რომელიც მოთავსებულია სურათის შემდგომ:

```html preview
<p>რა არის HTML?</p>
<img src="/assets/images/html-css.png" alt="HTML & CSS ლოგო" />
<p>HTML (HyperText Markup Language - ჰიპერტექსტური მარკაპის ენა) არის მარკაპის ენა, რომელიც მუითებებს ბრაუზერს, თუ როგორი სტრუქტურა მისცეს ვებგვერდს. HTML-ში გამოიყენება ელემენტები, რომ ტექსტური კონტენტი შევკრათ ან მოვნიშნოთ (mark up), რათა ამ კონტენტს გარკვეული გარეგნობა, ქცევა ან დანიშნულება შეეძინოს.</p>
<p>HTML შედგება ელემენტებისგან, რომლებიც გამოიყენება კონტენტის სხვადასხვა ნაწილის შესაფუთად, რათა მას მიენიჭოს განსხვავებული გარეგნობა ან დანიშნულება.</p>
```

```css preview
img + p {
  color: orange;
}
```

### შემდეგი კომბინატორი

[შემდეგი კობინატორი](https://developer.mozilla.org/en-US/docs/Web/CSS/Subsequent-sibling_combinator) გამოიყენება ისეთი
ელემენტის ელემენტის დასტილვაში, რომელიც კერძო ელემენტის შემდგომ არის გამოყენებული. განსხვავებით მეზობელი ელემენტისაგან არ არის
სავალდებულო შემდეგი ელემენტი პირდაპირ ეწეროს, ასევე შესაძლებელია მათ შორის სხვა ელემენტების არსებობაც.

ფორმულა:

```css
former_element ~ target_element {
  /* სტილიზაცია */
}
```

მაგალითად გვსურს დავსტილოთ ისეთი პარაგრაფები, რომლებიც მოთავსებულია სურათის შემდგომ:

```html preview
<p>პირველი პარაგრაფი</p>
<img src="/assets/images/js.png" alt="JS ლოგო" />
<p>მეორე პარაგრაფი</p>
<p>მესამე პარაგრაფი</p>
<h6>პირველი სათაური</h6>
<p>მეოთხე პარაგრაფი</p>
```

```css preview
img ~ p {
  color: steelblue;
}

img + p {
  /* მხოლოდ პირველი პარაგრაფის დასტილვა, რომელიც მოთავსებულია სურათის შემდეგ */
  text-decoration: underline red;
}

p {
  color: green;
}
```

:::info
შესაძლებელია სხვადასხვა კომბინატორის ერთდროულად გამოყენება, იხილეთ [ჭადრაკის დაფის აგების](#nth-child) მაგალითი.
:::

## ფსევდო კლასები

ფსევდო კლასები CSS-ში საშუალებას გვაძლევს სტილი დავუმატოთ ელემენტს მათი მდგომარეობისა ან
ინტერაქციის საფუძველზე, დამატებითი კლასის ან იდენტიფიკატორის გარეშე.

სინტაქსი:

```css
selector:pseudo-class {
  სტილიზაცია
}
```

მაგალითად გვსურს შევცვალოთ ღილაკის ტექსტსის ფერი მაუსის გადატარებისას:

```html preview
<button>Hover me</button>
```

```css preview
button:hover {
  color: red;
}
```

ამ მაგალითში გამოვიყენოთ [`:hover`](https://developer.mozilla.org/en-US/docs/Web/CSS/:hover) ფსევდო კლასი,
რომელიც მოქმედებს მაშინ, როცა მომხარებელი მას გადაატარებს კურსორს (მაუსის მიმთითებელს).

:::info
touchscreen-ის შემთხვევაში `:hover` ფსევდო კლასის პრობლემატურია, ზოგჯერ შეიძლება საერთოდ არ მოხდეს მისი გაშვება
ან გაეშვას ელემენტზე შეხების შემდგომ.
:::

CSS-ს ბევრი ფსევდო კლასი გააჩნია თუმცა ამ სტატიაში ჩვენ განვიხილავთ ძირითად ნაწილს.
იხილეთ სრული სია [MDN-ის სტატიაში](https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-classes).

## ინტერაქციის ფსევდო კლასები

### active

[`:active`](https://developer.mozilla.org/en-US/docs/Web/CSS/:active) ფსევდო კლასი ეშვება, როცა მომხარებელი
დააკლიკებს ელემენტს.

```html preview
<button>გააგზავნე</button>
```

```css preview
button {
  color: red;
}

button:hover {
  color: blue;
}

button:active {
  color: green;
}
```

### focus

[`:focus`](https://developer.mozilla.org/en-US/docs/Web/CSS/:focus) ფსევდო კლასი ეშვება, როცა ელემენტი ფოკუსშია.

```html preview
<input placeholder="სახელი" />
```

```css preview
input:focus {
  background-color: antiquewhite;
}
```

### focus-visible

[`:focus-visible`](https://developer.mozilla.org/en-US/docs/Web/CSS/:focus-visible) მოქმედებს მხოლოდ იმ ელემენტებზე,
რომლებსაც ფოკუსი აქვთ მაგრამ მხოლოდ მაშინ, როცა ეს ფოკუსი კლავიატურით ან დამხმარე ტექნოლოგიებით (არა მაუსით) მიიღეს.

```html preview
<button>შეეცადე <kbd>tab</kbd> ღილაკით ფოკუსი</button>
```

```css preview
button:focus-visible {
  outline: none;
  border: 1px solid red;
}
```

### focus-within

[`:focus-within`](https://developer.mozilla.org/en-US/docs/Web/CSS/:focus-within) მოქმედებს მშობელ ელემენტზე თუ მისი რომელიმე
შვილობილი ელემენტი ფოკუსშია.

```html preview
<form>
  <label for="nameInput">სახელი:</label> <br />
  <input id="nameInput" name="name" placeholder="თქვენი სახელი" /> <br />
  <button>გაგზავნა</button>
</form>
```

```css preview
form {
  width: max-content;
  margin: auto;
  padding: 16px;
  border: 1px solid black;
}

form * {
  margin-top: 15px;
}

form:focus-within {
  border: 1px dashed red;
}

form input:focus,
form button:focus {
  background-color: antiquewhite;
}

form input:focus-visible,
form button:focus-visible {
  outline: none;
  border: 1px solid red;
}
```

## სტრუქტურული ფსევდო კლასები

### first-child

[`:first-child`](https://developer.mozilla.org/en-US/docs/Web/CSS/:first-child) ფსევდო კლასი ამოიღებს პირველ შვილობილ ელემენეტს.

```html preview
<p>პირველი პარაგრაფი</p>
<p>მეორე პარაგრაფი</p>
```

```css preview
p:first-child {
  color: red;
}
```

### last-child

[`:last-child`](https://developer.mozilla.org/en-US/docs/Web/CSS/:last-child) ფსევდო კლასი ამოიღებს ბოლო შვილობილ ელემენეტს.

```html preview
<p>პირველი პარაგრაფი</p>
<p>მეორე პარაგრაფი</p>
```

```css preview
p:last-child {
  color: red;
}
```

### nth-child

[`:nth-child`](https://developer.mozilla.org/en-US/docs/Web/CSS/:nth-child) ფსევდო კლასი ამოიღებს ელემენტებს
გადაცემული ინდექსიდან გამომდინარე. გადაცემული ინდექსი შეიძლება იყოს დინამიური `n` მნიშვნელობა ან სტატიკური რიცხვი.

:::info
`n` მნიშვნელობის ჩაწერა შეიძლება მათემატიკური მიმდევრობის სახითიაც.
:::

```html preview
<ul>
  <li>პირველი ელემენტი</li>
  <li>მეორე ელემენტი</li>
  <li>მესამე ელემენტი</li>
  <li>მეოთხე ელემენტი</li>
  <li>მეხუთე ელემენტი</li>
  <li>მეექვსე ელემენტი</li>
  <li>მეშვიდე ელემენტი</li>
  <li>მერვე ელემენტი</li>
  <li>მეცხრე ელემენტი</li>
  <li>მეათე ელემენტი</li>
</ul>
```

```css preview
ul li:nth-child(2) {
  text-decoration: underline red;
}

ul li:nth-child(even) {
  color: red;
}

ul li:nth-child(odd) {
  color: orange;
}

ul li:nth-child(3n) {
  color: blue;
}
```

:::info
`odd` (კენტი) და `even` (ლუწი) ჩაშენებული მნიშვნელობებია, რომლებიც შეიძლება ასევე წარმოვადგინოთ, როგორც:
`2n+1` (კენტი) და `2n` (ლუწი).
:::

მაგალითისთვის ავაგოთ ჭადრაკის დაფა. `nth-child` თუ არ გამოვიყენებთ მოგვიწევდა სპეციფიკურად კლასების მინიჭება
კონკრეტულ ელემენტებზე, რომ გაგვეგო რომელი უჯრა არის.

```html
<div class="board">
  <div class="row">
    <div class="square"></div>
    <div class="square"></div>
    <div class="square"></div>
    <div class="square"></div>
    <div class="square"></div>
    <div class="square"></div>
    <div class="square"></div>
    <div class="square"></div>
  </div>
  <!-- მსგავსი 7 row div -->
</div>
```

```css
div.board {
  width: 400px;
  height: 400px;
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: repeat(8, 1fr);
  border: 1px solid black;
}

div.board div.square {
  width: 100%;
  height: 100%;
  background-color: #ebecd0;
}

div.board div.row:nth-child(odd) div.square:nth-child(even),
div.board div.row:nth-child(even) div.square:nth-child(odd) {
  background-color: #739552;
}
```

```preview
<style>
  .preview-chess-example {
    div.board {
      width: 400px;
      height: 400px;
      display: grid;
      grid-template-columns: repeat(8, 1fr);
      grid-template-rows: repeat(8, 1fr);
      border: 1px solid black;
    }

    div.board div.square {
      width: 100%;
      height: 100%;
      background-color: #ebecd0;
    }

    div.board div.row:nth-child(odd) div.square:nth-child(even),
    div.board div.row:nth-child(even) div.square:nth-child(odd) {
      background-color: #739552;
    }
  }
</style>
<div class="preview-chess-example">
  <div class="board">
    <div class="row">
      <div class="square"></div>
      <div class="square"></div>
      <div class="square"></div>
      <div class="square"></div>
      <div class="square"></div>
      <div class="square"></div>
      <div class="square"></div>
      <div class="square"></div>
    </div>
    <div class="row">
      <div class="square"></div>
      <div class="square"></div>
      <div class="square"></div>
      <div class="square"></div>
      <div class="square"></div>
      <div class="square"></div>
      <div class="square"></div>
      <div class="square"></div>
    </div>
    <div class="row">
      <div class="square"></div>
      <div class="square"></div>
      <div class="square"></div>
      <div class="square"></div>
      <div class="square"></div>
      <div class="square"></div>
      <div class="square"></div>
      <div class="square"></div>
    </div>
    <div class="row">
      <div class="square"></div>
      <div class="square"></div>
      <div class="square"></div>
      <div class="square"></div>
      <div class="square"></div>
      <div class="square"></div>
      <div class="square"></div>
      <div class="square"></div>
    </div>
    <div class="row">
      <div class="square"></div>
      <div class="square"></div>
      <div class="square"></div>
      <div class="square"></div>
      <div class="square"></div>
      <div class="square"></div>
      <div class="square"></div>
      <div class="square"></div>
    </div>
    <div class="row">
      <div class="square"></div>
      <div class="square"></div>
      <div class="square"></div>
      <div class="square"></div>
      <div class="square"></div>
      <div class="square"></div>
      <div class="square"></div>
      <div class="square"></div>
    </div>
    <div class="row">
      <div class="square"></div>
      <div class="square"></div>
      <div class="square"></div>
      <div class="square"></div>
      <div class="square"></div>
      <div class="square"></div>
      <div class="square"></div>
      <div class="square"></div>
    </div>
    <div class="row">
      <div class="square"></div>
      <div class="square"></div>
      <div class="square"></div>
      <div class="square"></div>
      <div class="square"></div>
      <div class="square"></div>
      <div class="square"></div>
      <div class="square"></div>
    </div>
  </div>
</div>
```

:::info
`grid` დალაგების სისტემა, რომელსაც შემდგომ სტატიებში გავარჩევთ.
:::

### nth-of-type

[`:nth-of-type`](https://developer.mozilla.org/en-US/docs/Web/CSS/:nth-type-of) ფსევდო კლასი ამოიღებს ერთნაირი ტიპის ელემენტებს
გადაცემული ინდექსიდან გამომდინარე. მსგავსია `nth-child`-ისა გამოყენების.

```html preview
<ul>
  <li>პირველი ელემენტი</li>
  <li>მეორე ელემენტი</li>
  <li>მესამე ელემენტი</li>
  <li>მეოთხე ელემენტი</li>
</ul>
```

```css preview
ul li:nth-of-type(3) {
  color: red;
}

ul li:nth-of-type(even) {
  color: blue;
}
```

`:nth-child` უყურებს მთელ სტრუქტურასა (ითვლის ყველა ტიპის ელემენტს) ხოლო `nth-of-type` უყურებს მხოლოდ
მინიჭებული ტიპის ელემენტებს (აიგნორებს სხვა ელემენტებს).

მაგალითისთვის განვიხილოთ შემდეგი მაგალითი:

```html preview
<ul>
  <li>პირველი ელემენტი</li>
  <p>პარაგრაფი</p>
  <li>მეორე ელემენტი</li>
  <li>მესამე ელემენტი</li>
  <li>მეოთხე ელემენტი</li>
</ul>
```

```css preview
ul li:nth-of-type(2) {
  color: blue;
}

ul li:nth-child(2) {
  color: red;
}
```

რადგან მეორე ელემენტი იყო პარაგრაფის ტიპის `:nth-child`-ს ლოგიკა აღარ გავრცელდა მასზე,
ხოლო `:nth-of-type` ფსევდო კლასმა ამოიღო რიგით მეორე `li` ელემენტი.

## შეჯამება

ამ სტატიაში განვიხილეთ CSS-ის სელექტორების და ფსევდო კლასების გამოყენების ძირითადი პრინციპები,
ელემენტების შერჩევა კომბინატორებით, ელემენტის დასტილვა მომხარებლის ინტერაქციის დროს და სხვადასხვა სიტუაციური ფსევდო კლასები.
