const triangleCanvas = document.querySelector('#triangleExample');

if (triangleCanvas.getContext) {
  const ctx = triangleCanvas.getContext('2d');
  ctx.beginPath();
  ctx.moveTo(75, 50);
  ctx.lineTo(100, 75);
  ctx.lineTo(100, 25);
  ctx.fill();
} else {
  console.log('ბრაუზერს არ აქვს კანვასის მხარდაჭერა');
}
