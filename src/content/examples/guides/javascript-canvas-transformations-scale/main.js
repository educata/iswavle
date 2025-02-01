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
