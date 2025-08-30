const canvas = document.querySelector('canvas');
const restartBtn = document.querySelector('#restartBtn');

const canvasWidth = document.body.clientWidth - 50;
const canvasHeight = 500;

canvas.width = canvasWidth;
canvas.height = canvasHeight;

const config = {
  ballRadius: 10,
  paddle: {
    height: 10,
    width: 75,
    x: (canvas.width - 75) / 2,
  },
  x: canvas.width / 2,
  y: canvas.height - 30,
  dx: 2,
  dy: -2,
  movements: {
    leftPressed: false,
    rightPressed: false,
  },
  brick: {
    row: Math.floor(canvas.width / 75) - 2,
    column: Math.floor(canvas.height / 50),
    width: 75,
    height: 20,
    padding: 10,
    offsetTop: 30,
    offsetLeft: 30,
  },
  bricks: [],
};

const ctx = canvas.getContext('2d');

restartBtn.addEventListener('click', function () {
  restartGame();
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowRight') {
    config.movements.rightPressed = true;
  } else if (event.key === 'ArrowLeft') {
    config.movements.leftPressed = true;
  }
});

document.addEventListener('keyup', (event) => {
  if (event.key === 'ArrowRight') {
    config.movements.rightPressed = false;
  } else if (event.key === 'ArrowLeft') {
    config.movements.leftPressed = false;
  }
});

function fillBricks() {
  for (let i = 0; i < config.brick.column; i++) {
    config.bricks[i] = [];
    for (let j = 0; j < config.brick.row; j++) {
      config.bricks[i][j] = {
        x: 0,
        y: 0,
        status: 1,
      };
    }
  }
}

function drawBricks() {
  for (let i = 0; i < config.brick.column; i++) {
    for (let j = 0; j < config.brick.row; j++) {
      if (config.bricks[i][j].status === 1) {
        let brickX =
          j * (config.brick.width + config.brick.padding) +
          config.brick.offsetLeft;
        let brickY =
          i * (config.brick.height + config.brick.padding) +
          config.brick.offsetTop;
        config.bricks[i][j].x = brickX;
        config.bricks[i][j].y = brickY;
        ctx.beginPath();
        ctx.rect(brickX, brickY, config.brick.width, config.brick.height);
        ctx.fillStyle = '#0095DD';
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}

function drawBall() {
  ctx.beginPath();
  ctx.arc(config.x, config.y, config.ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = '#0095DD';
  ctx.fill();
  ctx.closePath();
}

function drawPaddle() {
  ctx.beginPath();
  ctx.rect(
    config.paddle.x,
    canvas.height - config.paddle.height,
    config.paddle.width,
    config.paddle.height,
  );
  ctx.fillStyle = '#0095DD';
  ctx.fill();
  ctx.closePath();
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  fillBricks();
  drawBricks();
  drawBall();
  drawPaddle();

  config.x += config.dx;
  config.y += config.dy;

  if (
    config.movements.rightPressed &&
    config.paddle.x < canvas.width - config.paddle.width
  ) {
    config.paddle.x += 7;
  } else if (config.movements.leftPressed && config.paddle.x > 0) {
    config.paddle.x -= 7;
  }

  if (
    config.x + config.dx > canvas.width - config.ballRadius ||
    config.x + config.dx < config.ballRadius
  ) {
    config.dx = -config.dx;
  }
  if (config.y + config.dy < config.ballRadius) {
    config.dy = -config.dy;
  } else if (config.y + config.dy > canvas.height - config.ballRadius) {
    if (
      config.x > config.paddle.x &&
      config.x < config.paddle.x + config.paddle.width
    ) {
      config.dy = -config.dy;
    } else {
      return;
    }
  }

  requestAnimationFrame(draw);
}

function restartGame() {
  location.reload();
}

draw();
