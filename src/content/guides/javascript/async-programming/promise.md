---
title: 'Promise'
description: 'Promise-ს გამოყენება JavaScript-ში'
keywords: 'სინქრონული, ასინქრონული, promise, callback'
---

ასინქრონული კოდის დასაწერად, ხშირ შემთხვევაში საჭიროა გამოვიყენოთ [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)-ები.

## რა არის Promise ?

`Promise` ეს არის ობიექტი, რომელიც მარტივი სახით შეგვიძლია წარმოვიდგინოთ, როგორც დაპირება. ყოველ დაპირებას გააჩნია 3 ეტაპი:

- _pending_: დასაწყისი _state_, როცა დაპირება მუშავდება (არც შესრულდა მაგრამ არც უარყო).
- _fulfilled_: წარმატებულად შესრულებული დაპირება.
- _rejected_: წარუმატებლად შესრულებული დაპირება.

## როგორ მუშაობს Promise ?

პრომისის შესაქმნელად საჭიროა გამოვიყენოთ `Promise` ობიექტის კონსტრუქტორი, რომელსაც პარამეტრად განვუსაზღვრავთ ორ `callback` ფუქნციას:

- `resolve`: წარმატებულად შესრულების შემთხვევაში დაძახებული ფუნქცია.
- `reject`: წარუმატებლად შესრულების შემთხვევაში დაძახებული ფუნქცია.

```js
const promiseForNumber = new Promise((resolve, reject) => {
  const random = Math.floor(Math.random() * 2);
  if (random === 1) {
    resolve('გაგიმართლათ, დაგენერირდა 1');
  } else {
    reject('არ გაგიმართლათ, დაგენერირდა 0');
  }
});
```

ასე შევქმენით `Promise`, რომელზე მოსმენის შემთხვევაშიც გაეშვება შემთხვევითი რიცხვის დაგენერირების ლოგიკა.
თუ დაგენერირებული მნიშვნელობა ერთის ტოლია, მაშინ ვაბრუნებთ წარმატებულად შესრულების მნიშვნელობას, რომელიც ამ შემთხვევაში არის: `'გაგიმართლათ, დაგენერირდა 1'`,
ხოლო წარუმატებლად გაშვების შემთხვევაში ვაბრუნებთ: `'არ გაგიმართლათ, დაგენერირდა 0'`.

მარტივი შედარებისთვის, `Promise` შეგიძლიათ წარმოიდგინოთ, როგორც ფუნქცია:
ფუნქცია, რომელსაც აქვს ორი `return`, ერთი კარგი შემთხვევისთვის, ხოლო მეორე - ცუდი შემთხვევისთვის.
`reject` პრომისში ხშირად ერორების შემთხვევაში ეშვება.

`Promise`-დან მნიშვნელობის ამოსაღებად საჭიროა გამოვიყენოთ შემდეგი სინტაქსი:

```js
const promiseForNumber = new Promise((resolve, reject) => {
  const random = Math.floor(Math.random() * 2);
  if (random === 1) {
    resolve('გაგიმართლათ, დაგენერირდა 1');
  } else {
    reject('არ გაგიმართლათ, დაგენერირდა 0');
  }
});

promiseForNumber
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(error);
  });
```

`then` არის `Promise`-ის მეთოდი, რომელშიც შეგვიძლია განვსაზღვროთ რა უნდა მოხდეს მას მერე, რაც დაპირება წარმატებულ შედეგს დააბრუნებს.
მეთოდის ქოლბექის პარამეტრში სწორედ პრომისის შედეგს ვიღებთ (ანუ იმ სტრინგს, რომელიც ზემოთ `resolve`-ს გადავეცით).

## სად გამოვიყენოთ Promise ?

პრომისი გვჭირდება ისეთ ვითარებაში, სადაც არ გვინდა, რომ ხანგრძლივმა ოპერაციამ მთლიანი აპლიკაცია შეაყოვნოს.
წარმოვიდგინოთ, ვითომ რაღაც კომპლექსურ ლოგიკას `setTimeout` ფუნქციის ადგილას.

```js
function randomNumber(max = 100) {
  setTimeout(() => {
    return Math.floor(Math.random() * max);
  }, 2000);
}
```

შევქმენით ისეთი `randomNumber` ფუნქცია, რომელსაც პირობითად 2 წამი სჭირდება შემთხვევითი რიცხვის შესაქმნელად.
ჩვენ ნაივურად დავაბრუნეთ გამოთვლის ოპერაცია ქოლბექში, თუმცა თუ შევეცდებით ამ ფუნქციის გამოყენებას მისი მნიშვნელობა იქნება `undefined`.
ჩვენ მიერ დაწერილი `return` მნიშველობას აბრუნებს ქოლბექ ფუნქციის კონტექსტში. თვითონ `setTimeout` არაფერს აბრუნებს!

რადგან `setTimeout`-ში განხორციელებული ოპერაციის შედეგზე ფუნქციის გარეთ წვდომა არ გვაქვს,
შეგვიძლია მთლიან ფუნქციას პრომისი დავაბრუნებინოთ.

```js
function randomNumber(max = 100) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(Math.floor(Math.random() * max));
    }, 2000);
  });
}
```

`randomNumber` ფუნქცია აბრუნებს პრომისის მნიშვნელობას, რომელიც შესრულდება 2 წამის შემდგომ. მისი გამოყენება კი შეგვიძლია მარტივად:

```js
randomNumber().then((result) => {
  console.log(`შემთხვევითი რიცხვია: ${result}`);
});
```

ჩვენ ვეძახით ფუნქციას და ვაზუსტებთ რა უნდა მოხდეს მას შემდეგ, რაც ჩვენი ვითომ კომპლექსური ოპერაცია დასრულდება.

ამ კონკრეტულ მაგალითში `reject` დაწერა არ იყო საჭირო, ამიტომაც `catch`-ის დაწერასაც აზრი არ აქვს.

ასერომ, ნებისმიერ ადგილას, სადაც საჭიროა ასინქრონული კოდის დაწერა, შეგიძლიათ გამოიყენოთ `Promise`-ები.

## Finally

`then`-სა და `catch`-ის გარდა, პრომისებს ასევე გააჩნია `callback`-ი `finally`. `finally` გაეშვება მის მერე, რაც პრომისში შესრულდა
`then` ან `catch`.

```js
function areYouLucky() {
  return new Promise((resolve, reject) => {
    const randomNumber = Math.floor(Math.random() * 10);
    if (randomNumber >= 5) {
      resolve();
    } else {
      reject();
    }
  }, 1000);
}

areYouLucky()
  .then(() => {
    console.log('თქვენ გაგიმართლათ');
  })
  .catch(() => {
    console.log('თქვენ არ გაგიმართლათ');
  })
  .finally(() => {
    console.log('რა ბედი გქონია?');
  });
```

ამ მაგალითში გვაქვს `areYouLucky` ფუნქცია, სადაც `0`-დან `10`-მდე დაგენერირდება შემთხვევითი რიცხვი.
თუ შემთხვევითი რიცხვი მეტია ან ტოლი `5`-ის, გაეშვება `resolve`, სხვა შემთხვევაში - `reject`.
პრომისზე მოსმენის შემთხვევაში `then`-სა და `catch`-ში ჩაწერილი მესიჯიდან ერთ-ერთი გამოჩნდება, თუმცა `'რა ბედი გქონია?'` ყველა ვარიანტში გამოჩნდება.

## განსაზღვრული Promise

ზოგჯერ შესაძლოა დაგჭირდეთ ისეთი კოდის დაწერა, რომელიც პირდაპირ დააბრუნებს წარმატებულად ან წარუმატებლად შესრულებულ პრომისს.
მაგალითად, როცა HTTP მოთხოვნით ვიღებთ მომხმარებლის მონაცემებს, მაგრამ რესურსების დასაზოგად ქეშირების სისტემა გვაქვს.
რადგან HTTP მოთხოვნებს დრო სჭირდებათ, მათ პრომისების საშუალებით ვახორციელებთ (მაგალითისთვის გაეცანით [`fetch`-ს]()),
მაგრამ ქეშიდან მონაცემების ამოღება სინქრონულად ხდება და თუ ჩვენ ამ ყველაფრის ერთ ფუნქციაში გაერთიანება გვსურს,
ზოგჯერ პრომისი პირდაპირ უნდა დავარეზოლვოთ.

მაგალითისთვის განვიხილოთ შემდგომი მაგალითი:

```js
const cache = {
  users: [
    {
      id: 1,
      name: 'john',
      email: 'john@doe',
    },
  ],
};

function fetchSomeUser(id) {
  const user = cache.users.find((user) => user.id === id);
  if (user) {
    return Promise.resolve(user);
  }
  return new Promise((resolve, reject) => {
    // ვითომ მომხმარებლის მონაცემებს ვითხოვთ...
  });
}
```

ამ შემთხვევაში გვაქვს პირობითად შექმნილი `cache`, სადაც შენახულია ერთი მომხარებელი. ასევე გვაქვს ფუნქცია, რომელიც `id`-ის მიხედვით გვიბრუნებს მომხარებელს. `fetchSomeUser` ფუნქცია ამომწებს, ქეშში ხომ არ არსებობს მოცემული აიდით მომხმარებელი და, ასეთის არსებობის შემთხვევაში,
პირდაპირ მას აბრუნებს პრომისის ფორმით, საპირისპირო შემთხვევაში - მომხმარებლის (ვითომ) HTTP მოთხოვნას.
ამ ფუნქციაში მნიშვნელოვანი ისაა, რომ ნებისმიერ შემთხვევაში ბრუნდება პრომისი, თუნდაც ქეშიდან მომხმარებლის ამოღება სინქრონული იყოს.
ფუნქცია ნებისმიერ ვარიანტში ასინქრონულია, თუმცა ქეშის დახმარებიდ ზოგჯერ დაუყოვნებლივ რეზოლვდება.

[`Promise.resovle`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/resolve) გამოიყენება წარმატებული `Promise`-ს მნიშვნელობის დასაბრუნებლად.

წარმატებული შემთხვევის გარდა ასევე გვაქვს წარუმატებელი შემთხვევაც. წარუმატებელი შემთხვევის დროს გამოიყენება [`Promise.reject`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/reject).

განვიხილოთ `Promise.reject`-ის  მაგალითიც:

```js
function isValidId(id) {
  return id.startsWith('#') && id.endsWith('#');
}

function placeOrder(id) {
  if (isValidId(id)) {
    return Promise.reject('არასწორი id ფორმატი');
  }

  return new Promise((resolve) => {
    // ვითომ შეკვეთის განთავსება
    setTimeout(() => {
      resolve(`შეკვეთა იდ ${id}-ით, წარმატებით განთავსდა`);
    }, 1000);
  });
}
```

ამ შემთხვევაში გვაქვს ორი ფუნქცია. პირველი ფუნქცია ამოწმებს, ვალიდური არის თუ არა გადაცემული `id`, ხოლო მეორე ფუნქცია შეკვეთის სიმულაციისთვის არის. არის მომენტები, როცა რაღაც შეცდომის გამო ფუნქციამ შესაძლოა მიიღოს არასწორი `id`. სანამ ჩანაწერს გავაკეთებთ უმჯობესია მისი შემოწმება, სანამ კლიენტისა და სერვერის რესურსებს დავხარჯავთ. წინასწარ `id`-ის შემოწმებით ვზოგავთ მოთხოვნის გაგზავნას, რაც დარწმუნებით ვიცით რომ შეცდომას წარმოქმნიდა.

## Promise-ს სტატიკური მეთოდები

`Promise`-ებს გააჩნია რამოდენიმე კარგი სტატიკური მეთოდი, რომლებიც შეგიძლიათ გამოიყენოთ:

### Promise.all

[`Promise.all`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all) პარამეტრად ღებულობს პრომისების მასივს
და აბრუნებს გაერთიანებულ პრომისს შევსებული მნიშვნელობებით, მაშინ როცა **ყოველი** პრომისი გაეშვება წარმატებით.
პრომისების გაშვება სრულდება ერთდროულად თუმცა თუ **ერთი** პრომისი მაინც არ შესრულდა, დააბრუნებს წარუმატებელი `reject`-ის მნიშვნელობას.

```js
const firstPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(Math.floor(Math.random() * 222));
  }, 1000);
});

const secondPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(Math.floor(Math.random() * 22));
  }, 2000);
});

async function calculate() {
  const start = Date.now();
  const result = await Promise.all([firstPromise, secondPromise]);
  const end = Date.now();
  console.log(`დასჭირდა დრო: ${end - start}ms`); // 'დასჭირდა დრო: 2000ms'
  console.log(result); // [შემთხვევითი_რიცხვი_1, შემთხვევითი_რიცხვი_2]
}

calculate();
```

`Promise.all`-ის გამოყენება კარგია მაშინ, როცა რამოდენიმე პრომისის გაშვება გინდათ, რომელიც ერთმანეთზე არ არის დამოკიდებული. იგივე კოდი რომ დაგვეწერა `Promise.all`-ის გარეშე, დრო იქნებოდა 1 წამით მეტი.

### Promise.allSettled

[`Promise.allSettled`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled) მუშაობს, როგორც `Promise.all`, ოღონდ მცირედი განსხვავებით: `Promise.allSettled` უცდის ყოველი პრომისის მნიშვნელობის დასრულებას, მნიშვნელობა არ აქვს ეს წარმატებული იყო თუ წარუმატებელი, მხოლოდ მის შემდგომ დაბრუნდება პრომისების მასივი.

```js
const firstPromise = new Promise((resolve, reject) => setTimeout(resolve, 1000, 'პირველი დაპირება'));
const secondPromise = new Promise((resolve, reject) => setTimeout(reject, 1500, 'მეორე დაპირება'));
const thirdPromise = new Promise((resolve, reject) => setTimeout(resolve, 500, 'მესამე დაპირება'));

Promise.allSettled([firstPromise, secondPromise, thirdPromise]).then((results) => {
  results.forEach((result, index) => {
    const success = result.status === 'fulfilled';
    console.log(
      `პრომისი ${index + 1} ${success ? 'წარმატებით შესრულდა' : 'წარუმატებელად შესრულდა'},
       მნიშვნელობით: ${success ? result.value : result.reason}`,
    );
  });
});
```

არსებული კოდი გამოიტანს სამივე პრომისის მნიშვნელობას მაშინ როცა სამივე შესრულდება.

### Promise.any

[`Promise.any`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/any) მეთოდი ღებულობს პრომისების მასივს და დააბრუნებს მნიშვნელობას, როცა **ერთი** პრომისი მაინც შესრულდება წარმატებით, ხოლო აბრუნებს წარუმატებელ შემთხვევას თუ ყოველი პრომისი წარუმატებლად დასრულდა.

```js
const firstPromise = new Promise((resolve, reject) => setTimeout(resolve, 1000, 'პირველი დაპირება'));
const secondPromise = new Promise((resolve, reject) => setTimeout(reject, 1500, 'მეორე დაპირება'));
const thirdPromise = new Promise((resolve, reject) => setTimeout(resolve, 500, 'მესამე დაპირება'));

Promise.any([firstPromise, secondPromise, thirdPromise])
  .then((result) => {
    console.log(`წარმატებულად შესრულებული პრომისის მნიშვნელობა: ${result}`);
  })
  .catch((error) => {
    console.log(`ყოველი პრომისი წარუმატებლად შესრულდა`);
  });
```

ამ შემთხვევაში დაილოგება `'წარმატებულად შესრულებული პრომისის მნიშვნელობა: მესამე დაპირება'`, რადგან პირველი და მესამე პრომისი შესრულდება.

### Promise.race

[`Promise.race`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/race) საკმაოდ წააგავს `Promise.any` მეთოდს, ოღონდ მცირედი განსხვავებით: `Promise.race` არ დაუცდის პრომისების წარმატებით შესრულებას, თუ წარმატებულ შედეგზე ადრე წარუმატებეული შესრულდა, მაშინ წარუმატებელ შემთხვევას გაუშვებს. მარტივად რომ ვთქვათ, ვინც პირველი გაეშვება მისი მნიშვნელობა დაბრუნდება.

```js
const firstPromise = new Promise((resolve, reject) => setTimeout(resolve, 1000, 'პირველი დაპირება'));
const secondPromise = new Promise((resolve, reject) => setTimeout(reject, 300, 'მეორე დაპირება'));
const thirdPromise = new Promise((resolve, reject) => setTimeout(resolve, 500, 'მესამე დაპირება'));

Promise.race([firstPromise, secondPromise, thirdPromise])
  .then((result) => {
    console.log(`წარმატებულად შესრულებული პრომისის მნიშვნელობა: ${result}`);
  })
  .catch((error) => {
    console.log(`წარუმატებლად შესრულებული პრომისის მნიშვნელობა: ${error}`);
  });

Promise.any([firstPromise, secondPromise, thirdPromise])
  .then((result) => {
    console.log(`წარმატებულად შესრულებული პრომისის მნიშვნელობა: ${result}`);
  })
  .catch((error) => {
    console.log(`ყოველი პრომისი წარუმატებლად შესრულდა`);
  });
```

ამ შემთხვევაში `race`-ის დროს დაგვიბრუნდება: `'წარუმატებლად შესრულებული პრომისის მნიშვნელობა: მეორე დაპირება'` ხოლო `any`-ს დროს: `წარმატებულად შესრულებული პრომისის მნიშვნელობა: მესამე დაპირება`.

## შეჯამება

ასინქრონული მოქმედებების შესრულებისთვის შეგვიძლია გამოვიყენოთ `Promise`, რომლისგანაც მეტწილადად ველოდებით ორ შედეგს: კარგს (წარმატებულად შესრულებულს) ან ცუდს (წარუმატებლად შესრულებულს).
