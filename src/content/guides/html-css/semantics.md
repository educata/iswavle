---
title: 'სემანტიკური ელემენტები'
description: 'სემანტიკური ელემენტების გამოყენება HTML-ში'
keywords: 'სემანტიკური ელემენტები, სემანტიკური, h1, h2, h3, h4, h5, h6, p, blockquote, cite, strong, em, mark, abbr, dfn, time, code, pre'
---

სემანტიკური ელემენტი არის HTML-ის ისეთი ელემენტი, რომელიც ასახავს მის შინაარსობრივ მნიშვნელობას და არა მხოლოდ ვიზუალურ სტრუქტურას.

## რაში გვჭირდება სემანტიკური ელემენტები?

მომხარებლისთვის არანაირი მნიშვნელობა არ აქვს თუ როგორი ელემენტებით ავაწყობთ ვებგვერდს, მაგრამ მომხარებლის გარდა ვებგვერდს ესტუმრება [crawler](https://developer.mozilla.org/en-US/docs/Glossary/Crawler) (ბოტი / პროგრამა, რომელიც ვებგვერდიდან წამოიღებს სხვადასხვა ინფორმაციებს) და დეველოპერი. ბოტმა უნდა მოიპოვოს ვებგვერდიდან სხვადასხვა კონტენტი, რომ შემდეგ სწორად
მოახერხოს ვებგვერდის ინდექსაცია.

ინდექსაცია ეს არის პროცესი, როცა ბოტი აფასებს ჩვენს ვებგვერდს კონტენტიდან გამომდინარე. ეს შეფასება შემდგომ აისახება საძიებო სისტემებზე,
იგივე SE (Search Engine). კონტენტის არჩევას და სხვადასხვა დამატებით დეტალებს, მეტწილად SEO დეველოპერი განსაზღვრავს.
თუმცა SEO დეველოპერის მოწოდებული კონტენტი, კლიენტმა სწორად უნდა გამოიტანოს ვიზუალზე, შესაბამისი თეგებით, რაშიც გვეხმარება **სემანტიკური** თეგები.

სემანტიკური თეგები ასევე გვეხმარება Accebility-ის (a11y) გაუმჯობესებაში. a11y გულისხმობს ისეთი ვებგვერდის შექმნას, რომელიც ყველასათვის მარტივი და ხელმისაწვდომია,
მათ შორის შეზღუდული შესაძლებლობების მქონე პირებისთვის. ბრაუზერში შეგვიძლია დავაინსტალიროთ სხვადასხვა აპლიკაცია ან ექსტენშენი, რომელიც დაეხმარება მომხარებელს
ვებგვერდის შინაარსის აღქმაში, მაგალითად:

- ეკრანის წამკითხველი (screen reader).
- ფერების კონტრასტის შემცვლელი.
- კლავიატურით ნავიგაცია.
- და სხვა.

:::info
Accebility-ის გამოყენება დეტალურად ახსნილია [a11y-ის სტატიაში](./doc/guides/html-css/a11y).
:::

<!-- TODO: დაწერე ბრაუზერში გამოყენებაზე, არ მახსენდება კონკრეტული მაგალითი :დ -->

სემანტიკურად გამართულ კოდზე მუშაობაც უფრო მარტივია.

## რომელია სემანტიკური ელემენტი?

მაგალითად სემანტიკური ელემენტები:

- [`<p>`](./doc/guides/html-css/introduction#პარაგრაფები) პარაგრაფი, რომელიც გამოხატავს ტექსტის ნაწილს.
- [`<h1>` - <h6>](./doc/guides/html-css/introduction#სათაურები) სათაური, რომელიც აჩვენებს ტექსტის მნიშვნელობას.
- [`<table>`](./doc/guides/html-css/table) ცხრილი, რომელიც განსაზღვრავს სტრუქტურირებულ მონაცემებს.
- [`<ul>`](./doc/guides/html-css/introduction#სიები) - უწესრიგო (unordered) სია, რომელიც განსაზღვრავს ელემენტთა ჯგუფს.
- [`<ol>`](./doc/guides/html-css/introduction#სიები) - დალაგებული (ordered) სია, სადაც ელემენტებს აქვს კონკრეტული თანმიმდევრობა.
- [`<a>`](./doc/guides/html-css/introduction#ბმულები) - ბმული, რომელიც აერთიანებს ვებსაიტების სხვადასხვა ნაწილებს.
- [`<img>`](./doc/guides/html-css/introduction#სურათები) - გამოსახულების გამოტანა (სურათი, გიფ და სხვა).

მაგალითად არასემანტიკური ელემენტები:

- [`<span>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/span) ტექსტური ინლაინ კონტეინერი, რომელსაც არ აქვს კონკრეტული შინაარსობრივი მნიშვნელობა (ასევე `i`, `b` და მსგავსი თეგები).
- [`<hr>`](./doc/guides/html-css/introduction#HTML_ელემენტის_ანატომია) ჰორიზონტალური ხაზი, რომელიც მხოლოდ ვიზუალურად გამოიყენება.
- [`<br>`](./doc/guides/html-css/introduction#HTML_ელემენტის_ანატომია) ხაზის გადასატანად (break line).

## სტრუქტურული სემანტიკური ელემენტები

უკეთესი წარმოდგენა რომ შევიქმნათ, განვიხილოთ შემდგომი მაგალითები:

### header

[`<header>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/header) - განსაზღვრავს გვერდის ან სექციის სათავე.

```html
<header>
  <a href="https://iswavle.com">Iswavle</a>
  <ul>
    <li>
      <a href="./index.html">მთავარი</a>
    </li>
    <li>
      <a href="./playground.html">ედიტორი</a>
    </li>
    <li>
      <a href="./doc.html">გზამკლევი</a>
    </li>
  </ul>
</header>
```

ამ შემთხვევაში აღვწერეთ Iswavle-ს მსგავსი სათავე სექცია, მაგრამ მაინც გაუგებარი იქნება თუ რა არის ეს სიის ელემენტები.
უფრო მეტად გასაგები რომ იყოს, შეგვიძლია გამოვიყენოთ ნავიგაციის კონტეინერი. ეს მკაფიოდ განსაზღვრავს, რომ მოცემული
სიის დანიშნულება არის ნავიგაცია.

### nav

[`<nav>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/nav) - განსაზღვრავს ნავიგაციის მენიუს.

```html
<header>
  <a href="https://iswavle.com">Iswavle</a>
  <nav>
    <ul>
      <li>
        <a href="./index.html">მთავარი</a>
      </li>
      <li>
        <a href="./playground.html">ედიტორი</a>
      </li>
      <li>
        <a href="./doc.html">გზამკლევი</a>
      </li>
    </ul>
  </nav>
</header>
```

რადგან ჩვენ მკაფიოდ განვსაზღვრეთ სათავის ამ ნაწილის დანიშნულება, მას არამხოლოდ მომხარებელი გაიგებს
არამედ ბრაუზერი, a11y პროგრამრები და ბოტები!

### main

[`main`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/main) - განსაზღვრავს ვებგვედის მთავარ კონტენტს.

```html
<header>
  <!-- ჰედერის კოდი ... -->
</header>
<main>
  <h1>ისწავლე</h1>
  <h2>Web ტექნოლოგიები დამოუკიდებლად</h2>
  <p>ვებგვერდის სტრუქტურა და სტილიზაცია</p>
</main>
```

ახლა უფრო გასაგებია სად არის მთავარი კონტენტი, თუმცა შეგვიძლია უფრო დავუზუსტოთ სექციები.

### section

[`section`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/section) - განსაზღვრავს გვერდის ცალკეულ სექციას.

```html
<main>
  <section class="banner">
    <h1>ისწავლე</h1>
    <h2>Web ტექნოლოგიები დამოუკიდებლად</h2>
  </section>
  <section class="showcase">
    <p>ვებგვერდის სტრუქტურა და სტილიზაცია</p>
  </section>
</main>
```

ერთგვერდზე ცალკეული სექციები შეიძლება იყოს:

- ბანერი
- საჩვენებელი ნაწილი
- საკონტაქტო ინფორმაცია
- ფორმა
- და სხვა

### aside

[`aside`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/aside) - განსაზღვრავს გვერდითა ინფორმაციას.

```html
<main>
  <aside>
    <nav>
      <ul>
        <li>
          <a href="./index.html">მთავარი</a>
        </li>
        <li>
          <a href="./playground.html">ედიტორი</a>
        </li>
        <li>
          <a href="./doc.html">გზამკლევი</a>
        </li>
      </ul>
    </nav>
  </aside>
  <section class="banner">
    <h1>ისწავლე</h1>
    <h2>Web ტექნოლოგიები დამოუკიდებლად</h2>
  </section>
</main>
```

ასე მივიღეთ მარცხენა მხარეს ნავიგაცის მენიუ და მარჯვენა მხარეს მთავარი კონტენტი.

### article

[`article`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/article) - განსაზღვრავს სტატიის კონტეინერს.

```html
<main>
  <!-- წინა მაგალითის კოდი -->
  </aside>
  <section class="banner">
    <h1>ისწავლე</h1>
    <h2>Web ტექნოლოგიები დამოუკიდებლად</h2>
  </section>
  <article>
    <h3>HTML & CSS</h3>
    <h4>ვებგვერდის სტრუქტურა და სტილიზაცია</h4>
    <img src="/assets/images/html-css.png" alt="HTML & CSS ლოგო" />
    <p>...</p>
  </article>
</main>
```

### footer

[`footer`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/footer) - განსაზღვრავს გვერდის ან სექციის სქოლიო ნაწილს.

```html
<main>
  <!-- ... წინა მაგალითის კოდი -->
  </article>
  <footer>
    © 2025 Educata
  </footer>
</main>
```

## div

[`div`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/div) - არის **არასემანტიკური** კონტეინერი, რომელიც ხშირად გამოიყენება
სხვადასხვა კონტენტის შესაკრავად.

```html
<div>
  <h3>HTML & CSS</h3>
  <h4>ვებგვერდის სტრუქტურა და სტილიზაცია</h4>
</div>
```

`div` ძირითადად გამოიყენება ვიზუალური ბლოკების გამოსაყოფად და სტილების მისანიჭებლად.

## ტექსტური სემანტიკური ელემენტები

| თეგის დასახელება                                                                       | დანიშნულება                                       |
| -------------------------------------------------------------------------------------- | ------------------------------------------------- |
| [`<h1>` - `<h6>`](./doc/guides/html-css/introduction#სათაურები)                        | სათაურები                                         |
| [`<p>`](./doc/guides/html-css/introduction#პარაგრაფები)                                | პარაგრაფი                                         |
| [`<blockquote>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/blockquote) | ციტატა                                            |
| [`cite`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/cite)               | ციტირების ან წყაროს აღსაწერად                     |
| [`strong`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/strong)           | ხაზგასმული ტექსტი (მნიშვნელოვანია შინაარსობრივად) |
| [`em`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/em)                   | დახრილი ტექსტი (აქცენტის ელემენტი)                |
| [`mark`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/mark)               | ტექსტის მონიშვნისთვის                             |
| [`<abbr>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/abbr)             | აბრევიატურა ან აკრონიმის გამოტანა                 |
| [`<dfn>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dfn)               | ტერმინის ან განსაზღვრების აღსანიშნავად            |
| [`<time>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/time)             | თარიღებისა და დროის გამოტანა                      |
| [`<code>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/code)             | პროგრამული კოდის გამოტანა                         |
| [`<pre>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/pre)               | წინასწარ ფორმატირებული ტექსტის გამოჩენისთვის      |

:::info
`cite` ატრიბუტის გამოყენება შეიძლება ასევე `blockquote`-თან ერთად.
:::

:::preview
<h6>(h6) ყველაზე პატარა სათაური</h6>
<p>(p) ჩვეულებრივი პარაგრაფი</p>
<blockquote cite="https://www.sas.upenn.edu/~cavitch/pdf-library/Freud_SE_Ego_Id_complete.pdf">
  (blockquote) Often a rider, if he is not to be parted from his horse, is obliged to guide it where it wants to go
</blockquote>
<p>
  (cite) Often a rider, if he is not to be parted from his horse, is obliged to guide it where it wants to go.
  <cite>Author Sigmund Freud</cite>
</p>
<p>(strong) ეს ტექსტი <strong>მნიშვნელოვანია</strong></p>
<p>(em) ეს ტექსტი <em>მნიშვნელოვანია</em></p>
<p>(mark) ეს ტექსტი <mark>მნიშვნელოვანია</mark></p>
<p>
  (abbr) <abbr title="Cascading Style Sheets">CSS</abbr> გამოიყენება ვებ-გვერდების გასაფორმებლად.
</p>
<p>
  (dfn) <dfn>HTML</dfn> არის ჰიპერტექსტური ნიშნების ენა, რომელიც გამოიყენება ვებ-გვერდების სტრუქტურის შესაქმნელად.
</p>
<p>(time) ეს სტატია დაწერილია <time datetime="2025-03-12">12 მარტს 2025-ში</time></p>
<p>(code) ეს არის კოდის მაგალითი: <code>console.log("Hello, world!");</code></p>
<pre>
  (pre)
  <h6>ყველაზე პატარა სათაური</h6>
</pre>
:::

### რატომ არის `strong` ან `em` სემანტიკური ელემენტი და `b` ან `i` არა?

- `<strong>` გამოიყენება მნიშვნელოვანი ტექსტის აღსანიშნავად, რაც ეკრანის ამკითხველს აძლევს საშუალებას, ტექსტი უფრო მკაფიოდ და ხაზგასმით წაიკითხოს.
- `<em>` ნიშნავს აქცენტს, რაც ჩვეულებრივ ხმოვანი ინტონაციით გამოიხატება, თუ ეკრანის ამკითხველს ვიყენებთ.
- `<b>` (Bold) – უბრალოდ მუქად აჩენს ტექსტს, შინაარსობრივი მნიშვნელობის გარეშე.
- `<i>` (Italic) – ტექსტს დახრილ ფორმატში აჩვენებს, თუმცა არა სემანტიკური მიზეზით, არამედ მხოლოდ ვიზუალური ეფექტისთვის.

რადგან `strong` და `em`-ს ვიზუალური დანიშნულების გარდა გააჩნიათ ფუნქციონალური გამოყენება, ამის გამო არიან სემანტიკური ელემენტები.

## სხვა სემანტიკური ელემენტები

კიდევ ბევრი სემანტიკური ელემენტი არსებობს, რომლებსაც სხვადასხვა სტატიებში განვიხილავთ:

- [მედია ელემენტები](./doc/guides/html-css/media)
- [ფორმის ელემენტები](./doc/guides/html-css/form)

## შეჯამება

ამ სტატიაში განვიხილეთ სემანტიკური ელემენტების არსი, სემანტიკური ელემენტები და მისი გამოყენება.
