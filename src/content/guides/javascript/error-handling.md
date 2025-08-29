---
title: 'შეცდომების კონტროლი'
description: 'შეცდომების გაკონტროლება JavaScript-ში'
keywords: 'try, catch, error'
---

აპლიკაცია შეცდომების გარეშე არ არსებობს. შესაძლებელია კონკრეტულად აპლიკაციის შიგნით არ ხდებოდეს შეცდომა თუმცა გარე რესურსებიდან დაფიქსირდეს შეცდომა ან სრულიადაც ინტერნეტ კავშირის გამო წარმოიქმნას შეცდომა.

## try-catch

[`try...catch`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch) ეს არის შეცდომების კონტროლის ბლოკი. ბლოკის იდეა მდგომარეობს იმაში, რომ გაუშვას კოდი, შეცდომის შემთხვევაში კი კოდის გაშვება გადაიტანოს სხვა ბლოკში არსებული შეცდომით.

```js
try {
  let something = null;
  something.value = 'abc';
  console.log(something);
} catch (error) {
  console.log(error.message); // Cannot set properties of null (setting 'value')
}
```

მაგალითში აშკარად ჩანს შეცდომა, თავდაპირველად `something` ვანიჭებთ `null`, შემდგომ კი ვცდილობთ `null`-ში `value` თვისებას შევუცვალოთ მნიშვნელობა, რაც ვერ მოხერხდება. `try...catch` ბლოკმა დაიჭირა არსებული შეცდომა, შეწყვიტა კოდის გაგრძელება იმ ბლოკში და გადაინაცვლა `catch`-ს მხარეს, სადაც ვლოგავთ შეცდომის მესიჯს.

## Error

[`Error`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error) ობიექტი გამოიყენება შეცდომების დეტალურად აღწერისთვის. `Error` ობიექტის გამოძახება ხდება ავტომატურად, როცა კოდში შეცდომა დაფიქსირდება. ობიექტს გააჩნია შემდგომი თვისებები:

- [`message`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/message) - შეცდომის მესიჯი.
- [`name`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/name) - შეცდომის დასახელება. `Error` ეს არის ზოგადი შეცდომა თუმცა ასევე გვაქვს: [`TypeError`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypeError), [`SyntaxError`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/SyntaxError).
- [`cause`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/cause) - მიზეზი თუ რის გამო მოხდა შეცდომა.
- [`stack`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/stack) - სტეკი თუ სად მოხდა შეცდომა.

## როგორ გავაკონტროლოთ შეცდომა ?

მაგალითისთვის განვიხილოთ ჯამის ფუნქცია. ფუნქცია პარამეტრად ღებულობს ორ რიცხვს და აბრუნებს მათ ჯამს. ერთის მხრივ მარტივი ფუნქცია ჩანს მაგრამ არასწორად აღწერის შემთხვევაში შესაძლებელია შეცდომა დავუშვათ.

```js
function sum(a, b) {
  return a + b;
}

console.log(sum(2, 2)); // 4
console.log(sum(2, '2')); // 22
```

მაგალითიში `sum` ფუნქცია ღებულობს ორ ნებისმიერი ტიპის მნიშვნელობას, რის მიხედვითაც შეეცდება ჯამის მნიშვნელობის დაბრუნებას. ფუნქციის გამოყენების დროს, შესაძლებელია პარამეტრი არასწორად გადავცეთ, რაც დაგვიბრუენბს არასწორ მნიშვნელობას.

```js
function sum(a, b) {
  if (typeof a !== 'number' || typeof b !== 'number') {
    throw new Error('Both arguments must be numbers.', {
      cause: 'InvalidArgument',
    });
  }
  return a + b;
}

console.log(sum(2, 2)); // 4
console.log(sum(2, '2')); // Error: Both arguments must be numbers.
```

ამ შეთხვევაში უკვე კოდი არასწორი ტიპის მნიშვნელობას აღარ დააჯამებს და დააბრუნებს შეცდომას. [`throw`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/throw) ქივორდის გამოყენების შემთხვევაში ვუშვებთ შეცდომას. [`new`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/new) ქივორდის გამოყენებით გამოვყოფბთ ახალ ინსტანციას `Error`-ს ობიექტიდან (`new` ქივორდი, განხილულია [`OOP სტატიაში`](./doc/guides/javascript/oop)), რომელსაც პარამეტრად გავაყოლეთ მესიჯი და მიზეზი (`cause` შეიძლება ნებისმიერი ტიპის მნიშვნელობა იყოს: რიცხვი, სტრინგი, ობიექტი და ა.შ).

განვიხილოთ შეცდომის გაკონტროლება:

```js
function sum(a, b) {
  if (typeof a !== 'number' || typeof b !== 'number') {
    throw new Error('Both arguments must be numbers.', {
      cause: 'InvalidArgument',
    });
  }
  return a + b;
}

try {
  console.log(sum(2, 2)); // 4
  console.log(sum(2, '2')); // Error: Both arguments must be numbers.
} catch (error) {
  console.error(error.message); // Both arguments must be numbers.
  console.error(error.cause); // InvalidArgument
}
```

`try...catch` ბლოკში მოთავსებით შეცდომა აღარ გააჩერებს აპლიკაციის კოდის გაშვებას, ამავდროულად გვაქვს შესაძლებლობა ეს შეცდომა ვაჩვენოთ მომხარებელს. ხშირ შემთხვევაში `cause`-ში იწერება შეცდომის კოდი, რაც შემდგომ [ინტერნაციონალიზაციის](https://iswavle.com/doc/guides/angular/internationalization) დროს გამოჩნდება სწორ ენაზე.

მცირედი მოდიფიცირებით შეგვიძლია ფუნქცია მივაღებინოთ არა 2 მნიშვნელობა არამედ, რამდენიც გვსურს.

```js
function sum(...args) {
  let sum = 0;
  for (const number of args) {
    if (typeof number !== 'number') {
      throw new Error('All argument should be number', {
        cause: { code: 'error.invalid_number', args: [number] },
      });
    }
    sum += number;
  }
  return sum;
}

try {
  console.log(sum(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)); // 55
  console.log(sum(2, '2')); // Error: All argument should be number
} catch (error) {
  console.error(error.message); // All argument should be number
  console.error(error.cause); // { code: 'error.invalid_number', args: [ '2' ] }
}
```

## შეჯამება

კარგია პრაქტიკაში თუ ფუნქციებში განსაზღვრავთ შესაძლო შეცდომებს და ასევე საეჭვო (ისეთი კოდი, რომელმაც შესაძლოა შეცდომა გამოიწვიოს) კოდებს მოათავსებთ `try...catch` ბლოკში.
