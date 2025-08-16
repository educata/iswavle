const canvas = document.querySelector('#twoRect');

if (canvas.getContext) {
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = 'rgb(70 130 180)';
  ctx.fillRect(10, 10, 50, 50);
  ctx.fillStyle = 'rgb(0 200 0 / 50%)';
  ctx.fillRect(30, 30, 50, 50);
} else {
  console.log('ბრაუზერს არ აქვს კანვასის მხარდაჭერა');
}
