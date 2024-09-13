---
title: 'პრაქტიკა'
description: 'REST API გამოყენება JavaScript-ში?'
keywords: 'swagger, rest api, get, post, put, patch, delete, fetch, xhr, everrest, educata, postman, insomnia'
---

წინა სტატიაში განვიხილეთ ორი მიდგომა თუ როგორ შეიძლებოდა მოთხოვნის გაგზავნა სერვერზე.
ამ სტატიაში განვიხილავთ მაგალითს თუ როგორ შეიძლება ავაწყოთ მცირედი აპლიკაცია სერვერის გამოყენებით.

## Swagger

სერვერთან დაკავშირება მარტივია, როცა იცი შესაბამისი მისამართი. სერვერზე მეტწილადად მუშაობს Back-end დეველოპერი, რომელმაც უკვე ააგო endpoint-ები. Endpoint-ები ეს არის მისამართის დაბოლოებები, რომელზეც კლიენტს (Front-End) შეუძლია დაუკავშირდეს მოთხოვნით, მაგრამ როგორ უნდა ამცნობოს Back-end დეველოპერმა Front-end-ს ამ endpoints-ების შესახებ ?

ამისათვის ბევრი აპლიკაცია და ხელსაწყო არსებობს, რომელიც Back-end დეველოპერს ეხმარება endpoint-ების დოკუმენტირებაში. ერთ-ერთი საუკეთესო ხელსაწყო არის [Swagger](https://swagger.io/). Swagger ეს არის ხელსაწყო, რომლის მიხედვითაც Back-end დეველოპერს შეუძლია ააგოს ვებგვერდი, რომელზეც იქნება სხვადასხვა მისამართების მაგალითები.

მაგალითისთვის, წინა სტატიებში ჩვენ გამოვიყენოთ [Everrest](https://everrest.educata.dev/)-ს სერვერი.

:::info
Everrest ეს არის [Educata](https://educata.dev/)-ს სერვერი, რომელიც არის ღია და თავისუფალი ყოველი დეველოპერისთვის. შეგიძლიათ REST API-ს შესწავლის დროს გამოიყენოთ, Everrest-ს სხვადასხვა endpoint-ები სრულიად უფასოდ.
:::

Everrest-ის Swagger გამოიყურება შემდგომ ნაირად:

<iframe src="https://api.everrest.educata.dev/swagger" data-is-external-source="true"></iframe>

ვებგვერდზე ჩანს სხვადასხვა endpoint-ები, ყოველივე ეს დაგენერირებულია სერვერის მხარეს.

მაგალითისთვის დააკლიკეთ `/shop/products/all`-ს `GET` მოთხოვნას, შემდგომ **Try it out**-ს (შესაძლებელია სხვა ენაზე ეწეროს ინტერნაციონალიზაციიდან გამომდინარე), ორი პარამეტრი გამოჩნდება სადაც სურვილისამებრ შეგიძლიათ გამოიყენოთ ისინი, დააწექით **Execute**.

**Execute**-ზე დაკლიკების შემდგომ გამოჩნდება შემდგომი ინფორმაცია:

- [Curl](https://curl.se/) - ეს არის Command line-ს ხელსაწყო, რომელიც დეველოპერებს აძლევს საშუალებას ინფორმაცია გააგზავნონ სერვერთან.
- Requiest URL - რომელი მისამართიდან მოვითხოვეთ ინფორმაცია.
- Server response - სერერის მიერ დაბრუნებული ინფორმაცია:
  - Code - დაბრუნებული [სტატუს კოდი](./doc/guides/javascript/rest-api#სტატუს_კოდი) სერვერიდან.
  - Response body - სერვერის მიერ დაბრუნებული მნიშვნელობა.

Swagger-ს გამოყენებით გავაგზავნეთ მოთხოვნა EverREST-ს სერვერზე და დაბრუნებული მნიშვნელობებიც ვიხილეთ ვებგვერდზევე.

ჩვენს შემთხვევაში ეს დაბრუნებული ინფორმაცია იყო პროდუქტების სია. შეგვიძლია იგივე endpoint-ი გამოვიყენოთ და ავაგოთ მცირედი მაღაზიის გვერდი.

## მაღაზიის ვებგვერდი

მაღაზიის ვებგვერდზე პირველ რიგში საჭიროა პროდუქტები, მის გარეშე ვებგვერდს თითქმის აზრი არ აქვს. პრაქტიკისთვის ავაწყოთ მცირედი ვებგვერდი, სადაც გამოვაჩენთ პროდუქტებს.

პირველ რიგში შემოვიტანოთ [Bootstrap](https://getbootstrap.com/) ან სხვა ნებისმიერი UI ბიბლიოთეკა/ფრეიმვორკი და მოვათავსოთ `head`-ში.

```html
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous" />
```

`body`-ს მხარეს კი უნდა შევქმნათ ელემენტი, რომელიც გამოიტანს ვიზუალზე პროდუქტებს:

```html
<main class="container-xxl m-auto pt-4">
  <section id="products-display" class="container-fluid d-flex flex-wrap justify-content-center align-items-center align-content-center gap-3"></section>
</main>
```

:::info
ამ მაგალითში გამოყენებულია Bootstrap-ს კლასები, სურვილისამებრ თუ შეცვლით ბიბლიოთეკას, უნდა გამოიყენოთ მისი კლასები.
:::

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

შევქმენით `init` ფუნქცია, სადაც დაიწყება მთლიანი ლოგიკის გაშვება. `try...catch` ბლოკში ვათავსებთ, წარუმატებელი შემთხვევის გასაკონტროლებლად, რაც ამ შემთხვევაში უბრალოდ გამოიტანს შეცდომას კონსოლში. თუ მოთხოვნა წარმატებული იყო დავინახავთ კონსოლში ობიექტს, რომელსაც გააჩნია შემდგომი მნიშვნელობები:

- limit - მოთხოვნის მიხედვით მაქსიმუმ რამდენი პროდუქტი უნდა ჩაიტვირთოს (`page_size` არის გაწერილი მისამართის ბოლოს query პარამეტრის სახით), ამ შემთხვევაში 2.
- total - რამდენი პროდუქტი გამოაგზავნა სერვერმა ჯამში.
- page - მერამდენე გვერდზე ვიმყოფებთ, გამოიყენება Pagination-ს დროს.
- skip - რამდენი პროდუქტი გამოვტოვეთ, გამოიყენება Pagination-ს დროს.
- products - პროდუქტების მასივი.

ამ ინფორმაციის გამოყენებით კი ვიზუალზე შეგვიძლია ლამაზი პროდქუტები გამოვიტანოთ:

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

:::warning
შესაძლოა სხვა სერვერმა, სხვა ობიექტი დააბრუნოს. ეს ინფორმაცია არ არის **კონსისტენტური**, მაგრამ ძირითადი იდეა იგივეა.
:::

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
