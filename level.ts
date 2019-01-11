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

        map.fillRect(offsetX, offsetY, layout.width * scale, layout.height * scale, 14);

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
            1 f f 1
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

    function setupScene(): void {
        scene.setBackgroundImage(customImages.levelTwo_bg);
        scene.setTile(1, customArt.stars);
        scene.setTile(2, customArt.ufo, true);
        scene.setTile(3, customArt.black_hole_center, true);
        scene.setTile(4, customArt.black_hole_up);
        scene.setTile(5, customArt.black_hole_down);
        scene.setTile(6, customArt.black_hole_left);
        scene.setTile(7, customArt.black_hole_right);
        scene.setTile(8, customArt.floor_inner, true);
        scene.setTile(9, customArt.meteor_front, true);
        scene.setTile(10, customArt.meteor_middle, true);
        scene.setTile(11, customArt.meteor_back, true);
        scene.setTile(12, customArt.satellite_top, true);
        scene.setTile(13, customArt.satellite_front, true);
        scene.setTile(14, customArt.satellite_middle, true);
        scene.setTile(15, customArt.satellite_back, true);
    }

    function loadLevelOne(): level.Layout {
        setupScene();
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
            . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 4 . . . . . . . . .
            . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 6 3 7 . . . . . . . .
            . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 5 . . . . . . . . .
            . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . . . . . . . . . . . . . 8 8 8 8 . . . . . . . . . . . . . . . . 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8
            . . . . . . . . . . . . . . . . . . . . . . . . . . . 8 8 8 8 . . . . . . . . . . . . . . . 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8
            8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8
            `)

        const layout = new level.Layout(1, 22);

        layout.height = 24;
        layout.width = 64;
        layout.holeIndex = 3;
        layout.mapTilesToRender = [
            { type: 7, color: 7 },
            { type: 8, color: 5 },
            { type: 9, color: 5 },
            { type: 10, color: 5 },
            { type: 11, color: 5 },
            { type: 12, color: 10 },
            { type: 13, color: 10 },
            { type: 14, color: 10 },
            { type: 15, color: 10 },
        ];

        return layout;
    }

    function loadLevelTwo(): level.Layout {
        setupScene();
        scene.setTileMap(img`
            . . . . . . . . . . 1 . . . . . . . . . . . . . . . . . . . . .
            . . . 1 . . . . . . . . . . . . . . . . . . . . . . 4 . . . . .
            . . . . . . . . . . . . . . . . . . . . . . . . . 6 3 7 . . . .
            . . . . . . . . . . . . . . . . . . . . . . . . . . 5 . . . . .
            . . . . . . . . . . . . . . . . . . . . 2 . . . . . . . . . . .
            . . . . . . . . . . . . . . 1 . . . . . . . . . . . . . . . 1 .
            . . . . . . . 1 . . . . . . . . . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . . . . . . . . . . 1 . . . . . . .
            . . . . . . . . . . 1 . . . . . . . . . . . . . . . . . . . . .
            . . . 1 . . . . . . . . . . . . . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . . . . . . . . . . . b a a 9 . . .
            . . . . . . . . . . . . . . . . . . . . 1 . . . . . . . . . . .
            . . . . . . . . . . . . . . 1 . . . . . . . . . . . . . . . 1 .
            8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 . . . .
            . . . . . . . . . . . . . . . . . . . . . . . . 1 . . . . . . 8
            . . . . . . . . . . 1 . . . . . . . . . . . . . . . . . 8 8 8 8
            . . . 1 . . . . . . . . . . . . . . . . . . . . . . . . 8 8 8 8
            . . . . . . . . . . . . . . . . . . . . . . . . . . . . 8 8 8 8
            . . . . . . . . . . . . . . . . . . . . . . . . . . . . 8 8 8 8
            . . . . . . . . . . . . . . . . . . . . . . . . . . . . 8 8 8 8
            . . . . . . . . . . . . . . . . . . . . . . . . . . . . 8 8 8 8
            . . . . . . . . . . . . . . . . . . . . . . . . . . . . 8 8 8 8
            . . . . . . . . . . . . . . . . . . . . . . . . . . 8 8 8 8 8 8
            . . . . . 8 8 8 . . 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8
            . . . . 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8
            8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8
            `)

        const layout = new level.Layout(1, 25);

        layout.height = 27;
        layout.width = 32;
        layout.holeIndex = 3;
        layout.mapTilesToRender = [
            { type: 7, color: 7 },
            { type: 8, color: 5 },
            { type: 9, color: 5 },
            { type: 10, color: 5 },
            { type: 11, color: 5 },
            { type: 12, color: 10 },
            { type: 13, color: 10 },
            { type: 14, color: 10 },
            { type: 15, color: 10 },
        ];

        return layout;
    }

    function loadLevelThree(): level.Layout {
        setupScene();
        scene.setTileMap(img`
            . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . . . . . . 1 . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 1 . . . . . . . . . . .
            . . . . . . . . . . . . . . 1 . . . . . . . . . . . . . . . 1 . . . . . . . . . . . . . . . 1 . . . . . . . . . . . . . . . 1 .
            . 4 . . . . . 1 . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 1 . . . . . . . . . . . . . . . . . . . . . . . .
            6 3 7 . . . . . . . . . . . . . . . . . . . . . 1 . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 2 . . . . . . .
            . 5 . . 1 . . . . . 1 . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 1 . . . . . . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 1 . . . . . . . . . . . . . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . . . . . . 1 . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 1 . . . . . . . . . . .
            . . . . . . . . . . . . . . 1 . . . . . . . . . 1 . . . . . 2 . . . . . . . . . . . . . . . 1 . . . . . . . . . . . . . . . 1 .
            . . . . . . . 2 . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 1 . . . . . . . . . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 1 . . . . . . .
            . . . . . . . . . . 1 . . . . . . . . . . . c . . . . . . . . . . . . . . . . . . . 2 . . . . . . . . . . . . . . . . . . . . .
            . . . 1 . . . . . . . . . . . . . . . . . . d e f . . . . . . . . . . 1 . . . . . . . . . . . . . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
            . . . . . . . . . . b a a a 9 . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . . . . . . 1 . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 1 . . . . . . . . . . .
            . . . . . . . . . . . . . . 1 . . . . . . . . . . . . . . . 1 . . . . . . . . . . . . . . . 1 . . . . . . . . . . . . . . . 1 .
            . . . . . . . 1 . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 1 . . . . . . . . . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . . . . . . . . . . 1 . . . . . . . . . . . c . . . . . . . . . . . . . . . . . . . 2 . . . . . . .
            . . . . . . . . . . 1 . . . . . . . . . . . . . . . . . . . . . . . d e e e f . . . 1 . . . . . . . . . . . . . . . . . . . . .
            . . . 2 . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 1 . . . . . . . . . . . . . b a a 9 . . . . . . . . . . .
            . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . . . . . . 2 . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 1 . . . . . . . . . . .
            . . . c . . . . . . . . . . 1 . . . . . . . . . . . . . . . 1 . . . . . . . . . . . . . . . 1 . . . . . . . . . . . . . . . 1 .
            . . . d e e f . 2 . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 1 . . . . . . . . . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . . . . . . . . . . 1 . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 1 . . . . . . .
            . . . . . . . . . . 1 . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 1 . . . . . . . . . . . . . . . . . c . . .
            . . . 1 . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 2 . . . . . . . . . . . . . . . . . . . . d e e e f . . .
            . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . . . . . . 1 . . . . . . . . . . . . . . . . . . b a a a a a 9 . . . . . . 1 . . . . . . . . . . .
            . . . . . . . . . . . . . . 1 . . . . . . . . . . . . . . . 1 . . . . . . . . . . . . . . . 1 . . . . . . . . . . . . . . . 1 .
            . . . . . . . 1 . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 1 . . . . . . . . . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . . . . . . . . . . 1 . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 2 . . . . . . .
            . . . . . . . . . . 1 . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 1 . . . . . . . . . . . . . . . . . . . . .
            . . . 1 . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 1 . . . . . . . . . . . . . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . . . . . . . . . . . b a a 9 . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . . . . . . 1 . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 1 . . . . . . . . . . .
            . . . . . . . . . . . . . . 1 . . . . . . . . . . . . . . . 1 . . . . . . . . . . . . . . . 1 . . . . . . . . . . . . . . . 1 .
            . . . . . . . 1 . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 1 . . . . . . . . . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . . . . . . . . . . 1 . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 1 . . . . . . .
            . . . . . . . . . . 1 . . . . . . . . . . . . . . . . . . . . . . . . . . . . c . . . . . . . . . . . . . . . . . . . . . . . .
            . . . 1 . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . d e e e e e f . . . . . . . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 1 . . . . . . . . . . . . . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . . . . . . . . . . . . . . 8 8 8 8 . . . . . . . . . . . . . . . . . . . . . . . . . . . . 8 8 8 8
            . . . . . . . . . . . . . . . . . . . . . . . . . . . . 8 8 8 8 . . . . . . . . . . . . . . . . . . . . . . . . . . . . 8 8 8 8
            . . . . . . . . . . . . . . . . . . . . . . . . . . 8 8 8 8 8 8 . . . . . . . . . . . . . . . . . . . . . . . . . 8 8 . 8 8 8 8
            . . . . . 8 8 8 . . 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 . . . . 8 8 8 8 8 . 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8
            . . . . 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 . . . . 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8
            8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8
            `)

        const layout = new level.Layout(1, 54);

        layout.height = 56;
        layout.width = 64;
        layout.holeIndex = 3;
        layout.mapTilesToRender = [
            { type: 7, color: 7 },
            { type: 8, color: 5 },
            { type: 9, color: 5 },
            { type: 10, color: 5 },
            { type: 11, color: 5 },
            { type: 12, color: 10 },
            { type: 13, color: 10 },
            { type: 14, color: 10 },
            { type: 15, color: 10 },
        ];

        return layout;
    }


    export function loadLevel(index: number): level.Layout {
        switch (index) {
            case 1: return loadLevelOne();
            case 2: return loadLevelTwo();
            case 3: return loadLevelThree();
        }

        return null;
    }

    export const MAX_LEVEL = 3;
}