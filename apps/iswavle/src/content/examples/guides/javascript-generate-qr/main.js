const form = document.querySelector('form');
const qrDisplay = document.querySelector('#qrDisplay');

const API_URL = 'https://api.everrest.educata.dev';
const QR_CODE_ENDPOINT = 'qrcode/generate';

form.addEventListener('submit', async function (event) {
  event.preventDefault();
  const form = new FormData(this);
  const text = form.get('text');

  if (!text) {
    alert('შეიყვანეთ ტექსტი');
    return;
  }

  try {
    const response = await (
      await fetch(`${API_URL}/${QR_CODE_ENDPOINT}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      })
    ).json();
    qrDisplay.innerHTML = getQRCard(response);
  } catch (error) {
    alert(error);
  }
});

function getQRCard(response) {
  const isUrl = response.text.startsWith('http');
  return `
    <div class="card m-auto" style="width: 18rem;">
      <img style="cursor: pointer" onclick="downloadImage(this)" src="${response.result}" class="card-img-top" alt="${response.text} QR code">
      <div class="card-body">
        <h5 class="card-title">${response.text}</h5>
        <ul class="list-group">
          <li class="list-group-item">Format: ${response.format}</li>
          <li class="list-group-item">Type: ${response.type}</li>
          <li class="list-group-item">Error Correction Level: ${response.errorCorrectionLevel}</li>
        </ul>
        ${isUrl ? `<a href="${response.text}" class="btn btn-primary mt-3">მისამართი</a>` : ''}
      </div>
    </div>
  `;
}

function downloadImage(element) {
  const src = element.src;
  const link = document.createElement('a');
  link.href = src;
  link.download = 'qr-code.png';
  link.hidden = true;
  link.style.display = 'none';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
