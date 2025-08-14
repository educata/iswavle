---
title: 'ფორმები'
description: 'HTML ფორმების გამოყენება'
keywords: 'input, working with input, post, get'
---

ვებსაიტებზე ფორმები ერთ-ერთ ყველაზე მნიშვნელოვან როლს თამაშობენ: ისინი მომხარებელს საშუალებას აძლევენ,
შეიყვანონ ინფორმაცია, გააგზავნონ მოთხოვნები და სხვადასხვანაირი ინტერაქცია ჰქონდეთ ვებგვერდთან.

## ფორმის შექმნა

ფორმები იქმნება [სემანტიკური](./doc/guides/html-css/semantic)
[`<form>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form) ელემენტის საშუალებით.
მასში შეგვიძლია მოვათავსოთ სხვადასხვა ფორმის ელემენტები, მივიღოთ მომხარებლის ინფორმაცია და
გავაგზავნოთ სერვერზე, ან ისევ მომხარებლის მხარეს შევასრულოთ სხვადასხვა მოქმედებები.

### method

`<form>`-ში [`method`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form#method) ატრიბუტი განსაზღვრავს,
თუ რომელი [HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP) მეთოდით გაგზავნოს ბრაუზერმა მოთხოვნა. სულ ატრიბუტის 3 მნიშვნელობა:

- `post` - რომელიც ინფორმაცია გაუგზავნის სერვერს POST მოთხოვნით.
- `get` - ნაგულისხმები მნიშვნელობა, რომელიც [`action`](#action) URL-ის ბოლოს დაუმატებს ფორმიდან მიღებულ ინფორმაციას.
- `dialog` - როცა ფორმა მოთავსებულია [`<dialog>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog) ელემენტში,
  ის ხურავს დიალოგურ ფანჯარას და იწყებს ფორმის დადასტურების პროცესს, თუმცა არ აგზავნის და არ ასუფთავებს ფორმას.

:::info
დეტალურად HTTP-ის მეთოდები ახსნილია [REST API-ს სტატიაში](./doc/guides/javascript/rest-api).
:::

### action

`action` ატრიბუტში იწერება სერვერის მისამართი, რომელსაც ბრაუზერი დაუკავშირდება ფორმის დადასტურების შემთხვევაში.

```html preview
<form action="https://api.everrest.educata.dev/echo/html" method="post">
  <label>სახელი:</label>
  <input type="text" name="userName" />
  <button>გააგზავნე ინფორმაცია</button>
</form>
```

ამ მაგალითში, როცა მომხარებელი დააკლიკებს _გააგზავნე ინფორმაცია_ ღილაკს,
სერვერზე გაიგზავნება მომხარებლის მიერ `<input>` ველში შეყვნილი სახელი,

:::info
[https://api.everrest.educata.dev/echo/html](https://everrest.educata.dev) არის სერვერის მისამართი,
რომელიც შეგიძლიათ გამოიყენოთ სავარჯიშოდ. მოცემული ენდფოინთის დანიშნულებაა, რომ უბრალოდ უკან დაგიბრუნოთ თქვენ მიერ გაგზავნილი ინფორმაცია.
:::

## ფორმის ძირითადი ელემენტები

- [`<input>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input) - ინტერაქტიული ველი, რომელიც მომხარებელს მისცემს საშუალებას, შეიყვანოს რაიმე ინფორმაცია.
- [`<label>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input) - გამოიყენება ველების აღსაწერად.
- [`<textarea>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea) - მრავალსტრიქონიანი ტექსტის შესაყვანი ველი.
- [`<select>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select) - ჩამოსაშლელი ასარჩევი მენიუ.
- [`<button>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button) - ღილაკი, რომელიც ფორმის ინფორმაციას გააგზავნის ან შეასრულებს სხვა მოქმედებას.

### button

`button` ღილაკის ელემენტი ხშირად გამოიყენება ფორმებში, მეტწილად ინფორმაციის გასაგზავნად, ან ფორმის გასასუფთავებლად, ან რაიმე მომქდების გასაშვებად (ჯავასკრიპტის გამოყენებით).

ღილაკს გააჩნია [ბევრი ატრიბუტი](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#attributes), ამჟამად განვიხილოთ `<form>`-თან დაკავშირებული ატრიბუტები:

| ატრიბუტი         | აღწერა                                                                                                                                                                                                                                                   |
| ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `form`           | ფორმის ელემენტთან დაკავშირება. თუ ფორმის გარეთ გვაქვს ღილაკის ელემენტი, შეგვიძლია ის ფორმასთან დავაკავშიროთ ამ ატრიბუტის გამოყენებით. ატრიბუტს უნდა მივანიჭოთ ფორმის `id`.                                                                               |
| `formaction`     | ფორმის `action` თვისების გადაწერა. შეიძლება გვქონდეს ბევრი `action` სხვადასხვა ღილაკზე.                                                                                                                                                                  |
| `formmethod`     | ფორმის `method` თვისების გადაწერა. შეიძლება გვქონდეს ბევრი `method` სხვადასხვა ღილაკზე.                                                                                                                                                                  |
| `formnovalidate` | თუ ღილაკი არის `submit` ტიპის და აქვს ეს ატრიბუტი, მაშინ მასზე დაჭერის შემთხვევაში ფორმის ვალიდაცია აღარ შესრულდება.                                                                                                                                     |
| `type`           | ღილაკის მოქმედების ტიპი. სულ გვაქვს 3 მნიშვნელობა: `submit`, `reset` და `button`. `submit` ფორმას დაადასტურებს, `reset` ფორმს დააბრუნებს ნაგულისხმევ მდგომარეობაში, ხოლო `button` უბრალოდ ღილაკის როლს იტოვებს და ფორმის მოქმედებას არ ახორციელებს (ჯავასკრიპტით შეიძლება მისი გამოყენება). |

:::info
თუ ღილაკი მოთავსებულია ფორმაში, მისი ნაგულისხმევი `type` არის `submit`.
:::

### label

`label` გამოიყენება `input` ველის აღსაწერად. თუმცა მხოლოდ `input` ელემენტის გვერდით `label`-ის ჩაწერა
არ ნიშანვს, რომ იგი ველს აღწერს. როცა ვიყენებთ `label` ელემენტს, აუცილებელია
მას გავუწეროთ `for` ატრიბუტი, რომლითაც მივუთითებთ კონკრეტული `input` ელემენტის `id`-ზე.

```html preview
<label for="lastName">გვარი:</label> <input id="lastName" />
```

რათა შევამოწმოთ, `label` სწორად მუშაობს თუ არა, დავაკლიკოთ მის კონტენტს, ამ შემთხვევაში "გვარს".
HTML-მა ავტომატური ფოკუსი უნდა მოახდინოს მის შესაბამის `input` ელემენტზე.

:::warning
`id` უნდა იყოს უნიკალური ყოველი ელემენტისათვის.
მხოლოდ ერთი `id` უნდა იყოს მინიჭებული ერთი `for`-ისთვის.
:::

### input

`input` გამოიყენება ერთი მნიშვნელობის მისაღებად, მაგალითად სახელი, გვარი, ასაკი, ელფოსტა ან სხვა ინფორმაცია.

```html preview
<form action="https://api.everrest.educata.dev/echo/html" method="post">
  <label for="address">მისამართი:</label>
  <input id="address" />
  <label for="email">ელფოსტა:</label>
  <input id="email" />
  <button>გაგზავნა</button>
</form>
```

ამ შემთხვევაში, მონაცემები გაიგზავნება სერვერზე, თუმცა სერვერისთვის გაუგებარი იქნება,
რას ნიშნავს მომხმარებლის მიერ შეყვანილი ინფორმაცია.

ასეთ დროს საჭიროა გამოვიყენოთ `name` ატრიბუტი. იგი იქნება თვისების (ცვლადის) სახელი,
რომელიც მიესადაგება შეყვანილ ინფორმაციას.

```html preview
<form action="https://api.everrest.educata.dev/echo/html" method="post">
  <label for="username">სახელი:</label>
  <input name="username" id="username" />
  <label for="email">ელფოსტა:</label>
  <input name="email" id="email" />
  <button>გაგზავნა</button>
</form>
```

წარმოიდგინეთ ცხრილი, სადაც მარცხენა სვეტში გვაქვს `name` ატრიბუტის მნიშვნელობები,
ხოლო მარჯვენა სვეტში მომხმარებლის მიერ შეყვანილი მნიშვნელობა.

| name      | value               |
------------|---------------------|
| username  | (რაღაც მნიშვნელობა) |
| email     | (რაღაც მნიშვნელობა) |

ასე ერთმანეთთან ვაკავშირებთ ველის სახელსა და შეყვანილ ინფორმაციას.
ასერომ, არასდროს დაგავიწყდეთ ფორმის ელემენტებზე `name` არტრიბუტი!

:::info
`id`-ისა და `name`-ის მნიშვნელობები შეიძლება იყოს განსხვავებულიც ან ერთნაირიც.
სერვერისთვის `id`-ს მნიშვენლობა არ აქვს.
:::

`input` ელემენტს ასევე გააჩნია `type` ატრიბუტი, რომელიც განსაზღვრავს თუ როგორი
ტიპის ველი იქნება გამოსახული. მათი გამოყენება კარგია, როგორც UX-ისთვის (User experience) ასევე [a11y-სთვისაც](./doc/guides/html-css/a11y).
სწორი ტიპის გამოყენებისას, სხვადასხვა ბრაუზერი და მოწყობილობა გამოსახავს სათანადო ინტერაქციულ ელემენტებს ჩაშენებული ვალიდაციებითა და a11y-ით.

| ტიპი                                                                                               | აღწერა                                                                                                                                                                                        |
| -------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`button`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/button)                 | მოქმედებს როგორც ჩვეულებრივი `button` ელემენტი.                                                                                                                                               |
| [`checkbox`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox)             | მოსანიშნი ყუთი, სადაც შეგვიძლია მოვნიშნოთ და გავაუქმოთ ერთი ან მეტი ელემენტი.                                                                                                |
| [`color`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/color)                   | ფერის ასარჩევი ველი.                                                                                                                                                            |
| [`date`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/date)                     | თარიღის ასარჩევი ველი (წელიწადი, თვე, დღე თუმცა არა დრო).                                                                                                                       |
| [`datetime-local`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/datetime-local) | სრული თარიღის ასარჩევი ველი (წელიწადი, თვე, დღე და დრო).                                                                                                                        |
| [`email`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/email)                   | ტექსტური ველი, რომელსაც გააჩნია იმეილის ვალიდაციები.                                                                                                                                          |
| [`file`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file)                     | ფაილის ასატვირთი ველი, სადაც შეგვიძლია [`accept`](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/accept) ატრიბუტით განვსაზღვროთ, რომელი ტიპის ფაილის ატვირთვა არის სესაძლებელი. |
| [`hidden`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/hidden)                 | დამალული ველი, რომელიც გვსურს, რომ არ გამოუჩნდეს მომხარებელს მაგრამ გამოჩნდეს სერვერთან კომუნიკაციისას.                                                                                       |
| [`image`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/image)                   | გრაფიკული `submit` ღილაკი, რომელშიც შეიძლება პირდაპირ სურათი მოვათავსოთ ტექსტის ნაცვლად.                                                                                                      |
| [`month`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/month)                   | წელიწადის და თვის ასარჩევი ველი.                                                                                                                                                              |
| [`number`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/number)                 | რიცხვითი ველი.                                                                                                                                                                                |
| [`password`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/password)             | ტექსტური ველი, სადაც შეყვანილი მნიშვნელობები გამოჩნდება წერტილებად.                                                                                                                           |
| [`radio`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/radio)                   | `checkbox`-ის მსგავსი ასარჩევი ველი, თუმცა მხოლოდ ერთი ელემენტის არჩევა არის შესაძლებელი.                                                                                                      |
| [`range`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/range)                   | რიცხვითი ინტერვალის ასარჩევი ველი.                                                                                                                                                            |
| [`reset`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/reset)                   | ღილაკი, რომელიც დააბრუნებს ფორმას ნაგულისხმევ მდგომარეობაში.                                                                                                                                  |
| [`search`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/search)                 | ტექსტური საძიებო ველი, სადაც ინფორმაციის შეტანისას გამოჩნდება გასუფთავების ღილაკი.                                                                                                            |
| [`submit`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/submit)                 | ფორმის დადასტურების ღილაკი.                                                                                                                                                                   |
| [`tel`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/tel)                       | ტექსტური ველი, რომელსაც გააჩნია ტელეფონის ნომრის ვალიდაცია.                                                                                                                             |
| [`text`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/text)                     | ნაგულისხმევი მნიშვნელობა. გამოიყენება ერთხაზიანი ტექსტური ინფორმაციის შესატანად.                                                                                                |
| [`time`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/time)                     | დროის ასარჩევი ველი.                                                                                                                                                                          |
| [`url`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/url)                       | ტექსტური ველი, რომელსაც გააჩნია url-ის ვალიდაციები.                                                                                                                                           |
| [`week`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/week)                     | კვირის ასარჩევი ველი.                                                                                                                                                                         |

გამოვიყენოთ თითოეული ტიპი:

```html
<form action="https://api.everrest.educata.dev/echo/html" method="post">
  <h1>დიდი ფორმა</h1>
  <div>
    <label for="name">სახელი:</label>
    <input type="text" id="name" name="name" />
  </div>
  <div>
    <label for="email">ელ.ფოსტა:</label>
    <input type="email" id="email" name="email" />
  </div>
  <div>
    <label for="password">პაროლი:</label>
    <input type="password" id="password" name="password" />
  </div>
  <div>
    <label for="color">ფერი:</label>
    <input type="color" id="color" name="color" />
  </div>
  <div>
    <label for="date">თარიღი (date):</label>
    <input type="date" id="date" name="date" />
  </div>
  <div>
    <label for="month">თარიღი (month):</label>
    <input type="month" id="month" name="month" />
  </div>
  <div>
    <label for="week">თარიღი (week):</label>
    <input type="week" id="week" name="week" />
  </div>
  <div>
    <label for="time">თარიღი (time):</label>
    <input type="time" id="time" name="time" />
  </div>
  <div>
    <label for="datetime-local">თარიღი (datetime-local):</label>
    <input type="datetime-local" id="datetime-local" name="datetime-local" />
  </div>
  <div>
    <label for="number">რიცხვი:</label>
    <input type="number" id="number" name="number" />
  </div>
  <div>
    <label for="range">შუალედური მნიშვნელობა:</label>
    <input type="range" id="range" name="range" min="1" max="100" />
  </div>
  <div>
    <label for="tel">ტელეფონი:</label>
    <input type="tel" id="tel" name="tel" />
  </div>
  <div>
    <label for="url">ვებსაიტის მისამართი:</label>
    <input type="url" id="url" name="url" />
  </div>
  <div>
    <label for="search">ძიება:</label>
    <input type="search" id="search" name="search" />
  </div>
  <div>
    <label for="file-1">ფაილი:</label>
    <input type="file" id="file-1" name="file" />
  </div>
  <div>
    <label for="file-2">ფაილი (მხოლოდ <code>png</code> გაფართოვება):</label>
    <input type="file" id="file-2" name="file" accept="image/png" />
  </div>
  <div>
    <label for="file-3"> ფაილი (მხოლოდ <code>png</code> და <code>jpeg</code> გაფართოვება): </label>
    <input type="file" id="file-3" name="file" accept="image/png, image/jpeg" />
  </div>
  <div>
    <input type="checkbox" id="checkbox" name="checkbox" />
    <label for="checkbox">ეთანხმებით თუ არა პირობებს</label>
  </div>
  <div>
    <p>სქესი:</p>
    <div>
      <input type="radio" id="gender-male" name="gender" value="male" />
      <label for="gender-male">მამრობითი</label>
    </div>
    <div>
      <input type="radio" id="gender-female" name="gender" value="female" />
      <label for="gender-female">მდედრობითი</label>
    </div>
    <div>
      <input type="radio" id="gender-other" name="gender" value="other" />
      <label for="gender-other">სხვა</label>
    </div>
  </div>
  <input type="submit" value="გაგზავნა" />
  <input type="reset" value="გასუფთავება" />
</form>
```

```preview
<style>
  .preview-example-form {
    width: fit-content;
    display: grid;
    grid-template-columns: 1fr;
    gap: 10px;
    padding: 25px;
    margin: auto;
    border-radius: 8px;
    text-align: center;
  }

  .preview-example-form div {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
  }

  .preview-example-form h1 {
    margin-bottom: 16px;
  }

  .preview-example-form p {
    margin: 0;
  }
</style>
<form action="https://api.everrest.educata.dev/echo/html" method="post" class="preview-example-form">
  <h1 data-linkifier-ignore="true">დიდი ფორმა</h1>
  <div>
    <label for="name">სახელი:</label>
    <input type="text" id="name" name="name" />
  </div>
  <div>
    <label for="email-example">ელ.ფოსტა:</label>
    <input type="email" id="email-example" name="email" />
  </div>
  <div>
    <label for="password">პაროლი:</label>
    <input type="password" id="password" name="password" />
  </div>
  <div>
    <label for="color">ფერი:</label>
    <input type="color" id="color" name="color" />
  </div>
  <div>
    <label for="date">თარიღი (date):</label>
    <input type="date" id="date" name="date" />
  </div>
  <div>
    <label for="month">თარიღი (month):</label>
    <input type="month" id="month" name="month" />
  </div>
  <div>
    <label for="week">თარიღი (week):</label>
    <input type="week" id="week" name="week" />
  </div>
  <div>
    <label for="time">თარიღი (time):</label>
    <input type="time" id="time" name="time" />
  </div>
  <div>
    <label for="datetime-local">თარიღი (datetime-local):</label>
    <input type="datetime-local" id="datetime-local" name="datetime-local" />
  </div>
  <div>
    <label for="number">რიცხვი:</label>
    <input type="number" id="number" name="number" />
  </div>
  <div>
    <label for="range">შუალედური მნიშვნელობა:</label>
    <input type="range" id="range" name="range" min="1" max="100" />
  </div>
  <div>
    <label for="tel">ტელეფონი:</label>
    <input type="tel" id="tel" name="tel" />
  </div>
  <div>
    <label for="url">ვებსაიტის მისამართი:</label>
    <input type="url" id="url" name="url" />
  </div>
  <div>
    <label for="search">ძიება:</label>
    <input type="search" id="search" name="search" />
  </div>
  <div>
    <label for="file-1">ფაილი:</label>
    <input type="file" id="file-1" name="file" />
  </div>
  <div>
    <label for="file-2">ფაილი (მხოლოდ <code>png</code> გაფართოვება):</label>
    <input type="file" id="file-2" name="file" accept="image/png" />
  </div>
  <div>
    <label for="file-3"> ფაილი (მხოლოდ <code>png</code> და <code>jpeg</code> გაფართოვება): </label>
    <input type="file" id="file-3" name="file" accept="image/png, image/jpeg" />
  </div>
  <div>
    <input type="checkbox" id="checkbox" name="checkbox" />
    <label for="checkbox">ეთანხმებით თუ არა პირობებს</label>
  </div>
  <div>
    <p>სქესი:</p>
    <div>
      <input type="radio" id="gender-male-example" name="gender" value="male" />
      <label for="gender-male-example">მამრობითი</label>
    </div>
    <div>
      <input type="radio" id="gender-female-example" name="gender" value="female" />
      <label for="gender-female-example">მდედრობითი</label>
    </div>
    <div>
      <input type="radio" id="gender-other-example" name="gender" value="other" />
      <label for="gender-other-example">სხვა</label>
    </div>
  </div>
  <input type="hidden" name="score" value="როგორ შეაფასებდი სტატიას?" />
  <input type="submit" value="გაგზავნა" />
  <input type="reset" value="გასუფთავება" />
</form>
```

### textarea

`textarea` გამოიყენება მრავალსტრიქონიანი ინფორმაციის მისაღებად, როგორიცა მესიჯი, კომენტარი ან
ნებისმიერი დიდი ტექსტი.

```html
<form action="https://api.everrest.educata.dev/echo/html" method="post">
  <label for="message">მესიჯი</label> <br />
  <textarea id="message" name="message" rows="5" cols="33"></textarea> <br />
  <button>გაგზავნა</button>
</form>
```

```preview
<style>
  .preview-example-form-textarea textarea {
    min-width: 100px;
    max-width: 300px;
    min-height: 100px;
    max-height: 300px;
    resize: both;
  }
</style>
<form action="https://api.everrest.educata.dev/echo/html" method="post" class="preview-example-form-textarea">
  <label for="message">მესიჯი</label> <br />
  <textarea id="message" name="message" rows="5" cols="33"></textarea> <br />
  <button>გაგზავნა</button>
</form>
```

`rows` და `cols` ატრიბუტი განსაზღვრავს საწყის ზომებს. მათი გამოყენება კარგია კონსისტენტურობისთვის,
რადგან სხვადასხვა ბრაუზერი განსხვავებულ ნაგულისხმებ მნიშვნელობებს გვთავაზობს.

### select

`select` არის ფორმის ელემენტი, რომელიც მომხმარებელს საშუალებას აძლევს აარჩიოს წინასწარ განსაზღვრული მნიშვნელობებიდან ერთი ან მეტი ივარიანტი.
მას სჭირდება `option` ელემენტები, სადაც ჩამოვწერთ ასარჩევ ვარიანტებს.
აუცილებელია, რომ `option` ელემენტს გააჩნდეს `value` ატრიბუტი, რომელიც განსაზღვრავს რა მნიშვნელობა მიეწერება `select` ელემენტს,
როცა მომხმარებელი შესაბამის ვარიანტს აარჩევს. შესაძლებელია, რომ ვარიანტის მნიშვნელობა და მომხმარებლისთვის გამოსასხული ტექსტი სხვადასხვა იყოს.

```html preview
<form action="https://api.everrest.educata.dev/echo/html" method="post">
  <label for="cat">აირჩიე საყვარელი კატის ჯიში:</label>
  <select name="cat" id="cat">
    <option value="persian">Persian</option>
    <option value="siamese">Siamese</option>
    <option value="maine-coon">Maine Coon</option>
    <option value="ragdoll">Ragdoll</option>
    <option value="sphynx" selected>Sphynx</option>
    <option value="british-shorthair">British Shorthair</option>
    <option value="bengal">Bengal</option>
    <option value="scottish-fold">Scottish Fold</option>
    <option value="savannah" disabled>Savannah</option>
    <option value="birman">Birman</option>
  </select>
  <button>გააგზავნე</button>
</form>
```

- `selected` - განსაზღვრავს წინასწარ არჩეულ (ნაგულისხმებ) მნიშვნელობას.
- `multiple` - მომხარებელს აძლევს საშუალებას აირჩიოს ერთზე მეტი მნიშვნელობა.
- `disabled` - გამოიყენება, როცა რომელიმე ასარჩევი ველის არჩევა არ შეიძლება.
- `size` - თუ ასარჩევი ველი წარმოდგენილია, როგორც სიის ელემენტებად შეგვიძლია `size` ატრიბუტით განვსაზღვროთ გამოჩენილი ელემენტების რაოდენობა (აუცილებლია `multiple` ატრიბუტი).

```html preview
<form action="https://api.everrest.educata.dev/echo/html" method="post">
  <label for="cars">აირჩიე ფავორიტი მანქანის ბრენდი:</label> <br />
  <select id="cars" name="cars" multiple size="3">
    <option value="toyota">Toyota</option>
    <option value="ford">Ford</option>
    <option value="bmw">BMW</option>
    <option value="audi">Audi</option>
    <option value="mercedes">Mercedes</option>
    <option value="tesla" disabled>Tesla</option>
  </select>
  <br />
  <button>გაგზავნა</button>
</form>
```

:::info
ერთზე მეტი ელემენტის მონიშვნისთვის საჭიროა <kbd>CTRL</kbd> ღილაკის გამოყნება.
:::

## ზოგადი ფორმის ატრიბუტები

HTML ფორმის ელემენტებს აქვს რამდენიმე მნიშვნელოვანი ატრიბუტი, რომლებიც განსაზღრავს მის
ფუნქციონალურ ნაწილს.

- `autocapitalize` - ავტომატურად გადააქცევს მაღალ რესტრში ტექსტის პირველ სიმბოლოს (გარდა `url`, `email` და `password` ტიპის ველისა).
- `autocomplete` - მომხარებელს აძლევს ავტომატური შევსების შესაძლებლობას (გარდა `checkbox` და `radio` ტიპის ველისა).
- `pattern` - კერძო ვალიდაცია [რეგულარული გამოსახულებების](./doc/guides/javascript/regex) გამოყენებით.
- `required` - განსაზღრავს სავალდებულო ველს, რომელიც მომხარებელმა აუცილებლად უნდა შეავსოს.
- `placeholder` - ტექსტურ ველში აჩვენებს მომხარებელს ტექსტს მანამ სანამ რაიმეს ჩაწერს (მინიშნებისთვის).
- `value` - განსაზღრავს ველის ნაგულისხმებ მნიშვნელობას.
- `min` - განსაზღრავს მინიმალურ რიცხვით მნიშვნელობას.
- `max` - განსაზღრავს მაქსიმალურ რიცხვით მნიშვნელობას.
- `minlength` - განსაზღრავს შეყვანილი სიმბოლოების მინიმალურ რაოდენობას.
- `maxlength` - განსაზღრავს შეყვანილი სიმბოლოების მაქსიმალურ რაოდენობას.
- `readonly` - ველი მხოლოდ საჩვენებელია, მომხარებელს ინტერაქცია არ შეუძლია (დაკოპირების გარდა).
- `disabled` - ველი დაბლოკილია, მომხარებელს არ შეუძლია მისი შეცვლა.

## პრაქტიკა

მოდით ავაწყოთ პატარა რეგისტრაციის ფორმა, სადაც მომხარებელი შეიყვანს:

- სახელსა და გვარს (მინიმუმ 4 სიმბოლ, მაქსიმუმ 50)
- ელ.ფოსტას
- ასაკს (მინიმუმ 16, მაქსიმუმ 120)
- სქესს
- ეთანხმება თუ არა პირობებს

<iframe data-url="guides/html-css-form-example" data-title="ფორმის მაგალითი" data-height="500"></iframe>

## შეჯამება

ამ სტატიაში განვიხილეთ ფორმის ელემენტები, მათი ატრიბუტები და გამოყენება.