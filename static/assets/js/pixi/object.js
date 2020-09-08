const circlesContainer = new PIXI.Container(); // const circle1 = new PIXI.Graphics()
//   .beginFill(0xff0000)
//   .drawCircle(0,0,30)
//   .endFill();
// const circle2 = new PIXI.Graphics()
//   .beginFill(0x00ff00, 0.4)
//   .drawCircle(0,0,30)
//   .endFill();
// const circle2 = circle1.clone();

const circles = [{
  vx: 0,
  vy: 0,
  sprite: createGradientCircle(0, 0, 320, redFrom, redTo)
}, {
  vx: 0,
  vy: 0,
  sprite: createGradientCircle(0, 0, 320, greenFrom, greenTo)
}, {
  vx: 0,
  vy: 0,
  sprite: createGradientCircle(0, 0, 320, blueFrom, blueTo)
}, {
  vx: 0,
  vy: 0,
  sprite: createGradientCircle(0, 0, 320, orangeFrom, orangeTo)
}];

function createGradientCircle(x, y, radius, colorFrom, colorTo) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const gradient = ctx.createLinearGradient(0, 0, radius * 2, 0); // Colorが数字の場合に変換する。

  let colorFromTrue = typeof colorFrom === "number" ? '#' + ('00000' + (colorFrom | 0).toString(16)).substr(-6) : colorFrom;
  let colorToTrue = typeof colorTo === "number" ? '#' + ('00000' + (colorTo | 0).toString(16)).substr(-6) : colorTo;
  canvas.setAttribute('width', radius * 2);
  canvas.setAttribute('height', radius * 2);
  gradient.addColorStop(0, colorFromTrue);
  gradient.addColorStop(1, colorToTrue);
  ctx.fillStyle = gradient;
  ctx.arc(radius, radius, radius, 0, 2 * Math.PI);
  ctx.fill();
  return PIXI.Sprite.from(canvas);
}

;