---
title: 'JavaScript-ის პროექტში დამატება'
description: 'JavaScript-ის საწყისები'
keywords: 'js, javascript, ჯავასკრიპტი, javascript საწყისები, ჯავასკრიპტის საწყისები, javascript high-level, ინტერპრეტირებადი, დაკომპილირებული, კლიენტი და სერვერი, სტატიკური vs დინამიური'
---

როცა ბრაუზერი ტვირთავს HTML ფაილს, ამ დოკუმენტშივე შეიძლება იყოს დართული ინფორმაცია CSS-სა და JavaScript-ზე,
სახელდობრ, როგორ ჩაიტვირთოს და გაეშვას ეს ფაილები.
ბრაუზერში შესაძლოა JavaScript ჩაიტვირთოს მანამ, სანამ სხვა HTML ელემენტები ჩაიტვირთება ან მას შემდეგ. ეს ყველაფერი დამოკიდებულია იმაზე თუ როგორი შედეგის მიღება გვსურს.
ხშირ შემთხვევაში JS დანიშნულება არის დინამიურად შეცვალოს HTML და CSS ვებგვერდზე [DOM-ის](./referenecs/javascript/dom) გამოყენებით,
ამიტომ ჯავასკრიპტს ვტვირთავთ დოკუმენტის ჩატვირთვის შემდეგ (ბოლოში).

დოკუმენტში JavaScript-ის დასამატებლად ვიყენებთ [`script`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script) თეგს,
სადაც შეიძლება პირდაპირ კოდის დაწერა, ან ცალკეული სკრიპტის ფაილის შემოტანა.

ჩვეულებრივ, `script` ელემენტს განვათავსებთ დოკუმენტის ბოლოში, `<body>` თეგის დახურვამდე.


```html
<body>
  <h3 id="#cool-heading"></h3>

  <script>
    // კოდი, რომელიც სათაურში ტექსტს ჩასვამს
    const h = document.querySelector('#cool-heading');
    const letters = 'გამარჯობა'.split('');
    let index = 0;
    setInterval(() => {
      if (index < letters.length) {
        h.textContent += letters[index];
        index++;
      } else {
        index = 0;
        h.textContent = '';
      }
    }, 500)
  </script>
</body>
```

ბრაუზერი ჩატვირთავს დოკუმენტს, და როგორც კი სკრიპტის თეგებს მიადგება, მაშინვე გაუშვებს მას.
შედეგად მივიღებთ:

<!-- TODO: ეს პატარა memory-leak-ს იწვევს! -->

```preview
<h3 id="#cool-heading" style="height: 2rem;"></h3>
<script>
  // კოდი, რომელიც სათაურში ტექსტს ჩასვამს
  addEventListener("DOMContentLoaded", (event) => {
    const h = document.getElementById('#cool-heading'); // რატომღაც მარტო ასე მუშაობს :\
    console.log(document);
    const letters = 'გამარჯობა'.split('');
    let index = 0;
    setInterval(() => {
      if (index < letters.length) {
        h.textContent += letters[index];
        index++;
      } else {
        index = 0;
        h.textContent = '';
      }
    }, 500)
  })
</script>
```

შეგვიძლია სკრიპტში გარეგანი ფაილიც შემოვიტანოთ, რომლის მისამართსაც `src` ატრიბუტში მივუთითებთ:

```html
  <script src="./main.js"></script>
</body>
```

თუ პატარა და მარტივ სკრიპტებს ვწერთ, მისაღებია პირდაპირ თეგებში კოდის წერა,
თუმცა ხშირ შემთხვეაში საკმაოდ ბევრი კოდი გვიგროვდება, რის გამოც სკრიპტების ცალკე ფაილებში გატანა უმჯობესია.


## კომენტარები

თითქმის ნებისმიერ პროგრამულ ენაში შეიძლება კომენტარის დაწერა.
როდესაც კოდი მოთავსებულია კომენტარის აღმნიშვნელ ბლოკში ან სტრიქონში, ბრაუზერი მას დააიგნორებს.
კომენტარის დანიშნულებაა კოდის აღწერა, შენიშვნების დატოვება, კონკრეტული კოდის ნაწილის დროებით გაუქმება და ა.შ.

ერთ ხაზიანი კომენტარი იწყება ორი დახრილი ხაზით (`//`):

```js
// console.log('Hello world');
```

მრავალხაზოვანი კომენტარი იწყება `/*`-ით და მთავრდება `*/`-ით:

```js
/*
  console.log('Hello world');
  console.log('Hello world from Educata');
*/
```
