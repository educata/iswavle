---
title: 'localStorage'
description: 'ლოკალური საცავი JavaScript-ში'
keywords: 'localStorage'
---

[`localStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) ეს არის ლოკალური საცავი კლიენტის მხარეს.
`localStorage` არის `window` ობიექტის თვისება.

## სად ინახება ინფორმაცია?

ინფორმაცია ინახება კლიენტის მხარეს. თითოეული შენახული ინფორმაცია საჯაროა მომხარებლისთვის და თავისფულად შეუძლია მისი
დამატება, დარედაქტირება ან წაშლა. მასში შენახული ინფორმაცია ინახება ლოკალურად მანამ, სანამ მას დეველოპერი ან მომხმარებელი არ წაშლის.
შენახული ინფორმაცია არ წაიშლება სესიის გათიშვის შემთხვევაშიც კი. ლოკალური საცავი ვრცელდება თითოეული ვებგვერდისთვის ერთხელ და ის საზიაროა
ყოველი სესიისთვის. მაგალითად: თუ გვაქვს გახსნილი ერთი ვვბგვერდი ორ ტაბში, მაშინაც კი `localStorage` საზიარო იქნება ორივე ტაბისთვის.

თითქმის ყველა ბრაუზერს გააჩნია ინტერფეისი, რომ ვმართოთ ლოკალური საცავის ინფორმაცია.

გახსენით inspect, შემდეგ application და მარცხენა მხარეს ჩამოშალეთ **localStorage**.

![localStorage-ის მაგალითი](./assets/images/localStorage.png)

## მეთოდები და თვისებები

`localStorage`-ს გააჩნია რამდენიმე მეთოდი, რომელიც დაგვეხმარება CRUD-ის ტიპის ოპერაციების შესრულებაში.

### localStorage

`localStorage` (ან `window.localStorage`) ცარიელი ობიექტის სახით გამოძახება და გვიბურნებს ყოველ შენახულ ინფორმაციას, რაც იმყოფება `localStorage`-ში.
დაბრუნებული მნიშვნელობა არის [`Storage`](https://developer.mozilla.org/en-US/docs/Web/API/Storage) ტიპის.

```js
console.log(localStorage);
```

### setItem

[`setItem`](https://developer.mozilla.org/en-US/docs/Web/API/Storage/setItem) არის მეთოდი, რომელიც ინფორმაციას დაამატებს საცავში. ის ღებულობს ორ პარამეტრს:

1. სახელს, რომელიც იქნება ტექსტური ტიპის.
2. მნიშვნელობას, რომელიც იქნება ტექსტური ტიპის.

```js
const data = {
  name: 'educata',
  age: 1,
  isActive: true,
};

localStorage.setItem('nothing', null); // null
localStorage.setItem('name', data.name); // 'educata'
localStorage.setItem('age', data.age); // '1'
localStorage.setItem('isActive', data.isActive); // true
localStorage.setItem('incorrectWay', data); // [object Object]
localStorage.setItem('correctWay', JSON.stringify(data)); // {"name":"educata","age":1,"isActive":true}
```

დამატებული ინფორმაციები გამოიყურება შემდეგნაირად:

| Key          | Value                                        |
| ------------ | -------------------------------------------- |
| age          | `1`                                          |
| correctWay   | `{"name":"educata","age":1,"isActive":true}` |
| incorrectWay | `[object Object]`                            |
| isActive     | `true`                                       |
| name         | `educata`                                    |
| nothing      | `null`                                       |

თუ მნიშვნელობა არ არის ტექსტური ტიპის, `setItem` ავტომატურად შეეცდება მის გადაკეთებას ტექსტურ მნიშვნელობაში, რადგანაც პირდაპირ ობიექტის შენახვა ვცადეთ,
ის გადააკეთა, როგორც `[object Object]`.
თუ მეხსიერებაში ერთი სახელის ქვეშ ობიექტის ან მასივის შენახვა გვინდა, მათი კონვერტაცია შეგვიძლია [`JSON`-ით](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON).

### getItem

[`getItem`](https://developer.mozilla.org/en-US/docs/Web/API/Storage/getItem) არის მეთოდი, რომელიც ინფორმაციას აბრუნებს ლოკალური საცავიდან,
ის ღებულობს ერთ პარამეტრს, `key` დასახელებას, რომელიც იქნება ტექსტური ტიპის.

```js
console.log(localStorage.getItem('name')); // 'educata'
console.log(localStorage.getItem('text')); // null
```

თუ ინფორმაცია ვერ მოიძებნა - აბრუნებს `null`-ს.

:::info
რადგან `localStorage` არის ობიექტი, პირდაპირაც შეგიძლიათ არსებული მნიშვნელობის ამოღება `getItem` მეთოდის გარეშე.
მაგ: `localStorage.name` ან `localStorage['name']`.
:::

### length

[`length`](https://developer.mozilla.org/en-US/docs/Web/API/Storage/length) არის თვისება, რომელიც აბრუნებს საცავში არსებული ველების რაოდენობას.

```js
console.log(localStorage.length); // 6
```

### key

[`key`](https://developer.mozilla.org/en-US/docs/Web/API/Storage/key) არის მეთოდი, რომელიც ღებულობს ინდექსს და აბრუნებს ამ ინდექსზე მდგომ ინფორმაციის სახელს (key) საცავიდან.

```js
console.log(localStorage.key(0)); // 'correcrtWay'
console.log(localStorage.key(10)); // null
```

თუ ინდექსზე არაფერი არ არის, მაშინ დააბრუნებს `null`-ს.

### removeItem

[`removeItem`](https://developer.mozilla.org/en-US/docs/Web/API/Storage/removeItem) არის მეთოდი, რომელიც ღებულობს key მნიშვნელობას და მის მიხედვით საცავიდან წაშლის ელემენტს.

```js
console.log(localStorage.removeItem('nothing'));
```

### clear

[`clear`](https://developer.mozilla.org/en-US/docs/Web/API/Storage/clear) არის მეთოდი, რომელიც პარამეტრად არაფერს ღებულობს და ასუფთავებს მთლიან საცავს.

```js
console.log(localStorage.clear());
```

## შეჯამება

`localStorage` არის `window` ობიექტის თვისება, რომელიც გვთავაზობს ლოკალურ საცავს კლიენტის მხარეს. ინფორმაცია ინახება მანამ, სანამ მას კლიენტი ან თვითონ აპლიკაციის კოდი არ წაშლის.
`localStorage` გვთავაზობს სრულფასოვან CRUD-ის ტიპის ოპერაციების მეთოდებს. ლოკალური საცავის ხილვა შეუძლია ყველას, ამიტომ მასში სენსიტიური ტიპის ინფორმაცია
არ უნდა შევინახოთ.
