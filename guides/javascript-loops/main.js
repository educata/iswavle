let index = 0; // საწყისი მნიშვნელობა, მეორე ნაირად დამთვლელი
// ციკლმა იმუშავოს მანამ სანამ index ცვლადი ნაკლებია 100-ზე
while (index < 100) {
  console.log(index); // გამოგვაქვს მისი მნიშვნელობა კონკრეტული იტერაციის დროს
  index++; // ბიჯი იზრდება 1-ით | იგივე ინკრემენტი
}

let k = 100;
while (k < 100) {
  console.log(k);
  k++;
}

let j = 100;
do {
  console.log(j);
  j++;
} while (j < 100);

for (let i = 0; i < 100; i++) {
  // i შეიცვლება 0 დან 100 მდე
  console.log(i); // ილოგება i მნიშვნელობა
}
console.log(i); // undefined

let z;
for (z = 10; z < 20; z++) {
  console.log(z);
}
console.log(z); // 20

for (let f = 0; f < 10; f += 2) {
  console.log(f);
}

for (let i = 0; i < 10; ) {
  let randomNumber = Math.round(Math.random() * 100);
  if (randomNumber % 2 === 0) {
    console.log(randomNumber);
    i++;
  }
  console.log('იტერაცია დასრულდა');
}

const projects = {
  company: 'iswavle',
  education: 'iswavle',
  restAPI: 'EverREST',
};

for (let i = 0; i < 3; i++) {
  console.log(projects[i]); // undefined ყველა ჯერზე
}

for (const item in projects) {
  console.log(item, projects[item]); // გასაღები(key) და მნიშვნელობა(property) დაილოგება ყოველ ჯერზე
}

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

for (let i = 0; i < numbers.length; i++) {
  let number = numbers[i]; // პირდაპირ ლოგში დაწერაც შეიძლება თუმცა უკეთესი შედარებისთვის სხვა მაგალითებისთვის, ცალკე ცვლადში გავწეროთ
  console.log(number);
}

for (const key in numbers) {
  let number = numbers[key];
  console.log(number); // პირდაპირ ლოგში დაწერაც შეიძლება თუმცა უკეთესი შედარებისთვის სხვა მაგალითებისთვის, ცალკე ცვლადში გავწეროთ
}

for (const number of numbers) {
  console.log(number);
}

for (const [i, number] of numbers.entries()) {
  console.log(number, i); // დაილოგება რიცხვი და i მნიშვნელობაც თუ მერამდენე იტერაციაც არის
}

index = 0; // გავანულოთ შემდგომი ციკლისთვის
while (true) {
  console.log(index++); // დავლოგოთ index ცვლადი და გავზარდოთ 1-ით
  if (index >= 1000) {
    // თუ index ცვლადი მეტია ან ტოლი 1000 ზე მაშინ შევწყვიტოთ ციკლი
    break;
  }
}

index = 0; // გავანულოთ შემდგომი ციკლისთვის
// იგივე მოქმედებები შევასრულოთ do...while ციკლშიც
do {
  console.log(index++); // დავლოგოთ index ცვლადი და გავზარდოთ 1-ით
  if (index >= 1000) {
    // თუ index ცვლადი მეტია ან ტოლი 1000 ზე მაშინ შევწყვიტოთ ციკლი
    break;
  }
} while (true);

for (let i = 0; i < 100; i++) {
  if (i === 50) {
    // შევწყვიტოთ ციკლი 50 იტერაციის შემდგომ
    break;
  }
  console.log(i);
}

for (const [i, number] of numbers.entries()) {
  if (i === 2) {
    // თუ ინდექსი არის 2ს ტოლი შევწყვიტოთ ციკლი
    break;
  }
  console.log(number); // დავლოგოთ რიცხვი
}

let l = 0;
while (l < 100) {
  l++; // i გავზარდოთ 1-ით
  if (l % 3 === 0) {
    // თუ 3-ს ჯერადი იტერაცია არის გამოვტოვოთ ეს იტერაცია
    continue;
  }
  console.log(l); // დავლოგოთ i
}

l = 0; // გავანულოთ შემდგომი ციკლისთვის
// იგივე მოქმედებები შევასრულოთ do...while ციკლშიც
do {
  l++; // i გავზარდოთ 1-ით
  if (l % 3 === 0) {
    // თუ 3-ს ჯერადი იტერაცია არის გამოვტოვოთ ეს იტერაცია
    continue;
  }
  console.log(l); // დავლოგოთ i
} while (l < 100);

for (let i = 0; i < 100; i++) {
  if (i % 2 === 0) {
    // თუ i არის ლუწი გამოვტოვოთ ეს იტერაცია
    continue;
  }
  console.log(i); // დავლოგოთ ყოველი i მნიშვნელობა
}

for (const [i, number] of numbers.entries()) {
  if (i % 2 !== 0) {
    // თუ ინდექსი არის კენტი გამოვტოვოთ ეს იტერაცია
    continue;
  }
  console.log(number); // დავლოგოთ რიცხვი
}
