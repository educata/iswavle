---
title: 'Date ობიექტი'
description: 'Date ობიექტი JavasScript-ში'
keywords: 'Date, დროის ობიექტი, Date object'
---

დროებთან მუშაობისთვის გამოიყენება [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) ობიექტი.

## Date

JavaScript `Date` ობიექტის დროის მნიშვნელობას ინახავს მილიწამებში 1970 წლის 1 იანვრიდან. ეს არის Unix-ს სტანდარტი. ამრიგად შეგვიძლია მილიწამების გამოყენებითაც კი მივიღოთ ზუსტი დროის მნიშვნელობა.

## Date ობიექტის შექმნა

`Date` ობიექტის შექსამნელად საჭიროა `new Date()`-ს კონსტრუქტორის გამოყენება, რომელიც დააბრუნებს ლოკალური მოწყობილობის (თქვენი მოწყობილობის) დროს.

`Date`-ს ობიექტზე კონკრეტული დროსი მიწოდება შეგვიძლია 9 გზით:

```js
new Date(); // ცარიელი ანუ ამჟამინდელი დრო
new Date(date string); // გადაცემული სტრინგის მიხედვით
new Date(year, month); // წელიწადის და თვის მიხედვით
new Date(year, month, day); // წელიწადის, თვის და დღის მიხედვით
new Date(year, month, day, hours); // წელიწადის, თვის, დღის და საათის მიხედვით
new Date(year, month, day, hours, minutes); // წელიწადის, თვის, დღის, საათის და წუთის მიხედვით
new Date(year, month, day, hours, minutes, seconds); // წელიწადის, თვის, დღის, საათის, წუთის და წამების მიხედვით
new Date(year, month, day, hours, minutes, seconds, ms); // წელიწადის, თვის, დღის, საათის, წუთის, წამების  და მილი წამების მიხედვით
new Date(ms); // მილიწამების მიხედვით
```

<iframe data-url="guides/javascript-current-date" data-title="ამჟამინდელი დრო" data-height="40"></iframe>

გამოსახული დრო იგივეა, რაც `Date.toString()` მეთოდის გამოძახება, რომელსაც გამოაქვს სრული ინფორმაცია: კვირის დღე, თვე, რიცხვი, წელიწადი, საათი, წუთი, წამი, GMT-ს მნიშვნელობა.

## Date-ს მეთოდები

`Date`-ს გააჩნია ბევრი კარგი მეთოდი, რომლის მიხედვითაც შეგვიძლია გავიგოთ: წელიწადი, თვე, რიცხვი, საათი და სხვა ბევრი მნიშვნელობა. ეს ყოველი დაბრუნებული მნიშვნელობა შეიძლება წარმოვადგინოთ ორი სახით:

1. ლოკალური დროით.
2. UTC დროით.

ლოკალური დრო იდენტურია თქვენი მოწყობილობის, ხოლო UTC (Coordinated Universal Time) დრო გულისხმობს ნულოვანი GMT-ს მნიშვნელობას.

მაგალითად: საქართველო +0400 არის ანუ 4 საათით წინ ვართ ნულოვანი GMT-ს მნიშვნელობიდან. იხილეთ GMT-ს მნიშვნელობები ამ [ბმულზე](https://en.wikipedia.org/wiki/List_of_time_zones_by_country).

მარტივი ცხრილი დროის მიღების და მნიშვნელობის დაყენების:

### Get მეთოდები

| მნიშვნელობა   | Local                                                                                                                        | UTC                                                                                                                                |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| წელიწადი      | [`getFullYear()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getFullYear)         | [`getUTCFullYear()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getUTCFullYear)         |
| თვე           | [`getMonth()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getMonth)               | [`getUTCMonth()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getUTCMonth)               |
| რიცხვი (თვის) | [`getDate()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getDate)                 | [`getUTCDate()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getUTCDate)                 |
| საათი         | [`getHours()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getHours)               | [`getUTCHours()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getUTCHours)               |
| წუთი          | [`getMinutes()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getMinutes)           | [`getUTCMinutes()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getUTCMinutes)           |
| წამი          | [`getSeconds()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getSeconds)           | [`getUTCSeconds()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getUTCSeconds)           |
| მილიწამი      | [`getMilliseconds()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getMilliseconds) | [`getUTCMilliseconds()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getUTCMilliseconds) |
| კვირის დღე    | [`getDay()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getDay)                   | [`getUTCDay()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getUTCDay)                   |

### Set მეთოდები

| მნიშვნელობა   | Local                                                                                                                        | UTC                                                                                                                                |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| წელიწადი      | [`setFullYear()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/setFullYear)         | [`setUTCFullYear`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/setUTCFullYear)           |
| თვე           | [`setMonth()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/setMonth)               | [`setUTCMonth()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/setUTCMonth)               |
| რიცხვი (თვის) | [`setDate()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/setDate)                 | [`setUTCDate()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/setUTCDate)                 |
| საათი         | [`setHours()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/setHours)               | [`setUTCHours()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/setUTCHours)               |
| წუთი          | [`setMinutes()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/setMinutes)           | [`setUTCMinutes()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/setUTCMinutes)           |
| წამი          | [`setSeconds()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/setSeconds)           | [`setUTCSeconds`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/setUTCSeconds)             |
| მილიწამი      | [`setMilliseconds()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/setMilliseconds) | [`setUTCMilliseconds()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/setUTCMilliseconds) |

## Date სტრინგის ფორმატი

თარიღის სტრინგად ფორმატირებისთვის ბევრი გზა არსებობს. JavaScript იყენებს მხოლოდ ერთ ფორმატს თარიღის გამოსატანად:

```
YYYY-MM-DDTHH:mm:ss.sssZ
```

- `YYYY` - წელიწადის მნიშვნელობა, რომელიც გამოისახება 4 ციფრით (`0000`-დან `9999`-მდე).
- `MM` - თვის მნიშვნელობა, რომელიც გამოისახება 2 ციფრით (`01`-დან `12`-მდე), ნაგულისხმევად არის `01`.
- `DD` - თვის რიცხვის მნიშვნელობა, რომელიც გამოისახება 2 ციფრით (`01`-დან `31`-მდე), ნაგულისხმევად არის `01`.
- `T` - არის უბრალოდ სიმბოლო, რომელიც გამოიყენება გულისხმობს, რომ მის შემდგომ დაიწყება დროის მნიშვნელობა. საჭიროა როცა დროის გამოყენება გვსურს.
- `HH` - საათის მნიშვნელობა, რომელიც გამოისახება 2 ციფრით (`00`-დან `23`-მდე), ნაგულისხმევად არის `00`.
- `mm` - წუთების მნიშვნელობა, რომელიც გამოისახება 2 ციფრით (`00`-დან `59`-მდე), ნაგლისხმევად არის `00`.
- `ss` - წამების მნიშვნელობა, რომელიც გამოისახება 2 ციფრით (`00`-დან `59`-მდე), ნაგლისხმევად არის `00`.
- `sss` - მილი წამების მნიშვნელობა, რომელიც გამოისახება 3 ციფრით (`000`-დან `999`-მდე), ნაგლისხმევად არის `000`.
- `z` - GMT-ს დროის მნიშვნელობა.

შესაძლებელია რამოდენიმე მნიშვნელობა გამოვაკლოთ სრულ სტრინგის ფორმატს და მივიღოთ შემდგომი ფორმატები:

- მხოლოდ თარიღი: `YYYY`, `YYYY-MM`, `YYYY-MM-DD`.
- მხოლოდ დრო: `HH:mm`, `HH:mm:ss`, `HH:mm:ss:sss`.

## Date.now

[`Date.now()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/now) მეთოდი აბრუნებს გასული მილიწამების მნიშვნელობას დაწყებული 1970 წლის 1 ანვრიდან.

```js
console.log(Date.now()); // 1724589373831
```

## მაგალითები

პირობითად გვაინტერესებს რა დრო გავიდა, რაღაც კონკრეტული მოქმედებიდან:

```js
const start = Date.now();

// რაღაც მოქმედება

const end = Date.now();
const elapsed = new Date(elapsed);
console.log(elapsed.getMilliseconds()); // გასული დრო მილიწამებში
console.log(elapsed.getSeconds()); // გასული დრო წამებში
console.log(elapsed.getMinutes()); // გასული დრო წუთებში
```

ასევე შეგვიძლია საათიც კი ავაწყოთ `Date`-ს გამოყენებით:

<iframe data-url="guides/javascript-canvas-basic-animations-clock" data-title="საათის ანიმაცია" data-height="154"></iframe>

შეგვიძლია კონკრეტული დრო დავაყენოთ `Date` ობიექტში:

```js
const specificDate = new Date();
specificDate.setFullYear(2025);
specificDate.setMonth(6);
specificDate.setDate(22);
console.log('დაყენებული თარიღი:', specificDate); // Tue Jul 22 2025 17:08:17 GMT+0400 (Georgia Standard Time)
```

თარიღის დაყენებისას არ გამოყენებული მნიშვნელობა იქნება ამჟამინდელი ლოკალური დროის მნიშვნელობის ტოლი, მაგალითად: წინა მაგალითში დავაყენეთ მხოლოდ თარიღი, დანარჩენი მნიშვნელობები აიღო ლოკალური დროიდან გამომდინარე.

## შეჯამება

ამ სტატიაში განვიხილეთ თუ როგორ შეგვიძლია გამოვიყენოთ `Date` ობიექტი, რა მეთოდები გააჩნია და როგორი ფორმატით არის წარმოდგენილი `Date`.
