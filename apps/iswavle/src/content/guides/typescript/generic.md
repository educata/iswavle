---
title: 'ჯენერიკი'
description: 'TypeScript-ში ჯენერიკების გამოყენება'
keywords: 'generic, ჯენერიკი, generics, ჯენერიკები'
---

პროგრამირებაში ერთ-ერთი კარგი პრინციპი არის DRY (Don't repeat yourself).
DRY მიდგომა გულისხმობს კოდის დუბლირების თავიდან აცილებას.

ხშირია მომენტი, როცა გვსურს ისეთი ტიპის შექმნა, რომელსაც მრავალჯერადად გამოვიყენებთ
სხვადასხვა მიდგომით. ზუსტად ესეთ დროს გვჭრდება [Generics](https://www.typescriptlang.org/docs/handbook/2/generics.html) (ჯენერიკები).

## რა არის ჯენერიკი?

ჯენერიკი არის მექანიზმი, რომელიც საშუალებას გვაძლევს ფუნქციები, ინტერფეისები და კლასები აღვწეროთ ისე,
რომ ტიპები იყოს დინამიური.

დასაწყისისთვის შევქმნათ ისეთი ფუქნცია, რომელიც უბრალოდ დაგვიბრუნებს ნებისმიერ გადაცემულ პარამეტრს.
ჯენერიკების გარეშე ეს კოდი გამოიყურება შემდეგნაირად:

```ts
function identity(arg: any): any {
  return arg;
}
```

ამ მიდგომის ნაკლი არის ის, რომ ფუნქციის გამოყენების დროს, დაბრუნებული მნიშვნელობა ყოველთვის იქნება `any`,
მიუხედავად იმისა, რომ მას შეიძლება კონკრეტული ტიპი, მაგალითად `number` ან `string` გადავცეთ,
რომელიც აშკარად არ შეესაბამება დაბრუნებულ ტიპს:

```ts
identity('Hello!'); // any
identity(9); // any
```

თუ ფუნქციაში მოვიშველიებთ ჯენერიკებს, შეგვიძლია პარამეტრის ტიპი გავხადოთ დინამიური,
ანუ ტაიპსკრიპტს მივცეთ საშუალება, რომ დეველოპერს ფუნქციის მოხმარების დროს მისცეს საჭირო მინიშნებები.

```ts
function identity<Type>(arg: Type): Type {
  return arg;
}

// ორივე ჩაწერა მიღებულია

function identity<T>(arg: T): T {
  return arg;
}
```

ამ შემთხვევაში `<Type>` (ან `<T>`) არის დროებითად (placeholder) დაწერილი ტიპი, რომელიც იმპლემენტაციის დროს
მიიღებს შესაბამის ტიპს. აქ ტიპის სახელს ჩვენ განვსაზღვრავთ.

ჯენერიკის სინტაქსი შემდეგია:

```
(function|interface|type|class)<T, ...> ...
```

- გამოყენება შეიძლება: ფუნქციებთან, ინტერფეისებთან, ტიპებთან და კლასებთან
- იმდენი placeholder ტიპის გადაცემა შეიძლება, რამდენიც გვსურს (`<TypeOne, TypeTwo, TypeThree>`)

```ts
function identity<T>(arg: T): T {
  return arg;
}

const stringIdentity = identity('Educata'); // string
const numberIdentity = identity(22); // number
const booleanIdentity = identity(true); // boolean
```

ასე მივიღეთ ფუნქცია, რომელიც გადაცემული პარამეტრტიდან ამოიცნობს ტიპს,
რომელსაც შემდეგ მიანიჭებს ჩვენ მიერ შექმნილ `T` placeholder-ს, ანუ პარამეტრის ტიპსა და დაბრუნებულ ტიპს.

ჯენერიკ ტიპების იმპლემენტაციის დროს placeholder-ის დაზუსტება უშუალოდაც შეიძლება:

```ts
interface User {
  name: string;
  id: string;
}

identity<User>({ name: 'Someone', id: '40132' });
```

ასე ტაიპსკრიპტს პირდაპირ ვეუბნებით, რომ პარამეტრსა და დაბრუნებულ ტიპში უნდა `User` ტიპს ელოდეს,
შესაბამისად, თუ პარამეტრის ადგილზე განზაზღვრის დროს არასწორ ტიპს გადავცემთ (მაგალითად თვისების ტიპს არასწორად დავწერთ),
ტაიპსკრიპტი გაგვიბრაზდება!

მაშასადამე, როცა საქმე ჯენერიკებს ეხება, ტაიპსკრიპტი ავტომატურად შეეცდება placeholder-ებს სათანადო ტიპები მიანიჭოს იმპლემენტაციიდან გამომდინარე,
თუმცა შესაძლებელია მათი უშუალოდ, ექსპლიციტურად მინიჭებაც.

### ტიპებთან გამოყენება

რამოდენიმე მაგალითი ტიპებთან მიმართებაში:

```ts
type Box<T> = {
  content: T;
};

const numberBox: Box<number> = { content: 27 };
const stringBox: Box<string> = { content: 'EverREST' };
const booleanBox: Box<boolean> = { content: true };

interface Point {
  x: number;
  y: number;
}

const pointBox: Box<Point> = {
  content: {
    x: 27,
    y: 22,
  },
};

type keyValuePair<K, V> = {
  key: K;
  value: V;
};

const user: keyValuePair<string, string> = {
  key: 'name',
  value: 'EverREST',
};

type Operation<T> = (a: T, b: T) => T;
const add: Operation<number> = (a, b) => a + b;
const concat: Operation<string> = (a, b) => a + b;

console.log(add(1, 2)); // 3
console.log(concat('Hello', 'World')); // HelloWorld
```

### ინტერფეისებთან გამოყენება

რამოდენიმე მაგალითი ინტერფეისებთან მიმართებაში:

```ts
interface ApiResponse<T> {
  status: number;
  success: boolean;
  data: T;
}

const projectResponse: ApiResponse<{ name: string }> = {
  status: 200,
  success: true,
  data: { name: 'ედუკატა' },
};

interface Dictionary<K, V> {
  add: (key: K, value: V) => void;
  get: (key: K) => V | undefined;
  remove: (key: K) => void;
}

function createNumberStringDictionary(): Dictionary<number, string> {
  const store: Record<number, string> = {};

  return {
    add(key: number, value: string) {
      store[key] = value;
    },
    get(key: number) {
      return store[key];
    },
    remove(key: number) {
      delete store[key];
    },
  };
}

const numberStringDictionary = createNumberStringDictionary();
numberStringDictionary.add(1, 'ერთი');
numberStringDictionary.add(2, 'ორი');
console.log(numberStringDictionary.get(1)); // ერთი
console.log(numberStringDictionary.get(2)); // ორი
numberStringDictionary.remove(1);
console.log(numberStringDictionary.get(1)); // undefined
```

### კლასებთან მიმართებაში

რამოდენიმე მაგალითი კლასებთან მიმართებაში:

```ts
class Container<T> {
  private value: T;

  constructor(value: T) {
    this.value = value;
  }

  getValue(): T {
    return this.value;
  }

  setValue(value: T): void {
    this.value = value;
  }
}

const numberContainer = new Container<number>(10);
console.log(numberContainer.getValue()); // 10
numberContainer.setValue(100);
console.log(numberContainer.getValue()); // 100

class PairManager<K, V> {
  private pairs: Array<[K, V]> = [];

  addPair(key: K, value: V): void {
    this.pairs.push([key, value]);
  }

  findValueByKey(key: K): V | undefined {
    const pair = this.pairs.find(([k]) => k === key);
    return pair ? pair[1] : undefined;
  }

  listAllPairs(): Array<[K, V]> {
    return this.pairs;
  }

  removePair(key: K): void {
    this.pairs = this.pairs.filter(([k]) => k !== key);
  }
}

const numberStringManager = new PairManager<number, string>();
numberStringManager.addPair(1, 'ავთანდილი');
numberStringManager.addPair(2, 'ტარიელი');
console.log(numberStringManager.findValueByKey(1)); // ავთანდილი
console.log(numberStringManager.findValueByKey(2)); // ტარიელი

numberStringManager.removePair(1);
console.log(numberStringManager.findValueByKey(1)); // undefined
console.log(numberStringManager.listAllPairs()); // [[2, "ტარიელი"]]
```

## ნაგულისხმევი ტიპი

ჯენერიკის ტიპი შეიძლება იყოს ნაგულისხმევიც. მისი სინტაქსი შემდეგია:

```
(function|interface|type|class)<T = DefaultType, ...> ...
```

`DefaultType` სინტაქსში ნიშნავს ნაგულისხმევ ტიპს, რომელიც გსურთ placeholder-ს მიენიჭოს, თუკი სხვა სათანადო ტიპი მას არ მიენიჭა.

მაგალითად:

```ts
class Container<T = unknown> {
  private value: T;

  constructor(value: T) {
    this.value = value;
  }

  getValue(): T {
    return this.value;
  }

  setValue(value: T): void {
    this.value = value;
  }
}
```

მინიჭების გარეშე თავდაპირველად იქენბა `unknown`.

## შეჯამება

ამ სტატიაში განვიხილეთ ჯენერიკი, რომელიც გვაძლევს საშუალებას, დინამიურად განვსაზღვროთ ტიპები,
რომლებიც შემდეგ კონკრეტულ ფორმას მიიღებენ იმპლემენტაციიდან გამომდინარე.

## გამოყენებული ლიტერატურა

- [Generics](https://www.typescriptlang.org/docs/handbook/2/generics.html)
