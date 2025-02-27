---
title: 'ობიექტები'
description: 'ობიექტების მცირედად ახსნა JavaScript-ში'
keywords: 'object, ობიექტის აღწერა, მნიშვნელობების წაკითხვა/ჩაწერა, method, read/write, this, Dot notation, Bracket notation, ობიეტქის მეთოდები, რა არის This'
---

ობიექტები ეს არის კოლექცია სხვადასხვა ტიპის მნიშვნელობების, რომელიც იზიარებს ფუნქციონალს ან ინფორმაციას. ხშირ შემთხვევაში ობიექტებში ვინახავთ ცვლადებს და მეთოდებს (ობიექტში არსებულ ფუნქციას მეთოდი ეწოდება). თითქმის ყველაფერში გამოყენებული არის ობიექტები, დაწყებული HTML/CSS დან დამთავრებული JavaScript-ით. HTML-თან უშუალოდ ობიექტების გამოყენება ჩანს, როცა [`DOM`](./doc/guides/javascript/dom) მანიპულაციას დაიწყებთ. CSS-ში კი ძალიან მალევე შევამჩნევთ ამ თავში.

## ობიექტის აღწერა

ობიექტის ტიპის მნიშვნელობა, რომ მივანიჭოთ ცვლადს უმჯობესი არის [`const`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const) იყოს მისი ინიციალიზების ტიპი, რადგან პრაქტიკაში არ არის კარგი, როცა ობიექტს მთლიანად ვუცლით მნიშვენლობას. ობიექტის მნიშვნელობა, რომ მივცეთ ცვლადს საჭიროა გავუტალოთ `{}` (ფიგურულ) ფრჩხილებს ცვლადი ან გამოვიყენოთ [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/Object) კონსტრუქტორი.

მაგალითად:

```js
const user = {};
const secondUser = new Object();
// ორივე შემთხვევაში შეიქმნება ახალი ობიექტები
```

`new` ქივორდის გამოყენებით ხდება შემდგომი მოქმედებები:

- იქმნება ახალი ცარიელი ობიექტი
- იძახებს კონსტრუქტორს (`constructor` ფუნქცია, რომელიც შექმნის დროს ეშვება)
- აბრუნებს ახალ ობიექტს

მეტი დეტალური ინფორმაციისთვის, გაეცანით [`new`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/new) გვერდს.

## მნიშვნელობების წაკითხვა/ჩაწერა

მნიშვნელობების წაკითხვა/ჩაწერა (დამატება ან გამოყენება) შეიძლება ორნაირად:

- Dot notation - წერტილის გამოყენებით წვდომა
- Bracket notation - ფრჩხილის აღნიშვნით წვდომა

### Dot notation

Dot notation გულისხმობს ობიექტის სახელი წარმოვადგინოთ, როგორც `namespace` და შემდგომ წერტილის საშუალებით მივწდეთ მას. მაგალითად:

```js
const project = {
  name: 'educata',
};

console.log(project); // { name: 'educata' }
console.log(project.name); // 'educata'

project.name = 'Educata';
project.title = 'EverREST';
console.log(project); // { name: 'Educata', title: 'EverREST' }
```

### Bracket notation

Bracket notation საკმაოდ წაააგავს მასივიდან ([`array`](./doc/guides/javascript/array) განხილული იქნება შემდგომ თავში) მნიშვნელობის წაკითხვას, ოღონდ განსხვავება გვაქვს შემდგომ ნაირი: ვიყენებთ მნიშვნელობს სახელს და არა ინდექს. ხშირად ობიექტებს მოიხსენიებენ, როგორც **ასოცირებულ მასივს**. ხშირ შემთხვევაში წერტილით მიწვდომა, გამოიყენება პრაქტიკაში თუმცა გვაქვს შემთხვევებიც, როცა საჭიროა Bracket notation გამოყენებაც. მაგალითი:

```js
const project = {
  name: 'educata',
};

console.log(project); // { name: 'educata' }
console.log(project['name']); // 'educata'

project['name'] = 'Educata';
project['title'] = 'EverREST';
console.log(project); // { name: 'Educata', title: 'EverREST' }
```

მაგალითებიდან გამომდინარე ვამჩნევთ, რომ ორივე მეთოდის დროს წაკითხვა/დამატების იდეა არის ერთნაირი. თუ კონკრეტულად ისეთ ელემენტზე დავიწყებთ მნიშვნელობის მინიჭებას, რომელიც არსებობს (მაგ: `project.name` პირველი მაგალითადან), მაშინ მასზე ხელმეორედ მინიჭების დროს ხდება ინფორმაციის გადაწერა ანუ თავიდან მიენიჭება მნიშვნელობა თუ საერთოდ არ არის მნიშვნელობა აღწერილი, ესეიგი ახალი მნიშვნელობა დაემატება ობიექტში.

## რა არის This ?

[`this`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this) მიუთითებს ამჟამინდელ ობიექტს სადაც არის ჩაწერილი. მაგალითად:

```js
const person = {
  name: 'educata',
  projects: ['EverREST', 'iswavle'],
  logName() {
    console.log(this); // { name: 'educata', projects: ['EverREST', 'iswavle'] }
  },
};
```

ამ შემთხვევაში შეგვეძლო `person` გამოყენება `this` ნაცვლად (ორივეს ერთნაირი მნიშვნელობა გააჩნია), მაგრამ რაც უფრო მეტად გაიზრდება პროექტში ობიექტების რაოდენობა, რთული იქნება გარჩევა სახელებით, ამიტომაც კონკრეტული ობიექტის მნიშვნელობის გამოყენებისთვის ჯობია `this` ვიდრე მთლიანი ობიექტის სახელი.

`this` გააჩნია სტანდარტული ფუნქციის ტიპს, მაგრამ `arrow` ფუნქციას არ გააჩნია.

## ობიეტქის მეთოდები

ობიექტში არამარტო შესაძლებელია ცვლადების დამატება, არამედ შესაძლებელია ფუნქციების შექმნაც. ობიექტიდან წამოსულ ფუნქციას ეწოდება **მეთოდი**. მეთოდების დამატება შესაძლებელია, ორ მხრივ:

- პირდაპირ ცვლადზე ფუნქციის მნიშვნელობის მინიჭება ([ანონიმური ფუნქცია](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions#defining_functions))
- ცვალდის გარეშე დამატება

განვიხილოთ ორივე ვერსია მაგალითებით:

```js
const project = {
  name: 'educata',
  logName: function() {
    console.log(this.name); // 'educata'
  }
  logNameWithArrowFn: () => {
    console.log(this.name); // undefined
  },
  logNameMethod() {
    console.log(this.name); // 'educata'
  }
};
```

პირველ რიგში შევქმენით `project` ობიექტი და მასში მოვათავსეთ 3 თვისება და 1 მეთოდი. განვიხილოთ თითოეული მათგანი:

- `name` თვისებას მივანიჭეთ `'educata'`-ს მნიშვნელობა, რაც არის სტრინგის ტიპი.
- `logName` თვისებას მივანიჭეთ სტანდარტული ანონიმური ფუნქცია, რომელშიც ვლოგავთ ამავე ობიექტის `name`-ს.
- `logNameWithArrowFn` თვისებას მივანიჭეთ ანონიმური `arrow` ფუნქცია, რომელშიც ვლოგავთ ამავე ობიექტის `name`-ს.
- `logNameMethod` მეთოდში ვლოგავთ ამავე ობიექტის `name`-ს.

## სად ინახება ობიექტები ?

პრიმიტიული ცვლადები (`string`, `number`, `bigint`, `boolean`, `undefined`, `symbol`, `null`) მარტივად ინახება მეხსიერების უბანზე. თითოეულ მნიშვნელობას გააჩნია თავიანთი ზომა და მისამართი. პრიმიტიული ცვალდებისთვის 1 ცვლადს გააჩნია 1 მისამართი, თუმცა გვაქვს ასევე შედარებით კომპლექსური ცვლადის ტიპები, რომლებიც მიუთითებს კონკრეტულად მისამართს და არა ცვლადის მნიშვნელობას. მაგალითისთვის შევადაროთ მნიშვნელობები:

```js
let age = 21;
let age2 = age;
console.log(age === age); // true

const project = {
  name: 'educata',
};
const project1 = project;
console.log(project === project1); // true
```

ამ შემთხვევაში როცა ობიექტებს ვადარებთ, უშუალოდ არა მათ მნიშვნელობებს ვადარებთ არამედ მათ მისამართებს, ამიტომაც `project` `project1`-თან შედარების დროს დაგვიბრუნა `true`, რადგან 1 მისამართი არის. თუ შევცვლით `project1` მნიშვნელობას `project` მნიშვნელობაც შეიცვლება, რადგან საერთო მისამართ გააჩნიათ.

```js
const project = {
  name: 'educata',
};
const project1 = project;
console.log(project); // { name: 'educata' }
console.log(project1); // { name: 'educata' }
project1.name = 'iswavle';
console.log(project); // { name: 'iswavle' }
console.log(project1); // { name: 'iswavle' }
```

## ობიექტის კოპირება

როგორ მოვიქცეთ თუ ახალი ობიექტის შექმნა გვსურს, რომელსაც განსხვავებული მისამართი ექნება მაგრამ იგივე მნიშვნელობები. ასეთ დროს გვჭირდება შემდგომი მიდგომების გამოყენება:

- [`Object.assign()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign) მეთოდის გამოყენებით.
- `...` (spread) ოპერატორის გამოყენებით. სპრედ ოპერატორი გამოიყენება იმისათვის, რომ მნიშვნელობები ნელ-ნელა ამოვიღოთ ობიექტებიდან ([მასივებიდანაც](./doc/guides/javascript/array)).
- `JSON` გამოყენებით. [`JSON`](./doc/guides/javascript/json)-ს სტატია.

```js
const project = {
  name: 'educata',
};
const assignWay = Object.assign({}, project);
assignWay.name = 'iswavle';
console.log(project); // { name: 'educata' }
console.log(assignWay); // { name: 'iswavle' }
const spreadWay = { ...project };
spreadWay.name = 'EverREST';
console.log(project); // { name: 'educata' }
console.log(spreadWay); // { name: 'EverREST' }
const jsonWay = JSON.parse(JSON.stringify(project));
jsonWay.name = 'Educata tutorials';
console.log(project); // { name: 'educata' }
console.log(jsonWay); // { name: 'Educata tutorials' }
```

მსგავსი მიდგომების გამოყენებით შესაძლებელია იგივე ობიექტის **მნიშვნელობის** მინიჭება განსხვავებული **მისამართით**.

## შეჯამება

რეალურად მთელი ამ დროის განმავლობაში სულ იყენებდით ობიექტებს, დაწყებული `CSS`-დან დამთავრებული `JavaScript`-ით. `CSS`-ში როცა ნებისმიერ ელემენტს სტილავდით რეალურად ცვლიდით ობიექტებს, ხოლო `JavaScript`-ში თითქმის ყველაფერი არის ობიექტი და მის გარშემო ხდება მოქმედებები. `HTML`-ში საკმაოდ მალე დაიწყებთ ობიექტების გამოყენებას, [`DOM`](./doc/guides/javascript/dom) მანიპულაციის გზით.

`CSS` მაგალითი:

```css
body {
  margin: 0;
}
```

ფრჩხილებს თუ დაუკვირდებით იგივე ფრჩხილებია გამოყენებული, რასაც `JavaScript`-ში ობიექტზე მნიშვნელობის მისანიჭებლად ვიყენებთ, ანალოგიურად ხდება თვისების მინიჭებაც. ხოლო `JavaScript`-ში ნებისმიერ ადგილას სადაც `.` გამოვიყენოთ, უკვე ობიექტზე მანიპულაცია ხდებოდა (გარდა რიცხვისა).

იხილეთ ობიექტის მაგალითი [კოდის ედიტორში](./playground/simple/guides/javascript-object-basics).
