---
title: 'კლასი'
description: 'კლასები TypeScript-ში'
keywords: 'კლასი, კლასის გამოყენება, class, ტაიპსკრიპტში კლასები'
---

ტაიპსკრიპტი დამატებითი ტიპიზაციის საშუალებებს გვაძლევს, როცა ჯავასკრიპტის კლასებზე ვმუშაობთ.
თუ ჯერ კიდევ არ გაცნობიხართ კლასების სტატიას, გირჩევთ პირველ რიგში გაეცნოთ
[ჯავასკრიპტის კლასებს](./doc/guides/javascript/oop#კლასი).

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
ინკაფსულაციით შეგვიძლია განვსაზღვროთ წვდომის შესაძლებლობა ყოველ თვისებასა და მეთოდზე.

სულ გვაქვს 3 წვდომის შესაძლებლობა:

- `public` - წვდომა შესაძლებელია ნებისმიერი ადგილიდან.
- `private` - წვდომა მხოლოდ შესაძლებელია არსებულ კლასის შიგნიდან (კლასის სქოუფი).
- `protected` - წვდომა შესაძლებელია მხოლოდ არსებული კლასის შიგნიდან და მისი მემკვიდრე კლასებიდან.

მარტივი მაგალითისთვის, შეგიძლიათ წარმოიდგინოთ ეს ანალოგია:

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
გაითვალისწინეთ, ტაიპსკრიპტში კლასის თვისებას მნიშვნელობა უნდა მიენიჭოს ან ინიციალიზების დროს,
ან კონსტრუქტორში. სხვა შემთხვევაში გვექნება შეცდომა: `Property 'password' has no initializer and is not definitely assigned in the constructor.`.
თუ თვისებას მნიშვნელობა მოგვიანებით ენიჭება, შეგიძლიათ ცვლადის აღწერისას გამოიყენოთ `!`, მაგალითად: `private password!: string`. `!` გულისხმობს რომ თვისებას
მნიშვნელობა აუცილებლად ექნება. ეს შეცდომა ხდება `strictPropertyInitialization`-ის წესის გამო, იგი შეგიძლიათ გათიშოთ `tsconfig`-ში, მაგრამ უმჯობესია ჩართული დატოვოთ.
:::

კლასის კონსტრუქტორიდან თვისების მინიჭება ტაიპსკრიპტში შემოკლებულადაც შეიძლება,
თუკი პარამეტრს წინ წვდომის მოდიფიკატორს დავუწერთ:

```ts
class User {
  constructor(public name: string) {}
}
```

ასე კონსტრუქტორის პარამეტრში არსებული `name` იქნება `User` კლასის ინსტანციის თვისება.
ანუ ეს იგივეა, რაც:

```ts
class User {
  public name: string;

  constructor(name: string) {
    this.name = name;
  }
}
```

## პოლიმორფიზმი

პოლიმორფიზმი გულისხმობს მშობელი კლასის მეთოდების გადაწერას შვილობილ კლასში.
ჯავასკრიპტისგან განსხვავებით, ტაიპსკრიპტში საჭიროა `override` ქივორდის დაწერა.

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

ასე `move` მეთოდს გავუკეთეთ `override` და განვახორციელეთ განსხვავებული ლოგიკა.
ძველი მეთოდი კლასის შიგნით `super`-ზე  ისევ ხელმისაწვდომია და სურვილისამებრ შეგვიძლია მისი გამოყენებაც კლასის შიგნიდან.

## ჯენერიკ კლასი

კლასები, ინტერფეისების მსგავსად, შეიძლება იყოს ჯენერიკი.

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

თუ კონსტრუქტორში არ გვაქვს იგივე ტიპი, მაშინ `<T>`-ს აღწერა აუცილებელია, მაგალითად:

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

ისევე როგორც ჯავასკრიპტში, ტაიპსკრიპტშიც შესაძლებელია `getter`-სა და `setter`-ის გამოყენება.

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

ამ შემთხვევაში გვაქვს კლასი, რომელიც ინახვს კონტენტის მნიშვნელობას. კონტენტი არის დახურული (`private`) ველი, რაც გულისხმობს, რომ
მისი პირდაპირ წაკითხვა კლასის გარეთ არ შეიძლება, ამიტომაც გვაქვს ორი ღია წვდომის წერტილი `boxContent` გეთერი, რომელიც გვიბრუნებს,
კონტენტს დაშიფრული მდგომარეობით და `boxContentWithoutCipher`, რომელიც გვიბრუნებს შიფრის გარეშე.

რეალურად შიფრის გარეშე დაბრუნება გამოდის `private` ველის მნიშვნელობის პირდაპირ დაბრუნება, რომელიც აზრს უკარგავს `private` ველს.

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
`readonly` თვისებაზე მნიშვნელობის მინიჭება შეიძლება მხოლოდ თვისების დეკლარაციაში ან კონსტრუქტორში.

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

აბსტრაქატული კლასები არის ერთგვარი ინტერფეისები უშუალოდ კლასებისთვის.
ისინი გამოიყენება მემკვიდრებისთვის, რათა მათზე დაშენებით ავაგოთ კლასები.
აბსტრაქტული კლასის ინსატანციის შექმნა შეუძლებელია.

აბსტრაქტული კლასი შეიცავს თვისებებისა და მეთოდების დეკლარაციას და აიძულებს მის ქვეკლასებს,
რომ ყველა ეს თვისება და მეთოდი განსაზღვრონ.


:::info
აბსტრაქტული კლასის ქვეკლასების კონსტრუქტორში აუცილებელია `super()`-ის დაძახება.
:::

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

## გამოყენებული ლიტერატურა

- [Classes](https://www.typescriptlang.org/docs/handbook/2/classes.html)
