---
title: 'მონაცემთა ტიპები JavaScript-ში'
description: 'მონაცემთა ტიპები: symbol, string, number, bigint, boolean, undefined, null, object'
keywords: 'symbol, string, number, bigint, boolean, undefined, null, object, array'
headings:
  - symbol
---

ყოველ პროგრამირების ენას გააჩნია ჩაშენებული მონაცემთა ტიპები და სტრუქტურები, თუმცა ზოგჯერ ერთი ენის ტიპი განსხვავდება მეორე ენის ტიპისაგან.
ამ თავში განვიხილავთ ჩაშენებულ მონაცემთა ტიპებს JavaScript-ში.

## მკაცრად ტიპიზირებული vs არა მკაცრად ტიპიზირებული

JavaScript არის [დინამიური](https://en.wikipedia.org/wiki/Strong_and_weak_typing) ენა [დინამიური ტიპებით](https://en.wikipedia.org/wiki/Type_system#DYNAMIC). დინამიური ენა გულისხმობს, რომ ის არ არის მკაცრად ტიპიზირებული ენა, მასში აღწერილი ცვლადის ტიპის მნიშვნელობის შეცვლა შესაძლებელია თითქმის ყოველთვის.

```js
let anyValue = 22;
anyValue = 'ტესტ';
anyValue = true;
anyValue = null;
```

## პრიმიტიული მნიშვნელობები

ყოველი ტიპი გარდა [ობიექტისა](#object) არის პრ იმიტიული ტიპის მნიშვნელობები.

ყოველ პრიმიტიულ ტიპს, გარდა [`null`](./references/javascript/null), შეიძლება გაიტესტოს [`typeof`](./references/javascript/typeof) ოპერატორით.

ყოველ პრიმიტიულ ტიპს, გარდა `null` და [`undefined`](./references/javascript/undefined), შეფუთულნი არიან თავიან ობიექტში, რომელი სასარგებლო მეთოდებს გვთავაზობს,
პრიმიტიულ ტიპებთან მუშაობისთვის. როდესაც პირდაპირ მნიშვნელობას ვანიჭებთ პრიმიტიული ტიპის სახით, JavaScript ავტომატურად მოისაზრებს იმ ადგილას ობიექტს, რაც გვაძლევს შესაძლებლობას, რომ გამოვიყენოთ მათი მეთოდები და თვისებები.

| ტიპი                    | `typeof` დაბრუნებული შედეგი | შემფუთავი ობიექტი                          |
| ----------------------- | --------------------------- | ------------------------------------------ |
| [null](#null)           | `"object"`                  | N/A                                        |
| [undefined](#undefined) | `"undefined"`               | N/A                                        |
| [boolean](#boolean)     | `"boolean"`                 | [Boolean](./references/javascript/boolean) |
| [number](#number)       | `"number"`                  | [Number](./references/javascript/number)   |
| [bigint](#number)       | `"bigint"`                  | [BigInt](./references/javascript/BigInt)   |
| [string](#string)       | `"string"`                  | [String](./references/javascript/string)   |
| [symbol](#symbol)       | `"symbol"`                  | [symbol](./references/javascript/symbol)   |

## Null ტიპი

`null` ტიპს მხოლოდ ერთი მნიშვნელობა გააჩნია `null`. `null` შეგვიძლია წარმოვიდგინოთ მნიშვნელობა, რომელიც ვიცით, რაც უნდა იყოს მაგრამ მას გააჩნია არანაირი
მნიშვნელობა. უფრო ზუსტად, რომ ვთქვათ `null` მიუთითბს ობიექტის არ არსებობაზე.

## Undefined ტიპი

`undefined` ტიპს მხოლოდ ერთი მნიშვნელობა გააჩნია `undefined`. `undefined` მიუთითებს განუსაზღვრელობას. მეტწილადად JavaScript მნიშვნელობას ნაგულისხმევად ანიჭებს, `undefined`.
მაგალითები:

- [`return`](./references/javascript/return) ოპერატორით, რომელსაც არ გააჩნია არანაირი მნიშვნელობა (`return;`) აბრუნებს `undefined`.
- [ფუნქცია](./references/javascript/function)/[მეთოდი](./referencecs/method), რომელსაც არ გააჩნია `return`, აბრუნებს `undefined`.

<!-- DASAMTARVREBELIA -->
