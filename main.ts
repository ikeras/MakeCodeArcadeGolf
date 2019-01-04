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
    Enemy
}

// The number of frames the ball must remain still before moving the golfer
const QUIESCENT_FRAMES_BEFORE_MOVE = 5;

let golfBallSprite: Sprite = null;

const powerMeter = new PowerMeter(32, 8, 15, 4);
const directionIndicator = new DirectionIndicator(48, 2, 4);

let angle = 180;
let ballInFlight = false;
let swingStarted = false;
let quiescentFrames = 0;

const layout = level.loadLevel(1);

golfBallSprite = sprites.create(img`
    . f f .
    f f f f
    f f f f
    . f f .
    `, SpriteKind.Projectile)

const startingPosition = layout.getStartingBallPosition();
golfBallSprite.setPosition(startingPosition.x, startingPosition.y);
golfBallSprite.z = 1;
scene.cameraFollowSprite(golfBallSprite);

const golfer = new Golfer();
golfer.setPosition(golfBallSprite.x - 1, golfBallSprite.y - 14);

controller.A.onEvent(ControllerButtonEvent.Pressed, () => {
    if (!ballInFlight && !swingStarted) {
        if (powerMeter.isRunning) {
            directionIndicator.hide();
            let power = powerMeter.stop() * 2.4;
            const radians = angle * Math.PI / 180;

            music.golferSwing.play()
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
    level.showMap(golfBallSprite.x, golfBallSprite.y, layout);
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
        if (golfer.getOrientation() == GolferOrientation.Right && controller.left.isPressed()) {
            golfer.setOrientation(GolferOrientation.Left);
            angle = 180 - angle;
            directionIndicator.rotate(angle);
        }
        if (golfer.getOrientation() == GolferOrientation.Left && controller.right.isPressed()) {
            golfer.setOrientation(GolferOrientation.Right);
            angle = 180 - angle;
            directionIndicator.rotate(angle);
        }
        if (golfer.getOrientation() == GolferOrientation.Right && (controller.up.isPressed() && angle >= 90) || (controller.down.isPressed() && angle <= 180)) {
            if (controller.up.isPressed()) {
                angle--
                music.angleUp.play()
            }
            else {
                angle++
                music.angleDown.play()
            }
            directionIndicator.rotate(angle);
        }
        if (golfer.getOrientation() == GolferOrientation.Left && (controller.down.isPressed() && angle >= 0) || (controller.up.isPressed() && angle <= 90)) {
            if (controller.down.isPressed()) {
                angle--
                music.angleDown.play()
            }
            else {
                angle++
                music.angleUp.play()
            }
            directionIndicator.rotate(angle);
        }

    }
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