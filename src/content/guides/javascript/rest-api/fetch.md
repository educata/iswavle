---
title: 'fetch'
description: 'როგორ გამოვიყენოთ fetch-ი JavaScript-ში?'
keywords: 'XMLHttpRequest, fetch, response, requset, api, rest api, get, post, put, patch, delete, მოთხოვნებთან მუშაობა, მოთხოვნის გაგზავნა'
---

[`XMLHttpRequest`](./doc/guides/javascript/rest-api/xhr)-ს არის კარგი ალტერნატივა არის [`fetch`](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API).

## fetch მეთოდი

`fetch` გამოყენება საკმაოდ მარტივია. წინა სტატიაში, როცა ვიყენებდით `XMLHttpRequest`-ს დავწერეთ, ფუნქცია სადაც დაბრუნებული მნიშვნელობა შევფუთეთ პრომისში. `fetch` ამ ყოველივეს მისით ასრულებს.

```js
fetch('https://api.everrest.educata.dev/quote/random')
  .then((res) => {
    console.log(res); // რესპონსი თავისი სტატუს კოდით და სხვა მნიშვნელობებით
    return res.json();
  })
  .then((response) => {
    console.log(response); // // {"_id":"65200f90bd3ab9d054562a9b","author":"Mario","quote":"It's A Me, Mario!" "type":"Game"}
  })
  .catch((error) => {
    console.log(error);
  });
```

<iframe data-url="guides/javascript-random-quote" data-title="შემთხვევითი ციტატა" data-height="280"></iframe>

როდესაც `GET` მოთხოვნას ვიყენებთ, არ არის სავალდებულო `fetch`-ში მისი დაზუსტება. პირველი დაბრუნებული მნიშვნელობა არის ზოგადი ინფორმაცია, რომელიც არის [`Response`](https://developer.mozilla.org/en-US/docs/Web/API/Response)-ს ტიპის. პირველი `then` აუცილებლად შესრულდება დადებითად ან ცუდად წამოღების შემთხვევაში, ხოლო მეორე `then` გაშვება დამოკიდებულია იმაზე თუ მოთხოვნა წარმატებული იყო თუ არა.

## როგორ გამოვიყენოთ სხვა მოთხოვნები?

რეალურად `fetch` მეთოდი ღებულობს ორ პარამეტრს:

- სერვერის მისამართი ტექსტური სახით.
- მოთხოვნის დამატებითი პარამეტრები [ობიექტის](https://developer.mozilla.org/en-US/docs/Web/API/RequestInit) სახით.

მაგალითისთვის დავაგენერიროთ QR კოდი `fetch`-ს გამოყენებით:

```js
try {
  const text = 'https://iswavle.com';
  const response = await (
    await fetch('https://api.everrest.educata.dev/qrcode/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
    })
  ).json();
  console.log(response);
} catch (error) {
  console.log(error);
}
```

<iframe data-url="guides/javascript-generate-qr" data-title="QR კოდის დაგენერირება" data-height="650"></iframe>

ასე მარტივად შეგვიძლია `fetch` მეთოდს, გავაყოლოთ მეორე პარამეტრი სადაც იქნება დამატებითი დეტალები აღწერილი ობიექტის სახით: მეთოდი ტიპი, ჰედერები, body ობიექტი და სხვა. [`try..catch`](./doc/guides/javascript/error-handling#try-catch)-ს ბლოკში მოვათავსეთ კოდი შეცდომის დასაჭერად ხოლო ორი [`await`](./doc/guides/javascript/async-programming/async-await) სწორი მნიშვნელობის დასაბრუნებლად.

## შეჯამება

`XMLHttpRequest` არ არის ერთადერთი ობიექტი, რომლის გამოყენებითაც შეიძლება მოთხოვნის გაგზავნა შეგვიძლია გამოვიყენოთ ასევე `fetch` მეთოდი. `fetch` უფრო სწრაფი და მარტივი გამოსაყენებელია.
