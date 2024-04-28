const rectangularCanvas = document.querySelector('#rectangularExample');

if (rectangularCanvas.getContext) {
  const ctx = rectangularCanvas.getContext('2d');
  ctx.fillRect(25, 25, 100, 100);
  ctx.clearRect(45, 45, 60, 60);
  ctx.strokeRect(50, 50, 50, 50);
} else {
  console.log('ბრაუზერს არ აქვს კანვასის მხარდაჭერა');
}
