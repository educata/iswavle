---
title: 'sessionStorage'
description: 'სესიური საცავი JavaScript-ში'
keywords: 'sessionStorage'
---

[`sessionStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage) ეს არის სესისური საცავი კლიენტის მხარეს. ის თითქმის
[ლოკალური საცავის](./doc/guides/javascript/window/storages/local) ანალოგიურია.

## სად ინახება ინფორმაცია?

ინფორმაცია ინახება კლიენტის მხარეს. თითოეული შენახული ინფორმაცია საჯაროა მომხარებლისთვის და თავისფულად შეუძლია მისი
დამატება, დარედაქტირება ან წაშლა. მასში შენახული ინფორმაცია ინახება ლოკალურად მანამ, სანამ მას მომხარებელი ან დეველოპერი არ წაშლის, ან სანამ სესია არ გაითიშება.
შენახული ინფორმაცია წაიშლება მაშინ, როგორც კი სესია დამთავრდება. სესიაში იგულისხმება ვებგვერდის ტაბში გახსნა. ერთ ტაბში გახსნაში იგულისხმება ერთი სესია.
შესაბამისად, თითოეულ ტაბს თავისი უნიკალური სესიის საცავი აქვს.

თითქმის ყველა ბრაუზერს გააჩნია ინტერფეისი, რომ ვიხილოთ სესიური საცავის ინფორმაცია.

გახსენით inspect, შემდგომ application და მარცხენა მხარეს ჩამოშალეთ **sessionStorage**.

![sessionStorage-ს მაგალითი](./assets/images/sessionStorage.png)

## მეთოდები და თვისებები

`sessionStorage`-ს გააჩნია რამდენიმე მეთოდი, რომელიც დაგვეხმარება CRUD-ის ტიპის ოპერაციების შესრულებაში.

### sessionStorage

`sessionStorage` (ან `window.sessionStorage`) ცარიელი ობიექტის სახით გამოძახება და გვიბურნებს ყოველ შენახულ ინფორმაციას, რაც იმყოფება `sessionStorage`-ში.
დაბრუნებული მნიშვნელობა არის [`Storage`](https://developer.mozilla.org/en-US/docs/Web/API/Storage) ტიპის.

```js
console.log(sessionStorage);
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

sessionStorage.setItem('nothing', null); // null
sessionStorage.setItem('name', data.name); // 'educata'
sessionStorage.setItem('age', data.age); // '1'
sessionStorage.setItem('isActive', data.isActive); // true
sessionStorage.setItem('incorrectWay', data); // [object Object]
sessionStorage.setItem('correctWay', JSON.stringify(data)); // {"name":"educata","age":1,"isActive":true}
```

დამატებული ინფორმაცია შემდეგნაირად გამოიყურება:

| Key          | Value                                        |
| ------------ | -------------------------------------------- |
| age          | `1`                                          |
| correctWay   | `{"name":"educata","age":1,"isActive":true}` |
| incorrectWay | `[object Object]`                            |
| isActive     | `true`                                       |
| name         | `educata`                                    |
| nothing      | `null`                                       |

თუ მნიშვნელობა არ არის ტექსტური ტიპის, `setItem` ავტომატურად შეეცდება მის გადაკეთებას ტექსტურ მნიშვნელობაში, რადგანაც პირდაპირ ობიექტის შენახვა ვცადეთ,
ის გადააკეთა, როგორც `[object Object]`. თუ ობიექტის ან მასივის ტიპის ინფორმაციის შენახვა გვსურს, შეგვიძლია ისინი დავაკონვერტიროთ [`JSON`-ით](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON).

### getItem

[`getItem`](https://developer.mozilla.org/en-US/docs/Web/API/Storage/getItem) არის მეთოდი, რომელიც ინფორმაციას აბრუნებს სესიური საცავიდან.
ის ღებულობს ერთ პარამეტრს, `key` დასახელებით, რომელიც იქნება ტექსტური ტიპის.

```js
console.log(sessionStorage.getItem('name')); // 'educata'
console.log(sessionStorage.getItem('text')); // null
```

თუ ინფორმაცია ვერ მოიძებნა, აბრუნებს `null`-ს.

:::info
რადგან `sessionStorage` არის ობიექტი, პირდაპირაც შეგიძლიათ არსებული მნიშვნელობის ამოღება `getItem` მეთოდის გარეშე.
მაგ: `sessionStorage.name` ან `sessionStorage['name']`.
:::

### length

[`length`](https://developer.mozilla.org/en-US/docs/Web/API/Storage/length) არის თვისება, რომელიც აბრუნებს საცავში არსებული ველების რაოდენობას.

```js
console.log(sessionStorage.length); // 6
```

### key

[`key`](https://developer.mozilla.org/en-US/docs/Web/API/Storage/key) არის მეთოდი, რომელიც ღებულობს ინდექსს და აბრუნებს ამ ინდექსზე მდგომ ველის სახელს (key) საცავიდან.

```js
console.log(sessionStorage.key(0)); // 'correcrtWay'
console.log(sessionStorage.key(10)); // null
```

თუ ინდექსზე არაფერი არ არის, მაშინ დააბრუნებს `null`-ს.

### removeItem

[`removeItem`](https://developer.mozilla.org/en-US/docs/Web/API/Storage/removeItem) არის მეთოდი, რომელიც ღებულობს key მნიშვნელობას და მის მიხედვით საცავიდან წაშლის ელემენტს.

```js
console.log(sessionStorage.removeItem('nothing'));
```

### clear

[`clear`](https://developer.mozilla.org/en-US/docs/Web/API/Storage/clear) არის მეთოდი, რომელიც პარამეტრად არაფერს ღებულობს და ასუფთავებს მთლიან საცავს.

```js
console.log(sessionStorage.clear());
```

## შეჯამება

`sessionStorage` არის `window` ობიექტის თვისება, რომელიც გვთავაზობს სესიურ საცავს კლიენტის მხარეს. ინფორმაცია ინახება მანამ, სანამ მას კლიენტი არ წაშლის, ან გათიშავს სესიას.
`sessionStorage` გვთავაზობს სრულფასოვან CRUD-ის ტიპის ოპერაციების მეთოდებს. სესიური საცავის ხილვა შეუძლია ყველას, ამიტომ მასში სენსიტიური ტიპის ინფორმაცია
არ უნდა შევინახოთ.
