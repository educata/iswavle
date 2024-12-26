const twoTriangleCanvas = document.querySelector('#twoTriangleExample');

if (twoTriangleCanvas.getContext) {
  const ctx = twoTriangleCanvas.getContext('2d');
  ctx.beginPath();
  ctx.moveTo(25, 25);
  ctx.lineTo(105, 25);
  ctx.lineTo(25, 105);
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(125, 125);
  ctx.lineTo(125, 45);
  ctx.lineTo(45, 125);
  ctx.closePath();
  ctx.stroke();
} else {
  console.log('ბრაუზერს არ აქვს კანვასის მხარდაჭერა');
}
