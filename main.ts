enum SpriteKind {
    Player,
    Projectile,
    Food,
    Enemy
}

let golfBallSprite: Sprite = null;

const golfer = new Golfer();
golfer.setPosition(12, 192);

const powerMeter = new PowerMeter(32, 8, 15, 4);
const directionIndicator = new DirectionIndicator(48, 2, 4);

let angle = 180;

controller.A.onEvent(ControllerButtonEvent.Pressed, () => {
    if (powerMeter.isRunning) {
        directionIndicator.hide();
        let power = powerMeter.stop() * 2.4;
        const radians = angle * Math.PI / 180;

        golfer.swing(() => {
            music.golfBallHit.play();
            golfBallSprite.vx = -Math.cos(radians) * power;
            golfBallSprite.vy = -Math.sin(radians) * power;
            golfBallSprite.ay = 9.81;
            golfBallSprite.ax = 0;
        });
    } else {
        directionIndicator.rotate(angle);
        directionIndicator.show(13, 206);
        powerMeter.start(16, golfer.top - 8);
    }

});

game.currentScene().eventContext.registerFrameHandler(19, () => {
    if (powerMeter.isRunning && ((controller.left.isPressed() && angle >= 0) || (controller.right.isPressed() && angle <= 180))) {
        controller.left.isPressed() ? angle-- : angle++;
        angle > 90 ? golfer.setOrientation(GolferOrientation.Right) : golfer.setOrientation(GolferOrientation.Left);
        directionIndicator.rotate(angle);
    }
});

scene.setBackgroundColor(9)
scene.setTileMap(img`
    . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . . . . . . 1 . . . . . . . . . . .
    . . . . . . . . . . . . . . 1 . . . . . . . . . . . . . . . 1 .
    . . . . . . . 1 . . . . . . . . . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . . . . . . . . . . 1 . . . . . . .
    . . . . . . . . . . 1 . . . . . . . . . . . . . . . . . . . . .
    . . . 1 . . . . . . . . . . . . . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . . . . . . . . . . . . . . 7 7 7 7
    . . . . . . . . . . . . . . . . . . . . . . . . . . . 7 e e e e
    . . . . . . . . . . . . . . . . . . . . . . . . . 3 7 e e e e e
    . . . . . 7 7 7 7 7 8 7 7 7 7 7 7 7 7 7 7 7 7 7 7 d 7 e e e e e
    . . . . 7 e e e e e 8 e e e e e e e e e e e e e 7 7 7 e e e e e
    7 7 7 7 e e e e e e 8 e e e e e e e e e e e e e e e e e e e e e
    e e e e e e e e e e 8 e e e e e e e e e e e e e e e e e e e e e
    e e e e e e e e e e 8 e e e e e e e e e e e e e e e e e e e e e
    `)
scene.setTile(3, img`
    . . . . . . . . 2 2 1 1 . . . .
    . . . . . . 2 2 2 2 1 1 . . . .
    . . . . 2 2 2 2 2 2 1 1 . . . .
    . . 2 2 2 2 2 2 2 2 1 1 . . . .
    . . 2 2 2 2 2 2 2 2 1 1 . . . .
    . . . . 2 2 2 2 2 2 1 1 . . . .
    . . . . . . 2 2 2 2 1 1 . . . .
    . . . . . . . . 2 2 1 1 . . . .
    . . . . . . . . . . 1 1 . . . .
    . . . . . . . . . . 1 1 . . . .
    . . . . . . . . . . 1 1 . . . .
    . . . . . . . . . . 1 1 . . . .
    . . . . . . . . . . 1 1 . . . .
    . . . . . . . . . . 1 1 . . . .
    . . . . . . . . . . 1 1 . . . .
    . . . . . . . . . . 1 1 . . . .
    `)
scene.setTile(1, img`
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . f f f f f f f f . . . . .
    . . f 1 1 1 1 1 1 1 1 f . . . .
    . f 1 1 1 1 1 1 1 1 1 1 f . . .
    . f 1 1 1 f 1 1 f 1 1 1 f . . .
    . f 1 1 1 f 1 1 f 1 1 1 f . . .
    f 1 1 1 1 f 1 1 f 1 1 1 1 f . .
    f 1 1 1 1 1 1 1 1 1 1 1 1 f . .
    f 1 1 1 1 1 1 1 1 1 1 1 1 f . .
    f 1 1 1 f 1 1 1 1 f 1 1 1 f . .
    . f 1 1 1 f f f f 1 1 1 f . . .
    . f 1 1 1 1 1 1 1 1 1 1 f . . .
    . f 1 1 1 1 1 1 1 1 1 1 f . . .
    . . f 1 1 1 f f 1 1 1 f . . . .
    . . . f f f . . f f f . . . . .
    `)
scene.setTile(7, img`
    7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7
    7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7
    7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7
    7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7
    7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7
    7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7
    7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7
    7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7
    7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7
    7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7
    7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7
    7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7
    7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7
    7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7
    7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7
    7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7
    `, true)


golfBallSprite = sprites.create(img`
    . f f .
    f f f f
    f f f f
    . f f .
    `, SpriteKind.Projectile)

golfBallSprite.setPosition(13, 206);
golfBallSprite.z = 1;
scene.cameraFollowSprite(golfBallSprite);

// coefficient of restituion for grass
const grassSurfaceCOR = 0.5;

scene.onHitTile(SpriteKind.Projectile, 7, (sprite: Sprite) => {
    sprite.vx *= grassSurfaceCOR;
    sprite.vy *= grassSurfaceCOR;

    if (sprite.isHittingTile(CollisionDirection.Left) || sprite.isHittingTile(CollisionDirection.Right)) {
        sprite.vx = -sprite.vx;
    }

    if (sprite.isHittingTile(CollisionDirection.Top) || sprite.isHittingTile(CollisionDirection.Bottom)) {
        sprite.vy = -sprite.vy;
    }
})
