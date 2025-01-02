---
title: 'ნავიგატორი'
description: 'ნავიგატორის ობიექტი JavaScript-ში'
keywords: 'navigator, navigator-ის მეთოდები, navigator-ის ფუნქციები, navigator-ის თვისებები'
---

JavaScript-ში [`Navigator`](https://developer.mozilla.org/en-US/docs/Web/API/Navigator) ობიექტი წარმოადგენს ბრაუზერის state-სა და იდენტობას (user agent). ობიექტში გაერთიანებულია ბევრი ფუნქცია და თვისებები. ამ სტატიაში განვიხილავთ ძირითად ფუნქციებსა და თვისებებს.

```js
console.log(window.navigator);
console.log(navigator);
```

## ხშირად გამოყენებადი თვისებები

:::info
ზოგი მეთოდის ან თვისების გამოყენებისთვის საჭიროა `HTTPS` კონტექსტი.
:::

### userAgent

[`userAgent`](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/userAgent) თვისება გვიბრუნებს ოპერაციული სისტემის და ბრაუზერის მნიშვნელობას.

```js
console.log(navigator.userAgent); // 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36'
```

### language

[`language`](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/language) თვისება გვიბრუნებს მომხარებლის სასურველ ენას, ხშირ შემთხვევაში იგივეს, რაც ბრაუზერში აქვს მითთებული.

```js
console.log(navigator.language); // 'ka'
```

### cookieEnabled

[`cookieEnabled`](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/cookieEnabled) თვისება გვიბრუნებს ბულიანის ტიპის მნიშვნელობას იმის მიხედვით, მომხარებელს აქვს თუ არა cookie ჩართული ბრაუზერში.

```js
console.log(navigator.cookieEnabled);
```

### geolocation

[`geolocation`](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/geolocation) თვისება გვიბრუნებს მომხარებლის ლოკაციას (მომხარებელმა უნდა დაადასტუროს ლოკაციაზე წვდომის მოთხოვნა).

```js
navigator.geolocation.getCurrentPosition((position) => {
  console.log(position.coords.latitude, position.coords.longitude);
});
```

## შეჯამება

`Navigator` ობიექტში გვაქვს ბევრი კარგი თვისება და მეთოდი, რომელიც გვეხმარება ბრაუზერის სხვადასხვა ფუნქციონალის გამოყენებაში, ესენია: state, იდენტობა, ლოკაცია და სხვა.
ზოგი მეთოდისა და თვისების გამოყენებისთვის საჭიროა `HTTPS` კონტექსტი.
