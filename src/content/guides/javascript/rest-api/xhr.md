---
title: 'XMLHttpRequest'
description: 'როგორ გამოვიყენოთ XMLHttpRequest-ი JavaScript-ში?'
keywords: 'XMLHttpRequest, fetch, response, requset, api, rest api, get, post, put, patch, delete, მოთხოვნებთან მუშაობა, მოთხოვნის გაგზავნა'
---

მოთხოვნის გასაგზავნას არაერთი მეთოდი არსებობს. ერთ-ერთი ფართოდ გამოყენებული მეთოდი არის `XMLHttpRequest`.

## XMLHttpRequest ობიექტი

[`XMLHttpRequest`](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest) (XHR) ობიექტი შეიძლება გამოვიყენოთ სერვერთან კომუნიკაციისთვის. სახელის მიუხედავად `XMLHttpRequest`-ი შეიძლება გამოყენებული იყოს ნებისმიერი ინფორმაციის დასაბრუნებლად.

მოთხოვნის გასაგზავნად საჭიროა რამოდენიმე ხაზის დაწერა:

```js
const xhr = new XMLHttpRequest();
xhr.open('GET', 'https://api.everrest.educata.dev/quote/random');
xhr.send();
xhr.onload = () => {
  console.log(xhr.response); // {"_id":"65200f90bd3ab9d054562a9b","author":"Mario","quote":"It's A Me, Mario!" "type":"Game"}
};
```

ასე მარტივად არის შესაძლებელი მოთხოვნის შესრულება. განვიხილოთ თითოეული დეტალი:

- `const xhr = new XMLHttpRequest()` - ვქმნით ახალ `xhr`-ს ობიექტს.
- `xhr.open('GET', 'https://api.everrest.educata.dev/quote/random')` - ვიწყებთ მოთხოვნის გაგზავნას, პირველი პარამეტრი განსაზღვრავს მოთხოვის მეთოდს, ხოლო მეორე პარამეტრი სერვერის მისამართს.
- `xhr.send()` - ვაგზავნით მოთხოვნას.
- `xhr.onload` - ვანიჭებთ `callback` ფუნქციას, რომელიც შესრულდება მაშინ, როცა სერვერი დაგვიბრუნებს მნიშვნელობას.

გავაუმჯობესოთ კოდი:

```js
function xhrRequest(method = '', url = '', body = {}) {
  const allowedMethods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'];

  if (!allowedMethods.includes(method.toUpperCase())) {
    throw new Error('Invalid http method');
  }

  const xhr = new XMLHttpRequest();
  xhr.open(method.toUpperCase(), url);
  if (method !== 'GET') {
    xhr.setRequestHeader('Content-Type', 'application/json');
  }
  xhr.send(JSON.stringify(body));
  return new Promise((resolve, reject) => {
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(JSON.parse(xhr.responseText));
      } else {
        reject(JSON.parse(xhr.responseText));
      }
    };
    xhr.onerror = () => {
      reject(JSON.parse(xhr.responseText));
    };
  });
}

xhrRequest('GET', 'https://api.everrest.educata.dev/quote/random')
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.log(error);
  });

async function fetchRandomQuote() {
  try {
    const quote = await xhrRequest('GET', 'https://api.everrest.educata.dev/quote/random');
    console.log(quote);
  } catch (error) {
    console.log(error);
  }
}
```

განვიხილოთ ცვლილებები:

- შევქმენით ფუნქცია, რომელსაც გადაეცემა სამი პარამეტრი:
  - `method`: მოთხოვნის მეთოდი (`GET`, `POST`, და ა.შ).
  - `url`: სერვერის მისამართი.
  - `body`: ობიექტი, რომელსაც მოთხოვნის დროს ვაგზავნით.
- პირველ რიგში ვამოწმებთ, სწორი მეთოდი გადაეცემა თუ არა ფუნქციას.
- შემდგომ ვქმნით `XMLHttpRequest` ახალ ობიექტს.
- ვხსნით მოთხოვნას.
- თუ მეთოდი არ არის `GET`-ს ტიპის, გავაყოლოთ მაშინ შემდგომი ჰედერი:
  - `'Content-Type', 'application/json'` - ეს ჰედერი უზრუნველყოფბს, რომ ჩვენს მიერ გაგზავნილი ინფორმაცია იქნებოდა `JSON` ტიპის.
- გავაგზავნოთ მოთხოვნა `body` ობიექტთან ერთად.
- დავაბრუნოთ პრომისი, რადგან `xhr.onload`-ს გაშვების შემდგომ ძირეულმა (`xhrRequest`) ფუნქციამ დააბრუნოს მნიშვნელობა.
- თუ სტატუს კოდი მოცემულია 200-დან 300-მდე მაშინ დავაბრუნოთ კარგი შედეგი `resolve` გამოყენებით, სხვა შემთხვევაში `reject`.

ასე შევქმენით ფუნქცია, რომელიც აბრუნებს პრომისის მნიშვნელობას, რაზეც შეიძელბა `then` გამოყენება ან საერთოდაც ასინქრონულად მოსმენა.

:::warning
ფუნქცია მორგებულია `everrest`-ს სერვერზე, `reject`-ს დროსაც ვპარსავთ მნიშვნელობას იმის გამო, რომ `everrest`-ს სერვერი აბრუნებს შეცდომის ობიექტს. შეძლება სხვა სერვერებმა იგივენაირად არ დააბრუნოს შეცდომები.
:::

## შეჯამება

`XMLHttpRequest` არის ობიექტი, რომელიც გვაძლევს შესაძლებლობას მოთხოვნები ვაწარმოოთ სერვერთან. ამ სტატიაში განვიხილეთ ის ძირითადი თვისებები, რომლებიც საჭიროა მოთხოვნის გასაგზავნად თუმცა `XMLHttpRequest` უფრო ბევრი თვისება გააჩნია, შეგიძლიათ თითოეული მათგანი იხილოთ [MDN-ს სტატიაში](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest).
