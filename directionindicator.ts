class DirectionIndicator {
    private color: number;
    private image: Image;
    private midpoint: number;
    private pointerSize: number;
    private points: Array<{ x: number, y: number }>;
    private size: number;
    private sprite: Sprite;

    constructor(size: number, pointerSize: number, color: number) {
        this.size = size;
        this.midpoint = this.size / 2;
        this.pointerSize = pointerSize;
        this.color = color;
        this.image = image.create(this.size, this.size);

        this.points = [
            { x: -this.midpoint, y: 0 },
            { x: -this.midpoint + this.pointerSize, y: this.pointerSize },
            { x: -this.midpoint + this.pointerSize, y: -this.pointerSize }
        ];
    }

    public hide(): void {
        this.sprite.destroy();
    }

    public rotate(degrees: number): void {
        const radians = angle * Math.PI / 180;
        let x, y;
        const rotatedPoints = [];

        for (let localPoint of this.points) {
            // rotate points
            x = localPoint.x * Math.cos(radians) - localPoint.y * Math.sin(radians);
            y = localPoint.y * Math.cos(radians) + localPoint.x * Math.sin(radians);

            // translate into image coordinates
            x += this.midpoint;
            y += this.midpoint;

            rotatedPoints.push({ x: x, y: y });
        }

        this.image.fill(0);

        // Draw the 4 lines of the direction indicator
        this.image.drawLine(this.midpoint, this.midpoint, rotatedPoints[1].x, rotatedPoints[1].y, this.color);
        this.image.drawLine(this.midpoint, this.midpoint, rotatedPoints[2].x, rotatedPoints[2].y, this.color);
        this.image.drawLine(rotatedPoints[1].x, rotatedPoints[1].y, rotatedPoints[0].x, rotatedPoints[0].y, this.color);
        this.image.drawLine(rotatedPoints[2].x, rotatedPoints[2].y, rotatedPoints[0].x, rotatedPoints[0].y, this.color);
    }

    public show(x: number, y: number): void {
        this.sprite = sprites.create(this.image);
        this.sprite.z = 2;
        this.sprite.setPosition(x, y);
    }
}