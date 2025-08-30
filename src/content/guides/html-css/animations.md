---
title: 'ანიმაციები'
description: 'ანიმაციების შექმნა CSS-ში'
keywords: 'animations, animation, ანიმაცია, ანიმაციები'
---

ანიმაციების საშუალებით შეგვიძლია ვებგვერდი უფრო ლამაზი და საინტერესო გავხადოთ.

## რა არის CSS ანიმაცია?

CSS ანიმაცია გვაძლევს საშუალებას, ელემენტის სტილები ვცვალოთ დროთა განმავლობაში.
ეს შეიძლება იყოს ფერის, ელემენტის პოზიციის ან სხვა ნებისმიერი CSS სტილიზაციის ცვლილება.

## როგორ შევქმნათ ანიმაცია?

1. მივანიჭოთ ელემენტს ანიმაციის სახელი.
2. მივანიჭოთ სხვადასხვა ანიმაციის თვისებები (რა დროში შესრულდეს, როგორ შესრულდეს და ა.შ).
3. აღვწეროთ ანიმაციის შესრულების პროცესი, დასაწყისიდან დასასრულამდე.

მაგალითისთვის, შევქმნათ სპინერის (ჩატვირთვის) ანიმაცია.

პირველ რიგში საჭიროა ელემენტის შექმნა.

```html preview
<div class="spinner" role="status"></div>
```

```css preview
div.spinner {
  width: 50px;
  height: 50px;
  border: 5px solid #1890ff;
  border-top-color: transparent;
  border-radius: 50%;
}
```

მივიღეთ ელემენტის ჩარჩო, რომელზეც შეგვიძლია მოვარგოთ ანიმაცია.

:::info
`role="status"` გამოიყენება [ხელმისაწვდომობისთვის](./doc/guides/a11y)
:::

გავუწეროთ ანიმაციის სახელიც:

```css
div.spinner {
  width: 50px;
  height: 50px;
  border: 5px solid #1890ff;
  border-top-color: transparent;
  border-radius: 50%;
  animation-name: spinner;
}
```

[`animation-name`](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-name)-ის გამოყენებით ელემენტს მივანიჭეთ ანიმაცის სახელი.
ახლა საჭიროა ამ სახელით ანიმაციის შესრულების ინსტრუქციების აღწერა.

ანიმაციის შესრულების სტილების აღსაწერად გამოიყენება [`@keyframes`](https://developer.mozilla.org/en-US/docs/Web/CSS/@keyframes).
მასში შეგვიძლია ორნაირად ჩავწეროთ მნიშვნელობები:

1. `from` და `to`: ანიმაციის დასაწყისი (0%) და ანიმაციის დასასრული (100%).
2. პროცენტული მახასიათებელი რამდენიც გვსურს 0-დან 100-ის ჩათვლით.

```css
@keyframes spinner {
  from {
    rotate: 0deg;
  }
  to {
    rotate: 360deg;
  }
}
```

[`rotate`](https://developer.mozilla.org/en-US/docs/Web/CSS/rotate) არის CSS-ის თვისება, რომელიც განსაზღვრავს თუ როგორ დაიხაროს ელემენტი.
ასევე შეიძლება [`transform: rotate()`](https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/rotate) ფუქნციის გამოყენება.

<iframe data-url="guides/html-css-text" data-search-params="style=rotate&text=%E1%83%A8%E1%83%94%E1%83%9B%E1%83%97%E1%83%AE%E1%83%95%E1%83%94%E1%83%95%E1%83%98%E1%83%97%E1%83%98+%E1%83%A2%E1%83%94%E1%83%A5%E1%83%A1%E1%83%A2%E1%83%98&data=%5B%220deg%22%2C%2290deg%22%2C%22180deg%22%2C%22270deg%22%2C%22360deg%22%5D" data-title="CSS Rotate მაგალით" data-height="385"></iframe>

:::info
`transform`-ის ჩაწერისას, შეგვიძლია ერთდროულად რამდენიმე `transform` თვისების გამოყენება, სხვა მხრივ არანაირი განსხვავება არ არის `rotate` თვისებისა და `rotate()` ფუნქციის შორის.
:::

ჩვენ ანიმაციას უკვე აქვს სახელიც და შესასრულებელი სტილებიც, თუმცა ანიმაციის გასაშვებად საჭიროა ანიმაციის დრო.
[`animation-duration`](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-duration).

მას შეიძლება მნიშვნელობა მივანიჭოთ `s` (წამებში) ან `ms` (მილიწამებში) დროის ერთეულებში.

:::info
ერთი წამი ათასი მილიწამია 🤓
რაც ნაკლებია შესრულების დრო, მით უფრო სწრაფია ანიმაციაც
:::

```html preview
<div class="spinner" role="status"></div>
```

```css preview
div.spinner {
  width: 50px;
  height: 50px;
  border: 5px solid #1890ff;
  border-top-color: transparent;
  border-radius: 50%;
  animation-name: spinner;
  animation-duration: 10s;
}

@keyframes spinner {
  from {
    rotate: 0deg;
  }
  to {
    rotate: 360deg;
  }
}
```

ჩვენს შემთხვევაში, ანიმაცია შესრულდება მხოლოდ 10 წამი და ამის შემდეგ გაჩერდება.

## ანიმაციის თვისებები

CSS-ში ასევე გვაქვს სხვადასხვა ანიმაციის თვისებები, რომლებიც დაგეხმარებათ ლამაზი ანიმაციების შექმნაში.

### animation-iteration-count

[`animation-iteration-count`](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-iteration-count)
განსაზღვრავს თუ რამდენჯერ უნდა განმეორდეს ანიმაცია.

თვისებას შეიძლება მივანიჭოთ ნებისმიერი დადებითი რიცხვი ან `infinite` (უსასრულოდ შესრულებისთვის).

### animation-delay

[`animation-delay`](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-delay) განსაზღრავს თუ რა დროის
შემდეგ დაიწყება ანიმაცია, ერთგვარი დაგვიანების დრო.

თვისებას შეიძლება მივანიჭოთ დროის მნიშვნელობები (`s` ან `ms`).

### animation-direction

[`animation-direction`](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-direction) განსაზღრავს თუ რა
მიმართლებით დაიწყოს ანიმაცია.

თვისებას შეიძლება მივანიჭოთ ოთხი მნიშვნელობა:

- `normal` - სტანდარტული მნიშვნელობა (`from`-იდან `to`-მდე).
- `reverse` - სტანდარტულის შებრუნებული მნიშვნელობა (`to`-დან `from`-მდე).
- `alternate` - იწყება სტანდარტული ციკლით (`from`-იდან `to`-მდე) შემდეგ კი იცვლება (`to`-იდან `from`-მდე) და ასე გრძელდება მონაცვლეობით.
- `alternate-reverse` - ჰგავს `alternate`-ს, ოღონდ შებრუნებული თანმიმდევრობით.

### animation-timing-function

[`animation-timing-function`](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-timing-function) განსაზღრავს თუ როგორ
უნდა შესრულდება ანიმაცია შესრულებული ციკლის დროს - კერძოდ დამოკიდებულებას ანიმაციის ეტაპებსა და ანიმაციის დროს შორის.

თვისებას შეიძლება მივანიჭოთ [cubic-bezier](https://developer.mozilla.org/en-US/docs/Web/CSS/easing-function/cubic-bezier)-ის მნიშვნელობა
`cubic-bazier` არის ფუნქცია, რომელიც გაძლევს საშუალებას განსაზღვრო ანიმაციის სიჩქარის ცვლილება ზუსტად ისეთი ფორმით, როგორიც შენ გინდა.
ეს ფუნქცია მუშაობს [Bazier curve](https://developer.mozilla.org/en-US/docs/Glossary/Bezier_curve)-ის საფუძველზე. ის ასევე გამოიყენება გრაფიკულ
დიზაინში მრუდების დასახატად.

`cubic-bazier`-ის ფუნქციის ჩასაწერად გამოიყენება შემდეგი ფორმულა:

```css
.some_random_element {
  animation-timing-function: cubic-bazier(x1, y1, x2, y2);
}
```

- `x1` - რიცხვითი მნიშვნელობა, პირველი წერტილის X კორდინატი, მნიშვნელობა შეიძლება ჩაიწეროს 0-დან 1-ის ჩათვლით (`[0, 1]`).
- `y1` - რიცხვითი მნიშვნელობა, პირველი წერტილის Y კორდინატი, მნიშვნელობა შეიძლება ჩაიწეროს 0-დან 1-ის ჩათვლით (`[0, 1]`).
- `x2` - რიცხვითი მნიშვნელობა, მეორე წერტილის X კორდინატი, მნიშვნელობა შეიძლება ჩაიწეროს 0-დან 1-ის ჩათვლით (`[0, 1]`).
- `y2` - რიცხვითი მნიშვნელობა, მეორე წერტილის Y კორდინატი, მნიშვნელობა შეიძლება ჩაიწეროს 0-დან 1-ის ჩათვლით (`[0, 1]`).

CSS-ში გვაქვს რამოდენიმე cubic-bazier-ის რამდენიმე წინასწარ გაწერილი ფუნქცია:

| ფუნქცია       | როგორ მუშაობს                                               | cubic-bazier-ის მნიშვნელობა          |
| ------------- | ----------------------------------------------------------- | ------------------------------------ |
| `linear`      | ანიმაცია მიმდინარეობს თანაბარი სიჩქარით                     | `cubic-bezier(0.0, 0.0, 1.0, 1.0)`   |
| `ease`        | ანიმაცია სიჩქარეს იძენს შუა ნაწილში და ბოლოსკენ ნელდება     | `cubic-bezier(0.25, 0.1, 0.25, 1.0)` |
| `ease-in`     | ანიმაცია იწყება ნელა და თანდათან აჩქარებს დასრულებამდე      | `cubic-bezier(0.42, 0, 1.0, 1.0)`    |
| `ease-out`    | ანიმაცია იწყება სწრაფად და შემდეგ თანდათან ნელდება          | `cubic-bezier(0, 0, 0.58, 1.0)`      |
| `ease-in-out` | ანიმაცია იწყება ნელა, შუაში აჩქარებს და ბოლოს კვლავ ნელდება | `cubic-bezier(0.42, 0, 0.58, 1.0)`   |

<iframe data-url="guides/html-css-animation-timing-function" data-title="CSS timing function-ის მაგალითები" data-height="310"></iframe>

## შემოკლებული ჩაწერა

როგორც ბევრი სხვა CSS-ის თვისება, შეგვიძლია ანიმაციის თვისებებიც ერთი [თვისებაში](https://developer.mozilla.org/en-US/docs/Web/CSS/animation) გავაერთიანოთ:

```css
.some_random_element {
  animation: duration timing-function delay iteration-count direction name;
}
```

:::info
არ არის სავალდებულო ყოველი თვისების გამოყენება, შეგიძლიათ გამოტოვოთ ზოგი მათგანი.
:::

:::warning
გაითვალისწინეთ, ანიმაციის სახელი არ უნდა იყოს ჩაშენებული ფუნქციის ან თვისების იდენტური.
:::

## ანიმაციის მაგალითი

დავასრულოთ დაწყებული სპინერის მაგალითი, ახლად შესწავლილი თვისებების გამოყენებით:

```html preview
<div class="spinner" role="status"></div>
<div class="spinner reversed" role="status"></div>
```

```css preview
div.spinner {
  width: 50px;
  height: 50px;
  display: inline-block;
  border: 5px solid #1890ff;
  border-top-color: transparent;
  border-radius: 50%;
  animation: 2s linear infinite spinner;
}

div.spinner.reversed {
  margin-left: 15px;
  animation-direction: reverse;
}

@keyframes spinner {
  from {
    rotate: 0deg;
  }
  to {
    rotate: 360deg;
  }
}
```

## შეჯამება

ამ სტატიაში განვიხილეთ CSS ანიმაციების ძირითადი პრინციპები.
