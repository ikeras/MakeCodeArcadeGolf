// A little bit of a hack as we want things to move faster than they would based on the default
// time slices of the ArcadePhysicsEngine, so we override and set it to the max time slice it supports
class GolfPhysicsEngine extends ArcadePhysicsEngine {
    move(dt: number) {
        super.move(0.1);
    }
}

const physicsEngine = new GolfPhysicsEngine();
game.currentScene().physicsEngine = physicsEngine;

enum SpriteKind {
    Player,
    Projectile,
    Food,
    Goal,
}

let gameState = 1;
let angle = 180;

scene.setBackgroundImage(customImages.titleScreen)

// The number of frames the ball must remain still before moving the golfer
const QUIESCENT_FRAMES_BEFORE_MOVE = 5;

let golfBallSprite: Sprite = null;

const powerMeter = new PowerMeter(32, 8, 15, 4);
const directionIndicator = new DirectionIndicator(48, 2, 4);

let ballInFlight = false;
let swingStarted = false;
let quiescentFrames = 0;

let layout = level.loadLevel(0);
const golfer = new Golfer();
golfer.setPosition(400, 100);

controller.A.onEvent(ControllerButtonEvent.Pressed, () => {
    if (gameState == 1) {
        music.playSoundUntilDone("~3 C6:0");
        scene.setBackgroundImage(customImages.instructions);
        gameState = 2;
    }
    else if (gameState == 2) {
        music.playSoundUntilDone("~3 C6:0");
        layout = level.loadLevel(2);
        info.setScore(0);

        golfBallSprite = sprites.create(img`
            . f .
            f f f
            . f .
            `, SpriteKind.Projectile)

        let startingPosition = layout.getStartingBallPosition();
        golfBallSprite.setPosition(startingPosition.x, startingPosition.y);
        golfBallSprite.z = 1;
        scene.cameraFollowSprite(golfBallSprite);

        golfer.setPosition(golfBallSprite.x - 1, golfBallSprite.y - 14);

        gameState = 3;
    }
    if (gameState == 3 && !ballInFlight && !swingStarted) {
        if (powerMeter.isRunning) {
            directionIndicator.hide();
            let power = powerMeter.stop() * 2.4;
            const radians = angle * Math.PI / 180;

            music.golferSwing.play();
            info.changeScoreBy(1);
            swingStarted = true;

            golfer.swing(() => {
                swingStarted = false;
                ballInFlight = true;
                golfer.say("fore!", 900)
                golfBallSprite.vx = -Math.cos(radians) * power;
                golfBallSprite.vy = -Math.sin(radians) * power;
                golfBallSprite.ay = 9.81;
                golfBallSprite.ax = 0;
            });
        } else {
            directionIndicator.rotate(angle);
            directionIndicator.show(golfBallSprite.x, golfBallSprite.y);
            powerMeter.start(golfBallSprite.x + 3, golfer.top - 8);
        }
    }
});

controller.B.onEvent(ControllerButtonEvent.Pressed, () => {
    if (gameState == 3) {
        level.showMap(golfBallSprite.x, golfBallSprite.y, layout);
    }
});

game.currentScene().eventContext.registerFrameHandler(19, () => {
    if (ballInFlight) {
        if (Math.abs(golfBallSprite.vx) < 1 && Math.abs(golfBallSprite.vy) < 1) {
            quiescentFrames++;
        } else {
            quiescentFrames = 0;
        }

        if (quiescentFrames === QUIESCENT_FRAMES_BEFORE_MOVE) {
            quiescentFrames = 0;
            golfBallSprite.vx = 0;
            golfBallSprite.vy = 0;
            ballInFlight = false;
            golfer.setPosition(golfBallSprite.x - 1, golfBallSprite.y - 14);
        }
    }
    if (powerMeter.isRunning) {
        if (controller.left.isPressed() || controller.right.isPressed()) {
            const targetOrientation = controller.left.isPressed() ? GolferOrientation.Left : GolferOrientation.Right;

            if (golfer.orientation !== targetOrientation) {
                golfer.orientation = targetOrientation;
                angle = 180 - angle;
                directionIndicator.rotate(angle);
            }
        }

        if (controller.up.isPressed() || controller.down.isPressed()) {
            const extents = golfer.orientation === GolferOrientation.Right ? { bottom: 180, top: 90, increment: -1 } : { bottom: 0, top: 90, increment: 1 };

            if (controller.up.isPressed() && angle !== extents.top) {
                angle += extents.increment;
                music.angleUp.play();
            } else if (controller.down.isPressed() && angle !== extents.bottom) {
                angle -= extents.increment;
                music.angleDown.play();
            }

            directionIndicator.rotate(angle);
        }
    }
});

scene.onHitTile(SpriteKind.Projectile, 3, (sprite: Sprite) => {
    music.magicWand.playUntilDone();
    let top = (screen.height - 44) >> 1;
    screen.fillRect(0, top, screen.width, 46, 0)
    screen.drawLine(0, top, screen.width, top, 1)
    screen.drawLine(0, top + 46, screen.width, top + 46, 1)

    screen.printCenter("YOU WIN!", top + 8, screen.isMono ? 1 : 5, image.font8)
    if (info.hasScore()) {
        screen.printCenter("Score:" + info.score(), top + 23, screen.isMono ? 1 : 2, image.font8)
        if (info.score() < info.highScore()) {
            info.saveHighScore();
            screen.printCenter("New Best Score!", top + 34, screen.isMono ? 1 : 2, image.font5);
        } else {
            screen.printCenter("Best: " + info.highScore(), top + 34, screen.isMono ? 1 : 2, image.font8);
        }
    }
    pause(2000) // wait for users to stop pressing keys
    game.waitAnyButton()
    game.reset()
});

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
});