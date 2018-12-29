enum GolferOrientation {
    Left,
    Right
}

class Golfer {
    private golferLeftStandingFrame: Image = null;
    private golferRightStandingFrame: Image = null;
    private golferSprite: Sprite = null;
    private golferSpriteAnimations: animation.SpriteAnimationGroup = null;
    private golferSwingingLeftAnimationIndex: number = -1;
    private golferSwingingRightAnimationIndex: number = -1;
    private orientation: GolferOrientation = GolferOrientation.Right;

    constructor() {
        const golferFrameRight1 = img`
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

        const golferFrameRight2 = img`
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
        const golferFrameRight3 = img`
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
        const golferFrameRight4 = img`
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
        const golferFrameRight5 = img`
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

        const golferSwingingRight = new animation.Animation(250, false);
        golferSwingingRight.addAnimationFrame(golferFrameRight1);
        golferSwingingRight.addAnimationFrame(golferFrameRight2);
        golferSwingingRight.addAnimationFrame(golferFrameRight3);
        golferSwingingRight.addAnimationFrame(golferFrameRight2);
        golferSwingingRight.addAnimationFrame(golferFrameRight1);
        golferSwingingRight.addAnimationFrame(golferFrameRight4);
        golferSwingingRight.addAnimationFrame(golferFrameRight5);
        this.golferSpriteAnimations = new animation.SpriteAnimationGroup();
        this.golferSwingingRightAnimationIndex = this.golferSpriteAnimations.addAnimation(golferSwingingRight);

        const golferFrameLeft1 = golferFrameRight1.clone();
        const golferFrameLeft2 = golferFrameRight2.clone();
        const golferFrameLeft3 = golferFrameRight3.clone();
        const golferFrameLeft4 = golferFrameRight4.clone();
        const golferFrameLeft5 = golferFrameRight5.clone();
        golferFrameLeft1.flipX();
        golferFrameLeft2.flipX();
        golferFrameLeft3.flipX();
        golferFrameLeft4.flipX();
        golferFrameLeft5.flipX();
        const golferSwingingLeft = new animation.Animation(250, false);
        golferSwingingLeft.addAnimationFrame(golferFrameLeft1);
        golferSwingingLeft.addAnimationFrame(golferFrameLeft2);
        golferSwingingLeft.addAnimationFrame(golferFrameLeft3);
        golferSwingingLeft.addAnimationFrame(golferFrameLeft2);
        golferSwingingLeft.addAnimationFrame(golferFrameLeft1);
        golferSwingingLeft.addAnimationFrame(golferFrameLeft4);
        golferSwingingLeft.addAnimationFrame(golferFrameLeft5);
        this.golferSwingingLeftAnimationIndex = this.golferSpriteAnimations.addAnimation(golferSwingingLeft);

        this.golferLeftStandingFrame = golferFrameLeft1;
        this.golferRightStandingFrame = golferFrameRight1;

        this.golferSprite = sprites.create(this.golferRightStandingFrame, SpriteKind.Player);
        animation.attachAnimation(this.golferSprite, this.golferSpriteAnimations);
        this.golferSprite.setPosition(12, 192);
    }

    public setOrientation(orientation: GolferOrientation) {
        if (orientation !== this.orientation) {
            this.orientation = orientation;
            let standingImage: Image = orientation === GolferOrientation.Left ? this.golferLeftStandingFrame : this.golferRightStandingFrame;
            this.golferSprite.setImage(standingImage);
        }
    }

    public swing(hitBallCallback: () => void) {
        const animationIndex = this.orientation === GolferOrientation.Left ? this.golferSwingingLeftAnimationIndex : this.golferSwingingRightAnimationIndex;
        this.golferSpriteAnimations.setActiveAnimation(animationIndex, (frame) => frame === 4 && hitBallCallback());
    }
}