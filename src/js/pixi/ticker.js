function animate(delta) {
  circles.map(circle => {
    circle.sprite.x += (circle.vx * delta);
    circle.sprite.y += (circle.vy * delta);

    // 外側に行った時の処理
    if (circle.sprite.x < -objectSizeMax || circle.sprite.x > innerWidth + objectSizeMax
      || circle.sprite.y < -objectSizeMax || circle.sprite.y > innerWidth + objectSizeMax) {
      const scale = (Math.random() * (objectSizeMax + 1 - objectSizeMin) + objectSizeMin) / objectSizeMax;

      circle.sprite.scale.x = scale;
      circle.sprite.scale.y = scale;
      circle.sprite.zIndex = -Math.floor(scale * objectSizeMax) + objectSizeMax;
      circle.sprite.rotation = 2 * Math.PI * Math.random();
      circlesContainer.sortChildren();

      // x軸方向で画面外に行った時
      if (circle.sprite.x < -objectSizeMax || circle.sprite.x > innerWidth + objectSizeMax) {
        const y = Math.floor(Math.random() * (innerHeight - 2 * objectSizeMax)) + objectSizeMax;

        circle.vx = circle.sprite.x < -objectSizeMax
          ? Math.floor(Math.random() * (objectVelocityAbsolute - 1)) + 1
          : -(Math.floor(Math.random() * (objectVelocityAbsolute - 1)) + 1);
        circle.vy = y < (innerHeight / 2)
          ? Math.floor(Math.random() * (objectVelocityAbsolute - 1)) + 1
          : -(Math.floor(Math.random() * (objectVelocityAbsolute - 1)) + 1);

        circle.sprite.y = y;
      }

      // y軸方向で画面外に行った時
      if (circle.sprite.y < -objectSizeMax || circle.sprite.y > innerHeight + objectSizeMax) {
        const x = Math.floor(Math.random() * (innerWidth - 2 * objectSizeMax)) + objectSizeMax;

        circle.vx = x < (innerWidth / 2)
          ? Math.floor(Math.random() * (objectVelocityAbsolute - 1)) + 1
          : -(Math.floor(Math.random() * (objectVelocityAbsolute - 1)) + 1);
        circle.vy = circle.sprite.y < -objectSizeMax
          ? Math.floor(Math.random() * (objectVelocityAbsolute - 1)) + 1
          : -(Math.floor(Math.random() * (objectVelocityAbsolute - 1)) + 1);

        circle.sprite.x = x;
      }
    }
  });
}
