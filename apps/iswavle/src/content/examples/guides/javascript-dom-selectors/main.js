const h1 = document.querySelector('h1');
const highlight = document.querySelector('.highlight');
const firstParagraphInMain = document.querySelector('main > p:first-child');
const secondParagraphInMain = document.querySelector('main > p:nth-of-type(3)');
const secondParagraph = document.querySelector('#secondParagraph');
const paragraphs = document.querySelectorAll('p');
const highlights = document.querySelectorAll('.highlight');
const excludeParagraphs = document.querySelectorAll(':not(p)');
const genders = document.getElementsByName('gender');
const secondParagraphById = document.getElementById('#secondParagraph');

console.log(h1);
console.log(paragraphs);
console.log(highlight);
console.log(highlights);
console.log(secondParagraph);
console.log(genders);
console.log(firstParagraphInMain);
console.log(secondParagraphInMain);
console.log(excludeParagraphs);
console.log(secondParagraphById);

const parent = document.querySelector('#parent');
const child = document.querySelector('#child2');
console.log(parent.childNodes); // [ #text, <div id="child1"></div>, #text, <div id="child2"></div>, #text, <div id="child3"></div>, #text ]
console.log(parent.children); // [ <div id="child1"></div>, <div id="child2"></div>, <div id="child3"></div> ]
console.log(parent.firstElementChild); // <div id="child1"></div>
console.log(parent.lastElementChild); // <div id="child3"></div>
console.log(child.parentNode); // <div id="parent">...</div>
console.log(child.parentnextElementSiblingNode); // <div id="child3"></div>
console.log(child.previousElementSibling); // <div id="child1"></div>
