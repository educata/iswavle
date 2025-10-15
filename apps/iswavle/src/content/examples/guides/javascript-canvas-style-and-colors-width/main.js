const widthCanvas = document.querySelector('#widthExample');

if (widthCanvas.getContext) {
  const ctx = widthCanvas.getContext('2d');
  for (let i = 0; i < 10; i++) {
    ctx.lineWidth = 1 + i;
    ctx.beginPath();
    ctx.moveTo(5 + i * 14, 5);
    ctx.lineTo(5 + i * 14, 140);
    ctx.stroke();
  }
}
