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
  originalMoveSpeedX: 2,
  isMoving: false,
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

  if (config.isMoving) {
    requestAnimationFrame(animate);
  }
}

initCanvasSizes();
drawBackground();

document.addEventListener('keydown', function (event) {
  if (event.key === 'ArrowRight') {
    config.moveSpeedX = Math.abs(config.originalMoveSpeedX);
    if (!config.isMoving) {
      config.isMoving = true;
      animate();
    }
  } else if (event.key === 'ArrowLeft') {
    config.moveSpeedX = -Math.abs(config.originalMoveSpeedX);
    if (!config.isMoving) {
      config.isMoving = true;
      animate();
    }
  }
});

document.addEventListener('keyup', function (event) {
  if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
    config.isMoving = false;
  }
});
