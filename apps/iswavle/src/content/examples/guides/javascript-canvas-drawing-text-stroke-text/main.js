const strokeTextCanvas = document.querySelector('#strokeTextCanvas');

if (strokeTextCanvas.getContext) {
  const ctx = strokeTextCanvas.getContext('2d');
  ctx.font = '22px serif';
  ctx.strokeText('EverREST', 22, 44);
}
