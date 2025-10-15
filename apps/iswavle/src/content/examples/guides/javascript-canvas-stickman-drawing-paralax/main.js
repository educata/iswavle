const canvas = document.querySelector('#gameCanvas');
const bgImage = document.querySelector('#bgImage');
const ctx = canvas.getContext('2d');

const config = {
  canvas_sizes: {
    width: 800,
    height: 720,
  },
  x: 0,
  x2: bgImage.width,
  moveSpeedX: 2,
};

function initCanvasSizes() {
  canvas.width = config.canvas_sizes.width;
  canvas.height = config.canvas_sizes.height;
}

function drawBackground() {
  ctx.drawImage(bgImage, config.x, 0);
  ctx.drawImage(bgImage, config.x2, 0);
}

function animate() {
  ctx.clearRect(0, 0, config.canvas_sizes.width, config.canvas_sizes.height);

  config.x -= config.moveSpeedX;
  config.x2 -= config.moveSpeedX;

  if (config.x <= -bgImage.width) {
    config.x = config.x2 + bgImage.width;
  }

  if (config.x2 <= -bgImage.width) {
    config.x2 = config.x + bgImage.width;
  }

  if (config.x >= bgImage.width) {
    config.x = config.x2 - bgImage.width;
  }

  if (config.x2 >= bgImage.width) {
    config.x2 = config.x - bgImage.width;
  }

  drawBackground();
  requestAnimationFrame(animate);
}

initCanvasSizes();
drawBackground();
animate();
