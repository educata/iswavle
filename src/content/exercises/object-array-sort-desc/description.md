---
title: 'ობიექტების მასივის დალაგება კლებადობით'
description: 'ობიექტების მასივის კლებადობით დალაგება, გადაცემული პარამეტრიდან გამომდინარე'
difficulty: 'medium'
tags: ['loop', 'array']
keywords: 'loop, array, sort'
---

მოცემულია ობიექტების მასივი `items`.
თქვენი დავალებაა მასივის **კლებადობით** დალაგება, გადაცემული პარამეტრის მიხედვით.

გადაცემული პარამეტრებიდან გამომდინარე ამოცანას აუცილებლად ექნება **ერთი სწორი პასუხი**.

### პირველი მაგალითი

პარამეტრები:

```js
items = [
  {
    name: 'Fanta',
    price: 1.9,
  },
  {
    name: 'Coca-Cola',
    price: 1.8,
  },
  {
    name: 'Sprite',
    price: 2,
  },
  {
    name: 'Pepsi',
    price: 1.6,
  },
];
key = "price"
```

შედეგი:

```js
[
  {
    name: 'Sprite',
    price: 2,
  },
  {
    name: 'Fanta',
    price: 1.9,
  },
  {
    name: 'Coca-Cola',
    price: 1.8,
  },
  {
    name: 'Pepsi',
    price: 1.6,
  }
]
```

განმარტება: ფასის მიხედვით დალაგების შედეგად ასეთ მასივს ვიღებთ.

### მეორე მაგალითი

პარამეტრები:

```js
items = [
  {
    name: 'Fanta',
    price: 1.9,
  },
  {
    name: 'Coca-Cola',
    price: 1.8,
  },
  {
    name: 'Sprite',
    price: 2,
  },
  {
    name: 'Pepsi',
    price: 1.6,
  },
];
key = "name"
```

შედეგი:

```js
[
  {
    name: 'Sprite',
    price: 2,
  },
  {
    name: 'Pepsi',
    price: 1.6,
  },
  {
    name: 'Fanta',
    price: 1.9,
  },
  {
    name: 'Coca-Cola',
    price: 1.8,
  },
]
```

განმარტება: სახელის მიხედვით დალაგების შედეგად ასეთ მასივს ვიღებთ.

### მესამე მაგალითი

პარამეტრები:

```js
items = [
  {
    name: 'Fanta',
    price: 1.9,
  },
  {
    name: 'Coca-Cola',
    price: 1.8,
  },
  {
    name: 'Sprite',
    price: 2,
  },
  {
    name: 'Pepsi',
    price: 1.6,
  },
];
key = "tax"
```

შედეგი:

```js
[
  {
    name: 'Fanta',
    price: 1.9,
  },
  {
    name: 'Coca-Cola',
    price: 1.8,
  },
  {
    name: 'Sprite',
    price: 2,
  },
  {
    name: 'Pepsi',
    price: 1.6,
  },
]
```

განმარტება: `tax` თვისება არ გვაქვს არსებულ მასივში, ამიტომაც ყოველი ელემენტი დარჩა თავის ადგილას.

ამოცანის ამოხსნა შესაძლებელია ბევრი გზით,
ცადეთ ისეთი ალგორითმის მოფიქრება, რომელიც `O(n²)`-თან ახლოს არის.