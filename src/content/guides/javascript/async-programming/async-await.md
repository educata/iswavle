---
title: 'async & await'
description: 'async-ის და await-ის გამოყენება JavaScript-ში'
keywords: 'სინქრონული, ასინქრონული, promise, callback, async, await'
---

როცა პრომისებით ვწერთ კოდს, შესაძლოა აგვერიოს სასურველი ოპერაციების თანმიმდევრობა, რადგან ასინქრონული კოდი სინქრონული ლოგიკის დასრულებას არ უცდის.

განვიხილოთ შემდეგი მაგალითი:

```js
const randomNumber = new Promise((resolve) => {
  setTimeout(() => {
    resolve(Math.floor(Math.random() * 100));
  }, 1000);
});

function calculate() {
  console.log('შემთხვევითი რიცხვის დაგენერირების დასაწყისი'); // 1
  randomNumber.then((result) => {
    console.log(`შემთხვევითი რიცხვი: ${result}`); // 2
  });
  console.log('შემთხვევითი რიცხვის დაგენერირების დასასრული'); // 3
}

calculate();
```

მაგალითში გვაქვს `randomNumber`, რომელიც არის პრომისი. ასევე გვაქვს `calculate` ფუნქცია, რომელშიც გვაქვს რამოდენიმე ლოგი. სინქრონული მიდგომით ჩვენ ველოდებით, რომ გაეშვება ჯერ `1` ლოგი, შემდგომ `2` და ბოლოს `3` მაგრამ კოდის გაშვებით შეამჩნევთ, რომ თანმიმდევრობა იქნება `1` `3` `2`.

დავუშვათ, რომ `randomNumber` ფუნქციის შეცვლა არ შეგვიძლია, მაგრამ როგორღაც გვინდა, რომ ასინქრონული ლოგიკა სინქრონულად განვახორციელოთ.

## ასინქრონული ფუნქციები

ასინქრონული ფუნქციების იდეა არის ის, რომ სინქრონულ კოდში მოახერხოს კოდის დაყოვენბა მანამ, სანამ ასინქრონული პროცესი არ შესრულდება. მისი სინტაქსი მარტივია, ფუნქციის დასაწყისში ვწერთ [`async`-ს](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/async_function) და დაყოვნებისთვის ვიყენებთ [`await`-ს](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await).
`async` და `await` არის ე.წ სინტაქსური შაქარი (syntactic sugar), ანუ პრომისებთან მუშაობის "შელამაზებული" სინტაქსი.
სცენებს მიღმა მაინც `Promise.then` ხდება.

:::warning
გაითვალისწინეთ `await` მუშაობს მხოლოდ `Promise`-ს ტიპებთან.
:::

შევცვალოთ კოდი ისე, რომ შესაძლებელი იყოს ლოგების თანმიმდევრობით გამოტანა:

```js
const randomNumber = new Promise((resolve) => {
  setTimeout(() => {
    resolve(Math.floor(Math.random() * 100));
  }, 1000);
});

async function calculate() {
  console.log('შემთხვევითი რიცხვის დაგენერირების დასაწყისი'); // 1
  await randomNumber.then((result) => {
    console.log(`შემთხვევითი რიცხვი: ${result}`); // 2
  });
  console.log('შემთხვევითი რიცხვის დაგენერირების დასასრული'); // 3
}

calculate();
```

ასეთი მიდგომით აუცილებლად, რა დროც არ უნდა დასჭირდეს პრომისს, მივიღებთ სწორ თანიმდევრობას ლოგების.

თუმცა `await` არამხოლოდ მოუცდის ასინქრონულ პროცესებს, არამედ შესაძლებლობას გვაძლევს, პრომისიდან
წარმატებულად შესრულებული მნიშვნელობა ამოვიღოთ.

```js
const randomNumber = new Promise((resolve) => {
  setTimeout(() => {
    resolve(Math.floor(Math.random() * 100));
  }, 1000);
});

async function calculate() {
  console.log('შემთხვევითი რიცხვის დაგენერირების დასაწყისი'); // 1
  const result = await randomNumber;
  console.log(`შემთხვევითი რიცხვი: ${result}`); // 2
  console.log('შემთხვევითი რიცხვის დაგენერირების დასასრული'); // 3
}

calculate();
```

მსგავსი სინტაქსით აღარ გვიწევს მთლიანი [`then`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/then) ლოგიკის დაწერა.

იგივე სინტაქსი იქნებოდა, თუ ფუნქცია აბრუნებს პრომისს და არა ცვლადი:

```js
function fetchUser() {
  return new Promise((resolve) => {
    const user = {};
    // სიმულაცია მოხმარებლის მოთხოვნის
    resolve(user);
  });
}

async function display() {
  const user = await fetchUser();
  console.log(user); // {...}
}
```

:::warning
გაითვალისწინეთ, `await`-ის გამოყენების დროს, მხოლოდ წარმატებულ შემთხვევას განიხილავთ.
თუ მოხდება წარუმატებელი შემთხვევა (`reject`) და არ გექნებათ შესაბამისი შეცდომების მოხელთების ლოგიკა, კოდი დააბრუნებს შეცდომას.
:::

## როგორ ჩავწეროთ სწორად ასინქრონული ფუნქციები ?

`await`-ით შემოკლებული სინტაქსი კი კარგია, მაგრამ საჭიროა ასევე შეცდომების გაკონტროლებაც. სამწუხაროდ, ამ სამყაროში ყველაფერი იდეალურად არ ხდება,
ამიტომაც საჭიროა ვარაუდი გავუწიოთ იმ შემთხვევებს, სადაც შეცდომები შეიძლება მოხდეს.

შეცდომების გაკონტროლება საკმაოდ მარტივია [`try...catch`](./doc/guides/javascript/error-handling#try-catch)-ის გამოყენებით (გაეცანით თავს, თუ ჯერ წაგიკითხავთ).

განვიხილოთ ისეთი მაგალითი, სადაც შესაძლოა მივიღოთ წარმატებული და წარუმატებელი შემთხვევაც:

```js
const users = [
  { id: 1, name: 'ტარიელი' },
  { id: 2, name: 'ავთანდილი' },
  { id: 3, name: 'ნურადინ-ფრიდონი' },
  { id: 4, name: 'ნესტან-დარეჯანი' },
  { id: 5, name: 'ასმათი' },
  { id: 6, name: 'თინათინი' },
];

function fetchUser(id, users) {
  return new Promise((resolve, reject) => {
    const user = users.find((user) => user.id === id);

    if (user) {
      resolve(user);
    }

    reject(new Error('მომხარებელი ამ id-ით არ არსებობს'));
  });
}

function randomId(max = 10) {
  return Math.floor(Math.random() * max);
}

async function randomUser(users) {
  const id = randomId();
  const user = await fetchUser(id, users);
  console.log(`შემთხვევითი პერსონაჟი: ${user.name}`);
}

randomUser(users);
```

კოდში გვაქვს `users` მასივი, სადაც არის სხვადასხვა პერსონაჟების სახელები და მათი `id`.

ასევე გვაქვს 3 ფუნქცია:

- `fetchUser` - აბრუნებს პერსონაჟს გადაცემული პარამეტრების მიხედვით. ვერ პოვნის შემთხვევაში აბრუნებს შეცდომას.
- `randomId` - აბრუნებს შემთხვევით რიცხვს გადაცემული პარამეტრის ინტერვალში.
- `randomUser` - აბრუნებს შემთხვევით პერსონაჟს გადაცემული მასივის მიხედვით.

`randomUser`-ის აღწერის დროს მცირედი შეცდომა არის დაშვებული, რომელსაც ჯერ-ჯერობით შეგვიძლია ყურადღება არ მივაქციოთ, რადგან სამაგალითოდ გვსურს ვიხილოთ, შეცდომის გაკონტროლება. კოდის გაშვების შემთხვევაში შესაძლოა მივიღოთ შემთხვევითი პერსონაჟი ან შეცდომა: `'მომხარებელი ამ id-ით არ არსებობს'`.

შეცდომის გაკონტროლება შეგვიძლია `try...catch`-ის გამოყენებით:

```js
// იგივე კოდი

async function randomUser(users) {
  const id = randomId();
  try {
    const user = await fetchUser(id, users);
    console.log(`შემთხვევითი პერსონაჟი: ${user.name}`);
  } catch (error) {
    console.log(`დაფიქსირდა შეცდომა: ${error.message}, ცადეთ კიდევ ერთხელ`);
  }
}

randomUser(users);
```

`try`-ში ჩავწერეთ კოდი სადაც შესაძლოა მოხდეს შეცდომა,
ხოლო `catch`-ში - თუ როგორ გავაკონტროლოთ ის. რა თქმა უნდა,
მომხარებლისთვის ეს მესიჯი გამოუსადეგარია (`"ცადეთ კიდევ ერთხელ"`), მსგავს შემთხვევაში ჯობია თავიდან მოვძებნოთ და რეალური შედეგი გამოვუტანოთ, ხოლო თუ შეუძლებელია ამ შედეგის გამოტანა, ვაცნობოთ მომხარებელს ამის შესახებ.
მიუხედავად ამისა, იდეა არის ის, რომ try ბლოკში განხორციელებული ლოგიკა არ გაიჭედება ერთ ადგილას, თუკი მოულოდნელი ერორი ამოვარდება აპლიკაციაში.
სანაცვლოდ განხორციელდება `catch`-ში აღწერილი ლოგიკა, სადაც ჩვენ შეგვიძლია მოვიხელთოთ იმ ერორის ობიექტი, რომელიც შესაძლოა ამოვარდეს `try` ბლოკში.

პატარა ამოცანა: შეგიძლია ზემოთ არსებული კოდი გამოასწორო ისე, რომ ეს შეცდომა არ მოხდეს?

<details>
  <summary>პასუხი</summary>
  <code>randomUser</code> ფუნქციის აღწერაში, სადაც <code>id</code>-ს ვანიჭებთ მნიშვნელობას, შეიძლება პარამეტრი გავაყოლოთ მასივის სიგრძე, რაც უზრუნველყოფბს ზუსტ ინტერვალს, შემთხვევითი რიცხვის დაგენერირებისას.
</details>

:::info
ამ შემთხვევაში მასივი ლოკალურად გვქონდა კოდში, თუმცა რეალურ პროქტებში ეს ინფორმაცია სერვერიდან გექნებათ წამოსაღები,
სადაც შესაძლოა შეცდომა მაინც მოხდეს, ამიტომ **ყოველთვის** შეეცადეთ, გათვალოთ კოდი შეცდომებზე.
:::

## შეჯამება

ასინქრონული პროგრამული კოდის ჩაწერის დროს საჭიროა გამოვიყენოთ [ასინქრონული ფუნქციები](#ასინქრონული-ფუნქციები), რომლებიც გვეხმარება კოდის საჭირო დროს დაყოვნებაში, რაც გვაძლევს შესაძლებლობას, რომ გვქონდეს სწორი კოდის გაშვების თანმიმდევრობა. თითოეულ პრომისზე მოსმენის დროს კი საჭიროა შესაბამისი შემთხვევების გათვალისწინება და [შეცდომების გაკონტროლება](#როგორ-ჩავწეროთ-სწორად-ასინქრონული-ფუნქციები-).
