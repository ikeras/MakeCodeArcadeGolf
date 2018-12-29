enum SpriteKind {
    Player,
    Projectile,
    Food,
    Enemy
}

let golfBallSprite: Sprite = null;
const golfer = new Golfer();
const powerMeter = new PowerMeter(32, 8, 15, 4);

controller.A.onEvent(ControllerButtonEvent.Pressed, () => {
    if (powerMeter.isRunning) {
        let power = powerMeter.stop();
    } else {
        powerMeter.start(16, 160);
    }
    // golfer.swing(() => {
    //     music.golfBallHit.play();
    //     golfBallSprite.vx = 42;
    //     golfBallSprite.vy = -50;
    //     golfBallSprite.ay = 9.81;
    //     golfBallSprite.ax = 0;
    // });
});

const targetingAideImageSize = 48;
const targetingAideMidpoint = targetingAideImageSize / 2;
const targetingAideSize = 2;
const verticalTargetingAide = image.create(targetingAideImageSize, targetingAideImageSize);
const targetingAideSprite = sprites.create(verticalTargetingAide);
targetingAideSprite.z = 2;
targetingAideSprite.setPosition(13, 206);

let angle = 180;

const targetingAidePoints = [
    { x: -targetingAideMidpoint, y: 0 },
    { x: -targetingAideMidpoint + targetingAideSize, y: targetingAideSize },
    { x: -targetingAideMidpoint + targetingAideSize, y: -targetingAideSize }
];



game.currentScene().eventContext.registerFrameHandler(19, () => {


    if ((controller.left.isPressed() && angle >= 0) || (controller.right.isPressed() && angle <= 180)) {
        controller.left.isPressed() ? angle-- : angle++;
        angle > 90 ? golfer.setOrientation(GolferOrientation.Right) : golfer.setOrientation(GolferOrientation.Left);
        const radians = angle * Math.PI / 180;
        let x, y;
        const points = [];

        for (let localPoint of targetingAidePoints) {
            // rotate points
            x = localPoint.x * Math.cos(radians) - localPoint.y * Math.sin(radians);
            y = localPoint.y * Math.cos(radians) + localPoint.x * Math.sin(radians);

            // translate into image coordinates
            x += targetingAideMidpoint;
            y += targetingAideMidpoint;

            points.push({ x: x, y: y });
        }

        verticalTargetingAide.fill(0);

        // Draw the 4 lines of the targeting aide
        verticalTargetingAide.drawLine(targetingAideMidpoint, targetingAideMidpoint, points[1].x, points[1].y, 4);
        verticalTargetingAide.drawLine(targetingAideMidpoint, targetingAideMidpoint, points[2].x, points[2].y, 4);
        verticalTargetingAide.drawLine(points[1].x, points[1].y, points[0].x, points[0].y, 4);
        verticalTargetingAide.drawLine(points[2].x, points[2].y, points[0].x, points[0].y, 4);
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
