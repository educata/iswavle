---
title: 'fetch'
description: 'როგორ გამოვიყენოთ fetch-ი JavaScript-ში?'
keywords: 'XMLHttpRequest, fetch, response, requset, api, rest api, get, post, put, patch, delete, მოთხოვნებთან მუშაობა, მოთხოვნის გაგზავნა'
---

[`fetch`](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) არის ჯავასკრიპტის ფუნქცია,
რომელიც გამოიყენება HTTP მოთხოვნების გასაგზავნად.

## fetch მეთოდი

`fetch` გამოყენება საკმაოდ მარტივია, გარკვეულწილად იმიტომ, რომ იგი ფრომისს გვიბრუნებს.

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

როდესაც `GET` მოთხოვნას ვიყენებთ, არ არის სავალდებულო `fetch`-ში მისი დაზუსტება.
პირველი დაბრუნებული მნიშვნელობა არის პასუხის შესახებ ინფორმაცია, რომელიც არის [`Response`](https://developer.mozilla.org/en-US/docs/Web/API/Response) ტიპის.
პირველი `then` აუცილებლად შესრულდება, თუნდაც სერვერმა შეცდომა დაგვიბრუნოს.
აქ ჩვენ `Response`-ზე არსებულ `json()` მეთოდს დავუძახეთ და მისი შედეგი დავაბრუნეთ,
რომელიც ასევე ფრომისია, შესაბამისად შეგვიძლია ერთ `then`-ს მეორე გადავაბათ.
მეორე `then`-ის გაშვება დამოკიდებულია იმაზე, მოთხოვნა წარმატებული იყო თუ არა.
`catch` ბლოკით დავიჭერთ ნებისმიერ წინა `then` ბლოკში არსებულ შეცდომას და მას კონსოლში გამოვიტანთ.

## როგორ გამოვიყენოთ სხვა მოთხოვნები?

`fetch` მეთოდი ღებულობს ორ პარამეტრს:

- სერვერის მისამართს, როგორც სტრინგს,
- მოთხოვნის დამატებით პარამეტრებს [ობიექტის](https://developer.mozilla.org/en-US/docs/Web/API/RequestInit) სახით.

მაგალითისთვის, გავაგზავნოთ POST მოთხოვნა REST API-ზე, რომელიც QR კოდს აგენერირებს.

```js
try {
  const text = 'https://iswavle.com';
  const response = 
    await fetch('https://api.everrest.educata.dev/qrcode/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
    });
  console.log(response);

  const result = response.json();
  console.log(result);
} catch (error) {
  console.log(error);
}
```

<iframe data-url="guides/javascript-generate-qr" data-title="QR კოდის დაგენერირება" data-height="650"></iframe>

ასე მარტივად შეგვიძლია `fetch` ფუნქციას გავაყოლოთ მეორე პარამეტრი, სადაც იქნება დამატებითი დეტალები აღწერილი ობიექტის სახით:
მეთოდი ტიპი, ჰედერები, body ობიექტი და სხვა.
ამ შემთხვევაში ჩვენ გამოვიყენეთ [`async` და `await`](./doc/guides/javascript/async-programming/async-await)
და ლოგიკა შევკარით [`try..catch`](./doc/guides/javascript/error-handling#try-catch) ბლოკში.

## შეჯამება

ჯავასკრიპტში HTTP მოთხოვნებთან მუშაობისას, `fetch` არის ყველაზე პოპულარული ფუნქცია,
რომელიც დაშენებულია ფრომისებზე და მისი გამოყენება ძალიან მარტივია.
