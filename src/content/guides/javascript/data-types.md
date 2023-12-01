---
title: 'მონაცემთა ტიპები JavaScript-ში'
description: 'მონაცემთა ტიპები: symbol, string, number, bigint, boolean, undefined, null, object'
keywords: 'symbol, string, number, bigint, boolean, undefined, null, object, array'
headings:
  - მკაცრად ტიპიზირებული vs არა მკაცრად ტიპიზირებული
  - პრიმიტიული მნიშვნელობები
  - Null ტიპი
  - Undefined ტიპი
  - Boolean ტიპი
  - Number ტიპი
  - BigInt ტიპი
  - String ტიპი
  - Symbol ტიპი
  - Object ტიპი
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
| [bigint](#number)       | `"bigint"`                  | [BigInt](./references/javascript/bigInt)   |
| [string](#string)       | `"string"`                  | [String](./references/javascript/string)   |
| [symbol](#symbol)       | `"symbol"`                  | [Symbol](./references/javascript/symbol)   |

## Null ტიპი

`null` ტიპს მხოლოდ ერთი მნიშვნელობა გააჩნია `null`. `null` შეგვიძლია წარმოვიდგინოთ მნიშვნელობა, რომელიც ვიცით, რაც უნდა იყოს მაგრამ მას გააჩნია არანაირი
მნიშვნელობა. უფრო ზუსტად, რომ ვთქვათ `null` მიუთითბს ობიექტის არ არსებობაზე.

## Undefined ტიპი

`undefined` ტიპს მხოლოდ ერთი მნიშვნელობა გააჩნია `undefined`. `undefined` მიუთითებს განუსაზღვრელობას. მეტწილადად JavaScript მნიშვნელობას ნაგულისხმევად ანიჭებს, `undefined`.
მაგალითები:

- [`return`](./references/javascript/return) [ქივორდით](./references/javascript/keywords), რომელსაც არ გააჩნია არანაირი მნიშვნელობა (`return;`) აბრუნებს `undefined`.
- [ფუნქცია](./references/javascript/function)/[მეთოდი](./referencecs/method), რომელსაც არ გააჩნია `return`, აბრუნებს `undefined`.
- ცვლადის ინიციალიზების დროს მნიშვნელობას თუ არ გავუწერთ(`let test;`), მას ავტომატურად მიენიჭება `undefined`.

## Boolean ტიპი

`boolean`(ბულის) ტიპის მნიშვნელობა, არის ლოგიკური ერთეული, რომელსაც გააჩნია მხოლოდ ორი მნიშვნელობა: `true`(ჭეშმარიტი) და `false`(მცდარი).

ბულის ტიპის მნიშვნელობები მეტწილადად გამოიყენება პირობითი ოპერატორების დროს, ასევე: [`ternary`](./references/javascript/ternary), [`if...else`](./references/javascript/if...else) და სხვა შემთხვევებში.

## Number ტიპი

[Number](./references/javascript/number) ტიპი ინახავს რიცხვებს. მას შეუძლია შეინახოს დადებითი რიცხვები 2<sup>-1074</sup> ([`Number.MIN_VALUE`](./references/javascript/number/min_value)) და 2<sup>1024</sup> ([`Number.MAX_VALUE`](./references/javascript/number/max_value)) ინტერვალში, ასევე გვაქვს უარყოფითი რიცხვებისთვისაც ინტერვალი -2<sup>-1024</sup> და -2<sup>1024</sup>, თუმცა უსაფრთხოდ შეიძლება შევინახოთ მთელი რიცხვები შემდგომ ინტერვალში: -(2<sup>53</sup> - 1) ([`Number.MIN_SAFE_INTEGER`](./references/javascript/min_safe_integer)) დან 2<sup>53</sup> - 1 ([`Number.MAX_SAFE_INTEGER`](./references/javascript/max_safe_integer)) მდე. ამ ინტერვალის გარეთ JavaScript არ შეუძლია მთელი რიცხვების უსაფრთხოდ წარმოდგენა, ინტერვალის გარეთ წარმოადგენს, როგორც ათწილად რიცხვებს. თუ გსურთ რიცხვის შემოწმება, არის თუ არა უსაფრთხო ინტერვალში, შეგიძლიათ გამოიყენოთ [`Number.isSafeInteger()`](./references/javascript/number/isSafeInteger) მეთოდი.

მნიშვნელობები შემდგომ ინტერვალში ±(2<sup>-1074</sup> დან 2<sup>1024</sup> მდე), ავტომატურად გადაკეთდება:

- დადებითი რიცხვი, რომელიც მეტია [`Number.MAX_VALUE`](./references/javascript/number/max_value)-ზე, გადაკეთდება, როგორც `+Infinity`.
- დადებითი რიცხვი, რომელიც ნაკლებია [`Number.MIN_VALUE`](./references/javascript/number/min_value)-ზე, გადაკეთდებამ, როგორც `+0`.
- უარყოფითი რიცხვი, რომელიც ნაკლებია -[`Number.MAX_VALUE`](./references/javascript/number/max_value)-ზე, გადაკეთდება, როგორც `-Infinity`.
- უარყოფითი რიცხვი, რომელიც მეტია -[`Number.MIN_VALUE`](./references/javascript/number/min_value)-ზე, გადაკეთდებამ, როგორც `-0`.

`+Infinity` და `-Infinity` მოქმედებს მსგავსად, როგორც მათემატიკაში გვაქვს უსასრულობა, თუმცა მცირედი განსხვავებებით. იხილეთ მეტი დეტალებისთვის: [`Number.POSITIVE_INFINITY`](./references/javascript/number/positive_infinity) და [`Number.NEGATIVE_INFINITY`](./references/javascript/number/negative_infinity)

რიცხვით ტიპს გააჩნია ერთ მნიშვნელობა ბევრი წარმოდგენებით, მაგალითად: `0` შეიძლება წარმოვადგინოთ, როგორც `-0` და `+0`. პრაქტიკაში მათ არანაირი განსხვავება არ აქვთ წარმოდგენების დროს, მაგრამ განსხვავებას შეამჩნევთ ერთ მომენტში, როცა გვაქვს 0 ზე გაყოფა.

[`console.log`](./references/javascript/console/log) არის [`console`](./references/javascript/console) ობიექტის მეთოდი, რომელიც გამოიყენება იმისათვის, რომ ცვლადის მნიშვნელობა გავიგოთ.

```js
console.log(22 / +0); // Infinity
console.log(22 / -0); // -Infinity
```

[`NaN`](./references/javascript/nan) ("<b>N</b>ot <b>a</b> <b>N</b>umber") არის სპეციალური მნიშვნელობა, რომელიც ენიჭება რიცხვს მაშინ, როცა არითმეთიკული მოქმედება ვერ სრულდება. ასევე ის არის JavaScript-ში ერთადერთი მნიშვნელობა, რომელიც საკუთარ თავთან შედარებისას მცდარ შედეგს გვიბრუნებს.

## BigInt ტიპი

[BigInt](./references/javascript/bigint) ტიპი არის პრიმიტიული რიცხვითი ტიპი, რომელიც წარმოადგენს ისევ რიცხვს. `BigInt`-ით შესაძლებელია, უსაფრთხოდ შევინახოთ დიდი რიცხვები და მოქმედებები ჩვატაროთ მასზე, რომელიც ცდება უსაფრთხო ლიმიტს ([`Number.MAX_SAFE_INTEGER`](./references/javascript/number/max_safe_integer)) რიცხვებისათვის.

`BigInt` იქმნება `n` დამატებით რიცხვის ბოლოს ან [`BigInt()`](./references/javascript/bigint) ფუნქციის გამოძახებით.

თითქმის ყველა ოპერატორი არის დაშვებული `BigInt`-თან მუშაობის დროს, რომლებიც არის: `+`, `-`, `*`, `**` და `%`, დაუშვებელია [`>>>`](./references/javascript/operators/unsigned_right_shift).

## String ტიპი

[`String`](./references/javascript/string) ტიპი წარმოადგენს ტექსტის მნიშვნელობას. თითოეულ სიმბოლოს `string`-ში, დაკავებული აქვს თავისი პოზიცია, ეს პოზიცია შესაძლებელია წარმოვადგინოთ, როგორც ინდექსები. ინდექსები არის ნატურალური რიცხვები. პირველი ინდექსი ყოველთვის არის `0` და მისი შემდგომი იზრდება `1`-ით. `string`-ის სიგრძე([`length`](./references/javascript/string/length)) წარმოადნგეს, მთელ რიცხვს, რომელიც ითვლის თუ რამდენი სიმბოლო არის ტექსტში. თუ გვსურს კონკრეტულ ინდექსზე მდგომი ელემენტის ამოღება, მაშინ მას უნდა მივწვდეთ `[]`(`Square brackets`) სიმბოლოს გამოყენებით, სადაც ჩავწერთ რიცხვს.

```js
const name = 'educata';
console.log(name[0]); // e
console.log(name[1]); // d
console.log(name.length); // 7
```

## Symbol ტიპი

[`Symbol`](./references/javascript/symbol) არის უნიკალური და შეუცვლელი პრიმიტიული ტიპი, რომელიც შესაძლებელია, გამოყენებული იქნას ობიექტის თვისების გასაღებად(`key`). ზოგ პროგრამულ ენაში, სიმბოლოებს ეძახიან ატომებს. მათი დანიშნულება არის უნიკალური `key`-ს შექმნა, რაც გარანტიას გვაძლევს, რომ თითოეული `key` იქნება უნიკალური, შედეგად კი ვღებულობთ, 1 `key` = 1 თვისებას.

## Object ტიპი

JavaScript-ში [`Object`](./references/javascript/object)-ები წარმოდგენილი არის, როგორც კოლექცია თვისებების. ობიექტის ტიპის იდეა არის, რომ შევინახოთ ერთი ტიპის ცვლადში, სხვადასხვა ტიპის მნიშვნელობები, სადაც თითოეულ მათგანს ექნება უნიკალური იდენტიფიკატორი(`key`). `key` შეიძლება წარმოვადგინოთ, როგორც [`string`](#string)-ით ან [`symbol`](#symbol)-ოთი. `key` საშუალებით შეგვიძლია, ამოვიღოთ შენახული თვისება ან მეთოდი (მეთოდი შესაძლებელია არ იყოს `key`-ზე მიბმული). უფრო დეტალურად ობიექტი განხილული იქნება:

- [ობიექტის თავში](./guides/javascript/object)
- [ობიექტის ცნობარში](./references/javascript/object)
