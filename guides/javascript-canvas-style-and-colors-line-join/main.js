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
