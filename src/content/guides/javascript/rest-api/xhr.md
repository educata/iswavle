---
title: 'XMLHttpRequest'
description: 'როგორ გამოვიყენოთ XMLHttpRequest-ი JavaScript-ში?'
keywords: 'XMLHttpRequest, fetch, response, requset, api, rest api, get, post, put, patch, delete, მოთხოვნებთან მუშაობა, მოთხოვნის გაგზავნა'
---

ჯავასკლრიპტში HTTP მოთხოვნის გასაგზავნად არაერთი მეთოდი არსებობს, მათ შორის ერთ-ერთი ყველაზე ძველი და გამოყენებადი არის `XMLHttpRequest`.

## XMLHttpRequest ობიექტი

[`XMLHttpRequest`](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest) (XHR) ობიექტი შეიძლება გამოვიყენოთ სერვერთან კომუნიკაციისთვის.
სახელის მიუხედავად, `XMLHttpRequest` შეიძლება გამოყენებული იყოს ნებისმიერი ტიპის ინფორმაციის მიმოცვლისთვის, და არა მხოლოდ XML-ისთვის.

ასე გამოიყურება GET მოთხოვნა XHR-ით:

```js
const xhr = new XMLHttpRequest();
xhr.open('GET', 'https://api.everrest.educata.dev/quote/random');
xhr.send();
xhr.onload = () => {
  console.log(xhr.response); // {"_id":"65200f90bd3ab9d054562a9b","author":"Mario","quote":"It's A Me, Mario!" "type":"Game"}
};
```

ერთი მოთხოვნისთვის რამდენიმე სტრიქონის დაწერერა დაგვჭირდა - რატომ?

- `const xhr = new XMLHttpRequest()` - ვქმნით ახალ `xhr`-ის ობიექტს.
- `xhr.open('GET', 'https://api.everrest.educata.dev/quote/random')` - ვამზადებთ ობიექტს მოთხოვნის გასაგზავნად. პირველი პარამეტრი განსაზღვრავს მოთხოვნის მეთოდს, ხოლო მეორე პარამეტრი სერვერის მისამართს.
- `xhr.send()` - ვაგზავნით მოთხოვნას.
- `xhr.onload` - ვანიჭებთ `callback` ფუნქციას, რომელიც შესრულდება მაშინ, როცა სერვერი დაგვიბრუნებს მნიშვნელობას.

გაითვალისწინეთ, რომ `send()` ასინქრონულად მუშაობს და, შესაბამისად, მთავარ thead-ს არ შეაყოვნებს -
რაც ამ მეთოდის მერე გვიწერია, პირდაპირ გაეშვება.
როგორც კი სერვერი პასუხს დაგვიბრუნებს, `xhr` შეინახავს მიღებულ პასუხს `response` თვისებაში და ავტომატურად დაუძახებს `onload()`-ს, რომელშიც ჩვენ განვსაზღვრეთ რა უნდა მოხდეს.

რადგან `xhr` ფრომისებამდე არსებობდა, მისი გამოყენება ისე ელეგანტურად ვერ ხერხდება, როგორც მაგალითად [`fetch`](./doc/guides/javascript/rest-api/fetch)-ის, თუმცა შეგვიძლია ის ფრომისშიც შევფუთოთ:

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
- შემდგომ ვქმნით `XMLHttpRequest`-ის ახალ ობიექტს.
- ვხსნით მოთხოვნას.
- თუ მეთოდი არ არის `GET`-ის ტიპის, გავაყოლოთ შემდეგი ჰედერი:
  - `'Content-Type', 'application/json'` - ეს ჰედერი უზრუნველყოფბს, რომ ჩვენ მიერ გაგზავნილი ინფორმაცია იქნება `JSON` ტიპის.
- გავაგზავნოთ მოთხოვნა `body` ობიექტთან ერთად.
- დავაბრუნოთ პრომისი, რადგან `xhr.onload`-ის გაშვების შემდეგ ძირეულმა (`xhrRequest`) ფუნქციამ დააბრუნოს მნიშვნელობა.
- თუ სტატუს კოდი მოცემულია 200-დან 300-მდე მაშინ დავაბრუნოთ შედეგი `resolve`-ის გამოყენებით, სხვა შემთხვევაში `reject`-ით.

ასე შევქმენით ფუნქცია, რომელიც აბრუნებს პრომისის მნიშვნელობას, რაზეც შეიძელბა `then`-ის ან `async`/`await`-ის გამოყენება.

:::warning
ფუნქცია მორგებულია `everrest`-ის სერვერზე, `reject`-ის დროსაც ვპარსავთ მნიშვნელობას იმის გამო,
რომ `everrest`-ის სერვერი აბრუნებს შეცდომის ობიექტს. შეძლება სხვა სერვერებმა იგივენაირად არ დააბრუნონ შეცდომები.
:::

## შეჯამება

`XMLHttpRequest` არის ობიექტი, რომელიც გვეხმარება HTTP მოთხოვნების გაგზავნაში. ამ სტატიაში განვიხილეთ ის ძირითადი თვისებები,
რომლებიც საჭიროა მოთხოვნის გასაგზავნად, თუმცა `XMLHttpRequest`-ს სხვა ბევრი თვისებაც გააჩნია,
შეგიძლიათ თითოეული მათგანი იხილოთ [MDN-ის სტატიაში](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest).
