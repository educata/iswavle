---
title: 'კომპლექსური დუბლიკატების ფილტრაცია'
description: 'კომპლექსური დუბლიკატების ფილტრაცია მასივიდან'
difficulty: 'medium'
tags: ['loop', 'array', 'dataStructures']
keywords: 'loop, array, data structures, filter, duplication filter'
---

მოცემულია მასივი `persons`.

თქვენი დავალებაა ამ მასივიდან დუბლირებული ობიექტების წაშლა.

გაითვალისწინეთ, მასივი შეიცავს მხოლოდ ერთნაირ ობიექტებს.
ობიექტის ტიპი გამოიყურება შემდეგნაირად:

```ts
interface Person {
  id: number;
  name: string;
}
```

გადაცემული პარამეტრებიდან გამომდინარე ამოცანას აუცილებლად ექნება **ერთი სწორი პასუხი**.

### პირველი მაგალითი

პარამეტრები:

```js
persons = [
  {
    id: 1,
    name: "rostevani"
  },
  {
    id: 2,
    name: "tinati"
  },
  {
    id: 3,
    name: "tarieli"
  },
  {
    id: 4,
    name: "nuradin-pridon"
  },
  {
    id: 2,
    name: "tinati"
  },
];
```

შედეგი:

```js
persons = [
  {
    id: 1,
    name: "rostevani"
  },
  {
    id: 2,
    name: "tinati"
  },
  {
    id: 3,
    name: "tarieli"
  },
  {
    id: 4,
    name: "nuradin-pridon"
  },
];
```

განმარტება: მასივიდან გაიფილტრა `id: 4`-ის ობიექტი, რადგან განმეორდა ორჯერ.

### მეორე მაგალითი

პარამეტრები:

```js
persons = [
  {
    id: 1,
    name: "rostevani"
  },
  {
    id: 2,
    name: "tinati"
  },
  {
    id: 2,
    name: "tarieli"
  },
  {
    id: 4,
    name: "nuradin-pridon"
  },
];
```

შედეგი:

```js
persons = [
  {
    id: 1,
    name: "rostevani"
  },
  {
    id: 2,
    name: "tinati"
  },
  {
    id: 4,
    name: "nuradin-pridon"
  },
];
```

განმარტება: მასივიდან გაიფილტრა `id: 2`-ის ობიექტი, რადგან განმეორდა ორჯერ.

### მესამე მაგალითი

პარამეტრები:

```js
persons = [
  {
    id: 1,
    name: "rostevani"
  },
  {
    id: 2,
    name: "tinati"
  },
  {
    id: 3,
    name: "tarieli"
  },
  {
    id: 4,
    name: "nuradin-pridon"
  },
];
```

შედეგი:

```js
persons = [
  {
    id: 1,
    name: "rostevani"
  },
  {
    id: 2,
    name: "tinati"
  },
  {
    id: 3,
    name: "tarieli"
  },
  {
    id: 4,
    name: "nuradin-pridon"
  },
];
```

განმარტება: არცეთი ელემენტი არ არის დუბლირებული, მასივი დარჩა იგივე.

ამოცანის ამოხსნა შესაძლებელია ბევრი გზით,
ცადეთ ისეთი ალგორითმის მოფიქრება, რომელიც `O(n)`-თან ახლოს არის.