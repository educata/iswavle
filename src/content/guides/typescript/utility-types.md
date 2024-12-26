---
title: 'სასარგებლო ტიპები'
description: 'TypeScript-ის სასარგებლო ტიპები'
keywords: 'სასარგებლო ტიპები ტაიპსკრიპტსი, ts, record, partial, readonly, required, omit, pick'
---

ტაპსკრიპტში გვაქვს ბევრი სასარგებლო ტიპი. ეს ტიპები აღწერილია [ჯენერიკების](./doc/guides/typescript/generic) გამოყენებით.

მაგალითისთვის გვაქვს შემდგომი კოდი:

```ts
interface Currency {
  [key: string]: number;
}

const currency: Currency = {
  gel: 1,
  usd: 0.36,
  eur: 0.34,
};
```

ამ შემთხვევაში გვაქვს `Currency`-ის ინტერფეისი, რომელშიც მოთავსებული არის რიცხვითი ტიპის მნიშვნელობები.

იგივე ინტერფეისი შეგვეძლო უფრო მარტივად აგვეღწერა ტაიპსკრიპტის ჩაშენებული ტიპით, კერძოდ
[Record-ით](https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type).

```ts
type Currency = Record<string, number>;

const currency: Currency = {
  gel: 1,
  usd: 0.36,
  eur: 0.34,
};
```

## Record

`Record<Keys, Type>` ტიპი შექმნის ობიექტს, სადაც აღწერილი იქნება `Keys` თვისებები `Type` ტიპით.

```ts
type CatName = 'miffy' | 'boris' | 'mordred';

interface CatInfo {
  age: number;
  breed: string;
}

const cats: Record<CatName, CatInfo> = {
  miffy: { age: 10, breed: 'Persian' },
  boris: { age: 5, breed: 'Maine Coon' },
  mordred: { age: 16, breed: 'British Shorthair' },
};
```

## Partial

[`Partial<Type>`](https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype) ტიპი შექმნის ობიექტს, რომლის თვისებებიც იქნება **არასავალდებულოს** (optional).

```ts
interface Todo {
  title: string;
  description: string;
}

// ❌ ცუდი მიდგომა

interface fieldsToUpdateBadWay {
  title?: string;
  description?: string;
}

// ✅ კარგი მიდგომა

type fieldsToUpdateBetterWay = Partial<Todo>;

function updateTodo(todo: Todo, fieldsToUpdate: fieldsToUpdateBetterWay): Todo {
  return { ...todo, ...fieldsToUpdate };
}

const todo1 = {
  title: 'organize desk',
  description: 'clear clutter',
};

const todo2 = updateTodo(todo1, {
  description: 'throw out trash',
});
```

## Required

[`Required<Type>`](https://www.typescriptlang.org/docs/handbook/utility-types.html#requiredtype) ტიპი შექმნის ობიექტს, რომლის თვისებებიც იქნება **სავალდებულოს**.

```ts
interface Props {
  a?: number;
  b?: string;
}

const obj: Props = { a: 5 };

const obj2: Required<Props> = { a: 5 }; // Property 'b' is missing in type '{ a: number; }' but required in type 'Required<Props>'.
```

## Readonly

[Readonly<Type>](https://www.typescriptlang.org/docs/handbook/utility-types.html#requiredtype) ტიპი შექმნის ობიექტს, რომლის თვისებებიც იქნება `readonly`.
`readonly` თვისების მნიშვნელობის შეცვლა არ შეიძლება.

```ts
interface Todo {
  title: string;
}

const todo: Readonly<Todo> = {
  title: 'Delete inactive users',
};

todo.title = 'Hello'; // Cannot assign to 'title' because it is a read-only property.
```

## Pick

[`Pick<Type, Keys>`](https://www.typescriptlang.org/docs/handbook/utility-types.html#picktype-keys) ტიპი შექმნის ახალ ტიპს,
სადაც `Keys` მნიშვნელობები იქნება შერჩეული `Type`-დან.

```ts
type Email = `${string}@${string}.${string}`;

interface User {
  name: string;
  lastName: string;
  email: Email;
  password: string;
}

type UserCredentials = Pick<User, 'email' | 'password'>;

const user: UserCredentials = {
  email: 'example@user.ge',
  password: 'badpass123',
};
```

## Omit

[`Pick<Type, Keys>`](https://www.typescriptlang.org/docs/handbook/utility-types.html#picktype-keys) ტიპი შექმნის ახალ ტიპს,
სადაც `Keys` მნიშვნელობები იქნება ამოღებული `Type`-დან.

```ts
type Email = `${string}@${string}.${string}`;

interface User {
  name: string;
  lastName: string;
  email: Email;
  password: string;
}

type UserInfo = Omit<User, 'email' | 'password'>;

const user: UserInfo = {
  name: 'john',
  lastName: 'doe',
};
```

## შეჯამება

ამ სტატიაში განვიხილეთ ტაიპსკრიპტის სასარგებლო ტიპები. ტაიპსკრიპტს კიდევ ბევრი სასარგებლო ტიპი გააჩნია, რომლებსაც
შეგიძლიათ გაეცნოთ [Typescript utility types](https://www.typescriptlang.org/docs/handbook/utility-types.html) სტატიაში.

## გამოყენებული ლიტერატურა

- [Utility types](https://www.typescriptlang.org/docs/handbook/utility-types.html)
