let string1 = 'პრიმიტიული სტრინგი 1';
let string2 = 'პრიმიტიული სტრინგი 2';
let string3 = `პრიმიტიული სტრინგი 3`;
let string4 = String('ობიექტის კონსტრუქტორიდან შექმნილი სტრინგი, new გარეშე');
let string5 = new String(
  'ობიექტის კონსტრუქტორიდან შექმნილი სტრინგი, new გამოყენებით',
);

console.log(typeof string1); // "string"
console.log(typeof string2); // "string"
console.log(typeof string3); // "string"
console.log(typeof string4); // "string"
console.log(typeof string5); // "object"

console.log(String('სატესტო')); // 'სატესტო'
console.log(String(undefined)); // 'undefined'
console.log(String(null)); // 'null'
console.log(String(true)); // 'true'
console.log(String(false)); // 'false'
console.log(String(16)); // '16'
console.log(String(22)); // '22'
console.log(String(BigInt(22))); // '22'

const text = 'iswavle.com არის უფასო სასწავლებელი პლატფორმა';

console.log(text.charAt(2)); // 'w'
console.log(text[2]); // 'w'

console.log('1' == 1); // true
console.log('a' == 'a'); // true
console.log('a' == 'A'); // false
console.log('1' === 1); // false
console.log('a' === 'a'); // true
console.log('a' === 'A'); // false

console.log('a' > 'A'); // true
console.log('abc' > 'abd'); // false

let text1 = `დღევანდელი თარიღი არის: ${new Date().toDateString()}`;
console.log(text1); // 'Tue Jan 16 2024'

for (let i = 1; i <= 100; i++) {
  console.log(`${i}) იტერაცია`); // i ყოველ ჯერზე შეიცვლება 1 დან 100 მდე
}

console.log(String.fromCharCode(4312));
console.log(String.fromCharCode(4321));
console.log(String.fromCharCode(4332));
console.log(String.fromCharCode(4304));
console.log(String.fromCharCode(4309));
console.log(String.fromCharCode(4314));
console.log(String.fromCharCode(4308));

console.log(String.fromCodePoint(65)); // 'A'
console.log(String.fromCodePoint(4312)); // 'ი'

console.log(String.fromCharCode(65, 66, 128516)); // AB\uD83D\uDE04
console.log(String.fromCodePoint(65, 66, 128516)); // "AB😄"

let text2 = 'რაღაც სატესტო ტექსტი';
console.log(text2.length); // 20

let text3 = 'რაღაც სატესტო ტექსტი';
console.log(text3.at(1)); // 'ა'
console.log(text3.at(-1)); // 'ი'

let text4 = 'რაღაც სატესტო ტექსტი';
console.log(text4.charAt(1)); // 'ა'
console.log(text4.charAt(-1)); // '' ცარიელი მნიშვნელობა

let text5 = 'რაღაც';
console.log(text5.concat(' სატესტო', ' ', 'ტექსტი')); // 'რაღაც სატესტო ტექსტი'

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
console.log(''.concat(...numbers)); // '12345678910'

let text6 = 'Hello World!';
console.log(text6.endsWith('World!')); // true

let text7 = 'ანგულარი საუკეთესო SPA ფრეიმვორკია';
console.log(text7.endsWith('ფრეიმვორკია', 34)); // true

let text8 =
  'ვებგვერდისთვის ძირითადად გვჭირდება: HTML, CSS, JavaScript. Angular არის JavaScript-ის ფრეიმვორკი';
console.log(text8.includes('HTML')); // true
console.log(text8.includes('JavaScript', 58)); // true
console.log(text8.includes('HTML', 58)); // true

console.log('კი '.repeat(2)); // 'კი კი '

let text9 = 'დღეს ცუდი ამინდია';
console.log(text9.replace('ცუდი', 'კარგი')); // 'დღეს კარგი ამინდია'

let text10 = 'იყო x და გახდა y';
console.log(text10.replace(/[xy]/g, (char) => (char === 'x' ? 500 : 1000))); // 'იყო 500 და გახდა 1000'

let text11 = 'ორშაბათი სამშაბათი ოთხშაბათი ხუთშაბათი';
console.log(text11.replaceAll('შაბათი', '')); // 'ორ სამ ოთხ ხუთ'
console.log(text11.replaceAll(/შაბათი/g, '')); // 'ორ სამ ოთხ ხუთ'

let text12 = 'hello world';
console.log(text12.indexOf('hello')); // 0
console.log(text12.indexOf('world')); // 6
console.log(text12.indexOf('o')); // 4
console.log(text12.indexOf('o', 5)); // 7
console.log(text12.lastIndexOf('o')); // 7

let text13 = 'ვებგვერდისთვის ძირითადად გვჭირდება: HTML, CSS, JavaScript.';
console.log(text13.search('CSS')); // 42
console.log(text13.search('SCSS')); // -1
console.log(text13.search(/javascript/i)); // 47

let text14 = 'ვებგვერდისთვის ძირითადად გვჭირდება: HTML, CSS, JavaScript.';
console.log(text14.split()); // ['ვებგვერდისთვის ძირითადად გვჭირდება: HTML, CSS, JavaScript.']
console.log(text14.split('')); // ["ვ", "ე", "ბ", "გ", "ვ", "ე", ... ] ყოველი სიმბოლო გადადის რიგრიგობით მასივში
console.log(text14.split(' ')); // ['ვებგვერდისთვის', 'ძირითადად', 'გვჭირდება:', 'HTML,', 'CSS,', 'JavaScript.']
console.log(text14.split(':')); // ['ვებგვერდისთვის ძირითადად გვჭირდება', ' HTML, CSS, JavaScript.']

let text15 = 'ვებგვერდისთვის ძირითადად გვჭირდება: HTML, CSS, JavaScript.';
console.log(text15.slice(15)); // 'ძირითადად გვჭირდება: HTML, CSS, JavaScript.'
console.log(text15.slice(15, 34)); // 'ძირითადად გვჭირდება'
console.log(text15.slice(-22)); // 'HTML, CSS, JavaScript.'
console.log(text15.slice(-22, -13)); // 'HTML, CSS'

let text16 = 'ვებგვერდისთვის ძირითადად გვჭირდება: HTML, CSS, JavaScript.';
console.log(text16.substring(15)); // 'ძირითადად გვჭირდება: HTML, CSS, JavaScript.'
console.log(text16.substring(15, 34)); // 'ძირითადად გვჭირდება'
console.log(text16.substring(-22)); // 'ვებგვერდისთვის ძირითადად გვჭირდება: HTML, CSS, JavaScript.'
console.log(text16.substring(-22, -13)); // ''

console.log('Hello World!'.toLowerCase()); // 'hello world!'
console.log('Hello World!'.toUpperCase()); // 'HELLO WORLD!'

const stringObject = new String('სატესტო');
console.log(stringObject); // String { 'სატესტო' }
console.log(stringObject.toString()); // 'სატესტო'

let number = 2;
console.log(number.toString(2)); // '10' რადგან ორობითში 2 არის 10
number = 17;
console.log(number.toString(16)); // '11' რადგან თექვსმეტობითში 17 არის 11

let text17 = '      რაღაც ტექსტი      '; // დასაწყისშიც და დასასრულშიც 6 ზედმეტი space არის მოთავსებული
console.log(text17.length); // 24
console.log(text17.trim()); // 'რაღაც ტექსტი'
console.log(text17.trim().length); // 12
console.log(text17.trimStart()); // 'რაღაც ტექსტი      '
console.log(text17.trimStart().length); // 18
console.log(text17.trimEnd()); // '      რაღაც ტექსტი'
console.log(text17.trimEnd().length); // 18
