enum GolferOrientation {
    Left,
    Right
}

class Golfer {
    private leftStandingFrame: Image = null;
    private rightStandingFrame: Image = null;
    private sprite: Sprite = null;
    private spriteAnimations: animation.SpriteAnimationGroup = null;
    private swingingLeftAnimationIndex: number = -1;
    private swingingRightAnimationIndex: number = -1;
    
    // Backing fields for properties
    private _orientation: GolferOrientation = GolferOrientation.Right;

    constructor() {
        const frameRight1 = img`
            . . . . . . . c c c c c c c c c c . . . . . . .
            . . . . . c c c 1 1 1 1 1 1 1 1 c c c . . . . .
            . . . . c c 1 1 1 c c c c c c 1 1 1 c c . . . .
            . . . c c 1 1 c c c c c c c c c c 1 1 c c . . .
            . . . c 1 1 c c c 1 c c c c c c c c 1 1 c . . .
            . . c c 1 c c c 1 1 c c c c c c c c c 1 c c . .
            . . c 1 c c c 1 1 c c c c c c c c c c c 1 c . .
            . . c 1 c c c c c c c c c c c c c c c c 1 c . .
            . . c 1 c c c c c c c c c c c c c c c c 1 c . .
            . . c 1 c c c c c c c c c c c c c c c c 1 c . .
            . . c c 1 c c c c c c c c c c c c c c c 1 c . .
            . . . c 1 c c c c c c c c c c c c c c 1 c . . .
            . . . c c 1 1 c c c c c c c c c c 1 1 c c . . .
            . . . . c c 1 1 1 c c c c c c 1 1 1 c c . . . .
            . . . . . c c b 1 1 1 1 1 1 1 1 1 c c . . . . .
            . . . . . . c c c c 1 1 1 1 c c c c . . . . . .
            . . . . . . 2 2 2 2 2 2 2 2 2 2 2 2 . . . . . .
            . . . . . c c c 1 1 1 1 1 1 1 1 1 c c . . . . .
            . . . . . c 1 1 1 1 1 1 1 1 1 1 1 1 c . . . . .
            . . . . c c 1 1 1 1 1 1 1 1 1 1 1 1 c c . . . .
            . . . . c 1 c 1 1 1 1 1 1 1 1 1 1 c 1 c . . . .
            . . . . c 1 1 c 1 1 1 1 1 1 1 1 c 1 1 c . . . .
            . . . . . c 1 c c 1 1 1 1 1 1 c c 1 c . . . . .
            . . . . . . c c 1 c 1 f 1 c c 1 c c . . . . . .
            . . . . . . . c c c c c c c c c c . . . . . . .
            . . . . . . . c 1 c c c c c 1 1 c . . . . . . .
            . . . . . . . c 1 1 1 f c 1 1 1 c . . . . . . .
            . . . . . . . c 1 1 1 f c 1 1 1 c . . . . . . .
            . . . . . . . c 1 1 c f . c 1 1 c . . . . . . .
            . . . . . . . c 1 1 c f . c 1 1 c . . . . . . .
            . . . . . . c c 1 c . f . . c 1 c c . . . . . .
            . . . . . . c 1 1 f f f . . c 1 1 c . . . . . .
            `;

        const frameRight2 = img`
            . . . . . . . c c c c c c c c c c . . . . . . .
            . . . . . c c c 1 1 1 1 1 1 1 1 c c c . . . . .
            . . . . c c 1 1 1 c c c c c c 1 1 1 c c . . . .
            . . . c c 1 1 c c c c c c c c c c 1 1 c c . . .
            . . . c 1 1 c c c 1 c c c c c c c c 1 1 c . . .
            . . c c 1 c c c 1 1 c c c c c c c c c 1 c c . .
            . . c 1 c c c 1 1 c c c c c c c c c c c 1 c . .
            . . c 1 c c c c c c c c c c c c c c c c 1 c . .
            . . c 1 c c c c c c c c c c c c c c c c 1 c . .
            . . c 1 c c c c c c c c c c c c c c c c 1 c . .
            . . c c 1 c c c c c c c c c c c c c c c 1 c . .
            . . . c 1 c c c c c c c c c c c c c c 1 c . . .
            . . . c c 1 1 c c c c c c c c c c 1 1 c c . . .
            . . . . c c 1 1 1 c c c c c c 1 1 1 c c . . . .
            . . . . . c c 1 1 1 1 1 1 1 1 1 1 c c . . . . .
            . . . . . . c c c c 1 1 1 1 c c c c . . . . . .
            . . . . . . . 2 2 2 2 2 2 2 2 2 2 2 . . . . . .
            . . . . . c c c 1 1 1 1 1 1 1 1 1 c c . . . . .
            . . . . . c 1 1 c 1 1 1 1 1 1 1 c 1 c . . . . .
            . . . . . c c 1 1 c 1 1 1 1 1 c 1 1 c . . . . .
            . . . . . . c c 1 1 c 1 1 1 c 1 1 c . . . . . .
            . . . . . . . c c 1 1 c 1 c 1 1 c . . . . . . .
            . . . . . . . c 1 c 1 1 c 1 1 c c . . . . . . .
            . f f f f f f f f f c c c c c 1 c . . . . . . .
            . f . . . . . c c c c c c c c c c . . . . . . .
            . . . . . . . c 1 c c 1 1 1 1 1 c . . . . . . .
            . . . . . . . c 1 1 1 c c 1 1 1 c . . . . . . .
            . . . . . . . c 1 1 1 c c 1 1 1 c . . . . . . .
            . . . . . . . c 1 1 c . . c 1 1 c . . . . . . .
            . . . . . . . c 1 1 c . . c 1 1 c . . . . . . .
            . . . . . . c c 1 c . . . . c 1 c c . . . . . .
            . . . . . . c 1 1 c . . . . c 1 1 c . . . . . .
            `
        const frameRight3 = img`
            . . . . . . . c c c c c c c c c c . . . . . . .
            . . . . . c c c 1 1 1 1 1 1 1 1 c c c . . . . .
            . . . . c c 1 1 1 c c c c c c 1 1 1 c c . . . .
            . . . c c 1 1 c c c c c c c c c c 1 1 c c . . .
            . . . c 1 1 c c c 1 c c c c c c c c 1 1 c . . .
            . . c c 1 c c c 1 1 c c c c c c c c c 1 c c . .
            . . c 1 c c c 1 1 c c c c c c c c c c c 1 c . .
            . . c 1 c c c c c c c c c c c c c c c c 1 c . .
            . . c 1 c c c c c c c c c c c c c c c c 1 c . .
            . . c 1 c c c c c c c c c c c c c c c c 1 c . .
            . f c c 1 c c c c c c c c c c c c c c c 1 c . .
            f . c c 1 c c c c c c c c c c c c c c 1 c . . .
            . f . c c 1 1 c c c c c c c c c c 1 1 c c . . .
            . . f . c c 1 1 1 c c c c c c 1 1 1 c c . . . .
            . . . f . c c 1 1 1 1 1 1 1 1 1 1 c c . . . . .
            . . . . f . c c c c 1 1 1 1 c c c c . . . . . .
            . . . . . f 2 2 2 2 2 2 2 2 2 2 2 2 . . . . . .
            . . . . . c f c 1 1 1 1 1 1 1 1 c c c . . . . .
            . . . . . c 1 c c 1 c c c c c c c 1 c . . . . .
            . . . . . c 1 1 1 c c 1 1 1 1 1 1 1 c . . . . .
            . . . . . . c 1 1 c 1 c c c c c c c . . . . . .
            . . . . . . . c 1 c 1 1 1 1 1 1 c . . . . . . .
            . . . . . . . c c c 1 1 1 1 1 1 c . . . . . . .
            . . . . . . . c 1 1 1 1 1 1 1 1 c . . . . . . .
            . . . . . . . c c c c c c c c c c . . . . . . .
            . . . . . . . c 1 1 1 1 1 1 1 1 c . . . . . . .
            . . . . . . . c 1 1 1 c c 1 1 1 c . . . . . . .
            . . . . . . . c 1 1 1 c c 1 1 1 c . . . . . . .
            . . . . . . . c 1 1 c . . c 1 1 c . . . . . . .
            . . . . . . . c 1 1 c . . c 1 1 c . . . . . . .
            . . . . . . c c 1 c . . . . c 1 c c . . . . . .
            . . . . . . c 1 1 c . . . . c 1 1 c . . . . . .
            `
        const frameRight4 = img`
            . . . . . . . c c c c c c c c c c . . . . . . .
            . . . . . c c c 1 1 1 1 1 1 1 1 c c c . . . . .
            . . . . c c 1 1 1 c c c c c c 1 1 1 c c . . . .
            . . . c c 1 1 1 c c c 1 c c c c c 1 1 c c . . .
            . . . c 1 1 1 1 c c 1 1 c c c c c c 1 1 c . . .
            . . c c 1 1 1 1 c 1 1 c c c c c c c c 1 c c . .
            . . c 1 1 1 1 1 c c c c c c c c c c c c 1 c . .
            . . c 1 1 1 1 1 c c c c c c c c c c c c 1 c . .
            . . c 1 1 1 1 1 c c c c c c c c c c c c 1 c . .
            . . c 1 1 1 1 1 c c c c c c c c c c c c 1 c . .
            . . c c 1 1 1 1 c c c c c c c c c c c c 1 c . .
            . . . c 1 1 1 1 c c c c c c c c c c c 1 c . . .
            . . . c c 1 1 1 c c c c c c c c c 1 1 c c . . .
            . . . . c c 1 1 1 c c c c c c 1 1 1 c c . . . .
            . . . . . c c 1 1 1 1 1 1 1 1 1 1 c c . . . . .
            . . . . . . c c c c 1 1 1 1 c c c c . . . . . .
            . . . . . . 2 2 2 2 2 2 2 2 2 2 c c c . . . . .
            . . . . . c c c 1 1 1 1 1 1 1 1 c c c . . . . .
            . . . . . c 1 1 c 1 1 1 1 1 1 1 c 1 c . . . . .
            . . . . . c c 1 1 c 1 1 1 1 1 c 1 1 c . . . . .
            . . . . . . c c 1 1 c 1 1 1 c 1 1 c . . . . . .
            . . . . . . . c c 1 1 c 1 c 1 1 c . . . . . . .
            . . . . . . . c 1 c 1 1 c 1 1 c c . . . . . . f
            . . . . . . . c 1 1 c c f f f f f f f f f f f f
            . . . . . . . c c c c c c c c c c . . . . . . .
            . . . . . . . c 1 c c 1 1 1 1 1 c . . . . . . .
            . . . . . . . c 1 1 1 c c 1 1 1 c . . . . . . .
            . . . . . . . c 1 1 1 c c 1 1 1 c . . . . . . .
            . . . . . . . c 1 1 c . . c 1 1 c . . . . . . .
            . . . . . . . c 1 1 c . . c 1 1 c . . . . . . .
            . . . . . . . c 1 c . . . . c 1 c c . . . . . .
            . . . . . . . c 1 c . . . . c 1 1 c . . . . . .
            `
        const frameRight5 = img`
            . . . . . . . c c c c c c c c c c . . . . . . .
            . . . . . c c c 1 1 1 1 1 1 1 1 c c c . . . . .
            . . . . c c 1 1 1 1 1 c c c c 1 1 1 c c . . . .
            . . . c c 1 1 1 1 1 1 c c 1 c c c 1 1 c c . . .
            . . . c 1 1 1 1 1 1 1 c 1 c c c c c 1 1 c . . .
            . . c c 1 1 1 1 1 1 1 c c c c c c c c 1 c c . .
            . . c 1 1 1 1 1 1 1 1 c c c c c c c c c 1 c . .
            . . c 1 1 1 1 1 1 1 1 c c c c c c c c c 1 c . .
            . . c 1 1 1 1 1 1 1 1 c c c c c c c c c 1 c . .
            . . c 1 1 1 1 1 1 1 1 c c c c c c c c c 1 f . .
            . . c c 1 1 1 1 1 1 1 c c c c c c c c c 1 c f .
            . . . c 1 1 1 1 1 1 1 c c c c c c c c 1 c f . .
            . . . c c 1 1 1 1 1 1 c c c c c c 1 1 c f . . .
            . . . . c c 1 1 1 1 1 c c c c 1 1 1 c f . . . .
            . . . . . c c 1 1 1 1 1 1 1 1 1 1 c f . . . . .
            . . . . . . c c c c 1 1 1 1 c c c f . . . . . .
            . . . . . . 2 2 2 2 2 2 2 2 2 2 f c . . . . . .
            . . . . . c c c 1 1 1 1 1 1 1 f 1 c c . . . . .
            . . . . . c 1 c c c c c c c f 1 1 1 c . . . . .
            . . . . . c 1 1 1 1 1 1 1 c c 1 1 1 c . . . . .
            . . . . . . c c c c c c c 1 c 1 1 c . . . . . .
            . . . . . . . c 1 1 1 1 1 1 c 1 c . . . . . . .
            . . . . . . . c 1 1 1 1 1 1 c c c . . . . . . .
            . . . . . . . c 1 1 1 1 1 1 1 1 c . . . . . . .
            . . . . . . . c c c c c c c c c c . . . . . . .
            . . . . . . . c 1 c c 1 1 1 1 1 c . . . . . . .
            . . . . . . . c 1 1 1 c c 1 1 1 c . . . . . . .
            . . . . . . . c 1 1 1 c c 1 1 1 c . . . . . . .
            . . . . . . . c 1 1 c . . c 1 1 c . . . . . . .
            . . . . . . . c 1 1 c . . c 1 1 c . . . . . . .
            . . . . . . . c 1 c . . . . c 1 c c . . . . . .
            . . . . . . . c 1 c . . . . c 1 1 c . . . . . .
            `

        const swingingRight = new animation.Animation(100, false);
        swingingRight.addAnimationFrame(frameRight1);
        swingingRight.addAnimationFrame(frameRight2);
        swingingRight.addAnimationFrame(frameRight3);
        swingingRight.addAnimationFrame(frameRight2);
        swingingRight.addAnimationFrame(frameRight1);
        swingingRight.addAnimationFrame(frameRight4);
        swingingRight.addAnimationFrame(frameRight5);
        this.spriteAnimations = new animation.SpriteAnimationGroup();
        this.swingingRightAnimationIndex = this.spriteAnimations.addAnimation(swingingRight);

        const frameLeft1 = frameRight1.clone();
        const frameLeft2 = frameRight2.clone();
        const frameLeft3 = frameRight3.clone();
        const frameLeft4 = frameRight4.clone();
        const frameLeft5 = frameRight5.clone();
        frameLeft1.flipX();
        frameLeft2.flipX();
        frameLeft3.flipX();
        frameLeft4.flipX();
        frameLeft5.flipX();
        const swingingLeft = new animation.Animation(100, false);
        swingingLeft.addAnimationFrame(frameLeft1);
        swingingLeft.addAnimationFrame(frameLeft2);
        swingingLeft.addAnimationFrame(frameLeft3);
        swingingLeft.addAnimationFrame(frameLeft2);
        swingingLeft.addAnimationFrame(frameLeft1);
        swingingLeft.addAnimationFrame(frameLeft4);
        swingingLeft.addAnimationFrame(frameLeft5);
        this.swingingLeftAnimationIndex = this.spriteAnimations.addAnimation(swingingLeft);

        this.leftStandingFrame = frameLeft1;
        this.rightStandingFrame = frameRight1;

        this.sprite = sprites.create(this.rightStandingFrame, SpriteKind.Player);
        this.sprite.setFlag(SpriteFlag.Ghost, true);
        animation.attachAnimation(this.sprite, this.spriteAnimations);
    }

    public get bottom(): number {
        return this.sprite.bottom;
    }

    public set bottom(value: number) {
        this.sprite.bottom = value;
    }

    public get left(): number {
        return this.sprite.left;
    }

    public set left(value: number) {
        this.sprite.left = value;
    }

    public get right(): number {
        return this.sprite.right;
    }

    public set right(value: number) {
        this.sprite.right = value;
    }

    public get top(): number {
        return this.sprite.top;
    }

    public set top(value: number) {
        this.sprite.top = value;
    }

    public get orientation() {
        return this._orientation;
    }

    public set orientation(value: GolferOrientation) {
        if (value !== this._orientation) {
            this._orientation = value;
            const standingImage: Image = value === GolferOrientation.Left ? this.leftStandingFrame : this.rightStandingFrame;
            this.sprite.setImage(standingImage);
        }        
    }

    public setPosition(x: number, y: number): void {
        this.sprite.setPosition(x, y);
        this.spriteAnimations.stopActiveAnimation();
        const standingImage: Image = this.orientation === GolferOrientation.Left ? this.leftStandingFrame : this.rightStandingFrame;
        this.sprite.setImage(standingImage);
    }

    public swing(hitBallCallback: () => void) {
        const animationIndex = this.orientation === GolferOrientation.Left ? this.swingingLeftAnimationIndex : this.swingingRightAnimationIndex;
        this.spriteAnimations.setActiveAnimation(animationIndex, (frame) => frame === 4 && hitBallCallback());
    }

    public say(text: string, timeOnScreen: number): void {
        this.sprite.say(text, timeOnScreen)
    }
}