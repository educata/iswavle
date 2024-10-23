---
title: 'Location'
description: 'Location ობიექტი JavaScript-ში'
keywords: 'window, location, location-ის თვისებები'
---

[`location`](https://developer.mozilla.org/en-US/docs/Web/API/Location) ობიექტი გამოიყენება ვებ-გვერდის მისამართის (URL) მანიპულაციისთვის. ობიექტის გამოყენება შესაძლებელია, როგორც `window`-დან ასევე `document`-დანაც.

## Location ანატომია

გადაატარეთ (ან დააკლიკეთ) მაუსი მისამართზე ან თვისებაზე, რომ გაფერადდეს შესაბამისი ნაწილი.

<iframe data-url="guides/javascript-location" data-title="Location ანატომია" data-height="150"></iframe>

## თვისებები

:::info
შემდგომ მაგალითებში **ლოკალში** იგულისხმება შემდგომი მისამართი: `http://localhost:4200/doc/guides/javascript/window/location`
:::

### href

[`href`](https://developer.mozilla.org/en-US/docs/Web/API/Location/href) თვისება განსაზღვრავს, სრულ URL-ს და გვაძლევს შესაძლებლობას, რომ გავანახლოთ ვებ-გვერდის მისამართი.

```js
const currentHref = location.href; // window.location.href-ც სწორია
console.log(currentHref); // 'https://iswavle.com/doc/guides/javascript/window/location'

location.href = 'https://everrest.educata.dev'; // გადაგვამისამართებს https://everrest.educata.dev მისამართზე
```

### protocol

[`protocol`](https://developer.mozilla.org/en-US/docs/Web/API/Location/protocol) თვისება განსაზღვრავს, URL-ს პროტოკოლს `':'` ჩათვლით.

```js
console.log(location.protocol); // 'https:'
```

### host

[`host`](https://developer.mozilla.org/en-US/docs/Web/API/Location/host) თვისება განსაზღვრავს, ჰოსტის სახელს პორტის ჩათვლით.

```js
console.log(location.host); // 'iswavle.com'
console.log(location.host); // 'localhost:4200' თუ ლოკალზე გავხსნით
```

### hostname

[`hostname`](https://developer.mozilla.org/en-US/docs/Web/API/Location/hostname) თვისება განსაზღვრავს, ჰოსტის სახელს პორტის გარეშე.

```js
console.log(location.hostname); // 'iswavle.com'
console.log(location.hostname); // 'localhost' თუ ლოკალზე გავხსნით
```

### port

[`port`](https://developer.mozilla.org/en-US/docs/Web/API/Location/port) თვისება განსაზღვრავს, პორტის მნიშვნელობას. თუ პორტი არ არის URL-ში მაშინ დააბრუნებს `undefined`.

```js
console.log(location.port); // undefined
console.log(location.port); // '4200' თუ ლოკალზე გავხსნით
```

### pathname

[`pathname`](https://developer.mozilla.org/en-US/docs/Web/API/Location/pathname) თვისება განსაზღვრავს, URL-ში არსებული path-ს მნიშვნელობას.

```js
console.log(location.pathname); // '/doc/guides/javascript/window/location'
```

### search

[`search`](https://developer.mozilla.org/en-US/docs/Web/API/Location/search) თვისება განსაზრავს, URL-ში ცვლადების მნიშვნელობას. თუ `'?'` არ არის გამოყენებული მაშინ მნიშვნელობა `undefined` იქნება.

```js
location.href += '?search=ანატომია'; // ვებ-გვერდზე დავუმატოთ ცვლადი
console.log(location.search); // '?search=ანატომია'
```

### hash

[`hash`](https://developer.mozilla.org/en-US/docs/Web/API/Location/hash) თვისება განსაზღვრავს, URL-ში არსებული ფრაგმენტის მნიშვნელობას. თუ `'#'` არ არის გამოყენებული მაშინ მნიშვნელობა `undefined` იქნება.

```js
location.href += '#Location_ანატომიაა'; // ვებ-გვერდზე დავუმატოთ ფრაგმენტის მნიშვნელობა
console.log(location.hash); // '#Location_ანატომია'
```

:::info
თითოეული თვისების განახლება შეიძლება, როგორც `href` თვისებაში.
:::

## მეთოდები

### assign

[`assign`](https://developer.mozilla.org/en-US/docs/Web/API/Location/assign) მეთოდი ღებულობს ერთ პარამეტრს და აბრუნებს არაფერს. გადაცემული პარამეტრის მიხედვით მოხდება URL-ს ჩატვირთვა არსებული დომეინის მიხედვით.

```js
location.assign('#ისწავლე'); // გადაგვამისამართებს 'https://iswavle.com/#ისწავლე'
```

### reload

[`reload`](https://developer.mozilla.org/en-US/docs/Web/API/Location/reload) მეთოდი თავიდან ჩატვირთავს ამჟამინდელ მისამართს.

```js
location.reload();
```

### replace

[`replace`](https://developer.mozilla.org/en-US/docs/Web/API/Location/replace) მეთოდი მსგავსია `assign` მეთოდისა. განსხვავება მდგომარეობს [`history`](https://developer.mozilla.org/en-US/docs/Web/API/History) სესიის ჩაწერაზე. `replace` ისტორიაში არ შეინახავს ცვლილებას, ხოლო `assign` კი.

```js
location.replace('#ისწავლე'); // გადაგვამისამართებს 'https://iswavle.com/#ისწავლე'
```

## შეჯამება

ამ სტატიაში განვიხილეთ `location` ობიექტის თვისებები და მეთოდები.
