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
- `boolean` წარმოადგენს ლოგიკური ტიპის მნიშვნელობას (`true` ან `false`).
- `null` წარმოადგენს განუსაზღვრელობას, როცა ვიცით რა ტიპია თუმცა არ აქვს მნიშვნელობა.
- `undefined` წარმოადგენს სრულიად განუსაზღვრელობას, როცა არც ტიპი გვაქვს და არც მნიშვნელობა.

### ტიპის ავტომატური ამოცნობა

ტაიპსკრიპტს ხშირად ავტომატურად შეუძლია ტიპების ამოცნობა და წინასწარ მოგვცემს კომპილაციის (ან ედიტორის) შენიშვნას,
თუკი ტიპებს ერთმანეთში ავურევთ:

```ts
let something = "hello";
something = 5;
```

კომპილაციისას (ან ედიტორის მინიშნებაში) ტაიპსკრიპტი გვეტყვის, რომ არ შეიძლება `string` ტიპის ცვლადზე `number` ტიპის მინიჭება.

ზოგჯერ საჭიროა ტიპის მითითება ექსპლიციტურად, ამ შემთხვევაში შეგვიძლია ტიპის ანოტაცია.

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

რეალურად შეგვიძლია ყოველ ტიპს დასაწყისშივე გავუწეროთ ტიპი მაგრამ ეს არ არის სავალდებულო.
თუ ცვლადი პრიმიტიულია და გააჩნია საწყისი მნიშვნელობა, ტაიპსკრიპტი მას ავტომატურად ამოიცნობს.
`serverEndpoint`-ის შემთხვევაში ისეც ნათელია მინიჭებული მნიშვნელობის ტიპი და ზედმეტი იქნებოდა მისი ხელმეორედ დაზუსტება.
ობიექტების და მსგავსი რთული მონაცემების შემთხვევაში საქმე სხვანაირად გვაქვს.

:::info
თითოეული პრიმიტიული (`String`, `Number` და `Boolean`) ტიპის ჩაწერა შეიძლება **capital case**-ით,
რაც გულისხმობს განსაკუთრებულ ჩაშენებულ ტიპებს (მაგალითად `String` კლასის ინსტანცია),
თუმცა ისინი იშვიათად გვხვდება კოდში.
_ყოველთვის_  დაწერეთ პრიმიტიული ტიპები **lowercase**-ში: `string`, `number`, `boolean`.
:::

## მასივები

ტაიპსკრიპტში თითოეულ მნიშვნელობას შეგვიძლია მივანიჭოთ შესაბამისი ტიპი, მათშორის მასივებსაც.
`[1, 2, 3]` მსგავსი მასივის აღსაწერად შეგვიძლია ჩავწეროთ შემდგომი სინტაქსი: `number[]` ან `Array<number>`.
ორივე ფორმა მიღებულია ტიპიზირებისთვის. მეორე ვარიანტს (ჯენერიკებს - `T<U>`) განვიხილავთ შემდგომ სტატიაში.

```ts
const numbers: number[] = [1, 2, 3];

numbers.push("4"); // Argument of type 'string' is not assignable to parameter of type 'number';
```

ტაიპსკრიპტი უფლებას არ მოგვცემს, რომ რიცხვების მასივში დავამატოთ სხვა ტიპის მონაცემი.

### tuple

ხშირად მასივი შეიცავს ერთნაირი ტიპის ელემენტებს მაგრამ გვაქვს განსაკუთრებული შემთხვევებიც,
სადაც თითოეულ ინდექსზე წინასწარ განსაზღვრული ტიპის წევრები უნდა იყოს. ესეთ მასივს ეწოდება tuple.

მისი აღწერა ტაიპსკრიპტში ხდება შემდგომნაირად:

```ts
const tuple: [number, string, boolean] = [22, 'educata', true];
```

:::info
თუ მასივი შეიცავს შერეული ტიპის წევრებს, მაშინ ტაიპსკრიპტი ავტომატურად შეეცდება მისი tuple-ისებრი ტიპის ამოცნობას
და ხშირად ასეთ ცვლადებს ტიპის მინიჭება არ სჭირდებათ, თუ მათ საწყისი მნიშვნელობა უკვე გააჩნიათ.
:::

## any

JavaScript-ში ყველაფერი შეგვიძლია წარმოვიდგინოთ `any` ტიპად. `any` ტიპი გულისხმობს ნებისმიერ ტიპს, რაც პრაქტიკაში
**ძალიან ცუდია**. მაგალითად:

```js
let name = 'educata'; // "educata"
name = true; // "true"
name += 1; // "2"
```

ამ მაგალითში ჩანს, რომ ცვლადი ინიციალიზების დროს იყო ტექსტური ტიპის, შემდგომ გახდა ბულიანი და ბოლოს რიცხვი.
მსგავსი მიდგომა კოდში არის ძალიან ცუდი, ბევრი მიზეზის გამო.

ტაიპსკრიპტის მთელი იდეა მდგომარეობს ტიპების გამოყენებაში, ხოლო ტიპებზე უარის თქმა, `any`-ის გამოყენებით, სრულიად ეწინააღმდება მის აზრს.
მაშინ რატომ არსებობს ეს ტიპი? არსებობს იშვიათი ვითარებები, სადაც მონაცემი მართლა _ნებისმიერი_ ტიპის შეიძლება იყოს,
ან ისეთი შემთხვევები, სადაც ტაიპსკრიპტის გამოყენება უბრალოდ არ გვინდა ან არ გვიღირს.

როცა ტაიპსკრიპტში ტიპი განსაზღვრულია, იგი შესაბამისად გვაძლევს რჩევებს (hints) ცცვლადის ტიპიდან გამომდინარე.

მაგალითად:

```ts
let name = 'educata';
console.log(name.length); // 6
console.log(name.toFixed()); // ეგრევე გვიგდებს ერორს => Property 'toFixed' does not exist on type 'string'.

let something: any = 'educata';
console.log(something.length); // 6
console.log(something.toFixed()); // კოდის გაშვების შემდგომ გავიგებთ, რომ 'something'-ს არ გააჩნდა toFixed მეთოდი.
```

როცა ტიპი არ ვიცით უმჯობესია `unknown`-ის გამოყენება.

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

ტაიპსკრიპტში მიღებული პრაქტიკა არის ყოველი პარამეტრის ანოტაცია, წინააღმდეგ შემთხვევაში ის ჩაითვლება `any` ტიპად.

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

:::info
`tsconfig`-ის კონფიგურაციაში შეგვიძლია გამოვიყენოთ `noImplicitAny` თვისება,
რომელიც გაფრთხილების მაგივრად ერორს ამოაგდებს და გვაიძულებს, რომ ფუნქციის პარამეტრებს ექსპლიციტურად მივანიჭოთ ტიპები.
:::

არსებობს პარამეტრები, რომლებიც **არასავალდებულოა** და ფუნქცია სწორად მუშაობს მათი არარსებობის შემთხვევაშიც.
ასეთი პარამეტრები `?` ოპერატორით აღიწერება:

```ts
function greet(name: string, lastName?: string) {
  console.log(`Hello, ${name} ${lastName || ''}`);
}

### დაბრუნებული მნიშვნელობის ტიპი

ტაიპსკრიპტში ასევე შეგვიძლია დაბრუნებული მნიშვნელობის ტიპის აღწერაც.

```ts
function sayMyName(name: string): void {
  console.log(name, "You're Goddamn Right!");
}

function sum(a: number, b: number): number {
  return a + b;
}
```

`void`-ს ტიპი გულისხმობს სიცარიელეს, ანუ ფუნქცია არაფერს აბრუნებს.

`sum` ფუნქციის შემთხვევაში დაბრუნებული ტიპის მინიჭება აუცილებელი არ არის,
რადგან ტაიპსკრიპტს ავტომატურად შეუძლია მისი ამოცნობაც პარამეტრებიდან გამომდინარე,
თუმცა ზოგიერთ შემთხვევაში, ტიპის ექსპლიციტური ანოტაციით:

- კომპილატორს ვუზოგავთ დიდ დროს ([TS wiki](https://github.com/microsoft/TypeScript/wiki/Performance#using-type-annotations)) და რესურს.
- კოდი უფრო გარჩევადია.

### ასინქრონული ფუნქციის დაბრუნებული მნიშვნელობის ტიპი

ხშირად ფუნქციებში გვიწევს ასინქრონული მოქმედებები. რათქმაუნდა ტაიპსკრიპტში გვაქვს მისი აღწერის შესაძლებლობა:

```ts
function randomNumber(min: number, max: number): Promise<number> {
  return new Promise((resolve) => {
    resolve(Math.floor(Math.random() * (max - min + 1)) + min);
  });
}
```

`Promise<T>` და მსგავსი ტიპები განხილული იქნება [ჯენერიკ ტიპების](./doc/guides/typescript/generic) სტატიაში.

## Union type

არის შემთხვევები, როცა ერთი ცვლადი რამდენიმე ტიპის შეიძლება იყოს.

```ts
let someVariable = string | boolean | number;

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

ტაიპსკრიპტში არამხოლოდ არსებული ტიპების გამოყენება შეგვიძლია, არამედ ახლების შექმნაც.
ამისათვის ვიყენებთ `type` ქივორდს:

```ts
type id = number | string;

function printId(id: id) {
  console.log('თქვენი ID არის:' + id);
}


// ობიექტის ტიპის აღწერა
type User = {
  name: string;
  age: number;
}


// ფუნქციის ტიპის აღწერა
type NamePrintFunction = (user: User, format?: string) => string;
```

ასევე შესაძლებელია სტრუქტურირებული ტიპის შექმნაც, როცა, მაგალითად, გვინდა იმ სტრინგის ტიპის აღწერა,
რომელსაც კონკრეტულ მონაკვეთებში უნდა რიცხვები ეწეროს:

```ts
type rgb = `rgb(${number}, ${number}, ${number})`;

const rgbColor: rgb = 'rgb(255, 255, 255)';
const wrongRgbColor: rgb = 'rgb(255, 255, 255, 0.5)'; // Error: Type '"rgb(255, 255, 255, 0.5)"' is not assignable to type 'rgb'.
```

### Literal type

Literal ტიპი არის ისეთი ტიპი, რომელიც აღწერს განსაზღვრულ მნიშვნელობას.

:::info
`boolean`-ზე ისედაც განსაზღვრულია მნიშვნელობა: `true` ან `false`.
:::

```ts
type dir = 'ltr' | 'rtl';
type size = 's' | 'm' | 'l' | 'xl' | 'xxl';
type sizeNumbers = 1 | 2 | 3;

const shirtSize: size = 'k'; // Type '"k"' is not assignable to type 'size'.
```

ასე ცვლადის ტიპი არა უბრალოდ სტრინგი ან რიცხვია, არამედ **კონკრეტული** სტრინგისა ან რიცხვის მნიშვნელობები.

### Intersection type

ტაიპსკრიპტში შესაძლებელია ისეთი ტიპის აღწერაც, რომელიც გულისხმობს რამდენიმე ობიექტის ტიპის **გადაკვეთას**.
`&` ოპერატორი აერთიანებს ობიექტების **ყველა** თვისებას.

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

ამ მაგალითში განვსაზღვრეთ `Direction`-ის ენამი, რომელსაც ექნება შემდგომი შესაძლო კონსტანტური მნიშვნელობები:

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

მნიშვნელობები შეიცვლებოდა შემდგომნაირად:

- `Direction.Up` - 1-ს ტოლი
- `Direction.Down` - 2-ს ტოლი
- `Direction.Left` - 3-ს ტოლი
- `Direction.Right` - 4-ს ტოლი

ასე ვღებულობთ `Direction`-ის ენამს, სადაც პირველი მნიშვნელობის მიხედვით იცვლება დანარჩენი (პირველი ინდექსის შემდგომ, n + 1).

გაითვალისწინეთ, თუ ენამში, ერთზე მეტ ტიპს მივანიჭებთ მნიშვნელობას, მაშინ ჯობია ან მხოლოდ პირველი, ან ყოველი მნიშვნელობის აღწერა.
წინააღმდეგ შემთხვევაში, შესაძლებელია მნიშვნელობების დუბლირება გამოგივიდეთ, მაგალითად:

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

enum შეგვიძლია აღვწეროთ ტექსტურადაც. ტექსტური enum-ის შემხვევაში, ყოველი მნიშვნელობა უნდა იყოს აღწერილი.

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

ტექსტური ტიპის ენამს არ გააჩნია მნიშვნელობის ავტომატური ზრდა, ამიტომაც საჭიროა ყოველ მნიშვნელობა იყოს აღწერილი.

შეგვეძლო იგივე მნიშვნელობა union ტიპითად აღგვეწერა, მაგრამ არ გვექნებოდა ლამაზი ედიტორის მინიშნებები მათი გამოყენების დროს.

### ჰეტეროგენული enum

ტექნიკურად შეგვიძლია ენამებში შევურიოთ მნიშვნელობები (რიცხვი და ტექსტური) და მივიღოთ ჰეტეროგენული (Heterogeneous) ენამი,
თუმცა მსგავსი ენამები პრაქტიკაში ცუდია და გაუგებარს ტოვებს, თუ რის გაკეთებას ცდილობ:

```ts
enum BooleanLikeHeterogeneousEnum {
  No = 0,
  Yes = 'YES',
}
```

## Interfaces

პრიმიტიული ტიპების გარდა, ასევე ხშირად შეხვდებით ობიექტის ტიპებსაც.

ობიექტის ტიპის აღწერა შეიძლება ობიექტის დეკლარაციის დროს:

```ts
const coordinate: {
  x: number;
  y: number;
} = {
  x: 27;
  y: 22;
};
```

თუმცა მრავალჯერადად გამოყენებად ობიექტების ტიპს ვაცხადებთ `interface`-ით.

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

მსგავსი ინტერფეისი კარგია, მაგრამ უმჯობესია თუ მასში არსებულ არაპრიმიტიულ თვისებებს ცალკე ინტერფეისში ან ტიპში გავიტანთ:

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

რეალურად ინტერფეისების დაყოფა უფრო მეტ ნაწილადაც შეგვიძლია, რომ კოდში შემდგომ თავისუფლად გამოვიყენოთ ისინი ცალკ-ცალკე.

### extends

ტაიპსკრიპტში შეგვიძლია ერთი ტიპი დავაშენოთ მეორეს, `extends`-ის გამოყენებით.
`extends` შინაარსობრივად ზუსდატ ისე მუშაობს, როგორც ჯავასკრიპტის კლასებში.

მაგალითისთვის, წინა ნიმუში გავაუმჯობესოთ:

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

ასეთი დანაწევრებით კოდში შეგვიძლია სხვადასხვა ადგილას გამოვიყენოთ შესაბამისი პატარა ინტერფეისები, რომლებიც ხშირად დაგჭირდებათ.
ინტერფეისზე უსასრულოდ შეგიძლიათ გააკეთოთ `extend`.

გაითვალისწინეთ, პირდაპირ რომ ჩაგვეწერა:

```ts
interface User extends UserGeneralInfo, UserCredentials, UserLocation {}
```

მივიღებდით განსხვავებული ტიპის ობიექტს, რადგან ახლა `location` არა User-ის თვისება გამოვა, `UserLocation` ტიპით,
არამედ `User` ინტერფეისი მემკვიდრეობით მიიღებს `UserLocation` ინტერფეისის ცალკეული თვისებებს:

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
მსგავსი მნიშვნელობების აღსაწერად უბრალოდ `?`-ის დამატება არის საჭირო.

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
არასავალდებულო ტიპი გვაიძულებს კოდი გავთვალოთ იმ შემთხვევებზე, სადაც მნიშვნელობა შეიძლება არ არსებობდეს.
:::

### რეკურსიული ინტერფეისები

ტაიპსკრიპტი ასევე გვაძლევს შესაძლებლობას, ინტერფეისები აღვწეროთო რეკურსიულად.

მაგალითად წარმოიდგინეთ გვაქვს ნავიგაციის ობიექტი, რომლის ერთ-ერთი თვისებაც უნდა შეიცავდეს
იმავე ტიპის ნავიგაციის ობიექტების მასივს.

```ts
// ❌ ცუდი მიდგომა

interface NavigationTreeNode {
  title: string;
  path: string;
  children: { title: string; path: string; children: { title: string; path: string }[] }[];
}
```

ასეთი მიდგომით children-ში არსებული დანესტილი მონაცემების რაოდენობა შეზღუდულია.
ჩვენ ასე ვამბობთ, რომ რაღაც დონის შემდეგ (`NavigationTreeNode.children[0].children[0]`)
ობიექტს აღარ გააჩნია `children` თვისება, რაც არ არის რეკურსიული.

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
რეალურად iswavle-ს ვებგვერდის ნავიგაციაც მსგავს რეკურსიულ სტრუქტურაზეა დაყრდნობილი: იხილეთ [ინტერფეისის ფაილი](https://github.com/educata/iswavle/blob/main/src/app/shared/interfaces/navigation-tree-node.ts) და [ნავიგაციის ობიექტების ფაილები](https://github.com/educata/iswavle/tree/main/src/app/shared/consts/doc-navigation).
:::

### Index signatures

ინტერფეისში ასევე შეგვიძლია განვსაზღვროთ **თვისების აღმნიშვნელის ტიპი**.
ასეთი ხერხი გვჭირდება მაშინ, როცა ობიექტი უფრო დინამიურია.

მაგალითად გვსურს აღვწეროთ ვალუტის კონვერტაციის ინტერფეისი,
სადაც გაგვაჩნია წინასწარ განსაზღვრული ვალუტის თვისებები, თუმცა დეველოპმენტის დროს იმის შანსს ვტოვებთ,
რომ ობიექტში სხვა თვისებებიც შეიძლება გამოჩნდეს:

```ts
interface CurrencyExchangeRate {
  GEL: number;
  USD: number;
  EUR: number;
  [key: string]: number;
}
```

ასე განვსაზღვრეთ `GEL`, `USD` და `EUR`. თუმცა `[key: string]: number;` ჩაწერით ვგულისხმობთ
ნებისმიერ თვისებას ობიექტში, რომელიც აღიწერება სტრინგით და მნიშვნელობა აქვს რიცხვითი.

ამრიგად მივიღეთ დინამიური ობიექტი. მისი გამოყენება შემდგომია:

```ts
const rate: CurrencyExchangeRate = {
  GEL: 1,
  USD: 0.36,
  EUR: 0.34,
  TRL: 12.44,
};
```

TRL (თურქული ლირა) არ გვქონდა თავდაპირველ ინტერფეისში აღწერილი, თუმცა მისი ობიექტში დამატება მაინც შევძელით
index signatures-ის ტიპზე დაყრდნობით.

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

ამ თავში განვიხილეთ ტაიპსკრიპტის ძირითადი ტიპები და მათი აღწერის მეთოდები.
წინასწარ განსაზღვრული პრიმიტიული ტიპების გარდა, ახალი ტიპებისა და ინტერფეისების აღწერა შეგვიძლია შესაბამისი ქივორდების გამოყენებით.
ყოველ მნიშვნელობას საჭიროა ჰქონდეს შესაბამისი ტიპი. გაითვალისწინეთ, შემთხვევათა უმეტესობაში უნდა მოვერიდოთ **any**-ის გამოყენებას - უმჯობესია **unknown**-ის გამოყენება.
სწორი ტიპების აღწერით და მინიჭებით დეველოპმენტის დროს კოდში აღმოვფხვრით სავარაუდო შეცდომებს, რაც გვიზოგავს დროს და გვიქმნის კომფორტულ სამუშაო გარემოს.

## გამოყენებული ლიტერატურა

- [The Basics](https://www.typescriptlang.org/docs/handbook/2/basic-types.html)
- [Everyday Types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html)
- [Object Types](https://www.typescriptlang.org/docs/handbook/2/objects.html)
