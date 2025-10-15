const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load(
  'https://iswavle.com/assets/icons/icon-512x512.png',
);

const materials = [
  new THREE.MeshBasicMaterial({
    color: 0xffffff,
  }),
  new THREE.MeshBasicMaterial({
    color: 0xffffff,
  }),
  new THREE.MeshBasicMaterial({
    color: 0xffffff,
  }),
  new THREE.MeshBasicMaterial({
    color: 0xffffff,
  }),
  new THREE.MeshBasicMaterial({
    color: 0xffffff,
  }),
  new THREE.MeshBasicMaterial({
    color: 0xffffff,
  }),
];

const cubeGeometry = new THREE.BoxGeometry();
const cube = new THREE.Mesh(cubeGeometry, materials);
scene.add(cube);

function updateSettings(settings) {
  cube.position.set(settings.positionX, settings.positionY, settings.positionZ);
  cube.scale.set(settings.scale, settings.scale, settings.scale);
  cube.rotation.x += settings.autoRotationSpeedX + settings.rotationSpeedX;
  cube.rotation.y += settings.autoRotationSpeedY + settings.rotationSpeedY;
  cube.material.forEach((material) => {
    material.map = settings.useTextures ? texture : null;
    material.color.setHex(settings.useTextures ? 0xffffff : settings.color);
  });
}

dat.GUI.TEXT_OPEN = 'კონტროლის გახსნა';
dat.GUI.TEXT_CLOSED = 'კონტროლის დახურვა';

const gui = new dat.GUI();
gui.add;
const settings = {
  positionX: 0,
  positionY: 0,
  positionZ: 0,
  scale: 1.5,
  autoRotationSpeedX: 0.01,
  autoRotationSpeedY: 0.01,
  rotationSpeedX: 0,
  rotationSpeedY: 0,
  useTextures: true,
  color: 0xffffff,
};
gui.add(settings, 'positionX', -5, 5).name('პოზიცია X');
gui.add(settings, 'positionY', -5, 5).name('პოზიცია Y');
gui.add(settings, 'positionZ', -5, 5).name('პოზიცია Z');
gui.add(settings, 'scale', 0.1, 2).name('გაზრდა');
gui.add(settings, 'autoRotationSpeedX', -0.1, 0.1).name('სიჩქარე X');
gui.add(settings, 'autoRotationSpeedY', -0.1, 0.1).name('სიჩქარე Y');
gui.add(settings, 'rotationSpeedX', -0.1, 0.1).name('მაუსის სიჩქარე X');
gui.add(settings, 'rotationSpeedY', -0.1, 0.1).name('მაუსის სიჩქარე Y');
gui.add(settings, 'useTextures').name('თეთრი ფონი');
gui.addColor(settings, 'color').name('ფერი');
gui.add({ reset: resetParameters }, 'reset').name('რესეტი კონტროლის');

let isDragging = false;
let previousMousePosition = {
  x: 0,
  y: 0,
};

document.addEventListener('mousemove', (event) => {
  const deltaMove = {
    x: event.clientX - previousMousePosition.x,
    y: event.clientY - previousMousePosition.y,
  };

  if (isDragging) {
    settings.rotationSpeedX = deltaMove.x * 0.01;
    settings.rotationSpeedY = deltaMove.y * 0.01;
  }

  previousMousePosition = {
    x: event.clientX,
    y: event.clientY,
  };
});

document.addEventListener('mousedown', (event) => {
  isDragging = true;
  previousMousePosition = {
    x: event.clientX,
    y: event.clientY,
  };
});

document.addEventListener('mouseup', (event) => {
  isDragging = false;
  settings.rotationSpeedX = 0;
  settings.rotationSpeedY = 0;
});

function resetParameters() {
  // უკეთესი გზაც შეიძლება
  location.reload();
}

function animate() {
  requestAnimationFrame(animate);

  updateSettings(settings);

  renderer.render(scene, camera);
}

animate();
