class PowerMeter {
    private image: Image;
    private width: number;
    private height: number;
    private fillColor: number;
    private outlineColor: number;
    private power: number;
    private powerIncrement: number;
    private sprite: Sprite;

    // property backing fields
    private _isRunning: boolean;

    constructor(width: number, height: number, outlineColor: number, fillColor: number) {
        this.width = width;
        this.height = height;
        this.outlineColor = outlineColor;
        this.fillColor = fillColor;
        this._isRunning = false;

        this.image = image.create(width, height);

        game.currentScene().eventContext.registerFrameHandler(20, () => {
            if (this._isRunning) {
                this.power += this.powerIncrement;
                if (this.power === 1 || this.power === width - 1) {
                    this.powerIncrement = -this.powerIncrement;
                }
                this.image.fill(0);
                this.image.drawRect(0, 0, this.width, this.height, this.outlineColor);
                this.image.fillRect(1, 1, this.power, this.height - 2, this.fillColor);
            }
        })
    }

    public get isRunning(): boolean {
        return this._isRunning;
    }

    public start(x: number, y: number): void {
        this.sprite = sprites.create(this.image);
        this.sprite.z = 2;
        this.sprite.setPosition(x, y);

        this._isRunning = true;
        this.power = 1;
        this.powerIncrement = 1;
    }

    public stop(): number {
        this.sprite.destroy();
        this.sprite = null;

        this._isRunning = false;
        return this.power;
    }
}