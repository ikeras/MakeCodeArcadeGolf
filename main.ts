enum SpriteKind {
    Player,
    Projectile,
    Food,
    Enemy
}

let golfBallSprite: Sprite = null;
let golferSprite: Sprite = null;
let golferSwingingAnimationIndex: number = -1;
let golferSpriteAnimations: animation.SpriteAnimationGroup = null;

controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    golferSpriteAnimations.setActiveAnimation(golferSwingingAnimationIndex, (frame) => {
        if (frame === 4) {
            music.golfBallHit.play();
            golfBallSprite.vx = 45;
            golfBallSprite.vy = -50;
            golfBallSprite.ay = 9.81;
            golfBallSprite.ax = 2;
        }
    });
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
golfBallSprite.setFlag(SpriteFlag.BounceOnWall, true)
scene.cameraFollowSprite(golfBallSprite);
//scene.centerCameraAt(0, 192);

const golferFrame1 = img`
    . . . . . . . f f f f f f f f f f . . . . . . .
    . . . . . f f f 1 1 1 1 1 1 1 1 f f f . . . . .
    . . . . f f 1 1 1 f f f f f f 1 1 1 f f . . . .
    . . . f f 1 1 f f f f f f f f f f 1 1 f f . . .
    . . . f 1 1 f f f 1 f f f f f f f f 1 1 f . . .
    . . f f 1 f f f 1 1 f f f f f f f f f 1 f f . .
    . . f 1 f f f 1 1 f f f f f f f f f f f 1 f . .
    . . f 1 f f f f f f f f f f f f f f f f 1 f . .
    . . f 1 f f f f f f f f f f f f f f f f 1 f . .
    . . f 1 f f f f f f f f f f f f f f f f 1 f . .
    . . f f 1 f f f f f f f f f f f f f f f 1 f . .
    . . . f 1 f f f f f f f f f f f f f f 1 f . . .
    . . . f f 1 1 f f f f f f f f f f 1 1 f f . . .
    . . . . f f 1 1 1 f f f f f f 1 1 1 f f . . . .
    . . . . . f f 1 1 1 1 1 1 1 1 1 1 f f . . . . .
    . . . . . . f f f f 1 1 1 1 f f f f . . . . . .
    . . . . . . 2 2 2 2 2 2 2 2 2 2 2 2 . . . . . .
    . . . . . f f f 1 1 1 1 1 1 1 1 1 f f . . . . .
    . . . . . f 1 1 1 1 1 1 1 1 1 1 1 1 f . . . . .
    . . . . f f 1 1 1 1 1 1 1 1 1 1 1 1 f f . . . .
    . . . . f 1 f 1 1 1 1 1 1 1 1 1 1 f 1 f . . . .
    . . . . f 1 1 f 1 1 1 1 1 1 1 1 f 1 1 f . . . .
    . . . . . f 1 f f 1 1 1 1 1 1 f f 1 f . . . . .
    . . . . . . f f 1 f 1 c 1 f f 1 f f . . . . . .
    . . . . . . . f f f f f f f f f f . . . . . . .
    . . . . . . . f 1 f f f f f 1 1 f . . . . . . .
    . . . . . . . f 1 1 1 c f 1 1 1 f . . . . . . .
    . . . . . . . f 1 1 1 c f 1 1 1 f . . . . . . .
    . . . . . . . f 1 1 f c . f 1 1 f . . . . . . .
    . . . . . . . f 1 1 f c . f 1 1 f . . . . . . .
    . . . . . . f f 1 f . c . . f 1 f f . . . . . .
    . . . . . . f 1 1 f c c . . f 1 1 f . . . . . .
    `;

const golferFrame2 = img`
    . . . . . . . f f f f f f f f f f . . . . . . .
    . . . . . f f f 1 1 1 1 1 1 1 1 f f f . . . . .
    . . . . f f 1 1 1 f f f f f f 1 1 1 f f . . . .
    . . . f f 1 1 f f f f f f f f f f 1 1 f f . . .
    . . . f 1 1 f f f 1 f f f f f f f f 1 1 f . . .
    . . f f 1 f f f 1 1 f f f f f f f f f 1 f f . .
    . . f 1 f f f 1 1 f f f f f f f f f f f 1 f . .
    . . f 1 f f f f f f f f f f f f f f f f 1 f . .
    . . f 1 f f f f f f f f f f f f f f f f 1 f . .
    . . f 1 f f f f f f f f f f f f f f f f 1 f . .
    . . f f 1 f f f f f f f f f f f f f f f 1 f . .
    . . . f 1 f f f f f f f f f f f f f f 1 f . . .
    . . . f f 1 1 f f f f f f f f f f 1 1 f f . . .
    . . . . f f 1 1 1 f f f f f f 1 1 1 f f . . . .
    . . . . . f f 1 1 1 1 1 1 1 1 1 1 f f . . . . .
    . . . . f f f f f f 1 1 1 1 f f f f . . . . . .
    . . . . f f f 2 2 2 2 2 2 2 2 2 2 2 . . . . . .
    . . . . f f f f 1 1 1 1 1 1 1 1 1 f f . . . . .
    . . . . f f 1 1 f 1 1 1 1 1 1 1 f 1 f . . . . .
    . . . . . f f 1 1 f 1 1 1 1 1 f 1 1 f . . . . .
    . . . . . . f f 1 1 f 1 1 1 f 1 1 f . . . . . .
    . . . . . . . f f 1 1 f 1 f 1 1 f . . . . . . .
    . . . . . . . f 1 f 1 1 f 1 1 f f . . . . . . .
    . c c c c c c c c c f f f f f 1 f . . . . . . .
    . c . . . . . f f f f f f f f f f . . . . . . .
    . . . . . . . f 1 f f 1 1 1 1 1 f . . . . . . .
    . . . . . . . f 1 1 1 f f 1 1 1 f . . . . . . .
    . . . . . . . f 1 1 1 f f 1 1 1 f . . . . . . .
    . . . . . . . f 1 1 f . . f 1 1 f . . . . . . .
    . . . . . . . f 1 1 f . . f 1 1 f . . . . . . .
    . . . . . . f f 1 f . . . . f 1 f f . . . . . .
    . . . . . . f 1 1 f . . . . f 1 1 f . . . . . .
    `
const golferFrame3 = img`
    . . . . . . . f f f f f f f f f f . . . . . . .
    . . . . . f f f 1 1 1 1 1 1 1 1 f f f . . . . .
    . . . . f f 1 1 1 f f f f f f 1 1 1 f f . . . .
    . . . f f 1 1 f f f f f f f f f f 1 1 f f . . .
    . . . f 1 1 f f f 1 f f f f f f f f 1 1 f . . .
    . . f f 1 f f f 1 1 f f f f f f f f f 1 f f . .
    . . f 1 f f f 1 1 f f f f f f f f f f f 1 f . .
    . . f 1 f f f f f f f f f f f f f f f f 1 f . .
    . . f 1 f f f f f f f f f f f f f f f f 1 f . .
    . . f 1 f f f f f f f f f f f f f f f f 1 f . .
    . c f f 1 f f f f f f f f f f f f f f f 1 f . .
    c . f f 1 f f f f f f f f f f f f f f 1 f . . .
    . c . f f 1 1 f f f f f f f f f f 1 1 f f . . .
    . . c . f f 1 1 1 f f f f f f 1 1 1 f f . . . .
    . . . c . f f 1 1 1 1 1 1 1 1 1 1 f f . . . . .
    . . . . c . f f f f 1 1 1 1 f f f f . . . . . .
    . . . . . c 2 2 2 2 2 2 2 2 2 2 2 2 . . . . . .
    . . . . . f c f 1 1 1 1 1 1 1 1 f f f . . . . .
    . . . . . f 1 c f 1 f f f f f f f 1 f . . . . .
    . . . . . f 1 1 1 f f 1 1 1 1 1 1 1 f . . . . .
    . . . . . . f 1 1 f 1 f f f f f f f . . . . . .
    . . . . . . . f 1 f 1 1 1 1 1 1 f . . . . . . .
    . . . . . . . f f f 1 1 1 1 1 1 f . . . . . . .
    . . . . . . . f 1 1 1 1 1 1 1 1 f . . . . . . .
    . . . . . . . f f f f f f f f f f . . . . . . .
    . . . . . . . f 1 1 1 1 1 1 1 1 f . . . . . . .
    . . . . . . . f 1 1 1 f f 1 1 1 f . . . . . . .
    . . . . . . . f 1 1 1 f f 1 1 1 f . . . . . . .
    . . . . . . . f 1 1 f . . f 1 1 f . . . . . . .
    . . . . . . . f 1 1 f . . f 1 1 f . . . . . . .
    . . . . . . f f 1 f . . . . f 1 f f . . . . . .
    . . . . . . f 1 1 f . . . . f 1 1 f . . . . . .
    `
const golferFrame4 = img`
    . . . . . . . f f f f f f f f f f . . . . . . .
    . . . . . f f f 1 1 1 1 1 1 1 1 f f f . . . . .
    . . . . f f 1 1 1 f f f f f f 1 1 1 f f . . . .
    . . . f f 1 1 1 f f f 1 f f f f f 1 1 f f . . .
    . . . f 1 1 1 1 f f 1 1 f f f f f f 1 1 f . . .
    . . f f 1 1 1 1 f 1 1 f f f f f f f f 1 f f . .
    . . f 1 1 1 1 1 f f f f f f f f f f f f 1 f . .
    . . f 1 1 1 1 1 f f f f f f f f f f f f 1 f . .
    . . f 1 1 1 1 1 f f f f f f f f f f f f 1 f . .
    . . f 1 1 1 1 1 f f f f f f f f f f f f 1 f . .
    . . f f 1 1 1 1 f f f f f f f f f f f f 1 f . .
    . . . f 1 1 1 1 f f f f f f f f f f f 1 f . . .
    . . . f f 1 1 1 f f f f f f f f f 1 1 f f . . .
    . . . . f f 1 1 1 f f f f f f 1 1 1 f f . . . .
    . . . . . f f 1 1 1 1 1 1 1 1 1 1 f f . . . . .
    . . . . . . f f f f 1 1 1 1 f f f f . . . . . .
    . . . . . . 2 2 2 2 2 2 2 2 2 2 f f f . . . . .
    . . . . . f f f 1 1 1 1 1 1 1 1 f f f . . . . .
    . . . . . f 1 1 f 1 1 1 1 1 1 1 f 1 f . . . . .
    . . . . . f f 1 1 f 1 1 1 1 1 f 1 1 f . . . . .
    . . . . . . f f 1 1 f 1 1 1 f 1 1 f . . . . . .
    . . . . . . . f f 1 1 f 1 f 1 1 f . . . . . . .
    . . . . . . . f 1 f 1 1 f 1 1 f f . . . . . . c
    . . . . . . . f 1 1 f f f f f c c c c c c c c c
    . . . . . . . f f f f f f f f f f . . . . . . .
    . . . . . . . f 1 f f 1 1 1 1 1 f . . . . . . .
    . . . . . . . f 1 1 1 f f 1 1 1 f . . . . . . .
    . . . . . . . f 1 1 1 f f 1 1 1 f . . . . . . .
    . . . . . . . f 1 1 f . . f 1 1 f . . . . . . .
    . . . . . . . f 1 1 f . . f 1 1 f . . . . . . .
    . . . . . . . f 1 f . . . . f 1 f f . . . . . .
    . . . . . . . f 1 f . . . . f 1 1 f . . . . . .
    `
const golferFrame5 = img`
    . . . . . . . f f f f f f f f f f . . . . . . .
    . . . . . f f f 1 1 1 1 1 1 1 1 f f f . . . . .
    . . . . f f 1 1 1 1 1 f f f f 1 1 1 f f . . . .
    . . . f f 1 1 1 1 1 1 f f 1 f f f 1 1 f f . . .
    . . . f 1 1 1 1 1 1 1 f 1 f f f f f 1 1 f . . .
    . . f f 1 1 1 1 1 1 1 f f f f f f f f 1 f f . .
    . . f 1 1 1 1 1 1 1 1 f f f f f f f f f 1 f . .
    . . f 1 1 1 1 1 1 1 1 f f f f f f f f f 1 f . .
    . . f 1 1 1 1 1 1 1 1 f f f f f f f f f 1 f . .
    . . f 1 1 1 1 1 1 1 1 f f f f f f f f f 1 c . .
    . . f f 1 1 1 1 1 1 1 f f f f f f f f f 1 f c .
    . . . f 1 1 1 1 1 1 1 f f f f f f f f 1 f c . .
    . . . f f 1 1 1 1 1 1 f f f f f f 1 1 f c . . .
    . . . . f f 1 1 1 1 1 f f f f 1 1 1 f c . . . .
    . . . . . f f 1 1 1 1 1 1 1 1 1 1 f c . . . . .
    . . . . . . f f f f 1 1 1 1 f f f c . . . . . .
    . . . . . . 2 2 2 2 2 2 2 2 2 2 c 2 . . . . . .
    . . . . . f f f 1 1 1 1 1 1 1 c 1 f f . . . . .
    . . . . . f 1 f f f f f f f c 1 1 1 f . . . . .
    . . . . . f 1 1 1 1 1 1 1 f f 1 1 1 f . . . . .
    . . . . . . f f f f f f f 1 f 1 1 f . . . . . .
    . . . . . . . f 1 1 1 1 1 1 f 1 f . . . . . . .
    . . . . . . . f 1 1 1 1 1 1 f f f . . . . . . .
    . . . . . . . f 1 1 1 1 1 1 1 1 f . . . . . . .
    . . . . . . . f f f f f f f f f f . . . . . . .
    . . . . . . . f 1 f f 1 1 1 1 1 f . . . . . . .
    . . . . . . . f 1 1 1 f f 1 1 1 f . . . . . . .
    . . . . . . . f 1 1 1 f f 1 1 1 f . . . . . . .
    . . . . . . . f 1 1 f . . f 1 1 f . . . . . . .
    . . . . . . . f 1 1 f . . f 1 1 f . . . . . . .
    . . . . . . . f 1 f . . . . f 1 f f . . . . . .
    . . . . . . . f 1 f . . . . f 1 1 f . . . . . .
    `

golferSprite = sprites.create(golferFrame1, SpriteKind.Player);
const golferSwinging = new animation.Animation(250, false);
golferSwinging.addAnimationFrame(golferFrame1);
golferSwinging.addAnimationFrame(golferFrame2);
golferSwinging.addAnimationFrame(golferFrame3);
golferSwinging.addAnimationFrame(golferFrame2);
golferSwinging.addAnimationFrame(golferFrame1);
golferSwinging.addAnimationFrame(golferFrame4);
golferSwinging.addAnimationFrame(golferFrame5);
golferSpriteAnimations = new animation.SpriteAnimationGroup();
golferSwingingAnimationIndex = golferSpriteAnimations.addAnimation(golferSwinging);

animation.attachAnimation(golferSprite, golferSpriteAnimations);
golferSprite.setPosition(12, 192);

