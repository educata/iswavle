const basicStylesCanvas = document.querySelector('#basicStylesCanvas');

if (basicStylesCanvas.getContext) {
  const ctx = basicStylesCanvas.getContext('2d');
  ctx.font = '22px serif';
  ctx.strokeStyle = 'steelblue';
  ctx.textAlign = 'center';
  ctx.strokeText('Educata', 100, 44);
}
