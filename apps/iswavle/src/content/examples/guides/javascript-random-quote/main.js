const quoteBtn = document.querySelector('#quoteBtn');
const authorDisplay = document.querySelector('#author');
const typeDisplay = document.querySelector('#type');
const quoteDisplay = document.querySelector('#quote');

const API_URL = 'https://api.everrest.educata.dev';
const RANDOM_QUOTE_ENDPOINT = 'quote/random';

quoteBtn.addEventListener('click', getQuote);

async function getQuote() {
  try {
    const quote = await (
      await fetch(`${API_URL}/${RANDOM_QUOTE_ENDPOINT}`)
    ).json();
    handleQuote(quote);
  } catch (error) {
    handleQuote({
      _id: '404',
      type: 'error',
      author: 'Iswavle',
      quote: 'An error occurred while fetching the quote.',
    });
  }
}

function handleQuote(response) {
  const { _id, type, author, quote } = response;
  authorDisplay.textContent = author;
  typeDisplay.textContent = `${type} / ${_id}`;
  quoteDisplay.textContent = quote;
}

getQuote();
