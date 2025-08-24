---
title: 'სტრინგი'
description: 'ტექსტური ტიპის ცვლადი'
keywords: 'string, strings, string methods, სტრინგები, სტრინგების შექმნა, სტრინგების მეთოდები'
---

`String`-ები გამოიყენება იმისათვის, რომ ცვლადში შევინახოთ ტექსტური ტიპის ინფორმაციები. რეალურად სტრინგიც მასივის მსგავსად ისიც ობიექტის სახით არის წარმოდგენილი. სტრინგის ობიექტის არის [`String`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String).

## სტრინგის შექმნა

სტრინგი შესაძლებელია შეიქმნას პრიმიტიულად შემდეგი სიმბოლოების გამოყენებით: `""`, `''`, <code>``</code>. ასევე შესაძლებელია შეიქმნას სტრინგის ობიექტის კონსტრუქტორის გამოყნებით.

```js
let string1 = "პრიმიტიული სტრინგი 1";
let string2 = 'პრიმიტიული სტრინგი 2';
let string3 = `პრიმიტიული სტრინგი 3`;
let string4 = String('ობიექტის კონსტრუქტორიდან შექმნილი სტრინგი, new გარეშე');
let string5 = new String('ობიექტის კონსტრუქტორიდან შექმნილი სტრინგი, new გამოყენებით');

console.log(typeof string1); // "string"
console.log(typeof string2); // "string"
console.log(typeof string3); // "string"
console.log(typeof string4); // "string"
console.log(typeof string5); // "object"
```

რეალურად 5-ვე პრინციპმა არ დაგვიბრუნა სტრინგის ტიპის მნიშვნელობა, შესაძლებელია ისინი იზიარებენ სტრინგის მეთოდებს თუმცა მცირედი განსხვავება მაინც არის მათ შორის. თუ მნიშვნელობას ქვმნით პრიმიტიული სიმბოლოებით მაშინ შექმნილი მნიშვნელობა სტრინგის ტიპის იქნება, მაგრამ როცა ვიძახებთ `String` ობიექტის კონსტრუქტორს აქ შესაძლოა მივიღოთ, როგორც სტრინგის ტიპის მნიშვნელობა ასევე ობიექტიც. თუ წინ დავუწერთ `new` ქივორდს, მთლიანი მნიშვნელობა შეიკრება ობიექტის ტიპში, ხოლო თუ არ დავუწერთ მაშინ ობიექტი გადაკეთდება სტრინგის ტიპად.

## სტრინგის გადაკეთება

სტრინგის გადაკეთება სრულდება მაშინ, როცა ვცდილობთ შევქმნათ სტრინგის ტიპის მნიშვნელობა მისი კონსტრუქტორის გამოყენებით. თუ `new` ქივორდს არ ვიყენებთ გვიბრუნდება ისევ სტრინგის მნიშვნელობა, მცირედი სია თუ სხვადასხვა ტიპის მნიშვნელობები როგორ გადაკეთდება:

- სტრინგის მნიშვნელობა რჩება ისევ სტრინგად (`String('სატესტო')` გახდება `'სატესტო'`).
- `String(undefined)` გადაცემა გადააკეთებს `'undefined'` (ტექსტურ ფორმატში ჩაიწერება და არა ტიპში).
- `String(null)` გადაცემა გადააკეთებს `'null'`-ად.
- `String(true)` გადაკეთდება `'true'` ხოლო `String(false)` გადაკეთდება `'false'`-ად.
- რიცხვები გადაკეთდება 10-ბითი სისტემის სახით ტექსტურ ფორმატში (იგივეა რაც [`toString(10)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toString) მეთოდის გამოყენება).
- `BigInt` მნიშვნელობები გადაკეთდება 10-ბითი სისტემის სახით მიღებულ ტესტურ ფორმატში (იგივეა რაც `toString(10)` მეთოდის გამოყენება).

```js
console.log(String('სატესტო')); // 'სატესტო'
console.log(String(undefined)); // 'undefined'
console.log(String(null)); // 'null'
console.log(String(true)); // 'true'
console.log(String(false)); // 'false'
console.log(String(16)); // '16'
console.log(String(22)); // '22'
console.log(String(BigInt(22))); // '22'
```

## სიმბოლოებზე წვდომა

სტრინგის სიმბოლოზე წვდომისათვის გამოიყენება ორი მიდგომა:

- [`charAt()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/charAt) მეთოდი, რომელიც ღებულობს არაუარყოფით მთელ რიცხვს (0 ან სხვა ნატურალური რიცხვი, მარტივად რომ ვთქვათ ინდექსები).
- `[]` ფრჩხილების გამოყენებით, ფრჩხილებში კი უნდა გადავცეთ ინდექსი, როგორც `charAt` მეთოდს.

```js
const text = 'iswavle.com არის უფასო სასწავლებელი პლატფორმა';

console.log(text.charAt(2)); // 'w'
console.log(text[2]); // 'w'
```

## მნიშვნელობების შედარება

მნიშვნელობების შესადარებლად გამოიყენება, როგორც `==` ასევე `===`. `==` შედარების დროს მოწმდება ოპერანდების მნიშვნელობები. ხოლო `===` შედარების დროს მოწმდება, როგორც ოპერანდების მნიშვნელობები ასევე მათი ტიპებიც.

```js
console.log('1' == 1); // true
console.log('a' == 'a'); // true
console.log('a' == 'A'); // false
console.log('1' === 1); // false
console.log('a' === 'a'); // true
console.log('a' === 'A'); // false
```

მეტობა ან ნაკლებობის დროს განხილება სტრინგების უნიკოდის ხილვა. თუ სტრინგი შეიცავს ერთზე მეტ მნიშვნელობას მაშინ თანრიგების მიხედვით დაიწყება შემოწმება (იგივე, რაც მეათედების შემოწმება მათემატიკაში).

```js
console.log('a' > 'A'); // true
console.log('abc' > 'abd'); // false
```

კონკრეტული მაგალითისთვის, როცა `a` და `A` შევადარეთ ერთმანეთს შევამოწმეთ მათი უნიკოდები, სადაც `a` უნიკოდი არის `97` ხოლო `A` უნიკოდი `65`, შედარება კი მარტივად გამოვიდა რიცხვებს შორის `97 > 65`, რაც ჭეშმარიტია. ხოლო როცა `abc` და `abd` ვადარებდით ერთმანეთს თანრიგების მიხედვით, პირველი და მეორე თანრიგი ერთმანეთის ტოლია ამიტომაც გადავიდეთ მესამეზე, სადაც `c` და `d` უნიკოდები ერთმანეთს ედრება `99` და `100`, შედეგი კი იქნება `false`.

იხილეთ უნიკოდების სია [ბმულზე](https://www.charset.org/utf-8), ყურადღება მიაქციეთ ათობით ჩანაწერში მნიშვნელობებს (Dec), ქართული სიმბოლოები იწყება `4304`-დან ([ქართული ჩარსეტის გვერდი](https://www.charset.org/utf-8/5)).

## Template literal

Template literal გამოიყენება იმისათვის, რომ ტექსტში დინამიურად მოვათავსოთ ცვალდები. თუ გვსურს თიმფლეით ლიტერალების გამოყენება საჭიროა სტრინგის მნიშვნელობა შექმნილი იყოს <code>``</code> სიმბოლოებით.

```js
let text = `დღევანდელი თარიღი არის: ${new Date().toDateString()}`;
console.log(text); // 'Tue Jan 16 2024'

for (let i = 1; i <= 100; i++) {
  console.log(`${i}) იტერაცია`); // i ყოველ ჯერზე შეიცვლება 1 დან 100 მდე
}
```

კონკრეტულ მაგალითში ნებისმიერ გამოძახებაზე ტექსტურ ცვლადში მნიშვნელობა დინამიურად მოთავსდება იმის მიხედვით თუ რა თარიღიც არის. თარიღისთვის გამოყენებულია `Date` ობიექტის მეთოდი, რომელიც განხილული იქნება [Date](./doc/guides/javascript/date)-სტატიაში.

## სტატიკური მეთოდები

### fromCharCode

[`String.fromCharCode()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/fromCharCode) არის მეთოდი, რომელიც პარამეტრად ღებულობს რიცხვს (UTF-16 დან) და დააბრუნებს შესაბამის სიმბოლოს.

```js
console.log(String.fromCharCode(4312));
console.log(String.fromCharCode(4321));
console.log(String.fromCharCode(4332));
console.log(String.fromCharCode(4304));
console.log(String.fromCharCode(4309));
console.log(String.fromCharCode(4314));
console.log(String.fromCharCode(4308));
```

მცირედი კითხვა, რას დალოგავს ?

### fromCodePoint

[`String.fromCodePoint()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/fromCodePoint) არის მეთოდი, რომელიც პარამეტრად ღებულობს კოდის მნიშვნელობებს და დააბრუნებს შესაბამის სიმბოლოს.

```js
console.log(String.fromCodePoint(65)); // 'A'
console.log(String.fromCodePoint(4312)); // 'ი'
```

ორივე მეთოდი თითქმის ერთნაირად მუშაობს მაგრამ მოდით განვიხილოთ განსხავებული ქეისებიც:

```js
console.log(String.fromCharCode(65, 66, 128516)); // AB\uD83D\uDE04
console.log(String.fromCodePoint(65, 66, 128516)); // "AB😄"
```

ერთი და იგივე გადაცემულ მნიშვნელობებზე, `65` და `66`-ზე ერთნაირად იმუშავა, ორივე შემთხვევაში დააბრუნა `AB`, თუმცა `128516` შემთხვევაში `fromCodePoint` აბრუნებს პირდაპირ სიმბოლოს ხოლო `fromCharCode` აბრუნებს `\uD83D\uDE04`, რადგან გასულია [BMP](<https://en.wikipedia.org/wiki/Plane_(Unicode)#Basic_Multilingual_Plane>) (basic multilingual plane) საზღვრიდან, ამიტომაც აბრუნებს მნიშვნელობას surrogate წყვილიდან გამომდინარე UTF-16 სტანდარტზე დაშვებით. surrogate წყვილის მნიშვნელობა არის `U+1F604`, რაც UTF-16 ში არის `\uD83D\uDE04`.

## თვისებები და მეთოდები

### length

[`length`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/length) აბრუნებს ტექსტში არსებული სიმბოლოების (ჩარაქტერები) რაოდენობას (გაითვალისწინეთ space-ც ჩარაქტერია).

```js
let text = 'რაღაც სატესტო ტექსტი';
console.log(text.length); // 20
```

### at

[`at`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/at) პარამეტრად ღებულობს რიცხვს, რის მიხედვითაც დააბრუნებს იმ ინდექსზე მყოფი ჩარაქტერის მნიშვნელობას. რიცხვი შეიძლება გადაეცეს, როგორც დადებითი ასევე უარყოფითი. 0 ან დადებითი მნიშვნელობა გადაეცემა, იმ ინდექსზე მყოფ მნიშვნელობას დააბრუნებს ჩვეულებრივად ხოლო თუ უარყოფითს მნიშვნელბოას გადასცემთ ინდექსების დათვლა დაიწყება ბოლოდან.

```js
let text = 'რაღაც სატესტო ტექსტი';
console.log(text.at(1)); // 'ა'
console.log(text.at(-1)); // 'ი'
```

### charAt

`charAt` მეთოდი პარამეტრად ღებულობს ინდექს, რომელიც 0 ან დადებითი რიცხვი არის. გადაცემული პარამეტრის მიხედვით დაბრუნდება შესაბამის ინდექსზე მდგომი ჩარაქტერი.

```js
let text = 'რაღაც სატესტო ტექსტი';
console.log(text.charAt(1)); // 'ა'
console.log(text.charAt(-1)); // '' ცარიელი მნიშვნელობა
```

### concat

[`concat`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/concat) მეთოდი პარამეტრად ღებულობს ერთს ან რამოდენიმე სტრინგს, გადაცემულ სტრინგებს გააერთიანებს და დააბრუნებს ერთ ახალ სტრინგს.

```js
let text = 'რაღაც';
console.log(text.concat(' სატესტო', ' ', 'ტექსტი')); // 'რაღაც სატესტო ტექსტი'

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
console.log(''.concat(...numbers)); // '12345678910'
```

### endsWith

[`endsWith`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith) მეთოდი გამოიყენება იმისათვის, რომ შევამოწმოთ სტრინგი მთავრდება თუ არა სპეციფიკური ტექსტით. მეთოდი აბრუნებს `true` იმ შემთხვევაში თუ მთავრდება, თუ არ მთავრდება `false`. მეთოდი ორ პარამეტრს ღებულობს:

- საძიებო სიტყვა.
- რიცხვითი მნშვნელობა, რომელიც განსაზღვრავს თუ სად უნდა იყოს საძიებო სიტყვის ბოლო პოზიცია (თუ მნიშვნელობა არ გადაეცა მაშინ იგულისხმება სტრინგის სიგრძე).

```js
let text = 'Hello World!';
console.log(text.endsWith('World!')); // true

let secondText = 'ანგულარი საუკეთესო SPA ფრეიმვორკია';
console.log(secondText.endsWith('ფრეიმვორკია', 34)); // true
```

### includes

[`includes`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes) მეთოდი ამოწმებს სტრინგი შეიცავს თუ არა კონკრეტულ ტექსტს. თუ შეიცავს მნიშვნელობას მეთოდი აბრუნებს `true` ხოლო თუ არ შეიცავს `false`. მეთოდი ღებულობს ორ პარამეტრს:

- საძიებო სიტყვა.
- რიცხვითი მნიშვნელობა, თუ საიდან დაიწყოს საძიებო სიტყვის მოძებნა (თუ მნიშვნელობა არ გადაეცა მაშინ იგულისხმება სტრინგის სიგრძე).

```js
let text = 'ვებგვერდისთვის ძირითადად გვჭირდება: HTML, CSS, JavaScript. Angular არის JavaScript-ის ფრეიმვორკი';
console.log(text.includes('HTML')); // true
console.log(text.includes('JavaScript', 58)); // true
console.log(text.includes('HTML', 58)); // true
```

### repeat

[`repeat`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/repeat) მეთოდი იმეორებს თავისივე ტექსტის მნიშვნელობას. მეთოდი პარამეტრად ღებულობს რიცხვს თუ რამდენჯერ უნდა განმეორდეს ტექსტი, რიცხვი უნდა იყოს 0-ზე მეტი და `+Infinity`-ზე ნაკლები.

```js
console.log('კი '.repeat(2)); // 'კი კი '
```

### replace

[`replace`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace) მეთოდი ერთჯერადად ანაცვლებს ტექტს, სასურველი ტექსტით სტრინგში და დააბრუნებს განახლებულ სტრინგს. მეთოდი ღებულობს ორ პარამეტრს:

- პატერნს თუ რითი უნდა შენაცვლდეს, ეს შეიძლება იყოს მთელი ტექსტი ან [`Regex`](./doc/guides/javascript/regex) (რეგულარული გამოსახულებები).
- შესაცვლელი სიტყვა, რაც შეიძლება იყოს ტექსტი ან ფუნქცია, თუ არის სტრინგი შენაცვლდება იმ ტექსტით, რაც გადაეცა ხოლო თუ არის ფუნქცია შენაცვლდება თითოეული დამთხვევის დროს.

```js
let text = 'დღეს ცუდი ამინდია';
console.log(text.replace('ცუდი', 'კარგი')); // 'დღეს კარგი ამინდია'

let secondText = 'იყო x და გახდა y';
console.log(secondText.replace(/[xy]/g, (char) => (char === 'x' ? 500 : 1000))); // 'იყო 500 და გახდა 1000'
```

### replaceAll

[`replaceAll`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replaceAll) მეთოდი ანაცვლებს ყოველ შესაცვლელ ტექსტს, სასურველი ტექსტით სტრინგში და დააბრუნებს განახლებულ სტრინგს. მეთოდი ღებულობს ორ პარამეტრს:

- პატერნს თუ რითი უნდა შენაცვლდეს, ეს შეიძლება იყოს მთელი ტექსტი ან `Regex`. თუ `Regex` გადავცემთ აუცილებლად უნდა ჰქონდეს დროშა (flag) `g` წინააღმდეგ შემთხვევაში `TypeError` ამოვარდება.
- შესაცვლელი სიტყვა ან ფუნქცია, მოქმედებს ანალოგიურად, როგორც `replace` მეორე პარამეტრი.

```js
let text = 'ორშაბათი სამშაბათი ოთხშაბათი ხუთშაბათი';
console.log(text.replaceAll('შაბათი', '')); // 'ორ სამ ოთხ ხუთ'
console.log(text.replaceAll(/შაბათი/g, '')); // 'ორ სამ ოთხ ხუთ'
```

### indexOf

[`indexOf`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/indexOf) მეთოდი ეძებს პარამეტრად გადაცემულ სიმბოლოს ან სიტყვას და აბრუნბს მისი პოვნის შედეგად მიღებულ ინდექს. თუ გადაცემული მნიშვნელობა ვერ იპოვა მაშინ დააბრუნბს -1. შესაძლებელია მეორე პარამეტრიც გადავცეთ თუ რომელი ინდექსიდან დაიწყოს მოძებნა.

```js
let text = 'hello world';
console.log(text.indexOf('hello')); // 0
console.log(text.indexOf('world')); // 6
console.log(text.indexOf('o')); // 4
console.log(text.indexOf('o', 5)); // 7
```

### lastIndexOf

[`lastIndexOf`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/lastIndexOf) მეთდი მუშაობს ანალოგიურად, როგორც `indexOf` განსხვავება არის ის, რომ `lastIndexOf` დააბრუნებს ინდექს იმ სტრინგის, რომელიც გადაცემული პარამეტრების მიხედვით ბოლოს იპოვა.

```js
let text = 'hello world';
console.log(text.indexOf('o')); // 4
console.log(text.indexOf('o', 5)); // 7
console.log(text.lastIndexOf('o')); // 7
```

### search

[`search`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/search) მეთოდი ეძებს არსებობს თუ არა კონკრეტული სიტყვა ან პატერნი (რეგულაური გამოსახულებით, იგივე `Regex`) ტექსტი, თუ არსებობს აბრუნებს მის ინდექს (0 ან მეტი), სხვა შემთხვევაში -1. მეთოდი პარამეტრად ღებულობს სიტყვას ან პატერნს.

```js
let text = 'ვებგვერდისთვის ძირითადად გვჭირდება: HTML, CSS, JavaScript.';
console.log(text.search('CSS')); // 42
console.log(text.search('SCSS')); // -1
console.log(text.search(/javascript/i)); // 47
```

### split

[`split`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split) მეთოდი დაყოფს გადაცემული პარამეტრის მიხედვით ტექსტს და დააბრუნებს დაყოფილ მნიშვნელობებს მასივში. მეთოდი ღებულობს ერთ პარამეტრს თუ რის მიხედვით გაიყოფა (თუ არაფერი გადაეცემა მთლიანი სტრინგი დაბრუნდება, როგორც მასივის ერთი ელემენტი).

```js
let text = 'ვებგვერდისთვის ძირითადად გვჭირდება: HTML, CSS, JavaScript.';
console.log(text.split()); // ['ვებგვერდისთვის ძირითადად გვჭირდება: HTML, CSS, JavaScript.']
console.log(text.split('')); // ["ვ", "ე", "ბ", "გ", "ვ", "ე", ... ] ყოველი სიმბოლო გადადის რიგრიგობით მასივში
console.log(text.split(' ')); // ['ვებგვერდისთვის', 'ძირითადად', 'გვჭირდება:', 'HTML,', 'CSS,', 'JavaScript.']
console.log(text.split(':')); // ['ვებგვერდისთვის ძირითადად გვჭირდება', ' HTML, CSS, JavaScript.']
```

### slice

[`slice`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/slice) მეთოდი ამოჭრის კონკრეტულს სექციას გადაცემული პარამეტრების მიხედვით და დააბრუნებს ამოჭრილ სექციას. მეთოდი 2 პარამეტრს ღებულობს:

- პირველი რიცხვი, რომელიც განსაზღვრავს საიდან ამოჭრას.
- მეორე რიცხვი, რომელიც განსაზღვრავს სად დამთავრდეს ამოჭრა (თუ მეორე პარამეტრი არის გადაცემული მაშინ იგულისხმება სტრინგის ბოლომდე).

```js
let text = 'ვებგვერდისთვის ძირითადად გვჭირდება: HTML, CSS, JavaScript.';
console.log(text.slice(15)); // 'ძირითადად გვჭირდება: HTML, CSS, JavaScript.'
console.log(text.slice(15, 34)); // 'ძირითადად გვჭირდება'
console.log(text.slice(-22)); // 'HTML, CSS, JavaScript.'
console.log(text.slice(-22, -13)); // 'HTML, CSS'
```

### substring

[`substring`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/substring) მეთოდი მუშაობს მსგავსად, როგორც [`slice`](#slice) მეთოდი.

```js
let text = 'ვებგვერდისთვის ძირითადად გვჭირდება: HTML, CSS, JavaScript.';
console.log(text.substring(15)); // 'ძირითადად გვჭირდება: HTML, CSS, JavaScript.'
console.log(text.substring(15, 34)); // 'ძირითადად გვჭირდება'
console.log(text.substring(-22)); // 'ვებგვერდისთვის ძირითადად გვჭირდება: HTML, CSS, JavaScript.'
console.log(text.substring(-22, -13)); // ''
```

დადებითი რიცხვებისთვის, შედეგი `slice` და `substring` მეთოდისთვის თითქმის იგივე იყო თუმცა უარყოფით რიცხვებში უკვე განსხვავებები შეიმჩნევა. ძირითადი განსხვავებები არის შემდეგი:

- substring-ისთვის
  - თუ პირველი რიცხვი (start) მეტია მეორე რიცხვზე (stop)-ზე მაშინ ფუნქცია არგუმენტებს ადგილს გაუცვლის.
  - თუ რომელიმე პარამეტრი არის უარყოფითი რიცხვი ან `NaN` მაშინ განიხილება ისინი, როგორც 0.
- slice-სთვის
  - თუ start მეტია stop-ზე მაშინ ფუნქცია დააბრუნებს ცარიელს სტრინგს (`''`).
  - თუ start უარყოფითი რიცხვია, ძიებას დაიწყებას სტრინგის ბოლოდან.
  - თუ stop უარყოფითი რიცხვია, stop მნიშვნელობა იქნება: `string.length - Math.abs(stop)` (მთლიან სიგრძეს გამოაკლდება, stop მნიშვნელობა მოდულოვანი მნიშვნელობა).

### toLowerCase

[`toLowerCase`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/toLowerCase) მეთოდი დააბრუნებს მთლიან სტრინგს დაბალ რესტრში (პატარა ასოებით) წარმოდგენილს. მეთოდი არანაირ პარამეტრს არ ღებულობს.

```js
console.log('Hello World!'.toLowerCase()); // 'hello world!'
```

### toUpperCase

[`toUpperCase`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/toUpperCase) მეთოდი დააბრუნებს მთლიან სტრინგს მაღალ რესტრში (დიდი ასოებით) წარმოდგენილს. მეთოდი არანაირ პარამეტრს არ ღებულობს.

```js
console.log('Hello World!'.toUpperCase()); // 'HELLO WORLD!'
```

### toString

[`toString`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/toString) მეთოდი სტრინგის ობიექტს გადაიყვანს სტრინგის მნიშვნელობაში. მეთოდი პარამეტრად არაფერს ღებულობს.

```js
const stringObject = new String('სატესტო');
console.log(stringObject); // String { 'სატესტო' }
console.log(stringObject.toString()); // 'სატესტო'
```

გაითვალისწინეთ `toString` მეთოდი სხვადასხვა ობიექტებთან განსხვავებულად მუშაობს. მაგალითისთვის:

```js
let number = 2;
console.log(number.toString(2)); // '10' რადგან ორობითში 2 არის 10
number = 17;
console.log(number.toString(16)); // '11' რადგან თექვსმეტობითში 17 არის 11
```

მსგავს ტიპად რიცხვებთან მიმართებაში `toString` განხილული იქნება [რიცხვების სტატიაში](./doc/guides/javascript/number);

### trim

[`trim`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/trim) მეთოდი გამოიყენება whitespace-ების წასაშლელად. whitespace იგულისხმება ისეთი ტიპის დაშორებები, რომლებიც არ არის საჭირო თუმცა მოთავსებულია ტექსტის დასაწყისში და დასასრულში (მაგ: `' რაღაც ტექსტი '`). მეთოდი პარამეტრად არაფერს არ ღებულობს და აბრუნებს სტრინგს ზედმეტი whitespace გარეშე.

```js
let text = '      რაღაც ტექსტი      ';
console.log(text.length); // 24
console.log(text.trim()); // 'რაღაც ტექსტი'
console.log(text.trim().length); // 12
```

`trim` მეთოდის საშუალებით ზედმეტი დაშორებები, რომლებიც არაფერს არ გვაძლევს წავშალეთ დასაწყისიდანაც და ბოლოდანაც. თუ კონკრეტული მიმართულებიდან გვსურს მხოლოდ whitespace ამოჭრა მაშინ გვაქვს შემდეგი ორი მეთოდი: [`trimStart`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/trimStart) და [`trimEnd`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/trimEnd). ორივე მეთოდი ანალოგიურია `trim` მეთოდის მცირედი განსხვავებებით: `trimStart` ამოჭრის მხოლოდ დასაწყისიდან ხოლო `trimEnd` მხოლოდ ბოლოდან.

```js
let text = '      რაღაც ტექსტი      '; // დასაწყისშიც და დასასრულშიც 6 ზედმეტი space არის მოთავსებული
console.log(text.trimStart()); // 'რაღაც ტექსტი      '
console.log(text.trimStart().length); // 18
console.log(text.trimEnd()); // '      რაღაც ტექსტი'
console.log(text.trimEnd().length); // 18
```

## შეჯამება

ტექსტური ტიპის მნიშვნელობებისთვის გვაქვს სტრინგის ობიექტი და მისი მეთოდები. შეგვიძლია 5 გზით შევქმნათ სტრინგი. სტრინგში დინამიურადაც შეგვიძლია მნიშვნელბოები მოვათავსოთ სტრინგის თიმფლეითების გამოყენებით (Template literal-ს). სტრინგის ზოგიერთი მეთოდი ღებულობს, როგორც ჩვეულებრივ სტრინგს ასევე რეგულარულ გამოსახულებებს.

იხილეთ სამაგალითო კოდები [playground](./playground/simple/guides/javascript-string)-ში.
