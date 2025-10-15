const canvas = document.querySelector('canvas');
const restartBtn = document.querySelector('#restartBtn');

const canvasWidth = window.innerWidth - 50;
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
  dx: Math.random() < 0.5 ? -2 : 2,
  dy: Math.random() < 0.5 ? -2 : 2,
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
  score: 0,
  canRestart: false,
  gameOver: false,
  animationFrame: 0,
};

const ctx = canvas.getContext('2d');

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

restartBtn.addEventListener('click', function () {
  if (config.canRestart) {
    this.disabled = true;
    restartGame();
  }
});

fillBricks();

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

function drawScore() {
  ctx.font = '16px Arial';
  ctx.fillStyle = '#0095DD';
  ctx.fillText('ქულა: ' + config.score, 8, 20);
}

function collisionDetection() {
  for (let i = 0; i < config.brick.column; i++) {
    for (let j = 0; j < config.brick.row; j++) {
      let brick = config.bricks[i][j];
      if (brick.status === 1) {
        if (
          config.x > brick.x &&
          config.x < brick.x + config.brick.width &&
          config.y > brick.y &&
          config.y < brick.y + config.brick.height
        ) {
          config.dy = -config.dy;
          brick.status = 0;
          config.score++;
          if (config.score === config.brick.row * config.brick.column) {
            config.canRestart = true;
            restartBtn.disabled = false;
            config.gameOver = true;
          }
        }
      }
    }
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBricks();
  drawBall();
  drawPaddle();
  drawScore();
  collisionDetection();

  if (!config.gameOver) {
    config.x += config.dx;
    config.y += config.dy;
  }

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
      restartBtn.disabled = false;
      config.canRestart = true;
      cancelAnimationFrame(config.animationFrame);
      return;
    }
  }

  config.animationFrame = requestAnimationFrame(draw);
}

function restartGame() {
  cancelAnimationFrame(config.animationFrame);
  config.x = canvas.width / 2;
  config.y = canvas.height - 30;
  config.movements.leftPressed = false;
  config.movements.rightPressed = false;
  config.score = 0;
  config.canRestart = false;
  config.gameOver = false;
  config.paddle.x = config.x - config.paddle.width / 2;
  config.dx = Math.random() < 0.5 ? -2 : 2;
  config.dy = Math.random() < 0.5 ? -2 : 2;
  fillBricks();
  draw();
}

draw();
