enum SpriteKind {
    Player,
    Projectile,
    Food,
    Enemy
}
let golfBallSprite: Sprite = null
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    golfBallSprite.vx = 45
    golfBallSprite.vy = -50
    golfBallSprite.ay = 9.81
    golfBallSprite.ax = 2
})
let mySprite = 0
mySprite = null
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
golfBallSprite.setPosition(7, 206)
golfBallSprite.setFlag(SpriteFlag.BounceOnWall, true)
scene.cameraFollowSprite(golfBallSprite)
