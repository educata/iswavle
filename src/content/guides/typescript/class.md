---
title: 'კლასი'
description: 'კლასები TypeScript-ში'
keywords: 'კლასი, კლასის გამოყენება, class, ტაიპსკრიპტში კლასები'
---

კლასები ტაიპსკრიპტში ჯავასკრიპტის მსგავსია ოღონდ უფრო მეტი ფუნქციონალით.
თუ ჯერ კიდევ არ გაცნობიხართ ჯავასკრიპტის კლასების სტატიას, გირჩევთ პირველ რიგში გაეცნოთ
[ჯავასკრიპტის კლასებს](./doc/guides/javascript/oop#კლასი).

## სად გამოიყეენბა კლასები?

კლასები გამოიყენება OOP-ს დროს. OOP-ში იგულისხმება **ო**ბიექტზე **ო**რიენტირებული **პ**როგრამირება,
სადაც აქცენტი სრულიად კეთდება ობიექტზე.

OOP არის დიზაინის სისტემა სადაც:

- თითოეული ობიექტი წარმოადგენს ამ სისტემის რაღაც ასპექტს.
- ობიექტები შეიცავენ ფუნქციებსა და მონაცემებს.
- ობიექტები იძლევიან ინტერფეისებს რათა პროგრამის სხვადასხვა ნაწილებმა ისინი გამოიყენონ.
- მიუხედავად ამისა ობიექტები ინარჩუნებენ კერძო შინაგან მდგომარეობას.
- სისტემის სხვა ნაწილებისთვის აუცილებელი არ არის ამ ობიექტის შინაგან მდგომარეობაზე წვდომა.

OOP ძირითადად ეფუძვნება 3 პრინციპს:

- ინკაფსულაციას.
- მემკვიდრეობას.
- პოლიმორფიზს.

## როგორ შევქმნათ კლასი?

კლასის შექმნა ტაიპსკრიპტში იგივეა, რაც ჯავასკრიპტში. ვიყენებთ ქივორდ `class` და კლასის სახელს
[PascalCase](./doc/guides/javascript/varaible#ცვლადის_სახელის_სტილი)-ში.

```ts
class Warrior {
  constructor() {}
}
```

ინფორმაციის მიწოდება ინიციალიზების დროს შესაძლებელია კონსტრუქტორის გავლით. განსხვავებით
ჯავასკრიპტისგან, ტაიპსკრიპტსი საჭიროა ცვლადის აღწერა, სხვა შემთხვევაში მნიშვნელობას ვერ მივანიჭებთ.

```ts
// ❌ არასწორი მიდგომა

class Warrior {
  constructor(name: string) {
    this.name = name;
  }
}

// ✅ სწორი მიდგომა

class Warrior {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
}
```

`name` ნაგულისხმევად არის `public`, რადგან ინკაფსულაციით არ დავაზუსტეთ.

## ინკაფსულაცია

ობიექტების გამოყენებისას გვჭირდება ისეთი ტიპის თვისებების და მეთოდების შექმნა, რომელიც იქნება ღია ან დახურული.
ინკაფსულაციით შეგვიძლია განვსაზღვროთ წვდომის შესაძლებლობა ყოველ თვისებაზე და მეთოდზე.

სულ გვაქვს 3 წვდომის შესაძლებლობა:

- `public` - წვდომა შესაძლებელია ნებისმიერი ადგილიდან.
- `private` - წვდომა მხოლოდ შესაძლებელია არსებულ კლასის შიგნიდან (კლასის სქოუფი).
- `protected` - წვდომა შესაძლებელია მხოლოდ არსებული კლასის შიგნიდან და მისი მემკვიდრე კლასებიდან.

მარტივი განსხვავებისთვის შეგიძლიათ წარმოიდგინოთ ეს მაგალითები:

- სოციალურ ქსელში დებთ პოსტს, რომელიც ხილვადია **მხოლოდ თქვენთვის**.
- სოციალურ ქსელში დებთ პოსტს, რომელიც ხილვადია **ყველასთვის**.
- სოციალურ ქსელში დებთ პოსტს, რომელიც ხილვადია **თქვენთვის** და **მორგებული აუდიტორიისთვის**.

```ts
class User {
  public name: string;
  protected email: string;
  private password: string;

  public details() {}
  protected sendEmail() {}
  private resetPassword() {}
}
```

:::warning
გაითვალისწინეთ ტაიპსკრიპტში კლასის თვისებას მნიშვნელობა უნდა ჰქონდეს ან ინიციალიზების დროს
ან კონსტრუქტორში, სხვა შემთხვევაში გვექნება შეცდომა: `Property 'password' has no initializer and is not definitely assigned in the constructor.`.
თუ მნიშვნელობა შემდგომ ენიჭება შეგიძლიათ ცვლადის აღწერისას გამოიყენოთ `!`, მაგალითად: `private password!: string`. `!` გულისხმობს რომ თვისებას
მნიშვნელობა აუცილებლად ექნება. ეს შეცდომა ხდება `strictPropertyInitialization`-ს წესის გამო, შეგიძლიათ გათიშოთ `tsconfig`-ში მაგრამ უმჯობესია იყოს ჩართული.
:::

თვისების შემოტანა ასევე შესაძლებელია [DI](./doc/guides/javascript/oop#Dependency_Injection) (Dependency Injection)-ს გზითაც.

```ts
class User {
  constructor(private authService: AuthService) {}
}
```

## მემკვიდრეობა

მემკვიდრეობით შესაძლებელია ერთმა კლასმა მიიღოს მეორე კლასის სტრუქტურა.
მემკვიდრე კლასს ვუწერთ `extends` ქივორდს იმ კლასის თანხლებით, რომელზეც ხდება "დაშენება".

```ts
class Animal {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  move(distance: number = 0): void {
    console.log(`${this.name} moved ${distance} meters.`);
  }
}

class Dog extends Animal {
  bark(): void {
    console.log(`${this.name} says: Woof! Woof!`);
  }
}

class Bird extends Animal {
  fly(distance: number): void {
    console.log(`${this.name} is flying ${distance} meters.`);
  }
}

const dog = new Dog('Buddy');
dog.bark(); // Buddy says: Woof! Woof!
dog.move(10); // Buddy moved 10 meters.

const bird = new Bird('Sky');
bird.fly(20); // Sky is flying 20 meters.
bird.move(5); // Sky moved 5 meters.
```

:::info
[`this`](./doc/guides/javascript/object-basics#რა_არის_This_) მიუთითებს ამჟამინდელ ობიექტს სადაც არის ჩაწერილი, ჩვენს შემთხვევაში `Animal` კლასზე.
:::

როცა კონსტრუქტორში თვისებების რაოდენობა, ერთნაირია და იგივე თანმიმდევრობით არ არის საჭირო
მემკვიდრე კლასიდან `super`-ს გამოძახება. `super` გამოიყენება მშობელი კლასის კონსტრუქტორის ან
მეთოდების გამოძახებისთვის.

```ts
class Animal {
  name: string;
  protected id: number;

  constructor(name: string) {
    this.name = name;
    this.id = Math.random();
  }

  move(distance: number): void {
    console.log(`${this.name} moved ${distance} meters.`);
  }
}

class Dog extends Animal {
  breed: string;

  constructor(name: string, breed: string) {
    super(name);
    this.breed = breed;
  }

  bark(): void {
    console.log(`${this.name}, a ${this.breed}, says: Woof!`);
  }

  printId(): void {
    console.log(this.id);
  }
}

const dog = new Dog('Buddy', 'Golden Retriever');
dog.bark(); // Buddy, a Golden Retriever, says: Woof!
dog.move(10); // Buddy moved 10 meters.
dog.printId(); // შემთხვევითი იდ 0-დან 1-მდე
console.log(dog.id); // Property 'id' is protected and only accessible within class 'Animal' and its subclasses.
```

:::info
არ არის სავალდებულო `public`-ს წერა ყველაფერზე, ისეც ნაგულისხმევად ყველაფერი `public` არის ჯავასკრიპტშიც და ტაიპსკრიპტშიც.
:::

## პოლიმორფიზმი

პოლიმორფიზმი გულისხმობს მშობელი კლასის მეთოდების გადაწერას შვილობილ კლასში.
ჯავასკრიპტისგან განსხვავებით ტაიპსკრიპტში საჭიროა `override` ქივორდის დაწერა.

```ts
class Animal {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  move(distance: number): void {
    console.log(`${this.name} moved ${distance} meters.`);
  }
}

class Dog extends Animal {
  breed: string;

  constructor(name: string, breed: string) {
    super(name);
    this.breed = breed;
  }

  bark(): void {
    console.log(`${this.name}, a ${this.breed}, says: Woof!`);
  }
}

class Bird extends Animal {
  override move(distance: number): void {
    console.log(`${this.name} is flying ${distance} meters.`);
  }

  oldMove(distance: number) {
    super.move(distance);
  }
}

const dog = new Dog('Buddy', 'Golden Retriever');
dog.bark(); // Buddy, a Golden Retriever, says: Woof!
dog.move(10); // Buddy moved 10 meters.

const bird = new Bird('Sky');
bird.move(10); // Sky is flying 10 meters.
bird.oldMove(10); // Sky moved 10 meters.
```

ასე მივიღეთ `move` მეთოდის `override` და ძველი მეთოდის გამოყენებაც `super`-ის გამოყენებით.

## Static

კლას შესაძლოა გააჩნდეს სტაიტკური თვისებები და მეთოდები.

```ts
class Calculator {
  static PI: number = 3.14;

  static calculateCircumference(radius: number): number {
    return 2 * this.PI * radius;
  }
}

console.log(Calculator.PI); // 3.14
console.log(Calculator.calculateCircumference(10)); // 62.8
```

სტატიკური თვისებების გამოყენების დროს არ არის სავალდებულო კლასის ინსტანციის შექმნა `new` ქივორდის გამოყენებით.
მისი თვისებებისა და მეთოდების გამოყენება, შესაძლებელია მის გარეშეც.

:::info
სტატიკური თვისებები და მეთოდები ინკაფსულაციის პრინციპს თავისულად ერგებიან.
მათზეც შეიძლება `public`, `private` და `protected` მორგება.
:::

### სტატიკური ბლოკი

სტატიკური ბლოკი გვაძლევს საშუალებას ვწეროთ სხვადასხვა ფუნქციონალური ნაწილი ისე, რომ წვდომა გვქონდეს კლასის
შიდა scope-ზე. მსგავსი ფუნქციონალით შეგვიძლია ცვლადებს მივანიჭოთ მნიშვნელობები ისე, რომ არ მოხდეს `private` და `protected`,
ველების გასაჯაროვება.

```ts
class Counter {
  private static count = 0;

  get count() {
    return Counter.count;
  }

  static {
    Counter.count += 1;
  }
}

const counter = new Counter();

console.log(counter.count); // 1
```

:::warning
სტატიკურ `private` და `protected` თვისებებთან არ შეგვიძლია `this` გამოყენება. `this` ნაცვლად გამოიყენეთ კლასის სახელი.
:::

## ჯენერიკ კლასი

კლასები ინტერფეისების მსგავსად შეიძლება იყოს ჯენერიკი.

```ts
class Box<T> {
  contents: T;
  constructor(value: T) {
    this.contents = value;
  }
}

const box = new Box('გამარჯობა!');
const box2 = new Box<string>('გამარჯობა!');
```

ორივე სინტაქსით ინიციალიზება მიღებულია, თუმცა უმჯობესია პირველი ვერსიის გამოყენება, რადგან `T` მარტივად ენიჭება კონსტრუქტორიდან გამომდინარე.
თუ კონსტრუქტორში არ გვაქვს იგივე ტიპი მაშინ `<T>` აღწერა აუცილებელია, მაგალითად:

```ts
class Box<T> {
  contents: T | null = null;

  setContent(content: T) {
    this.contents = content;
  }
}

const box = new Box<number>();
box.setContent(27);
box.setContent('22'); // Argument of type 'string' is not assignable to parameter of type 'number'.

const box1 = new Box<string>();
box1.setContent('educata');
```

## get და set

ისევე როგორც ჯავასკრიპტში, ტაიპსკრიპტშიც შესაძლებელია `getter` და `setter`-ის გამოყენება.

```ts
class Box {
  private content: string;

  constructor(content: string) {
    this.content = content;
  }

  get boxContent() {
    return this.decipher(this.content);
  }

  set boxContent(newContent: string) {
    this.content = newContent;
  }

  get boxContentWithoutCipher() {
    return this.content;
  }

  private cipher(text: string): string {
    return text
      .split('')
      .map((char) => String.fromCharCode(char.charCodeAt(0) + 3))
      .join('');
  }

  private decipher(text: string): string {
    return text
      .split('')
      .map((char) => String.fromCharCode(char.charCodeAt(0) - 3))
      .join('');
  }
}

const box = new Box('Educata');
console.log(box.boxContent); // "Bar`^q^"
console.log(box.boxContentWithoutCipher); // "Educata"
box.boxContent = 'Iswavle';
console.log(box.boxContent); // "Fpt^sib"
console.log(box.boxContentWithoutCipher); // "Iswavle"
```

ამ შემთხვევაში გვაქვს კლასი, რომელიც ინახვს კონტენტის მნიშვნელობას. კონტენტი არის დახურული (`private`) ველი, რაც გულისხმობს
მისი პირდაპირ წაკითხვა კლასის გარეთ არ შეიძლება. ამიტომაც გვაქვს ორი ღია წვდომის წერტილი `boxContent` გეთერი, რომელიც გვიბრუნებს
კონტენტს დაშიფრული მდგომარეობით და `boxContentWithoutCipher`, რომელიც გვიბრუნებს შიფრის გარეშე.

რეალურად შიფრის გარეშე დაბრუნება გამოდის `private` ველის მნიშვნელობის პირდაპირ დაბრუნებას, რომელიც აზრს უკარგავს `private` ველს.

## implements

ინტერფეისების გამოყნეებით კლასებში ასევე შეგვიძლია განვსაზღვროთ სავალდებულო თვისებები და მეთოდები.
განსაზღვრული მნიშვნელობები აუცილებლად უნდა იყოს `public` დონის.

```ts
interface UserContactInfo {
  id: number;
  name: string;
  email: string;

  getDetails(): string;
  updateEmail(newEmail: string): void;
}

class User implements UserContactInfo {
  id: number;
  name: string;
  email: string;

  constructor(id: number, name: string, email: string) {
    this.id = id;
    this.name = name;
    this.email = email;
  }

  getDetails(): string {
    return `User: ${this.name} (ID: ${this.id}), Email: ${this.email}`;
  }

  updateEmail(newEmail: string): void {
    this.email = newEmail;
  }
}
```

## readonly

კლასებში შესაძლებელია გვქონდეს მნიშვნელობები, რომლებიც იქნება მხოლოდ წაკითხვადი.
`readonly` თვისებაზე მნიშვნელობის მინიჭება შეიძლება, როგორც ინიციალიზების დროს ასევე კონსტრუქტორის გავლით.

```ts
class Book {
  readonly title: string;
  readonly author: string;

  constructor(title: string, author: string) {
    this.title = title;
    this.author = author;
  }

  displayInfo(): void {
    console.log(`${this.title}, ავტორი ${this.author}`);
  }
}

const book = new Book('ვეფხისტყაოსანი', 'შოთა რუსთაველი');
book.displayInfo(); // "ვეფხისტყაოსანი, ავტორი შოთა რუსთაველი"

book.author = 'ტარიელი'; // Error: Cannot assign to 'title' because it is a read-only property.
```

## abstract

კლასები, მეთოდები და თვისებები ტაიპსკრიპტში შეიძლება იყოს აბსტრაქტული.

აბსტრაქტული მეთოდი ან აბსტრაქტული ველი არის ისეთი მნიშვნელობა, რომელსაც არ ექნება ინიციალიზება ან იმპლემენტირება.
ეს წევრები უნდა არსებობდნენ მხოლოდ აბსტრაქტულ კლასში, რომელიც არ შეიძლება ინიციალიზირებული.

აბსტრაქტული კლასები გამოიყენება, როგორც მშობელი (საბაზისო) კლასი.

```ts
abstract class Vehicle {
  brand: string;
  model: string;
  year: number;

  constructor(brand: string, model: string, year: number) {
    this.brand = brand;
    this.model = model;
    this.year = year;
  }

  abstract startEngine(): void;

  displayInfo(): void {
    console.log(`${this.year} ${this.brand} ${this.model}`);
  }
}

class Car extends Vehicle {
  constructor(brand: string, model: string, year: number) {
    super(brand, model, year);
  }

  startEngine(): void {
    console.log(`The engine of the ${this.brand} ${this.model} car is now running.`);
  }
}

class Truck extends Vehicle {
  constructor(brand: string, model: string, year: number) {
    super(brand, model, year);
  }

  startEngine(): void {
    console.log(`The engine of the ${this.brand} ${this.model} truck is now running.`);
  }
}

const car = new Car('Toyota', 'Camry', 2020);
car.displayInfo(); // 2020 Toyota Camry
car.startEngine(); // The engine of the Toyota Camry car is now running.

const truck = new Truck('Ford', 'F-150', 2022);
truck.displayInfo(); // 2022 Ford F-150
truck.startEngine(); // The engine of the Ford F-150 truck is now running.
```

## შეჯამება

ამ სტატიაში განვიხილეთ ტაიპსკრიპტის კლასები და მისი გამოყენების მაგალითები.
