---
title: 'პრაქტიკა'
description: 'REST API გამოყენება JavaScript-ში?'
keywords: 'swagger, rest api, get, post, put, patch, delete, fetch, xhr, everrest, educata, postman, insomnia'
---

დროა თეორია საქმეს მოვახმაროთ! ავაწყოთ პატარა აპლიკაცია, რათა HTTP მოთხოვნებზე ცოდნა გავამყაროთ.

## Swagger

სერვერთან დაკავშირება მარტივია, როცა იცი რა მისამართზე გააგზავნო მოთხოვნა და რა სტრუქტურის პასუხს უნდა ელოდე.
სერვერზე, ჩვეულებრივ, მუშაობს ბექ-ენდ (back-end) დეველოპერი, რომელიც ააგებს და მოგვაწვდის endpoint-ებს.
Endpoint-ები ეს არის მისამართის დაბოლოებები, რომლებზეც კლიენტს (Front-End) შეუძლია გაგზავნოს მოთხოვნით,
თუმცა საიდან უნდა გაიგოს ფრონტ-ენდ დეველოპერმა, რა ენდფოინთები გამოიყენოს?

ამისათვის ბევრი აპლიკაცია და ხელსაწყო არსებობს, რომელიც ბექ-ენდ დეველოპერს ეხმარება endpoint-ების დოკუმენტირებაში.
ერთ-ერთი პოპულარული ხელსაწყო არის [Swagger](https://swagger.io/), რომლითაც ბექ-ენდ დეველოპერს შეუძლია მარტივად ააგოს დოკუმენტაციის საიტი,
სადაც არა მხოლოდ აღწერილი იქნება ყველა საჭირო ენდფოინთი, არამედ შესაძლებელი იქნება ამ ენდფოინთებთან ინტერაქცია
და მათი ფუნქციონალის შემოწმება.

მაგალითისთვის, წინა სტატიებში ჩვენ გამოვიყენოთ [Everrest](https://everrest.educata.dev/)-ის სერვერი,
რომელსაც გააჩნია სვაგერის დოკუმენტაცია.

:::info
Everrest ეს არის [ედუკატას](https://educata.dev/)-ს უფასო და საჯარო REST API,
რონელიც შეგიძლიათ  გამოიყენოთ ფრონტ-ენდ დეველოპმენტში სავარჯიშოდ და ააწყოთ ისაეთი აპლიკაციები,
როგორიცაა ციტატების გენერატორი, QR კოდის გენერატორი, ონლაინ მაღაზია და სხვა.
:::

Everrest-ის Swagger გამოიყურება შემდეგნაირად:

<iframe src="https://api.everrest.educata.dev/swagger" data-is-external-source="true"></iframe>

ვებგვერდზე ჩანს სხვადასხვა endpoint-ები, ყოველივე ეს დაგენერირებულია სერვერის მხარეს.

მაგალითისთვის დააკლიკეთ `/shop/products/all`-ის `GET` მოთხოვნას,
შემდგომ **Try it out**-ს (შესაძლებელია სხვა ენაზე ეწეროს ინტერნაციონალიზაციიდან გამომდინარე).
ველში ორი პარამეტრი გამოჩნდება, რომლებიც სურვილისამებრ შეგიძლიათ შეავსოთ, და დააწექით **Execute**-ს.

**Execute**-ზე დაკლიკების შემდგომ, გამოჩნდება მოთხოვნის და პასუხის დეტალები:

- [Curl](https://curl.se/) - ეს არის Command lineხელსაწყო, რომლითაც შესაძლებელია HTTP მოთხოვნების გაგზავნა. ამ შემთხვევაში ჩვენ გვაქვს მოთხოვნის აღწერა CURL-ის ფორმატით.
- Request URL - რომელი მისამართიდან მოვითხოვეთ ინფორმაცია.
- Server response - სერვერის მიერ დაბრუნებული ინფორმაცია:
  - Code - დაბრუნებული [სტატუს კოდი](./doc/guides/javascript/rest-api#სტატუს_კოდი) სერვერიდან.
  - Response body - სერვერის მიერ დაბრუნებული მონაცემები.

Swagger-ის გამოყენებით დოკუმენტაციიდანვე გავაგზავნეთ მოთხოვნა EverREST-ის სერვერზე და იქვე ვნახეთ დაბრუნებული პასუხიც.

ჩვენს შემთხვევაში, ეს დაბრუნებული ინფორმაცია იყო პროდუქტების სია. შეგვიძლია იგივე endpoint-ი გამოვიყენოთ და ავაგოთ პატარა მაღაზიის ვებსაიტი.

## მაღაზიის ვებგვერდი

მაღაზიის ვებგვერდზე, პირველ რიგში, საჭიროა პროდუქტები, თორემ ისე რა მაღაზია გამოვა? ვცადოთ პროდუქტების სიის მოთხოვნა სერვერიდან და მათი გამოსახვა.

პირველ რიგში, შემოვიტანოთ [Bootstrap](https://getbootstrap.com/) ან სხვა ნებისმიერი UI ბიბლიოთეკა/ფრეიმვორკი, რათა ვიზუალებზე ბევრი დრო არ დავხარჯოთ.
ამ შემთხვევაში, ბუტსტრაპი შემოგვაქვს დოკუმენტის `head`-ში.

```html
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous" />
```

`body`-ში კი შევქმნათ კონტეინერი ელემენტი, რომელიც გამოიტანს ვიზუალზე პროდუქტებს:

```html
<main class="container-xxl m-auto pt-4">
  <section id="products-display" class="container-fluid d-flex flex-wrap justify-content-center align-items-center align-content-center gap-3"></section>
</main>
```
```js
const productsDisplay = document.querySelector('#products-display');

async function init() {
  try {
    const products = await (await fetch('https://api.everrest.educata.dev/shop/products/all?page_size=2')).json();
    console.log(products);
  } catch (error) {
    console.error(error);
  }
}

init();
```

შევქმენით `init` ფუნქცია, სადაც დაიწყება მთლიანი ლოგიკის გაშვება. `try...catch` ბლოკს ვიყენებთ წარუმატებელი შემთხვევის გასაკონტროლებლად,
რაც ამ შემთხვევაში უბრალოდ გამოიტანს შეცდომას კონსოლში. თუ მოთხოვნა წარმატებული იყო, დავინახავთ კონსოლში ობიექტს, რომელსაც გააჩნია შემდგომი მნიშვნელობები:

- limit - მოთხოვნის მიხედვით მაქსიმუმ რამდენი პროდუქტი უნდა ჩაიტვირთოს (`page_size` არის გაწერილი მისამართის ბოლოს query პარამეტრის სახით), ამ შემთხვევაში 2.
- total - რამდენი პროდუქტი გამოაგზავნა სერვერმა ჯამში.
- page - მერამდენე გვერდზე ვიმყოფებთ, გამოიყენება Pagination-ს დროს.
- skip - რამდენი პროდუქტი გამოვტოვეთ, გამოიყენება Pagination-ს დროს.
- products - პროდუქტების მასივი.

რა თქმა უნდა, ეს ყველაფერი თვითონ API-ს დოკუმენტაციიდან არის ჩვენთვის ცნობილი.

ამ ინფორმაციის გამოყენებით კი ვიზუალზე შეგვიძლია პროდქუტები ლამაზად გამოვიტანოთ:

```js
const productsDisplay = document.querySelector('#products-display');

async function init() {
  try {
    const response = await (await fetch('https://api.everrest.educata.dev/shop/products/all?page_size=2')).json();
    response.products.forEach((product) => {
      productsDisplay.appendChild(getProductElement(product));
    });
  } catch (error) {
    alert(error);
  }
}

function getProductElement(product) {
  const element = document.createElement('div');
  element.classList.add('card');
  element.style.maxWidth = '18rem';
  element.style.width = '100%';
  element.innerHTML = `
    <div class="card-header text-center">
      ${toCapitalise(product.brand)} / ${toCapitalise(product.category.name)}
    </div>
    <img src="${product.thumbnail}" class="card-img-top pt-3" alt="${product.title} image">
    <div class="card-body">
      <h5 class="card-title">${product.title}</h5>
      <p class="card-text">${product.description}</p>
       <ul class="list-group list-group-flush">
        <li class="list-group-item">Price: ${product.price.current} ${product.price.currency}</li>
        <li class="list-group-item">Rating: ${product.rating}</li>
        <li class="list-group-item">Stock: ${product.stock}</li>
        <li class="list-group-item">Warranty: ${product.warranty}</li>
      </ul>
    </div>
    <div class="card-footer text-center">
      Added at :${new Date(product.issueDate).toLocaleDateString()}
    </div>
  `;
  return element;
}

function toCapitalise(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

init();
```

<iframe data-url="guides/javascript-products-simple-example" data-title="პროდუქტების გამოტანა" data-height="500"></iframe>

## Postman

[Postman](https://www.postman.com/) არის Swagger-ს მსგავსი აპლიკაცია, რომელიც გაძლევთ საშუალებას რომ მოთხოვნები აგზავნოთ კოდის გარეშე.

დაინსტალირების შემდგომ გახსენით აპლიკაცია, შემდგომ შეგიძლიათ გაიაროთ ავტორიზაცია ან გააგრძელოთ ავტორიზაციის გარეშე.

![Postman-ის მაგალითი](./assets/images/postman.png)

1. აკლიკებთ _new_ ღილაკს.
2. ირჩევთ _http_.
3. ირჩევთ სასურველი მოთხოვნის ტიპს.
4. ჩაწერეთ მისამართი, სადაც უნდა გაიგზავნოს მოთხვონა.
5. _send_ ღილაკზე დაკლიკებით აგზავნით მოთხოვნას.

## Insomnia

Postman-ის კარგი ალტერნატივა არის [Insomnia](https://insomnia.rest/). მისი გამოყენება არის თითქმის ანალოგიური.

დაინსტალირების შემდგომ გახსენით აპლიკაცია, შემდგომ შეგიძლიათ გაიაროთ ავტორიზაცია ან გააგრძელოთ ავტორიზაციის გარეშე.

![Insomnia-ს მაგალითი](./assets/images/insomnia.png)

1. შექმენით კოლექცია.
2. დააკლიკეთ **+** და აირჩიეთ _HTTP Request_.
3. ირჩევთ სასურველი მოთხოვნის ტიპს.
4. ჩაწერეთ მისამართი, სადაც უნდა გაიგზავნოს მოთხვონა.
5. _send_ ღილაკზე დაკლიკებით აგზავნით მოთხოვნას.

რეალურად ორივე აპლიკაცია Postman-იც და Insomnia-ც ერთი და იგივე მიზანს ემსახურება თუმცა გააჩნიათ განსხვავებული ინტერფეისი და ფუნქციონალური ნაწილი. ცადეთ ორივე და სურვილისამებრ გააგრძელეთ გამოყენება, ასევე არსებობს სხვა ალტერნატივებიც.

ორივე აპლიკაციაში შეგიძლიათ იმპორტი გაუკეთოთ სხვის workspace-ს, რაც დააიმპორტებს სხვადასხვა endpoint-ებს. Everrest-ს ორივე აპლიკაციისთვის გააჩნია workspace-ები, მათ დასაიმპორტებლად ეწვიეთ [ბმულს](https://github.com/educata/everrest/tree/main/workspace).

## შეჯამება

ამ სტატიაში განვიხილეთ თუ რა არის Swagger და როგორ დაამუშავოთ `GET` მოთხოვნა `fetch`-ს გამოყენებით. ასევე განვიხილეთ Postman-ის და Insomnia-ს გამოყენებაც.
