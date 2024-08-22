const productsDisplay = document.querySelector('#products-display');

async function init() {
  try {
    const response = await (
      await fetch(
        'https://api.everrest.educata.dev/shop/products/all?page_size=3',
      )
    ).json();
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
