const textCanvas = document.querySelector('#textCanvas');

if (textCanvas.getContext) {
  const ctx = textCanvas.getContext('2d');
  ctx.font = '22px serif';
  ctx.fillText('Iswavle', 22, 44);
}

const strokeTextCanvas = document.querySelector('#strokeTextCanvas');

if (strokeTextCanvas.getContext) {
  const ctx = strokeTextCanvas.getContext('2d');
  ctx.font = '22px serif';
  ctx.strokeText('EverREST', 22, 44);
}

const basicStylesCanvas = document.querySelector('#basicStylesCanvas');

if (basicStylesCanvas.getContext) {
  const ctx = basicStylesCanvas.getContext('2d');
  ctx.font = '22px serif';
  ctx.strokeStyle = 'steelblue';
  ctx.textAlign = 'center';
  ctx.strokeText('Educata', 100, 44);
}
