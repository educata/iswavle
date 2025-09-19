console.log(Number(undefined)); // NaN
console.log(Number(null)); // 0
console.log(Number(true)); // 1
console.log(Number(false)); // 0
console.log(Number('22')); // 22
console.log(Number('22e')); // NaN
console.log(Number('22e3')); // 22000

console.log(Number.MAX_SAFE_INTEGER); // 9007199254740991
console.log(Number.MAX_SAFE_INTEGER + 1); // 9007199254740992
console.log(Number.MAX_SAFE_INTEGER + 2); // 9007199254740992
console.log(Number.MAX_SAFE_INTEGER + 1 === Number.MAX_SAFE_INTEGER + 2); // true

let someNumber = 2;
console.log(2..toFixed(2)); // პროტოტიპის მეთოდი
console.log((2).toFixed(2)); // პროტოტიპის მეთოდი
console.log(someNumber.toFixed(2)); // პროტოტიპის მეთოდი
console.log(Number.isNaN(2)); // ობიექტის მეთოდი

function rgbToHex(color) {
  const rgbValues = color.match(/\d+/g);
  if (!rgbValues || rgbValues.length !== 3) {
    // არასწორი rgb ფორმატი
    return null;
  }
  const hexValues = rgbValues.map((value) => {
    const hex = Number.parseInt(value).toString(16);
    return hex.length === 1 ? `0${hex}` : hex;
  });
  return `#${hexValues.join('')}`;
}

function hexToRgb(color) {
  const hexValues = color.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
  if (!hexValues || hexValues.length !== 4) {
    // არასწორი hex ფორმატი
    return null;
  }
  return `rgb(${parseInt(hexValues[1], 16)},${parseInt(hexValues[2], 16)},${parseInt(hexValues[3], 16)})`;
}

console.log(rgbToHex('rgb(10,20,30)')); // "#0a141e"
console.log(hexToRgb('#0a141e')); // "rgb(10,20,30)"