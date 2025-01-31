---
title: 'ჩაშენებული მონაცემთა სტრუქტურები'
description: 'მონაცემთა სტრუქტურები JavaScript-ში'
keywords: 'advanced, ჩაშენებული მონაცემთა სტრუქტურები'
---

## Object

[Object](./doc/guides/javascript/object-basics) არის JavaScript-ის ფუნდამენტური მონაცემთა სტრუქტურა,
რომელიც გამმოიყენება სხვადასხვა key-value წყვილებზე დაფუძნებული კოლექციებისა და კიმპლექსური ერთეულების შესანახად.

ობიექტის ერთ-ერთი ძირითადი მახასიათებელი არის მისი **პროტოტიპის** მექანიზმი.
ობიექტი შეიძლება მოიცავდეს სხვა ობიექტს, როგორც პროტოტიპს.

```js
const person = {
  isHuman: true,
};

const me = Object.create(person);
console.log(me.isHuman); // true
```

მაგალითში გამოვიყენეთ [Object.create](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create) მეთოდი,
რომელიც ქმნის ახალ ობიექტს `me` ცვლადში და ამ ობიექტს პროტოტიპად აქვს მითითებული `person` ობიექტი.

ობიექტს კიდევ ბევრი საინტერესო მეთოდი გააჩნია, როგორიცაა:

- [Object.keys](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys) - სტატიკური მეთოდი,
  რომელიც დააბრუნებს გადაცემული ობიექტის გასაღებებს მასივის სახით.
- [Object.values](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/values) - სტატიკური მეთოდი,
  რომელიც დააბრუნებს გადაცემული ობიექტის მნიშვნელობებს მასივის სახით.
- [Object.entries](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries) - სტატიკური მეთოდი,
  რომელიც დააბრუნებს გადაცემული ობიექტის მნიშვნელობებს იტერირებადი მასივის სახით.

```js
const students = {
  studentA: 90,
  studentB: 78,
  studentC: 100,
  studnetD: 51,
};

console.log(Object.keys(students)); // ['studentA', 'studentB', 'studentC', 'studnetD']
console.log(Object.values(students)); // [90, 78, 100, 51]
console.log(Object.entries(students)); // [['studentA', 90], ['studentB', 78], ['studentC', 100], ['studnetD', 51]]

for (const [student, grade] of Object.entries(students)) {
  console.log(`${student}: ${grade}`);
}
```

:::info
JavaScript-ში ჩაშენებული მონაცემთა სტრუქტურების მიღმა ობიექტები გამოიყენება.
:::

## Map

[Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) არის ჩაშენებული მონაცემთა სტრუქტურა JavaScript-ში,
რომელიც ობიექტის მსგავსად ინახავს key-value წყვილებს, ოღონდ `Map`-ის შემთხვევაში შესაძლებელია ნებისმიერი ტიპის გამოყენება გასაღებისთვის,
თუნდაც ობიექტების.
key (გასაღების მნიშვნელობა) `Map`-ში შესაძელბელია აღმოჩნდეს მხოლოდ ერთხელ, ის ყოველთვის შეიცავს **უნიკალურ** გასაღებებს.

[`set`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/set) მეთოდი გამოიყენება მნიშვნელობის დასამატებლად `Map`-ში, ხოლო
[`get`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/get) მნიშნველობისთვის ამოსაღებად.

```js
const students = new Map();
students.set('studentA', 90);
students.set('studentB', 78);
students.set('studentC', 100);
students.set('studentD', 51);

console.log(students.get('studentC')); // 100
```

[`has`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/has) მეთოდი ამოწმებს, მნიშვნელობა არსებობს თუ არა `Map`-ში.

```js
console.log(students.has('studentA')); // true
console.log(students.has('studentE')); // false
```

[`size`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/size) თვისება განსაზღვრავს `Map`-ში არსებული თვისებების რაოდენობას.

```js
console.log(students.size); // 4
```

[`delete`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/delete) მეთოდი გამოიყენება `Map`-დან **ერთი** მნიშვნელობის წასაშლელად, ხოლო
[`clear`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/clear) **ყველა** ელემენტის წასაშლელად.

```js
console.log(students.delete('studentA')); // true (გულიხსმობს წარმატებულად წაშლას)
console.log(students.delete('studentE')); // false
students.clear();
console.log(students.size); // 0
```

[`forEach`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/forEach) მეთოდი [მასივის `forEach`](./doc/guides/javascript/array#forEach) მეთოდის მსგავსია.

```js
const students = new Map();
students.set('studentA', 90); // studentA - 90
students.set('studentB', 78); // studentB - 78
students.set('studentC', 100); // studentC - 100
students.set('studentD', 51); // studentD - 51

students.forEach((key, value) => {
  console.log(`${value} - ${key}`);
});
```

:::info
ობიექტის რამდენიმე მეთოდი ანალოგიურად მუშაობს `Map`-შიც. ესენია: `keys`, `values`, `entries`.
:::

`Map`-თან მიმართებაში შესაძებელია ობიექტის მსგავსად მუშაობა, თუმცა ეს მიდგომა **არასწორია** პრაქტიკაში.

```js
const wrongMap = new Map();
wrongMap['bla'] = 'blaa';
wrongMap['bla2'] = 'blaaa2';

console.log(wrongMap); // Map { bla: 'blaa', bla2: 'blaaa2' }
```

მსგავსი მანიპულაციები არ ეყრდნობა `Map`-ის მეთოდებს და არასასურველ შედეგებს მოგვცემს.
თვისება `bla` არ არის შენახული `Map`-ში, ამიტომ ზოგი მეთოდი არ დააბრუნებს სწორ მნიშვნელობას:

```js
wrongMap.has('bla'); // false
wrongMap.delete('bla'); // false
console.log(wrongMap); // Map { bla: 'blaa', bla2: 'blaaa2' }
```

`Map` არის იტერირებადი სტრუქტურა. მასზე იტერაცია შესაძლებელია შემდგომი სინტაქსით:

```js
const students = new Map();
students.set('studentA', 90);
students.set('studentB', 78);
students.set('studentC', 100);
students.set('studentD', 51);

for (const [key, value] of students) {
  console.log(key, value);
}
```

### `Object` vs `Map`

`Object` და `Map` ერთმანეთის მსგავსია. ორივე სტრუქტურა იყენებს key-value-ს მიდგომას თვისებების შესანახად.
თუმცა, არსებობს მნიშვნელოვანი განსხვავებები, რომლებიც ზოგიერთ შემთხვევაში `Map`-ს უფრო უპირატესობას ანიჭებს:

|                          | Map                                                                                                                    | Object                                                                                                                                                                                                                                                                                                                                                                                                        |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| შემთხვევითი გასაღებები   | `Map`-ს ნაგულისხმევად არ გააჩნია გასაღებები. მასში მხოლოდ მოთავსდება ის გასაღებები, რომლებიც მეთოდის გავლით დაემატა    | `Object`-ს გააჩნია პროტოტიპი, რომელმაც შეიძლება ნაგულისხმევად დაგვიმატოს გასაღებები. შეიძლება ამ სიტუაციას თავი ავარიდოთ `Object.create(null)`-ის გამოყენებით, მაგრამ ძალიან იშვიათად გამოიყენება ის მიდგომა.                                                                                                                                                                                                 |
| უსაფრთხოება              | `Map`-ის გამოყენება უსაფრთხოა მომხარებლის მიერ მოწოდებული key-value მნიშვნელობებისთვის.                                | მომხარებლის მიერ მოწოდებული key-value მნიშვნელობების დაყენებისას, შესაძლებელია თავდამსხმელს მივცეთ საშუალება პროტოტიპის გადაწერის (override), რომლითაც მივიღებთ [object injection attacks](https://github.com/eslint-community/eslint-plugin-security/blob/main/docs/the-dangers-of-square-bracket-notation.md).                                                                                              |
| გასაღების ტიპი           | შეგვიძლია გამოვიყენოთ ნებისმიერი ტიპის მნიშვნელობა გასაღებისთვის.                                                      | მხოლოდ სტრინგი და სიმბოლოა დაშვებული გასაღებისთვის ტიპისთვის.                                                                                                                                                                                                                                                                                                                                                 |
| ზომა                     | `Map`-ში არსებული ელემენტების დასათვლელად, შეგვიძლია მარტივად გამოვიყენოთ `size` თვისება                               | ობიექტში თვისებების დასათვლელად არ გვაქვს მეთოდი. დასათვლელად შეგვიძლია გამოვიყენოთ `Object.keys` მეთოდი და შემდგომ ამავე მასივიდან წავიკითხოთ სიგრძე.                                                                                                                                                                                                                                                        |
| იტერაცია                 | `Map` არის იტერირებადი სტრუქტურა, მასზე პირდაპირ შეიძლება იტერაცია.                                                    | ობიექტი არ არის იტერირებადი ნაგულისხმევად. იტერაციისთვის საჭიროა `Object.keys` ან `Object.entries` გამოყენება. `for...in` მიდგომა გვაძლევს საშუალებას იტერაცია გავაკეთოთ ყოველ **enumerable** თვისებებზე. ნაგულისხმევად ყოველი თვისებას გააჩნია `enumerable :true`, თუმცა შესაძლებელია მათი გათიშვა იტერაციისთვის: `Object.defineProperty(someObject, 'keyName', { enumerable: false, value: "something" })`. |
| ოპტიმიზაცია              | `Map`-ს გააჩნია შედარებით უკეთესი ოპტიმიზაცია სხვადასხვა მოქმედებების შესასრულებლად, როგორიცა: დამატება, წაშლა და ა.შ. | ობიექტს არ გააჩნია კარგი ოპტიმიზაცია თვისებების ხშირი დამატებისთვის და წაშლისთვის                                                                                                                                                                                                                                                                                                                             |
| სერილიზაცია და პარსირება | `Map`-ს არ გააჩნია ჩაშენებული სერილიზაცია და პარსირების მიდგომა / მეთოდი.                                              | ობიექტს გააჩნია ჩაშენებული მეთოდი სერილიზაციისთვის და პარსირებისთვის [`JSON`](./doc/guides/javascript/rest-api/json-xml#json)-ის გამოყენებით.                                                                                                                                                                                                                                                                 |

## Set

[`Set`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set) არის ჩაშენებული მონაცემთა სტრუქტურა, რომელიც
ინახავს პრიმიტიულ მნიშვნელობებს ან ობიექტებს. ასევე მასში შენახული მნიშვნელობები არის **უნიკალური**, ანუ `Set`-ში არ ინახება იდენტური მნიშვნელობები. 

ელემენტების დამატება შესაძლებელია [`add`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/add) მეთოდის გამოყენებით.

```js
const set1 = new Set();

set1.add(22);
set1.add(22);
set1.add(7);

for (const item of set1) {
  console.log(item);
  // Expected output: 22
  // Expected output: 7
}
```

`Set`-ის ელემენტებზე იტერაცია სრულდება **დამატების თანმიმდევრობის** მიხედვით (მარცხნიდან მარჯვნივ).

[`has`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/has) ამოწმებს ელემენტი არსებობს თუ არა სტრუქტურაში.

```js
const set2 = new Set();
set2.add(27);
console.log(set2.has(27)); // true
console.log(set2.has(10)); // false
```

### Set შემადგენლობა

`Set` ობიექტი გვთავაზობს რამდენიმე მეთოდს, რომელიც საშუალებას გვაძლევს, შევასრულოთ ოპერაციები მათემატიკურ სიმრავლეებზე:

| მეთოდი                                                                                                                                 | დაბრუნებული მნიშვნელობა | მათემატიკური ჩაწერა | ვენის დიაგრამა                                                                                                                                                                                   |
| -------------------------------------------------------------------------------------------------------------------------------------- | ----------------------- | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [`A.difference(B)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/difference)                   | `Set`                   | A \ B               | ![ვენის დიაგრამა, სადაც ორი წრე იკვეთება ერთმანეთში. A-სა და B-ს განსხვავება არის ის ნაწილი, რომელიც A-შია და არ იკვეთება B-თან. ](./assets/images/venn-difference.png)                          |
| [`A.intersection(B)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/intersection)               | `Set`                   | A ∩ B               | ![ვენის დიაგრამა, სადაც ორი წრე იკვეთება. A-სა და B-ს გადაკვეთაა ის ნაწილი, სადაც ისინი იკვეთებიან.](./assets/images/venn-intersection.png)                                                      |
| [`A.symmetricDifference(B)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/symmetricDifference) | `Set`                   | (A ∖ B) ∪ (B ∖ A)   | ![ვენის დიაგრამა, სადაც ორი წრე იკვეთება. A-სა და B-ს სიმეტრიული განსხვავება არის ის ტერიტორია, რომელიც შედის ერთ-ერთ წრეში, მაგრამ არა ორივეში.](./assets/images/venn-symmetric-difference.png) |
| [`A.union(B)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/union)                             | `Set`                   | A ∪ B               | ![ვენის დიაგრამა, სადაც ორი წრე იკვეთება. A-სა და B-ს კავშირის სფეროა ის ტერიტორია, რომელიც შედის ერთ-ერთ ან ორივე წრეში.](./assets/images/venn-union.png)                                       |
| [`A.isDisjointFrom(B)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/isDisjointFrom)           | `Boolean`               | A ∩ B = ∅           | ![ვენის დიაგრამა, სადაც ორი წრეა. A და B განზომილები არიან დაშლილი, რადგან წრეებს არ აქვთ გადასაკვეთი ტერიოტრია](./assets/images/venn-disjoint.png)                                              |
| [`A.isSubsetOf(B)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/isSubsetOf)                   | `Boolean`               | A ⊆ B               | <img src="./assets/images/venn-subset.png" alt="ვენის დიაგრამა, სადაც ორი წრეა. A არის B-ს ქვეჯგუფი, რადგან A სრულიად შედის B-ში." style="width: 130px">                                         |
| [`A.isSupersetOf(B)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/isSupersetOf)               | `Boolean`               | A ⊇ B               | <img src="./assets/images/venn-superset.png" alt="ვენის დიაგრამა,  სადაც ორი წრეა. A არის B-ს superset, რადგან B მთლიანად შედის A-ში." style="width: 130px">                                     |

ეს მეთოდები პარამეტრად ღებულობენ როგორც `Set`-ს, ასევე [set-like](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set#set-like_objects)-ის ობიექტებს.

:::info
`Map`-ის რამდენიმე მეთოდი ანალოგიურად მუშაობს `Set`-შიც. ესენია: `clear`, `delete`, `forEach`, `keys`, `values`, `entries`.
:::

## შეჯამება

ამ სტატიაში განვიხილეთ ჩაშენებული მონაცემთა სტრუქტურები. ჩაშენებული სტრუქტურების გარდა ასევე არსებობს სხვა მონაცემთა სტრუქტურები,
როგორიცაა: `stack`, `queue`, `list` და სხვა. მსგასვი მონაცემთა სტრუქტურები იგება კერძო მაგალითებიდან გამომდინარე.

## გამოყენებული ლიტერატურა

- [Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
- [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)
- [Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set)
