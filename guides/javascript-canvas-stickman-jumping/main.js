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
  keyPressed: {},
  player: {
    x: 50,
    y: 720 - (91.3 + 50),
    width: 100,
    height: 91.3,
    dir: 'right',
    speed: 1,
    bufferZone: 50,
    isJumping: false,
    jumpVelocity: 10,
    gravity: 0.5,
  },
};

initCanvasSizes();
drawBackground();
drawPlayer();

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

  if (config.player.isJumping) {
    config.player.y -= config.player.jumpVelocity;
    config.player.jumpVelocity -= config.player.gravity;
    if (config.player.y >= 720 - (91.3 + 50)) {
      config.player.y = 720 - (91.3 + 50);
      config.player.isJumping = false;
    }
  }

  drawBackground();
  drawPlayer();

  if (config.isMoving || config.player.isJumping) {
    requestAnimationFrame(animate);
  }
}

function drawPlayer() {
  ctx.fillStyle = 'red';
  ctx.fillRect(
    config.player.x,
    config.player.y,
    config.player.width,
    config.player.height,
  );

  if (
    config.player.dir === 'right' &&
    config.player.x <
      canvas.width - config.player.width - config.player.bufferZone
  ) {
    config.player.x += config.player.speed;
  } else if (
    config.player.dir === 'left' &&
    config.player.x > config.player.bufferZone
  ) {
    config.player.x -= config.player.speed;
  }
}

document.addEventListener('keydown', function (event) {
  config.keyPressed[event.key] = true;

  if (
    (config.keyPressed['ArrowRight'] || config.keyPressed['ArrowLeft']) &&
    config.keyPressed['ArrowUp']
  ) {
    return;
  }

  if (config.keyPressed['ArrowRight'] && !config.player.isJumping) {
    config.moveSpeedX = Math.abs(config.originalMoveSpeedX);
    if (!config.isMoving) {
      config.isMoving = true;
      config.player.dir = 'right';
      animate();
    }
  } else if (config.keyPressed['ArrowLeft'] && !config.player.isJumping) {
    config.moveSpeedX = -Math.abs(config.originalMoveSpeedX);
    if (!config.isMoving) {
      config.isMoving = true;
      config.player.dir = 'left';
      animate();
    }
  }

  if (event.key === 'ArrowUp' && !config.player.isJumping) {
    config.player.isJumping = true;
    config.player.jumpVelocity = 10;
    animate();
  }
});

document.addEventListener('keyup', function (event) {
  delete config.keyPressed[event.key];

  if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
    config.isMoving = false;
  }
});
