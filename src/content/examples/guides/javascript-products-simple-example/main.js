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
    showLoading(true);
    await loadProducts();
  } catch (error) {
    showError('პროდუქტების ჩატვირთვა ვერ მოხერხდა: ' + error.message);
  } finally {
    showLoading(false);
  }
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

// პროდუქტების ჩვენება გვერდზე
function displayProducts(products) {
  console.log('ვაჩენთ პროდუქტებს:', products);
  
  // ვასუფთავებთ არსებულ პროდუქტებს
  productsDisplay.innerHTML = '';
  
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

// ძიების ფორმის submit-ის event listener
searchForm.addEventListener('submit', async (e) => {
  e.preventDefault(); // ვაჩერებთ ფორმის ნატურალურ submit-ს
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

// აპლიკაციის გაშვება
init();
