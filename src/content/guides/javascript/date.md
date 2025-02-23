---
title: 'Date ობიექტი'
description: 'Date ობიექტი JavasScript-ში'
keywords: 'Date, დროის ობიექტი, Date object'
---

დროსა და თარიღებთან სამუშაოდ ჯავასკრიპტში ვიყენებთ [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) ობიექტს.

## Date

ჯავასკრიპტში დრო თავისი ყველაზე ელემენტარული ფორმით არის რიცხვი, კერძოდ მილისეკუნდების რაოდენობა, რომელიც გავიდა
1970 წლის პირველი იანვრის შუაღამიდან. ამ თარიღთს ეწოდება იუნიქსის [ეპოქა](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date#the_epoch_timestamps_and_invalid_date).
მაშასადამე, ეპოქიდან გასულ მილისეკუნდებზე დაფუძნებით არის შესაძლებელი დროსა და თარიღთან დაკავშირებით მთელი რიგი ინფორმაციის გამოთვლა `Date` ობიექტის დახმარებით
(მაგალითად რომელი თვე და რიცხვია, კვირის რომელი დღეა, რომელი საათია ამა თუ იმ დროის ზონაში და ა.შ).

`Date` ობიექტის დიაპაზონი არის -100,000,000-დან 100,000,00-მდე, სადაც 0 არის ეპოქის დაწყების მომენტი.

## Date ობიექტის შექმნა

`Date` ობიექტის შექსამნელად საჭიროა `new Date()`-ის კონსტრუქტორის გამოყენება, რომელიც ნაგულისხმევად დააბრუნებს ლოკალური მოწყობილობის (თქვენი მოწყობილობის) დროს,
თუმცა პარამეტრების გადაცემით, შეგვიძლია შევქმნათ კონკრეტული დროის ობიექტი.

პარამეტრები შეიძლება იყოს შემდეგნაირი:

- არაფერი: შექმნის ამჟამინდელ დროს.
- დროის აღწერის სტრინგი: განსხვავდება ჯავასკრიპტის ძრავის მიხედვით, თუმცა უნივერსალურად გამოიყენება ISO ფორმატი `YYYY-MM-DDTHH:mm:ss.sssZ`. მაგალითად: `new Date('2024-01-01T00:00:00.000Z')`. საათის, წუთებისა და წამების გამოტოვების შემთხვევაში მათი მნიშვნელობა იქნება ნული.
- რიცხვები, რომლებიც თანმიმდევრულად შეესაბამება წელიწადს, თვეს, დღეს, საათს, წუთსა და წამს. მაგალითად: `new Date(2024, 0, 1)`. საყურადღებოა, რომ თვეები ამ შემთხვევაში 0 ინდექსიანია.

```js
new Date(); // ცარიელი ანუ ამჟამინდელი დრო
new Date(date_string); // გადაცემული სტრინგის მიხედვით
new Date(year, month); // წელიწადის და თვის მიხედვით
new Date(year, month, day); // წელიწადის, თვის და დღის მიხედვით
new Date(year, month, day, hours); // წელიწადის, თვის, დღის და საათის მიხედვით
new Date(year, month, day, hours, minutes); // წელიწადის, თვის, დღის, საათის და წუთის მიხედვით
new Date(year, month, day, hours, minutes, seconds); // წელიწადის, თვის, დღის, საათის, წუთის და წამების მიხედვით
new Date(year, month, day, hours, minutes, seconds, ms); // წელიწადის, თვის, დღის, საათის, წუთის, წამების  და მილი წამების მიხედვით
new Date(ms); // მილიწამების მიხედვით
```

<iframe data-url="guides/javascript-current-date" data-title="ამჟამინდელი დრო" data-height="40"></iframe>

ზემოთ მოცემული ტექსტის გამოსატანად ჩვენ უბრალოდ გამოვიყენეთ თარიღის ობიექტიზე `toString()` მეთოდი და შედეგად მივიღეთ: კვირის დღე, თვე, რიცხვი, წელიწადი, საათი, წუთი, და წამი.

## Date სტრინგის ფორმატი

თარიღის სტრინგად ფორმატირებისთვის ბევრი გზა არსებობს. JavaScript იყენებს ISO ფორმატს თარიღის გამოსატანად:

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
- `sss` - მილისეკუნდების მნიშვნელობა, რომელიც გამოისახება 3 ციფრით (`000`-დან `999`-მდე), ნაგლისხმევად არის `000`.
- `z` - GMT-ს დროის მნიშვნელობა.

მთლიანი ნოტაცია აუცილებელი არ არის. არსებობს უფრო მოკლე ფორმატებიც:

- მხოლოდ თარიღი: `YYYY`, `YYYY-MM`, `YYYY-MM-DD`.
- მხოლოდ დრო: `HH:mm`, `HH:mm:ss`, `HH:mm:ss:sss`.

## Date-ის მეთოდები

`Date` ობიექტების მეთოდები შეგვიძლია ზოგად კატეგორიებად განვიხილოთ:

- Get მეთოდები: თარიღის ობიექტიდან მნიშვნელობის ამოსაღებად.
- Set მეთოდები: თარიღის ობიექტში მნიშვნელობის დასაყენებლად.
- to მეთოდები: თარიღის ობიექტიდან სტრინგის მნიშვნელობების გამოსატანად.
- parse და UTC მეთოდები: `Date` სტრინგების წასაკითხად.

Get და Set მეთოდებით შესაძლებელია ცალ-ცალკე ავიღოთ ან შევცვალოთ წამები, წუთები, საათები, დღეები, თვეები, წელები და ა.შ.
მიუხედავად იმისა, რომ არსებობს `getDay` მეთოდი, რომელიც გვიბრუნებს კვირის დღეს, არ არსებობს შესაბამისი `setDay` მეთოდი,
რადგან კვირის დღე ავტომატურად გამოითვლება. მეთოდები იყენებენ რიცხვებს მნიშვნელობის აღსაწერად:

- წამები და წუთები: 0-დან 59-მდე
- საათები: 0-დან 23-მდე
- კვირის დღე (Day): 0-დან 6-მდე (0 ნიშნავს კვირა დღეს)
- რიცხვი (Date, თვის დღე): 1-დან 31-მდე
- თვეები (Month): 0-დან 11-მდე (0 ნიშნავს იანვარს)
- წელები: 1900-იდან მოყოებული ნებისმიერი რიცხვი

### Get მეთოდები

| მნიშვნელობა   | Local                                                                                                                        | UTC                                                                                                                                |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| წელიწადი      | [`getFullYear()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getFullYear)         | [`getUTCFullYear()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getUTCFullYear)         |
| თვე           | [`getMonth()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getMonth)               | [`getUTCMonth()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getUTCMonth)               |
| რიცხვი (თვის) | [`getDate()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getDate)                 | [`getUTCDate()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getUTCDate)                 |
| საათი         | [`getHours()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getHours)               | [`getUTCHours()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getUTCHours)               |
| წუთი          | [`getMinutes()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getMinutes)           | [`getUTCMinutes()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getUTCMinutes)           |
| წამი          | [`getSeconds()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getSeconds)           | [`getUTCSeconds()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getUTCSeconds)           |
| მილისეკუნდი   | [`getMilliseconds()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getMilliseconds) | [`getUTCMilliseconds()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getUTCMilliseconds) |
| კვირის დღე    | [`getDay()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getDay)                   | [`getUTCDay()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getUTCDay)                   |

კონკრეტული მონაცემების ამოღების მაგალითი:

```js
const christmas = new Date(2024, 11, 25);

christmas.getFullYear(); // 2024
christmas.getMonth(); // 11
christmas.getDate(); // 25
christmas.getDay(); // 3
```

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

`Date` ობიექტში დროის დაყენების მაგალითი:

```js
const specificDate = new Date();
specificDate.setFullYear(2025);
specificDate.setMonth(6);
specificDate.setDate(22);
console.log('დაყენებული თარიღი:', specificDate); // Tue Jul 22 2025 17:08:17 GMT+0400 (Georgia Standard Time)
```

დააკვირდით, რომ ვინაიდან ჩვენ საათი არ შევცვალეთ, იგი დარჩა ამჟამინდელი ლოკალური დროის მნიშვნელობის ტოლი.

## სტატიკური მეთოდები

[`Date.now()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/now)
მეთოდი აბრუნებს გასული მილიწამების მნიშვნელობას დაწყებული 1970 წლის 1 იანვრიდან, იგივე [timestamp](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date#the_epoch_timestamps_and_invalid_date)-ს.

```js
console.log(Date.now()); // 1724589373831
```

[`Date.parse()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/parse) კითხულობს დროისა და თარიღის ტექსტურ რეპრეზენტაციას და აბრუნებს timestamp-ს.
მეთოდს აქვს როგორც ISO, ასევე UTC ფორმატის მხარდაჭერა, რაც ხელსაწყრელია ფორმატების კონვერტაციისთვის.

```js
// Standard date-time string format
const unixTimeZero = Date.parse('1970-01-01T00:00:00Z');
// Non-standard format resembling toUTCString()
const javaScriptRelease = Date.parse('04 Dec 1995 00:12:00 GMT');

console.log(unixTimeZero); // 0

console.log(javaScriptRelease); //818035920000
```

## მაგალითები

მარტივი ციფრული საათი:

<iframe data-url="guides/javascript-date-clock" data-title="ციფრული საათი" data-height="154"></iframe>

## შეჯამება

ამ სტატიაში განვიხილეთ თუ როგორ შეგვიძლია გამოვიყენოთ `Date` ობიექტი, რა მეთოდები გააჩნია და როგორი ფორმატით არის წარმოდგენილი `Date`.
