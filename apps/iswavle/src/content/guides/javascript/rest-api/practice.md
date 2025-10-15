---
title: 'პრაქტიკა'
description: 'REST API გამოყენება JavaScript-ში?'
keywords: 'swagger, rest api, get, post, put, patch, delete, fetch, xhr, everrest, educata, postman, insomnia'
---

დროა თეორია საქმეს მოვახმაროთ! ამ გაკვეთილში ვისწავლით, როგორ შევქმნათ მარტივი ონლაინ მაღაზია REST API-ს გამოყენებით.
ვიხელმძთვანელებთ [ევერესტის მაღაზიის ბექ-ენდით](https://everrest.educata.dev/shop.html), რომელიც საშუალებას გვაძლევს,
მოვიძიოთ პროდუქტები.

გაითვალისწინეთ, რომ ნამდვილი დეველოპმენტის პროცესი ისე სწორხაზოვნად არ მიდის,
როგორს ეს ამ გაკვეთილშია ასახული. გარდაუვალია, რომ გამოჩნდება ხარვეზები, დავუშვებთ შეცდომებს,
მოგიწევთ არსებული კოდის გადაკეთება და ა.შ.
აქ ფაქტობრივად მზა აპლიკაცია გვაქვს, რომელსაც ნაწილ-ნაწილ ვხსნით.

რჩევები:

- თავდაპირველად თქვენით სცადეთ აპლიკაციის აწყობა.
- დაყავით აწყობის პროცესი პატარ-პატარა ნაბიჯებად:
  - ჯერ შექმენით შეტყობინები;
  - დაამატეთ უბრალოდ ელემენტარული პროდუქტების მოთხოვნის ლოგიკა, შეამოწმეთ კონსოლში, რომ ის დაუძახებს;
  - დაამატეთ პროდუქტების ბარათებად გამოსახვის ლოგიკა;
  - დაამატეთ მოძიების მოთხოვნა;
  - დააკავშირეთ მოძიების მოთხოვნის ლოგიკა ფორმის ელემენტთან;
  - გააერთიანეთ მოძიებისა და პროდუქტების გამოსახვის ლოგიკა;
- თითოეულ პატარა ნაბიჯზე გამოიყენეთ `consol.log()`-ები, რომ შეამოწმოთ, როგორ მუშაობს ყველაფერი.

## ნაბიჯი 1: HTML სტრუქტურის შექმნა

პირველ რიგში შევქმნათ HTML ფაილი ჩვენი აპლიკაციისთვის.
ელემენტების დიდი ნაწილი იქნება ცარიელი, რადგან მასში კონტენტს დინამიურად განვათავხებთ ჯავასკრიპტით.

```html
<!doctype html>
<html lang="ka">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>ონლაინ მაღაზია - პროდუქტები</title>
    
    <!-- Bootstrap CSS-ის შემოტანა -->
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
      rel="stylesheet"
      integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH"
      crossorigin="anonymous"
    />
    <link rel="stylesheet" href="./style.css" />
  </head>
  <body>
    <main class="container-xxl m-auto pt-4">
      <!-- ძიების სექცია -->
      <section class="mb-4">
        <div class="row justify-content-center">
          <div class="col-md-6">
            <form id="search-form" class="d-flex gap-2">
              <input
                type="text"
                id="search-input"
                class="form-control"
                placeholder="პროდუქტის სახელი ან ბრენდი..."
              />
              <button type="submit" class="btn btn-primary">ძიება</button>
            </form>
          </div>
        </div>
      </section>

      <!-- პროდუქტების ჩვენების სექცია -->
      <section
        id="products-display"
        class="container-fluid d-flex flex-wrap justify-content-center align-items-center align-content-center gap-3"
      ></section>

      <!-- ჩატვირთვის ინდიკატორი -->
      <div id="loading" class="text-center d-none">
        <div class="spinner-border" role="status">
          <span class="visually-hidden">იტვირთება...</span>
        </div>
      </div>
    </main>
    <script src="./main.js"></script>
  </body>
</html>
```

**რას ვაკეთებთ აქ:**
- ვამატებთ Bootstrap-ის CSS-ს ლამაზი UI-სთვის
- ვქმნით ძიების ფორმას input ველით და ღილაკით
- ვამატებთ კონტეინერს პროდუქტების ჩვენებისთვის
- ვამატებთ ჩატვირთვის ინდიკატორს

## ნაბიჯი 2: JavaScript კოდის დაწყება

ახლა შევქმნათ JavaScript ფაილი და დავიწყოთ ძირითადი ფუნქციონალის დამატება.
ვიწყებთ აბსტრაქტულად — ზოგადად როგორ უნდა ჩაიტვირთოს აპლიკაცია. კონკრეუტლი ფუნქციების იმპლემენტაციას მერე მივხედავთ:

```javascript
// DOM ელემენტების მიღება
const productsDisplay = document.querySelector('#products-display');
const searchForm = document.querySelector('#search-form');
const searchInput = document.querySelector('#search-input');
const loadingIndicator = document.querySelector('#loading');

// API-ს მისამართები
const API_URL = 'https://api.everrest.educata.dev/shop/products';
const API_ALL = `${API_URL}/all`;
const API_SEARCH = `${API_URL}/search`;
const PAGE_SIZE = 10;

// აპლიკაციის ინიციალიზაცია
async function init() {
  try {
    showLoading(true); // დასამატებელია
    await loadProducts(); // დასამატებელია
  } catch (error) {
    showError('პროდუქტების ჩატვირთვა ვერ მოხერხდა: ' + error.message); // დასამატებელია
  } finally {
    showLoading(false);
  }
}

// აპლიკაციის გაშვება
init();
```

**რას ვაკეთებთ აქ:**
- ვიღებთ საჭირო DOM ელემენტებს JavaScript-ში
- ვსაზღვრავთ API-ს მისამართებს და კონსტანტებს
- ვქმნით `init` ფუნქციას აპლიკაციის დასაწყებად
- ვიყენებთ `try...catch` შეცდომების მართვისთვის

დროებით შეგვიძლია ჩამოვწეროთ იმ ფუნქციების დეკლარაცია, რომლებსაც შემდეგ შევავსებთ:

```js
function showLoading() {}

function loadProducts() {}

function showError() {}
```

## ნაბიჯი 3: URL-ის კონსტრუქცია და API მოთხოვნები

მივხედოთ პროდუქტების ჩატვირთვის ლოგიკას. `loadProducts()` შევქმნათ, რომელიც პროდუქტებს ჩატვირთავს და გამოსახავს.
ფუნქციონალი ორ ნაწილად გავყოთ: `getProducts()` მოითხოვს პროდუქტებს პარამეტრების მიხედვით,
ხოლო `loadProducts()` ამ ფუნქციას დაუძახებს და გამოიყენებს `renderProducts()` (ჯერ არ შეგვიქმნია) რომ  პროდუქტები გამოსახოს.

```javascript
// პროდუქტების მიღება API-დან
async function getProducts({ pageSize = PAGE_SIZE, page = 1, keywords = '' }) {
  const url = new URL(keywords ? API_SEARCH : API_ALL);
  url.searchParams.set('page_size', pageSize);
  url.searchParams.set('page_index', page);
  
  if (keywords) {
    url.searchParams.set('keywords', keywords);
  }

  console.log('მოთხოვნა გაგზავნილია:', url.toString());
  
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error(`HTTP შეცდომა! სტატუსი: ${response.status}`);
  }
  
  return response.json();
}

// პროდუქტების ჩატვირთვა API-დან
async function loadProducts(searchTerm = '') {
  try {
    const response = await getProducts({ 
      pageSize: PAGE_SIZE, 
      page: 1, 
      keywords: searchTerm 
    });
    
    console.log('API პასუხი:', response);
    
    // ვამოწმებთ რომ პასუხი სწორი ფორმატისაა
    if (response.products && Array.isArray(response.products)) {
      displayProducts(response.products);
    } else if (Array.isArray(response)) {
      // ზოგიერთი endpoint პირდაპირ მასივს აბრუნებს
      displayProducts(response);
    } else {
      throw new Error('API-ს პასუხი არასწორი ფორმატისაა');
    }
    
  } catch (error) {
    console.error('პროდუქტების ჩატვირთვის შეცდომა:', error);
    throw error;
  }
}

function displayProducts() {} // დასამატებელია
```

**რას ვაკეთებთ აქ:**
- ვიყენებთ `new URL()` კონსტრუქტორს, URL-ების შესაქმნელად
- ვამატებთ query პარამეტრებს `url.searchParams.set()` მეთოდით
- ვიყენებთ `keywords` პარამეტრს ძიებისთვის
- ვამოწმებთ response-ის სტატუსს და ვკითხულობთ JSON-ს

### URL კლასი

ამ მაგალითში ვიყენებთ `new URL()` კონსტრუქტორს URL-ების შესაქმნელად:

```javascript
// URL-ის შექმნა
const url = new URL(keywords ? API_SEARCH : API_ALL);

// Query პარამეტრების დამატება
url.searchParams.set('page_size', pageSize);
url.searchParams.set('page_index', page);

if (keywords) {
  url.searchParams.set('keywords', keywords);
}
```

**რატომ ვიყენებთ ამ მეთოდს:**
- **უსაფრთხოება**: `url.searchParams.set()` ავტომატურად აკოდირებს პარამეტრებს
- **სიზუსტე**: ვერანდა შეცდომები URL-ის ხელით შექმნისას
- **მოქნილობა**: მარტივად შეგვიძლია პარამეტრების დამატება/წაშლა

რა თქმა უნდა, თუ გეჩქარებათ, პარამეტრები შეგიძლიათ პირდაპირ სტრინგში დაწეროთ:

```js
const url = `https://example.com/products?keywords="${keywords}&pageSize=${10}"`;
```

## ნაბიჯი 4: პროდუქტების ჩვენება გვერდზე

ახლა დავამატოთ ფუნქცია პროდუქტების ვიზუალურად ჩვენებისთვის:

```javascript
// პროდუქტების ჩვენება გვერდზე
function displayProducts(products) {
  console.log('ვაჩენთ პროდუქტებს:', products);
  
  // ვასუფთავებთ არსებულ პროდუქტებს
  productsDisplay.innerHTML = '';
  
  // თუ პროდუქტები ვერ მოიძებნა
  if (products.length === 0) {
    productsDisplay.innerHTML = `
      <div class="col-12 text-center">
        <h4 class="text-muted">პროდუქტი ვერ მოიძებნა</h4>
        <p>სცადეთ სხვა საძიებო სიტყვა</p>
      </div>
    `;
    return;
  }
  
  // ვამატებთ თითოეულ პროდუქტს გვერდზე
  products.forEach((product) => {
    productsDisplay.appendChild(getProductElement(product));
  });
}

// პროდუქტის HTML ელემენტის შექმნა
function getProductElement(product) {
  const element = document.createElement('div');
  element.classList.add('card');
  element.style.maxWidth = '18rem';
  element.style.width = '100%';
  
  // ფასის ფორმატირება ფასდაკლებით (თუ არის)
  const priceDisplay = product.price.beforeDiscount > product.price.current 
    ? `<span class="text-decoration-line-through text-muted">${product.price.beforeDiscount}</span> ${product.price.current}`
    : product.price.current;
  
  element.innerHTML = `
    <div class="card-header text-center">
      ${toCapitalise(product.brand)} / ${toCapitalise(product.category.name)}
    </div>
    <img src="${product.thumbnail}" class="card-img-top pt-3" alt="${product.title} image" style="height: 200px; object-fit: contain;">
    <div class="card-body">
      <h5 class="card-title">${product.title}</h5>
      <p class="card-text">${product.description}</p>
       <ul class="list-group list-group-flush">
        <li class="list-group-item">
          <strong>ფასი:</strong> ${priceDisplay} ${product.price.currency}
          ${product.price.discountPercentage > 0 ? `<span class="badge bg-success ms-2">-${product.price.discountPercentage}%</span>` : ''}
        </li>
        <li class="list-group-item">
          <strong>რეიტინგი:</strong> 
          <span class="text-warning">${'★'.repeat(Math.floor(product.rating))}${'☆'.repeat(5 - Math.floor(product.rating))}</span>
          (${product.rating})
        </li>
        <li class="list-group-item">
          <strong>მარაგი:</strong> 
          <span class="${product.stock > 0 ? 'text-success' : 'text-danger'}">
            ${product.stock > 0 ? product.stock : 'არ არის მარაგში'}
          </span>
        </li>
        <li class="list-group-item">
          <strong>გარანტია:</strong> ${product.warranty} თვე
        </li>
      </ul>
    </div>
    <div class="card-footer text-center">
      დამატებულია: ${new Date(product.issueDate).toLocaleDateString('ka-GE')}
    </div>
  `;
  return element;
}

// სტრინგის პირველი ასოს დიდი ასოდ გაკეთება
function toCapitalise(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
```

**რას ვაკეთებთ აქ:**
- ვასუფთავებთ არსებულ კონტენტს (`innerHTML = ''`)
- ვამოწმებთ პროდუქტების რაოდენობას და ვაჩენთ შესაბამის შეტყობინებას
- ვქმნით Bootstrap card-ებს თითოეული პროდუქტისთვის, სადაც გამოვსახავთ პროდუქტის დეტალებს
- ვარენდერებთ თითოეულ ელემენტს `appendChild()`-ით

## ნაბიჯი 5: ძიების ფუნქციონალის დამატება

ახლა დავამატოთ ძიების ფუნქციონალი:

```javascript
// ძიების ფორმის submit-ის event listener
searchForm.addEventListener('submit', async (e) => {
  e.preventDefault(); // ვაჩერებთ ფორმის ჩაშენებულ submit-ს
  const searchTerm = searchInput.value.trim();
  
  console.log('ძიების ფორმა გაგზავნილია სიტყვით:', searchTerm);
  
  try {
    showLoading(true);
    await loadProducts(searchTerm);
  } catch (error) {
    showError('ძიება ვერ მოხერხდა: ' + error.message);
  } finally {
    showLoading(false);
  }
});
```

**რას ვაკეთებთ აქ:**
- ვამატებთ event listener ფორმის submit-ისთვის
- ვაჩერებთ ფორმის ჩაშენებულ submit-ს (`e.preventDefault()`)
- ვიღებთ ძიების სიტყვას input ველიდან
- ვიყენებთ `loadProducts` ფუნქციას `keywords` პარამეტრით

## ნაბიჯი 6: დამხმარე ფუნქციების დამატება

ბოლოს დავამატოთ დამხმარე ფუნქციები ჩატვირთვის და შეცდომების მართვისთვის:

```javascript
// ჩატვირთვის ინდიკატორის ჩვენება/დამალვა
function showLoading(show) {
  if (show) {
    loadingIndicator.classList.remove('d-none');
  } else {
    loadingIndicator.classList.add('d-none');
  }
}

// შეცდომის შეტყობინების ჩვენება
function showError(message) {
  productsDisplay.innerHTML = `
    <div class="col-12 text-center">
      <div class="alert alert-danger" role="alert">
        <h4>შეცდომა!</h4>
        <p>${message}</p>
      </div>
    </div>
  `;
}
```

**რას ვაკეთებთ აქ:**
- `showLoading` ფუნქცია აჩენს/მალავს ჩატვირთვის ინდიკატორს
- `showError` ფუნქცია აჩენს შეცდომის შეტყობინებას Bootstrap alert-ის სახით

## მუშა აპლიკაცია

ვნახოთ, რა გამოგვივიდა:

<iframe data-url="guides/javascript-products-simple-example" data-title="პროდუქტების გამოტანა და ძიება" data-height="600"></iframe>

## შეჯამება

ამ გაკვეთილში ვისწავლეთ:

- **REST API-ს გამოყენება** `fetch`-ის საშუალებით  
- **URL კონსტრუქცია** `new URL()` და `url.searchParams.set()` მეთოდებით  
- **შეცდომების მართვა** და ჩატვირთვის ინდიკატორის ჩვენება  
- **მოთხოვილი მონაცემების ლამაზად გამოსახვა** ბარათებში სურათის, ფასების, რეიტინგებისა და მარაგის ჩვენებით  
- **Event Listeners-ის გამოყენება** ფორმის submit-ისთვის  

ეს არის მარტივი მაგალითი, რომელიც აჩვენებს, როგორ შეგვიძლია REST API-ის გამოყენებით რეალური ვებ აპლიკაციის შექმნა.
ახლა შეგიძლიათ [გააუმჯობესოთ ეს აპლიკაცია](/playground/simple/guides/javascript-products-simple-example)
და შამოიტანოთ ისეთი ფუნქციონალი, როგორიცაა pagination, ფილტრები ან მომხმარებლის ანგარიშისა და კალათის მართვა.

