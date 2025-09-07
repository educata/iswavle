function getRandomRGBColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}

console.log(getRandomRGBColor()); // "rgb(0, 130, 230)"
console.log(getRandomRGBColor()); // "rgb(27, 155, 255)"

const foods = [
  'ხინკალი',
  'ხაჭაპური',
  'მწვადი',
  'საცივი',
  'ელარჯი',
  'ფხალი',
  'ჩიხირთმა',
  'ხარჩო',
  'ლობიო',
];

const randomIndex = Math.floor(Math.random() * foods.length); // 2
console.log(foods[randomIndex]); // 'მწვადი'

function getRandomFoodsForWeek(array) {
  const result = [];
  for (let i = 0; i < 7; ) {
    const randomIndex = Math.floor(Math.random() * array.length);
    const randomFood = array[randomIndex];
    if (!result.includes(randomFood)) {
      result.push(randomFood);
      i++;
    }
  }
  return result;
}

console.log(getRandomFoodsForWeek(foods)); // ["ჩიხირთმა", "ხინკალი", "ხარჩო", "საცივი", "ელარჯი", "ლობიო", "მწვადი"]
console.log(getRandomFoodsForWeek(foods)); // ["ხინკალი", "ფხალი", "ჩიხირთმა", "ლობიო", "საცივი", "მწვადი", "ხარჩო"]
