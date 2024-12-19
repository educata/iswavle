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

დასაწყისისთვის შევქმნათ ისეთი ფუქნცია, რომელიც გადაცემული პარამეტრის მიხედვით დაგვიბრუნებს მის ტიპს.
ჯენერიკების გარეშე ეს კოდი გამოიყურება შემდგომნაირად:

```ts
function identity(arg: number): number {
  return arg;
}
```

ამ შემთხვევაში მხოლოდ რიცხვზე მოქმედებს სწორად, რადგან გადაცემული პარამეტრი არის რიცხვი და გვიბრუნებს რიცხვს.
`number`-ს ნაცვლად შეგვიძლია გამოვიყენოთ `any`:

```ts
function identity(arg: any): any {
  return arg;
}
```

შედარებით ეხლა ეს კოდი უფრო "დინამიურია" მაგრამ [`any`](./doc/guides/typescript/types#any) ტიპი არის ძალიან ცუდი.

ყველაზე კარგი მიდგომა იქნებოდა ჯენერიკის გამოყენება.

```ts
function identity<Type>(arg: Type): Type {
  return arg;
}

// ორივე ჩაწერა მიღებულია

function identity<T>(arg: T): T {
  return arg;
}
```

ამ შემთხვევაში `<Type>` (ან `<T>`) არის დროებითად (placeholder) დაწერილი ტიპი, რომელიც ინიციალიზების დროს
მიიღებს შესაბამის ტიპს.

ჯენერიკის სინტაქსი შემდგომია:

```
(function|interface|type|class)<T, ...> ...
```

- გამოყენება შეიძლება: ფუნქციებთან, ინტერფეისებთან, ტიპებთან,და კლასებთან
- იმდენი placeholder ტიპის გადაცემა შეიძლება რამდენიც გვსურს

```ts
function identity<T>(arg: T): T {
  return arg;
}

const stringIdentity = identity<string>('Educata'); // string
const numberIdentity = identity<number>(22); // number
const booleanIdentity = identity<boolean>(true); // boolean
```

ასე მივიღეთ ფუნქცია, რომელიც გადაცემული პარამეტრტის ტიპის მიხედვით გვიბრუნებს ტიპს.

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

### ინტერფეისებტან გამოყენება

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

ჯენერიკის ტიპი შეიძლება იყოს ნაგულისხმევიც. მისი სინტაქსი შემდგომია:

```
(function|interface|type|class)<T = DefaultType, ...> ...
```

`DefaultType`-ში იგულისხმება ნებისმიერი ნაგულისხმევი ტიპი, რომელიც გსურთ მინიჭების გარეშე, რომ ჰქონდეს.

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

ამ სტატიაში განვიხილეთ ჯენერიკი, რომელიც გვაძლევს საშუალებას დინამიურ ტიპად შევქმნათ სხვადასხვა ტიპები, ობიექტები და კლასები.
