/*
   Animation library for sprites
*/
namespace animation {
    let onAnimationUpdate: (() => void)[] = null;
    let onSpriteUpdate: (() => void)[] = null;

    // Only a single animation is active within an AnimationGroup at a time.
    // This allows transitioning from animations smoothly, resetting each to its initial
    // frame before starting.
    export class SpriteAnimationGroup {
        private activeAnimationIndex: number;
        private animations: Animation[];
        private _sprite: Sprite;

        constructor() {
            this.init();
            this.animations = [];
            this.activeAnimationIndex = -1;
        }

        public get activeAnimation(): Animation {
            return this.animations[this.activeAnimationIndex];
        }

        public get sprite(): Sprite {
            return this._sprite;
        }

        public set sprite(sprite: Sprite) {
            this._sprite = sprite;
        }

        /**
         * Adds an animation to the group and returns the active animation index to set to start the animation
         */
        public addAnimation(animation: Animation): number {
            this.animations.push(animation);
            return this.animations.length - 1;
        }

        /** 
         * Sets the active animation and resets that animation to its initial frame. Allows
         * passing in a callback that gets invoked any time the frame of the animation changes to
         * allow coordination between sprites.
         */
        public setActiveAnimation(animationIndex: number, frameChangeCallback: (frame: number) => void = null): void {
            this.activeAnimationIndex = animationIndex;
            this.activeAnimation.reset(frameChangeCallback);
        }

        public update(): void {
            if (this.activeAnimationIndex < 0) {
                return;
            }

            let newImage = this.activeAnimation.image();

            if (this._sprite.image !== newImage) {
                this._sprite.setImage(newImage)
            }
        }

        private init(): void {
            if (!onAnimationUpdate) {
                onAnimationUpdate = [];
                game.eventContext().registerFrameHandler(15, () => {
                    onAnimationUpdate.forEach(element => {
                        element();
                    });
                });
            }

            onAnimationUpdate.push(() => this.activeAnimationIndex > -1 && this.activeAnimation.update());
        }
    }

    export class Animation {
        private animationComplete: boolean;
        private frameChangeCallback: (frame: number) => void;
        private frames: Image[];
        private lastTime: number;
        private loop: boolean;

        // property backing fields
        private _index: number;
        private _interval: number;

        constructor(interval: number, loop: boolean = true) {
            this.reset();
            this._interval = interval;
            this.frames = [];
            this.loop = loop;
        }

        /**
         * Add an image frame to an animation
         */
        public addAnimationFrame(frame: Image): void {
            this.frames.push(frame);
        }

        public get image(): Image {
            return this.frames[this._index];
        }

        public get interval(): number {
            return this._interval;
        }

        public set interval(interval: number) {
            this._interval = interval;
        }

        public get index(): number {
            return this._index;
        }

        public reset(frameChangeCallback: (frame: number) => void = null): void {
            this.frameChangeCallback = frameChangeCallback;
            this._index = -1;
            this.lastTime = control.millis();
            this.animationComplete = false;
        }

        public update(): void {
            if (this.animationComplete) {
                return;
            }

            let currentTime = control.millis();
            let dt = currentTime - this.lastTime;

            if (dt >= this.interval && this.frames.length) {
                this._index++;

                if (!this.loop && this.frames.length > 1 && this._index === this.frames.length) {
                    this.animationComplete = true;
                    return;
                }

                this._index = this._index % this.frames.length;
                this.frameChangeCallback && this.frameChangeCallback(this._index);
                this.lastTime = currentTime;
            }
        }
    }

    /**
     * Attach an animation group to a sprite
     */
    export function attachAnimation(sprite: Sprite, group: SpriteAnimationGroup) {
        if (!onSpriteUpdate) {
            // First attach register the update call back.
            // Priority 16 is slightly lower than 15 for animation update loop.
            // This is allow the animation to complete, so we have the new display ready to go.
            onSpriteUpdate = [];

            game.eventContext().registerFrameHandler(16, () => {
                onSpriteUpdate.forEach(element => {
                    element();
                });
            });
        }

        group.sprite = sprite;

        onSpriteUpdate.push(() => group.update());
    }
}