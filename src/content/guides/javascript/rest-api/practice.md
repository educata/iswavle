---
title: 'პრაქტიკა'
description: 'REST API გამოყენება JavaScript-ში?'
keywords: 'swagger, rest api, get, post, put, patch, delete, fetch, xhr, everrest, educata, postman, insomnia'
---

დროა თეორია საქმეს მოვახმაროთ! ავაწყოთ პატარა აპლიკაცია, რათა HTTP მოთხოვნებზე ცოდნა გავამყაროთ.
ამ მაგალითში ვიხელმძთვანელებთ [ევერესტის მაღაზიის ბექ-ენდით](https://everrest.educata.dev/shop.html),
რომელიც საშუალებას გვაძლევს, ავაწყოთ მარტივი ონლაინ მაღაზია.

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


## შეჯამება

ამ სტატიაში განვიხილეთ თუ რა არის Swagger და როგორ დაამუშავოთ `GET` მოთხოვნა `fetch`-ს გამოყენებით. ასევე განვიხილეთ Postman-ის და Insomnia-ს გამოყენებაც.
