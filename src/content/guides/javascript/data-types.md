---
title: 'მონაცემთა ტიპები'
description: 'მონაცემთა ტიპები: symbol, string, number, bigint, boolean, undefined, null, object'
keywords: 'symbol, string, number, bigint, boolean, undefined, null, object, array'
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

ყოველ პრიმიტიულ ტიპს, გარდა [`null`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/null), შეიძლება გაიტესტოს [`typeof`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof) ოპერატორით.

ყოველ პრიმიტიულ ტიპს, გარდა `null` და [`undefined`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined), შეფუთულნი არიან თავიან ობიექტში, რომელი სასარგებლო მეთოდებს გვთავაზობს,
პრიმიტიულ ტიპებთან მუშაობისთვის. როდესაც პირდაპირ მნიშვნელობას ვანიჭებთ პრიმიტიული ტიპის სახით, JavaScript ავტომატურად მოისაზრებს იმ ადგილას ობიექტს, რაც გვაძლევს შესაძლებლობას, რომ გამოვიყენოთ მათი მეთოდები და თვისებები.

| ტიპი                    | `typeof` დაბრუნებული შედეგი | შემფუთავი ობიექტი                                                                                   |
| ----------------------- | --------------------------- | --------------------------------------------------------------------------------------------------- |
| [null](#null)           | `"object"`                  | N/A                                                                                                 |
| [undefined](#undefined) | `"undefined"`               | N/A                                                                                                 |
| [boolean](#boolean)     | `"boolean"`                 | [Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean) |
| [number](#number)       | `"number"`                  | [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)   |
| [bigint](#number)       | `"bigint"`                  | [BigInt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/bigint)   |
| [string](#string)       | `"string"`                  | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/string)   |
| [symbol](#symbol)       | `"symbol"`                  | [Symbol](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/symbol)   |

## Null ტიპი

`null` ტიპს მხოლოდ ერთი მნიშვნელობა გააჩნია `null`. `null` შეგვიძლია წარმოვიდგინოთ მნიშვნელობა, რომელიც ვიცით, რაც უნდა იყოს მაგრამ მას გააჩნია არანაირი
მნიშვნელობა. უფრო ზუსტად, რომ ვთქვათ `null` მიუთითბს ობიექტის არ არსებობაზე.

## Undefined ტიპი

`undefined` ტიპს მხოლოდ ერთი მნიშვნელობა გააჩნია `undefined`. `undefined` მიუთითებს განუსაზღვრელობას. მეტწილადად JavaScript მნიშვნელობას ნაგულისხმევად ანიჭებს, `undefined`.
მაგალითები:

- [`return`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/return) [ქივორდით](https://developer.mozilla.org/en-US/docs/Glossary/Keyword), რომელსაც არ გააჩნია არანაირი მნიშვნელობა (`return;`) აბრუნებს `undefined`.
- [ფუნქცია](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions)/[მეთოდი](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Method_definitions), რომელსაც არ გააჩნია `return`, აბრუნებს `undefined`.
- ცვლადის ინიციალიზების დროს მნიშვნელობას თუ არ გავუწერთ(`let test;`), მას ავტომატურად მიენიჭება `undefined`.

## Boolean ტიპი

`boolean`(ბულის) ტიპის მნიშვნელობა, არის ლოგიკური ერთეული, რომელსაც გააჩნია მხოლოდ ორი მნიშვნელობა: `true`(ჭეშმარიტი) და `false`(მცდარი).

ბულის ტიპის მნიშვნელობები მეტწილადად გამოიყენება პირობითი ოპერატორების დროს, ასევე: [`ternary`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_operator), [`if...else`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/if...else) და სხვა შემთხვევებში.

## Number ტიპი

[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) ტიპი ინახავს რიცხვებს. მას შეუძლია შეინახოს დადებითი რიცხვები 2<sup>-1074</sup> ([`Number.MIN_VALUE`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/MIN_VALUE)) და 2<sup>1024</sup> ([`Number.MAX_VALUE`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/MAX_VALUE)) ინტერვალში, ასევე გვაქვს უარყოფითი რიცხვებისთვისაც ინტერვალი -2<sup>-1024</sup> და -2<sup>1024</sup>, თუმცა უსაფრთხოდ შეიძლება შევინახოთ მთელი რიცხვები შემდეგ ინტერვალში: -(2<sup>53</sup> - 1) ([`Number.MIN_SAFE_INTEGER`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/min_safe_integer)) დან 2<sup>53</sup> - 1 ([`Number.MAX_SAFE_INTEGER`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/max_safe_integer)) მდე. ამ ინტერვალის გარეთ JavaScript არ შეუძლია მთელი რიცხვების უსაფრთხოდ წარმოდგენა, ინტერვალის გარეთ წარმოადგენს, როგორც ათწილად რიცხვებს. თუ გსურთ რიცხვის შემოწმება, არის თუ არა უსაფრთხო ინტერვალში, შეგიძლიათ გამოიყენოთ [`Number.isSafeInteger()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isSafeInteger) მეთოდი.

მნიშვნელობები შემდეგ ინტერვალში ±(2<sup>-1074</sup> დან 2<sup>1024</sup> მდე), ავტომატურად გადაკეთდება:

- დადებითი რიცხვი, რომელიც მეტია [`Number.MAX_VALUE`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/MAX_VALUE)-ზე, გადაკეთდება, როგორც `+Infinity`.
- დადებითი რიცხვი, რომელიც ნაკლებია [`Number.MIN_VALUE`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/MIN_VALUE)-ზე, გადაკეთდებამ, როგორც `+0`.
- უარყოფითი რიცხვი, რომელიც ნაკლებია -[`Number.MAX_VALUE`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/MAX_VALUE)-ზე, გადაკეთდება, როგორც `-Infinity`.
- უარყოფითი რიცხვი, რომელიც მეტია -[`Number.MIN_VALUE`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/MIN_VALUE)-ზე, გადაკეთდებამ, როგორც `-0`.

`+Infinity` და `-Infinity` მოქმედებს მსგავსად, როგორც მათემატიკაში გვაქვს უსასრულობა, თუმცა მცირედი განსხვავებებით. იხილეთ მეტი დეტალებისთვის: [`Number.POSITIVE_INFINITY`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/positive_infinity) და [`Number.NEGATIVE_INFINITY`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/negative_infinity)

რიცხვით ტიპს გააჩნია ერთ მნიშვნელობა ბევრი წარმოდგენებით, მაგალითად: `0` შეიძლება წარმოვადგინოთ, როგორც `-0` და `+0`. პრაქტიკაში მათ არანაირი განსხვავება არ აქვთ წარმოდგენების დროს, მაგრამ განსხვავებას შეამჩნევთ ერთ მომენტში, როცა გვაქვს 0 ზე გაყოფა.

[`console.log`](https://developer.mozilla.org/en-US/docs/Web/API/console/log_static) არის [`console`](https://developer.mozilla.org/en-US/docs/Web/API/console) ობიექტის მეთოდი, რომელიც გამოიყენება იმისათვის, რომ ცვლადის მნიშვნელობა გავიგოთ.

```js
console.log(22 / +0); // Infinity
console.log(22 / -0); // -Infinity
```

[`NaN`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NaN) ("<b>N</b>ot <b>a</b> <b>N</b>umber") არის სპეციალური მნიშვნელობა, რომელიც ენიჭება რიცხვს მაშინ, როცა არითმეთიკული მოქმედება ვერ სრულდება. ასევე ის არის JavaScript-ში ერთადერთი მნიშვნელობა, რომელიც საკუთარ თავთან შედარებისას მცდარ შედეგს გვიბრუნებს.

## BigInt ტიპი

[BigInt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/bigint) ტიპი არის პრიმიტიული რიცხვითი ტიპი, რომელიც წარმოადგენს ისევ რიცხვს. `BigInt`-ით შესაძლებელია, უსაფრთხოდ შევინახოთ დიდი რიცხვები და მოქმედებები ჩვატაროთ მასზე, რომელიც ცდება უსაფრთხო ლიმიტს ([`Number.MAX_SAFE_INTEGER`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/MAX_VALUE)) რიცხვებისათვის.

`BigInt` იქმნება `n` დამატებით რიცხვის ბოლოს ან [`BigInt()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/MAX_VALUE) ფუნქციის გამოძახებით.

თითქმის ყველა ოპერატორი არის დაშვებული `BigInt`-თან მუშაობის დროს, რომლებიც არის: `+`, `-`, `*`, `**` და `%`, დაუშვებელია [`>>>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Unsigned_right_shift).

## String ტიპი

[`String`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) ტიპი წარმოადგენს ტექსტის მნიშვნელობას. თითოეულ სიმბოლოს `string`-ში, დაკავებული აქვს თავისი პოზიცია, ეს პოზიცია შესაძლებელია წარმოვადგინოთ, როგორც ინდექსები. ინდექსები არის ნატურალური რიცხვები. პირველი ინდექსი ყოველთვის არის `0` და მისი შემდეგი იზრდება `1`-ით. `string`-ის სიგრძე([`length`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/length)) წარმოადნგეს, მთელ რიცხვს, რომელიც ითვლის თუ რამდენი სიმბოლო არის ტექსტში. თუ გვსურს კონკრეტულ ინდექსზე მდგომი ელემენტის ამოღება, მაშინ მას უნდა მივწვდეთ `[]`(`Square brackets`) სიმბოლოს გამოყენებით, სადაც ჩავწერთ რიცხვს.

```js
const name = 'educata';
console.log(name[0]); // e
console.log(name[1]); // d
console.log(name.length); // 7
```

## Symbol ტიპი

[`Symbol`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/symbol) არის უნიკალური და შეუცვლელი პრიმიტიული ტიპი, რომელიც შესაძლებელია, გამოყენებული იქნას ობიექტის თვისების გასაღებად(`key`). ზოგ პროგრამულ ენაში, სიმბოლოებს ეძახიან ატომებს. მათი დანიშნულება არის უნიკალური `key`-ს შექმნა, რაც გარანტიას გვაძლევს, რომ თითოეული `key` იქნება უნიკალური, შედეგად კი ვღებულობთ, 1 `key` = 1 თვისებას.

## Object ტიპი

JavaScript-ში [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/object)-ები წარმოდგენილი არის, როგორც კოლექცია თვისებების. ობიექტის ტიპის იდეა არის, რომ შევინახოთ ერთი ტიპის ცვლადში, სხვადასხვა ტიპის მნიშვნელობები, სადაც თითოეულ მათგანს ექნება უნიკალური იდენტიფიკატორი(`key`). `key` შეიძლება წარმოვადგინოთ, როგორც [`string`](#string)-ით ან [`symbol`](#symbol)-ოთი. `key` საშუალებით შეგვიძლია, ამოვიღოთ შენახული თვისება ან მეთოდი (მეთოდი შესაძლებელია არ იყოს `key`-ზე მიბმული). უფრო დეტალურად ობიექტი განხილული იქნება:

- [ობიექტის თავში](./doc/guides/javascript/object-basics)
- [ობიექტის ცნობარში](./references/javascript/object)
