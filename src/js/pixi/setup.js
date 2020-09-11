const app = new Application({
  width: innerWidth,
  height: innerHeight,
  view: document.getElementById("kv"),
  transparent: true,
  autoDensity: true,
  antialias: true,
});

window.onresize = function() {
  app.renderer.resize(innerWidth, innerHeight);
};

// loader
//   .add("assets/imgs/tileset.png")
//   .load(setup);
setup();

function setup() {
  app.stage.addChild(circlesContainer);

  circles.map(circle => {
    const scale = (Math.random() * (objectSizeMax + 1 - objectSizeMin) + objectSizeMin) / objectSizeMax;

    const x = Math.floor(Math.random() * innerWidth),
      y = Math.floor(Math.random() * innerHeight);

    circle.sprite.scale.x = scale;
    circle.sprite.scale.y = scale;
    circle.m = -Math.floor(scale * objectSizeMax) + objectSizeMax;
    circle.sprite.zIndex = circle.m;
    circle.sprite.rotation = 2 * Math.PI * Math.random();

    circle.vx = Math.random() > 0.5
      ? Math.floor(Math.random() * (objectVelocityAbsolute - 1)) + 1
      : -(Math.floor(Math.random() * (objectVelocityAbsolute - 1)) + 1);
    circle.vy = Math.random() > 0.5
      ? Math.floor(Math.random() * (objectVelocityAbsolute - 1)) + 1
      : -(Math.floor(Math.random() * (objectVelocityAbsolute - 1)) + 1);

    circle.sprite.anchor.set(0.5, 0.5);
    circle.sprite.position.set(x, y);

    circlesContainer.addChild(circle.sprite);
  });
  circlesContainer.sortChildren();
  app.renderer.render(app.stage);

  app.ticker.speed = tickerSpeedAbsolute;
  app.ticker.add(animate);
}
