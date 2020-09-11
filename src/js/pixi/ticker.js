function animate(delta) {
  // console.log(
  //   app.renderer.plugins.interaction.mouse.global.x,
  //   app.renderer.plugins.interaction.mouse.global.y);

  const cursorData = {
    x: app.renderer.plugins.interaction.mouse.global.x,
    y: app.renderer.plugins.interaction.mouse.global.y,
  };

  circles.map(circle => {
    let vx = circle.vx;
    let vy = circle.vy;

    // カーソルが画面内にある時
    if (cursorData.x >= 0 && cursorData.y >= 0) {
      const difx = circle.sprite.x - cursorData.x > 10 || circle.sprite.x - cursorData.x < -10
        ? circle.sprite.x - cursorData.x
        : circle.sprite.x - cursorData.x > 10
          ? 10
          : -10;
      const dify = circle.sprite.y - cursorData.y > 10 || circle.sprite.y - cursorData.y < -10
        ? circle.sprite.y - cursorData.y
        : circle.sprite.y - cursorData.y > 10
          ? 10
          : -10;
      const difxy = Math.sqrt(difx * difx + dify * dify);

      vx = vx > 0
        ? Math.sqrt((vx * vx) + ((2 * Math.max(circle.m, 10) * cursorM * gravity * difx) / (difxy * difxy * difxy)))
        : -Math.sqrt((vx * vx) + ((2 * Math.max(circle.m, 10) * cursorM * gravity * difx) / (difxy * difxy * difxy)));
      vy = vy > 0
        ? Math.sqrt((vy * vy) + ((2 * Math.max(circle.m, 10) * cursorM * gravity * dify) / (difxy * difxy * difxy)))
        : -Math.sqrt((vy * vy) + ((2 * Math.max(circle.m, 10) * cursorM * gravity * dify) / (difxy * difxy * difxy)));
    }

    circle.sprite.x += vx < maxSpeed || vx > -maxSpeed ? (vx * delta) : maxSpeed * delta;
    circle.sprite.y += vy < maxSpeed || vy > -maxSpeed ? (vy * delta) : maxSpeed * delta;

    // 外側に行った時の処理
    if (circle.sprite.x < -objectSizeMax || circle.sprite.x > innerWidth + objectSizeMax
      || circle.sprite.y < -objectSizeMax || circle.sprite.y > innerHeight + objectSizeMax
      || isNaN(circle.sprite.x) || isNaN(circle.sprite.y)) {
      const scale = (Math.random() * (objectSizeMax + 1 - objectSizeMin) + objectSizeMin) / objectSizeMax;

      circle.sprite.scale.x = scale;
      circle.sprite.scale.y = scale;
      circle.m = -Math.floor(scale * objectSizeMax) + objectSizeMax;
      circle.sprite.zIndex = circle.m;      circle.sprite.rotation = 2 * Math.PI * Math.random();
      circlesContainer.sortChildren();

      // x軸方向で画面外に行った時
      if (circle.sprite.x < -objectSizeMax || circle.sprite.x > innerWidth + objectSizeMax || isNaN(circle.sprite.x)) {

        const y = Math.floor(Math.random() * (innerHeight - 2 * objectSizeMax)) + objectSizeMax;

        circle.vx = circle.sprite.x < -objectSizeMax
          ? Math.floor(Math.random() * (objectVelocityAbsolute - 1)) + 1
          : -(Math.floor(Math.random() * (objectVelocityAbsolute - 1)) + 1);
        circle.vy = y < (innerHeight / 2)
          ? Math.floor(Math.random() * (objectVelocityAbsolute - 1)) + 1
          : -(Math.floor(Math.random() * (objectVelocityAbsolute - 1)) + 1);

        circle.sprite.x = isNaN(circle.sprite.x) ? -objectSizeMax : circle.sprite.x;
        circle.sprite.y = y;
      }

      // y軸方向で画面外に行った時
      if (circle.sprite.y < -objectSizeMax || circle.sprite.y > innerHeight + objectSizeMax || isNaN(circle.sprite.y)) {
        const x = Math.floor(Math.random() * (innerWidth - 2 * objectSizeMax)) + objectSizeMax;

        circle.vx = x < (innerWidth / 2)
          ? Math.floor(Math.random() * (objectVelocityAbsolute - 1)) + 1
          : -(Math.floor(Math.random() * (objectVelocityAbsolute - 1)) + 1);
        circle.vy = circle.sprite.y < -objectSizeMax
          ? Math.floor(Math.random() * (objectVelocityAbsolute - 1)) + 1
          : -(Math.floor(Math.random() * (objectVelocityAbsolute - 1)) + 1);

        circle.sprite.x = x;
        circle.sprite.y = isNaN(circle.sprite.y) ? -objectSizeMax : circle.sprite.y;
      }
    }
  });
}
