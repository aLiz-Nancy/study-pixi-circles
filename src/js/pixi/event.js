// circle1.interactive = true;
// circle1.on('pointerdown', onCircleDown)
//   .on('pointerup', onCircleUp);

// circle2.interactive = true;
// circle2.on('pointerdown', onCircleDown)
//   .on('pointerup', onCircleUp);

function onCircleDown() {
  this.on('pointermove', dragCircle);
}

function onCircleUp() {
  this.off('pointermove', dragCircle);
}

function dragCircle(e) {
  let position = e.data.getLocalPosition(app.stage);

  // 位置変更
  this.x = position.x;
  this.y = position.y;
}
