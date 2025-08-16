const path2Canvas = document.querySelector('#path2Canvas');

if (path2Canvas.getContext) {
  const ctx = path2Canvas.getContext('2d');

  const rectangle = new Path2D();
  rectangle.rect(10, 10, 50, 50);

  const circle = new Path2D();
  circle.arc(100, 35, 25, 0, 2 * Math.PI);

  ctx.stroke(rectangle);
  ctx.fill(circle);
} else {
  console.log('ბრაუზერს არ აქვს კანვასის მხარდაჭერა');
}
