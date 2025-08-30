---
title: 'Window'
description: 'Window ობიექტი JavaScript-ში'
keywords: 'window, namespace, dialogs, დიალოგური ფანჯრები, საცავები, storages, localStorage, sessionStorage, cookie, location, audio, navigator, commonly used functions in window, ხშირად გამოყენებული ფუნქციები window ობიექტი'
---

[`Window`](https://developer.mozilla.org/en-US/docs/Web/API/Window) ობიექტი არის გლობალური ცვლადი, რომელიც ინახავს მთლიან დოკუმენტს, მეთოდებს და მნიშვნელობებს. ყოველი მეთოდი და მნიშვნელობა, რომელსაც ვიყენებთ ობიექტის გარეშე, რეალურად აღწერილია `window` ობიექტში.

`window` ობიექტში აღწერილ ფუნქციებსა და მნიშვნელობებს არ სჭირდებათ [namespace-ის](./doc/guides/javascript/object-basics#Dot_notation) გამოყენება.

მაგალითისთვის:

```js
alert('რაღაც პირველი შეტყობინება!');
window.alert('რაღაც მეორე შეტყობინება!');
```

ყოველი მეთოდის ან თვისების გამოყენება შეიძლება ანალოგიურად namespace-ის გარეშე.

`window` ობიექტს გააჩნია ბევრი გამოსადეგი მნიშვნელობა და მეთოდი. შემდეგ სტატიებში განვიხილავთ თითოეულ მათგანს:

- [დიალოგური ფანჯრები](./doc/guides/javascript/window/dialogs)
- [საცავები](./doc/guides/javascript/window/storages)
  - [localStorage](./doc/guides/javascript/window/storages/local)
  - [sessionStorage](./doc/guides/javascript/window/storages/session)
  - [cookie](./doc/guides/javascript/window/storages/cookie)
- [audio](./doc/guides/javascript/window/audio)
- [location](./doc/guides/javascript/window/location)
- [navigator](./doc/guides/javascript/window/navigator)
- [შეჯამება](./doc/guides/javascript/window/summary)
