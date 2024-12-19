---
title: 'ტიპები'
description: 'TypeScript-ის ტიპები'
keywords: 'types, ტიპები, ტიპიზირება'
---

ტაიპსკრიპტის ძირითადი იდეა არის ცვლადების სწორად **ტიპიზირება**, რაც გვეხმარება
დეველოპმენტის დროს შესაძლო შეცდომების პოვნაში.

## პრიმიტიული ტიპები

JavaScript-ში ხშირად შევხდებით შემდგომ [პრიმიტიულ ტიპებს](./doc/guides/javascript/data-types#პრიმიტიული_მნიშვნელობები):
`string`, `number`, `boolean`, `null` და `undefined`. თითოეულ ტიპს გააჩნია შესაბამისი ტიპი ტაიპსკრიპტში. ხშირ შემთხვევაში ტიპების სახელები იგივეა, რაც
[`typeof`](./doc/guides/javascript/data-types?search=typeof)-იდან დაბრუნებული მნიშვნელობები.

- `string` წარმოადგნეს ტექსტური ტიპის მნიშვნელობებს.
- `number` წარმოადგენს რიცხვითი ტიპის მნიშვნელობას (როგორც მთელს ასევე ათწილადასაც).
- `boolean` წარმოადგენს ლოგიკური ტიპის მნიშვნელობას (რომელსაც მხოლოდ 2 მნიშვნელობა აქვს `true` ან `false`).
- `null` წარმოადგენს განუსაზღვრელობას, როცა ვიცით რა ტიპია თუმცა არ აქვს მნიშვნელობა.
- `undefined` წარმოადგენს სრულიად განუსაზღვრელობას, როცა არც ტიპი გვაქვს და არც მნიშვნელობა.

### ტიპის ანოტაცია ცვლადებზე

როცა ცვლადების აღწერას ვიწყებთ `let`, `var` ან `const`-ით, შეგვიძლია სურვილისამებრ დავუმატოთ ტიპებიც.

```ts
let name: string;
name = 'Educata';

const websiteName = 'iswavle';
const serverEndpoint: string = 'https://api.everrest.educata.dev';
```

სამივე შემთხვევაში ტაიპსკრიპტმა იცის ცვლადების ტიპების შესახებ. ტიპის მინიჭება ხდება ცვლადის აღწერისას, შემდგომი სინტაქსით:

```
(let|var|const) variableName: type;
```

რეალურად შეგვიძლია ყოველ ტიპს დასაწყისშივე გავუწეროთ ტიპი მაგრამ არ არის სავალდებულო, ტაიპსკრიპტი ჩვენს ნაცვლად ისეც ასრულებს
ფარდებს მიღმა. `serverEndpoint`-ს შემთხვევაში ისეც ნათელია მინიჭებული მნიშვნელობა და ზედმეტი იქნებოდა მისი ხელმეორედ დაზუსტება.
არის გამონაკლისი შემთხვევები ობიექტებთან და კომპლექსურ ტიპებთან მაგრამ პრიმიტიულ ტიპებთან შეგიძლიათ არ დააზუსტოთ ესეთ შემთხვევაში.

:::info
თითოეული პრიმიტიული (`String`, `Number` და `Boolean`) ტიპის ჩაწერა შეიძლება **uppercase**-ით, რაც გულისხმობს
პირველი სიმბოლოს დიდი ასოთი ჩაწერას. რეალურად კი შესაძლებელია მსგავს ტიპად ჩაწერა თუმცა მიღებული სტანდარტია
**lowercase**-ით წერა.
:::

## მასივები

ტაიპსკრიპტში თითოეულ მნიშვნელობას შეგვიძლია მივანიჭოთ შესაბამისი ტიპი, მათშორის მასივებსაც.
`[1, 2, 3]` მსგავსი მასივის აღსაწერად შეგვიძლია ჩავწეროთ შემდგომი სინტაქსი: `number[]` ან `Array<number>`.
ორივე ფორმა მიღებულია ტიპიზირებისთვის. უფრო დეტალურად ჯენერიკებს `T<U>` განვიხილავთ შემდგომ სტატიაში.

### tuple

სწორი მიდგომა არის, როცა მასივი შეიცავს ერთნაირი ტიპის ელემენტებს მაგრამ გვაქვს განსაკუთრებული შემთხვევებიც,
როცა მასივი შეიცავს განსხვავებული ტიპის ელემენტებს. ესეთ მასივს ეწოდება tuple.

მისი აღწერა ტაიპსკრიპტში ხდება შემდგომნაირად:

```ts
const tuple: [number, string, boolean] = [22, 'educata', true];
```

:::info
თუ tuple-ს ტიპი არ გაქვთ შექმნილი მაშინი მისი ანოტაცია ზედმეტია, რადგან typescript-ი ავტომატურად განსაზღვრავს მის მნიშვნელობას.
:::

## any

JavaScript-ში ყველაფერი შეგვიძლია წარმოვიდგინოთ, როგორც `any` ტიპად. `any` ტიპი გულისხმობს ნებისმიერ ტიპს, რაც პრაქტიკაში
**ძალიან ცუდია**. მაგალითად:

```js
let name = 'educata'; // "educata"
name = true; // "true"
name += 1; // "2"
```

ამ მაგალითში ჩანს, რომ ცვლადი ინიციალიზების დროს იყო ტექსტური ტიპის, შემდგომ გახდა ლოგიკური ტიპის და ბოლოს რიცხვითი ტიპის.
მსგავსი მიდგომა კოდში არის ძალიან ცუდი, ბევრი მიზეზის გამო.

ტაიპსკრიპტის მთელი იდეა მდგომარეობს ტიპების გამოყენებაში, ხოლო ტიპებზე უარის თქმა `any`-ს გამოყენებით სრულიად ეწინააღმდება მის აზრს.

როცა ტაიპსკრიპტში ტიპი განსაზღვრულია შესაბამისად გვაძლევს რჩევებს (hints) ტიპის გამოყენებისდ დროს.

მაგალითად:

```ts
let name = 'educata';
console.log(name.length); // 6
console.log(name.toFixed()); // ეგრევე გვიგდებს ერორს => Property 'toFixed' does not exist on type 'string'.

let something: any = 'educata';
console.log(something.length); // 6
console.log(something.toFixed()); // კოდის გაშვების შემდგომ გავიგებთ, რომ 'something'-ს არ გააჩნდა toFixed მეთოდი.
```

როცა ტიპი არ ვიცით უმჯობესია `unknown`-ს გამოყენება.

:::info
`tsconfig`-ის კონფიგურაციაში, შეგვიძლია გამოვიყენოთ `noImplicitAny` თვისება, რაც გვაიძულებს `any`-ს არ გამოყენებას.
:::

## unknown

`unknown` ტიპით განვსაზღვრავთ, რომ მისი მნიშვნელობა არ ვიცით ამჟამად თუმცა სამომავლოდ შეგვეძლება მისი სწორ ტიპად გადაკეთება.

```ts
// ❌ არასწორი გამოყენება
let something: any;
something.sort();

// ✅ სწორი გამოყენება
let something1: unknown;
something1.sort(); // 'something1' is of type 'unknown'.
```

## ფუნქციები

ფუნქციების აღწერაც შეგვიძლია უფრო დეტალურად ტაიპსკრიპტში.

### პარამეტრის ანოტაცია

ტაიპსკრიპტში მიღებული პრაქტიკა არის ყოველი პარამეტრის ანოტაცია, წინააღმდეგ შემთხვევაში ჩათვლის, როგორც `any` ტიპად.

```ts
function sayMyName(name) {
  // ...
}
```

ამ კოდით ვღებულობთ ორ გაფრთხილებას:

- `'name'` is declared but its value is never read.
- Parameter `'name'` implicitly has an 'any' type.

უმჯობესია ყოველთვის კოდში გამოუყენებელი ცვლადი / მნიშვნელობა წავშალოთ და აღვწეროთ მაშინ როცა საჭიროა, ხოლო მეორე გაფრთხილება
მიუთითებს `any` ტიპს.

```ts
// ✅ სწორი გამოყენება
function sayMyName(name: string) {
  console.log('Now, say my name', name, "You're Goddamn Right!");
}
```

### დაბრუნებული მნიშვნელობის ტიპი

ტაიპსკრიპტში ასევე შეგვიძლია დაბრუნებული მნიშვნელობის ტიპის აღწერაც. მიღებული პრაქტიკა არის ყოველთვის მისი აღწერა.

```ts
function sayMyName(name: string): void {
  console.log('Now, say my name', name, "You're Goddamn Right!");
}

function sum(a: number, b: number): number {
  return a + b;
}
```

`void`-ს ტიპი გულისხმობს სიცარიელეს, ანუ ფუნქციამ არაფერი დააბრუნა. მისი თითქმის გამოყენება იგივეა, რაც `undefined`.

შეიძლება გაგიჩნდეთ კითხვა თუ რატომ არის საჭირო დაბრუნებული მნიშვნელობის ანოტაცია, როცა ისედაც ჩანს დაბრუნებული ტიპის მნიშვნელობა.

- კომპილატორს ვუზოგავთ დიდ დროს ([TS wiki](https://github.com/microsoft/TypeScript/wiki/Performance#using-type-annotations)) და რესურს.
- კოდი უფრო გარჩევადია და სწრაფი (აღარ უწევს ზედმეტი გარემოს შექმნა და მასში კოდის გაშვება).

### ასინქრონული ფუნქციის დაბრუნებული მნიშვნელობის ტიპი

ხშირად ფუნქციებში გვიწევს ასინქრონული მოქმედებები. რათქმაუნდა ტაიპსკრიპტში გვაქვს შესაძლებლობა მისი აღწერის:

```ts
function randomNumber(min: number, max: number): Promise<number> {
  return new Promise((resolve) => {
    resolve(Math.floor(Math.random() * (max - min + 1)) + min);
  });
}
```

`Promise<T>` და მსგავსი ტიპები განხილული იქნება [ჯენერიკ ტიპების](./doc/guides/typescript/generic) სტატიაში.

## Union type

არის შემთხვევები, როცა მნიშვნელობა შეიძლება დაგვჭირდეს ორი სხვადასხვა ტიპით.

```ts
function printId(id: number | string) {
  console.log('თქვენი ID არის:' + id);
}
```

union ტიპის შესაქმნელად საჭიროა შემდგომი სინტაქსი:

```
value: type_1 | type_2 | ...
```

ასე მივიღეთ `id`-ს პარამეტრი, რომელიც შეიძლება იყოს `number`-ც და `string`-ც.

## Type

ტაიპსკრიპტი არამხოლოდ არსებული ტიპების გამოყენების უფლებას გვაძლევს არამედ შეგვიძლია ახალიც შევქმნათ.

```ts
type id = number | string;

function printId(id: id) {
  console.log('თქვენი ID არის:' + id);
}
```

არამხოლოდ არსებული ტიპის გამოყენება შეგვიძლია, არამედ შეგვიძლია სტრუქტურიზირებული ტიპის შექმნაც:

```ts
type rgb = `rgb(${number}, ${number}, ${number})`;

const rgbColor: rgb = 'rgb(255, 255, 255)';
const wrongRgbColor: rgb = 'rgb(255, 255, 255, 0.5)'; // Error: Type '"rgb(255, 255, 255, 0.5)"' is not assignable to type 'rgb'.
```

### Literal type

Literal ტიპი არის განსაზღვრული მნიშვნელობა.
პრიმიტიულ ტიპებთან მიმართებაში (`string` და `number`) შეგვიძლია განვსაზღვროთ კონკრეტული მნიშვნელობა.

:::info
`boolean`-ზე ისედაც განსაზღვრულია მნიშვნელობა: `true` ან `false`.
:::

```ts
type dir = 'ltr' | 'rtl';
type size = 's' | 'm' | 'l' | 'xl' | 'xxl';
type sizeNumbers = 1 | 2 | 3;

const shirtSize: size = 'k'; // Type '"k"' is not assignable to type 'size'.
```

### Intersection type

ტაიპსკრიპტში ორი ტიპის გაერთიანება შეგვიძლია შემდგომნაირად:

```ts
type UserGeneralInfo = {
  name: string;
  age: number;
};

type UserCredentials = {
  email: string;
  password: string;
};

type User = UserGeneralInfo & UserCredentials;
```

## Enums

Enum არის ტიპის აღწერის საშუალება, რომელსაც შეიძლება ჰქონდეს რამდენიმე კონსტანტური მნიშვნელობიდან შერჩეული მნიშვნელობა.
ტაიპსკრიპტში შესაძლებელია რიცხობრივი და ტექსტური ტიპის ენამების შექმნა.

### რიცხობრივი enum

```ts
enum Direction {
  Up,
  Down,
  Left,
  Right,
}
```

ამ მაგალითად განვსაზღვრეთ `Direction`-ს ენამი, რომელსაც ექნება შემდგომი შესაძლო კონსტანტური მნიშვნელობები:

- `Direction.Up` - 0-ს ტოლი
- `Direction.Down` - 1-ს ტოლი
- `Direction.Left` - 2-ს ტოლი
- `Direction.Right` - 3-ს ტოლი

შეგვიძლია საწყისი მნიშვნელობა შევცვალოთ:

```ts
enum Direction {
  Up = 1,
  Down,
  Left,
  Right,
}
```

მნიშვნელობები შეიცვლებოდა შემდგომ ნაირად:

- `Direction.Up` - 1-ს ტოლი
- `Direction.Down` - 2-ს ტოლი
- `Direction.Left` - 3-ს ტოლი
- `Direction.Right` - 4-ს ტოლი

ასე ვღებულობთ `Direction`-ს ენამს, სადაც პირველი მნიშვნელობის მიხედვით იცვლება შემდგომი მნიშვნელობები (პირველი ინდექსის შემდგომ, n + 1).

გაითვალისწინეთ თუ ენამში, ერთზე მეტ ტიპს მიანიჭებს მნიშვნელობას, მაშინ ჯობია ყოველი მნიშვნელობის აღწერა,
წინააღმდეგ შემთხვევაში შესაძლებელია დუბლირება გამოგივიდეთ მნიშვნელობების, მაგალითად:

```ts
enum Direction {
  Up = 1,
  Down,
  Left = 2,
  Right,
}

console.log(Direction.Up); // 1
console.log(Direction.Down); // 2
console.log(Direction.Left); // 2
console.log(Direction.Right); // 3
```

### ტექსტური enum

მსგავსი enum შეგვიძლია აღვწეროთ ტექსტური ტიპისაც. ტექსტური enum-ს დროს, ყოველი მნიშვნელობა უნდა იყოს აღწერილი.

```ts
enum Direction {
  Up = 'UP',
  Down = 'DOWN',
  Left = 'LEFT',
  Right = 'RIGHT',
}

function move(dir: Direction) {
  switch(dir): {
    case Direction.Up: {
      handleMoveUp();
      break;
    }
    case Direction.Down: {
      handleMoveDown();
      break;
    }
    case Direction.Left: {
      handleMoveLeft();
      break;
    }
    case Direction.Right: {
      handleMoveRight():
      break;
    }
    default: {
      handleMoveIncorrectInput();
      break;
    }
  }
}
```

ტექსტური ტიპის ენამს, არ გააჩნია მნიშვნელობის ავტომატური ზრდა, ამიტომაც საჭიროა ყოველ მნიშვნელობა იყოს აღწერილი.

შეგვეძლო იგივე მნიშვნელობა `type`-თაც აგვეღწერა მაგრამ არ გვექნებოდა ლამაზი hint გამოყენების დროს.

### ჰეტეროგენული enum

ტექნიკურად შეგვიძლია ენამებში შევურიოთ მნიშვნელობები (რიცხვი და ტექსტური) და მივიღოთ ჰეტეროგენული (Heterogeneous) ენამი.
თუმცა მსგავსი ენამები პრაქტიკაში ცუდია და არანაირ აზრს არ ტოვებს თუ რის გაკეთებას ცდილობ:

```ts
enum BooleanLikeHeterogeneousEnum {
  No = 0,
  Yes = 'YES',
}
```

## Interfaces

პრიმიტიული ტიპების გარდა, ასევე ხშირად შეხვდებით ობიექტის ტიპებსაც.

ობიექტის ტიპის აღწერა შეიძლება შემდგომნაირად:

```ts
const coordinate: {
  x: number;
  y: number;
} = {
  x: 27;
  y: 22;
};
```

ასევე შეგვიძლია ობიექტის მნიშვნელობა წარმოვადგინოთ, როგორც `interface`.

```ts
interface Coordinate {
  x: number;
  y: number;
  moveTo(nextCoordinate: Coordinate): void;
}

const pointA: Coordinate = {
  x: 0,
  y: 0,
  moveTo(nextCoordinate: Coordinate) {
    this.x = nextCoordinate.x;
    this.y = nextCoordinate.y;
  },
};

console.log(pointA.x); // 27
console.log(pointA.y); // 22
pointA.moveTo({ x: 100, y: 100, moveTo: pointA.moveTo });
console.log(pointA.x); // 100
console.log(pointA.y); // 100
```

`interface`-ში შეგვიძლია ყველანაირი ტიპის მნიშვნელობის გამოყენება და აღწერა:

```ts
interface User {
  id: string | number;
  name: string;
  email: `${string}@${string}.${string}`;
  password: string;
  age: number;
  location: {
    city: string;
    adress: string;
    zip: number;
  };
}
```

მსგავსი ინტერფეისი კი კარგია მაგრამ უმჯობესია თუ მასში ობიექტია ცალკე ინტერფეისში გავიტანოთ ან ახალი ტიპი:

```ts
type UserId = string | number;
type UserEmail = `${string}@${string}.${string}`;

interface UserLocation {
  city: string;
  adress: string;
  zip: number;
}

interface User {
  id: UserId;
  name: string;
  email: UserEmail;
  password: string;
  age: number;
  location: UserLocation;
}
```

რეალურად ინტერფეისების დაყოფა უფრო მეტნაწილადაც შეგვიძლია, რომ კოდში შემდგომ თავისუფლად გამოვიყენოთ ისინი ნაწილ-ნაწილ.

### extends

ტაიპსკრიპტში შეგვიძლია ერთი ტიპი დავაშენოთ მეორეს `extends`-ს გამოყენებით.

მაგალითისთვის იგივე წინა მაგალითის ჩაწერა გავაუმჯობესოთ:

```ts
type UserId = string | number;
type UserEmail = `${string}@${string}.${string}`;

interface UserCredentials {
  email: UserEmail;
  password: string;
}

interface UserGeneralInfo {
  id: UserId;
  name: string;
  age: number;
}

interface UserLocation {
  city: string;
  adress: string;
  zip: number;
}

interface User extends UserGeneralInfo, UserCredentials {
  location: UserLocation;
}
```

ასეთი დანაწევრებით კოდში შეგვიძლია სხვადასხვა ადგილას გამოვიყენოთ შესაბამისი პატარა ინტერფეისები, რაც ხშირად დაგჭირდებათ.
ინტერფეისზე უსასრულოდ შეგიძლიათ გააკეთოთ `extend`.

გაითვალისწინეთ, პირდაპირ რომ ჩაგვეწერა:

```ts
interface User extends UserGeneralInfo, UserCredentials, UserLocation {}
```

მივიღებდით განსხვავებული ტიპის ობიექტს:

```ts
// ...
// იგივე ტიპები და ინტერფეისები

interface User1 extends UserGeneralInfo, UserCredentials {
  location: UserLocation;
}
interface User2 extends UserGeneralInfo, UserCredentials, UserLocation {}

const user1: User1 = {
  id: 1,
  age: 1,
  name: 'educata',
  email: 'info@educata.dev',
  password: '********',
  location: {
    city: 'Tbilisi',
    adress: 'heart',
    zip: 1234,
  },
};

const user2: User2 = {
  id: 2,
  age: 1,
  name: 'educata',
  email: 'info@educata.dev',
  password: '********',
  city: 'Tbilisi',
  adress: 'heart',
  zip: 1234,
};
```

### არასავალდებულო მნიშვნელობები ინტერფეისში

ხშირია სიტუაცია, როცა ინტერფეისში რაღაც მნიშვნელობა არ გვჭირდება.
მსგავსი მნიშვნელობების აღსაწერად უბრალოდ `?` დამატება არის საჭირო.

```ts
interface Coordinate {
  x: number;
  y: number;
  distanceFromBasePoint?: number;
  moveTo?(nextCoordinate: Coordinate): void;
}

const pointA: Coordinate = {
  x: 0,
  y: 0,
  moveTo(nextCoordinate: Coordinate) {
    this.x = nextCoordinate.x;
    this.y = nextCoordinate.y;
  },
};

console.log(pointA.distanceFromBasePoint + 1); // 'pointA.distanceFromBasePoint' is possibly 'undefined'
```

მოცემულ მაგალითში ვცდილობთ optional მნიშვნელობაზე ერთის დამატებას, ხოლო ტაიპსკრიპტი გვაფრთხილებს შესაძლო შეცდომაზე.

:::info
მიღებულია პრაქტიკაში optional მნიშვნელობებზე ჯერ შევამოწმოთ არის თუ არა აღწერილი და მივანიჭოთ შესაბამისი ნაგულისხმევი მნიშვნელობა ან
გამოვიყენოთ განსხვავებულად.
:::

### რეკურსიული ინტერფეისები

ტაიპსკრიპტი ასევე გვაძლევს შესაძლებლობას, ინტერფეისები აღვწეროთო რეკურსიულად.

მაგალითად წარმოიდგინეთ გვაქვს ნავიგაციის ობიექტი, რომელშიც მოთავსებულია იგივე ტიპის ინტეფეისი:

```ts
// ❌ ცუდი მიდგომა

interface NavigationTreeNode {
  title: string;
  path: string;
  children: { title: string; path: string; children: { title: string; path: string }[] }[];
}
```

ასეთი მიდგომით ხელით მოგვიწევს გამეორება ყოველჯერზე და გავჩერდებით რომელიღაცა დონეზე.

```ts
// ✅ სწორი მიდგომა

interface NavigationTreeNode {
  title: string;
  path: string;
  children?: NavigationTreeNode[];
}

// მარტივი გამოყენება

const docGuide: NavigationTreeNode = {
  title: 'გზამკლევი',
  path: 'doc/guides',
  children: [
    {
      title: 'Typescript',
      path: 'typescript',
      children: [
        {
          title: 'Types',
          path: 'type',
        },
      ],
    },
  ],
};
```

:::info
რეალურად iswavle-ს ვებგვერდის ნავიგაციაც მსგავს რეკურსიულ ნავიგაციაზეა დაყრდნობილი: [ინტერფეისის ფაილი](https://github.com/educata/iswavle/blob/main/src/app/shared/interfaces/navigation-tree-node.ts) და [ნავიგაციის ობიექტების ფაილები](https://github.com/educata/iswavle/tree/main/src/app/shared/consts/doc-navigation).
:::

### Index signatures

ინტერფეისში ასევე შეგვიძლია განვსაზღვროთ დინამიური ტიპის მნიშვნელობებიც.

მაგალითად გვსურს აღვწეროთ ვალუტის კონვერტაციის ინტერფეისი:

```ts
interface CurrencyExchangeRate {
  GEL: number;
  USD: number;
  EUR: number;
  [key: string]: number;
}
```

ასე განვსაზღვრეთ `GEL`, `USD` და `EUR`. თუმცა `[key: string]: number;` ჩაწერით ვგულისხმობთ
ნებისმიერ მნიშვნელობას ობიექტში, რომელიც აღიწერება სტრინგით და მნიშვნელობა აქვს რიცხვში.

ამრიგად მივიღეთ დინამიური ობიექტი. მისი გამოყენება შემდგომია:

```ts
const rate: CurrencyExchangeRate = {
  GEL: 1,
  USD: 0.36,
  EUR: 0.34,
  TRL: 12.44,
};
```

TRL (ლირა) არ გვქონდა თავდაპირველ ინტერფეისში აღწერილი თუმცა მისი აღწერა შემდგომ მაინც შევძელით
index signatures-ს გამოყენების მიხედვით.

## never

`never` ტიპი TypeScript-ში გამოიყენება იმ შემთხვევებში, როდესაც ფუნქცია არასოდეს აბრუნებს მნიშვნელობას.
ეს შეიძლება მოხდეს რიგი მიზეზების გამო, თუმცა ყველაზე ხშირად ხდება შეცდომების კონტროლის დროს.

```ts
function throwError(message: string): never {
  throw new Error(message);
}
```

### განსხვავება never-სა და void-ს შორის

| `void`                                                                                          | `never`                                                                                  |
| ----------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| **მიუთითებს, რომ ფუნქციას არ აბრუნებს რაიმე მნიშვნელობას**, მაგრამ პროგრამა აგრძელებს მუშაობას. | **მიუთითებს, რომ ფუნქცია არასოდეს აბრუნებს მნიშვნელობას** და ვერ გააგრძელებს შესრულებას. |
| გამოიყენება ფუნქციებისთვის, რომლებიც რაიმე ოპერაციას ასრულებენ, მაგრამ არაფერს აბრუნებენ.       | გამოიყენება ფუნქციებისთვის, რომლებიც შეცდომას "ისვრიან" ან უსასრულო ციკლში არიან.        |

## შეჯამება

ამ თავში განვიხილეთ ტაიპსკრიპტის ძირითადი ტიპები და მისი აღწერის მეთოდები.
პრიმიტიული ტიპები უკვე აღწერილი არის, ახალი ტიპის და ინტერფეისის აღწერა შეგვიძლია შესაბამისი keywords-ს გამოყენებით.
ყოველ მნიშვნელობას საჭიროა ჰქონდეს შესაბამისი ტიპი. ძალიან ცუდია პრაქტიკაში **any**-ს გამოყენება, უმჯობესია **unknown**-ს გამოყენება.
სწორი ტიპების აღწერით და მინიჭებით დეველოპმენტის დროს ვგებულობთ სავარაუდო შეცდომებს, რაც გვიზოგავს დროს და გვიქმნის სასურველ სამუშაო გარემოს.
