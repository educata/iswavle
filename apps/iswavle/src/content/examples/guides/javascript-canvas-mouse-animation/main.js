const mouseCanvas = document.querySelector('#mouseCanvas');
const ctx = mouseCanvas.getContext('2d');

const cursor = {
  x: innerWidth / 2,
  y: innerHeight / 2,
};

const particlesArray = [];

if (mouseCanvas.getContext) {
  ctx.globalAplha = 0.5;
  generateParticles(101);
  setSize();
  anim();

  addEventListener('mousemove', (e) => {
    cursor.x = e.clientX;
    cursor.y = e.clientY;
  });

  addEventListener(
    'touchmove',
    (e) => {
      e.preventDefault();
      cursor.x = e.touches[0].clientX;
      cursor.y = e.touches[0].clientY;
    },
    { passive: false },
  );

  addEventListener('resize', () => setSize());
}

function generateParticles(amount) {
  for (let i = 0; i < amount; i++) {
    particlesArray[i] = new Particle(
      innerWidth / 2,
      innerHeight / 2,
      4,
      generateColor(),
      0.02,
    );
  }
}

function generateColor() {
  const hexSet = '0123456789ABCDEF';
  let finalHexString = '#';
  for (let i = 0; i < 6; i++) {
    finalHexString += hexSet[Math.ceil(Math.random() * 15)];
  }
  return finalHexString;
}

function setSize() {
  mouseCanvas.height = innerHeight;
  mouseCanvas.width = innerWidth;
}

function Particle(x, y, particleTrailWidth, strokeColor, rotateSpeed) {
  this.x = x;
  this.y = y;
  this.particleTrailWidth = particleTrailWidth;
  this.strokeColor = strokeColor;
  this.theta = Math.random() * Math.PI * 2;
  this.rotateSpeed = rotateSpeed;
  this.t = Math.random() * 150;

  this.rotate = () => {
    const ls = {
      x: this.x,
      y: this.y,
    };
    this.theta += this.rotateSpeed;
    this.x = cursor.x + Math.cos(this.theta) * this.t;
    this.y = cursor.y + Math.sin(this.theta) * this.t;
    ctx.beginPath();
    ctx.lineWidth = this.particleTrailWidth;
    ctx.strokeStyle = this.strokeColor;
    ctx.moveTo(ls.x, ls.y);
    ctx.lineTo(this.x, this.y);
    ctx.stroke();
  };
}

function anim() {
  requestAnimationFrame(anim);

  ctx.fillStyle = 'rgb(0 0 0 / 5%)';
  ctx.fillRect(0, 0, mouseCanvas.width, mouseCanvas.height);

  particlesArray.forEach((particle) => particle.rotate());
}
