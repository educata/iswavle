---
title: ტექსტის გასტილვა
description: 'ტექსტებთან მუშაობა CSS-ში'
keywords: 'CSS, Text Styling, Font Styling, ტექსტებთან მუშაობა, ტექსტის გასტილვა, ფონტის გასტილვა'
---

## რას გულისხმობს ტექსტის გასტილვა?

როცა ელემენტის შიგნით ტექსტს ვწერთ, ის განლაგდება ტექსტის [კონტენტ ბოქსში](/guides/html-css/box-model).
ჩვეულებრივ ტექსტი ისე განლაგდება, როგორც ნებისმიერი ინლაინ ელემენტი.
ის იწყება მარჯვენა ზედა კუთხიდან და მიიწევს მარჯვნივ. თუ ჰორიზონტალურად საკმარისი სივრცე არ რჩება,
ტექსტი ჩამოიშლება ახალ სტრიქონზე და ასე გაგრძელდება კონტენტის დასასრულამდე.

ტექსტის გასტილვისას ორ ძირითად კატეგორიას განვიხილავთ:

- **ფონტის სტილები**: თვისებები, რომლებიც განსაზღვრავს ფონტს, ანუ ფონტის სახეობა, ზომა, სიმუქე, დახრილობა და ა.შ.
- **ტექსტის სტილები**: თვისებები, რომლებიც განსაზღვრავს ტექსტის განლაგებას, დაშორებებს და ა.შ.

## ფონტები

განვიხილოთ ფონტის სტილები. <!-- გვინდა ეს ხაზი? -->

### ფერი

ფერის გასასტილად გამოიყენება [`color`](https://developer.mozilla.org/en-US/docs/Web/CSS/color) თვისება.
`color`-ის მნიშვნელობა შეიძლება იყოს:

1. სახელით. (მაგ: `red`, `green`, `blue`).
2. RGB და RGBA (მაგ: `rgb(255, 0, 0)`, `rgb(0, 255, 0)`, `rgb(0, 0, 255)`).
3. HEX და HEXA (მაგ: `#ff0000`, `#00ff00`, `#0000ff`).
4. HSL და HSLA (მაგ: `hsl(0, 100%, 50%)`, `hsl(120, 100%, 50%)`, `hsl(240,100%, 50%)`).
5. HWB (მაგ: `hwb(0 0% 0%)`, `hwb(120 0% 0%)`, `hwb(240 0% 0%)`).

<iframe data-url="guides/html-css-text" data-search-params="style=color&data=%5B%22purple%22%2C%22%231890ff%22%2C%22rgb(83%2C%20170%2C%2056)%22%2C%22hsl(240%2C%20100%25%2C%2050%25)%22%2C%22hwb(45%200%25%200%25)%22%5D" data-title="CSS ფერების მაგალითი" data-height="400"></iframe>

### ფონტის შეცვლა

ფონტის შესაცვლელად გამოიყენება [`font-family`](https://developer.mozilla.org/en-US/docs/Web/CSS/font-family) თვისება.
CSS-ში 5 ზოგადი ფონტი გვაქვს: `serif`, `sans-serif`, `monospace`, `cursive` და `fantasy`. ეს სახელები ძალიან ზოგადია,
სხვადასხვა ბრაუზერში და ოპერაციულ სისტემაში ისინი განსხვავებულად გამოჩნდებიან.

| Term <!-- რა უნდა იყოს--> | განმარტება                                                                                       | მაგალითი                                                                                                                          |
| ------------------------- | ------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------- |
| `serif`                   | ფონტები, რომლებსაც აქვთ მცირე დეკორატიული ხაზები ან დეტალები სიმბოლოების ძირებში და დაბოლოებებში | <span style="font-family: serif">In every obstacle lies an opportunity for innovation</span>                                      |
| `sans-serif`              | ფონტები, რომლებსაც არ გააჩნიათ `serif`-ს მსგავსი დაბოლოებები                                     | <span style="font-family: sans-serif">If you focus on what you left behind, you will never be able to see what lies ahead </span> |
| `monospace`               | ფონტები, სადაც ყოველი სიმბოლო ერთნაირი სიგანისაა, ჩვეულებრივ გამოიყენება კოდის ჩამონათვალებში.   | <span style="font-family: monospace">Art is the bridge between imagination and reality</span>                                     |
| `cursive`                 | ფონტები, რომლებიც განკუთვნილია ხელწერის იმიტაციისთვის.                                           | <span style="font-family: cursive"> Curiosity is the compass that leads us to new worlds</span>                                   |
| `fantacy`                 | ფონტები, რომლებიც განკუთვნილია დეკორატიული მიზნით.                                               | <span style="font-family: fantasy">Knowledge is the greatest treasure, and it belongs to those who seek it</span>                 |

<iframe data-url="guides/html-css-text" data-search-params="style=font-family&data=%5B%22serif%22,%22sans-serif%22,%22monospace%22,%22cursive%22,%22fantacy%22,%22system-ui%22%5D" data-title="CSS ფონტის მაგალითი" data-height="450"></iframe>

### ფონტის სტეკი

შესაძლებელია ფონტის ჩატვირთვა ვერ მოხერხდეს სხვადასხვა მიზეზების გამო. ესეთ დროს შეიძლება განვსაზღვროთ სათადარიგო ფონტი, რომელიც მის ნაცვლად ჩაიტვირთება.
მსგავს გადაცემას ეწოდება **font stack**, რაც გარანტიას მოგვცემს, რომ ძირითადი ფონტის ჩაუტვირთავობის შემთხვევაში სწორი ალტერნატივით ჩანაცვლდება.

```css
p {
  font-family: 'Trebuchet MS', Verdana, sans-serif;
}
```

:::info
სათადარიგოდ შეგიძლიათ მოათავსოთ იმდენი ფონტი, რამდენიც დაგჭრდებათ.
:::

### ზომა

ფონტის ზომის შესაცვლელად საჭიროა `font-size` თვისების გამოყენება. თვისებას შეიძლება მივანიჭოთ აბსოლიტური მნიშვნელობა ან დინამიური.
**აბსოლიტური** ერთეულებით განსაზღვრული ზომები არის ფიქსირებული და არ იცვლება, მაგალითად საიტის დაპატარავებისას.

აბსოლიტური მნიშვნელობებია:

| ერთეული | განმარტება | ექვივალენტურია           |
| ------- | ---------- | ------------------------ |
| `px`    | პიქსელი    | 1px = 1/96 ინჩის         |
| `cm`    | სანტიმეტრი | 1cm = 37.8px = 25.2/64in |
| `mm`    | მილიმეტრი  | 1mm = 1/10 სანტიმეტრის   |
| `in`    | ინჩი       | 1in = 2.54cm = 96px      |
| `pt`    | წერტილი    | 1pt = 1/72 ინჩის         |

აბსოლიტური სიტყვიერი მნიშვნელობებია:

| ერთეული     | ექვივალენტური პიქსელები (`px`) |
| ----------- | ------------------------------ |
| `xx-small`  | `9px`                          |
| `x-small`   | `10px`                         |
| `small`     | `13px`                         |
| `medium`    | `16px` (ნაგულისხმევი ზომა)     |
| `large`     | `18px`                         |
| `x-large`   | `24px`                         |
| `xx-large`  | `32px`                         |
| `xxx-large` | `48px`                         |

დინამიური მნიშვნელობებია:

| ერთეული | განმარტება                                                                                                                               | ფორმულა                                    |
| ------- | ---------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------ |
| `rem`   | დამოკიდებულია root ელემენტის `font-size` თვისებაზე. თუ ზომა მითითებული არ არის მაშინ ნაგულისხმევად root-ის ზომა არის `16px`.             | 'ROOT_SIZE' \* 'მნიშვნელობა'               |
| `rem`   | დამოკიდებულია მშობელი ელემენტის `font-size` თვისებაზე. თუ მითითებული არ არის ფონტის ზომა მშობელ ელემენტზე, მაშინ იმუშავებს, როგორც `rem` | 'SIZE' \* 'მნიშვნელობა'                    |
| `vh`    | დამოკიდებულია ხედვის ფანჯრის (viewport) სიმაღლის 1%-ზე                                                                                   | 'VIEWPORT_HEIGHT' \* 0.01 \* 'მნიშვნელობა' |
| `vw`    | დამოკიდებულია ხედვის ფანჯრის (viewport) სიგანის 1%-ზე                                                                                    | 'VIEWPORT_WIDTH' \* 0.01 \* 'მნიშვნელობა'  |
| `%`     | დამოკიდებულია მშობელი ელემენტის შესაბამისი თვისების მნიშვნელობის პროცენტზე.                                                              | 'PARENT_VALUE' \* ('მნიშვნელობა' / 100)    |

:::info
მიუხედავად ბევრი ერთეულისა მეტწილადად გამოიყენება შემდგომი მნიშვნელობები: `px`, `rem`, `em`, `vw`.
:::

<iframe data-url="guides/html-css-text" data-search-params="style=font-size&data=%5B%2212px%22,%2218px%22,%22x-large%22,%222rem%22,%221.5em%22,%222rem%22,%224vw%22,%2260%25%22%5D" data-title="CSS ფონტის ზომის მაგალითი" data-height="580"></iframe>

### ფონტის სტილი, ფონტის სიმუქე, ტექსტის ტრანსოფრმაცია და ტექსტის დეკორაცია

<!-- სიმუქე თუ სისქე? -->

CSS-ში გვაქვს ოთხი ძირითადი თვისება, რომლებიც ტექსტის სტილს ცვლის.

[`font-style`](https://developer.mozilla.org/en-US/docs/Web/CSS/font-style): გამოიყენება ტექსტის დახრილი (italic) სტილის ჩასართავად ან გამორთვისთვის
(ამ თვისებას ძალიან იშვიათად გამოიყენებ თუ სპეციფიკურად არ გსურს ტექსტის დახრა):

- `normal`: ტექსტს აბრუნებს ნორმალურ ფორმაში (თიშავს italic-ს).
- `italic`: ტექსტს დახრის italic-ის სტილში.
- `oblique`: ტექსტს დახრის italic-ის მსგავსად ოღონდ მცირედი განსხვავებით.

<iframe data-url="guides/html-css-text" data-search-params="style=font-style&data=%5B%22normal%22,%22italic%22,%22oblique%22,%22oblique%2040deg%22%5D" data-title="CSS ფონტის სტილის მაგალითი" data-height="350"></iframe>

[`font-weight`](https://developer.mozilla.org/en-US/docs/Web/CSS/font-weight): განსაზღვრავს, რამდენად მუქია ტექსტი.
მას აქვს მრავალი შესაძლო მნიშვნელობა, განსაკუთრებით მაშინ, თუ ფონტს აქვს სხვადასხვა ვარიაციები (მაგალითად, `light`, `normal`, `bold`, `extrabold`, `black` და სხვა).
თუმცა, პრაქტიკაში ყველაზე ხშირად გამოიყენება `normal` და `bold`.

- `normal`, `bold`: ნორმალური და მუქი.
- `lighter`, `bolder`: აყენებს ელემენტის ტექსტის სიმუქეს ერთი დონით უფრო ღია (`lighter`) ან მუქ (`bolder`) ვარიანტში.
- `100` - `900`: რიცხობრივი მნიშვნელობა, რომელიც მნიშვნელობას მიანიჭებს.

<iframe data-url="guides/html-css-text" data-search-params="style=font-weight&data=%5B100,200,300,400,500,600,700,800,900%5D" data-title="CSS ფონტის სისქის მაგალითი" data-height="640"></iframe>

[`text-transform`](https://developer.mozilla.org/en-US/docs/Web/CSS/text-transform) საშუალებას გაძლევთ შეცვალოთ ტექსტის ფორმატი.

- `none`: არ ხდება ტექსტის ტრანსფორმაცია.
- `uppercase`: ყველა სიმბოლო გადადის მაღალ რეგისტრში.
- `lowercase`: ყველა სიმბოლო გადადის დაბალ რეგისტრში.
- `capitalise`: ყველა სიტყვის პირველი სიმბოლო გადადის მაღალ რეგისტრში.
- `full-width`: ყველა სიმბოლოს ჩასმა ხდება ფიქსირებულ ზომაში, რაც ჰგაქვს [`monospace`](#ფონტის_შეცვლა)-ის სტილს.
  მაგალითად: ლათინურ სიმბოლოებს ეძლევა შესაძლებლობა, სწორად მოთავსდნენ ჩინურ, იაპონურ, კორეულ და მსგავს ენებთან.
- `math-auto`: ტექსტი ავტომატურად იღებს [მათემატიკური italic](https://www.unicode.org/charts/PDF/U1D400.pdf) სტილს საჭირო ადგილებში.

<iframe data-url="guides/html-css-text" data-search-params="style=text-transform&data=%5B%22none%22,%22uppercase%22,%22lowercase%22,%22capitalize%22,%22full-width%22,%22math-auto%22%5D&text=LONDON.%20Michaelmas%20term%20lately%20over,%20and%20the%20Lord%20Chancellor%20sitting%20in%20Lincoln's%20Inn%20Hall.%0A%0A%CE%A3%20is%20a%20Greek%20letter%20and%20appears%20in%20%CE%9F%CE%94%CE%A5%CE%A3%CE%A3%CE%95%CE%A5%CE%A3.%20%CE%98%CE%B1%20%CF%80%CE%AC%CE%BC%CE%B5%20%CF%83%CF%84%CE%BF%20'%CE%98%CE%B5%CF%8A%CE%BA%CF%8C%20%CF%86%CE%B1%CE%90'%20%CE%AE%20%CF%83%CF%84%CE%B7%20'%CE%9D%CE%B5%CF%81%CE%AC%CE%B9%CE%B4%CE%B1'%0A%0A%E3%82%A1%E3%82%A3%E3%82%A5%E3%82%A7%20%E3%82%A9%E3%83%B5%E3%87%B0%E3%83%B6" data-title="CSS ფონტის ტრანსფორმაციის მაგალითი" data-height="440"></iframe>

:::info
`full-width` მუშაობს მხოლოდ შემდგომ ბრაუზერებში: [firefix](https://www.mozilla.org/en-US/firefox/new/), [safari](https://www.apple.com/safari/) და IOS WebView.
`math-auto` არ მუშაობს safari ბრაუზერში.
:::

[`text-decoration`](https://developer.mozilla.org/en-US/docs/Web/CSS/text-decoration) განსაზღვრავს ტექსტის დეკორაციას (მეტწილადად გამოიყენება ბმულის ელემენტთან).

- `none`: აუქმებს არსებულ დეკორაციებს.
- `underline`: ტექსტის ხაზგასმა.
- `overline`: ხაზის დამატება ტექსტის ზედა მხარეს.
- `line-through`: ტექსტის გადახაზვა.

გაითვალისწინეთ, რომ `text-decoration` ერთდროულად რამოდენიმე მნიშვნელობასაც ღებულობს, მაგალითად:

```css
a {
  text-decoration: underline overline;
}
```

ასევე `text-decoration` არის მოკლე თვისება, რომელიც მოიცავს [`text-decoration-line`](https://developer.mozilla.org/en-US/docs/Web/CSS/text-decoration-line), [`text-decoration-style`](https://developer.mozilla.org/en-US/docs/Web/CSS/text-decoration-style) და [`text-decoration-color`](https://developer.mozilla.org/en-US/docs/Web/CSS/text-decoration-color) თვისებას.
ამ კომბინაციებით შეგიძლიათ შექმნათ საინტერესო ეფექტები, მაგალითად:

```css
p {
  text-decoration: line-through red wavy;
}
```

<iframe data-url="guides/html-css-text" data-search-params="style=text-decoration&data=%5B%22none%22,%22underline%22,%22overline%22,%22line-through%22,%22line-through%20red%20wavy%22,%22underline%20overline%22%5D" data-title="CSS ფონტის დეკორაციის მაგალითი" data-height="490"></iframe>

## ტექსტი

ძირითადი ფონტის თვისებების განხილვის შემდეგ, გადავიდეთ იმ თვისებებზე, რომლებიც გამოიყენება ტექსტების გასასტილად.

### განლაგება

ტექსტის განლაგების შესაცვლელად გამოიყენება [`text-align`](https://developer.mozilla.org/en-US/docs/Web/CSS/text-align) თვისება.
ტექსტის გადაადგილება სრულდება მის არსებულ [ყუთის მოდელში](./doc/guides/html-css/box-model).

- `left`: ყოველთვის მარცხენა მხარეს მოთავსება.
- `start`: მსგავსია `left` თუმცა თუ `direction: rtl` არის მითითებული მოთავსდება საპირისპიროდ.
- `right`: ყოველთვის მარჯვენა მხარეს მოთავსება.
- `end`: მსგავსია `right` თუმცა თუ `direction: rtl` არის მითითებული მოთავსდება საპირისპიროდ.
- `center`: ყოველთვის ცენტრში მოთავსდება.
- `justify`: ყოველთვის ტექსტს ისე ანაწილებს, რომ ყველა ხაზი ერთნაირი სიგანის იყოს.

<iframe data-url="guides/html-css-text" data-search-params="style=text-align&showDirection=true&data=%5B%22left%22,%22start%22,%22right%22,%22end%22,%22center%22,%22justify%22%5D" data-title="CSS ტექსტის განლაგების მაგალითი" data-height="440"></iframe>

### ხაზის სიმაღლე

[`line-height`](https://developer.mozilla.org/en-US/docs/Web/CSS/line-height) თვისება გამოიყენება სიმაღლის დასაყენებლად ხაზებს შორის.
ამ თვისებას შეუძლია გამოიყენოს [ზოგადი ზომის](#ზომა) ერთეულები და დინამიური მნიშვნელობა.

```css
p {
  line-height: 1.6;
}
```

თუ მხოლოდ რიცხვს გადავცემთ მაშინ თვისება მიიღებს მნიშვნელობას შემდგომი ფორმულით:

```
font-size * line-height
```

:::info
რეკომენდირებულია `line-height` თვისებაზე 1.5-2 მდე მნიშვნელობის გადაცემა.
:::

<iframe data-url="guides/html-css-text" data-search-params="style=line-height&data=%5B1,1.2,1.4,1.6,1.8,2%5D" data-title="CSS line-height-ის მაგალითი" data-height="440"></iframe>

### სიმბოლოსა და სიტყვის დაშორება

[`letter-spacing`](https://developer.mozilla.org/en-US/docs/Web/CSS/letter-spacing) და [`word-spacing`](https://developer.mozilla.org/en-US/docs/Web/CSS/word-spacing) თვისებები
საშუალებას გაძლევთ განსაზღვროთ სიმბოლოსა და სიტყვებს შორის დაშორება ტექსტში. თვისებას შეიძლება მივანიჭოთ

<iframe data-url="guides/html-css-text" data-search-params="style=letter-spacing&data=%5B%220px%22,%225px%22,%2210px%22,%220.7rem%22,%221.2rem%22%5D" data-title="CSS სიმბოლოებს შორის დაშორების მაგალითი" data-height="400"></iframe>
<iframe data-url="guides/html-css-text" data-search-params="style=word-spacing&data=%5B%220px%22,%2216px%22,%2220px%22,%221.5rem%22,%222rem%22%5D" data-title="CSS სიტყვებს შორის დაშორების მაგალითი" data-height="400"></iframe>

### ფონტის shorthand

ფონტის შემოკლებული (shorthand) თვისება, რომელიც ერთდროულად რამდენიმე ფონტის მახასიათებელს აერთიანებს.

```css
p {
  font: italic small-caps bold 16px/1.5 sans-serif;
}
```

ეს კოდი აერთიანებს შემდგომ თვისებებს: [`font-style`](https://developer.mozilla.org/en-US/docs/Web/CSS/font-style),
[`font-variant`](https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant),
[`font-weight`](https://developer.mozilla.org/en-US/docs/Web/CSS/font-weight),
[`font-stretch`](https://developer.mozilla.org/en-US/docs/Web/CSS/font-stretch),
[`font-size`](https://developer.mozilla.org/en-US/docs/Web/CSS/font-size),
[`line-height`](https://developer.mozilla.org/en-US/docs/Web/CSS/line-height) და [`font-family`](https://developer.mozilla.org/en-US/docs/Web/CSS/font-family).

აუცილებელია `font-size` და `font-family`-ის თვისების დაწერა, როცა ვიყენებთ [`font`](https://developer.mozilla.org/en-US/docs/Web/CSS/font)-ის თვისებას დანარჩენი სურვილისამებრ.

დახრილი ხაზით <kbd>/</kbd> უდნა იყოს ჩასმული `font-size` და `line-height` თვისებას შორის.

`font` თვისების ჩაწერის თანმიმდევრობა:

```
font: [style] [variant] [weight] [size]/[line-height] [family];
```

## გამოცადე პრაქტიკაში

შეგიძლია შესწავლილი მასალა პრაქტიკაში გამოსცადო!

ისარგებლე სტატიაში ჩაშენებული მარტივი ედიტორით ან ცალკე [მზა ედიტორით](./playground/simple/blank), რომელსაც უფრო ბევრი ფუნქციონალური ნაწილი გააჩნია.

<iframe data-url="guides/html-css-live-example" data-title="HTML & CSS ედიტორი" data-height="720"></iframe>

## შეჯამება

ამ სტატიაში განვიხილეთ CSS-ის ტექსტისა და ფონტის დასტილვის თვისებები.

## გამოყენებული ლიტერატურა

- [Fundamental text and font styling](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Text_styling/Fundamentals)
