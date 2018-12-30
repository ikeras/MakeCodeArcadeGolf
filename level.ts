namespace level {
    export class Layout {
        // The background color for the mini map
        public mapBackgroundColor: number;

        // The type is the index of the tilemap that should be rendered on the mini map. 
        // This can exclude things like stars/clouds. The color is the single pixel color
        // that is used in the map to show the usually 16x16 tile. This can be different than
        // the index used in the tilemap, and multiple maptiles can have the same color.
        public mapTilesToRender: Array<{ type: number, color: number }>;

        // This represents the index of the goal/hole(s) of the map. Note, if we decide to stop
        // using the tilemap to track the hole and want to use a sprite instead, then we would 
        // need to change the map code.
        public holeIndex: number;

        // These are the width and height of the tilemap used for this level. Used to center the map
        // on the screen, and possibly to scale the map to the size of the screen.
        public height: number;
        public width: number;

        // The tile where the golfer will be placed when starting the level
        private startTileX: number;
        private startTileY: number;

        constructor(startTileX: number, startTileY: number) {
            this.startTileX = startTileX;
            this.startTileY = startTileY;
        }

        public getStartingBallPosition(): { x: number, y: number } {
            // Ball size is 4x4, so for setPosition we need center, so add 2 to both x & y
            // we want the ball at the bottom of the tile asked, so we add 16 and then subtract 2 given ball size
            return { x: (this.startTileX << 4) + 2, y: (this.startTileY << 4) + 14 };
        }
    }

    export function showMap(ballLocationX: number, ballLocationY: number, layout: level.Layout): void {
        const map = image.create(scene.screenWidth(), scene.screenHeight());

        const scale = Math.floor(Math.min(scene.screenWidth() / layout.width, scene.screenHeight() / layout.height));

        const offsetX = (scene.screenWidth() - layout.width * scale) / 2;
        const offsetY = (scene.screenHeight() - layout.height * scale) / 2;

        map.fillRect(offsetX, offsetY, layout.width * scale, layout.height * scale, 9);

        for (let mapTile of layout.mapTilesToRender) {
            const tiles = scene.getTilesByType(mapTile.type);

            for (let tile of tiles) {
                const x = ((tile.x - 8) >> 4) * scale + offsetX;
                const y = ((tile.y - 8) >> 4) * scale + offsetY;

                for (let row = y; row < y + scale; row++) {
                    for (let col = x; col < x + scale; col++) {
                        map.setPixel(col, row, mapTile.color);
                    }
                }
            }
        }

        const flags = scene.getTilesByType(layout.holeIndex);
        const flagPositions = [];

        for (let flag of flags) {
            const x = ((flag.x - 8) >> 4) * scale + offsetX + scale / 2;
            const y = ((flag.y - 8) >> 4) * scale + offsetY + scale / 2;

            flagPositions.push({ x: x, y: y });
        }

        game.pushScene();

        const smallFlag = sprites.create(img`
            . . 2 1
            . 2 2 1
            2 2 2 1
            2 2 2 1
            . 2 2 1
            . . 2 1
            . . . 1
            . . . 1
            `);

        for (let flagPosition of flagPositions) {
            smallFlag.setPosition(flagPosition.x, flagPosition.y);
        }

        const smallGolfer = sprites.create(img`
            . 1 1 .
            1 1 f f
            1 f f 1
            . 1 1 .
            . 2 2 .
            1 1 1 1
            . 1 1 .
            1 . . 1
            `);

        const golferLocationX = (ballLocationX >> 4) * scale + offsetX + scale / 2;
        const golferLocationY = (ballLocationY >> 4) * scale + offsetY + scale / 2;

        smallGolfer.setPosition(golferLocationX, golferLocationY);

        scene.setBackgroundImage(map);

        controller.pauseUntilAnyButtonIsPressed();

        smallFlag.destroy();
        smallGolfer.destroy();

        game.popScene();
    }

    function loadLevelOne(): level.Layout {
        scene.setBackgroundColor(9);
        scene.setTileMap(img`
            . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . . . . . . 1 . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 1 . . . . . . . . . . .
            . . . . . . . . . . . . . . 1 . . . . . . . . . . . . . . . 1 . . . . . . . . . . . . . . . 1 . . . . . . . . . . . . . . . 1 .
            . . . . . . . 1 . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 1 . . . . . . . . . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . . . . . . . . . . 1 . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 1 . . . . . . .
            . . . . . . . . . . 1 . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 1 . . . . . . . . . . . . . . . . . . . . .
            . . . 1 . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 1 . . . . . . . . . . . . . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . . . . . . 1 . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 1 . . . . . . . . . . .
            . . . . . . . . . . . . . . 1 . . . . . . . . . . . . . . . 1 . . . . . . . . . . . . . . . 1 . . . . . . . . . . . . . . . 1 .
            . . . . . . . 1 . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 1 . . . . . . . . . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . . . . . . . . . . 1 . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 1 . . . . . . .
            . . . . . . . . . . 1 . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 1 . . . . . . . . . . . . . . . . . . . . .
            . . . 1 . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 1 . . . . . . . . . . . . . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . . . . . . 1 . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 1 . . . . . . . . . . .
            . . . . . . . . . . . . . . 1 . . . . . . . . . . . . . . . 1 . . . . . . . . . . . . . . . 1 . . . . . . . . . . . . . . . 1 .
            . . . . . . . 1 . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 1 . . . . . . . . . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . . . . . . . . . . 1 . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 1 . . . . . . .
            . . . . . . . . . . 1 . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 1 . . . . . . . . . . . . . . . . . . . . .
            . . . 1 . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 1 . . . . . . . . . . . . . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . . . . . . 1 . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 1 . . . . . . . . . . .
            . . . . . . . . . . . . . . 1 . . . . . . . . . . . . . . . 1 . . . . . . . . . . . . . . . 1 . . . . . . . . . . . . . . . 1 .
            . . . . . . . 1 . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 1 . . . . . . . . . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . . . . . . . . . . 1 . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 1 . . . . . . .
            . . . . . . . . . . 1 . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 1 . . . . . . . . . . . . . . . . . . . . .
            . . . 1 . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 1 . . . . . . . . . . . . . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . . . . . . 1 . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 1 . . . . . . . . . . .
            . . . . . . . . . . . . . . 1 . . . . . . . . . . . . . . . 1 . . . . . . . . . . . . . . . 1 . . . . . . . . . . . . . . . 1 .
            . . . . . . . 1 . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 1 . . . . . . . . . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . . . . . . . . . . 1 . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 1 . . . . . . .
            . . . . . . . . . . 1 . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 1 . . . . . . . . . . . . . . . . . . . . .
            . . . 1 . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 1 . . . . . . . . . . . . . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . . . . . . 1 . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 1 . . . . . . . . . . .
            . . . . . . . . . . . . . . 1 . . . . . . . . . . . . . . . 1 . . . . . . . . . . . . . . . 1 . . . . . . . . . . . . . . . 1 .
            . . . . . . . 1 . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 1 . . . . . . . . . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . . . . . . . . . . 1 . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 1 . . . . . . .
            . . . . . . . . . . 1 . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 1 . . . . . . . . . . . . . . . . . . . . .
            . . . 1 . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 1 . . . . . . . . . . . . . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . . . . . . . . . . . . . . 7 7 7 7 . . . . . . . . . . . . . . . . . . . . . . . . . . . . 7 7 7 7
            . . . . . . . . . . . . . . . . . . . . . . . . . . . 7 e e e e . . . . . . . . . . . . . . . . . . . . . . . . . . . 7 e e e e
            . . . . . . . . . . . . . . . . . . . . . . . . . . 7 e e e e e . . . . . . . . . . . . . . . . . . . . . . . . . 3 7 e e e e e
            . . . . . 7 7 7 7 7 8 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 e e e e e . . . . . 7 7 7 7 7 8 7 7 7 7 7 7 7 7 7 7 7 7 7 7 d 7 e e e e e
            . . . . 7 e e e e e 8 e e e e e e e e e e e e e 7 7 7 e e e e e . . . . 7 e e e e e 8 e e e e e e e e e e e e e 7 7 7 e e e e e
            7 7 7 7 e e e e e e 8 e e e e e e e e e e e e e e e e e e e e e 7 7 7 7 e e e e e e 8 e e e e e e e e e e e e e e e e e e e e e
            e e e e e e e e e e 8 e e e e e e e e e e e e e e e e e e e e e e e e e e e e e e e 8 e e e e e e e e e e e e e e e e e e e e e
            e e e e e e e e e e 8 e e e e e e e e e e e e e e e e e e e e e e e e e e e e e e e 8 e e e e e e e e e e e e e e e e e e e e e
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

        const layout = new level.Layout(1, 52);

        layout.height = 56;
        layout.width = 64;
        layout.holeIndex = 3;
        layout.mapBackgroundColor = 9;
        layout.mapTilesToRender = [
            { type: 7, color: 7 },
            { type: 8, color: 8 },
            { type: 14, color: 14 },
            { type: 13, color: 13 }
        ];

        return layout;
    }

    export function loadLevel(index: number): level.Layout {
        return loadLevelOne();
    }
}