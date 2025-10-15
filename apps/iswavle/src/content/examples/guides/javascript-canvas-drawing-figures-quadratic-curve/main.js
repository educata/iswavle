const quadraticCurveCanvas = document.querySelector('#quadraticCurveCanvas');

if (quadraticCurveCanvas.getContext) {
  const ctx = quadraticCurveCanvas.getContext('2d');
  ctx.beginPath();
  ctx.moveTo(75, 25);
  ctx.quadraticCurveTo(25, 25, 25, 62.5);
  ctx.quadraticCurveTo(25, 100, 50, 100);
  ctx.quadraticCurveTo(50, 120, 30, 125);
  ctx.quadraticCurveTo(60, 120, 65, 100);
  ctx.quadraticCurveTo(125, 100, 125, 62.5);
  ctx.quadraticCurveTo(125, 25, 75, 25);
  ctx.stroke();
} else {
  console.log('ბრაუზერს არ აქვს კანვასის მხარდაჭერა');
}
