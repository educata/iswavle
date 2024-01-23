---
title: 'ციკლები'
description: 'ციკლების გამოყენება JavaScript-ში'
keywords: 'while, do while, for, for in, for of, loop, loops, continue, break, ციკლი, ბიჯი, იტერაცია'
headings:
  - while
  - do...while
  - for
  - for...in
  - for...of
  - continue და break
  - შეჯამება
---

ციკლები გვთავაზობს მარტივ გზას, რომ რაღაც კოდის ფრაგმენტი გავიმეოროთ რამოდენიმეჯერ. ციკლი შეგვიძლია წარმოვიდგინოთ როგორც პირობითი ოპერატორი. კოდის რაღაც ფრაგმენტი მუშაობს მანამ სანამ მისი პირობა არის ჭეშმარიტი. თითოულ ციკლში შეგვიძლია გვქონდეს **ბიჯი** და **იტერაცია**. ბიჯი არის მნიშვნელობა, რის მიხედვითაც ვზრდით დამთვლელს (ცვლადს, რომლისმ იხედვიტაც ვითვლით თუ რამდენი იტერაცია უნდა შესრულდეს), ხოლო იტერაცია ეს არის მნიშვნელობა თუ რამდენჯერ უნდა გაეშვას ციკლი.

## while

[`while`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/while) ციკლი იმეორებს მოქმედებებს მანამ სანამ მისი პირობა არის ჭეშმარიტი. `while` ციკლი შეძლება იყოს პირობაზე დამოკიდებული ციკლიც და ასევე იტერაციული ციკლი. მეტწილადად მისი გამოყენება ხორციელდება, როგორც პირობაზე დამოკიდებული ციკლი. შევასრულოთ მარტივი მაგალითი: დავლოგოთ ყოველი რიცხვი 1 დან 100 მდე.

```js
let i = 0; // საწყისი მნიშვნელობა, მეორე ნაირად დამთვლელი
// ციკლმა იმუშავოს მანამ სანამ i ცვლადი ნაკლებია 100-ზე
while (i < 100) {
  console.log(i); // გამოგვაქვს მისი მნიშვნელობა კონკრეტული იტერაციის დროს
  i++; // ბიჯი იზრდება 1-ით | იგივე ინკრემენტი
}
```

ციკლი მუშაობს მანამ სანამ `while` პირობა არ მიიღებს `false`-ს მნიშვნელობას, მანამ სანამ მისი პირობა ღებულობს `true`-ს ციკლი ჩვეულებრივად ეშვება. ჩვენს შემთხვევაში ვიწყებთ 0-დან და ვზრდით ერთით ([ინკრემენტის საშუალებით](./guides/javascript/operations-operators#ინკრემენტ_და_დეკრემენტ_ოპერაციები)) 100-მდე, როცა 100 გახდება `i` მნიშვნელობა, შედარებისას დაგვიბრუნდება `false`, რადგან ვღებულობთ შემდგომ გამოსახულებას `100 < 100`.ხშირ შემთხვევაში ჩვენი პირობა კარგად უნდა იყოს ჩაწერილი, წინააღმდეგ შემთხევვაში შესაძლოა კოდი **ჩაგვეციკლოს**. ჩაციკვლა ეს არის პროცესი, როცა კოდი იმეორებს იგივე მოქმედებებს უსასრულოდ.

## do...while

[`do...while`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/do...while) საკმაოდ გავს `while` ციკლს, უბრალოდ გააჩნია ერთი მცირედი განსხვავება. `do...while` ციკლი პირველ იტერაციას შემოწმების გარეშე გაუშვებს, მისი პირობა მცდარიც, რომ იყოს ციკლი ერთხელ მაინც გაეშვება, დანარჩენი იტერაციებისთვის კი იდენტურია `while` ციკლთან მიმართებაში.

```js
let i = 100;
while (i < 100) {
  console.log(i);
  i++;
}

let j = 100;
do {
  console.log(j);
  j++;
} while (j < 100);
```

კონკრეტული მაგალითიდან `while` ციკლი ერთხელაც არ გაეშვება, ხოლო `do...while` ერთხელ მაინც გაეშვა. თუ დავიწყებთ 1 დან მთვლელის (`i` და `j`) რაოდენობას, შედეგი იქნება ორივე შემთხვევისთვის ერთნაირი.

## for

[`for`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for) არის იტერაციული ციკლი, რომელშიც მთვლელის მნიშვნელობა, პირობის მნიშვნელობა და ბიჯის მნიშვნელობა გაერთიანებული არის ერთ ადგილას. `while` და `do...while` ციკლში, ვაცხადებთ ცვალდებს, რომელიც ციკლშიც და ციკლის გარეთაც ხელმისწავდომი იყო, ხოლო `for` ციკლში შექმნილი ცვლადი მხოლოდ ხელმისაწვდომია ციკლისთვის. ეს ყველაფერი სრულდება `scope`-ს გამო, რომელიც განხილული იქნება [`scope-ს თავში`](./guides/javascript/scope).

```js
for (let i = 0; i < 100; i++) {
  // i შეიცვლება 0 დან 100 მდე
  console.log(i); // ილოგება i მნიშვნელობა
}
console.log(i); // undefined
```

ეს არის სტანდარტული `for` ციკლის სინტაქსი. აქვე შესაძლებელია მცირედი დაშვევების გაკეთება:

- ახლიდან არ შეიქმნას დამთვლელი ცვლადი (`let i`), არამედ შესაძლებელია არსებული მნიშვნელობის გამოყენება.
- არ არის სავალდებულო, ყოველთვის იგივე დამთვლელზე იყოს პირობა გაწერილი (მაგალითად: `i` ნაცვლად შეიძლება იყოს სხვა ცვლადი)
- არ არის სავალდებულო ბიჯის გაწერა ყოველთვის

```js
let i;
for (i = 10; i < 20; i++) {
  console.log(i);
}
console.log(i); // 20
```

კონკრეტულ მაგალითზე დაყრდონიბთ შეიმჩნევა, რომ `i` ცვლადი, ციკლის გარეთ არის გამოცხადებული და წვდომა ციკლის შიგნითაც და გარეთაც გვაქვს.

```js
for (let i = 0; i < 10; i += 2) {
  console.log(i);
}
```

ბიჯის რაოდენობა იზრდება 2 ით.

```js
for (let i = 0; i < 10; ) {
  let randomNumber = Math.round(Math.random() * 100);
  if (randomNumber % 2 === 0) {
    console.log(randomNumber);
    i++;
  }
  console.log('იტერაცია დასრულდა');
}
```

ბოლო მაგალითში გამოვიყენეთ შემთხვევითი რიცხვის დაგენერირების მეთოდი. [`Math.random`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random) არის ფსევდო რენდომი, რომელიც აბრუნებს 0 დან 1 მდე რიცხვს, მიღებულ შედეგს კი ვამბრავლებთ 100-ზე, რაც გვაძლევს 0 დან 100 მდე შემთხვევით რიცხვს. მიღებული რიცხვი დავამრგვალეთ [`Math.round`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/round) გამოყენებით. რეალურად ციკლი უნდა ყოფილიყო 0 დან 10 მდე თუმცა რადგანაც იტერაციის გაზრდა დამოკიდებულია შემთხვევით რიცხვზე, იტერაცია სრულდება უფრო მეტჯერ. შესადარებლად შეგვიძლია დავითვალოთ თუ რამდენჯერ გაეშვა კონსოლში "იტერაცია დასრულდა".

## for..in

[`for...in`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...in) ციკლი გამოიყენება ობიექტებთან. თუ გვსურს ყოველ ელემენტზე წვდომა ობიექტში ციკლის დროს სტანდარტული `for` ციკლი არ გამოდგება, რადგან ინდექსები ობიექტში ყოველთვის რიცხვები არ იქნება (0, 1, 2 და ა.შ).

```js
const projects = {
  company: 'iswavle',
  education: 'iswavle',
  restAPI: 'EverREST',
};

for (let i = 0; i < 3; i++) {
  console.log(projects[i]); // undefined ყველა ჯერზე
}

for (const item in projects) {
  console.log(item, projects[item]); // გასაღები(key) და მნიშვნელობა(property) დაილოგება ყოველ ჯერზე
}
```

მსგავს ტიპად ჩაწერილი `for...in` გვაძლევს შესაძლებლობას, რომ ყოველ ობიექტის მნიშვნელობაზე გადავატაროთ ციკლი. `item` ამ შემთხვევაში პირობითი ცვლადის სახელია, რაც შეგიძლიათ შეცვალოთ სასურველი სახელით.

## for...of

[`for...of`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of) არის ციკლი, რომელიც გამოიყენება იტერირებად ობიექტებთან, როგორებიცა: [`Array`](./guides/javascript/array), [`Map`](./guides/javascript/map), [`Set`](./guides/javascript/set). პირობითად თუ გვსურს მასივის ყოველ ელემენტზე ციკლის გადატარება შეგვიძლია შედეგს მივაღწიოთ ბევრი გზით თუმცა `for` შემთხვევაში იქნება 3 გზა:

```js
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

for (let i = 0; i < numbers.length; i++) {
  let number = numbers[i]; // პირდაპირ ლოგში დაწერაც შეიძლება თუმცა უკეთესი შედარებისთვის სხვა მაგალითებისთვის, ცალკე ცვლადში გავწეროთ
  console.log(number);
}

for (const key in numbers) {
  let number = numbers[key];
  console.log(number); // პირდაპირ ლოგში დაწერაც შეიძლება თუმცა უკეთესი შედარებისთვის სხვა მაგალითებისთვის, ცალკე ცვლადში გავწეროთ
}

for (const number of numbers) {
  console.log(number);
}

for (const [i, number] of numbers.entries()) {
  console.log(number, i); // დაილოგება რიცხვი და i მნიშვნელობაც თუ მერამდენე იტერაციაც არის
}
```

პირველი `for` ციკლი არის სტანდარტული სახე თუ როგორ შეიძლება მივიღოთ ყოველ მასივის ყოველ ელემენტზე ციკლი, სადაც რიგრიგობით ვწვდებით ელემენტებს ინდექსის მიხედვით. `for...in`-შიც მსგავს პროცეს გავდივართ, ვწვდებით ინდექსის მიხედვით. ხოლო `for...of`-ში პირდაპირ გვაქვს წვდომა მნიშვნელობაზე, შესაძლოა `for...of` მინუსი ის ყოფილიყო, რომ არ გვქონოდა ინდექსი თუმცა მე-4 მაგალითს თუ დაუკვირდებით შესაძლებელია `for...of`-შიც გვქონდეს ინდექსი [`Array.entries()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/entries) მეთოდის გამოყენებით, რომელიც აბრუნებს იტერირებაც ობიექტს.

## continue და break

ციკლში გვაქვს ორი ჩაშენებული ქოვირდი, რომელსაც შეუძლია იტერაცია გააგრძელოს ან შეწყვიტოს. `break` გამოიყენება მაშინ, როცა გვსურს ციკლის შეწყვეტა.

```js
// გავუშვათ უსასრულო ციკლი და შევწყვიტოთ მე-1000 იტერაციაზე
let index = 0;
while (true) {
  console.log(index++); // დავლოგოთ index ცვლადი და გავზარდოთ 1-ით
  if (index >= 1000) {
    // თუ index ცვლადი მეტია ან ტოლი 1000 ზე მაშინ შევწყვიტოთ ციკლი
    break;
  }
}

index = 0; // გავანულოთ შემდგომი ციკლისთვის
// იგივე მოქმედებები შევასრულოთ do...while ციკლშიც
do {
  console.log(index++); // დავლოგოთ index ცვლადი და გავზარდოთ 1-ით
  if (index >= 1000) {
    // თუ index ცვლადი მეტია ან ტოლი 1000 ზე მაშინ შევწყვიტოთ ციკლი
    break;
  }
} while (true);

for (let i = 0; i < 100; i++) {
  if (i === 50) {
    // შევწყვიტოთ ციკლი 50 იტერაციის შემდგომ
    break;
  }
  console.log(i);
}

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

for (const [i, number] of numbers.entries()) {
  if (i === 2) {
    // თუ ინდექსი არის 2ს ტოლი შევწყვიტოთ ციკლი
    break;
  }
  console.log(number); // დავლოგოთ რიცხვი
}
```

`continue` გამოიყენება მაშინ, როცა გვსურს იტერაციის გამოტოვება (ან თავიდან დაწყება).

```js
let i = 0;
while (i < 100) {
  i++; // i გავზარდოთ 1-ით
  if (i % 3 === 0) {
    // თუ 3-ს ჯერადი იტერაცია არის გამოვტოვოთ ეს იტერაცია
    continue;
  }
  console.log(i); // დავლოგოთ i
}

i = 0; // გავანულოთ შემდგომი ციკლისთვის
// იგივე მოქმედებები შევასრულოთ do...while ციკლშიც
do {
  i++; // i გავზარდოთ 1-ით
  if (i % 3 === 0) {
    // თუ 3-ს ჯერადი იტერაცია არის გამოვტოვოთ ეს იტერაცია
    continue;
  }
  console.log(i); // დავლოგოთ i
} while (i < 100);

for (let i = 0; i < 100; i++) {
  if (i % 2 === 0) {
    // თუ i არის ლუწი გამოვტოვოთ ეს იტერაცია
    continue;
  }
  console.log(i); // დავლოგოთ ყოველი i მნიშვნელობა
}

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

for (const [i, number] of numbers.entries()) {
  if (i % 2 !== 0) {
    // თუ ინდექსი არის კენტი გამოვტოვოთ ეს იტერაცია
    continue;
  }
  console.log(number); // დავლოგოთ რიცხვი
}
```

თუ არასწორ ადგილას მოვათავსებთ `continue`-ს შესაძლოს ციკლი ჩაგვეციკლოს. გაითვალისწინეთ, რომ უმჯობესია პრაქტიკაში `continue` მოთავსება იტერაციის გაზრდის შემდგომ.

## შეჯამება

ციკლები შეიძლება გამოვიყენოთ ერთი და იგივე პროცესების გასამეორებლად. თუ კარგად არ დავწერთ ციკლის პირობას ან არასწორ ადგილას მოვათავსებთ `continue` ჩაგვეციკლება კოდი. არსებობს 3 ძირითადი მიდგომა ციკლებისთვის: `while`, `do...while`, `for`. `while` და `do...while` კარგია პირობაზე დამოკიდებულ ციკლებზე (ლოგიკურ ცვლადზე), ხოლო `for` ციკლი იტერირებად სიტუაციაში. `for` გააჩნია 3 სახის გამოყენება: სტანდარტული, `for...in`, `for...of`.

იხილეთ ციკლის მაგალითები [კოდის ედიტორში](./playground/guides/javascript-loops).