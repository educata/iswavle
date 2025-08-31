const graphExampleCanvas = document.querySelector('#graphExample');

if (graphExampleCanvas.getContext) {
  const ctx = graphExampleCanvas.getContext('2d');
  const img = new Image();
  img.src = 'https://iswavle.com/assets/images/canvas-graph-bg.png';
  img.onload = () => {
    ctx.drawImage(img, 0, 0);
    ctx.beginPath();
    ctx.moveTo(30, 96);
    ctx.lineTo(70, 66);
    ctx.lineTo(103, 76);
    ctx.lineTo(170, 15);
    ctx.stroke();
  };
}
