---
title: 'ფსევდო ელემენტები'
description: 'ფსევდო ელემენტების გამოყენება CSS-ში'
keywords: 'ფსევდო ელემენტი, ფსევდო ელემენტები'
---

ფსევდო ელემენტების საშუალებით შეგვიძლია დავამატოთ ახალი კონტენტი HTML-ში ან დავსტილოთ კონკრეტული ელემენტის ნაწილი.

## სინტაქსი

```css
selector::pseudo-element {
  property: value;
}
```

მაგალითისთვის, [`::first-line`](https://developer.mozilla.org/en-US/docs/Web/CSS/::first-line) შეიძლება გამოვიყენოთ ტექსტური ელემენტის
პირველი ხაზის შესაცვლელად.

```html preview
<p>ანგულარი არის პოპულარული ჯავასკრიპტის ფრეიმვორქი, რომლითაც მარტივად, სტრუქტურირებულად და მოქნილად შეგვიძლია ერთგვერდიანი ვებ აპლიკაციების (SPA - Single Page Application) შექმნა.</p>
```

```css preview
p::first-line {
  color: blue;
}
```

განსხვავებით [ფსევდო კლასებისგან](./doc/guides/html-css/selector-pseudo-classes), ფსევდო ელემენტებს
ორმაგი ორწერტილი სჭირდება. თუმცა ზოგიერთ ფსევდო ელემენტზე შესაძლებელია, ერთი ორწერტილის გამოყენება:
[`::before`](#before), [`::after`](#after), `::first-line` da [`::first-letter`](#first-letter).

:::info
კარგი სტრუქტურისთვის მიღებულია ორმაგი ორწერტილის გამოყენება (`::`).
:::

## სტრუქტურული ფსევდო ელემენტები

სტრუქტურული ფსევდო ელემენტები მსგავსია რეგულარული HTML ელემენტებისა, ისინიც ანალოგიური პრინციპით
მოთავსდებიან ყუთის მოდელში. მისი დასტილვა ანალოგიურია ჩვეულებრივი ელემენტის.

### before

[`::before`](https://developer.mozilla.org/en-US/docs/Web/CSS/::before) შექმნის ფსევდო ელეემნტს, რომელიც იქნება
პირველი შვილობილი ელემენტი მითითებულ თეგზე (ელემენტზე).

```html preview
<p>
  API-ის შესასწავლად შეგიძლიათ გამოიყენოთ
  <a href="https://everrest.educata.dev">EverREST-ის </a> ან <a href="https://dummyjson.com/">dummyjson-ის</a>სერვერი
</p>
```

```css preview
a::before {
  content: '🔗';
  color: #1890ff;
}
```

ამ შემთხვევაში `<a>` ელემენტში მოთავსდა ფსევდო ელემენტი `before`, რომლის კონტენტიც არის `🔗`.

:::info
ვებგვერდზე ნებისმიერი კონტენტის შესამოწმებლად შეგიძლიათ გამოიყენოთ დეველოპერული ხელსაწყოები. <!-- დალინკე ჩვენი სტატია, როცა დაიწერება -->
Windows-ის მომხარებლებმა შეგიძლიათ გამოიყენოთ შემდგომი მალსახმობი: <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>I</kbd> ან <kbd>F12</kbd>
ხოლო macOS-ის მომხარებლებმა: <kbd>⌘</kbd> + <kbd>⌥</kbd> + <kbd>I</kbd>.
დაათვალიერეთ `<a>` ელემენტის კონტენტი.
:::

### after

[`::after`](https://developer.mozilla.org/en-US/docs/Web/CSS/::after) ფსევდო ელემენტი მსგავსია [`::before`](#before)-ის თუმცა ამ შემთხვევაში
დამატებული ელემენტი იქნება ბოლო.

```html preview
<p>TODO სია:</p>
<ul>
  <li class="done">ვისწავლო HTML</li>
  <li class="done">ვისწავლო CSS</li>
  <li>ვისწავლო Git</li>
  <li>ვისწავლო JS</li>
  <li>ვისწავლო TS</li>
  <li>ვისწავლო Angular</li>
</ul>
```

```css preview
ul li.done::after {
  content: '✔';
  color: green;
}
```

### marker

[`::marker`](https://developer.mozilla.org/en-US/docs/Web/CSS/::marker) ფსევდო ელემენტი გამოიყენება სიის ელემენტებთან, რომელიც
განსაზღვრავს `<li>` ელემენტის სიმბოლოს.

მოდით გავაუმჯობესოთ წინა მაგალითის ვიზუალი:

```html preview
<p>TODO სია:</p>
<ul>
  <li class="done">ვისწავლო HTML</li>
  <li class="done">ვისწავლო CSS</li>
  <li>ვისწავლო Git</li>
  <li>ვისწავლო JS</li>
  <li>ვისწავლო TS</li>
  <li>ვისწავლო Angular</li>
</ul>
```

```css preview
ul li {
  padding-left: 5px;
}

ul li::marker {
  content: '⬜️';
}

ul li.done::marker {
  content: '✅';
}
```

:::info
მსგავს შემთხვევაში [`checkbox`](./doc/guides/html-css/form) ელემენტის გამოყენება უმჯობესია თუმცა
ამ მაგალითში განვიხილავთ ვიზუალურ მხარეს.
:::

## ზოგადი ფსევდო ელემენტები

### first-letter

[`::first-letter`](https://developer.mozilla.org/en-US/docs/Web/CSS/::first-letter) პირველ სიმბოლოს დასტილვაში გვეხამრება.

```html preview
<p>პარაგრაფის ელემენტი</p>
```

```css preview
p::first-letter {
  color: blue;
  font-size: 1.5rem;
}
```

### placeholder

[`::placeholder`](https://developer.mozilla.org/en-US/docs/Web/CSS/::placeholder) ფსევდო ელემენტი გამოიყენება ფორმის
`placeholder`-ის დასტილვისთვის.

```html preview
<input placeholder="თქვენი სახელი" id="name" />
```

```css preview
input::placeholder {
  color: red;
}
```

### selection

[`::selection`](https://developer.mozilla.org/en-US/docs/Web/CSS/::selection) ფსევდო ელემენტი გამოიყენება მონიშნული
ტექსტის დასასტილად.

```html preview
<p>მონიშნეთ ტექსტში ნებისმიერი ადგილი.</p>
```

```css preview
p::selection {
  color: red;
  background-color: yellow;
}
```

## შეჯამება

CSS-ში გვაქვს ბევრი ფსევდო ელემენტი, რომლის გამოყენებითაც შეგვიძლია დავამატოთ რეალური ელემენტი
ან დავასტილოთ კონკრეტული ელემენტის მნიშვნელობა. სრული ფსევდო ელემენტების სანახავად ეწვიეთ
[სტატიას](https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-elements#form-related_pseudo-elements).
