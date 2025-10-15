const stateCanvas = document.querySelector('#stateCanvas');
if (stateCanvas.getContext) {
  const ctx = stateCanvas.getContext('2d');
  ctx.fillRect(0, 0, 150, 150); // დავხატოთ შავი მართკუთხედი ნაგულისხმევი თვისებებით
  ctx.save(); // შევინახოთ სთეითი

  ctx.fillStyle = '#09F'; // შევუცვალოთ ფერი
  ctx.fillRect(15, 15, 120, 120); // დავხატოთ ლურჯი მართკუთხედი ახალი თვისებებით
  ctx.save(); // შევინახოთ ამჟამინდელი სთეითი

  ctx.fillStyle = '#FFF'; // შევუცვალოთ ფერი
  ctx.globalAlpha = 0.5;
  ctx.fillRect(30, 30, 90, 90); // დავხატოთ თეთრი ფერის მართკუთხედი ახალი თვისებებით

  ctx.restore(); // აღვადგინოთ ბოლო სთეითი
  ctx.fillRect(45, 45, 60, 60); // დავხატოთ მართკუთხედი ლურჯი თვსიებებით

  ctx.restore(); // აღვადგინოთ ბოლოს წინა სთეითი
  ctx.fillRect(60, 60, 30, 30); // დავხატოთ შავი ფერის მართკუთხედი შავი თვისებებით
}
