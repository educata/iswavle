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
