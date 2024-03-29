---
title: 'ცხრილები'
---

ამ სტატიაში გავეცნობით HTML-ის ცხრილებს და ვისწავლით როგორ ავაწყოთ გამართული ცხრილები
სათანადო სტრიქონებით, უჯრებით, სათაურებით და ა.შ. ჩვენ ასევე ვისწავლით ცხრილის ელემენტების მარტივად გასტილვას:
მათთვის ჩარჩოების დამატებასა და უკანა ფონის ფერების მინიჭებას.

## მარტივი ცხრილი

ცხრილის ელემენტი იქმნება [`<table>`]() თეგით, რომლის შიგნითაც განვსაზღვრავთ ცალკეულ სტრიქონებს
[`<tr>`]() ელემენტით და უჯრებს (სვეტების მიხედვით) [`<td>`]() ელემენტით.

```html
<h3>პირველი ცხრილი</h3>
<table>
  <!-- ვქმნით პირველ სტრიქონს -->
  <tr>
    <td>პირველი სტრიქონის პირველი უჯრა</td>
    <td>უჯრა 2</td>
    <td>ურა 3</td>
  </tr>
  <!-- ვქმნით მეორე სტრიქონს -->
  <tr>
    <td>მეორე სტრიქონის პირველი უჯრა</td>
    <td>უჯრა 2</td>
    <td>ურა 3</td>
  </tr>
</table>
```

პრობლემა ისაა, რომ განლაგების მხრივ შედეგი შეიძლება ცხრილს წააგავდეს,
მაგრამ გარეგნობის მხრივ ამას ცხრილის მთავარი ატრიბუტები აკლია: [ჩარჩოები]()!

## ჩარჩოები ცხრილზე

ჩვეულებრივ, ელემენტზე ჩარჩოების შესაქმნელად გვჭირდება შემდეგი თვისებები:

- `border-width`: ჩარჩოს სიგანე
- `border-style`: ჩარჩოს სტილი (მაგ. `solid`, `dotted`, `dashed` და ა.შ)
- `border-color`: ჩარჩოს ფერი

```css
td {
  border-width: 1px;
  border-style: solid;
  border-color: black;
}
```

შეგვიძლია ეს ყველაფერი `border` თვისებაშიც შევამოკლოთ, სადაც ყველა თვისებას ერთიმეორის მიყოლებით დავწერთ:

```css
td {
  padding: 8px; /* ცოტა თავისუფალი სივრცე ელემენტის კონტენტსა და ჩარჩოებს შორის*/
  border: 1px solid black;
}
```

პრობლემა ისაა, რომ ასე თითოეულ უჯრას თავისი ჩარჩოები აქვს, რომელიც გამიჯნულია სხვა უჯრების ჩარჩოებისგან.
არადა ჩვენ გვინდა, რომ ჩარჩოები უჯრებს საზიარო ჰქონდეთ, ანუ არა **განცალკევებული**, არამედ **ჩაშლილი**.
სწორედ ამიტომ `table` ელემენტს უნდა შევუცვალოთ თვისება `border-collapse` და ის დავაყენოთ `separate`-ის მაგივრად `collapsed`-ზე.

```css
table {
  border-collapse: collapse;
}
```

ახლა ჩვენი ცხრილი ცხრილს ჰგავს!

## ცხრილის სათაურები

ხშირ შემთხვევაში ცხრილში მონაცემები რაღაც მნიშვნელობების მიხედვითაა დაჯგუფებული.
მაგალითად კლასიკური მუსიკოსები გვინდა დავალაგოთ მათი სახელის, ქვეყნისა და მოღვაწეობის წლების მიხედვით.
მაშინ გვჭირდება ჯერ ამ კატეგორიების ჩამოწერა და მათთვის სწორი მონაცემების მისადაგება.
ამისთვის ვიყენებთ `th` ელემენტს (table head), ანუ ცხრილის **სათაურს**.

ცხრილის აწყობა დავიწყოთ სტრიქონით სადაც სათაურების მიხედვით იქნება სვეტები:

```html
<h3>კლასიკური კომპოზიტორები</h3>
<table>
  <tr>
    <th>სახელი</th>
    <th>ქვეყანა</th>
    <th>წლები</th>
  </tr>
</table>
```

თუ დავაკვირდებით ამ ელემენტებს ჩარჩოები არ აქვს!
სტილების ფაილში `td`-ს სელექტორს დავუმატოთ `th` რათა სტილები მასზეც გავრცელდეს:

```css
td,
th {
  padding: 8px; /* ცოტა თავისუფალი სივრცე ელემენტის კონტენტსა და ჩარჩოებს შორის*/
  border: 1px solid black;
}
```

ასე ჯობია. როგორც ხედავთ, `th` ელემენტის ტექსტი არის ბოლდი და ცენტრირებული,
რაც უფრო ამარტივებს მონაცემების მათთან მიმართებაში წაკითხვას.
ახლა ცალკეული სტრიქონი დავამატოთ უჯრებით, სადაც კომპოზიტორების მონაცემებს გამოვსახავთ:

```html
<h3>კლასიკური კომპოზიტორები</h3>
<table>
  <tr>
    <th>სახელი</th>
    <th>ქვეყანა</th>
    <th>წლები</th>
  </tr>
  <tr>
    <td>ბელა ბართოკი</td>
    <td>უნგრეთი</td>
    <td>1881-1945</td>
  </tr>
  <tr>
    <td>ოლივიე მესიანი</td>
    <td>საფრანგეთი</td>
    <td>1908-1992</td>
  </tr>
  <tr>
    <td>ალფრედ შნიტკე</td>
    <td>რუსეთი</td>
    <td>1934-1998</td>
  </tr>
</table>
```

## ცხრილის სემანტიკური ელემენტები

ვიზუალურად ცხრილი გამართულია, თუმცა შინაარსობრივად მისი დახვეწა გვჭირდება.
რათა ჩვენი ცხრილი უფრო მარტივად ხელმისაწვდომი იყოს სერჩ ენჯინებისა და
შ.შ.მ პირებისთვის, უმჯობესი იქნება თუ მკაფიოდ განვსაზღვრავთ ცხრილის რა ნაწილს რა დანიშნულება აქვს.
ამისათვის არსებობს სპეციალური ელემენტები, სადაც სტრიქონების განთავსება შეგვიძლია:

- `thead`: ცხრილის სათაური
- `tbody`: ცხრილის სხეული
- `tfoot`: ცხრილის ქვესართი (სქოლიო)

ჩვენი კომპოზიტორების ცხრილს შემთხვევაში ხემანტიკური ელემენტებს ასე გამოვიყენებდით:

```html
<table>
  <thead>
    <tr>
      <th>სახელი</th>
      <th>ქვეყანა</th>
      <th>წლები</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>ბელა ბართოკი</td>
      <td>უნგრეთი</td>
      <td>1881-1945</td>
    </tr>
    <tr>
      <td>ოლივიე მესიანი</td>
      <td>საფრანგეთი</td>
      <td>1908-1992</td>
    </tr>
    <tr>
      <td>ალფრედ შნიტკე</td>
      <td>რუსეთი</td>
      <td>1934-1998</td>
    </tr>
  </tbody>
</table>
```

ვიზუალურად შეიძლება არაფერი შეცვლილა, მაგრამ
სერჩ ენჯინებისთვისა და შ.მ.მ პირების დამხმარე მოწყობილობებისთვის ახლა მკაფიოა,
რომ `სახელი`, `გვარი`, და `ქვეყანა` წარმოადგენს სათაურის ნაწილს,
ხოლო კომპოზიტორთა მონაცემების ჩამონათვალი -- ცხრილის სხეულს.

შეგვიძლია სილამაზისთვის ცხრილის სათაურსა და სხეულს განსხვავებული ფერები მივცეთ:

```css
thead {
  background-color: rgb(55, 89, 161);
  color: white;
}

tbody {
  background-color: rgb(240, 240, 240);
}
```

აქვე `tbody`-ს დახურვის შემდეგ დავამატოთ `tfoot` ელემენტი, სადაც პირობითად აღვწერთ მონაცემების წყაროსა და საავტორო უფლებებს:

```html
<tfoot>
  <tr>
    <td colspan="3">
      &copy Wikipedia
      <a href="https://en.wikipedia.org/wiki/Wikipedia:Text_of_the_Creative_Commons_Attribution-ShareAlike_4.0_International_License">CC BY-SA</a>
    </td>
  </tr>
</tfoot>
```

`td` ელემენტზე ატრიბუტი `colspan` განსაზღვრავს რამდენი სვეტი უნდა დაიკავოს ელემენტმა.
ეს მოხერხებული ხელსაწყოა როცა ერთი უჯრა რამდენიმე სვეტს უნდა გადასწვდეს.
ჩვენ მივუთითეთ, რომ მან 3 სვეტი უნდა დაიკავოს.

გავსტილოთ `tfoot`:

```css
tfoot {
  text-align: center;
  background-color: rgb(219, 219, 219);
}
```

და ასე ჩვენი ცხრილი კარგადაც გამოიყურება და სემანტიკურადაც გამართულია!

## შეჯამება

ამ თავში ჩვენ ვისწავლეთ ცხრილებთან მუშაობის მარტივი ხერხები: ცხრილის სტრიქონებისა და უჯრების აგება,
ცხრილის სათაურების ელემენტის გამოყენება,
ცხრილის გასტილვა ჩარჩოებითა და უკანა ფონით და ცხრილის სემანტიკურად გამართვა განსაკუთრებული ელემენტებით.
