const arcsCanvas = document.querySelector('#arcsCanvas');

if (arcsCanvas.getContext) {
  const ctx = arcsCanvas.getContext('2d');
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 3; j++) {
      ctx.beginPath();

      const x = 25 + j * 50; // x კოორდინატი
      const y = 25 + i * 50; // y კოორდინატი
      const radius = 20; // რკალის რადიუსი
      const startAngle = 0; // დასაწყისი წერტილი წრის
      const endAngle = Math.PI + (Math.PI * j) / 2; // დასასრული წერტილი წრის
      const counterclockwise = i % 2 !== 0; // საათის ისრის მიმართულებით დახატვა ან პირიქით

      ctx.arc(x, y, radius, startAngle, endAngle, counterclockwise);

      if (i > 1) {
        ctx.fill();
      } else {
        ctx.stroke();
      }
    }
  }
} else {
  console.log('ბრაუზერს არ აქვს კანვასის მხარდაჭერა');
}
