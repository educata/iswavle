const fillStyleCanvas = document.querySelector('#fillStyleExample');

if (fillStyleCanvas.getContext) {
  const ctx = fillStyleCanvas.getContext('2d');
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 6; j++) {
      ctx.fillStyle = `rgb(${Math.floor(255 - 42.5 * i)} ${Math.floor(255 - 42.5 * j)} 0)`;
      ctx.fillRect(j * 25, i * 25, 25, 25);
    }
  }
}

const strokeStyleCanvas = document.querySelector('#strokeStyleExample');

if (strokeStyleCanvas.getContext) {
  const ctx = strokeStyleCanvas.getContext('2d');
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 6; j++) {
      ctx.strokeStyle = `rgb(0 ${Math.floor(255 - 42.5 * i)} ${Math.floor(255 - 42.5 * j)})`;
      ctx.beginPath();
      ctx.arc(12.5 + j * 25, 12.5 + i * 25, 10, 0, 2 * Math.PI, true);
      ctx.stroke();
    }
  }
}

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

const lineCapCanvas = document.querySelector('#lineCapExample');

if (lineCapCanvas.getContext) {
  const ctx = lineCapCanvas.getContext('2d');
  ctx.strokeStyle = '#09f';
  ctx.beginPath();
  ctx.moveTo(10, 10);
  ctx.lineTo(140, 10);
  ctx.moveTo(10, 140);
  ctx.lineTo(140, 140);
  ctx.stroke();
  ctx.strokeStyle = 'black';
  ['butt', 'round', 'square'].forEach((lineCap, i) => {
    ctx.lineWidth = 15;
    ctx.lineCap = lineCap;
    ctx.beginPath();
    ctx.moveTo(25 + i * 50, 10);
    ctx.lineTo(25 + i * 50, 140);
    ctx.stroke();
  });
}

const lineJoinCanvas = document.querySelector('#lineJoinExample');

if (lineJoinCanvas.getContext) {
  const ctx = lineJoinCanvas.getContext('2d');
  ctx.lineWidth = 10;
  ['round', 'bevel', 'miter'].forEach((lineJoin, index) => {
    ctx.lineJoin = lineJoin;
    ctx.beginPath();
    ctx.moveTo(-5, 5 + index * 40);
    ctx.lineTo(35, 45 + index * 40);
    ctx.lineTo(75, 5 + index * 40);
    ctx.lineTo(115, 45 + index * 40);
    ctx.lineTo(155, 5 + index * 40);
    ctx.stroke();
  });
}
