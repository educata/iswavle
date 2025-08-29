---
title: 'Grid'
description: 'Grid-ის გამოყენება CSS-ში'
keywords: 'grid, გრიდი, გრიდის საფუძვლები'
---

[Grid განლაგება](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout)
CSS-ში ორმხრივ (ორი განზომილებიან) უჯრების სისტემას წარმოადგენს. Grid-ის გამოყენება შესაძლებელია,
როგორც ვებგვერდის ძირითადი სექციების განლაგებისთვის, ისე მცირე ელემენტების განაწილებისთვის.

## რა არის grid?

Grid ეს არის ჰორიზონტალური და ვერტიკალური ხაზების გადაკვეთის ერთობლიობა, რომელიც ქმნის
მწკრივებსა (row) და სვეტებს (column). ელემენტების განთავსება grid-ზე შესაძლებელია სწორედ ამ სვეტებისა და სტრიქონების
ხაზებს შორის. CSS Grid განლაგებას აქვს შემდეგი მახასიათებლები:

### ფიქსირებული და მოქნილი ზომის ბილიკები

გრიდის შექმნა შესაძლებელია ფიქსირებული ზომის ბილიკებით, მაგალითად პიქსელების გამოყენებით.
ამ შემთხვევაში უჯრები განისაზღვრება კონკრეტული პიქსელებით, რაც საშუალებას გვაძლევს, ზუსტად მოვარგოთ იგი სასურველ განლაგებას.
ასევე, შესაძლებელია, გრიდის შექმნა მოქნილი (დინამიური) ზომებით, კერძოდ ფრაქციული მნიშვნელობის (`fr`) გამოყენებით.

### ელემენტების განთავსება

გრიდზე ელემენტების ზუსტად განსაზღვრულ ადგილას განთავსება შესაძლებელია ხაზების ნომრების,
სახელების გამოყენებით ან ბადის კონკრეტული მონაკვეთის მიჩენით. Grid ასევე შეიცავს ალგორითმს,
რომელიც ავტომატურად განსაზღვრავს იმ ელემენტების განლაგებას, რომლისთვისაც კონკრეტული პოზიცია მითითებული არ არის.

### გასწორების კონტროლი

გრიდში შესაძლებელია [CSS box განლაგების](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_box_alignment) სტილების გამოყენება.
ეს სტილები იგივეა, რაც [flexbox](./doc/guides/html-css/flexbox)-ის სტატიაში განვიხილეთ (`align-content`, `align-items` და სხვა).

## გრიდის კონტეინერი

Grid კონტეინერის შესაქმნელად შეიძლება გამოვიყენოთ `display: grid` ან `display: inline-grid` სტილები. `inline-grid` განთავსდება, როგორც `inline`
ელემენტი, ხოლო `grid` - როგორც ბლოკური ელემენტი. როგორც კი ამ თვისებას მივანიჭებთ მშობელ ელემენტს, მისი შვილობილი ელემენტები გახდება გრიდის ელემენტები.

მაგალითისთვის შევქმნათ მშობელი ელემენტი `.box-wrapper` კლასით.

```html preview
<div class="box-wrapper">
  <div class="box">ერთი</div>
  <div class="box">ორი</div>
  <div class="box">სამი</div>
  <div class="box">ოთხი</div>
  <div class="box">ხუთი</div>
</div>
```

```css preview
.box-wrapper {
  display: grid;
}
```

```js
console.log('preview');
```

მასში არსებული პირველი დონის შვილობილი ელემენტები იქცნენ გრიდის ელემენტებად.
თითქმის ყველა თანამედროვე ბრაუზერში შეიძლება ფლექსბოქსისა და გრიდის განლაგების ტექნიკური ვიზუალიზაცია.
გახსენით ინსპექტი და მონიშნეთ გრიდის ელემენტთან არსებული ჩარჩო (ელემენტების მხარეს).

![გრიდის ელემენტის ინსპექტში მონიშვნის მაგალითი](./assets/images/grid-select-chip-inspect.png)

## გრიდის ბილიკები

გრიდზე მწკრივები და სვეტები განისაზღვრება [`grid-template-rows`](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-rows)
და [`grid-template-columns`](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-columns) თვისებებით. ამ თვისებები გამოყენებით
ვღებულობთ გრიდის ბილიკებს (tracks).

### მარტივი მაგალითი

შეგვიძლია ჩვენ წინა მაგალითს დავუმატოთ `grid-template-columns` თვისება და განვსაზღვროთ სვეტის ბილიკების ზომები.
ასე შევქმენით `grid`, რომელიც შეიცავს სამ ორასპიქსელიან სვეტურ ბილიკს. შვილობილი ელემენტები განთავსდება
`grid`-ის თითოეულ უჯრაში: თითო ელემენტი თითო უჯრაში.

```html preview
<div class="box-wrapper">
  <div class="box">ერთი</div>
  <div class="box">ორი</div>
  <div class="box">სამი</div>
  <div class="box">ოთხი</div>
  <div class="box">ხუთი</div>
</div>
```

```css preview
.box-wrapper {
  display: grid;
  grid-template-columns: 200px 200px 200px;
}
```

### fr მნიშვნელობა

ბილიკების განსაზღვრა შესაძლებელია ნებისმიერი ზომის ერთეულით. გრიდი ასევე გვთავაზობს დამატებითი სიგრძის ერთეულს,
რომელიც საშუალებას გვაძლევს, შევქმნათ მოქნილი გრიდის ბილიკები. `fr` (fraction) წარმოადგენს გრიდის კონტეინერში ხელმისაწვდომი სივრცის ფრაქციას.

მოდით თანაბრად განვათავსოთ გრიდის 3 ელემენტი ერთ ხაზში.

```html preview
<div class="box-wrapper">
  <div class="box">ერთი</div>
  <div class="box">ორი</div>
  <div class="box">სამი</div>
  <div class="box">ოთხი</div>
  <div class="box">ხუთი</div>
</div>
```

```css preview
.box-wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}
```

`fr`-ის გამოყენებით, მივიღეთ პროპორციულად განაწილებული ელემენტები. შეგვეძლო `fr`-ის ნაცვლად
`%`-ის გამოყენებაც, რომელიც მშობლის ზომიდან გამომდინარე მიიღებდა მნიშვნელობას თუმცა `%`-ის დროს
არ არის გათვალისწინებული დაშორებები (`gap`), შიდა და გარე დაშორებები (`padding` და `margin`).
`fr`-ში კი ყოველი დაშორება დაანგარიშებულია, ხოლო შემდეგ განაწილებულია პროპორციულად.

`1`-ის ნაცვლად შეგვიძლია გამოვიყენოთ სხვა ნებისმიერი დადებითი რიცხვი:

```html preview
<div class="box-wrapper">
  <div class="box">ერთი</div>
  <div class="box">ორი</div>
  <div class="box">სამი</div>
  <div class="box">ოთხი</div>
  <div class="box">ხუთი</div>
</div>
```

```css preview
.box-wrapper {
  display: grid;
  grid-template-columns: 1.5fr 2fr 1fr;
}
```

ასე პირველმა ელემენტმა მიიღო `1.5` ნაწილი, მეორემ `2` ხოლო მესამემ `1`.
ანუ მათ ზომებს შორის თანაფარდობაა 1.5:2:1.

თუ გვსურს პროცენტულად დაანგარიშება, მაშინ მივიღებთ:

- მთლიანად 4.5 ფრაქცია (`1.5 + 2 + 1`)
- პირველმა სვეტმა მიიღო 33.33% (`1.5/4.5 * 100`)
- მეორე სვეტმა მიიღო 44.44% (`2/4.5 * 100`)
- მესამე სვეტმა მიიღო 22.22% (`1/4.5 * 100`)

ასევე, შეგვიძლია ფრაქციასთან ერთად სხვა მნიშვნელობების გამოყენებაც.
მაგალითად გვსურს, რომ პირველი სვეტი ყოველთვის `100px` იყოს ხოლო დანარჩენი სვეტები თანაბრად გადანაწილდეს.

```html preview
<div class="box-wrapper">
  <div class="box">ერთი</div>
  <div class="box">ორი</div>
  <div class="box">სამი</div>
  <div class="box">ოთხი</div>
  <div class="box">ხუთი</div>
</div>
```

```css preview
.box-wrapper {
  display: grid;
  grid-template-columns: 100px 1fr 1fr;
}
```

### განმეორებადი მნიშვნელობები

როცა მინიჭებლი მნიშვნელობები მეორდება, შეგვიძლია გამოვიყენოთ [`repeat()`](https://developer.mozilla.org/en-US/docs/Web/CSS/repeat) თვისება:

```html preview
<div class="box-wrapper">
  <div class="box">ერთი</div>
  <div class="box">ორი</div>
  <div class="box">სამი</div>
  <div class="box">ოთხი</div>
  <div class="box">ხუთი</div>
</div>
```

```css preview
.box-wrapper {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}
```

ეს იგივეა, რაც `grid-template-columns: 1fr 1fr 1fr`, ოღონდ უფრო მოკლედ.

შეგვიძლია `repeat` სხვა მნიშვნელობებთან ერთადაც გამოვიყენოთ, მაგალითად:

```html preview
<div class="box-wrapper">
  <div class="box">ერთი</div>
  <div class="box">ორი</div>
  <div class="box">სამი</div>
  <div class="box">ოთხი</div>
  <div class="box">ხუთი</div>
</div>
```

```css preview
.box-wrapper {
  display: grid;
  grid-template-columns: 100px repeat(2, 1fr);
}
```

ეს იგივეა, რაც: `grid-template-columns: 100px 1fr 1fr`

### იმპლიციტური და ექსპლიციტური გრიდები

როცა ჩვენს მაგალითში გრიდს ვქმნიდით, სვეტების ბილიკები კონკრეტულად დავწერეთ
`grid-template-columns`-ის გამოყენებით, ხოლო გრიდმა მწკრივები თავად შექმნა იმდენი, რამდენიც სჭირდებოდა.
სვეტები ქმნიან ექსპლიციტურ გრიდს, ხოლო მწკრივები, რომლებიც ავტომატურად შეიქმნა, ეკუთვნის იმპლიციტურ გრიდს.

ექსპლიციტური გრიდი შედგება მწკრივებისა და სვეტებისგან, რომლებიც განსაზღვრულია `grid-template-columns`-ისა და
`grid-template-rows`-ის მეშვეობით. იმპლიციტური გრიდი კი განავრცობს ექსპლიციტურს იმ შემთხვევში, თუ
კონტენტი მის ფარგლებს სცდება, მაგალითად დამატებითი მწკრივების გაჩენით.

შეგიძლიათ წინასწარ განსაზღვროთ იმპლიციტურ გრიდში შექმნილი ბილიკების ზომა `grid-auto-rows`-სა და `grid-auto-columns`-ის
გამოყენებით.

განვიხილოთ იმპლიციტურ გრიდში ბილიკების ზომა `200px`-ზე:

```html preview
<div class="box-wrapper">
  <div class="box">ერთი</div>
  <div class="box">ორი</div>
  <div class="box">სამი</div>
  <div class="box">ოთხი</div>
  <div class="box">ხუთი</div>
</div>
```

```css prview
.box-wrapper {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: 200px;
}
```

## გრიდის ხაზები

აუცილებელია აღვნიშნოთ, რომ როცა გრიდს ვქმნით, ვადგენთ ბილიკებს (tracks) და არა ხაზებს.
ხაზების ნუმერაცია ხდება გრიდის მიერ ავტომატურად, რაც გვაძლევს საშუალებას, კონკრეტულ ადგილას მოვათავსოთ
სხვადასხვა ელემენტები.

მაგალითად, როცა გვაქვს სამი სვეტი და ორი მწკრივი, ასეთ გრიდს ექნება **ოთხი სვეტის ხაზი**.

![grid-lines.png](./assets/images/grid-lines.png)

ხაზების ნუმერაცია იწყება დოკუმენტის წერის რეჟიმის მიხედვით. თუ გვაქვს LTR (Left to Right) მიმართულება, მაშინ
ნომერი 1 ხაზი იქნება მარცხენა მხარეს, ხოლო RTL-ის შემთხვევაში - მარჯვენა მხარეს. ხაზებს ასევე შესაძლებელია დავარქვათ სახელები.

### ელემენტის პოზიცირება ხაზების მიხედვით

ელემენტის პოზიცირება შესაძლებელია გრიდის ელემენტებზე შემდეგი თვისებების მინიჭებით:

- [`grid-column-start`](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-column-start) - განსაზღვრავს, თუ რომელი **სვეტის ხაზიდან** უნდა დაიწყოს ელემენტი.
- [`grid-column-end`](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-column-end) - მიუთითებს, **სად მთავრდება** ელემენტი სვეტის მიმართულებით (რომელ ხაზზე უნდა შეწყდეს).
- [`grid-row-start`](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-row-start) - განსაზღვრავს, თუ რომელი **მწკრივის ხაზიდან** უნდა დაიწყოს ელემენტი.
- [`grid-row-end`](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-row-end) - მიუთითებს, **სად მთავრდება** ელემენტი მწკრივის მიმართულებით (რომელ ხაზზე უნდა შეწყდეს).

მოდით, გამოვიყენოთ ეს თვისებები:

```html
<div class="box-wrapper">
  <div class="box">ერთი</div>
  <div class="box">ორი</div>
  <div class="box">სამი</div>
  <div class="box">ოთხი</div>
  <div class="box">ხუთი</div>
</div>
```

```css
.box-wrapper {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: 100px;
}

.box-wrapper .box:nth-child(1) {
  grid-column-start: 1;
  grid-column-end: 4;
  grid-row-start: 1;
  grid-row-end: 3;
}

.box-wrapper .box:nth-child(2) {
  grid-column-start: 1;
  grid-row-start: 3;
  grid-row-end: 5;
}
```

პირველი ელემენტი იწყება სვეტის პირველ ხაზზე და გადაჭიმულია სვეტის მე-4 ხაზამდე, რაც ამ შემთხვევაში grid-ის უკიდურესი მარჯვენა ხაზია.
მწკრივის მხრივ, ის იწყება პირველ ხაზზე და მთავრდება მე-3 ხაზზე, რაც ნიშნავს, რომ იგი ორ მწკრივს ფარავს.

მეორე ელემენტი იწყება სვეტის პირველ ხაზზე და იკავებს მხოლოდ ერთ ბილიკს, ეს ნაგულისხმევია და ამიტომ დასრულების ხაზის მითითება საჭირო არ არის.
ის ასევე იკავებს ორ მწკრივს: მწკრივის მე-3 ხაზიდან, მე-5 ხაზამდე. დანარჩენი ელემენტები ავტომატურად განთავსდებიან grid-ის თავისუფალ ადგილებში.

### ელემენტის პოზიცირების შემოკლებული ჩაწერა

ზემოთ გამოყენებული მნიშვნელობების შემოკლება შეგვიძლია
[`grid-column`](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-column) და
[`grid-row`](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-row) თვისებების გამოყენებით.

წინა მაგალითი შეგვიძლია ჩავწეროთ შემდეგნაირად:

```css
.box-wrapper {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: 100px;
}

.box-wrapper .box:nth-child(1) {
  grid-column: 1 / 4;
  grid-row: 1 / 3;
}

.box-wrapper .box:nth-child(2) {
  grid-column: 1;
  grid-row: 3 / 5;
}
```

## დაშორებები

ფლექსის მსგავსად, გრიდსაც გააჩნია დაშორებების თვისება:

- [`row-gap`](https://developer.mozilla.org/en-US/docs/Web/CSS/row-gap) - განსაზღვრავს დაშორებას მწკრივებს შორის (ვერტიკალურად).
- [`column-gap`](https://developer.mozilla.org/en-US/docs/Web/CSS/column-gap) - განსაზღვრავს დაშორებას სვეტებს შორის (ჰორიზონტალურად).
- [`gap`](https://developer.mozilla.org/en-US/docs/Web/CSS/gap) - არის შეკვეცილი ფორმა, რომელიც ერთდროულად განსაზღვრავს როგორც `row-gap`-ს, ასევე `column-gap`-ს.

შეგიძლიათ მიღებული ცოდნა გამოსცადოთ პრაქტიკაში:

- [Grid Garden](https://cssgridgarden.com/)
- [Grid Attack](https://codingfantasy.com/games/css-grid-attack)

## შეჯამება

ამ სტატიაში განვიხილეთ გრიდის საფუძვლები, რომლითაც ვებგვერდზე შეგვიძლია კონტენტი მოქნილად განვალაგოთ ორგანზომილებიან სიბრტყეზე.

## გამოყენებული ლიტერატურა

- [MDN Grid](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout/Basic_concepts_of_grid_layout)
