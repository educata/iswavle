---
title: "ინსტალაცია"
---

# ინსტალაცია

ანგულარს აქვს თავისი CLI, რომლის დასაინსტალირებლად და გამოსაყენებლად საჭიროა
Node-ის პაკეტების მენეჯერი - npm, რომელიც Nodejs-ს მოყვება:

```
npm install -g @angular/cli
```

ინსტალაციის შემდეგ შეგვიძლია შევამოწმოთ CLI-ის ვერსია, რათა დავრწმუნდეთ რომ ის დაინსტალირდა.

```
ng v
```

CLI ანგულარის ერთ-ერთი უმძლავრესი ხელსაწყოა, რომლითაც ყველა სხვა ფრეიმვორქს აღემატება.
CLI-ს საშუალებით შეგვიძლია საწყისი აპლიკაციების შექმნა ან აპლიკაციების კონკრეტული ნაწილების
შექმნა, მოდიფიკაცია, კონფიგურაცია და ა.შ. ეს არ ამოწურავს ანგულარის CLI-ს შესაძლებლობებს,
მაგრამ ყველაზე ხშირად ის ასეთი საქმეებისთვის დაგვჭირდება.

## პირველი აპლიკაცია

საწყისი აპლიკაციის შესაქმნელად ჩვენ ტერმინალში უნდა გადავინაცვლოთ ჩვენთვის სასურველ დირექტორიაში
და გავუშვათ ბრძანება:

```
ng new my-app
```

my-app შეგიძლიათ ნებისმიერი სახელით ჩაანაცვლოთ - ეს ჩვენი პროექტის სახელი იქნება.
ანგულარი რამდენიმე შეკითხვას დაგვისვამს, ამჯერად რას ვუპასუხებთ არსებითი მნიშვნელობა
არ აქვს, თუმცა შეგვიძლია SSR-სა და რაუტინგზე უარი ვთქვათ, ხოლო სტილებისთვის ავირჩიოთ CSS.

ანგულარი შეგვიქმნის ახალი პროექტის ფოლდერს, შიგნით ყველა საჭირო ფაილით. გავხსნათ პროექტი
ჩვენს ედიტორში და თვალი შევავლოთ მის სტრუქტურას:

- `angular.json` - ანგულარის კონფიგურაცია
- `node_modules` - პაკეტები (კოდი), რომელიც ჩვენ აპლიკაციას და ანგუალრს სჭირდება
- `package.json` - ინფორმაცია საჭირო პაკეტების და მათი ვერსიების შესახებ
- `package-lock.json` - პაკეტების ვერსიებს შორის ურთიერთდამოკიდებულების შესახებ ინფორმაცია
- `README.md` - ფაილი, სადაც შეგვიძლია ჩვენი პროექტი აღვწეროთ სხვების დასანახად
- `src` - ფოლდერი, სადაც აპლიკაციაზე სამუშაო კოდია
  - `app` - მთავარი აპლიკაციის საშენი ბლოკების ფოლდერი
    - `app.component.css` - მთავარი კომპონენტის სტილების ფაილი
    - `app.component.html` - მთავარი კომპონენტის მარკაპის ფაილი
    - `app.component.spec.ts` - მთავარი კომპონენტის ავტომატიზირებული ტესტების ფაილი
    - `app.component.ts` - მთავარი აპლიკაციის კომპონენტის ფაილი
    - `app.config.ts` - აპლიკაციის კონფიგურაციის ფაილი
    - `app.routes.ts` - აპლიკაციის რაუთინგის ფაილი
  - `assets` - ფოლდერი ისეთი რესურსებისთვის, როგორიცაა სურათები, აიქონები, JSON ფაილები და ა.შ
  - `favicon.ico` - აპლიკაციის აიქონი რაც ტაბებზე ჩნდება
  - `index.html` - აპლიკაციის მთავარი ამოსავალი წერტილი. მთლიანი აპლიკაცია ამ ერთ ფაილში იმუშავებს
  - `main.ts` - ქმნის აპლიკაციას `app.config.ts`-ში არსებული კონფიგურაციის მიხედვით და მას სვამს `index.html`-ში
  - `styles.css` - გლობალური სტილების ფაილი
- `tsconfig.app.json` - ტაიპსკრიპტის კონფიგურაცია, რომელსაც ანგულარის ქომფაილერი გამოიყენებს
- `tsconfig.json` - ტაიპსკრიპტის კონფიგურაცია, რომლითაც ჩვენ ვიხელმძღვანელებთ კოდის წერისას
- `tsconfig.spec.json` - ტაიპსკრიპტის კონფიგურაცია, რომელსაც ტესტის ფაილები გამოიყენებენ

სადეველოპმენტო სერვერის გასაშვებად გავცეთ ბრძანება

```
npm run start
```

ან

```
ng serve
```

ბრაუზერი გავხსნათ `localhost:4200`-ზე. აქ ვხედავთ ზუსტად იმ მარკაპს, რომელიც `app.component.html`-შია დაწერილი.
შეგვიძლია იქ ყველაფერი წავშალოთ და უბრალოდ დავწეროთ `<h1>Hello world!<h1>` რათა დავრწმუნდეთ, რომ ყველაფერი
მუშაობს.

## რეკომენდირებული ექსთენშენები

visual studio code-ში რეკომენდირებულია რომ დააყენოთ შემდეგი ექსთენშენები:

- Angular Language Service
- angular2-inline
- ESLint
- Material Icon Theme
- Prettier - Code formatter

ახლა მზად ვართ, რომ [ანგულარზე ვიმუშაოთ](./creating-component.html).