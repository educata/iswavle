const canvas = document.querySelector('canvas');

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

fillBricks();
drawBricks();
drawBall();
drawPaddle();
