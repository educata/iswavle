const paragraph = document.querySelector('p.quote');
console.log(paragraph.textContent); // დღევანდელი შემთხვევითი ციტატა: ვების სწავლა iswavle.com-ზე მარტივია

const weatherResult = document.querySelector('#weatherResult');
const goodBtn = document.querySelector('#goodBtn');
const badBtn = document.querySelector('#badBtn');

goodBtn.addEventListener('click', () => {
  weatherResult.textContent = 'კარგი';
});

badBtn.addEventListener('click', () => {
  weatherResult.textContent = 'ცუდი';
});

const paragraph2 = document.querySelector('p.weather-text');
console.log(paragraph2.innerText); // 'დღეს კარგი ამინდია'
console.log(paragraph2.textContent); // 'დღეს კარგი ამინდია მაგრამ გაწვიმებას აპირებს'

const firstResult = document.querySelector('#firstResult');
const secondResult = document.querySelector('#secondResult');
const thirdResult = document.querySelector('#thirdResult');
const renderBtn = document.querySelector('#renderBtn');

renderBtn.addEventListener('click', () => {
  firstResult.textContent = '<i>დახრილი ტექსტი</i>';
  secondResult.innerText = '<i>დახრილი ტექსტი</i>';
  thirdResult.innerHTML = '<i>დახრილი ტექსტი</i>';
});

const box = document.querySelector('.box');
box.style.width = '150px';
box.style.height = '150px';
box.style.backgroundColor = 'steelblue';

const dynamicStyle = document.querySelector('#dynamicStyle');
const fontSizeInput = document.querySelector('#fontSize');
const colorSelect = document.querySelector('#color');

fontSizeInput.addEventListener('change', function () {
  const size = Number(this.value); // ამოვიღოთ ველის მნიშვნელობა და გადავიყვანოთ რიცხვში
  dynamicStyle.style.fontSize = `${size}px`; // dynamicStyle-ს ფონტის ზომა
});

colorSelect.addEventListener('change', function () {
  // შევცვალოთ dynamicStyle ფერი შემთხვევითი ფერით ან სტატიკურად განთავსებული ფერით
  dynamicStyle.style.color =
    this.value === 'random' ? getRandomColor() : this.value;
});

function getRandomColor() {
  // დავაგენერიროთ შემთხვევითი რიცხვი 0 - 256, შემდეგ კი შევფუთოთ rgb ფორმატში
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r},${g},${b})`;
}

const getAttrBtn = document.querySelector('#getAttrBtn');
getAttrBtn.addEventListener('click', function () {
  console.log(this.getAttribute('data-count')); // '2'
  console.log(this.getAttribute('src')); // null
});

const setAttrBtn = document.querySelector('#setAttrBtn');
setAttrBtn.addEventListener('click', function () {
  this.setAttribute('data-count', '22');
});

const removeAttrBtn = document.querySelector('#removeAttrBtn');
removeAttrBtn.addEventListener('click', function () {
  this.removeAttribute('data-count');
});

const hasAttrBtn = document.querySelector('#hasAttrBtn');
hasAttrBtn.addEventListener('click', function () {
  console.log(this.hasAttribute('data-count')); // true
});

const user = document.querySelector('#user');
console.log(user.attributes); // {0: id, 1: data-id, id: id, data-id: data-id, length: 2}
console.log(user.dataset); // {id: "123456789"}

const addClassContainer = document.querySelector('#addClassContainer');
const addClassBtn = document.querySelector('#addClass');

addClassBtn.addEventListener('click', () => {
  addClassContainer.classList.add('animate');
});

const removeClassContainer = document.querySelector('#removeClassContainer');
const removeClassBtn = document.querySelector('#removeClass');

removeClassBtn.addEventListener('click', () => {
  removeClassContainer.classList.remove('animate');
});

const toggleClassContainer = document.querySelector('#toggleClassContainer');
const toggleClassBtn = document.querySelector('#toggleClass');

toggleClassBtn.addEventListener('click', () => {
  toggleClassContainer.classList.toggle('animate');
});

const checkOnClass = document.querySelector('#checkOnClass');
console.log(checkOnClass.classList.contains('animate')); // true რადგან შეიცავს
console.log(checkOnClass.classList.contains('circle')); // fasle რადგან არ შეიცავს

const article = document.querySelector('article');
article.innerHTML += `
  <img src="https://everrest.educata.dev/logo.png" alt="სტატიის სურათი">
`;

const image = document.createElement('img');
image.src = 'https://everrest.educata.dev/logo.png';
image.alt = 'სტატიის სურათი';
article.appendChild(image);

const removeParagraph = document.querySelector('#removeParagraph');
const removeParagraphBtn = document.querySelector('#removeParagraphBtn');

removeParagraphBtn.addEventListener('click', () => {
  removeParagraph.innerHTML = '';
});

const removeParagraph2 = document.querySelector('#removeParagraph2');
const removeParagraphBtn2 = document.querySelector('#removeParagraphBtn2');

removeParagraphBtn2.addEventListener('click', () => {
  removeParagraph2.remove();
});

const removeParagraph3 = document.querySelector('#removeParagraph3');
const removeParagraphBtn3 = document.querySelector('#removeParagraphBtn3');

removeParagraphBtn3.addEventListener('click', () => {
  if (removeParagraph3.parentNode) {
    removeParagraph3.parentNode.removeChild(removeParagraph);
  }
});

const deleteFromParentNodeBtn = document.querySelector('#deleteFromParentNode');
const parent = document.querySelector('#parent');
const child = document.querySelector('#child');

deleteFromParentNodeBtn.addEventListener('click', () => {
  parent.removeChild(child);
});

const deleteAllNodeBtn = document.querySelector('#deleteAllNodeBtn');
const parentNode = document.querySelector('#parentNode');

deleteAllNodeBtn.addEventListener('click', () => {
  while (parentNode.firstChild) {
    parentNode.removeChild(parentNode.firstChild);
  }
});
