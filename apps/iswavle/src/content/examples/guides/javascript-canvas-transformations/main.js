const stateCanvas = document.querySelector('#stateCanvas');
if (stateCanvas.getContext) {
  const ctx = stateCanvas.getContext('2d');
  ctx.fillRect(0, 0, 150, 150); // დავხატოთ შავი მართკუთხედი ნაგულისხმევი თვისებებით
  ctx.save(); // შევინახოთ სთეითი

  ctx.fillStyle = '#09F'; // შევუცვალოთ ფერი
  ctx.fillRect(15, 15, 120, 120); // დავხატოთ ლურჯი მართკუთხედი ახალი თვისებებით
  ctx.save(); // შევინახოთ ამჟამინდელი სთეითი

  ctx.fillStyle = '#FFF'; // შევუცვალოთ ფერი
  ctx.globalAlpha = 0.5;
  ctx.fillRect(30, 30, 90, 90); // დავხატოთ თეთრი ფერის მართკუთხედი ახალი თვისებებით

  ctx.restore(); // აღვადგინოთ ბოლო სთეითი
  ctx.fillRect(45, 45, 60, 60); // დავხატოთ მართკუთხედი ლურჯი თვსიებებით

  ctx.restore(); // აღვადგინოთ ბოლოს წინა სთეითი
  ctx.fillRect(60, 60, 30, 30); // დავხატოთ შავი ფერის მართკუთხედი შავი თვისებებით
}

const translateCanvas = document.querySelector('#translateCanvas');
if (translateCanvas.getContext) {
  const ctx = translateCanvas.getContext('2d');
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      ctx.save();
      ctx.fillStyle = `rgb(${51 * i}, ${255 - 51 * i}, 255)`;
      ctx.translate(10 + j * 50, 10 + i * 50);
      ctx.fillRect(0, 0, 25, 25);
      ctx.restore();
    }
  }
}

const rotateCanvas = document.querySelector('#rotateCanvas');
if (rotateCanvas.getContext) {
  const ctx = rotateCanvas.getContext('2d');
  // მარცხენა მართკუთხედი, რომელიც ბრუნვას იწყებს კანვასის დასაწყისიდან
  ctx.save();
  // ლურჯი მართკუთხედი
  ctx.fillStyle = '#0095DD';
  ctx.fillRect(30, 30, 100, 100);
  ctx.rotate((Math.PI / 180) * 25);
  // ნაცრისფერი მართკთხედი
  ctx.fillStyle = '#4D4E53';
  ctx.fillRect(30, 30, 100, 100);
  ctx.restore();

  // მარჯვენა მართკუთხედი, რომელიც ბრუნვას იწყებს მართკუთხედის ცენტრიდან
  // დავხატოთ ლურჯი მართკუთხედი
  ctx.fillStyle = '#0095DD';
  ctx.fillRect(150, 30, 100, 100);

  ctx.translate(200, 80); // გადავიტანოთ მარკუთხედი ცენტრში
  // x = x + 0.5 * სიგანე
  // y = y + 0.5 * სიმაღლე
  ctx.rotate((Math.PI / 180) * 25); // ვაბრუნოთ
  ctx.translate(-200, -80); // უკან გადავიტანოთ

  // დავხატოთ ნაცრისფერი მართკუთხედი
  ctx.fillStyle = '#4D4E53';
  ctx.fillRect(150, 30, 100, 100);
}

const scaleCanvas = document.querySelector('#scaleCanvas');

if (scaleCanvas.getContext) {
  const ctx = scaleCanvas.getContext('2d');
  ctx.save();
  ctx.scale(10, 3);
  ctx.fillRect(1, 10, 10, 10);
  ctx.restore();

  // ჰორიზონტალურად შებრუნება
  ctx.scale(-1, 1);
  ctx.font = '48px serif';
  ctx.fillText('ISWAVLE', -210, 120);
}
