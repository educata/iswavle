const API_URL = 'https://api.everrest.educata.dev/shop/products';
const API_ALL = `${API_URL}/all`;
const API_SEARCH = `${API_URL}/search`;
const PAGE_SIZE = 20;

const container = document.querySelector('.container');

function handleSearch() {
  const search = document.querySelector('input');
  const searchBtn = document.querySelector('#search-btn');

  search.addEventListener('input', () => {
    if (!search.value) {
      searchBtn.setAttribute('disabled');
    } else {
      searchBtn.removeAttribute('disabled');
    }
  });

  searchBtn.addEventListener('click', async () => {
    const response = await getProducts({ keywords: search.value });
    renderProducts(response.products);
  });
}

async function renterInitialProducts() {
  const response = await getProducts({ pageSize: 10, page: 1 });
  renderProducts(response.products);
}

function renderProducts(products) {
  container.innerHTML = '';
  products.forEach((product) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
        <img src="${product.thumbnail}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${product.title}</h5>
          <p class="card-text">${product.description}</p>
          <a href="#" class="btn btn-primary">Add to cart</a>
        </div>
        <div class="card-footer">
          <small class="text-body-secondary">$${product.price.current}</small>
        </div>
    `;
    container.appendChild(card);
  });
}

async function getProducts({ pageSize = PAGE_SIZE, page = 1, keywords = '' }) {
  const url = new URL(keywords ? API_SEARCH : API_ALL);
  url.searchParams.set('page_size', pageSize);
  url.searchParams.set('page_index', page);
  if (keywords) {
    url.searchParams.set('keywords', keywords);
  }

  return fetch(url).then((res) => res.json());
}

renterInitialProducts();
handleSearch();
