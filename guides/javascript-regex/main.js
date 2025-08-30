const phoneNumberRegex = /\+9955\d{8}$/;
console.log(phoneNumberRegex.test('+995512345678')); // true
console.log(phoneNumberRegex.test('+9955123456789')); // false

const nameRegex = /^[a-zA-Z]{2,25}$/;
console.log(nameRegex.test('konstantine')); // true
console.log(nameRegex.test('pridoni')); // true
console.log(nameRegex.test('satesto1')); // false
console.log(nameRegex.test('satesto_')); // false

const georgianNameRegex = /^[ა-ჰ]{2,25}$/;
console.log(georgianNameRegex.test('კონსტანტინე')); // true
console.log(georgianNameRegex.test('ფრიდონი')); // true
console.log(georgianNameRegex.test('ი')); // false
console.log(georgianNameRegex.test('pridoni')); // false
console.log(georgianNameRegex.test('konstantine_')); // false

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // ცვლილებაც შეიძლება განსხვავებულ ქეისებზე
console.log(emailRegex.test('test@gmail.com')); // true
console.log(emailRegex.test('test@custom.domain')); // true
console.log(emailRegex.test('test@saswavlebeli.edu.ge')); // true
console.log(emailRegex.test('test@saswavlebeli.edu.g')); // false
console.log(emailRegex.test('test@custom.d')); // false
console.log(emailRegex.test('test@custom')); // false
console.log(emailRegex.test('test')); // false

const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/; // ცვლილებაც შეიძლება განსხვავებულ ქეისებზე
console.log(urlRegex.test('https://everrest.educata.dev')); // true
console.log(urlRegex.test('https://iswavle.com')); // true
console.log(urlRegex.test('https://educata.dev')); // true
console.log(urlRegex.test('http://educata.dev')); // true
console.log(urlRegex.test('ftp://ftp.educata.dev')); // true
console.log(urlRegex.test('htt://educata.dev')); // false
console.log(urlRegex.test('htt://educata.d')); // false
