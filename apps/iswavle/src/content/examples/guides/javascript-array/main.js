const fruits = [
  'წითელი ვაშლი',
  'ფორთოხალი',
  'მწვანე ვაშლი',
  'მარწყვი',
  'ყურძენი',
];

console.log(fruits[0]); // 'წითელი ვაშლი'
console.log(fruits[1]); // 'ფორთოხალი'
console.log(fruits[2]); // 'მწვანე ვაშლი'
console.log(fruits[3]); // 'მარწყვი'
console.log(fruits[4]); // 'ყურძენი'
console.log(fruits[5]); // undefined

const matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];

console.log(matrix);

const numbersArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
console.log(...numbersArray); // 1 2 3 4 5 6 7 8 9 10

const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
console.log(array.length);

const randomNumbers = [2, 22];
console.log(randomNumbers); // [2, 22]
randomNumbers.push(1);
console.log(randomNumbers); // [2, 22, 1]
randomNumbers.push(7, 77);
console.log(randomNumbers); // [2, 22, 1, 7, 77]
randomNumbers.unshift(10);
console.log(randomNumbers); // [10, 2, 22, 1, 7, 77]
randomNumbers.unshift(0, -3);
console.log(randomNumbers); // [0, -3, 10, 2, 22, 1, 7, 77]

const randomNumbers2 = [2, 22, 222];
console.log(randomNumbers2.pop()); // 222
console.log(randomNumbers2); // [2, 22]
console.log(randomNumbers2.shift()); // 2
console.log(randomNumbers2); // [22]

const randomNumbers3 = [22, 7, 10, 30, 6, 11, 9];
console.log(randomNumbers3.includes(22)); // true
console.log(randomNumbers3.includes(31)); // false
const cities = [
  'Tbilisi',
  'Batumi',
  'Kutaisi',
  'Rustavi',
  'Gori',
  'Zugdidi',
  'Poti',
  'Kobuleti',
];
console.log(cities.includes('Batumi')); // true
console.log(cities.includes('Borjomi')); // false

const web = ['HTML', 'CSS', 'SCSS', 'JS', 'TS', 'JS', 'Angular'];
console.log(web.indexOf('JS')); // 3
console.log(web.indexOf('JS', 4)); // 5
console.log(web.lastIndexOf('JS')); // 5

const numbers = [2, 7, 22];
console.log(numbers.findIndex((number) => number > 10)); // 2
console.log(
  numbers.findIndex(function (number) {
    return number > 10;
  }),
);

const numbers2 = [2, 7, 22];
console.log(numbers2.find((number) => number > 10)); // 22

const randomNumbers4 = [22, 7, 10, 30, 6, 11, 9];
randomNumbers4.forEach((number, index, array) => {
  console.log(number); // დალოგავს იმ რიცხვს, რომელზეც არის იტერაცია (მოქმდებები)
  console.log(index); // დალოგავს იმ ელემენტის ინდექს, რომელზეც არის იტერაცია
  console.log(array); // დალოგავს მთლიან მასივს რაზეც არის მოქმდებები
});
randomNumbers4.forEach((number, index) => {
  console.log(index, number); // დალოგავს იმ რიცხვს და ინდექს, რომელზეც მიდის მოქმდებები
});
randomNumbers4.forEach((number) => {
  console.log(number); // დალოგავს იმ რიცხვს, რომელზეც არის იტერაცია (მოქმდებები)
});

const randomNumbers5 = [22, 7, 10, 30, 6, 11, 9];
console.log(randomNumbers5.join()); // "22, 7, 10, 30, 6, 11, 9"
console.log(randomNumbers5.join('/')); // "22/7/10/30/6/11/9"
const projects = ['iswavle', 'EverREST', 'educata'];
console.log(`Our projects ${projects.join()}`); // 'iswavle, EverREST, educata'
console.log(`Our projects ${projects.join('')}`); // 'iswavleEverRESTeducata'
console.log(`Our projects ${projects.join(' ')}`); // 'iswavle EverREST educata'
console.log(`Our projects ${projects.join('|')}`); // 'iswavle|EverREST|educata'

const randomNumbers6 = [22, 7, 10, 30, 6, 11, 9];
console.log(randomNumbers6.toString()); // '22,7,10,30,6,11,9'
const cities2 = [
  'Tbilisi',
  'Batumi',
  'Kutaisi',
  'Rustavi',
  'Gori',
  'Zugdidi',
  'Poti',
  'Kobuleti',
];
console.log(cities2.toString()); // 'Tbilisi,Batumi,Kutaisi,Rustavi,Gori,Zugdidi,Poti,Kobuleti'

const firstArray = [1, 2, 3, 4, 5];
const secondArray = [6, 7, 8, 9, 10];
const concatedArray = firstArray.concat(secondArray);
console.log(concatedArray); // მსგავს ტიპად შეიქმნება ახალი მასივი პირველი მასივის და მეორე მასივის ელემენტებით

const randomNumbers7 = [1, 2, 3, 4, 5];
const squareRandomNumbers = randomNumbers7.map((number) => number * number);
console.log(squareRandomNumbers); // [1, 4, 9, 16, 25]

const randomNumbers8 = [22, 7, 10, 30, 6, 11, 9];
const filteredEvenRandmoNumbers = randomNumbers8.filter(
  (number) => number % 2 === 0,
);
console.log(filteredEvenRandmoNumbers); // [22, 10, 30, 6]
const cities3 = [
  'Tbilisi',
  'Batumi',
  'Kutaisi',
  'Rustavi',
  'Gori',
  'Zugdidi',
  'Poti',
  'Kobuleti',
];
const filteredCities = cities3.filter((city) => city.length > 5);
console.log(filteredCities); // ['Tbilisi', 'Batumi', 'Kutaisi', 'Rustavi', 'Zugdidi', 'Kobuleti']

const randomNumbers9 = [22, 7, 10, [30, [6, [11, [9]]]]];
console.log(randomNumbers9.flat()); // [22, 7, 10, 30, Array [6, Array [11, Array [9]]]]
console.log(randomNumbers9.flat(2)); // [22, 7, 10, 30, 6, Array [11, Array [9]]]
console.log(randomNumbers9.flat(3)); // [22, 7, 10, 30, 6, 11, Array [9]]
console.log(randomNumbers9.flat(Infinity)); // [22, 7, 10, 30, 6, 11, 9]

const nestedArray = [
  [1, 2],
  [3, 4],
  [5, 6],
];
const flattenedArray = nestedArray.flatMap((innerArray) =>
  innerArray.map((number) => number * 2),
);
console.log(flattenedArray); // [2, 4, 6, 8, 10, 12]

const randomNumbers10 = [22, 7, 10, 30, 6, 11, 9];
console.log(randomNumbers10.slice(2)); // [10, 30, 6, 11, 9]
console.log(randomNumbers10.slice(2, 4)); // [10, 30]
console.log(randomNumbers10.slice(-3, -1)); // [6, 11]

const months = ['იანვარი', 'მარტი', 'აპრილი'];
months.splice(1, 0, 'თებერვალი'); // 1 ინდექსის შემდეგ წავშალოთ 0 ელემენტი და დავამატოთ 'თებერვალი'
console.log(months); // ['იანვარი', 'თებერვალი', 'მარტი', 'აპრილი']
months.splice(3, 1); // 3 ინდექსის შემდეგ წავშალოთ 1 ელემენტი
console.log(months); // ['იანვარი', 'თებერვალი', 'მარტი']

const randomNumbers11 = [22, 7, 10, 30, 6, 11, 9];
console.log(randomNumbers11.reverse()); // [9, 11, 6, 30, 10, 7, 22]
const cities4 = [
  'Tbilisi',
  'Batumi',
  'Kutaisi',
  'Rustavi',
  'Gori',
  'Zugdidi',
  'Poti',
  'Kobuleti',
];
console.log(cities4.reverse()); // ['Kobuleti', 'Poti', 'Zugdidi', 'Gori', 'Rustavi', 'Kutaisi', 'Batumi', 'Tbilisi']

const randomNumbers12 = [22, 7, 10, 30, 6, 11, 9];
randomNumbers12.sort();
console.log(randomNumbers12); // [10, 11, 22, 30, 6, 7, 9]
const cities5 = [
  'Tbilisi',
  'Batumi',
  'Kutaisi',
  'Rustavi',
  'Gori',
  'Zugdidi',
  'Poti',
  'Kobuleti',
];
cities5.sort();
console.log(cities5); // ["Batumi", "Gori", "Kobuleti", "Kutaisi", "Poti", "Rustavi", "Tbilisi", "Zugdidi"]

const randomNumbersArray = [1, 2, 10, 40, 30, 5];
console.log(randomNumbersArray.toSorted()); // [1, 10, 2, 30, 40, 5]
const georgianCities = [
  'Tbilisi',
  'Batumi',
  'Kutaisi',
  'Rustavi',
  'Gori',
  'Zugdidi',
  'Poti',
  'Kobuleti',
];
console.log(georgianCities.toSorted()); // ["Batumi", "Gori", "Kobuleti", "Kutaisi", "Poti", "Rustavi", "Tbilisi", "Zugdidi"]

const randomNumbers13 = [22, 7, 10, 30, 6, 11, 9];
console.log(randomNumbers13.toSorted((a, b) => a - b)); // [6, 7, 9, 10, 11, 22, 30] ზრდადობით
console.log(randomNumbers13.toSorted((a, b) => b - a)); // [30, 22, 11, 10, 9, 7, 6] კლებადობით
