const textCanvas = document.querySelector('#textCanvas');

if (textCanvas.getContext) {
  const ctx = textCanvas.getContext('2d');
  ctx.font = '22px serif';
  ctx.fillText('Iswavle', 22, 44);
}
